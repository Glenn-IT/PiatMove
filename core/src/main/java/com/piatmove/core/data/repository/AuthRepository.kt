package com.piatmove.core.data.repository

import android.content.Context
import com.piatmove.core.data.api.ApiService
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.data.models.FcmTokenRequest
import com.piatmove.core.data.models.LoginRequest
import com.piatmove.core.data.models.LoginResponse
import com.piatmove.core.data.models.RegisterRequest
import com.piatmove.core.data.models.RegisterResponse
import com.piatmove.core.utils.Resource

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

    suspend fun login(request: LoginRequest): Resource<LoginResponse> {
        return try {
            val response = api.login(request)
            if (response.success && response.data != null) {
                PrefsManager.saveLoginData(
                    context,
                    token  = response.data.token,
                    userId = response.data.user_id,
                    role   = response.data.role
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

    private suspend fun syncFcmTokenIfAvailable() {
        val fcmToken = PrefsManager.getFcmToken(context) ?: return
        try { api.updateFcmToken(FcmTokenRequest(fcmToken)) } catch (_: Exception) {}
    }

    fun logout() {
        PrefsManager.clearAll(context)
    }
}
