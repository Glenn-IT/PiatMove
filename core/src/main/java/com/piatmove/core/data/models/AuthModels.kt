package com.piatmove.core.data.models

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String,
    val phone: String,
    val role: String,                   // "passenger" or "driver"
    val license_no: String?   = null,   // required if role == "driver"
    val vehicle_no: String?   = null,   // required if role == "driver"
    val vehicle_type: String? = null    // required if role == "driver"
)

data class LoginRequest(
    val email: String,
    val password: String
)

// PHP returns: { "token": "...", "user_id": 123, "role": "passenger" }
data class LoginResponse(
    val token: String,
    val user_id: Int,
    val role: String
)

// PHP returns same shape on register
data class RegisterResponse(
    val token: String,
    val user_id: Int,
    val role: String
)
