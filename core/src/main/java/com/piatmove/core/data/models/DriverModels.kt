package com.piatmove.core.data.models

data class UpdateLocationRequest(
    val lat: Double,
    val lng: Double
)

data class UpdateDriverStatusRequest(
    val is_online: Boolean
)

data class DriverStatusResponse(
    val is_online: Boolean,
    val approval_status: String = "pending"
)

data class DriverProfile(
    val id: Int,
    val name: String,
    val email: String,
    val phone: String,
    val role: String,
    val account_status: String = "active",
    val photo_path: String? = null,
    val license_no: String? = null,
    val vehicle_no: String? = null,
    val vehicle_type: String? = null,
    val barangay: String? = null,
    val approval_status: String = "pending",
    val is_online: Boolean = false,
    val current_lat: Double? = null,
    val current_lng: Double? = null
)

data class UpdateDriverProfileRequest(
    val phone: String? = null,
    val barangay: String? = null,
    val current_password: String? = null,
    val new_password: String? = null
)

// Returned by GET /admin/drivers/pending
data class PendingDriver(
    val id: Int,
    val name: String,
    val email: String,
    val phone: String,
    val license_no: String?,
    val vehicle_no: String?,
    val vehicle_type: String?,
    val approval_status: String,
    val created_at: String
)
