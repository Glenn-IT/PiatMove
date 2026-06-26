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
            is IOException -> "No internet connection. Please check your network."
            else -> throwable.message ?: "An unexpected error occurred."
        }
    }
}
