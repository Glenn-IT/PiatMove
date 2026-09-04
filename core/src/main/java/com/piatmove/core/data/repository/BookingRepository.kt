package com.piatmove.core.data.repository

import com.piatmove.core.data.api.ApiService
import com.piatmove.core.data.models.Booking
import com.piatmove.core.data.models.BookingRequest
import com.piatmove.core.data.models.DriverDailyReport
import com.piatmove.core.data.models.DriverProfile
import com.piatmove.core.data.models.DriverStatusResponse
import com.piatmove.core.data.models.UpdateDriverProfileRequest
import com.piatmove.core.data.models.UpdateDriverStatusRequest
import com.piatmove.core.data.models.UpdateLocationRequest
import com.piatmove.core.utils.Resource

class BookingRepository(
    private val apiOverride: ApiService? = null
) : BaseRepository() {

    private val api: ApiService
        get() = apiOverride ?: com.piatmove.core.data.api.ApiClient.instance


    // ── Passenger ─────────────────────────────────────────────────────────────

    suspend fun createBooking(request: BookingRequest): Resource<Int> {
        return try {
            val response = api.createBooking(request)
            if (response.success && response.data != null) {
                Resource.Success(response.data.booking_id)
            } else {
                Resource.Error(response.message)
            }
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getBookings(): Resource<List<Booking>> {
        return try {
            val response = api.getBookings()
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getBookingById(id: Int): Resource<Booking> {
        return try {
            val response = api.getBookingById(id)
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getPassengerHistory(): Resource<List<Booking>> {
        return try {
            val response = api.getPassengerHistory()
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun cancelBooking(bookingId: Int): Resource<Unit> {
        return try {
            val response = api.cancelBooking(bookingId)
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    // ── Driver ────────────────────────────────────────────────────────────────

    suspend fun getDriverRequests(): Resource<List<Booking>> {
        return try {
            val response = api.getDriverRequests()
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getDriverHistory(): Resource<List<Booking>> {
        return try {
            val response = api.getDriverHistory()
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getDriverDailyReport(date: String? = null): Resource<DriverDailyReport> {
        return try {
            val response = api.getDriverDailyReport(date)
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getDriverTrips(status: String? = null): Resource<List<Booking>> {
        return try {
            val response = api.getDriverTrips(status)
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun acceptRide(bookingId: Int): Resource<Unit> {
        return try {
            val response = api.acceptRide(bookingId)
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun rejectRide(bookingId: Int): Resource<Unit> {
        return try {
            val response = api.rejectRide(bookingId)
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun cancelDriverRide(bookingId: Int): Resource<Unit> {
        return try {
            val response = api.cancelDriverRide(bookingId)
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun startRide(bookingId: Int): Resource<Unit> {
        return try {
            val response = api.startRide(bookingId)
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun completeRide(bookingId: Int): Resource<Unit> {
        return try {
            val response = api.completeRide(bookingId)
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun updateLocation(lat: Double, lng: Double): Resource<Unit> {
        return try {
            val response = api.updateLocation(UpdateLocationRequest(lat, lng))
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getDriverStatus(): Resource<DriverStatusResponse> {
        return try {
            val response = api.getDriverStatus()
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun getDriverProfile(): Resource<DriverProfile> {
        return try {
            val response = api.getDriverProfile()
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun updateDriverProfile(request: UpdateDriverProfileRequest): Resource<Unit> {
        return try {
            val response = api.updateDriverProfile(request)
            if (response.success) Resource.Success(Unit)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }

    suspend fun updateDriverStatus(isOnline: Boolean): Resource<DriverStatusResponse> {
        return try {
            val response = api.updateDriverStatus(UpdateDriverStatusRequest(isOnline))
            if (response.success && response.data != null) Resource.Success(response.data)
            else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }
}
