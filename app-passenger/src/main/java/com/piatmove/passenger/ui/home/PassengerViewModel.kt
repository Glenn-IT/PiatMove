package com.piatmove.passenger.ui.home

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.piatmove.core.data.api.ApiClient
import com.piatmove.core.data.models.Booking
import com.piatmove.core.data.models.BookingRequest
import com.piatmove.core.data.repository.BookingRepository
import com.piatmove.core.utils.Resource
import kotlinx.coroutines.launch

class PassengerViewModel(application: Application) : AndroidViewModel(application) {

    private val repo = BookingRepository(ApiClient.instance)

    private val _createState = MutableLiveData<Resource<Int>>()
    val createState: LiveData<Resource<Int>> = _createState

    fun createBooking(request: BookingRequest) {
        _createState.value = Resource.Loading
        viewModelScope.launch {
            _createState.value = repo.createBooking(request)
        }
    }

    private val _booking = MutableLiveData<Resource<Booking>>()
    val booking: LiveData<Resource<Booking>> = _booking

    fun fetchBooking(id: Int) {
        viewModelScope.launch {
            _booking.value = repo.getBookingById(id)
        }
    }

    private val _cancelState = MutableLiveData<Resource<Unit>>()
    val cancelState: LiveData<Resource<Unit>> = _cancelState

    fun cancelBooking(id: Int) {
        _cancelState.value = Resource.Loading
        viewModelScope.launch {
            _cancelState.value = repo.cancelBooking(id)
        }
    }

    private val _history = MutableLiveData<Resource<List<Booking>>>()
    val history: LiveData<Resource<List<Booking>>> = _history

    fun fetchHistory() {
        _history.value = Resource.Loading
        viewModelScope.launch {
            _history.value = repo.getPassengerHistory()
        }
    }
}
