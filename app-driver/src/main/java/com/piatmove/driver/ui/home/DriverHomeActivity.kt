package com.piatmove.driver.ui.home

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
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.driver.R
import com.piatmove.driver.databinding.ActivityDriverHomeBinding
import com.piatmove.driver.ui.auth.AuthViewModel
import com.piatmove.driver.ui.auth.LoginActivity
import com.piatmove.driver.ui.dashboard.DriverDashboardFragment
import com.piatmove.driver.ui.requests.DriverRequestsFragment
import com.piatmove.driver.ui.status.DriverStatusFragment

class DriverHomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDriverHomeBinding
    private lateinit var toggle: ActionBarDrawerToggle
    private lateinit var driverViewModel: DriverViewModel
    private val NOTIFICATION_REQUEST = 1002

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDriverHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        driverViewModel = ViewModelProvider(this)[DriverViewModel::class.java]

        setSupportActionBar(binding.toolbar)
        val name = PrefsManager.getUserName(this) ?: "Driver"
        supportActionBar?.title = "Hello, $name!"

        setupDrawer()
        setupBottomNav()

        if (savedInstanceState == null) {
            showFragment(NAV_DASHBOARD, "Dashboard")
        }

        requestNotificationPermission()
    }

    private fun setupDrawer() {
        toggle = ActionBarDrawerToggle(
            this, binding.drawerLayout, binding.toolbar,
            R.string.driver_home, R.string.driver_home
        )
        binding.drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        val headerView = binding.navigationView.getHeaderView(0)
        val tvNavName  = headerView.findViewById<TextView>(R.id.tvNavName)
        val tvNavRole  = headerView.findViewById<TextView>(R.id.tvNavRole)

        tvNavName.text = PrefsManager.getUserName(this) ?: "Driver Partner"

        driverViewModel.approvalStatus.observe(this) { status ->
            if (status == "approved") {
                tvNavRole.text = "✓ Approved Driver"
                tvNavRole.setTextColor(getColor(R.color.colorHeroSubtitle))
            } else {
                tvNavRole.text = "⏳ Pending Approval"
                tvNavRole.setTextColor(android.graphics.Color.parseColor("#FDE68A"))
            }
        }

        binding.navigationView.setNavigationItemSelectedListener { menuItem ->
            binding.drawerLayout.closeDrawer(GravityCompat.START)
            when (menuItem.itemId) {
                R.id.drawer_dashboard -> {
                    binding.bottomNav.selectedItemId = R.id.nav_dashboard
                    true
                }
                R.id.drawer_requests -> {
                    binding.bottomNav.selectedItemId = R.id.nav_requests
                    true
                }
                R.id.drawer_status -> {
                    binding.bottomNav.selectedItemId = R.id.nav_status
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
                R.id.nav_dashboard -> { showFragment(NAV_DASHBOARD, "Dashboard"); true }
                R.id.nav_requests  -> { showFragment(NAV_REQUESTS, "Ride Requests"); true }
                R.id.nav_status    -> { showFragment(NAV_STATUS, "Driver Status"); true }
                R.id.nav_profile   -> { showFragment(NAV_PROFILE, "Driver Profile"); true }
                else               -> false
            }
        }
    }

    private fun showFragment(tag: String, title: String) {
        val existing = supportFragmentManager.findFragmentByTag(tag)
        val fragment = existing ?: when (tag) {
            NAV_DASHBOARD -> DriverDashboardFragment()
            NAV_REQUESTS  -> DriverRequestsFragment()
            NAV_STATUS    -> DriverStatusFragment()
            NAV_PROFILE   -> com.piatmove.driver.ui.profile.DriverProfileFragment()
            else          -> DriverDashboardFragment()
        }
        supportActionBar?.title = title
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment, tag)
            .commit()
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

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_driver_home, menu)
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

    companion object {
        const val NAV_DASHBOARD = "dashboard"
        const val NAV_REQUESTS  = "requests"
        const val NAV_STATUS    = "status"
        const val NAV_PROFILE   = "profile"
    }
}
