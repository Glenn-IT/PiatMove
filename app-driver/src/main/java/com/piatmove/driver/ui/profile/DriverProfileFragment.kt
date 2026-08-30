package com.piatmove.driver.ui.profile

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.utils.Resource
import com.piatmove.driver.R
import com.piatmove.driver.databinding.FragmentDriverProfileBinding
import com.piatmove.driver.ui.auth.LoginActivity
import com.piatmove.driver.ui.home.DriverViewModel

class DriverProfileFragment : Fragment() {

    private var _binding: FragmentDriverProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: DriverViewModel

    private val barangays = listOf(
        "Apayao", "Aquib", "Baung", "Calaoagan", "Catarauan", "Dugayung",
        "Gumarueng", "Macapil", "Maguilling", "Minanga", "Poblacion I",
        "Poblacion II", "Santa Barbara", "Santo Domingo", "Sicatna",
        "Villa Rey (San Gaspar)", "Villa Reyno", "Warat"
    )

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentDriverProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = ViewModelProvider(requireActivity())[DriverViewModel::class.java]

        setupBarangayDropdown()
        loadLocalData()

        binding.btnSaveProfile.setOnClickListener {
            saveProfileChanges()
        }

        binding.btnLogout.setOnClickListener {
            confirmLogout()
        }

        observeViewModel()
        viewModel.fetchDriverProfile()
    }

    private fun setupBarangayDropdown() {
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_dropdown_item_1line, barangays)
        binding.actvBarangay.setAdapter(adapter)
    }

    private fun loadLocalData() {
        val context = requireContext()
        val name  = PrefsManager.getUserName(context) ?: "Driver"
        val phone = PrefsManager.getUserPhone(context) ?: ""
        val email = PrefsManager.getUserEmail(context) ?: ""
        val id    = PrefsManager.getUserId(context)
        val status = PrefsManager.getDriverApprovalStatus(context)

        binding.tvHeaderName.text = name
        binding.etPhone.setText(phone)
        binding.tvProfileId.text = if (id > 0) "Driver ID: #$id" else "Driver ID: #--"
        binding.etRestrictedName.setText(name)
        binding.etRestrictedEmail.setText(email)

        updateApprovalBadge(status)
    }

    private fun updateApprovalBadge(status: String) {
        if (status == "approved") {
            binding.tvHeaderStatus.text = "✓ Verified & Approved Driver"
            binding.tvHeaderStatus.setBackgroundColor(android.graphics.Color.parseColor("#3312B76A"))
            binding.tvHeaderStatus.setTextColor(android.graphics.Color.parseColor("#E8FFF3"))
        } else {
            binding.tvHeaderStatus.text = "⏳ Pending Admin Approval"
            binding.tvHeaderStatus.setBackgroundColor(android.graphics.Color.parseColor("#33F59E0B"))
            binding.tvHeaderStatus.setTextColor(android.graphics.Color.parseColor("#FFFBEB"))
        }
    }

    private fun observeViewModel() {
        viewModel.driverProfile.observe(viewLifecycleOwner) { state ->
            if (state is Resource.Success && state.data != null) {
                val p = state.data!!
                binding.tvHeaderName.text = p.name
                binding.etPhone.setText(p.phone)
                binding.actvBarangay.setText(p.barangay ?: "Poblacion I", false)
                binding.tvProfileId.text = "Driver ID: #${p.id}"
                binding.etRestrictedName.setText(p.name)
                binding.etRestrictedEmail.setText(p.email)
                binding.etRestrictedLicense.setText(p.license_no ?: "—")
                binding.etRestrictedVehicle.setText(p.vehicle_no ?: "—")
                binding.etRestrictedVehicleType.setText(p.vehicle_type ?: "Tricycle")
                updateApprovalBadge(p.approval_status)
            }
        }

        viewModel.updateProfileState.observe(viewLifecycleOwner) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.btnSaveProfile.isEnabled = false
                    binding.btnSaveProfile.text = "Saving Changes…"
                }
                is Resource.Success -> {
                    binding.btnSaveProfile.isEnabled = true
                    binding.btnSaveProfile.text = "Save Profile & Credential Changes"
                    binding.etCurrentPassword.text?.clear()
                    binding.etNewPassword.text?.clear()
                    binding.etConfirmPassword.text?.clear()
                    binding.tilPhone.error = null
                    binding.tilCurrentPassword.error = null
                    binding.tilNewPassword.error = null
                    binding.tilConfirmPassword.error = null
                    Toast.makeText(requireContext(), "Driver profile updated successfully!", Toast.LENGTH_SHORT).show()
                }
                is Resource.Error -> {
                    binding.btnSaveProfile.isEnabled = true
                    binding.btnSaveProfile.text = "Save Profile & Credential Changes"
                    Toast.makeText(requireContext(), state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun saveProfileChanges() {
        val phone = binding.etPhone.text.toString().trim()
        val barangay = binding.actvBarangay.text.toString().trim()
        val currentPass = binding.etCurrentPassword.text.toString()
        val newPass = binding.etNewPassword.text.toString()
        val confirmPass = binding.etConfirmPassword.text.toString()

        var hasError = false
        if (phone.isEmpty()) {
            binding.tilPhone.error = "Phone number is required"
            hasError = true
        } else {
            binding.tilPhone.error = null
        }

        if (newPass.isNotEmpty() || confirmPass.isNotEmpty() || currentPass.isNotEmpty()) {
            if (currentPass.isEmpty()) {
                binding.tilCurrentPassword.error = "Enter current password to set a new one"
                hasError = true
            } else {
                binding.tilCurrentPassword.error = null
            }

            if (newPass.length < 6) {
                binding.tilNewPassword.error = "New password must be at least 6 characters"
                hasError = true
            } else {
                binding.tilNewPassword.error = null
            }

            if (newPass != confirmPass) {
                binding.tilConfirmPassword.error = "Passwords do not match"
                hasError = true
            } else {
                binding.tilConfirmPassword.error = null
            }
        }

        if (hasError) return

        viewModel.updateProfile(
            phone = phone,
            barangay = barangay,
            currentPass = currentPass.ifEmpty { null },
            newPass = newPass.ifEmpty { null }
        )
    }

    private fun confirmLogout() {
        AlertDialog.Builder(requireContext())
            .setTitle("Logout")
            .setMessage("Are you sure you want to log out of your driver account?")
            .setPositiveButton("Logout") { _, _ ->
                PrefsManager.clearAll(requireContext())
                val intent = Intent(requireContext(), LoginActivity::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                }
                startActivity(intent)
            }
            .setNegativeButton("Cancel", null)
            .show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
