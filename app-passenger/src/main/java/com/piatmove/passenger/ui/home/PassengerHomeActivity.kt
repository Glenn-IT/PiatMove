package com.piatmove.passenger.ui.home

import android.content.Intent
import android.graphics.BitmapFactory
import android.os.Build
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.view.GravityCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.data.models.Booking
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityPassengerHomeBinding
import com.piatmove.passenger.ui.auth.AuthViewModel
import com.piatmove.passenger.ui.auth.LoginActivity
import com.piatmove.passenger.ui.booking.BookRideActivity
import com.piatmove.passenger.ui.booking.RideStatusActivity
import com.piatmove.passenger.ui.history.RideHistoryFragment
import com.piatmove.passenger.ui.profile.ProfileFragment
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class PassengerHomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPassengerHomeBinding
    private lateinit var toggle: ActionBarDrawerToggle
    private lateinit var passengerViewModel: PassengerViewModel
    private var currentActiveBooking: Booking? = null
    private val NOTIFICATION_REQUEST = 1002

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPassengerHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        passengerViewModel = ViewModelProvider(this)[PassengerViewModel::class.java]

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "PiatMove"

        setupDrawer()
        setupBottomNav()
        setupHomeShortcuts()
        observeActiveBooking()

        val targetTab = intent.getIntExtra("TARGET_TAB", -1)
        if (targetTab != -1) {
            binding.bottomNav.selectedItemId = targetTab
        } else if (savedInstanceState == null) {
            showHome()
        }

        requestNotificationPermission()
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        val targetTab = intent.getIntExtra("TARGET_TAB", -1)
        if (targetTab != -1) {
            binding.bottomNav.selectedItemId = targetTab
        }
    }

    private fun setupDrawer() {
        toggle = ActionBarDrawerToggle(
            this, binding.drawerLayout, binding.toolbar,
            R.string.passenger_home, R.string.passenger_home
        )
        binding.drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        updateDrawerHeader()

        binding.navigationView.setNavigationItemSelectedListener { menuItem ->
            binding.drawerLayout.closeDrawer(GravityCompat.START)
            when (menuItem.itemId) {
                R.id.drawer_home -> {
                    binding.bottomNav.selectedItemId = R.id.nav_home
                    true
                }
                R.id.drawer_book_ride -> {
                    startActivity(Intent(this, BookRideActivity::class.java))
                    true
                }
                R.id.drawer_history -> {
                    binding.bottomNav.selectedItemId = R.id.nav_history
                    true
                }
                R.id.drawer_profile -> {
                    binding.bottomNav.selectedItemId = R.id.nav_profile
                    true
                }
                R.id.drawer_manual -> {
                    showSystemManualDialog()
                    true
                }
                R.id.drawer_developers -> {
                    showDevelopersDialog()
                    true
                }
                R.id.drawer_about -> {
                    showAboutUsDialog()
                    true
                }
                R.id.drawer_help -> {
                    showHelpDialog()
                    true
                }
                R.id.drawer_logout -> {
                    performLogout()
                    true
                }
                else -> false
            }
        }
    }

    private fun updateDrawerHeader() {
        val headerView    = binding.navigationView.getHeaderView(0)
        val imgNavAvatar  = headerView.findViewById<ImageView>(R.id.imgNavAvatar)
        val tvNavName     = headerView.findViewById<TextView>(R.id.tvNavName)
        val tvNavRole     = headerView.findViewById<TextView>(R.id.tvNavRole)

        val name      = PrefsManager.getUserName(this) ?: "Passenger Account"
        val photoPath = PrefsManager.getUserPhotoPath(this)

        tvNavName.text = name
        tvNavRole.text = "✓ Active Passenger"

        val fullPhotoUrl     = PrefsManager.getFullPhotoUrl(this, photoPath)
        val fallbackPhotoUrl = PrefsManager.getFallbackPhotoUrl(this, photoPath)

        if (!fullPhotoUrl.isNullOrBlank()) {
            lifecycleScope.launch(Dispatchers.IO) {
                val bitmap = downloadHeaderBitmap(fullPhotoUrl) ?: fallbackPhotoUrl?.let { downloadHeaderBitmap(it) }
                withContext(Dispatchers.Main) {
                    if (bitmap != null) {
                        imgNavAvatar.setImageBitmap(bitmap)
                        imgNavAvatar.imageTintList = null
                    } else {
                        imgNavAvatar.setImageResource(R.drawable.ic_profile)
                    }
                }
            }
        } else {
            imgNavAvatar.setImageResource(R.drawable.ic_profile)
        }
    }

    private fun downloadHeaderBitmap(urlString: String): android.graphics.Bitmap? {
        return try {
            val url = java.net.URL(urlString)
            val conn = url.openConnection() as java.net.HttpURLConnection
            conn.connectTimeout = 8000
            conn.readTimeout = 8000
            conn.instanceFollowRedirects = true
            conn.connect()
            if (conn.responseCode == java.net.HttpURLConnection.HTTP_OK) {
                BitmapFactory.decodeStream(conn.inputStream)
            } else {
                null
            }
        } catch (_: Exception) {
            null
        }
    }

    private fun setupBottomNav() {
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    showHome()
                    true
                }
                R.id.nav_book_ride -> {
                    startActivity(Intent(this, BookRideActivity::class.java))
                    false
                }
                R.id.nav_history -> {
                    showFragment(RideHistoryFragment(), "Ride History")
                    true
                }
                R.id.nav_profile -> {
                    showFragment(ProfileFragment(), "Profile")
                    true
                }
                else -> false
            }
        }
    }

    private fun setupHomeShortcuts() {
        binding.btnShortcutBook.setOnClickListener {
            startActivity(Intent(this, BookRideActivity::class.java))
        }
        binding.btnHomeBookNow.setOnClickListener {
            startActivity(Intent(this, BookRideActivity::class.java))
        }

        binding.btnShortcutStatus.setOnClickListener {
            val booking = currentActiveBooking
            if (booking != null) {
                startActivity(Intent(this, RideStatusActivity::class.java).apply {
                    putExtra(RideStatusActivity.EXTRA_BOOKING_ID, booking.id)
                })
            } else {
                Toast.makeText(this, "No active ride in progress. Tap 'Book Ride' to request a tricycle!", Toast.LENGTH_SHORT).show()
            }
        }

        binding.btnShortcutHistory.setOnClickListener {
            binding.bottomNav.selectedItemId = R.id.nav_history
        }

        binding.btnShortcutProfile.setOnClickListener {
            binding.bottomNav.selectedItemId = R.id.nav_profile
        }
    }

    private fun observeActiveBooking() {
        passengerViewModel.activeBooking.observe(this) { state ->
            when (state) {
                is Resource.Success -> {
                    currentActiveBooking = state.data
                    val booking = state.data
                    if (booking != null) {
                        binding.cardActiveRide.visibility = View.VISIBLE
                        binding.tvActiveRideStatus.text = booking.status.uppercase()
                        binding.tvActiveRideRoute.text = "${booking.pickup_address} ➔ ${booking.dropoff_address}"
                        binding.btnViewActiveRide.setOnClickListener {
                            startActivity(Intent(this, RideStatusActivity::class.java).apply {
                                putExtra(RideStatusActivity.EXTRA_BOOKING_ID, booking.id)
                            })
                        }
                    } else {
                        binding.cardActiveRide.visibility = View.GONE
                    }
                }
                is Resource.Error -> {
                    binding.cardActiveRide.visibility = View.GONE
                }
                Resource.Loading -> {}
            }
        }
    }

    private fun showHome() {
        binding.fragmentContainer.visibility = View.GONE
        binding.homeScrollView.visibility    = View.VISIBLE
        supportActionBar?.title             = "PiatMove"
        val name = PrefsManager.getUserName(this) ?: "Passenger"
        binding.tvGreeting.text = "Hello, $name! 👋"
        passengerViewModel.fetchActiveBooking()
    }

    private fun showFragment(fragment: Fragment, title: String) {
        binding.homeScrollView.visibility    = View.GONE
        binding.fragmentContainer.visibility = View.VISIBLE
        supportActionBar?.title             = title
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment)
            .commit()
    }

    private fun showSystemManualDialog() {
        val dialogView = layoutInflater.inflate(R.layout.dialog_system_manual, null)
        val dialog = AlertDialog.Builder(this)
            .setView(dialogView)
            .create()
        dialogView.findViewById<View>(R.id.btnCloseManual)?.setOnClickListener {
            dialog.dismiss()
        }
        dialog.show()
    }

    private fun showDevelopersDialog() {
        val dialogView = layoutInflater.inflate(R.layout.dialog_developers, null)
        val dialog = AlertDialog.Builder(this)
            .setView(dialogView)
            .create()
        dialogView.findViewById<View>(R.id.btnCloseDevs)?.setOnClickListener {
            dialog.dismiss()
        }
        dialog.show()
    }

    private fun showAboutUsDialog() {
        val dialogView = layoutInflater.inflate(R.layout.dialog_about_us, null)
        val dialog = AlertDialog.Builder(this)
            .setView(dialogView)
            .create()
        dialogView.findViewById<View>(R.id.btnCloseAbout)?.setOnClickListener {
            dialog.dismiss()
        }
        dialog.show()
    }

    private fun showHelpDialog() {
        val dialogView = layoutInflater.inflate(R.layout.dialog_help, null)
        val dialog = AlertDialog.Builder(this)
            .setView(dialogView)
            .create()
        dialogView.findViewById<View>(R.id.btnCloseHelp)?.setOnClickListener {
            dialog.dismiss()
        }
        dialog.show()
    }

    private fun performLogout() {
        ViewModelProvider(this)[AuthViewModel::class.java].logout()
        startActivity(Intent(this, LoginActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        })
    }

    private fun requestNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.POST_NOTIFICATIONS)
                != android.content.pm.PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(
                    this, arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), NOTIFICATION_REQUEST
                )
            }
        }
    }

    override fun onResume() {
        super.onResume()
        updateDrawerHeader()
        if (binding.homeScrollView.visibility == View.VISIBLE) {
            passengerViewModel.fetchActiveBooking()
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_home, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (toggle.onOptionsItemSelected(item)) {
            return true
        }
        if (item.itemId == R.id.action_logout) {
            performLogout()
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (binding.drawerLayout.isDrawerOpen(GravityCompat.START)) {
            binding.drawerLayout.closeDrawer(GravityCompat.START)
        } else {
            super.onBackPressed()
        }
    }
}
