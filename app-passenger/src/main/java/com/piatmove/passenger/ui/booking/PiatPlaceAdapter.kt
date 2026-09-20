package com.piatmove.passenger.ui.booking

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Filter
import android.widget.TextView
import com.piatmove.passenger.R
import java.util.Locale

class PiatPlaceAdapter(
    context: Context,
    private val allPlaces: List<PiatPlace>
) : ArrayAdapter<PiatPlace>(context, 0, allPlaces) {

    private var filteredPlaces: List<PiatPlace> = allPlaces

    override fun getCount(): Int = filteredPlaces.size

    override fun getItem(position: Int): PiatPlace? = filteredPlaces.getOrNull(position)

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val view = convertView ?: LayoutInflater.from(context).inflate(
            R.layout.item_place_dropdown, parent, false
        )

        val place = getItem(position)
        if (place != null) {
            val tvIcon = view.findViewById<TextView>(R.id.tvPlaceIcon)
            val tvTitle = view.findViewById<TextView>(R.id.tvPlaceTitle)
            val tvSub = view.findViewById<TextView>(R.id.tvPlaceSubtitle)

            tvIcon.text = place.icon
            tvTitle.text = place.name
            tvSub.text = place.subTitle
        }

        return view
    }

    override fun getFilter(): Filter {
        return object : Filter() {
            override fun performFiltering(constraint: CharSequence?): FilterResults {
                val results = FilterResults()
                if (constraint.isNullOrBlank()) {
                    results.values = allPlaces
                    results.count = allPlaces.size
                } else {
                    val query = constraint.toString().trim().lowercase(Locale.getDefault())
                    val matches = allPlaces.filter { place ->
                        place.name.lowercase(Locale.getDefault()).contains(query) ||
                        place.barangay.lowercase(Locale.getDefault()).contains(query) ||
                        place.category.lowercase(Locale.getDefault()).contains(query)
                    }
                    results.values = matches
                    results.count = matches.size
                }
                return results
            }

            @Suppress("UNCHECKED_CAST")
            override fun publishResults(constraint: CharSequence?, results: FilterResults?) {
                filteredPlaces = if (results?.values != null) {
                    results.values as List<PiatPlace>
                } else {
                    allPlaces
                }
                notifyDataSetChanged()
            }

            override fun convertResultToString(resultValue: Any?): CharSequence {
                return (resultValue as? PiatPlace)?.fullDisplayName ?: ""
            }
        }
    }
}
