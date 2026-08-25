package com.piatmove.core.data.models

// Full user row returned by admin & user endpoints
data class User(
    val id: Int,
    val name: String,
    val email: String,
    val phone: String,
    val role: String,      // "passenger" | "driver"
    val status: String,    // "active" | "inactive"
    val photo_path: String? = null,
    val created_at: String
)

data class UserProfile(
    val id: Int,
    val name: String,
    val email: String,
    val phone: String,
    val role: String,
    val status: String,
    val photo_path: String? = null,
    val created_at: String? = null
)

data class UpdateProfileRequest(
    val name: String,
    val phone: String
)

data class UpdateProfilePhotoResponse(
    val photo_path: String
)
