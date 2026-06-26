package com.piatmove.core.data.models

// Status lifecycle (matches bookings.status ENUM):
//   pending → accepted → started → completed
//           ↘ rejected
//   pending ↘ cancelled
data class Booking(
    val id: Int,
    val passenger_id: Int,
    val driver_id: Int?,
    val pickup_address: String,
    val pickup_lat: Double,
    val pickup_lng: Double,
    val dropoff_address: String,
    val dropoff_lat: Double,
    val dropoff_lng: Double,
    val status: String,
    val fare: Double?,
    val created_at: String,
    val updated_at: String?,
    // Joined fields (present on some endpoints)
    val passenger_name: String?  = null,
    val passenger_phone: String? = null,
    val driver_name: String?     = null,
    val driver_phone: String?    = null
)

data class BookingRequest(
    val pickup_address: String,
    val pickup_lat: Double,
    val pickup_lng: Double,
    val dropoff_address: String,
    val dropoff_lat: Double,
    val dropoff_lng: Double
)

data class CreateBookingResponse(
    val booking_id: Int
)
