package com.piatmove.driver.ui.requests

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.utils.Resource
import com.piatmove.driver.databinding.ActivityRideRequestBinding
import com.piatmove.driver.ui.home.DriverViewModel
import com.piatmove.driver.ui.ride.ActiveRideActivity

class RideRequestActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRideRequestBinding
    private lateinit var viewModel: DriverViewModel
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

        loadBookingDetails()

        binding.btnAccept.setOnClickListener {
            if (bookingId != -1) {
                viewModel.acceptRide(bookingId)
            }
        }

        observeViewModel()
    }

    private fun loadBookingDetails() {
        viewModel.requests.observe(this) { state ->
            if (state is Resource.Success) {
                val booking = state.data?.firstOrNull { it.id == bookingId } ?: return@observe
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
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnAccept.isEnabled    = true
                    Toast.makeText(this, "Ride accepted successfully!", Toast.LENGTH_SHORT).show()
                    startActivity(
                        Intent(this, ActiveRideActivity::class.java)
                            .putExtra(ActiveRideActivity.EXTRA_BOOKING_ID, bookingId)
                    )
                    finish()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnAccept.isEnabled    = true
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    override fun onSupportNavigateUp(): Boolean { onBackPressedDispatcher.onBackPressed(); return true }

    companion object {
        const val EXTRA_BOOKING_ID = "extra_booking_id"
    }
}
