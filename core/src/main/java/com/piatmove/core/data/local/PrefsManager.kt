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
    private const val KEY_PHONE      = "user_phone"
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

    fun saveLoginData(context: Context, token: String, userId: Int, role: String, name: String = "", phone: String = "") {
        getPrefs(context).edit {
            putString(KEY_TOKEN,   token)
            putInt(KEY_USER_ID,    userId)
            putString(KEY_ROLE,    role)
            putString(KEY_NAME,    name)
            putString(KEY_PHONE,   phone)
        }
    }

    fun clearAll(context: Context) {
        getPrefs(context).edit { clear() }
    }

    // ── Getters ───────────────────────────────────────────────────────────────

    fun getJwtToken(context: Context): String?  = getPrefs(context).getString(KEY_TOKEN, null)
    fun getUserId(context: Context): Int        = getPrefs(context).getInt(KEY_USER_ID, -1)
    fun getUserRole(context: Context): String?  = getPrefs(context).getString(KEY_ROLE, null)
    fun getUserName(context: Context): String?  = getPrefs(context).getString(KEY_NAME, null)
    fun getUserPhone(context: Context): String? = getPrefs(context).getString(KEY_PHONE, null)
    fun isLoggedIn(context: Context): Boolean   = getJwtToken(context) != null

    // ── FCM Token ─────────────────────────────────────────────────────────────

    fun saveFcmToken(context: Context, token: String) {
        getPrefs(context).edit { putString(KEY_FCM, token) }
    }

    fun getFcmToken(context: Context): String? = getPrefs(context).getString(KEY_FCM, null)

    // ── Server URL (plain prefs — not sensitive) ──────────────────────────────

    fun getServerUrl(context: Context): String =
        context.getSharedPreferences(DEV_PREFS_NAME, Context.MODE_PRIVATE)
            .getString(KEY_SERVER_URL, null)
            ?: Constants.BASE_URL_DEVICE

    fun saveServerUrl(context: Context, url: String) {
        context.getSharedPreferences(DEV_PREFS_NAME, Context.MODE_PRIVATE)
            .edit { putString(KEY_SERVER_URL, url) }
    }
}
