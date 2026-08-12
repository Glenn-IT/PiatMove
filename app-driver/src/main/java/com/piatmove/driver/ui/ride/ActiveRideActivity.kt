package com.piatmove.driver.ui.ride

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.BookingStatus
import com.piatmove.core.utils.Resource
import com.piatmove.driver.R
import com.piatmove.driver.databinding.ActivityActiveRideBinding
import com.piatmove.driver.ui.home.DriverHomeActivity
import com.piatmove.driver.ui.home.DriverViewModel

class ActiveRideActivity : AppCompatActivity() {

    private lateinit var binding: ActivityActiveRideBinding
    private lateinit var viewModel: DriverViewModel
    private var bookingId: Int = -1
    private var currentStatus: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityActiveRideBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        bookingId = intent.getIntExtra(EXTRA_BOOKING_ID, -1)
        viewModel = ViewModelProvider(this)[DriverViewModel::class.java]

        binding.btnAction.setOnClickListener {
            when (currentStatus) {
                BookingStatus.ACCEPTED -> viewModel.startRide(bookingId)
                BookingStatus.STARTED  -> viewModel.completeRide(bookingId)
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
                    binding.progressBar.visibility = View.VISIBLE
                    binding.btnAction.isEnabled    = false
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnAction.isEnabled    = true
                    if (currentStatus == BookingStatus.STARTED) {
                        Toast.makeText(this, "Ride completed!", Toast.LENGTH_LONG).show()
                        startActivity(Intent(this, DriverHomeActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                        })
                    } else {
                        viewModel.loadActiveBooking()
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnAction.isEnabled    = true
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }

        viewModel.loadActiveBooking()
    }

    private fun renderBooking(booking: Booking) {
        currentStatus = booking.status
        binding.tvStatus.text        = booking.status.replaceFirstChar { it.uppercase() }
        binding.tvPassengerName.text = booking.passenger_name ?: "Passenger #${booking.passenger_id}"
        binding.tvPassengerPhone.text = booking.passenger_phone ?: "—"
        binding.tvPickup.text        = booking.pickup_address
        binding.tvDropoff.text       = booking.dropoff_address

        when (booking.status) {
            BookingStatus.ACCEPTED -> {
                binding.btnAction.text = getString(R.string.btn_start_ride)
                binding.btnAction.visibility = View.VISIBLE
            }
            BookingStatus.STARTED -> {
                binding.btnAction.text = getString(R.string.btn_complete_ride)
                binding.btnAction.visibility = View.VISIBLE
            }
            else -> binding.btnAction.visibility = View.GONE
        }
    }

    override fun onSupportNavigateUp(): Boolean { onBackPressedDispatcher.onBackPressed(); return true }

    companion object {
        const val EXTRA_BOOKING_ID = "extra_booking_id"
    }
}
