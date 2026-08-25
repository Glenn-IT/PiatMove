package com.piatmove.passenger.ui.booking

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.models.BookingRequest
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityBookRideBinding
import com.piatmove.passenger.ui.home.PassengerHomeActivity
import com.piatmove.passenger.ui.home.PassengerViewModel

class BookRideActivity : AppCompatActivity() {

    private lateinit var binding: ActivityBookRideBinding
    private lateinit var viewModel: PassengerViewModel
    private var passengerCount: Int = 1
    private val FARE_PER_PASSENGER: Double = 20.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBookRideBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        viewModel = ViewModelProvider(this)[PassengerViewModel::class.java]

        setupPassengerCounter()
        setupBottomNav()

        binding.btnUseSampleData.setOnClickListener { fillSampleData() }
        binding.btnRequestRide.setOnClickListener { submitBooking() }

        observeViewModel()
        updateFareUI()
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
        val totalFare = passengerCount * FARE_PER_PASSENGER
        binding.tvEstimatedFare.text = "₱${String.format("%.2f", totalFare)}"
        binding.tvFareBreakdown.text = "₱20.00 × $passengerCount passenger${if (passengerCount > 1) "s" else ""}"
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

    private fun fillSampleData() {
        binding.etPickupAddress.setText("Piat Public Market, Piat, Cagayan")
        binding.etPickupLat.setText("17.7887")
        binding.etPickupLng.setText("121.4673")
        binding.etDropoffAddress.setText("Piat Municipal Hall, Piat, Cagayan")
        binding.etDropoffLat.setText("17.7912")
        binding.etDropoffLng.setText("121.4698")
    }

    private fun submitBooking() {
        val pickupAddr  = binding.etPickupAddress.text.toString().trim()
        val pickupLat   = binding.etPickupLat.text.toString().toDoubleOrNull()
        val pickupLng   = binding.etPickupLng.text.toString().toDoubleOrNull()
        val dropoffAddr = binding.etDropoffAddress.text.toString().trim()
        val dropoffLat  = binding.etDropoffLat.text.toString().toDoubleOrNull()
        val dropoffLng  = binding.etDropoffLng.text.toString().toDoubleOrNull()

        if (pickupAddr.isEmpty())  { binding.tilPickupAddress.error  = "Pickup address is required"; return }
        if (pickupLat == null)     { binding.tilPickupLat.error      = "Valid latitude required"; return }
        if (pickupLng == null)     { binding.tilPickupLng.error      = "Valid longitude required"; return }
        if (dropoffAddr.isEmpty()) { binding.tilDropoffAddress.error = "Dropoff address is required"; return }
        if (dropoffLat == null)    { binding.tilDropoffLat.error     = "Valid latitude required"; return }
        if (dropoffLng == null)    { binding.tilDropoffLng.error     = "Valid longitude required"; return }

        binding.tilPickupAddress.error  = null
        binding.tilPickupLat.error      = null
        binding.tilPickupLng.error      = null
        binding.tilDropoffAddress.error = null
        binding.tilDropoffLat.error     = null
        binding.tilDropoffLng.error     = null

        val totalFare = passengerCount * FARE_PER_PASSENGER

        viewModel.createBooking(
            BookingRequest(
                pickup_address  = pickupAddr,
                pickup_lat      = pickupLat,
                pickup_lng      = pickupLng,
                dropoff_address = dropoffAddr,
                dropoff_lat     = dropoffLat,
                dropoff_lng     = dropoffLng,
                passenger_count = passengerCount,
                fare            = totalFare
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

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }
}
