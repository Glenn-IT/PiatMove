package com.piatmove.core.utils

object Constants {
    // Use emulator URL by default; swap to DEVICE_URL when testing on a physical device
    const val BASE_URL_EMULATOR = "http://10.0.2.2/piatmove-api/"
    const val BASE_URL_DEVICE   = "http://192.168.1.100/piatmove-api/" // replace with your machine's local IP
}

object UserRole {
    const val PASSENGER = "passenger"
    const val DRIVER    = "driver"
}

object UserStatus {
    const val ACTIVE   = "active"
    const val INACTIVE = "inactive"
}

object DriverApprovalStatus {
    const val PENDING  = "pending"
    const val APPROVED = "approved"
    const val REJECTED = "rejected"
}

// Matches bookings.status ENUM in piatmove DB
// Lifecycle: pending → accepted → started → completed
//                    ↘ rejected
//            pending ↘ cancelled
object BookingStatus {
    const val PENDING   = "pending"
    const val ACCEPTED  = "accepted"
    const val REJECTED  = "rejected"
    const val STARTED   = "started"
    const val COMPLETED = "completed"
    const val CANCELLED = "cancelled"

    fun isTerminal(status: String) =
        status == COMPLETED || status == CANCELLED || status == REJECTED
}
