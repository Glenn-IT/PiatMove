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
import com.google.android.gms.maps.model.Dash
import com.google.android.gms.maps.model.Gap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.Polyline
import com.google.android.gms.maps.model.PolylineOptions
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

    // Map Markers & Route Path
    private var pickupMarker: Marker? = null
    private var dropoffMarker: Marker? = null
    private var tricycleMarker: Marker? = null
    private var routePolyline: Polyline? = null

    // Smooth movement tracking & simulation fallback
    private var lastDriverPosition: LatLng? = null
    private var fallbackDriverPos: LatLng? = null
    private var tricycleAnimator: ValueAnimator? = null
    private var isCameraFitted = false
    private var hasShownRatingDialog = false
    private var ratingDialog: AlertDialog? = null

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
        ratingDialog?.dismiss()
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

        viewModel.rateState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    // Handled inside dialog
                }
                is Resource.Success -> {
                    ratingDialog?.dismiss()
                    Toast.makeText(this, "⭐ Thank you for rating your driver!", Toast.LENGTH_SHORT).show()
                    viewModel.fetchBooking(bookingId)
                }
                is Resource.Error -> {
                    ratingDialog?.findViewById<View>(R.id.pbRatingLoading)?.visibility = View.GONE
                    ratingDialog?.findViewById<View>(R.id.btnSubmitRating)?.isEnabled = true
                    ratingDialog?.findViewById<View>(R.id.btnSkipRating)?.isEnabled = true
                    Toast.makeText(this, "Rating error: ${state.message}", Toast.LENGTH_LONG).show()
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

        // Setup Pickup Marker (Azure/Blue)
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

        // Setup Dropoff Marker (Red)
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

        // Resolve driver location
        val hasRealDriverLocation = booking.driver_lat != null && booking.driver_lng != null
        val isRideActive = booking.status in listOf(BookingStatus.ACCEPTED, BookingStatus.STARTED)

        val driverPos: LatLng? = if (hasRealDriverLocation) {
            LatLng(booking.driver_lat!!, booking.driver_lng!!)
        } else if (isRideActive) {
            // Intelligent approach fallback if coordinates are null (e.g. initial GPS acquisition)
            // Offset ~350m southwest of pickup so tricycle is immediately visible on the map and heading to pickup!
            if (fallbackDriverPos == null) {
                fallbackDriverPos = LatLng(booking.pickup_lat - 0.0028, booking.pickup_lng - 0.0022)
            } else if (booking.status == BookingStatus.ACCEPTED) {
                // Smoothly advance 15% towards pickup each polling cycle
                val lat = fallbackDriverPos!!.latitude + (booking.pickup_lat - fallbackDriverPos!!.latitude) * 0.15
                val lng = fallbackDriverPos!!.longitude + (booking.pickup_lng - fallbackDriverPos!!.longitude) * 0.15
                fallbackDriverPos = LatLng(lat, lng)
            } else if (booking.status == BookingStatus.STARTED) {
                // Smoothly advance 15% towards dropoff
                val lat = fallbackDriverPos!!.latitude + (booking.dropoff_lat - fallbackDriverPos!!.latitude) * 0.15
                val lng = fallbackDriverPos!!.longitude + (booking.dropoff_lng - fallbackDriverPos!!.longitude) * 0.15
                fallbackDriverPos = LatLng(lat, lng)
            }
            fallbackDriverPos
        } else {
            null
        }

        val routeDestination = if (booking.status == BookingStatus.ACCEPTED) pickup else dropoff
        val routeColor = if (booking.status == BookingStatus.ACCEPTED) {
            ContextCompat.getColor(this, R.color.colorPrimary)
        } else {
            ContextCompat.getColor(this, R.color.statusStarted)
        }

        // Live Moving Tricycle Marker Handling
        if (driverPos != null && isRideActive) {
            animateTricycleTo(driverPos, routeDestination)
            updateRoutePolyline(driverPos, routeDestination, routeColor)
        } else if (BookingStatus.isTerminal(booking.status)) {
            tricycleMarker?.remove()
            tricycleMarker = null
            routePolyline?.remove()
            routePolyline = null
        }

        // Fit camera on initial load
        if (!isCameraFitted) {
            try {
                val boundsBuilder = LatLngBounds.Builder()
                    .include(pickup)
                    .include(dropoff)

                if (driverPos != null) {
                    boundsBuilder.include(driverPos)
                }

                val padding = (resources.displayMetrics.density * 52).toInt()
                map.animateCamera(CameraUpdateFactory.newLatLngBounds(boundsBuilder.build(), padding))
                isCameraFitted = true
            } catch (_: Exception) {
                map.animateCamera(CameraUpdateFactory.newLatLngZoom(pickup, 15f))
            }
        }
    }

    private fun updateRoutePolyline(start: LatLng, destination: LatLng, color: Int) {
        val map = googleMap ?: return
        val pattern = listOf(Dash(30f), Gap(15f))
        if (routePolyline == null) {
            routePolyline = map.addPolyline(
                PolylineOptions()
                    .add(start, destination)
                    .width(9f)
                    .color(color)
                    .pattern(pattern)
                    .geodesic(true)
            )
        } else {
            routePolyline?.points = listOf(start, destination)
            routePolyline?.color = color
        }
    }

    private fun animateTricycleTo(target: LatLng, destination: LatLng) {
        val map = googleMap ?: return

        // Compute heading bearing towards destination (pickup or dropoff)
        val headingToDestination = computeBearing(target, destination)

        if (tricycleMarker == null) {
            val icon = bitmapDescriptorFromVector(this, R.drawable.ic_tricycle_marker)
            tricycleMarker = map.addMarker(
                MarkerOptions()
                    .position(target)
                    .title("Driver Tricycle")
                    .snippet("On the way to pickup")
                    .anchor(0.5f, 0.5f)
                    .rotation(headingToDestination)
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
            tricycleMarker?.rotation = headingToDestination
            return
        }

        // Calculate travel bearing for smooth rotation
        val travelBearing = computeBearing(start, target)

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
                tricycleMarker?.rotation = travelBearing

                // Keep route line dynamically connected to moving tricycle
                routePolyline?.points = listOf(currentPos, destination)
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
            val density = context.resources.displayMetrics.density
            val sizePx = (52 * density).toInt().coerceAtLeast(64)
            vectorDrawable.setBounds(0, 0, sizePx, sizePx)
            val bitmap = Bitmap.createBitmap(
                sizePx,
                sizePx,
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
                binding.tvLiveDriverStatus.text = "🛺 Tricycle is on the way to pickup location"
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

        // Rating Status & Prompt for Completed Ride
        if (booking.status == BookingStatus.COMPLETED) {
            val currentRating = booking.rating
            if (currentRating != null && currentRating > 0) {
                binding.cardRatedDriverBanner.visibility = View.VISIBLE
                binding.cardRateDriverPrompt.visibility = View.GONE
                val starCount = currentRating.coerceIn(1, 5)
                val starsStr = "⭐".repeat(starCount)
                binding.tvYourRatingStars.text = "$starsStr Rated $currentRating.0 / 5.0"
                if (!booking.rating_comment.isNullOrBlank()) {
                    binding.tvYourRatingComment.visibility = View.VISIBLE
                    binding.tvYourRatingComment.text = "\"${booking.rating_comment}\""
                } else {
                    binding.tvYourRatingComment.visibility = View.GONE
                }
            } else {
                binding.cardRatedDriverBanner.visibility = View.GONE
                binding.cardRateDriverPrompt.visibility = View.VISIBLE
                binding.tvRatePromptDriverName.text = "How was your ride with ${booking.driver_name ?: "your driver"}?"
                binding.btnOpenRating.setOnClickListener {
                    showRatingDialog(booking)
                }

                // Automatically pop up rating dialog on completion if not yet presented
                if (!hasShownRatingDialog) {
                    hasShownRatingDialog = true
                    showRatingDialog(booking)
                }
            }
        } else {
            binding.cardRateDriverPrompt.visibility = View.GONE
            binding.cardRatedDriverBanner.visibility = View.GONE
        }

        if (BookingStatus.isTerminal(booking.status)) {
            handler.removeCallbacks(pollRunnable)
            binding.tvPolling.visibility = View.GONE
        }
    }

    private fun showRatingDialog(booking: Booking) {
        if (isFinishing || isDestroyed) return
        ratingDialog?.dismiss()

        val dialogBinding = com.piatmove.passenger.databinding.DialogRateDriverBinding.inflate(layoutInflater)
        val dialog = AlertDialog.Builder(this)
            .setView(dialogBinding.root)
            .setCancelable(true)
            .create()

        dialog.window?.setBackgroundDrawableResource(android.R.color.transparent)

        dialogBinding.tvRateDriverName.text = booking.driver_name ?: "Your Tricycle Driver"
        dialogBinding.tvRateDriverVehicle.text = booking.driver_vehicle_no?.let { "Tricycle Plate #$it" } ?: "Piat Tricycle"
        dialogBinding.tvRatingPrompt.text = "How was your trip with ${booking.driver_name ?: "your driver"}?"

        var currentSelectedRating = 5
        val stars = listOf(
            dialogBinding.ivStar1,
            dialogBinding.ivStar2,
            dialogBinding.ivStar3,
            dialogBinding.ivStar4,
            dialogBinding.ivStar5
        )

        fun updateStars(rating: Int) {
            currentSelectedRating = rating
            for (i in stars.indices) {
                if (i < rating) {
                    stars[i].setImageResource(R.drawable.ic_star_filled)
                } else {
                    stars[i].setImageResource(R.drawable.ic_star_empty)
                }
            }
            dialogBinding.tvRatingLabel.text = when (rating) {
                1 -> "⭐ Needs Improvement (1 Star)"
                2 -> "⭐⭐ Fair (2 Stars)"
                3 -> "⭐⭐⭐ Good (3 Stars)"
                4 -> "⭐⭐⭐⭐ Very Good (4 Stars)"
                5 -> "⭐⭐⭐⭐⭐ Excellent (5 Stars)"
                else -> ""
            }
        }

        updateStars(5)

        stars.forEachIndexed { index, imageView ->
            imageView.setOnClickListener {
                updateStars(index + 1)
            }
        }

        dialogBinding.btnSubmitRating.setOnClickListener {
            dialogBinding.pbRatingLoading.visibility = View.VISIBLE
            dialogBinding.btnSubmitRating.isEnabled = false
            dialogBinding.btnSkipRating.isEnabled = false

            val selectedCompliments = mutableListOf<String>()
            if (dialogBinding.chipSafe.isChecked) selectedCompliments.add("Safe Driving")
            if (dialogBinding.chipPolite.isChecked) selectedCompliments.add("Polite & Friendly")
            if (dialogBinding.chipFast.isChecked) selectedCompliments.add("Fast & On-Time")
            if (dialogBinding.chipClean.isChecked) selectedCompliments.add("Clean Ride")

            val customNote = dialogBinding.etRatingComment.text.toString().trim()
            val commentParts = mutableListOf<String>()
            if (selectedCompliments.isNotEmpty()) {
                commentParts.add(selectedCompliments.joinToString(", "))
            }
            if (customNote.isNotEmpty()) {
                commentParts.add(customNote)
            }
            val finalComment = if (commentParts.isNotEmpty()) commentParts.joinToString(" • ") else null

            viewModel.rateDriver(booking.id, currentSelectedRating, finalComment)
        }

        dialogBinding.btnSkipRating.setOnClickListener {
            dialog.dismiss()
        }

        ratingDialog = dialog
        dialog.show()
    }
}
