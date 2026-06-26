package com.piatmove.core.data.repository

import com.piatmove.core.data.api.ApiService
import com.piatmove.core.data.models.Booking
import com.piatmove.core.data.models.BookingRequest
import com.piatmove.core.data.models.UpdateDriverStatusRequest
import com.piatmove.core.data.models.UpdateLocationRequest
import com.piatmove.core.utils.Resource

class BookingRepository(
    private val api: ApiService
) : BaseRepository() {

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

    suspend fun updateDriverStatus(isOnline: Boolean): Resource<Unit> {
        return try {
            val response = api.updateDriverStatus(UpdateDriverStatusRequest(isOnline))
            if (response.success) Resource.Success(Unit) else Resource.Error(response.message)
        } catch (e: Exception) {
            Resource.Error(parseApiError(e))
        }
    }
}
