package com.piatmove.passenger.ui.home

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.view.GravityCompat
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.button.MaterialButton
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityPassengerHomeBinding
import com.piatmove.passenger.ui.auth.AuthViewModel
import com.piatmove.passenger.ui.auth.LoginActivity
import com.piatmove.passenger.ui.booking.BookRideActivity
import com.piatmove.passenger.ui.history.RideHistoryFragment
import com.piatmove.passenger.ui.profile.ProfileFragment

class PassengerHomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPassengerHomeBinding
    private lateinit var toggle: ActionBarDrawerToggle
    private val NOTIFICATION_REQUEST = 1002

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPassengerHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Hello, ${PrefsManager.getUserName(this) ?: "Passenger"}"

        setupDrawer()
        setupBottomNav()

        binding.fabBookRide.setOnClickListener {
            startActivity(Intent(this, BookRideActivity::class.java))
        }

        requestNotificationPermission()
    }

    private fun setupDrawer() {
        toggle = ActionBarDrawerToggle(
            this, binding.drawerLayout, binding.toolbar,
            R.string.passenger_home, R.string.passenger_home
        )
        binding.drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        // Populate Header Info
        val headerView = binding.navigationView.getHeaderView(0)
        val tvNavName  = headerView.findViewById<TextView>(R.id.tvNavName)
        val tvNavRole  = headerView.findViewById<TextView>(R.id.tvNavRole)

        tvNavName.text = PrefsManager.getUserName(this) ?: "Passenger Account"
        tvNavRole.text = "✓ Active Passenger"

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

    private fun setupBottomNav() {
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    binding.fragmentContainer.visibility = View.GONE
                    binding.fabBookRide.visibility       = View.VISIBLE
                    supportActionBar?.title = "Hello, ${PrefsManager.getUserName(this) ?: "Passenger"}"
                    true
                }
                R.id.nav_book_ride -> {
                    startActivity(Intent(this, BookRideActivity::class.java))
                    false
                }
                R.id.nav_history -> {
                    binding.fabBookRide.visibility       = View.GONE
                    binding.fragmentContainer.visibility = View.VISIBLE
                    supportActionBar?.title = "Ride History"
                    showHistoryFragment()
                    true
                }
                R.id.nav_profile -> {
                    binding.fabBookRide.visibility       = View.GONE
                    binding.fragmentContainer.visibility = View.VISIBLE
                    supportActionBar?.title = "My Profile"
                    showProfileFragment()
                    true
                }
                else -> false
            }
        }
    }

    private fun showHistoryFragment() {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, RideHistoryFragment(), "history")
            .commit()
    }

    private fun showProfileFragment() {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, ProfileFragment(), "profile")
            .commit()
    }

    private fun showHelpDialog() {
        val dialogView = layoutInflater.inflate(R.layout.dialog_help, null)
        val dialog = AlertDialog.Builder(this)
            .setView(dialogView)
            .create()

        dialogView.findViewById<MaterialButton>(R.id.btnCloseHelp).setOnClickListener {
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
