package com.piatmove.core.data.repository

import com.piatmove.core.data.api.ApiService
import com.piatmove.core.data.models.FcmTokenRequest
import com.piatmove.core.utils.Resource

class UserRepository(
    private val apiOverride: ApiService? = null
) : BaseRepository() {

    private val api: ApiService
        get() = apiOverride ?: com.piatmove.core.data.api.ApiClient.instance


    suspend fun updateFcmToken(token: String): Resource<Unit> {
        return try {
            val response = api.updateFcmToken(FcmTokenRequest(token))
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }
}
