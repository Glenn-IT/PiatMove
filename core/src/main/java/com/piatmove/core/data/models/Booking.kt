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
    val passenger_count: Int = 1,
    val fare: Double? = null,
    val discount_type: String? = "regular",
    val created_at: String,
    val updated_at: String?,
    // Joined fields (present on some endpoints)
    val passenger_name: String?        = null,
    val passenger_phone: String?       = null,
    val driver_name: String?           = null,
    val driver_phone: String?          = null,
    val driver_vehicle_no: String?     = null,
    val driver_vehicle_type: String?   = null,
    val driver_lat: Double?            = null,
    val driver_lng: Double?            = null,
    val rating: Int?                   = null,
    val rating_comment: String?        = null,
    val rated_at: String?              = null
)

data class RateDriverRequest(
    val rating: Int,
    val comment: String? = null
)

data class BookingRequest(
    val pickup_address: String,
    val pickup_lat: Double,
    val pickup_lng: Double,
    val dropoff_address: String,
    val dropoff_lat: Double,
    val dropoff_lng: Double,
    val passenger_count: Int = 1,
    val fare: Double?        = null,
    val discount_type: String? = "regular"
)

data class CreateBookingResponse(
    val booking_id: Int,
    val passenger_count: Int = 1,
    val fare: Double? = null,
    val discount_type: String? = "regular"
)
