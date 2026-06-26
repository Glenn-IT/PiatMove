package com.piatmove.passenger.ui.auth

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.piatmove.core.data.api.ApiClient
import com.piatmove.core.data.models.LoginRequest
import com.piatmove.core.data.models.LoginResponse
import com.piatmove.core.data.models.RegisterRequest
import com.piatmove.core.data.models.RegisterResponse
import com.piatmove.core.data.repository.AuthRepository
import com.piatmove.core.utils.Resource
import kotlinx.coroutines.launch

class AuthViewModel(application: Application) : AndroidViewModel(application) {

    private val repo = AuthRepository(ApiClient.instance, application)

    private val _loginState = MutableLiveData<Resource<LoginResponse>>()
    val loginState: LiveData<Resource<LoginResponse>> = _loginState

    fun login(email: String, password: String) {
        _loginState.value = Resource.Loading
        viewModelScope.launch {
            _loginState.value = repo.login(LoginRequest(email, password))
        }
    }

    private val _registerState = MutableLiveData<Resource<RegisterResponse>>()
    val registerState: LiveData<Resource<RegisterResponse>> = _registerState

    fun register(name: String, email: String, password: String, phone: String) {
        _registerState.value = Resource.Loading
        viewModelScope.launch {
            _registerState.value = repo.register(
                RegisterRequest(
                    name     = name,
                    email    = email,
                    password = password,
                    phone    = phone,
                    role     = "passenger"
                )
            )
        }
    }

    fun logout() = repo.logout()
}
