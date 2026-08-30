package com.piatmove.driver.ui.requests

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.piatmove.core.data.models.Booking
import com.piatmove.driver.databinding.ItemRideRequestBinding

class RideRequestsAdapter(
    private val onClick: (Booking) -> Unit
) : ListAdapter<Booking, RideRequestsAdapter.ViewHolder>(DIFF) {

    inner class ViewHolder(private val binding: ItemRideRequestBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(booking: Booking) {
            binding.tvPassengerName.text = booking.passenger_name ?: "Passenger #${booking.passenger_id}"
            binding.tvPickup.text        = booking.pickup_address
            binding.tvDropoff.text       = booking.dropoff_address
            binding.tvFare.text          = booking.fare?.let { "₱%.2f".format(it) } ?: "₱--"
            val discount = booking.discount_type ?: "regular"
            if (discount != "regular") {
                val discountLabel = when (discount) {
                    "student"  -> "🎓 Student"
                    "senior"   -> "👴 Senior"
                    "pwd"      -> "♿ PWD"
                    "pregnant" -> "🤰 Pregnant"
                    else       -> "🏷️ 20% OFF"
                }
                binding.tvDiscountBadge.visibility = android.view.View.VISIBLE
                binding.tvDiscountBadge.text       = discountLabel
            } else {
                binding.tvDiscountBadge.visibility = android.view.View.GONE
            }
            binding.root.setOnClickListener { onClick(booking) }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemRideRequestBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    companion object {
        private val DIFF = object : DiffUtil.ItemCallback<Booking>() {
            override fun areItemsTheSame(old: Booking, new: Booking) = old.id == new.id
            override fun areContentsTheSame(old: Booking, new: Booking) = old == new
        }
    }
}
