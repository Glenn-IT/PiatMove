package com.piatmove.driver.ui.history

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.BookingStatus
import com.piatmove.core.utils.Resource
import com.piatmove.driver.R
import com.piatmove.driver.databinding.FragmentDriverActivityBinding
import com.piatmove.driver.ui.home.DriverViewModel
import com.piatmove.driver.ui.ride.ActiveRideActivity

class DriverActivityFragment : Fragment() {

    private var _binding: FragmentDriverActivityBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: DriverViewModel
    private val adapter = DriverTripsAdapter { booking ->
        if (booking.status == BookingStatus.ACCEPTED || booking.status == BookingStatus.STARTED) {
            startActivity(
                Intent(requireContext(), ActiveRideActivity::class.java)
                    .putExtra(ActiveRideActivity.EXTRA_BOOKING_ID, booking.id)
            )
        }
    }

    private var allTrips: List<Booking> = emptyList()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentDriverActivityBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = ViewModelProvider(requireActivity())[DriverViewModel::class.java]

        binding.rvTrips.layoutManager = LinearLayoutManager(requireContext())
        binding.rvTrips.adapter = adapter

        binding.btnRefresh.setOnClickListener {
            viewModel.fetchDriverTrips()
        }

        binding.chipGroupFilter.setOnCheckedStateChangeListener { _, _ ->
            applyFilter()
        }

        observeViewModel()
        viewModel.fetchDriverTrips()
    }

    private fun observeViewModel() {
        viewModel.trips.observe(viewLifecycleOwner) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.rvTrips.visibility      = View.GONE
                    binding.layoutEmpty.visibility  = View.GONE
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    allTrips = state.data ?: emptyList()
                    applyFilter()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.rvTrips.visibility      = View.GONE
                    binding.layoutEmpty.visibility  = View.VISIBLE
                    binding.tvEmptyTitle.text       = "Unable to Load Trips"
                    binding.tvEmptySubtitle.text    = state.message
                }
            }
        }
    }

    private fun applyFilter() {
        val checkedId = binding.chipGroupFilter.checkedChipId
        val filteredList = when (checkedId) {
            R.id.chipAccepted -> allTrips.filter {
                it.status == BookingStatus.ACCEPTED || it.status == BookingStatus.STARTED
            }
            R.id.chipCompleted -> allTrips.filter {
                it.status == BookingStatus.COMPLETED
            }
            R.id.chipRejected -> allTrips.filter {
                it.status == BookingStatus.REJECTED || it.status == BookingStatus.CANCELLED
            }
            else -> allTrips // R.id.chipAll
        }

        if (filteredList.isEmpty()) {
            binding.rvTrips.visibility     = View.GONE
            binding.layoutEmpty.visibility = View.VISIBLE

            when (checkedId) {
                R.id.chipAccepted -> {
                    binding.tvEmptyTitle.text = "No Accepted Rides"
                    binding.tvEmptySubtitle.text = "Rides you currently accept will appear here."
                }
                R.id.chipCompleted -> {
                    binding.tvEmptyTitle.text = "No Completed Rides"
                    binding.tvEmptySubtitle.text = "Completed trips and transactions will appear here."
                }
                R.id.chipRejected -> {
                    binding.tvEmptyTitle.text = "No Rejected Rides"
                    binding.tvEmptySubtitle.text = "Rides you decline or cancel will appear here."
                }
                else -> {
                    binding.tvEmptyTitle.text = "No Activity Recorded"
                    binding.tvEmptySubtitle.text = "All your accepted, completed, and rejected rides will be logged here."
                }
            }
        } else {
            binding.rvTrips.visibility     = View.VISIBLE
            binding.layoutEmpty.visibility = View.GONE
            adapter.submitList(filteredList)
        }

        // Summary Bar
        val count = filteredList.size
        val countLabel = if (count == 1) "1 record found" else "$count records found"
        binding.tvSummaryCount.text = countLabel

        if (checkedId == R.id.chipCompleted) {
            val totalEarnings = filteredList.mapNotNull { it.fare }.sum()
            binding.tvSummaryTotal.visibility = View.VISIBLE
            binding.tvSummaryTotal.text = "Total: ₱%.2f".format(totalEarnings)
        } else {
            binding.tvSummaryTotal.visibility = View.GONE
        }
    }

    override fun onResume() {
        super.onResume()
        viewModel.fetchDriverTrips()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
