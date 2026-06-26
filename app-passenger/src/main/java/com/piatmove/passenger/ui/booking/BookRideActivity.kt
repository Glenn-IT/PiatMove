package com.piatmove.passenger.ui.booking

import android.content.Intent
import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.models.BookingRequest
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityBookRideBinding
import com.piatmove.passenger.ui.home.PassengerViewModel

class BookRideActivity : AppCompatActivity() {

    private enum class MapMode { NONE, PICKUP, DROPOFF }

    private lateinit var binding: ActivityBookRideBinding
    private lateinit var viewModel: PassengerViewModel
    private var mapMode = MapMode.NONE

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBookRideBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        viewModel = ViewModelProvider(this)[PassengerViewModel::class.java]

        binding.btnModePickup.setOnClickListener {
            setMapMode(if (mapMode == MapMode.PICKUP) MapMode.NONE else MapMode.PICKUP)
        }
        binding.btnModeDropoff.setOnClickListener {
            setMapMode(if (mapMode == MapMode.DROPOFF) MapMode.NONE else MapMode.DROPOFF)
        }

        binding.btnUseCurrentLocation.setOnClickListener {
            Toast.makeText(this, "Location pin requires Maps API key.", Toast.LENGTH_SHORT).show()
        }
        binding.btnRequestRide.setOnClickListener { submitBooking() }
        binding.btnUseSampleData.setOnClickListener { fillSampleData() }

        setMapMode(MapMode.NONE)
        observeViewModel()
    }

    override fun onSupportNavigateUp(): Boolean { onBackPressedDispatcher.onBackPressed(); return true }

    private fun setMapMode(mode: MapMode) {
        mapMode = mode
        val primaryColor = ContextCompat.getColor(this, R.color.colorPrimary)
        val activeBg     = ColorStateList.valueOf(primaryColor)
        val inactiveBg   = ColorStateList.valueOf(Color.TRANSPARENT)

        when (mode) {
            MapMode.PICKUP -> {
                binding.btnModePickup.backgroundTintList  = activeBg
                binding.btnModePickup.setTextColor(Color.WHITE)
                binding.btnModeDropoff.backgroundTintList = inactiveBg
                binding.btnModeDropoff.setTextColor(primaryColor)
                binding.tvMapHint.text = getString(R.string.map_tap_hint_pickup)
                binding.tvMapHint.setTextColor(primaryColor)
            }
            MapMode.DROPOFF -> {
                binding.btnModeDropoff.backgroundTintList = activeBg
                binding.btnModeDropoff.setTextColor(Color.WHITE)
                binding.btnModePickup.backgroundTintList  = inactiveBg
                binding.btnModePickup.setTextColor(primaryColor)
                binding.tvMapHint.text = getString(R.string.map_tap_hint_dropoff)
                binding.tvMapHint.setTextColor(ContextCompat.getColor(this, R.color.statusCompleted))
            }
            MapMode.NONE -> {
                binding.btnModePickup.backgroundTintList  = inactiveBg
                binding.btnModePickup.setTextColor(primaryColor)
                binding.btnModeDropoff.backgroundTintList = inactiveBg
                binding.btnModeDropoff.setTextColor(primaryColor)
                binding.tvMapHint.text = getString(R.string.map_tap_hint_none)
                binding.tvMapHint.setTextColor(ContextCompat.getColor(this, R.color.grey))
            }
        }
    }

    private fun fillCurrentLocation() {
        Toast.makeText(this, "Location pin requires Maps API key.", Toast.LENGTH_SHORT).show()
    }

    private fun fillSampleData() {
        // Piat, Cagayan approximate coordinates
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

        if (pickupAddr.isEmpty())  { binding.tilPickupAddress.error  = "Required"; return }
        if (pickupLat == null)     { binding.tilPickupLat.error      = "Invalid";  return }
        if (pickupLng == null)     { binding.tilPickupLng.error      = "Invalid";  return }
        if (dropoffAddr.isEmpty()) { binding.tilDropoffAddress.error = "Required"; return }
        if (dropoffLat == null)    { binding.tilDropoffLat.error     = "Invalid";  return }
        if (dropoffLng == null)    { binding.tilDropoffLng.error     = "Invalid";  return }

        viewModel.createBooking(
            BookingRequest(pickupAddr, pickupLat, pickupLng, dropoffAddr, dropoffLat, dropoffLng)
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
}
