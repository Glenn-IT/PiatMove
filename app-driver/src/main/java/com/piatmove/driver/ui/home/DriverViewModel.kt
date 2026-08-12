package com.piatmove.driver.ui.home

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.piatmove.core.data.api.ApiClient
import com.piatmove.core.data.models.Booking
import com.piatmove.core.data.repository.BookingRepository
import com.piatmove.core.utils.BookingStatus
import com.piatmove.core.utils.Resource
import kotlinx.coroutines.launch

class DriverViewModel(application: Application) : AndroidViewModel(application) {

    private val repo = BookingRepository(ApiClient.instance)

    val isOnline = MutableLiveData(false)

    private val _requests = MutableLiveData<Resource<List<Booking>>>()
    val requests: LiveData<Resource<List<Booking>>> = _requests

    private val _activeBooking = MutableLiveData<Resource<Booking?>>()
    val activeBooking: LiveData<Resource<Booking?>> = _activeBooking

    private val _actionState = MutableLiveData<Resource<Unit>>()
    val actionState: LiveData<Resource<Unit>> = _actionState

    fun loadRequests() {
        _requests.value = Resource.Loading
        viewModelScope.launch {
            _requests.value = repo.getDriverRequests()
        }
    }

    fun loadActiveBooking() {
        _activeBooking.value = Resource.Loading
        viewModelScope.launch {
            val result = repo.getBookings()
            _activeBooking.value = when (result) {
                is Resource.Success -> {
                    val active = result.data?.firstOrNull {
                        it.status == BookingStatus.ACCEPTED || it.status == BookingStatus.STARTED
                    }
                    Resource.Success(active)
                }
                is Resource.Error   -> Resource.Error(result.message)
                Resource.Loading    -> Resource.Loading
            }
        }
    }

    fun toggleOnline(online: Boolean) {
        viewModelScope.launch {
            repo.updateDriverStatus(online)
            isOnline.value = online
        }
    }

    fun acceptRide(bookingId: Int) {
        _actionState.value = Resource.Loading
        viewModelScope.launch { _actionState.value = repo.acceptRide(bookingId) }
    }

    fun rejectRide(bookingId: Int) {
        _actionState.value = Resource.Loading
        viewModelScope.launch { _actionState.value = repo.rejectRide(bookingId) }
    }

    fun startRide(bookingId: Int) {
        _actionState.value = Resource.Loading
        viewModelScope.launch { _actionState.value = repo.startRide(bookingId) }
    }

    fun completeRide(bookingId: Int) {
        _actionState.value = Resource.Loading
        viewModelScope.launch { _actionState.value = repo.completeRide(bookingId) }
    }
}
