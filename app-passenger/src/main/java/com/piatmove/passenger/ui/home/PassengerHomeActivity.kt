package com.piatmove.passenger.ui.home

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.ActivityPassengerHomeBinding
import com.piatmove.passenger.ui.auth.AuthViewModel
import com.piatmove.passenger.ui.auth.LoginActivity
import com.piatmove.passenger.ui.booking.BookRideActivity
import com.piatmove.passenger.ui.history.RideHistoryFragment

class PassengerHomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPassengerHomeBinding
    private val NOTIFICATION_REQUEST = 1002

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPassengerHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = "Hello, ${PrefsManager.getUserName(this) ?: "Passenger"}"

        binding.fabBookRide.setOnClickListener {
            startActivity(Intent(this, BookRideActivity::class.java))
        }

        setupBottomNav()
        requestNotificationPermission()
    }

    private fun setupBottomNav() {
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_dashboard -> {
                    binding.fragmentContainer.visibility = View.GONE
                    binding.fabBookRide.visibility       = View.VISIBLE
                    true
                }
                R.id.nav_book_ride -> {
                    startActivity(Intent(this, BookRideActivity::class.java))
                    false
                }
                R.id.nav_history -> {
                    binding.fabBookRide.visibility       = View.GONE
                    binding.fragmentContainer.visibility = View.VISIBLE
                    showHistoryFragment()
                    true
                }
                else -> false
            }
        }
    }

    private fun showHistoryFragment() {
        if (supportFragmentManager.findFragmentByTag("history") == null) {
            supportFragmentManager.beginTransaction()
                .replace(R.id.fragmentContainer, RideHistoryFragment(), "history")
                .commit()
        }
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
        if (item.itemId == R.id.action_logout) {
            ViewModelProvider(this)[AuthViewModel::class.java].logout()
            startActivity(Intent(this, LoginActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            })
            return true
        }
        return super.onOptionsItemSelected(item)
    }
}
