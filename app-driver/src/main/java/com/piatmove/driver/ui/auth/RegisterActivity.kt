package com.piatmove.driver.ui.auth

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.utils.Resource
import com.piatmove.driver.R
import com.piatmove.driver.databinding.ActivityRegisterBinding
import com.piatmove.driver.ui.home.DriverHomeActivity

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var viewModel: AuthViewModel

    private val vehicleTypes = listOf("Tricycle", "Motorcycle", "Jeepney", "Van", "Taxi")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this)[AuthViewModel::class.java]

        val adapter = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, vehicleTypes)
        binding.actvVehicleType.setAdapter(adapter)

        binding.btnRegister.setOnClickListener { attemptRegister() }
        binding.tvLogin.setOnClickListener { finish() }

        observeViewModel()
    }

    private fun attemptRegister() {
        val name        = binding.etName.text.toString().trim()
        val email       = binding.etEmail.text.toString().trim()
        val password    = binding.etPassword.text.toString()
        val phone       = binding.etPhone.text.toString().trim()
        val licenseNo   = binding.etLicenseNo.text.toString().trim()
        val vehicleNo   = binding.etVehicleNo.text.toString().trim()
        val vehicleType = binding.actvVehicleType.text.toString().trim()

        var hasError = false
        if (name.isEmpty())        { binding.tilName.error = "Required"; hasError = true }
        if (email.isEmpty())       { binding.tilEmail.error = "Required"; hasError = true }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.tilEmail.error = "Invalid email"; hasError = true
        }
        if (password.length < 6)   { binding.tilPassword.error = "Minimum 6 characters"; hasError = true }
        if (phone.isEmpty())       { binding.tilPhone.error = "Required"; hasError = true }
        if (licenseNo.isEmpty())   { binding.tilLicenseNo.error = "Required"; hasError = true }
        if (vehicleNo.isEmpty())   { binding.tilVehicleNo.error = "Required"; hasError = true }
        if (vehicleType.isEmpty()) { binding.tilVehicleType.error = "Select a vehicle type"; hasError = true }
        if (hasError) return

        binding.tilName.error        = null
        binding.tilEmail.error       = null
        binding.tilPassword.error    = null
        binding.tilPhone.error       = null
        binding.tilLicenseNo.error   = null
        binding.tilVehicleNo.error   = null
        binding.tilVehicleType.error = null

        viewModel.register(name, email, password, phone, licenseNo, vehicleNo, vehicleType)
    }

    private fun observeViewModel() {
        viewModel.registerState.observe(this) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility  = View.VISIBLE
                    binding.btnRegister.isEnabled   = false
                }
                is Resource.Success -> {
                    binding.progressBar.visibility  = View.GONE
                    binding.btnRegister.isEnabled   = true
                    Toast.makeText(this, "Registered! Awaiting admin approval.", Toast.LENGTH_LONG).show()
                    startActivity(Intent(this, DriverHomeActivity::class.java).apply {
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    })
                }
                is Resource.Error -> {
                    binding.progressBar.visibility  = View.GONE
                    binding.btnRegister.isEnabled   = true
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}
