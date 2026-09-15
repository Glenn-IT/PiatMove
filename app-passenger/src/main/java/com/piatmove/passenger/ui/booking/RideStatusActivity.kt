package com.piatmove.passenger.ui.booking

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.view.animation.LinearInterpolator
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptor
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.BookingStatus
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityRideStatusBinding
import com.piatmove.passenger.ui.home.PassengerViewModel

class RideStatusActivity : AppCompatActivity(), OnMapReadyCallback {

    companion object {
        const val EXTRA_BOOKING_ID = "booking_id"
    }

    private lateinit var binding: ActivityRideStatusBinding
    private lateinit var viewModel: PassengerViewModel
    private var bookingId: Int = -1

    private var googleMap: GoogleMap? = null
    private var currentBooking: Booking? = null

    // Map Markers
    private var pickupMarker: Marker? = null
    private var dropoffMarker: Marker? = null
    private var tricycleMarker: Marker? = null

    // Smooth movement tracking
    private var lastDriverPosition: LatLng? = null
    private var tricycleAnimator: ValueAnimator? = null
    private var isCameraFitted = false

    private val handler = Handler(Looper.getMainLooper())
    private val pollDelay = 4_000L // Poll every 4 seconds for responsive live tracking

    private val pollRunnable = object : Runnable {
        override fun run() {
            if (bookingId != -1) {
                viewModel.fetchBooking(bookingId)
                handler.postDelayed(this, pollDelay)
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRideStatusBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        bookingId = intent.getIntExtra(EXTRA_BOOKING_ID, -1)
        viewModel = ViewModelProvider(this)[PassengerViewModel::class.java]

        if (bookingId == -1) {
            Toast.makeText(this, "Invalid booking.", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        setupMap()

        binding.btnCancelRide.setOnClickListener {
            AlertDialog.Builder(this)
                .setTitle("Cancel Ride")
                .setMessage("Are you sure you want to cancel this booking?")
                .setPositiveButton("Yes, Cancel") { _, _ -> viewModel.cancelBooking(bookingId) }
                .setNegativeButton("No", null)
                .show()
        }

        observeViewModel()
        observeCancelState()

        // Fetch immediately on launch
        viewModel.fetchBooking(bookingId)
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

        currentBooking?.let { renderMap(it) }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }

    override fun onResume() {
        super.onResume()
        handler.post(pollRunnable)
    }

    override fun onPause() {
        super.onPause()
        handler.removeCallbacks(pollRunnable)
        tricycleAnimator?.cancel()
    }

    override fun onDestroy() {
        super.onDestroy()
        tricycleAnimator?.cancel()
    }

    private fun observeViewModel() {
        viewModel.booking.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    if (currentBooking == null) {
                        binding.progressBar.visibility = View.VISIBLE
                    }
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    state.data?.let {
                        currentBooking = it
                        updateUI(it)
                        renderMap(it)
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    if (currentBooking == null) {
                        binding.tvStatus.text = "Error Loading"
                        Toast.makeText(this, "Status error: ${state.message}", Toast.LENGTH_LONG).show()
                    }
                }
            }
        }
    }

    private fun observeCancelState() {
        viewModel.cancelState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> binding.progressBar.visibility = View.VISIBLE
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    Toast.makeText(this, "Booking cancelled.", Toast.LENGTH_SHORT).show()
                    finish()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun renderMap(booking: Booking) {
        val map = googleMap ?: return

        val pickup = LatLng(booking.pickup_lat, booking.pickup_lng)
        val dropoff = LatLng(booking.dropoff_lat, booking.dropoff_lng)

        // Setup Pickup Marker
        if (pickupMarker == null) {
            pickupMarker = map.addMarker(
                MarkerOptions()
                    .position(pickup)
                    .title("Pickup Location")
                    .snippet(booking.pickup_address)
                    .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_AZURE))
            )
        } else {
            pickupMarker?.position = pickup
        }

        // Setup Dropoff Marker
        if (dropoffMarker == null) {
            dropoffMarker = map.addMarker(
                MarkerOptions()
                    .position(dropoff)
                    .title("Destination")
                    .snippet(booking.dropoff_address)
                    .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
            )
        } else {
            dropoffMarker?.position = dropoff
        }

        // Live Moving Tricycle Marker Handling
        val hasDriverLocation = booking.driver_lat != null && booking.driver_lng != null
        if (hasDriverLocation && booking.status in listOf(BookingStatus.ACCEPTED, BookingStatus.STARTED)) {
            val newDriverPos = LatLng(booking.driver_lat!!, booking.driver_lng!!)
            animateTricycleTo(newDriverPos)
        } else if (BookingStatus.isTerminal(booking.status)) {
            tricycleMarker?.remove()
            tricycleMarker = null
        }

        // Fit camera on initial load
        if (!isCameraFitted) {
            try {
                val boundsBuilder = LatLngBounds.Builder()
                    .include(pickup)
                    .include(dropoff)

                if (hasDriverLocation) {
                    boundsBuilder.include(LatLng(booking.driver_lat!!, booking.driver_lng!!))
                }

                val padding = (resources.displayMetrics.density * 44).toInt()
                map.animateCamera(CameraUpdateFactory.newLatLngBounds(boundsBuilder.build(), padding))
                isCameraFitted = true
            } catch (_: Exception) {
                map.animateCamera(CameraUpdateFactory.newLatLngZoom(pickup, 15f))
            }
        }
    }

    private fun animateTricycleTo(target: LatLng) {
        val map = googleMap ?: return

        if (tricycleMarker == null) {
            val icon = bitmapDescriptorFromVector(this, R.drawable.ic_tricycle_marker)
            tricycleMarker = map.addMarker(
                MarkerOptions()
                    .position(target)
                    .title("Driver Tricycle")
                    .anchor(0.5f, 0.5f)
                    .flat(true)
                    .apply {
                        if (icon != null) icon(icon)
                        else icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_ORANGE))
                    }
            )
            lastDriverPosition = target
            return
        }

        val start = lastDriverPosition ?: target
        if (start.latitude == target.latitude && start.longitude == target.longitude) {
            return
        }

        // Calculate heading bearing for smooth rotation
        val bearing = computeBearing(start, target)

        tricycleAnimator?.cancel()
        tricycleAnimator = ValueAnimator.ofFloat(0f, 1f).apply {
            duration = 2400L // 2.4 seconds smooth glide
            interpolator = LinearInterpolator()
            addUpdateListener { animator ->
                val fraction = animator.animatedFraction
                val lat = (target.latitude - start.latitude) * fraction + start.latitude
                val lng = (target.longitude - start.longitude) * fraction + start.longitude
                val currentPos = LatLng(lat, lng)

                tricycleMarker?.position = currentPos
                tricycleMarker?.rotation = bearing
            }
            start()
        }

        lastDriverPosition = target
    }

    private fun computeBearing(start: LatLng, end: LatLng): Float {
        val lat1 = Math.toRadians(start.latitude)
        val lng1 = Math.toRadians(start.longitude)
        val lat2 = Math.toRadians(end.latitude)
        val lng2 = Math.toRadians(end.longitude)

        val dLng = lng2 - lng1
        val y = Math.sin(dLng) * Math.cos(lat2)
        val x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(dLng)
        val initialBearing = Math.toDegrees(Math.atan2(y, x))
        return ((initialBearing + 360) % 360).toFloat()
    }

    private fun bitmapDescriptorFromVector(context: Context, vectorResId: Int): BitmapDescriptor? {
        return try {
            val vectorDrawable = ContextCompat.getDrawable(context, vectorResId) ?: return null
            vectorDrawable.setBounds(0, 0, vectorDrawable.intrinsicWidth, vectorDrawable.intrinsicHeight)
            val bitmap = Bitmap.createBitmap(
                vectorDrawable.intrinsicWidth,
                vectorDrawable.intrinsicHeight,
                Bitmap.Config.ARGB_8888
            )
            val canvas = Canvas(bitmap)
            vectorDrawable.draw(canvas)
            BitmapDescriptorFactory.fromBitmap(bitmap)
        } catch (_: Exception) {
            null
        }
    }

    private fun updateUI(booking: Booking) {
        binding.tvBookingId.text = "Booking #${booking.id}"
        binding.tvPickup.text = booking.pickup_address
        binding.tvDropoff.text = booking.dropoff_address
        binding.tvStatus.text = booking.status.uppercase().replace("_", " ")

        val color = when (booking.status) {
            BookingStatus.PENDING -> getColor(R.color.statusPending)
            BookingStatus.ACCEPTED -> getColor(R.color.statusAccepted)
            BookingStatus.STARTED -> getColor(R.color.statusStarted)
            BookingStatus.COMPLETED -> getColor(R.color.statusCompleted)
            BookingStatus.REJECTED,
            BookingStatus.CANCELLED -> getColor(R.color.statusRejected)
            else -> getColor(R.color.grey)
        }
        binding.tvStatus.setTextColor(color)

        // Floating Banner on Map
        when (booking.status) {
            BookingStatus.PENDING -> {
                binding.tvLiveDriverStatus.visibility = View.VISIBLE
                binding.tvLiveDriverStatus.text = "🔎 Looking for nearby drivers in Piat..."
            }
            BookingStatus.ACCEPTED -> {
                binding.tvLiveDriverStatus.visibility = View.VISIBLE
                binding.tvLiveDriverStatus.text = "🛺 Tricycle is on the way to you"
            }
            BookingStatus.STARTED -> {
                binding.tvLiveDriverStatus.visibility = View.VISIBLE
                binding.tvLiveDriverStatus.text = "🛺 In transit to destination"
            }
            else -> {
                binding.tvLiveDriverStatus.visibility = View.GONE
            }
        }

        // Fare & Discount breakdown
        val count = booking.passenger_count
        val countText = "$count ${if (count > 1) "Passengers" else "Passenger"}"
        val discount = booking.discount_type ?: "regular"

        if (discount != "regular") {
            val discountLabel = when (discount) {
                "student" -> "Student (20% OFF)"
                "senior" -> "Senior Citizen (20% OFF)"
                "pwd" -> "PWD (20% OFF)"
                "pregnant" -> "Pregnant (20% OFF)"
                else -> "Discount (20% OFF)"
            }
            binding.tvDiscountBadge.visibility = View.VISIBLE
            binding.tvDiscountBadge.text = discountLabel
            binding.tvPassengerCountLabel.text = "$countText • $discountLabel"
        } else {
            binding.tvDiscountBadge.visibility = View.GONE
            binding.tvPassengerCountLabel.text = "$countText (Regular Fare)"
        }

        binding.tvFareAmount.text = booking.fare?.let { "₱%.2f".format(it) } ?: "₱20.00"

        binding.btnCancelRide.visibility =
            if (booking.status == BookingStatus.PENDING) View.VISIBLE else View.GONE

        val showDriver = booking.status in listOf(
            BookingStatus.ACCEPTED, BookingStatus.STARTED, BookingStatus.COMPLETED
        ) && booking.driver_name != null
        binding.cardDriverInfo.visibility = if (showDriver) View.VISIBLE else View.GONE
        if (showDriver) {
            binding.tvDriverName.text = booking.driver_name ?: ""
            binding.tvDriverEmail.text = booking.driver_phone ?: ""
            booking.driver_vehicle_no?.let {
                binding.tvDriverVehicle.visibility = View.VISIBLE
                binding.tvDriverVehicle.text = "Tricycle Plate #$it"
            }
        }

        if (BookingStatus.isTerminal(booking.status)) {
            handler.removeCallbacks(pollRunnable)
            binding.tvPolling.visibility = View.GONE
        }
    }
}
