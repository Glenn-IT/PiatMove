package com.piatmove.core.data.models

// Full user row returned by admin endpoints
data class User(
    val id: Int,
    val name: String,
    val email: String,
    val phone: String,
    val role: String,      // "passenger" | "driver"
    val status: String,    // "active" | "inactive"
    val created_at: String
)
