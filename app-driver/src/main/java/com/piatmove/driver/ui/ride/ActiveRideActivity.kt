package com.piatmove.driver.ui.ride

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.os.Looper
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.MarkerOptions
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.BookingStatus
import com.piatmove.core.utils.Resource
import com.piatmove.driver.R
import com.piatmove.driver.databinding.ActivityActiveRideBinding
import com.piatmove.driver.ui.home.DriverHomeActivity
import com.piatmove.driver.ui.home.DriverViewModel

class ActiveRideActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var binding: ActivityActiveRideBinding
    private lateinit var viewModel: DriverViewModel
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var locationCallback: LocationCallback? = null

    private var googleMap: GoogleMap? = null
    private var currentBooking: Booking? = null

    private var bookingId: Int = -1
    private var currentStatus: String = ""
    private var isCancelling: Boolean = false

    private val locationPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val fineGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] ?: false
        val coarseGranted = permissions[Manifest.permission.ACCESS_COARSE_LOCATION] ?: false
        if (fineGranted || coarseGranted) {
            enableMyLocationOnMap()
            startLocationUpdates()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityActiveRideBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        bookingId = intent.getIntExtra(EXTRA_BOOKING_ID, -1)
        viewModel = ViewModelProvider(this)[DriverViewModel::class.java]
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        setupMap()

        binding.btnAction.setOnClickListener {
            isCancelling = false
            when (currentStatus) {
                BookingStatus.ACCEPTED -> viewModel.startRide(bookingId)
                BookingStatus.STARTED  -> viewModel.completeRide(bookingId)
            }
        }

        binding.btnCancelRide.setOnClickListener {
            AlertDialog.Builder(this)
                .setTitle("Cancel Active Ride")
                .setMessage("Are you sure you want to cancel this ride? This action will be logged in your activity history.")
                .setPositiveButton("Yes, Cancel Ride") { _, _ ->
                    isCancelling = true
                    viewModel.cancelRide(bookingId)
                }
                .setNegativeButton("No, Keep Ride", null)
                .show()
        }

        binding.btnNavigate.setOnClickListener {
            val booking = currentBooking ?: return@setOnClickListener
            if (currentStatus == BookingStatus.ACCEPTED) {
                launchNavigation(booking.pickup_lat, booking.pickup_lng, "Pickup: ${booking.pickup_address}")
            } else {
                launchNavigation(booking.dropoff_lat, booking.dropoff_lng, "Dropoff: ${booking.dropoff_address}")
            }
        }

        viewModel.activeBooking.observe(this) { state ->
            if (state is Resource.Success) {
                state.data?.let { renderBooking(it) }
            }
        }

        viewModel.actionState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility   = View.VISIBLE
                    binding.btnAction.isEnabled      = false
                    binding.btnCancelRide.isEnabled  = false
                }
                is Resource.Success -> {
                    binding.progressBar.visibility   = View.GONE
                    binding.btnAction.isEnabled      = true
                    binding.btnCancelRide.isEnabled  = true

                    if (isCancelling) {
                        Toast.makeText(this, "Ride cancelled", Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this, DriverHomeActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                        })
                    } else if (currentStatus == BookingStatus.STARTED) {
                        Toast.makeText(this, "Ride completed successfully!", Toast.LENGTH_LONG).show()
                        startActivity(Intent(this, DriverHomeActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                        })
                    } else {
                        viewModel.loadActiveBooking()
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility   = View.GONE
                    binding.btnAction.isEnabled      = true
                    binding.btnCancelRide.isEnabled  = true
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }

        viewModel.loadActiveBooking()
    }

    override fun onResume() {
        super.onResume()
        checkLocationPermissionAndStartUpdates()
    }

    override fun onPause() {
        super.onPause()
        stopLocationUpdates()
    }

    private fun checkLocationPermissionAndStartUpdates() {
        val fineGranted = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
        val coarseGranted = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED

        if (fineGranted || coarseGranted) {
            enableMyLocationOnMap()
            startLocationUpdates()
        } else {
            locationPermissionLauncher.launch(
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION)
            )
        }
    }

    private fun startLocationUpdates() {
        if (locationCallback != null) return

        val permission = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
        if (permission != PackageManager.PERMISSION_GRANTED) return

        try {
            // Immediately broadcast last known location so passenger map displays tricycle position right away
            fusedLocationClient.lastLocation.addOnSuccessListener { loc ->
                if (loc != null) {
                    viewModel.updateLocation(loc.latitude, loc.longitude)
                }
            }

            val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 3000L)
                .setMinUpdateIntervalMillis(2000L)
                .setMinUpdateDistanceMeters(1f)
                .build()

            locationCallback = object : LocationCallback() {
                override fun onLocationResult(result: LocationResult) {
                    val location = result.lastLocation ?: return
                    viewModel.updateLocation(location.latitude, location.longitude)
                }
            }

            fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback!!, Looper.getMainLooper())
        } catch (_: SecurityException) {}
    }

    private fun stopLocationUpdates() {
        locationCallback?.let {
            fusedLocationClient.removeLocationUpdates(it)
            locationCallback = null
        }
    }

    private fun enableMyLocationOnMap() {
        try {
            googleMap?.isMyLocationEnabled = true
        } catch (_: SecurityException) {}
    }

    private fun setupMap() {
        val mapFragment = supportFragmentManager.findFragmentById(R.id.mapFragment) as? SupportMapFragment
        mapFragment?.getMapAsync(this)
    }

    override fun onMapReady(map: GoogleMap) {
        this.googleMap = map
        map.uiSettings.isZoomControlsEnabled = false
        map.uiSettings.isCompassEnabled = true
        map.uiSettings.isMapToolbarEnabled = false

        enableMyLocationOnMap()
        currentBooking?.let { renderMapMarkers(it) }
    }

    private fun renderMapMarkers(booking: Booking) {
        val map = googleMap ?: return
        map.clear()

        val pickup = LatLng(booking.pickup_lat, booking.pickup_lng)
        val dropoff = LatLng(booking.dropoff_lat, booking.dropoff_lng)

        map.addMarker(
            MarkerOptions()
                .position(pickup)
                .title("Pickup: ${booking.pickup_address}")
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_AZURE))
        )

        map.addMarker(
            MarkerOptions()
                .position(dropoff)
                .title("Dropoff: ${booking.dropoff_address}")
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
        )

        try {
            val bounds = LatLngBounds.Builder()
                .include(pickup)
                .include(dropoff)
                .build()
            val padding = (resources.displayMetrics.density * 40).toInt()
            map.animateCamera(CameraUpdateFactory.newLatLngBounds(bounds, padding))
        } catch (_: Exception) {
            val target = if (currentStatus == BookingStatus.STARTED) dropoff else pickup
            map.animateCamera(CameraUpdateFactory.newLatLngZoom(target, 15f))
        }
    }

    private fun launchNavigation(lat: Double, lng: Double, label: String) {
        try {
            val gmmIntentUri = Uri.parse("google.navigation:q=$lat,$lng")
            val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri).apply {
                setPackage("com.google.android.apps.maps")
            }
            if (mapIntent.resolveActivity(packageManager) != null) {
                startActivity(mapIntent)
            } else {
                val fallbackUri = Uri.parse("geo:$lat,$lng?q=$lat,$lng($label)")
                startActivity(Intent(Intent.ACTION_VIEW, fallbackUri))
            }
        } catch (e: Exception) {
            Toast.makeText(this, "Unable to open navigation: ${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    private fun renderBooking(booking: Booking) {
        currentBooking = booking
        currentStatus = booking.status
        renderMapMarkers(booking)

        binding.tvStatus.text        = booking.status.replaceFirstChar { it.uppercase() }
        binding.tvPassengerName.text = booking.passenger_name ?: "Passenger #${booking.passenger_id}"
        binding.tvPassengerPhone.text = booking.passenger_phone ?: "—"
        binding.tvPickup.text        = booking.pickup_address
        binding.tvDropoff.text       = booking.dropoff_address
        binding.tvActiveFare.text    = booking.fare?.let { "₱%.2f".format(it) } ?: "₱--"

        val discount = booking.discount_type ?: "regular"
        if (discount != "regular") {
            val discountTitle = when (discount) {
                "student"  -> "🎓 Student (20% OFF)"
                "senior"   -> "👴 Senior (20% OFF)"
                "pwd"      -> "♿ PWD (20% OFF)"
                "pregnant" -> "🤰 Pregnant (20% OFF)"
                else       -> "🏷️ Discount (20% OFF)"
            }
            binding.tvActiveDiscount.visibility = View.VISIBLE
            binding.tvActiveDiscount.text       = discountTitle
        } else {
            binding.tvActiveDiscount.visibility = View.GONE
        }

        when (booking.status) {
            BookingStatus.ACCEPTED -> {
                binding.btnAction.text = getString(R.string.btn_start_ride)
                binding.btnAction.visibility = View.VISIBLE
                binding.btnCancelRide.visibility = View.VISIBLE
                binding.btnNavigate.text = "Navigate to Pickup (Google Maps)"
                binding.btnNavigate.visibility = View.VISIBLE
            }
            BookingStatus.STARTED -> {
                binding.btnAction.text = getString(R.string.btn_complete_ride)
                binding.btnAction.visibility = View.VISIBLE
                binding.btnCancelRide.visibility = View.VISIBLE
                binding.btnNavigate.text = "Navigate to Dropoff (Google Maps)"
                binding.btnNavigate.visibility = View.VISIBLE
            }
            else -> {
                binding.btnAction.visibility = View.GONE
                binding.btnCancelRide.visibility = View.GONE
                binding.btnNavigate.visibility = View.GONE
            }
        }
    }

    override fun onSupportNavigateUp(): Boolean { onBackPressedDispatcher.onBackPressed(); return true }

    companion object {
        const val EXTRA_BOOKING_ID = "extra_booking_id"
    }
}
