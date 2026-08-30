package com.piatmove.driver.ui.auth

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.piatmove.core.utils.Resource
import com.piatmove.driver.databinding.ActivityRegisterBinding
import com.piatmove.driver.ui.home.DriverHomeActivity
import java.io.File
import java.io.FileOutputStream

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var viewModel: AuthViewModel

    private var fileLicenseProof: File? = null
    private var filePlateProof: File? = null
    private var fileDriverPhoto: File? = null
    private var fileTricyclePhoto: File? = null

    private val pickLicenseProof = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        uri?.let {
            fileLicenseProof = uriToFile(it, "license_proof")
            binding.tvLicenseProofName.text = getFileName(it) ?: fileLicenseProof?.name ?: "Selected"
            binding.tvLicenseProofName.setTextColor(getColor(android.R.color.holo_green_dark))
        }
    }

    private val pickPlateProof = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        uri?.let {
            filePlateProof = uriToFile(it, "plate_proof")
            binding.tvPlateProofName.text = getFileName(it) ?: filePlateProof?.name ?: "Selected"
            binding.tvPlateProofName.setTextColor(getColor(android.R.color.holo_green_dark))
        }
    }

    private val pickDriverPhoto = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        uri?.let {
            fileDriverPhoto = uriToFile(it, "driver_photo")
            binding.tvDriverPhotoName.text = getFileName(it) ?: fileDriverPhoto?.name ?: "Selected"
            binding.tvDriverPhotoName.setTextColor(getColor(android.R.color.holo_green_dark))
        }
    }

    private val pickTricyclePhoto = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        uri?.let {
            fileTricyclePhoto = uriToFile(it, "tricycle_photo")
            binding.tvTricyclePhotoName.text = getFileName(it) ?: fileTricyclePhoto?.name ?: "Selected"
            binding.tvTricyclePhotoName.setTextColor(getColor(android.R.color.holo_green_dark))
        }
    }

    private val barangays = listOf(
        "Apayao", "Aquib", "Baung", "Calaoagan", "Catarauan", "Dugayung",
        "Gumarueng", "Macapil", "Maguilling", "Minanga", "Poblacion I",
        "Poblacion II", "Santa Barbara", "Santo Domingo", "Sicatna",
        "Villa Rey (San Gaspar)", "Villa Reyno", "Warat"
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this)[AuthViewModel::class.java]

        val barangayAdapter = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, barangays)
        binding.actvBarangay.setAdapter(barangayAdapter)

        // Document pickers
        binding.btnPickLicenseProof.setOnClickListener { pickLicenseProof.launch("*/*") }
        binding.btnPickPlateProof.setOnClickListener { pickPlateProof.launch("*/*") }
        binding.btnPickDriverPhoto.setOnClickListener { pickDriverPhoto.launch("image/*") }
        binding.btnPickTricyclePhoto.setOnClickListener { pickTricyclePhoto.launch("image/*") }

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
        val vehicleType = "Tricycle"
        val barangay    = binding.actvBarangay.text.toString().trim()

        var hasError = false
        if (name.isEmpty())        { binding.tilName.error = "Required"; hasError = true }
        if (email.isEmpty())       { binding.tilEmail.error = "Required"; hasError = true }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.tilEmail.error = "Invalid email"; hasError = true
        }
        if (password.length < 8)   { binding.tilPassword.error = "Minimum 8 characters"; hasError = true }
        if (phone.isEmpty())       { binding.tilPhone.error = "Required"; hasError = true }
        if (licenseNo.isEmpty())   { binding.tilLicenseNo.error = "Required"; hasError = true }
        if (vehicleNo.isEmpty())   { binding.tilVehicleNo.error = "Required"; hasError = true }
        if (vehicleType.isEmpty()) { binding.tilVehicleType.error = "Select a vehicle type"; hasError = true }
        if (barangay.isEmpty())    { binding.tilBarangay.error = "Select a barangay"; hasError = true }

        if (fileLicenseProof == null) {
            Toast.makeText(this, "Please upload Proof of Driver's License", Toast.LENGTH_SHORT).show()
            hasError = true
        } else if (filePlateProof == null) {
            Toast.makeText(this, "Please upload Proof of Plate Number / OR-CR", Toast.LENGTH_SHORT).show()
            hasError = true
        } else if (fileDriverPhoto == null) {
            Toast.makeText(this, "Please upload Driver 2x2 / ID Photo", Toast.LENGTH_SHORT).show()
            hasError = true
        } else if (fileTricyclePhoto == null) {
            Toast.makeText(this, "Please upload Tricycle Photo", Toast.LENGTH_SHORT).show()
            hasError = true
        }

        if (hasError) return

        binding.tilName.error        = null
        binding.tilEmail.error       = null
        binding.tilPassword.error    = null
        binding.tilPhone.error       = null
        binding.tilLicenseNo.error   = null
        binding.tilVehicleNo.error   = null
        binding.tilVehicleType.error = null
        binding.tilBarangay.error    = null

        viewModel.register(
            name              = name,
            email             = email,
            password          = password,
            phone             = phone,
            licenseNo         = licenseNo,
            vehicleNo         = vehicleNo,
            vehicleType       = vehicleType,
            barangay          = barangay,
            plateProofFile    = filePlateProof,
            licenseProofFile  = fileLicenseProof,
            driverPhotoFile   = fileDriverPhoto,
            tricyclePhotoFile = fileTricyclePhoto
        )
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
                    val email = binding.etEmail.text.toString().trim()
                    androidx.appcompat.app.AlertDialog.Builder(this)
                        .setTitle("Registration Submitted")
                        .setMessage("Your driver account registration has been submitted and is pending admin approval. Please log in with your credentials to check status.")
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
                    binding.progressBar.visibility  = View.GONE
                    binding.btnRegister.isEnabled   = true
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun uriToFile(uri: Uri, prefix: String): File? {
        return try {
            val extension = contentResolver.getType(uri)?.let {
                when {
                    it.contains("pdf") -> "pdf"
                    it.contains("png") -> "png"
                    else -> "jpg"
                }
            } ?: "jpg"

            val tempFile = File(cacheDir, "${prefix}_${System.currentTimeMillis()}.$extension")
            contentResolver.openInputStream(uri)?.use { inputStream ->
                FileOutputStream(tempFile).use { outputStream ->
                    inputStream.copyTo(outputStream)
                }
            }
            tempFile
        } catch (e: Exception) {
            null
        }
    }

    private fun getFileName(uri: Uri): String? {
        var result: String? = null
        if (uri.scheme == "content") {
            val cursor = contentResolver.query(uri, null, null, null, null)
            cursor?.use {
                if (it.moveToFirst()) {
                    val index = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                    if (index != -1) result = it.getString(index)
                }
            }
        }
        if (result == null) {
            result = uri.path
            val cut = result?.lastIndexOf('/') ?: -1
            if (cut != -1) result = result?.substring(cut + 1)
        }
        return result
    }
}
