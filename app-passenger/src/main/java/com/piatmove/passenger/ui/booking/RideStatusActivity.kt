package com.piatmove.passenger.ui.booking

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.BookingStatus
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityRideStatusBinding
import com.piatmove.passenger.ui.home.PassengerViewModel

class RideStatusActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_BOOKING_ID = "booking_id"
    }

    private lateinit var binding: ActivityRideStatusBinding
    private lateinit var viewModel: PassengerViewModel
    private var bookingId: Int = -1

    private val handler   = Handler(Looper.getMainLooper())
    private val pollDelay = 5_000L

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
    }

    override fun onSupportNavigateUp(): Boolean { onBackPressedDispatcher.onBackPressed(); return true }

    override fun onResume() {
        super.onResume()
        handler.post(pollRunnable)
    }

    override fun onPause() {
        super.onPause()
        handler.removeCallbacks(pollRunnable)
    }

    private fun observeViewModel() {
        viewModel.booking.observe(this) { state ->
            when (state) {
                is Resource.Loading -> binding.progressBar.visibility = View.VISIBLE
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    state.data?.let { updateUI(it) }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
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

    private fun updateUI(booking: Booking) {
        binding.tvBookingId.text = "Booking #${booking.id}"
        binding.tvPickup.text    = booking.pickup_address
        binding.tvDropoff.text   = booking.dropoff_address
        binding.tvStatus.text    = booking.status.uppercase().replace("_", " ")

        val color = when (booking.status) {
            BookingStatus.PENDING   -> getColor(R.color.statusPending)
            BookingStatus.ACCEPTED  -> getColor(R.color.statusAccepted)
            BookingStatus.STARTED   -> getColor(R.color.statusStarted)
            BookingStatus.COMPLETED -> getColor(R.color.statusCompleted)
            BookingStatus.REJECTED,
            BookingStatus.CANCELLED -> getColor(R.color.statusRejected)
            else                    -> getColor(R.color.grey)
        }
        binding.tvStatus.setTextColor(color)

        binding.btnCancelRide.visibility =
            if (booking.status == BookingStatus.PENDING) View.VISIBLE else View.GONE

        val showDriver = booking.status in listOf(
            BookingStatus.ACCEPTED, BookingStatus.STARTED, BookingStatus.COMPLETED
        ) && booking.driver_name != null
        binding.cardDriverInfo.visibility = if (showDriver) View.VISIBLE else View.GONE
        if (showDriver) {
            binding.tvDriverName.text  = booking.driver_name ?: ""
            binding.tvDriverEmail.text = booking.driver_email ?: ""
        }

        if (BookingStatus.isTerminal(booking.status)) {
            handler.removeCallbacks(pollRunnable)
            binding.tvPolling.visibility = View.GONE
        }
    }
}
