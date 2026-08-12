package com.piatmove.driver

import android.app.Application
import com.piatmove.core.data.api.ApiClient

class DriverApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        ApiClient.init(this)
    }
}
