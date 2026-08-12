package com.piatmove.driver.ui.home

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.driver.R
import com.piatmove.driver.databinding.ActivityDriverHomeBinding
import com.piatmove.driver.ui.auth.AuthViewModel
import com.piatmove.driver.ui.auth.LoginActivity
import com.piatmove.driver.ui.dashboard.DriverDashboardFragment
import com.piatmove.driver.ui.requests.DriverRequestsFragment
import com.piatmove.driver.ui.status.DriverStatusFragment

class DriverHomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDriverHomeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDriverHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)

        if (savedInstanceState == null) {
            showFragment(NAV_DASHBOARD)
        }

        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_dashboard -> { showFragment(NAV_DASHBOARD); true }
                R.id.nav_requests  -> { showFragment(NAV_REQUESTS);  true }
                R.id.nav_status    -> { showFragment(NAV_STATUS);    true }
                else               -> false
            }
        }
    }

    private fun showFragment(tag: String) {
        val existing = supportFragmentManager.findFragmentByTag(tag)
        val fragment = existing ?: when (tag) {
            NAV_DASHBOARD -> DriverDashboardFragment()
            NAV_REQUESTS  -> DriverRequestsFragment()
            NAV_STATUS    -> DriverStatusFragment()
            else          -> DriverDashboardFragment()
        }
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment, tag)
            .commit()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_driver_home, menu)
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

    companion object {
        const val NAV_DASHBOARD = "dashboard"
        const val NAV_REQUESTS  = "requests"
        const val NAV_STATUS    = "status"
    }
}
