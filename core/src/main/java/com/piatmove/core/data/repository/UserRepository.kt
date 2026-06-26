package com.piatmove.core.data.repository

import com.piatmove.core.data.api.ApiService
import com.piatmove.core.data.models.FcmTokenRequest
import com.piatmove.core.utils.Resource

class UserRepository(
    private val api: ApiService
) : BaseRepository() {

    suspend fun updateFcmToken(token: String): Resource<Unit> {
        return try {
            val response = api.updateFcmToken(FcmTokenRequest(token))
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }
}
