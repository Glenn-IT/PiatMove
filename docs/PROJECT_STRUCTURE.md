# PiatMove — Target Project Structure

## Overview

PiatMove follows a **multi-module Android Studio project** design — one project, one `settings.gradle.kts`, two APKs — plus a separate PHP web admin panel.

| Module / System | Type | Audience |
|---|---|---|
| `:core` | Android Library module | Shared by both apps |
| `:app-passenger` | Android App module | Passengers booking rides |
| `:app-driver` | Android App module | Drivers accepting rides |
| `PiatMoveAdmin/` | PHP Web App (separate) | Admin managing users, drivers, bookings |

---

## Full Directory Tree

```
PiatMove/                                       ← Android Studio root
├── settings.gradle.kts                         ← Declares :core, :app-passenger, :app-driver
├── build.gradle.kts                            ← Root-level build config
├── gradle/
│   └── libs.versions.toml                      ← Single version catalog for all modules
│
├── core/                                       ← :core Android Library module
│   └── src/main/java/com/piatmove/core/
│       ├── data/
│       │   ├── api/
│       │   │   ├── ApiClient.kt
│       │   │   ├── ApiService.kt
│       │   │   └── ApiResponse.kt
│       │   ├── models/
│       │   │   ├── User.kt
│       │   │   ├── AuthModels.kt
│       │   │   ├── Booking.kt
│       │   │   ├── DriverModels.kt
│       │   │   └── FcmModels.kt
│       │   ├── repository/
│       │   │   ├── BaseRepository.kt
│       │   │   ├── AuthRepository.kt
│       │   │   ├── UserRepository.kt
│       │   │   └── BookingRepository.kt
│       │   └── local/
│       │       └── PrefsManager.kt
│       ├── services/
│       │   └── PiatMoveFirebaseMessagingService.kt
│       └── utils/
│           ├── Constants.kt
│           └── Resource.kt
│
├── app-passenger/                              ← :app-passenger Android App module
│   ├── build.gradle.kts
│   ├── google-services.json                    ← Registered under com.piatmove.passenger
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/piatmove/passenger/
│       │   ├── PassengerApplication.kt
│       │   └── ui/
│       │       ├── auth/
│       │       │   ├── LoginActivity.kt
│       │       │   ├── RegisterActivity.kt
│       │       │   └── AuthViewModel.kt
│       │       ├── home/
│       │       │   ├── PassengerHomeActivity.kt
│       │       │   └── PassengerViewModel.kt
│       │       ├── booking/
│       │       │   ├── BookRideActivity.kt
│       │       │   └── RideStatusActivity.kt
│       │       ├── history/
│       │       │   └── RideHistoryFragment.kt
│       │       └── theme/
│       │           ├── Theme.kt
│       │           ├── Color.kt
│       │           └── Type.kt
│       └── res/
│           └── layout/
│               ├── activity_login.xml
│               ├── activity_register.xml
│               ├── activity_passenger_home.xml
│               ├── activity_book_ride.xml
│               ├── activity_ride_status.xml
│               ├── fragment_ride_history.xml
│               └── item_booking_history.xml
│
├── app-driver/                                 ← :app-driver Android App module
│   ├── build.gradle.kts
│   ├── google-services.json                    ← Registered under com.piatmove.driver
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/piatmove/driver/
│       │   ├── DriverApplication.kt
│       │   └── ui/
│       │       ├── auth/
│       │       │   ├── LoginActivity.kt
│       │       │   ├── RegisterActivity.kt
│       │       │   └── AuthViewModel.kt
│       │       ├── home/
│       │       │   ├── DriverHomeActivity.kt
│       │       │   └── DriverViewModel.kt
│       │       ├── dashboard/
│       │       │   └── DriverDashboardFragment.kt
│       │       ├── requests/
│       │       │   ├── DriverRequestsFragment.kt
│       │       │   ├── RideRequestActivity.kt
│       │       │   └── RideRequestsAdapter.kt
│       │       ├── status/
│       │       │   └── DriverStatusFragment.kt
│       │       ├── ride/
│       │       │   └── ActiveRideActivity.kt
│       │       └── theme/
│       │           ├── Theme.kt
│       │           ├── Color.kt
│       │           └── Type.kt
│       └── res/
│           └── layout/
│               ├── activity_login.xml
│               ├── activity_register.xml
│               ├── activity_driver_home.xml
│               ├── activity_ride_request.xml
│               ├── activity_active_ride.xml
│               ├── fragment_driver_dashboard.xml
│               ├── fragment_driver_requests.xml
│               ├── fragment_driver_status.xml
│               └── item_ride_request.xml
│
├── app/                                        ← Original blank scaffold (remove after setup)
└── docs/
    ├── Prompt.md
    ├── PROJECT_STRUCTURE.md                    ← this file
    └── PLAN.md
```

---

## PHP Admin Panel (Separate)

Lives in XAMPP's `htdocs/` — not part of the Android Studio project.

```
htdocs/PiatMoveAdmin/
├── config.php
├── index.php                   ← Admin login
├── dashboard.php               ← Overview stats
├── users.php                   ← Manage passengers
├── drivers.php                 ← Approve/reject drivers
├── bookings.php                ← All bookings
├── includes/
│   ├── auth.php
│   ├── db.php
│   ├── header.php
│   └── footer.php
└── assets/
    ├── css/admin.css
    └── js/admin.js
```

---

## Package Names

| Module | Package |
|---|---|
| `:core` | `com.piatmove.core` |
| `:app-passenger` | `com.piatmove.passenger` |
| `:app-driver` | `com.piatmove.driver` |

---

## Gradle Configuration

### `settings.gradle.kts`
```kotlin
rootProject.name = "PiatMove"

include(":core")
include(":app-passenger")
include(":app-driver")
// include(":app")  ← comment out original once migration is done
```

### `core/build.gradle.kts`
```kotlin
plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.piatmove.core"
    compileSdk = 36
    defaultConfig { minSdk = 24 }
}

dependencies {
    implementation(libs.retrofit)
    implementation(libs.retrofit.gson)
    implementation(libs.okhttp.logging)
    implementation(platform(libs.firebase.bom))
    implementation(libs.firebase.messaging)
    implementation(libs.lifecycle.viewmodel)
    implementation(libs.lifecycle.livedata)
    implementation(libs.coroutines.android)
    implementation(libs.security.crypto)
    implementation(libs.gson)
}
```

### `app-passenger/build.gradle.kts`
```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.google.services)
}

android {
    namespace = "com.piatmove.passenger"
    compileSdk = 36
    defaultConfig {
        applicationId = "com.piatmove.passenger"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }
}

dependencies {
    implementation(project(":core"))
    implementation(libs.material)
    implementation(libs.recyclerview)
    implementation(libs.viewpager2)
    implementation(libs.appcompat)
    implementation(libs.play.services.maps)
    implementation(libs.play.services.location)
    implementation(libs.firebase.analytics)
}
```

### `app-driver/build.gradle.kts`
```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.google.services)
}

android {
    namespace = "com.piatmove.driver"
    compileSdk = 36
    defaultConfig {
        applicationId = "com.piatmove.driver"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }
}

dependencies {
    implementation(project(":core"))
    implementation(libs.material)
    implementation(libs.recyclerview)
    implementation(libs.viewpager2)
    implementation(libs.appcompat)
    implementation(libs.play.services.maps)
    implementation(libs.play.services.location)
    implementation(libs.firebase.analytics)
}
```

---

## Android Studio Run Configurations

| Config name | Module | Output |
|---|---|---|
| `app-passenger` | `:app-passenger` | Passenger APK |
| `app-driver` | `:app-driver` | Driver APK |

---

## Firebase

One Firebase project for both apps. Each app gets its own `google-services.json` registered under separate package names.

**FCM notifications — Passenger app receives:**
- `BOOKING_ACCEPTED` — Driver accepted the ride
- `BOOKING_REJECTED` — Driver rejected the ride
- `DRIVER_ARRIVING` — Driver is near pickup point

**FCM notifications — Driver app receives:**
- `NEW_RIDE_REQUEST` — New passenger booking available
- `BOOKING_CANCELLED` — Passenger cancelled before driver arrived

---

*Created: 2026-06-26*
