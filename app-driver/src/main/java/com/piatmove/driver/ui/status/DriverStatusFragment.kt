package com.piatmove.driver.ui.status

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.Resource
import com.piatmove.driver.databinding.FragmentDriverStatusBinding
import com.piatmove.driver.ui.home.DriverViewModel
import com.piatmove.driver.ui.ride.ActiveRideActivity

class DriverStatusFragment : Fragment() {

    private var _binding: FragmentDriverStatusBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: DriverViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentDriverStatusBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = ViewModelProvider(requireActivity())[DriverViewModel::class.java]

        viewModel.activeBooking.observe(viewLifecycleOwner) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility       = View.VISIBLE
                    binding.activeRideContainer.visibility = View.GONE
                    binding.emptyState.visibility        = View.GONE
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    val booking = state.data
                    if (booking != null) showActiveRide(booking)
                    else showEmpty()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility       = View.GONE
                    binding.activeRideContainer.visibility = View.GONE
                    binding.emptyState.visibility        = View.VISIBLE
                }
            }
        }

        viewModel.loadActiveBooking()
    }

    private fun showActiveRide(booking: Booking) {
        binding.activeRideContainer.visibility = View.VISIBLE
        binding.emptyState.visibility          = View.GONE
        binding.tvActiveStatus.text    = booking.status.replaceFirstChar { it.uppercase() }
        binding.tvPassengerName.text   = booking.passenger_name ?: "Passenger #${booking.passenger_id}"
        binding.tvPickup.text          = booking.pickup_address
        binding.tvDropoff.text         = booking.dropoff_address

        binding.btnViewActiveRide.setOnClickListener {
            startActivity(
                Intent(requireContext(), ActiveRideActivity::class.java)
                    .putExtra(ActiveRideActivity.EXTRA_BOOKING_ID, booking.id)
            )
        }
    }

    private fun showEmpty() {
        binding.activeRideContainer.visibility = View.GONE
        binding.emptyState.visibility          = View.VISIBLE
    }

    override fun onResume() {
        super.onResume()
        viewModel.loadActiveBooking()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
