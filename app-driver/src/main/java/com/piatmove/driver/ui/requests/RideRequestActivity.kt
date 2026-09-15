package com.piatmove.driver.ui.requests

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.MarkerOptions
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.Resource
import com.piatmove.driver.R
import com.piatmove.driver.databinding.ActivityRideRequestBinding
import com.piatmove.driver.ui.home.DriverViewModel
import com.piatmove.driver.ui.ride.ActiveRideActivity

class RideRequestActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var binding: ActivityRideRequestBinding
    private lateinit var viewModel: DriverViewModel
    private var googleMap: GoogleMap? = null
    private var currentBooking: Booking? = null

    private var bookingId: Int = -1
    private var isRejecting: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRideRequestBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        bookingId = intent.getIntExtra(EXTRA_BOOKING_ID, -1)
        viewModel = ViewModelProvider(this)[DriverViewModel::class.java]

        setupMap()
        loadBookingDetails()

        binding.btnAccept.setOnClickListener {
            if (bookingId != -1) {
                isRejecting = false
                viewModel.acceptRide(bookingId)
            }
        }

        binding.btnReject.setOnClickListener {
            if (bookingId != -1) {
                AlertDialog.Builder(this)
                    .setTitle("Decline Ride Request")
                    .setMessage("Are you sure you want to decline this ride request?")
                    .setPositiveButton("Yes, Decline") { _, _ ->
                        isRejecting = true
                        viewModel.rejectRide(bookingId)
                    }
                    .setNegativeButton("Cancel", null)
                    .show()
            }
        }

        observeViewModel()
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
            map.animateCamera(CameraUpdateFactory.newLatLngZoom(pickup, 15f))
        }
    }

    private fun loadBookingDetails() {
        viewModel.requests.observe(this) { state ->
            if (state is Resource.Success) {
                val booking = state.data?.firstOrNull { it.id == bookingId } ?: return@observe
                currentBooking = booking
                renderMapMarkers(booking)

                val count = booking.passenger_count
                val passengerLabel = if (count > 1) "$count Passengers" else "1 Passenger"
                val discount = booking.discount_type ?: "regular"

                binding.tvPassengerName.text  = booking.passenger_name ?: "Passenger #${booking.passenger_id}"
                binding.tvPassengerPhone.text = booking.passenger_phone ?: "—"
                binding.tvPickup.text         = booking.pickup_address
                binding.tvDropoff.text        = booking.dropoff_address
                binding.tvFare.text           = booking.fare?.let { "₱%.2f".format(it) } ?: "₱--"

                if (discount != "regular") {
                    val discountTitle = when (discount) {
                        "student"  -> "Student (20% OFF)"
                        "senior"   -> "Senior Citizen (20% OFF)"
                        "pwd"      -> "PWD (20% OFF)"
                        "pregnant" -> "Pregnant (20% OFF)"
                        else       -> "Discount (20% OFF)"
                    }
                    binding.tvFareBreakdown.text = "$passengerLabel • $discountTitle"
                    binding.cardDiscountNotice.visibility = View.VISIBLE
                    binding.tvDiscountNotice.text = "Passenger applied for $discountTitle. Please verify their valid ID / document upon pickup."
                } else {
                    binding.tvFareBreakdown.text = "$passengerLabel • Regular Fare"
                    binding.cardDiscountNotice.visibility = View.GONE
                }
            }
        }
        viewModel.loadRequests()
    }

    private fun observeViewModel() {
        viewModel.actionState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.btnAccept.isEnabled    = false
                    binding.btnReject.isEnabled    = false
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnAccept.isEnabled    = true
                    binding.btnReject.isEnabled    = true

                    if (isRejecting) {
                        Toast.makeText(this, "Ride request declined", Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        Toast.makeText(this, "Ride accepted successfully!", Toast.LENGTH_SHORT).show()
                        startActivity(
                            Intent(this, ActiveRideActivity::class.java)
                                .putExtra(ActiveRideActivity.EXTRA_BOOKING_ID, bookingId)
                        )
                        finish()
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnAccept.isEnabled    = true
                    binding.btnReject.isEnabled    = true
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }

    companion object {
        const val EXTRA_BOOKING_ID = "extra_booking_id"
    }
}
