package com.piatmove.passenger.ui.booking

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.content.res.ColorStateList
import android.graphics.Color
import android.location.Geocoder
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.google.android.gms.location.LocationServices
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.piatmove.core.data.models.BookingRequest
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityBookRideBinding
import com.piatmove.passenger.ui.home.PassengerViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.Locale

class BookRideActivity : AppCompatActivity(), OnMapReadyCallback {

    private enum class MapMode { NONE, PICKUP, DROPOFF }

    private lateinit var binding: ActivityBookRideBinding
    private lateinit var viewModel: PassengerViewModel
    private var googleMap: GoogleMap? = null
    private var mapMode      = MapMode.NONE
    private var pickupMarker:  Marker? = null
    private var dropoffMarker: Marker? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBookRideBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        viewModel = ViewModelProvider(this)[PassengerViewModel::class.java]

        val mapFragment = supportFragmentManager.findFragmentById(R.id.map) as? SupportMapFragment
        mapFragment?.getMapAsync(this)

        binding.btnModePickup.setOnClickListener {
            setMapMode(if (mapMode == MapMode.PICKUP) MapMode.NONE else MapMode.PICKUP)
        }
        binding.btnModeDropoff.setOnClickListener {
            setMapMode(if (mapMode == MapMode.DROPOFF) MapMode.NONE else MapMode.DROPOFF)
        }

        binding.btnUseCurrentLocation.setOnClickListener { fillCurrentLocation() }
        binding.btnRequestRide.setOnClickListener { submitBooking() }
        binding.btnUseSampleData.setOnClickListener { fillSampleData() }

        setMapMode(MapMode.NONE)
        observeViewModel()
    }

    override fun onSupportNavigateUp(): Boolean { onBackPressedDispatcher.onBackPressed(); return true }

    override fun onMapReady(map: GoogleMap) {
        googleMap = map
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            == PackageManager.PERMISSION_GRANTED) {
            googleMap?.isMyLocationEnabled = true
        }
        googleMap?.setOnMapClickListener { latLng ->
            when (mapMode) {
                MapMode.PICKUP  -> setPickupFromMap(latLng)
                MapMode.DROPOFF -> setDropoffFromMap(latLng)
                MapMode.NONE    ->
                    Toast.makeText(this, getString(R.string.map_tap_hint_none), Toast.LENGTH_SHORT).show()
            }
        }
    }

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

    private fun setPickupFromMap(latLng: LatLng) {
        pickupMarker?.remove()
        pickupMarker = googleMap?.addMarker(
            MarkerOptions().position(latLng).title("Pickup")
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
        )
        binding.etPickupLat.setText(String.format("%.6f", latLng.latitude))
        binding.etPickupLng.setText(String.format("%.6f", latLng.longitude))
        binding.tilPickupLat.error = null
        binding.tilPickupLng.error = null
        reverseGeocode(latLng) { addr ->
            binding.etPickupAddress.setText(addr)
            binding.tilPickupAddress.error = null
        }
        googleMap?.animateCamera(CameraUpdateFactory.newLatLngZoom(latLng, 15f))
    }

    private fun setDropoffFromMap(latLng: LatLng) {
        dropoffMarker?.remove()
        dropoffMarker = googleMap?.addMarker(
            MarkerOptions().position(latLng).title("Dropoff")
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_GREEN))
        )
        binding.etDropoffLat.setText(String.format("%.6f", latLng.latitude))
        binding.etDropoffLng.setText(String.format("%.6f", latLng.longitude))
        binding.tilDropoffLat.error  = null
        binding.tilDropoffLng.error  = null
        reverseGeocode(latLng) { addr ->
            binding.etDropoffAddress.setText(addr)
            binding.tilDropoffAddress.error = null
        }
        googleMap?.animateCamera(CameraUpdateFactory.newLatLngZoom(latLng, 15f))
    }

    private fun reverseGeocode(latLng: LatLng, onResult: (String) -> Unit) {
        val geocoder = Geocoder(this, Locale.getDefault())
        val fallback = "${String.format("%.5f", latLng.latitude)}, ${String.format("%.5f", latLng.longitude)}"

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            geocoder.getFromLocation(latLng.latitude, latLng.longitude, 1) { addresses ->
                val addr = addresses.firstOrNull()?.getAddressLine(0) ?: fallback
                runOnUiThread { onResult(addr) }
            }
        } else {
            lifecycleScope.launch(Dispatchers.IO) {
                val addr = try {
                    @Suppress("DEPRECATION")
                    geocoder.getFromLocation(latLng.latitude, latLng.longitude, 1)
                        ?.firstOrNull()?.getAddressLine(0) ?: fallback
                } catch (_: Exception) { fallback }
                withContext(Dispatchers.Main) { onResult(addr) }
            }
        }
    }

    private fun fillCurrentLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(this, "Location permission not granted.", Toast.LENGTH_SHORT).show()
            return
        }
        LocationServices.getFusedLocationProviderClient(this).lastLocation
            .addOnSuccessListener { loc ->
                loc?.let { setPickupFromMap(LatLng(it.latitude, it.longitude)) }
                    ?: Toast.makeText(this, "Location unavailable. Try again.", Toast.LENGTH_SHORT).show()
            }
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
