package com.piatmove.passenger.ui.history

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.FragmentRideHistoryBinding
import com.piatmove.passenger.databinding.ItemBookingHistoryBinding
import com.piatmove.passenger.ui.home.PassengerViewModel

class RideHistoryFragment : Fragment() {

    private var _binding: FragmentRideHistoryBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: PassengerViewModel
    private val adapter = HistoryAdapter()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRideHistoryBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = ViewModelProvider(requireActivity())[PassengerViewModel::class.java]

        binding.rvHistory.layoutManager = LinearLayoutManager(requireContext())
        binding.rvHistory.adapter = adapter

        observeViewModel()
        viewModel.fetchHistory()
    }

    private fun observeViewModel() {
        viewModel.history.observe(viewLifecycleOwner) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.rvHistory.visibility   = View.GONE
                    binding.layoutEmpty.visibility = View.GONE
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    val list = state.data
                    if (list.isEmpty()) {
                        binding.layoutEmpty.visibility = View.VISIBLE
                        binding.rvHistory.visibility   = View.GONE
                    } else {
                        binding.layoutEmpty.visibility = View.GONE
                        binding.rvHistory.visibility   = View.VISIBLE
                        adapter.submitList(list)
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.layoutEmpty.visibility = View.VISIBLE
                    binding.rvHistory.visibility   = View.GONE
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    inner class HistoryAdapter : RecyclerView.Adapter<HistoryAdapter.ViewHolder>() {

        private var items: List<Booking> = emptyList()

        fun submitList(list: List<Booking>) {
            items = list
            notifyDataSetChanged()
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val b = ItemBookingHistoryBinding.inflate(
                LayoutInflater.from(parent.context), parent, false
            )
            return ViewHolder(b)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(items[position])
        override fun getItemCount() = items.size

        inner class ViewHolder(private val b: ItemBookingHistoryBinding) :
            RecyclerView.ViewHolder(b.root) {

            fun bind(booking: Booking) {
                b.tvPickup.text  = booking.pickup_address
                b.tvDropoff.text = booking.dropoff_address
                b.tvDate.text    = "Booking #${booking.id}  •  ${booking.created_at.take(10)}"
                b.tvStatus.text  = booking.status.replace("_", " ").uppercase()

                val (textColorRes, bgColorRes) = statusColors(booking.status)
                val textColor = ContextCompat.getColor(requireContext(), textColorRes)
                b.tvStatus.setTextColor(textColor)
                b.tvStatus.setBackgroundColor(
                    android.graphics.Color.argb(
                        30,
                        android.graphics.Color.red(textColor),
                        android.graphics.Color.green(textColor),
                        android.graphics.Color.blue(textColor)
                    )
                )
            }

            private fun statusColors(status: String): Pair<Int, Int> = when (status) {
                "pending"   -> Pair(R.color.statusPending,   R.color.statusPending)
                "accepted"  -> Pair(R.color.statusAccepted,  R.color.statusAccepted)
                "started"   -> Pair(R.color.statusStarted,   R.color.statusStarted)
                "completed" -> Pair(R.color.statusCompleted, R.color.statusCompleted)
                "rejected"  -> Pair(R.color.statusRejected,  R.color.statusRejected)
                "cancelled" -> Pair(R.color.statusCancelled, R.color.statusCancelled)
                else        -> Pair(R.color.grey,            R.color.grey)
            }
        }
    }
}
