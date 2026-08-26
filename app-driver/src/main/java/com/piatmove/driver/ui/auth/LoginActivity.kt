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
import com.piatmove.driver.R
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
        binding.tvForgotPassword.setOnClickListener { showForgotPasswordDialog() }
        binding.tvServerConfig.setOnClickListener { showServerConfigDialog() }

        handleIncomingEmail(intent)
        observeViewModel()
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleIncomingEmail(intent)
    }

    private fun handleIncomingEmail(intent: Intent?) {
        val prefillEmail = intent?.getStringExtra("prefill_email")
        if (!prefillEmail.isNullOrBlank()) {
            binding.etEmail.setText(prefillEmail)
            binding.etPassword.setText("")
            binding.etPassword.requestFocus()
        }
    }

    private var resetEmailCurrent: String = ""

    private var progressDialog: AlertDialog? = null

    private fun showLoadingDialog(message: String) {
        progressDialog?.dismiss()
        val builder = AlertDialog.Builder(this)
        val layout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.HORIZONTAL
            setPadding(60, 50, 60, 50)
            gravity = android.view.Gravity.CENTER_VERTICAL
            val progress = android.widget.ProgressBar(this@LoginActivity).apply {
                isIndeterminate = true
            }
            val text = android.widget.TextView(this@LoginActivity).apply {
                setText(message)
                textSize = 15f
                setPadding(40, 0, 0, 0)
                setTextColor(resources.getColor(android.R.color.black, theme))
            }
            addView(progress)
            addView(text)
        }
        builder.setView(layout)
        builder.setCancelable(false)
        progressDialog = builder.create()
        progressDialog?.show()
    }

    private fun hideLoadingDialog() {
        progressDialog?.dismiss()
        progressDialog = null
    }

    private fun showForgotPasswordDialog() {
        val input = EditText(this).apply {
            hint = "Enter your registered driver email"
            inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS
            val currentEmail = binding.etEmail.text.toString().trim()
            if (currentEmail.isNotEmpty()) setText(currentEmail)
            setPadding(48, 36, 48, 36)
        }

        val container = android.widget.FrameLayout(this).apply {
            setPadding(48, 16, 48, 16)
            addView(input)
        }

        AlertDialog.Builder(this)
            .setTitle(getString(R.string.forgot_password))
            .setMessage("Enter your registered driver email to receive a 6-digit password reset code.")
            .setView(container)
            .setPositiveButton("Send Code") { _, _ ->
                val email = input.text.toString().trim()
                if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    Toast.makeText(this, "Please enter a valid email address", Toast.LENGTH_SHORT).show()
                    return@setPositiveButton
                }
                resetEmailCurrent = email
                showLoadingDialog("Sending verification code...")
                viewModel.forgotPassword(email)
            }
            .setNegativeButton("Cancel", null)
            .show()
    }

    private fun showResetPasswordDialog(email: String) {
        val layout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            setPadding(60, 30, 60, 20)
        }

        val etOtp = EditText(this).apply {
            hint = "6-Digit Code (e.g. 123456)"
            inputType = InputType.TYPE_CLASS_NUMBER
            filters = arrayOf(android.text.InputFilter.LengthFilter(6))
            textSize = 16f
        }

        val etNewPassword = EditText(this).apply {
            hint = "New Password (min. 8 chars)"
            inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
            textSize = 16f
        }

        val etConfirmPassword = EditText(this).apply {
            hint = "Confirm New Password"
            inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
            textSize = 16f
        }

        layout.addView(etOtp)
        layout.addView(etNewPassword)
        layout.addView(etConfirmPassword)

        AlertDialog.Builder(this)
            .setTitle("Reset Password")
            .setMessage("A verification code was sent to $email. Enter the code and your new password:")
            .setView(layout)
            .setCancelable(false)
            .setPositiveButton("Reset Password") { _, _ ->
                val otp = etOtp.text.toString().trim()
                val newPass = etNewPassword.text.toString()
                val confirmPass = etConfirmPassword.text.toString()

                if (otp.length != 6) {
                    Toast.makeText(this, "Please enter the 6-digit code", Toast.LENGTH_SHORT).show()
                    return@setPositiveButton
                }
                if (newPass.length < 8) {
                    Toast.makeText(this, "Password must be at least 8 characters", Toast.LENGTH_SHORT).show()
                    return@setPositiveButton
                }
                if (newPass != confirmPass) {
                    Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
                    return@setPositiveButton
                }

                showLoadingDialog("Resetting password...")
                viewModel.resetPassword(email, otp, newPass)
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
                viewModel.clearResetState()
            }
            .show()
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

        viewModel.forgotPasswordState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> { /* Handled by showLoadingDialog */ }
                is Resource.Success -> {
                    hideLoadingDialog()
                    Toast.makeText(this, state.data ?: "Verification code sent to your email", Toast.LENGTH_LONG).show()
                    showResetPasswordDialog(resetEmailCurrent)
                }
                is Resource.Error -> {
                    hideLoadingDialog()
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
                null -> {}
            }
        }

        viewModel.resetPasswordState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> { /* Handled by showLoadingDialog */ }
                is Resource.Success -> {
                    hideLoadingDialog()
                    AlertDialog.Builder(this)
                        .setTitle("Success")
                        .setMessage(state.data ?: "Password reset successfully! You can now log in.")
                        .setPositiveButton("Log In Now") { _, _ ->
                            binding.etEmail.setText(resetEmailCurrent)
                            binding.etPassword.setText("")
                            binding.etPassword.requestFocus()
                        }
                        .show()
                    viewModel.clearResetState()
                }
                is Resource.Error -> {
                    hideLoadingDialog()
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                    showResetPasswordDialog(resetEmailCurrent)
                }
                null -> {}
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

