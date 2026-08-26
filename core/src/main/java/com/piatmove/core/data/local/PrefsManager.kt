package com.piatmove.core.data.local

import android.content.Context
import android.content.SharedPreferences
import androidx.core.content.edit
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.piatmove.core.utils.Constants

object PrefsManager {

    private const val PREFS_NAME     = "piatmove_prefs"
    private const val DEV_PREFS_NAME = "piatmove_dev_prefs"

    private const val KEY_TOKEN      = "jwt_token"
    private const val KEY_USER_ID    = "user_id"
    private const val KEY_ROLE       = "user_role"
    private const val KEY_NAME       = "user_name"
    private const val KEY_EMAIL      = "user_email"
    private const val KEY_PHONE      = "user_phone"
    private const val KEY_PHOTO_PATH = "user_photo_path"
    private const val KEY_APPROVAL   = "approval_status"
    private const val KEY_FCM        = "fcm_token"
    private const val KEY_SERVER_URL = "server_url"

    private fun getPrefs(context: Context): SharedPreferences {
        return try {
            val masterKey = MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()
            EncryptedSharedPreferences.create(
                context,
                PREFS_NAME,
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )
        } catch (e: Exception) {
            context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        }
    }

    // ── Login / Logout ────────────────────────────────────────────────────────

    fun saveLoginData(
        context: Context,
        token: String,
        userId: Int,
        role: String,
        name: String = "",
        phone: String = "",
        email: String = "",
        photoPath: String? = null,
        approvalStatus: String = "approved"
    ) {
        getPrefs(context).edit {
            putString(KEY_TOKEN,      token)
            putInt(KEY_USER_ID,       userId)
            putString(KEY_ROLE,       role)
            putString(KEY_NAME,       name)
            putString(KEY_PHONE,      phone)
            putString(KEY_EMAIL,      email)
            putString(KEY_PHOTO_PATH, photoPath)
            putString(KEY_APPROVAL,   approvalStatus)
        }
    }

    fun saveUserProfile(context: Context, name: String, phone: String, email: String? = null, photoPath: String? = null) {
        getPrefs(context).edit {
            putString(KEY_NAME, name)
            putString(KEY_PHONE, phone)
            if (email != null) putString(KEY_EMAIL, email)
            if (photoPath != null) putString(KEY_PHOTO_PATH, photoPath)
        }
    }

    fun saveDriverApprovalStatus(context: Context, status: String) {
        getPrefs(context).edit { putString(KEY_APPROVAL, status) }
    }

    fun clearAll(context: Context) {
        getPrefs(context).edit { clear() }
    }

    // ── Getters ───────────────────────────────────────────────────────────────

    fun getJwtToken(context: Context): String?             = getPrefs(context).getString(KEY_TOKEN, null)
    fun getUserId(context: Context): Int                   = getPrefs(context).getInt(KEY_USER_ID, -1)
    fun getUserRole(context: Context): String?             = getPrefs(context).getString(KEY_ROLE, null)
    fun getUserName(context: Context): String?             = getPrefs(context).getString(KEY_NAME, null)
    fun getUserEmail(context: Context): String?            = getPrefs(context).getString(KEY_EMAIL, null)
    fun getUserPhone(context: Context): String?            = getPrefs(context).getString(KEY_PHONE, null)
    fun getUserPhotoPath(context: Context): String?        = getPrefs(context).getString(KEY_PHOTO_PATH, null)
    fun getDriverApprovalStatus(context: Context): String  = getPrefs(context).getString(KEY_APPROVAL, "pending") ?: "pending"
    fun isLoggedIn(context: Context): Boolean              = getJwtToken(context) != null

    fun getFullPhotoUrl(context: Context, photoPath: String?): String? {
        if (photoPath.isNullOrBlank()) return null
        if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) return photoPath
        val serverBase = getServerUrl(context).trimEnd('/')
        val cleanPath  = photoPath.trimStart('/')
        val domainRoot = if (serverBase.endsWith("/api")) serverBase.removeSuffix("/api") else serverBase

        return if (cleanPath.startsWith("api/") || cleanPath.startsWith("admin/")) {
            "$domainRoot/$cleanPath"
        } else {
            // Direct API upload path
            "$serverBase/$cleanPath"
        }
    }

    fun getFallbackPhotoUrl(context: Context, photoPath: String?): String? {
        if (photoPath.isNullOrBlank()) return null
        if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) return null
        val serverBase = getServerUrl(context).trimEnd('/')
        val cleanPath  = photoPath.trimStart('/')
        val domainRoot = if (serverBase.endsWith("/api")) serverBase.removeSuffix("/api") else serverBase
        return "$domainRoot/admin/$cleanPath"
    }

    // ── FCM Token ─────────────────────────────────────────────────────────────

    fun saveFcmToken(context: Context, token: String) {
        getPrefs(context).edit { putString(KEY_FCM, token) }
    }

    fun getFcmToken(context: Context): String? = getPrefs(context).getString(KEY_FCM, null)

    // ── Server URL (plain prefs — not sensitive) ──────────────────────────────

    fun getServerUrl(context: Context): String {
        val saved = context.getSharedPreferences(DEV_PREFS_NAME, Context.MODE_PRIVATE)
            .getString(KEY_SERVER_URL, null)

        if (saved.isNullOrBlank()) {
            return Constants.BASE_URL_PRODUCTION
        }
        return if (!saved.endsWith("/")) "$saved/" else saved
    }

    fun saveServerUrl(context: Context, url: String) {
        val cleanUrl = if (url.isNotBlank() && !url.endsWith("/")) "$url/" else url
        context.getSharedPreferences(DEV_PREFS_NAME, Context.MODE_PRIVATE)
            .edit { putString(KEY_SERVER_URL, cleanUrl) }
        com.piatmove.core.data.api.ApiClient.reset()
    }

    fun clearServerUrl(context: Context) {
        context.getSharedPreferences(DEV_PREFS_NAME, Context.MODE_PRIVATE)
            .edit { remove(KEY_SERVER_URL) }
        com.piatmove.core.data.api.ApiClient.reset()
    }
}

