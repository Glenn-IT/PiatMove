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

    val approvalStatus = MutableLiveData(com.piatmove.core.data.local.PrefsManager.getDriverApprovalStatus(application))
    val isOnline = MutableLiveData(false)
    val statusError = MutableLiveData<String?>()

    private val _requests = MutableLiveData<Resource<List<Booking>>>()
    val requests: LiveData<Resource<List<Booking>>> = _requests

    private val _activeBooking = MutableLiveData<Resource<Booking?>>()
    val activeBooking: LiveData<Resource<Booking?>> = _activeBooking

    private val _actionState = MutableLiveData<Resource<Unit>>()
    val actionState: LiveData<Resource<Unit>> = _actionState

    fun checkDriverStatus() {
        viewModelScope.launch {
            when (val result = repo.getDriverStatus()) {
                is Resource.Success -> {
                    val status = result.data?.approval_status ?: "pending"
                    val online = result.data?.is_online ?: false
                    approvalStatus.value = status
                    isOnline.value = online
                    com.piatmove.core.data.local.PrefsManager.saveDriverApprovalStatus(getApplication(), status)
                }
                is Resource.Error -> {
                    approvalStatus.value = com.piatmove.core.data.local.PrefsManager.getDriverApprovalStatus(getApplication())
                }
                Resource.Loading -> {}
            }
        }
    }

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
        val currentApproval = approvalStatus.value ?: com.piatmove.core.data.local.PrefsManager.getDriverApprovalStatus(getApplication())
        if (online && currentApproval != "approved") {
            isOnline.value = false
            statusError.value = "Cannot go online: your account is pending admin approval."
            return
        }

        viewModelScope.launch {
            when (val result = repo.updateDriverStatus(online)) {
                is Resource.Success -> {
                    isOnline.value = result.data?.is_online ?: online
                    val newApproval = result.data?.approval_status ?: currentApproval
                    approvalStatus.value = newApproval
                    com.piatmove.core.data.local.PrefsManager.saveDriverApprovalStatus(getApplication(), newApproval)
                }
                is Resource.Error -> {
                    isOnline.value = false
                    statusError.value = result.message
                }
                Resource.Loading -> {}
            }
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
