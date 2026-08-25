package com.piatmove.passenger.ui.profile

import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.utils.Resource
import com.piatmove.passenger.R
import com.piatmove.passenger.databinding.FragmentProfileBinding
import com.piatmove.passenger.ui.auth.AuthViewModel
import com.piatmove.passenger.ui.auth.LoginActivity
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: AuthViewModel

    private val photoPicker = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        uri?.let { handlePickedPhoto(it) }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = ViewModelProvider(this)[AuthViewModel::class.java]

        loadLocalData()

        binding.btnChangeAvatar.setOnClickListener {
            photoPicker.launch("image/*")
        }

        binding.btnSaveProfile.setOnClickListener {
            saveProfileChanges()
        }

        binding.btnLogout.setOnClickListener {
            viewModel.logout()
            startActivity(Intent(requireActivity(), LoginActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            })
        }

        observeViewModel()
        viewModel.fetchProfile()
    }

    private fun loadLocalData() {
        val context = requireContext()
        val name  = PrefsManager.getUserName(context) ?: "Passenger"
        val phone = PrefsManager.getUserPhone(context) ?: ""
        val email = PrefsManager.getUserEmail(context) ?: ""
        val id    = PrefsManager.getUserId(context)
        val photo = PrefsManager.getUserPhotoPath(context)

        binding.tvHeaderName.text  = name
        binding.etName.setText(name)
        binding.etPhone.setText(phone)
        binding.etEmail.setText(email)
        binding.tvProfileId.text   = if (id > 0) "#$id" else "#--"

        loadAvatarImage(photo)
    }

    private fun handlePickedPhoto(uri: Uri) {
        try {
            val context = requireContext()
            val inputStream = context.contentResolver.openInputStream(uri) ?: return
            val file = File(context.cacheDir, "picked_profile_${System.currentTimeMillis()}.jpg")
            val outputStream = FileOutputStream(file)
            inputStream.copyTo(outputStream)
            inputStream.close()
            outputStream.close()

            // Display locally immediately
            val bitmap = BitmapFactory.decodeFile(file.absolutePath)
            if (bitmap != null) {
                binding.ivProfileAvatar.setImageBitmap(bitmap)
                binding.ivProfileAvatar.imageTintList = null
            }

            // Upload to server
            viewModel.uploadPhoto(file)
        } catch (e: Exception) {
            Toast.makeText(requireContext(), "Failed to process selected image.", Toast.LENGTH_SHORT).show()
        }
    }

    private fun saveProfileChanges() {
        val name  = binding.etName.text.toString().trim()
        val phone = binding.etPhone.text.toString().trim()

        if (name.isEmpty()) {
            binding.tilName.error = "Name is required"
            return
        }
        if (phone.isEmpty()) {
            binding.tilPhone.error = "Phone number is required"
            return
        }

        binding.tilName.error  = null
        binding.tilPhone.error = null

        viewModel.updateProfile(name, phone)
    }

    private fun observeViewModel() {
        viewModel.profileState.observe(viewLifecycleOwner) { state ->
            when (state) {
                is Resource.Success -> {
                    state.data?.let { user ->
                        binding.tvHeaderName.text = user.name
                        binding.etName.setText(user.name)
                        binding.etPhone.setText(user.phone)
                        binding.etEmail.setText(user.email)
                        binding.tvProfileId.text  = "#${user.id}"
                        loadAvatarImage(user.photo_path)
                    }
                }
                is Resource.Error -> {}
                Resource.Loading -> {}
            }
        }

        viewModel.updateProfileState.observe(viewLifecycleOwner) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility   = View.VISIBLE
                    binding.btnSaveProfile.isEnabled = false
                }
                is Resource.Success -> {
                    binding.progressBar.visibility   = View.GONE
                    binding.btnSaveProfile.isEnabled = true
                    state.data?.let {
                        binding.tvHeaderName.text = it.name
                    }
                    Toast.makeText(requireContext(), "Profile updated successfully!", Toast.LENGTH_SHORT).show()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility   = View.GONE
                    binding.btnSaveProfile.isEnabled = true
                    Toast.makeText(requireContext(), state.message, Toast.LENGTH_LONG).show()
                }
            }
        }

        viewModel.updatePhotoState.observe(viewLifecycleOwner) { state ->
            when (state) {
                is Resource.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                }
                is Resource.Success -> {
                    binding.progressBar.visibility = View.GONE
                    state.data?.photo_path?.let {
                        PrefsManager.saveUserProfile(
                            requireContext(),
                            name      = PrefsManager.getUserName(requireContext()) ?: "",
                            phone     = PrefsManager.getUserPhone(requireContext()) ?: "",
                            photoPath = it
                        )
                        loadAvatarImage(it)
                    }
                    Toast.makeText(requireContext(), "Profile photo updated!", Toast.LENGTH_SHORT).show()
                }
                is Resource.Error -> {
                    binding.progressBar.visibility = View.GONE
                    Toast.makeText(requireContext(), state.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun loadAvatarImage(photoPath: String?) {
        val fullUrl     = PrefsManager.getFullPhotoUrl(requireContext(), photoPath)
        val fallbackUrl = PrefsManager.getFallbackPhotoUrl(requireContext(), photoPath)

        if (fullUrl.isNullOrBlank()) {
            binding.ivProfileAvatar.setImageResource(R.drawable.ic_profile)
            return
        }

        viewLifecycleOwner.lifecycleScope.launch(Dispatchers.IO) {
            val bitmap = downloadBitmap(fullUrl) ?: fallbackUrl?.let { downloadBitmap(it) }
            withContext(Dispatchers.Main) {
                if (bitmap != null && _binding != null) {
                    binding.ivProfileAvatar.setImageBitmap(bitmap)
                    binding.ivProfileAvatar.imageTintList = null
                }
            }
        }
    }

    private fun downloadBitmap(urlString: String): Bitmap? {
        return try {
            val url = URL(urlString)
            val conn = url.openConnection() as HttpURLConnection
            conn.connectTimeout = 8000
            conn.readTimeout = 8000
            conn.instanceFollowRedirects = true
            conn.connect()
            if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                BitmapFactory.decodeStream(conn.inputStream)
            } else {
                null
            }
        } catch (_: Exception) {
            null
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
