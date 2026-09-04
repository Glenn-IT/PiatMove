package com.piatmove.driver.ui.history

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.piatmove.core.data.models.Booking
import com.piatmove.driver.R
import com.piatmove.driver.databinding.ItemDriverTripBinding

class DriverTripsAdapter(
    private val onItemClick: ((Booking) -> Unit)? = null
) : ListAdapter<Booking, DriverTripsAdapter.ViewHolder>(DIFF_CALLBACK) {

    inner class ViewHolder(private val binding: ItemDriverTripBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(booking: Booking) {
            val context = binding.root.context

            binding.tvTripId.text = "Booking #${booking.id}"
            binding.tvPassengerName.text = booking.passenger_name ?: "Passenger #${booking.passenger_id}"

            val phone = booking.passenger_phone
            if (!phone.isNullOrEmpty()) {
                binding.tvPassengerPhone.text = "📞 $phone"
                binding.tvPassengerPhone.visibility = View.VISIBLE
                binding.tvPassengerPhone.setOnClickListener {
                    try {
                        val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:$phone"))
                        context.startActivity(intent)
                    } catch (ignored: Exception) {}
                }
            } else {
                binding.tvPassengerPhone.visibility = View.GONE
            }

            binding.tvDateTime.text = booking.created_at.take(19).replace("T", " ")
            binding.tvPickup.text   = booking.pickup_address
            binding.tvDropoff.text  = booking.dropoff_address

            // Fare formatting
            val fare = booking.fare
            binding.tvFareAmount.text = if (fare != null) "₱%.2f".format(fare) else "₱--"

            // Discount tag
            val discount = booking.discount_type ?: "regular"
            if (discount != "regular") {
                val discountLabel = when (discount) {
                    "student"  -> "🎓 Student (20% OFF)"
                    "senior"   -> "👴 Senior (20% OFF)"
                    "pwd"      -> "♿ PWD (20% OFF)"
                    "pregnant" -> "🤰 Pregnant (20% OFF)"
                    else       -> "🏷️ 20% OFF"
                }
                binding.tvDiscountTag.text = discountLabel
                binding.tvDiscountTag.visibility = View.VISIBLE
            } else {
                binding.tvDiscountTag.visibility = View.GONE
            }

            // Status badge styling
            val status = booking.status.lowercase()
            binding.tvStatusBadge.text = status.uppercase()

            val (textColor, bgColor) = getStatusColors(context, status)
            binding.tvStatusBadge.setTextColor(textColor)
            binding.tvStatusBadge.setBackgroundColor(bgColor)

            binding.root.setOnClickListener {
                onItemClick?.invoke(booking)
            }
        }

        private fun getStatusColors(context: Context, status: String): Pair<Int, Int> {
            return when (status) {
                "completed" -> Pair(
                    ContextCompat.getColor(context, R.color.statusCompleted),
                    Color.parseColor("#DCFCE7") // Light green
                )
                "accepted"  -> Pair(
                    ContextCompat.getColor(context, R.color.statusAccepted),
                    Color.parseColor("#DBEAFE") // Light blue
                )
                "started"   -> Pair(
                    ContextCompat.getColor(context, R.color.statusStarted),
                    Color.parseColor("#FEF3C7") // Light yellow/amber
                )
                "rejected"  -> Pair(
                    ContextCompat.getColor(context, R.color.statusRejected),
                    Color.parseColor("#FEE2E2") // Light red
                )
                "cancelled" -> Pair(
                    ContextCompat.getColor(context, R.color.statusCancelled),
                    Color.parseColor("#FEE2E2") // Light red
                )
                else -> Pair(
                    ContextCompat.getColor(context, R.color.grey_text),
                    Color.parseColor("#F1F5F9") // Light grey
                )
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemDriverTripBinding.inflate(
            LayoutInflater.from(parent.context), parent, false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    companion object {
        private val DIFF_CALLBACK = object : DiffUtil.ItemCallback<Booking>() {
            override fun areItemsTheSame(oldItem: Booking, newItem: Booking) = oldItem.id == newItem.id
            override fun areContentsTheSame(oldItem: Booking, newItem: Booking) = oldItem == newItem
        }
    }
}
