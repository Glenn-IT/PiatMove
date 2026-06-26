package com.piatmove.core.data.api

import android.content.Context
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.utils.Constants
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiClient {

    private lateinit var appContext: Context

    fun init(context: Context) {
        appContext = context.applicationContext
    }

    private val authInterceptor = Interceptor { chain ->
        val token = PrefsManager.getJwtToken(appContext)
        val request = chain.request().newBuilder()
            .apply { if (token != null) addHeader("Authorization", "Bearer $token") }
            .build()

        val response = chain.proceed(request)

        if (response.code == 401) {
            PrefsManager.clearAll(appContext)
        }

        response
    }

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    private val okHttpClient by lazy {
        OkHttpClient.Builder()
            .addInterceptor(authInterceptor)
            .addInterceptor(loggingInterceptor)
            .build()
    }

    private var _currentBaseUrl: String = ""
    private var _instance: ApiService? = null

    val instance: ApiService
        get() {
            val url = PrefsManager.getServerUrl(appContext)
            if (url != _currentBaseUrl || _instance == null) {
                _currentBaseUrl = url
                _instance = Retrofit.Builder()
                    .baseUrl(url)
                    .client(okHttpClient)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                    .create(ApiService::class.java)
            }
            return _instance!!
        }
}
