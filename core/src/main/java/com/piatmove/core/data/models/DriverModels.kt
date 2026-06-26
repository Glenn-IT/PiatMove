package com.piatmove.core.data.models

data class UpdateLocationRequest(
    val lat: Double,
    val lng: Double
)

data class UpdateDriverStatusRequest(
    val is_online: Boolean
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
