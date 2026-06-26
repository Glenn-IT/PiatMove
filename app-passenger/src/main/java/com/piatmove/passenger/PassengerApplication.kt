package com.piatmove.passenger

import android.app.Application
import com.piatmove.core.data.api.ApiClient

class PassengerApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        ApiClient.init(this)
    }
}
