package com.piatmove.passenger.ui.auth

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.databinding.ActivityRegisterBinding
import com.piatmove.passenger.databinding.DialogOtpVerificationBinding

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var viewModel: AuthViewModel

    private var otpDialog: AlertDialog? = null
    private var otpDialogBinding: DialogOtpVerificationBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this)[AuthViewModel::class.java]

        binding.btnRegister.setOnClickListener { attemptRegister() }
        binding.tvLogin.setOnClickListener { finish() }

        observeViewModel()
    }

    override fun onDestroy() {
        super.onDestroy()
        otpDialog?.dismiss()
        otpDialog = null
        otpDialogBinding = null
    }

    private fun attemptRegister() {
        val name     = binding.etName.text.toString().trim()
        val email    = binding.etEmail.text.toString().trim()
        val password = binding.etPassword.text.toString()
        val phone    = binding.etPhone.text.toString().trim()

        if (name.isEmpty())  { binding.tilName.error  = "Name is required";  return }
        if (email.isEmpty()) { binding.tilEmail.error = "Email is required"; return }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.tilEmail.error = "Invalid email address"; return
        }
        if (password.length < 8) { binding.tilPassword.error = "Minimum 8 characters"; return }
        if (phone.isEmpty()) { binding.tilPhone.error = "Phone is required"; return }

        listOf(binding.tilName, binding.tilEmail, binding.tilPassword, binding.tilPhone)
            .forEach { it.error = null }

        // Step 1: Send verification OTP to email before creating account
        viewModel.sendRegistrationOtp(email, name)
    }

    private fun showOtpDialog(email: String, name: String) {
        if (otpDialog?.isShowing == true) {
            otpDialogBinding?.pbOtpLoading?.visibility = View.GONE
            otpDialogBinding?.btnSubmitOtp?.isEnabled = true
            return
        }

        val dBinding = DialogOtpVerificationBinding.inflate(layoutInflater)
        otpDialogBinding = dBinding

        dBinding.tvTargetEmail.text = email

        dBinding.btnSubmitOtp.setOnClickListener {
            val otpCode = dBinding.etOtpCode.text.toString().trim()
            if (otpCode.length != 6) {
                dBinding.tilOtp.error = "Please enter the 6-digit code"
                return@setOnClickListener
            }
            dBinding.tilOtp.error = null
            dBinding.pbOtpLoading.visibility = View.VISIBLE
            dBinding.btnSubmitOtp.isEnabled = false

            val password = binding.etPassword.text.toString()
            val phone    = binding.etPhone.text.toString().trim()

            // Step 2: Submit registration with verified OTP
            viewModel.register(name, email, password, phone, otpCode)
        }

        dBinding.tvResendOtp.setOnClickListener {
            dBinding.tilOtp.error = null
            dBinding.pbOtpLoading.visibility = View.VISIBLE
            viewModel.sendRegistrationOtp(email, name)
            Toast.makeText(this, "Resending verification code...", Toast.LENGTH_SHORT).show()
        }

        dBinding.btnCancelOtp.setOnClickListener {
            otpDialog?.dismiss()
        }

        otpDialog = AlertDialog.Builder(this)
            .setView(dBinding.root)
            .setCancelable(false)
            .create()

        otpDialog?.window?.setBackgroundDrawableResource(android.R.color.transparent)
        otpDialog?.show()
    }

    private fun observeViewModel() {
        viewModel.sendRegistrationOtpState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.btnRegister.isEnabled  = false
                    otpDialogBinding?.pbOtpLoading?.visibility = View.VISIBLE
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnRegister.isEnabled  = true
                    otpDialogBinding?.pbOtpLoading?.visibility = View.GONE

                    val name  = binding.etName.text.toString().trim()
                    val email = binding.etEmail.text.toString().trim()
                    showOtpDialog(email, name)
                    Toast.makeText(this, state.data ?: "Verification code sent to your email", Toast.LENGTH_SHORT).show()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnRegister.isEnabled  = true
                    otpDialogBinding?.pbOtpLoading?.visibility = View.GONE
                    if (otpDialog?.isShowing == true) {
                        otpDialogBinding?.tilOtp?.error = state.message
                    } else {
                        Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                    }
                }
                null -> {}
            }
        }

        viewModel.registerState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.btnRegister.isEnabled  = false
                    otpDialogBinding?.pbOtpLoading?.visibility = View.VISIBLE
                    otpDialogBinding?.btnSubmitOtp?.isEnabled  = false
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnRegister.isEnabled  = true
                    otpDialog?.dismiss()

                    val email = binding.etEmail.text.toString().trim()
                    AlertDialog.Builder(this)
                        .setTitle("Registration Successful")
                        .setMessage("Your account has been created successfully. Please log in with your email and password.")
                        .setCancelable(false)
                        .setPositiveButton("Go to Login") { _, _ ->
                            startActivity(Intent(this, LoginActivity::class.java).apply {
                                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
                                putExtra("prefill_email", email)
                            })
                            finish()
                        }
                        .show()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnRegister.isEnabled  = true
                    otpDialogBinding?.pbOtpLoading?.visibility = View.GONE
                    otpDialogBinding?.btnSubmitOtp?.isEnabled  = true
                    if (otpDialog?.isShowing == true) {
                        otpDialogBinding?.tilOtp?.error = state.message
                    } else {
                        Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                    }
                }
                null -> {}
            }
        }
    }
}
