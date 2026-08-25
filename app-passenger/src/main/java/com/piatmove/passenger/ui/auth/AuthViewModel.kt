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
import com.piatmove.core.data.models.UpdateProfilePhotoResponse
import com.piatmove.core.data.models.UpdateProfileRequest
import com.piatmove.core.data.models.UserProfile
import com.piatmove.core.data.repository.AuthRepository
import com.piatmove.core.utils.Resource
import java.io.File
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

    private val _profileState = MutableLiveData<Resource<UserProfile>>()
    val profileState: LiveData<Resource<UserProfile>> = _profileState

    fun fetchProfile() {
        _profileState.value = Resource.Loading
        viewModelScope.launch {
            _profileState.value = repo.getUserProfile()
        }
    }

    private val _updateProfileState = MutableLiveData<Resource<UpdateProfileRequest>>()
    val updateProfileState: LiveData<Resource<UpdateProfileRequest>> = _updateProfileState

    fun updateProfile(name: String, phone: String) {
        _updateProfileState.value = Resource.Loading
        viewModelScope.launch {
            _updateProfileState.value = repo.updateProfile(name, phone)
        }
    }

    private val _updatePhotoState = MutableLiveData<Resource<UpdateProfilePhotoResponse>>()
    val updatePhotoState: LiveData<Resource<UpdateProfilePhotoResponse>> = _updatePhotoState

    fun uploadPhoto(file: File) {
        _updatePhotoState.value = Resource.Loading
        viewModelScope.launch {
            _updatePhotoState.value = repo.uploadProfilePhoto(file)
        }
    }

    fun logout() = repo.logout()
}
