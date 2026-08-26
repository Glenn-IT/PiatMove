package com.piatmove.core.data.repository

import org.json.JSONObject
import retrofit2.HttpException
import java.io.IOException

abstract class BaseRepository {

    protected fun parseApiError(throwable: Throwable): String {
        return when (throwable) {
            is HttpException -> {
                val bodyMessage = try {
                    val body = throwable.response()?.errorBody()?.string().orEmpty()
                    JSONObject(body).optString("message", "").takeIf { it.isNotEmpty() }
                } catch (_: Exception) { null }

                bodyMessage ?: when (throwable.code()) {
                    401  -> "Session expired. Please log in again."
                    403  -> "You don't have permission to do that."
                    404  -> "Not found."
                    409  -> "This action conflicts with existing data."
                    500  -> "Something went wrong. Please try again later."
                    else -> "Server error (${throwable.code()})."
                }
            }
            is java.net.UnknownHostException -> {
                val url = com.piatmove.core.data.api.ApiClient.getCurrentBaseUrl()
                "Unable to reach server ($url). Please check your internet connection or DNS."
            }
            is java.net.SocketTimeoutException -> {
                val url = com.piatmove.core.data.api.ApiClient.getCurrentBaseUrl()
                "Server connection timed out ($url). Please check your internet speed or server URL."
            }
            is java.net.ConnectException -> {
                val url = com.piatmove.core.data.api.ApiClient.getCurrentBaseUrl()
                "Could not connect to server ($url): ${throwable.localizedMessage ?: "Connection refused"}."
            }
            is javax.net.ssl.SSLException -> {
                val url = com.piatmove.core.data.api.ApiClient.getCurrentBaseUrl()
                "SSL security error ($url): ${throwable.localizedMessage ?: "Certificate invalid"}. Ensure your device Date & Time are accurate."
            }
            is IOException -> {
                val url = com.piatmove.core.data.api.ApiClient.getCurrentBaseUrl()
                throwable.localizedMessage?.takeIf { it.isNotBlank() } ?: "Network error ($url). Please check your connection."
            }
            else -> throwable.message ?: "An unexpected error occurred."


        }
    }
}
