package com.piatmove.core.data.api

// Matches every PHP response: { "success": bool, "data": <T>, "message": "..." }
data class ApiResponse<T>(
    val success: Boolean,
    val data: T?,
    val message: String
)
