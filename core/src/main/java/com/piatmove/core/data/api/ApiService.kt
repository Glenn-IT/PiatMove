package com.piatmove.core.data.api

import com.piatmove.core.data.models.Booking
import com.piatmove.core.data.models.BookingRequest
import com.piatmove.core.data.models.CreateBookingResponse
import com.piatmove.core.data.models.FcmTokenRequest
import com.piatmove.core.data.models.LoginRequest
import com.piatmove.core.data.models.LoginResponse
import com.piatmove.core.data.models.PendingDriver
import com.piatmove.core.data.models.RegisterRequest
import com.piatmove.core.data.models.RegisterResponse
import com.piatmove.core.data.models.UpdateDriverStatusRequest
import com.piatmove.core.data.models.UpdateLocationRequest
import com.piatmove.core.data.models.User
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {

    // ── Auth ──────────────────────────────────────────────────────────────────

    @POST("auth/register")
    suspend fun register(@Body body: RegisterRequest): ApiResponse<RegisterResponse>

    @POST("auth/login")
    suspend fun login(@Body body: LoginRequest): ApiResponse<LoginResponse>

    // ── Bookings ──────────────────────────────────────────────────────────────

    @POST("bookings")
    suspend fun createBooking(@Body body: BookingRequest): ApiResponse<CreateBookingResponse>

    @GET("bookings")
    suspend fun getBookings(): ApiResponse<List<Booking>>

    @GET("bookings/{id}")
    suspend fun getBookingById(@Path("id") id: Int): ApiResponse<Booking>

    @POST("bookings/{id}/cancel")
    suspend fun cancelBooking(@Path("id") bookingId: Int): ApiResponse<Unit>

    // ── Passenger ─────────────────────────────────────────────────────────────

    @GET("passenger/history")
    suspend fun getPassengerHistory(): ApiResponse<List<Booking>>

    // ── Driver ────────────────────────────────────────────────────────────────

    @GET("driver/requests")
    suspend fun getDriverRequests(): ApiResponse<List<Booking>>

    @POST("driver/accept/{id}")
    suspend fun acceptRide(@Path("id") bookingId: Int): ApiResponse<Unit>

    @POST("driver/reject/{id}")
    suspend fun rejectRide(@Path("id") bookingId: Int): ApiResponse<Unit>

    @POST("driver/start/{id}")
    suspend fun startRide(@Path("id") bookingId: Int): ApiResponse<Unit>

    @POST("driver/complete/{id}")
    suspend fun completeRide(@Path("id") bookingId: Int): ApiResponse<Unit>

    @PUT("driver/location")
    suspend fun updateLocation(@Body body: UpdateLocationRequest): ApiResponse<Unit>

    @PUT("driver/status")
    suspend fun updateDriverStatus(@Body body: UpdateDriverStatusRequest): ApiResponse<Unit>

    // ── User ──────────────────────────────────────────────────────────────────

    @PUT("user/fcm-token")
    suspend fun updateFcmToken(@Body body: FcmTokenRequest): ApiResponse<Unit>

    // ── Admin ─────────────────────────────────────────────────────────────────

    @GET("admin/users")
    suspend fun getAllUsers(): ApiResponse<List<User>>

    @GET("admin/drivers/pending")
    suspend fun getPendingDrivers(): ApiResponse<List<PendingDriver>>

    @GET("admin/bookings")
    suspend fun getAllBookings(): ApiResponse<List<Booking>>

    @PUT("admin/driver/approve/{id}")
    suspend fun approveDriver(@Path("id") driverId: Int): ApiResponse<Unit>

    @PUT("admin/driver/reject/{id}")
    suspend fun rejectDriver(@Path("id") driverId: Int): ApiResponse<Unit>

    @PUT("admin/user/activate/{id}")
    suspend fun activateUser(@Path("id") userId: Int): ApiResponse<Unit>

    @PUT("admin/user/deactivate/{id}")
    suspend fun deactivateUser(@Path("id") userId: Int): ApiResponse<Unit>

    @DELETE("admin/user/{id}")
    suspend fun deleteUser(@Path("id") userId: Int): ApiResponse<Unit>
}
