package com.piatmove.driver.ui.auth

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.utils.Resource
import com.piatmove.core.utils.UserRole
import com.piatmove.driver.databinding.ActivityLoginBinding
import com.piatmove.driver.ui.home.DriverHomeActivity

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var viewModel: AuthViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this)[AuthViewModel::class.java]

        binding.btnLogin.setOnClickListener { attemptLogin() }
        binding.tvRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
        binding.tvServerConfig.setOnClickListener { showServerConfigDialog() }

        observeViewModel()
    }

    private fun attemptLogin() {
        val email    = binding.etEmail.text.toString().trim()
        val password = binding.etPassword.text.toString()

        if (email.isEmpty()) { binding.tilEmail.error = "Email is required"; return }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.tilEmail.error = "Invalid email address"; return
        }
        if (password.isEmpty()) { binding.tilPassword.error = "Password is required"; return }

        binding.tilEmail.error    = null
        binding.tilPassword.error = null
        viewModel.login(email, password)
    }

    private fun observeViewModel() {
        viewModel.loginState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.btnLogin.isEnabled     = false
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnLogin.isEnabled     = true
                    val role = state.data?.role ?: ""
                    if (role == UserRole.DRIVER) {
                        startActivity(Intent(this, DriverHomeActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                        })
                    } else {
                        Toast.makeText(this, "This account is not a driver. Please use the Passenger app.", Toast.LENGTH_LONG).show()
                        viewModel.logout()
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnLogin.isEnabled     = true
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun showServerConfigDialog() {
        val currentUrl = PrefsManager.getServerUrl(this)
        val input = EditText(this).apply {
            setText(currentUrl)
            inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_URI
            selectAll()
            setPadding(48, 24, 48, 24)
        }
        AlertDialog.Builder(this)
            .setTitle("Server URL")
            .setMessage("Enter the base URL of your XAMPP server.")
            .setView(input)
            .setPositiveButton("Save") { _, _ ->
                var url = input.text.toString().trim()
                if (url.isNotEmpty()) {
                    if (!url.endsWith("/")) url += "/"
                    PrefsManager.saveServerUrl(this, url)
                    Toast.makeText(this, "Saved: $url", Toast.LENGTH_LONG).show()
                }
            }
            .setNeutralButton("Reset Default") { _, _ ->
                PrefsManager.saveServerUrl(this, com.piatmove.core.utils.Constants.BASE_URL_DEVICE)
                Toast.makeText(this, "Reset to default", Toast.LENGTH_SHORT).show()
            }
            .setNegativeButton("Cancel", null)
            .show()
    }
}
