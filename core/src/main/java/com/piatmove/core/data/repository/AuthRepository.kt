package com.piatmove.core.data.repository

import android.content.Context
import com.piatmove.core.data.api.ApiService
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.data.models.FcmTokenRequest
import com.piatmove.core.data.models.LoginRequest
import com.piatmove.core.data.models.LoginResponse
import com.piatmove.core.data.models.RegisterRequest
import com.piatmove.core.data.models.RegisterResponse
import com.piatmove.core.data.models.UpdateProfilePhotoResponse
import com.piatmove.core.data.models.UpdateProfileRequest
import com.piatmove.core.data.models.UserProfile
import com.piatmove.core.utils.Resource

import java.io.File
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody

class AuthRepository(
    private val api: ApiService,
    private val context: Context
) : BaseRepository() {

    suspend fun register(request: RegisterRequest): Resource<RegisterResponse> {
        return try {
            val response = api.register(request)
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun registerDriver(
        name: String, email: String, password: String, phone: String,
        licenseNo: String, vehicleNo: String, vehicleType: String, barangay: String,
        plateProofFile: File? = null,
        licenseProofFile: File? = null,
        driverPhotoFile: File? = null,
        tricyclePhotoFile: File? = null
    ): Resource<RegisterResponse> {
        return try {
            val textMedia = "text/plain".toMediaTypeOrNull()

            fun createPart(partName: String, file: File?): MultipartBody.Part? {
                if (file == null || !file.exists()) return null
                val mediaType = when (file.extension.lowercase()) {
                    "pdf" -> "application/pdf".toMediaTypeOrNull()
                    "png" -> "image/png".toMediaTypeOrNull()
                    else  -> "image/jpeg".toMediaTypeOrNull()
                }
                val requestFile = file.asRequestBody(mediaType)
                return MultipartBody.Part.createFormData(partName, file.name, requestFile)
            }

            val response = api.registerDriver(
                name           = name.toRequestBody(textMedia),
                email          = email.toRequestBody(textMedia),
                password       = password.toRequestBody(textMedia),
                phone          = phone.toRequestBody(textMedia),
                role           = "driver".toRequestBody(textMedia),
                licenseNo      = licenseNo.toRequestBody(textMedia),
                vehicleNo      = vehicleNo.toRequestBody(textMedia),
                vehicleType    = vehicleType.toRequestBody(textMedia),
                barangay       = barangay.toRequestBody(textMedia),
                plateProof     = createPart("plate_proof", plateProofFile),
                licenseProof   = createPart("license_proof", licenseProofFile),
                driverPhoto    = createPart("driver_photo", driverPhotoFile),
                tricyclePhoto  = createPart("tricycle_photo", tricyclePhotoFile)
            )

            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun login(request: LoginRequest): Resource<LoginResponse> {
        return try {
            val response = api.login(request)
            if (response.success && response.data != null) {
                PrefsManager.saveLoginData(
                    context,
                    token          = response.data.token,
                    userId         = response.data.user_id,
                    role           = response.data.role,
                    name           = response.data.name,
                    phone          = response.data.phone,
                    email          = response.data.email ?: request.email,
                    photoPath      = response.data.photo_path,
                    approvalStatus = response.data.approval_status
                )
                syncFcmTokenIfAvailable()
                Resource.Success(response.data)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun forgotPassword(email: String): Resource<String> {
        return try {
            val response = api.forgotPassword(com.piatmove.core.data.models.ForgotPasswordRequest(email))
            if (response.success) {
                Resource.Success(response.message)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun resetPassword(email: String, otp: String, password: String): Resource<String> {
        return try {
            val response = api.resetPassword(com.piatmove.core.data.models.ResetPasswordRequest(email, otp, password))
            if (response.success) {
                Resource.Success(response.message)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getUserProfile(): Resource<UserProfile> {
        return try {
            val response = api.getUserProfile()
            if (response.success && response.data != null) {
                PrefsManager.saveUserProfile(
                    context,
                    name      = response.data.name,
                    phone     = response.data.phone,
                    email     = response.data.email,
                    photoPath = response.data.photo_path
                )
                Resource.Success(response.data)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun updateProfile(name: String, phone: String): Resource<UpdateProfileRequest> {
        return try {
            val response = api.updateProfile(UpdateProfileRequest(name, phone))
            if (response.success && response.data != null) {
                PrefsManager.saveUserProfile(context, name = name, phone = phone)
                Resource.Success(response.data)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun uploadProfilePhoto(photoFile: File): Resource<UpdateProfilePhotoResponse> {
        return try {
            val mediaType = when (photoFile.extension.lowercase()) {
                "png"  -> "image/png".toMediaTypeOrNull()
                "webp" -> "image/webp".toMediaTypeOrNull()
                else   -> "image/jpeg".toMediaTypeOrNull()
            }
            val requestFile = photoFile.asRequestBody(mediaType)
            val part = MultipartBody.Part.createFormData("photo", photoFile.name, requestFile)
            val response = api.uploadProfilePhoto(part)
            if (response.success && response.data != null) {
                PrefsManager.saveUserProfile(
                    context,
                    name      = PrefsManager.getUserName(context) ?: "",
                    phone     = PrefsManager.getUserPhone(context) ?: "",
                    photoPath = response.data.photo_path
                )
                Resource.Success(response.data)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    private suspend fun syncFcmTokenIfAvailable() {
        val fcmToken = PrefsManager.getFcmToken(context) ?: return
        try { api.updateFcmToken(FcmTokenRequest(fcmToken)) } catch (_: Exception) {}
    }

    fun logout() {
        PrefsManager.clearAll(context)
    }
}
