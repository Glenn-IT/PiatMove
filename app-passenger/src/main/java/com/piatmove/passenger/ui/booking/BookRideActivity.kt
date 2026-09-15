package com.piatmove.passenger.ui.booking

import android.Manifest
import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.content.Intent
import android.content.pm.PackageManager
import android.content.res.ColorStateList
import android.graphics.Color
import android.location.Geocoder
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.piatmove.core.data.models.BookingRequest
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityBookRideBinding
import com.piatmove.passenger.ui.home.PassengerHomeActivity
import com.piatmove.passenger.ui.home.PassengerViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.Locale

class BookRideActivity : AppCompatActivity(), OnMapReadyCallback {

    private enum class PinMode { PICKUP, DROPOFF }

    private lateinit var binding: ActivityBookRideBinding
    private lateinit var viewModel: PassengerViewModel
    private lateinit var fusedLocationClient: FusedLocationProviderClient

    private var googleMap: GoogleMap? = null
    private var currentPinMode = PinMode.PICKUP

    // Coordinates and addresses
    private var pickupLat: Double? = null
    private var pickupLng: Double? = null
    private var pickupAddress: String = ""

    private var dropoffLat: Double? = null
    private var dropoffLng: Double? = null
    private var dropoffAddress: String = ""

    // Markers on map for confirmed points
    private var pickupMarker: Marker? = null
    private var dropoffMarker: Marker? = null

    // Default Town Center: Piat, Cagayan
    private val PIAT_CENTER = LatLng(17.7887, 121.4673)

    // Passenger & Fare calculation
    private var passengerCount: Int = 1
    private var selectedDiscountType: String = "regular"
    private val REGULAR_FARE_PER_PASSENGER: Double = 20.0
    private val DISCOUNT_RATE: Double = 0.20 // 20% statutory discount (RA 10931, RA 9994, RA 7277)

    private var geocodeJob: Job? = null

    // Permission launcher for Location
    private val locationPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val fineGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] ?: false
        val coarseGranted = permissions[Manifest.permission.ACCESS_COARSE_LOCATION] ?: false
        if (fineGranted || coarseGranted) {
            enableMyLocationOnMap()
            zoomToCurrentLocation()
        } else {
            Toast.makeText(this, "Location permission helps automatically pinpoint your pickup.", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBookRideBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        viewModel = ViewModelProvider(this)[PassengerViewModel::class.java]
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        setupMap()
        setupPinModeSelectors()
        setupPassengerCounter()
        setupDiscountSelector()
        setupBottomNav()
        setupActionButtons()

        observeViewModel()
        updateFareUI()
        updatePinModeUI()
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

        // Center initially on Piat town center
        map.moveCamera(CameraUpdateFactory.newLatLngZoom(PIAT_CENTER, 15.5f))

        checkLocationPermission()

        // Drag animations (Grab floating pin effect)
        map.setOnCameraMoveStartedListener { reason ->
            if (reason == GoogleMap.OnCameraMoveStartedListener.REASON_GESTURE) {
                liftPinAnimation()
            }
        }

        // Camera idle listener (captures exact coordinates where pin dropped)
        map.setOnCameraIdleListener {
            dropPinAnimation()
            val center = map.cameraPosition.target
            onLocationPinned(center.latitude, center.longitude)
        }
    }

    private fun liftPinAnimation() {
        val pinLift = ObjectAnimator.ofFloat(binding.ivCenterPin, "translationY", -28f)
        val shadowShrinkX = ObjectAnimator.ofFloat(binding.ivPinShadow, "scaleX", 0.6f)
        val shadowShrinkY = ObjectAnimator.ofFloat(binding.ivPinShadow, "scaleY", 0.6f)

        AnimatorSet().apply {
            playTogether(pinLift, shadowShrinkX, shadowShrinkY)
            duration = 150
            start()
        }
    }

    private fun dropPinAnimation() {
        val pinDrop = ObjectAnimator.ofFloat(binding.ivCenterPin, "translationY", 0f)
        val shadowExpandX = ObjectAnimator.ofFloat(binding.ivPinShadow, "scaleX", 1.0f)
        val shadowExpandY = ObjectAnimator.ofFloat(binding.ivPinShadow, "scaleY", 1.0f)

        AnimatorSet().apply {
            playTogether(pinDrop, shadowExpandX, shadowExpandY)
            duration = 200
            start()
        }
    }

    private fun onLocationPinned(lat: Double, lng: Double) {
        val map = googleMap ?: return

        when (currentPinMode) {
            PinMode.PICKUP -> {
                pickupLat = lat
                pickupLng = lng

                // Update pickup marker on map
                if (pickupMarker == null) {
                    pickupMarker = map.addMarker(
                        MarkerOptions()
                            .position(LatLng(lat, lng))
                            .title("Pickup Location")
                            .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_AZURE))
                    )
                } else {
                    pickupMarker?.position = LatLng(lat, lng)
                }

                // Debounced Reverse Geocoding
                geocodeJob?.cancel()
                geocodeJob = lifecycleScope.launch {
                    delay(300)
                    val resolvedAddr = reverseGeocode(lat, lng)
                    pickupAddress = resolvedAddr
                    binding.tvPickupAddress.text = resolvedAddr
                    if (binding.etPickupAddress.text.isNullOrBlank() || binding.etPickupAddress.text.toString().startsWith("Near") || binding.etPickupAddress.text.toString().startsWith("Piat")) {
                        binding.etPickupAddress.setText(resolvedAddr)
                    }
                }
            }
            PinMode.DROPOFF -> {
                dropoffLat = lat
                dropoffLng = lng

                // Update dropoff marker on map
                if (dropoffMarker == null) {
                    dropoffMarker = map.addMarker(
                        MarkerOptions()
                            .position(LatLng(lat, lng))
                            .title("Destination")
                            .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
                    )
                } else {
                    dropoffMarker?.position = LatLng(lat, lng)
                }

                // Debounced Reverse Geocoding
                geocodeJob?.cancel()
                geocodeJob = lifecycleScope.launch {
                    delay(300)
                    val resolvedAddr = reverseGeocode(lat, lng)
                    dropoffAddress = resolvedAddr
                    binding.tvDropoffAddress.text = resolvedAddr
                    if (binding.etDropoffAddress.text.isNullOrBlank() || binding.etDropoffAddress.text.toString().startsWith("Near") || binding.etDropoffAddress.text.toString().startsWith("Piat")) {
                        binding.etDropoffAddress.setText(resolvedAddr)
                    }
                }
            }
        }
    }

    private suspend fun reverseGeocode(lat: Double, lng: Double): String = withContext(Dispatchers.IO) {
        try {
            val geocoder = Geocoder(this@BookRideActivity, Locale.getDefault())
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                var result = ""
                geocoder.getFromLocation(lat, lng, 1) { addresses ->
                    if (addresses.isNotEmpty()) {
                        val addr = addresses[0]
                        result = formatAddress(addr)
                    }
                }
                // Wait briefly for callback
                var attempts = 0
                while (result.isEmpty() && attempts < 10) {
                    delay(50)
                    attempts++
                }
                if (result.isNotEmpty()) return@withContext result
            } else {
                @Suppress("DEPRECATION")
                val list = geocoder.getFromLocation(lat, lng, 1)
                if (!list.isNullOrEmpty()) {
                    return@withContext formatAddress(list[0])
                }
            }
        } catch (_: Exception) {
            // Geocoder service unavailable or network offline
        }
        return@withContext "Location near Piat (${String.format(Locale.US, "%.4f", lat)}, ${String.format(Locale.US, "%.4f", lng)})"
    }

    private fun formatAddress(address: android.location.Address): String {
        val feature = address.featureName
        val thoroughfare = address.thoroughfare
        val subLocality = address.subLocality
        val locality = address.locality ?: "Piat"

        val parts = mutableListOf<String>()
        if (!feature.isNullOrBlank() && feature != thoroughfare) parts.add(feature)
        if (!thoroughfare.isNullOrBlank()) parts.add(thoroughfare)
        if (!subLocality.isNullOrBlank()) parts.add(subLocality)
        if (parts.isEmpty()) parts.add(locality)

        return parts.joinToString(", ")
    }

    private fun setupPinModeSelectors() {
        binding.cardPickup.setOnClickListener {
            if (currentPinMode != PinMode.PICKUP) {
                currentPinMode = PinMode.PICKUP
                updatePinModeUI()
                pickupLat?.let { lat ->
                    pickupLng?.let { lng ->
                        googleMap?.animateCamera(CameraUpdateFactory.newLatLng(LatLng(lat, lng)))
                    }
                }
            }
        }

        binding.cardDropoff.setOnClickListener {
            if (currentPinMode != PinMode.DROPOFF) {
                currentPinMode = PinMode.DROPOFF
                updatePinModeUI()
                if (dropoffLat != null && dropoffLng != null) {
                    googleMap?.animateCamera(CameraUpdateFactory.newLatLng(LatLng(dropoffLat!!, dropoffLng!!)))
                }
            }
        }
    }

    private fun updatePinModeUI() {
        val primaryBlue = ContextCompat.getColor(this, R.color.colorPrimary)
        val greenAccent = ContextCompat.getColor(this, R.color.colorAccent)
        val dividerColor = ContextCompat.getColor(this, R.color.colorDivider)
        val greyText = ContextCompat.getColor(this, R.color.grey_text)

        when (currentPinMode) {
            PinMode.PICKUP -> {
                binding.cardPickup.strokeColor = primaryBlue
                binding.cardPickup.strokeWidth = dpToPx(2)
                binding.tvBadgePickup.text = "PINNING"
                binding.tvBadgePickup.setBackgroundColor(Color.parseColor("#DCFCE7"))
                binding.tvBadgePickup.setTextColor(Color.parseColor("#15803D"))

                binding.cardDropoff.strokeColor = dividerColor
                binding.cardDropoff.strokeWidth = dpToPx(1)
                binding.tvBadgeDropoff.text = if (dropoffLat != null) "SAVED" else "TAP TO PIN"
                binding.tvBadgeDropoff.setBackgroundColor(Color.parseColor("#F1F5F9"))
                binding.tvBadgeDropoff.setTextColor(greyText)

                binding.ivCenterPin.imageTintList = ColorStateList.valueOf(primaryBlue)
                binding.tvPinBubble.text = "📍 Drag to set Pickup"
            }
            PinMode.DROPOFF -> {
                binding.cardDropoff.strokeColor = greenAccent
                binding.cardDropoff.strokeWidth = dpToPx(2)
                binding.tvBadgeDropoff.text = "PINNING"
                binding.tvBadgeDropoff.setBackgroundColor(Color.parseColor("#DCFCE7"))
                binding.tvBadgeDropoff.setTextColor(Color.parseColor("#15803D"))

                binding.cardPickup.strokeColor = dividerColor
                binding.cardPickup.strokeWidth = dpToPx(1)
                binding.tvBadgePickup.text = if (pickupLat != null) "SAVED" else "TAP TO PIN"
                binding.tvBadgePickup.setBackgroundColor(Color.parseColor("#F1F5F9"))
                binding.tvBadgePickup.setTextColor(greyText)

                binding.ivCenterPin.imageTintList = ColorStateList.valueOf(greenAccent)
                binding.tvPinBubble.text = "🏁 Drag to set Destination"
            }
        }
    }

    private fun setupActionButtons() {
        binding.btnMyLocation.setOnClickListener {
            checkLocationPermission(requestIfNotGranted = true)
        }

        binding.btnUseSampleData.setOnClickListener {
            fillSampleData()
        }

        binding.btnRequestRide.setOnClickListener {
            submitBooking()
        }
    }

    private fun checkLocationPermission(requestIfNotGranted: Boolean = false) {
        val fineLocation = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
        val coarseLocation = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)

        if (fineLocation == PackageManager.PERMISSION_GRANTED || coarseLocation == PackageManager.PERMISSION_GRANTED) {
            enableMyLocationOnMap()
            if (requestIfNotGranted) {
                zoomToCurrentLocation()
            }
        } else if (requestIfNotGranted) {
            locationPermissionLauncher.launch(
                arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                )
            )
        }
    }

    private fun enableMyLocationOnMap() {
        try {
            googleMap?.isMyLocationEnabled = true
            googleMap?.uiSettings?.isMyLocationButtonEnabled = false
        } catch (_: SecurityException) {}
    }

    private fun zoomToCurrentLocation() {
        try {
            fusedLocationClient.lastLocation.addOnSuccessListener { location ->
                if (location != null) {
                    val userLatLng = LatLng(location.latitude, location.longitude)
                    googleMap?.animateCamera(CameraUpdateFactory.newLatLngZoom(userLatLng, 16f))
                } else {
                    Toast.makeText(this, "Acquiring GPS location...", Toast.LENGTH_SHORT).show()
                }
            }
        } catch (_: SecurityException) {}
    }

    private fun setupDiscountSelector() {
        binding.chipGroupDiscount.setOnCheckedStateChangeListener { _, checkedIds ->
            selectedDiscountType = when (checkedIds.firstOrNull()) {
                R.id.chipStudent  -> "student"
                R.id.chipSenior   -> "senior"
                R.id.chipPwd      -> "pwd"
                R.id.chipPregnant -> "pregnant"
                else              -> "regular"
            }
            updateFareUI()
        }
    }

    private fun setupPassengerCounter() {
        binding.btnMinusPassenger.setOnClickListener {
            if (passengerCount > 1) {
                passengerCount--
                updateFareUI()
            } else {
                Toast.makeText(this, "Minimum is 1 passenger.", Toast.LENGTH_SHORT).show()
            }
        }

        binding.btnPlusPassenger.setOnClickListener {
            if (passengerCount < 5) {
                passengerCount++
                updateFareUI()
            } else {
                Toast.makeText(this, "Maximum capacity is 5 passengers per tricycle.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun updateFareUI() {
        binding.tvPassengerCount.text = passengerCount.toString()

        val isDiscounted = selectedDiscountType != "regular"
        val farePerPax = if (isDiscounted) {
            REGULAR_FARE_PER_PASSENGER * (1.0 - DISCOUNT_RATE) // ₱16.00
        } else {
            REGULAR_FARE_PER_PASSENGER // ₱20.00
        }

        val totalFare = passengerCount * farePerPax
        binding.tvEstimatedFare.text = "₱${String.format(Locale.US, "%.2f", totalFare)}"

        val passengerLabel = if (passengerCount > 1) "passengers" else "passenger"
        if (isDiscounted) {
            val discountTitle = when (selectedDiscountType) {
                "student"  -> "Student"
                "senior"   -> "Senior Citizen"
                "pwd"      -> "PWD"
                "pregnant" -> "Pregnant"
                else       -> "Discount"
            }
            val savings = passengerCount * (REGULAR_FARE_PER_PASSENGER * DISCOUNT_RATE)
            binding.tvFareBreakdown.text = "₱${String.format(Locale.US, "%.2f", farePerPax)} × $passengerCount $passengerLabel (20% OFF $discountTitle • Save ₱${String.format(Locale.US, "%.2f", savings)})"
            binding.layoutDiscountNotice.visibility = View.VISIBLE
            binding.tvDiscountNotice.text = "Please present your valid $discountTitle ID / document to the driver upon boarding for 20% discount verification."
        } else {
            binding.tvFareBreakdown.text = "₱20.00 × $passengerCount $passengerLabel"
            binding.layoutDiscountNotice.visibility = View.GONE
        }
    }

    private fun fillSampleData() {
        val pickup = LatLng(17.7887, 121.4673)
        val dropoff = LatLng(17.7912, 121.4698)

        pickupLat = pickup.latitude
        pickupLng = pickup.longitude
        pickupAddress = "Piat Public Market, Piat, Cagayan"
        binding.tvPickupAddress.text = pickupAddress
        binding.etPickupAddress.setText(pickupAddress)

        dropoffLat = dropoff.latitude
        dropoffLng = dropoff.longitude
        dropoffAddress = "Piat Municipal Hall, Piat, Cagayan"
        binding.tvDropoffAddress.text = dropoffAddress
        binding.etDropoffAddress.setText(dropoffAddress)

        googleMap?.let { map ->
            if (pickupMarker == null) {
                pickupMarker = map.addMarker(
                    MarkerOptions()
                        .position(pickup)
                        .title("Pickup: Market")
                        .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_AZURE))
                )
            } else {
                pickupMarker?.position = pickup
            }

            if (dropoffMarker == null) {
                dropoffMarker = map.addMarker(
                    MarkerOptions()
                        .position(dropoff)
                        .title("Dropoff: Municipal Hall")
                        .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
                )
            } else {
                dropoffMarker?.position = dropoff
            }

            val bounds = LatLngBounds.Builder()
                .include(pickup)
                .include(dropoff)
                .build()
            map.animateCamera(CameraUpdateFactory.newLatLngBounds(bounds, dpToPx(60)))
        }

        currentPinMode = PinMode.DROPOFF
        updatePinModeUI()
        Toast.makeText(this, "Demo route loaded: Market ➔ Municipal Hall", Toast.LENGTH_SHORT).show()
    }

    private fun submitBooking() {
        val finalPickupAddr = binding.etPickupAddress.text.toString().trim().ifEmpty { pickupAddress }
        val finalDropoffAddr = binding.etDropoffAddress.text.toString().trim().ifEmpty { dropoffAddress }

        if (pickupLat == null || pickupLng == null || finalPickupAddr.isEmpty()) {
            Toast.makeText(this, "Please move map to set your Pickup location.", Toast.LENGTH_SHORT).show()
            currentPinMode = PinMode.PICKUP
            updatePinModeUI()
            return
        }

        if (dropoffLat == null || dropoffLng == null || finalDropoffAddr.isEmpty()) {
            Toast.makeText(this, "Please move map to set your Destination.", Toast.LENGTH_SHORT).show()
            currentPinMode = PinMode.DROPOFF
            updatePinModeUI()
            return
        }

        val farePerPax = if (selectedDiscountType != "regular") {
            REGULAR_FARE_PER_PASSENGER * (1.0 - DISCOUNT_RATE)
        } else {
            REGULAR_FARE_PER_PASSENGER
        }
        val totalFare = passengerCount * farePerPax

        viewModel.createBooking(
            BookingRequest(
                pickup_address  = finalPickupAddr,
                pickup_lat      = pickupLat!!,
                pickup_lng      = pickupLng!!,
                dropoff_address = finalDropoffAddr,
                dropoff_lat     = dropoffLat!!,
                dropoff_lng     = dropoffLng!!,
                passenger_count = passengerCount,
                fare            = totalFare,
                discount_type   = selectedDiscountType
            )
        )
    }

    private fun observeViewModel() {
        viewModel.createState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility   = View.VISIBLE
                    binding.btnRequestRide.isEnabled = false
                }
                is Resource.Success -> {
                    binding.progressBar.visibility   = View.GONE
                    binding.btnRequestRide.isEnabled = true
                    val bookingId = state.data ?: return@observe
                    startActivity(
                        Intent(this, RideStatusActivity::class.java)
                            .putExtra(RideStatusActivity.EXTRA_BOOKING_ID, bookingId)
                    )
                    finish()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility   = View.GONE
                    binding.btnRequestRide.isEnabled = true
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun setupBottomNav() {
        binding.bottomNav.selectedItemId = R.id.nav_book_ride
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    startActivity(Intent(this, PassengerHomeActivity::class.java).apply {
                        flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
                    })
                    finish()
                    true
                }
                R.id.nav_book_ride -> true
                R.id.nav_history -> {
                    startActivity(Intent(this, PassengerHomeActivity::class.java).apply {
                        flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
                        putExtra("TARGET_TAB", R.id.nav_history)
                    })
                    finish()
                    true
                }
                R.id.nav_profile -> {
                    startActivity(Intent(this, PassengerHomeActivity::class.java).apply {
                        flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
                        putExtra("TARGET_TAB", R.id.nav_profile)
                    })
                    finish()
                    true
                }
                else -> false
            }
        }
    }

    private fun dpToPx(dp: Int): Int {
        return (dp * resources.displayMetrics.density).toInt()
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }
}
