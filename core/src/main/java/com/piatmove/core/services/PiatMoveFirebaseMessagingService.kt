package com.piatmove.core.services

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.piatmove.core.data.api.ApiClient
import com.piatmove.core.data.local.PrefsManager
import com.piatmove.core.data.models.FcmTokenRequest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PiatMoveFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        PrefsManager.saveFcmToken(applicationContext, token)

        if (PrefsManager.isLoggedIn(applicationContext)) {
            CoroutineScope(Dispatchers.IO).launch {
                try { ApiClient.instance.updateFcmToken(FcmTokenRequest(token)) }
                catch (_: Exception) {}
            }
        }
    }

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)

        val title     = message.notification?.title ?: message.data["title"] ?: "PiatMove"
        val body      = message.notification?.body  ?: message.data["body"]  ?: ""
        val bookingId = message.data["booking_id"]?.toIntOrNull()

        showNotification(title, body, bookingId)
    }

    private fun showNotification(title: String, body: String, bookingId: Int? = null) {
        val channelId = "piatmove_channel"
        val manager   = getSystemService(NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            manager.createNotificationChannel(
                NotificationChannel(channelId, "PiatMove Notifications", NotificationManager.IMPORTANCE_HIGH)
            )
        }

        // Launch the app's launcher activity on tap — each app module registers its own launcher
        val launchIntent = packageManager.getLaunchIntentForPackage(packageName)?.apply {
            bookingId?.let { putExtra("booking_id", it) }
            addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK or android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP)
        }

        val pendingIntent = launchIntent?.let {
            PendingIntent.getActivity(
                this,
                System.currentTimeMillis().toInt(),
                it,
                PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
            )
        }

        val notification = NotificationCompat.Builder(this, channelId)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .apply { pendingIntent?.let { setContentIntent(it) } }
            .build()

        manager.notify(System.currentTimeMillis().toInt(), notification)
    }
}
