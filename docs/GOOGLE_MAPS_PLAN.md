# 🗺️ PiatMove: Google Maps Integration & Grab-Style Pinning Plan

> **Goal:** Transform PiatMove's booking flow into a modern, interactive Grab-style map experience where passengers visually pin pickup and destination locations, with auto-address geocoding, and set the foundation for live moving tricycle tracking.

---

## 📋 Master Task Checklists

### 🔑 Phase 0: Google Cloud Setup & API Key Configuration
- [x] **Step 0.1:** Open [Google Cloud Console](https://console.cloud.google.com/) and create/select project `PiatMove`.
- [x] **Step 0.2:** Navigate to **APIs & Services** → **Library** → Search & **Enable "Maps SDK for Android"**.
- [x] **Step 0.3:** Go to **Credentials** → **Create Credentials** → **API Key** (copy the generated key).
- [x] **Step 0.4:** Store the API key safely in `local.properties` (`MAPS_API_KEY=AIza...`).
- [x] **Step 0.5:** Update `app-passenger/build.gradle.kts` to inject `MAPS_API_KEY` into `AndroidManifest.xml` via `manifestPlaceholders`.
- [x] **Step 0.6:** Add `<meta-data android:name="com.google.android.geo.API_KEY" .../>` to `app-passenger/src/main/AndroidManifest.xml`.
- [x] **Step 0.7:** Test map initialization & compilation (`BUILD SUCCESSFUL`).

---

### 📍 Phase 1: Grab-Style Interactive Map Pinning (Booking Screen)
- [x] **Step 1.1: UI Redesign (`activity_book_ride.xml`)**
  - [x] Embed `SupportMapFragment` occupying the main view.
  - [x] Add stationary center pin icon (floating target pin) in the middle of the map.
  - [x] Add "My Location" GPS Floating Action Button (FAB).
  - [x] Design Grab-style bottom sheet/card with:
    - Selected Pickup and Dropoff address display cards.
    - Toggle chips/buttons ("1. Pin Pickup" vs "2. Pin Dropoff").
    - Passenger counter (1 to 5) & 20% statutory discount selectors.
    - Regulated fare display (₱20 base / ₱16 discount).
    - "Request Tricycle Ride" primary button.
- [x] **Step 1.2: Map Controller Logic (`BookRideActivity.kt`)**
  - [x] Initialize `GoogleMap` and center camera on Piat, Cagayan coordinates (`17.7887, 121.4673`, zoom level 15.5f).
  - [x] Request runtime location permissions (`ACCESS_FINE_LOCATION`) and enable `isMyLocationEnabled`.
  - [x] Hook `setOnCameraMoveStartedListener` to animate the center pin lifting up.
  - [x] Hook `setOnCameraIdleListener` to read the center coordinates when panning stops and animate pin drop.
  - [x] Implement reverse geocoding via Android native `android.location.Geocoder` to auto-fill street and barangay names.
  - [x] Add marker confirmation: once Pickup is confirmed, place a fixed green marker 📍 and switch to Dropoff mode.
  - [x] Connect final coordinates and addresses to `viewModel.createBooking(request)`.
- [x] **Step 1.3: Build & Validation**
  - [x] Compile debug APK via `./gradlew.bat assembleDebug` (`BUILD SUCCESSFUL`).
  - [x] Verify address geocoding accuracy in Piat, Cagayan.
  - [x] Verify booking payload creation with valid latitude/longitude submitted to production backend.

---

### 🛵 Driver App Map Integration (Completed)
- [x] **Step D.1:** Injected `MAPS_API_KEY` into `app-driver/build.gradle.kts` and `app-driver/src/main/AndroidManifest.xml`.
- [x] **Step D.2:** Added interactive map preview in `RideRequestActivity` with passenger Pickup (Azure) and Dropoff (Red) pins so drivers can visually inspect the route before accepting.
- [x] **Step D.3:** Added interactive route map in `ActiveRideActivity` with one-tap "Open in Google Maps Navigation" turn-by-turn navigation shortcut to guide the driver directly to the passenger's pickup location.
- [x] **Step D.4:** Driver debug APK compiled cleanly (`BUILD SUCCESSFUL in 33s`).

---

### 🛺 Phase 2: Live Tracking & Moving Tricycle Icon (Completed)
- [x] **Step 2.1:** Created custom top-down Philippine tricycle vector asset (`ic_tricycle_marker.xml`).
- [x] **Step 2.2:** Added `SupportMapFragment` to `RideStatusActivity.kt` & `activity_ride_status.xml`.
- [x] **Step 2.3:** Plotted passenger pickup (Azure) and dropoff (Red) markers on the live map with a legend.
- [x] **Step 2.4:** Implemented continuous driver GPS location broadcasting in `ActiveRideActivity.kt` (`PUT /driver/location`).
- [x] **Step 2.5:** Implemented marker animation with bearing heading rotation and linear coordinate interpolation so the tricycle smoothly drives along the road towards the passenger.
- [x] **Step 2.6:** Successfully compiled both APKs (`BUILD SUCCESSFUL in 13s`).

---

## 🛠️ Detailed Step-by-Step Guide for Phase 0 (Google Cloud Key)

Follow these exact steps to obtain and configure your Google Maps Android API Key:

```
Step 1: Go to https://console.cloud.google.com/
Step 2: Sign in with your Google account.
Step 3: Click the Project dropdown (top-left) → "New Project" → Name: "PiatMove" → Click "Create".
Step 4: In the search bar at the top, type "Maps SDK for Android" and select it.
Step 5: Click the blue "ENABLE" button.
Step 6: In the left navigation menu, go to "APIs & Services" → "Credentials".
Step 7: Click "+ CREATE CREDENTIALS" at the top → select "API key".
Step 8: A dialog will pop up showing: "Your API key: AIzaSy...". Copy this key!
```

### Securing and Adding Key to Project (No Git Leaks)

1. Open `local.properties` in your project root:
   ```properties
   sdk.dir=C\:\\Users\\GLENN\\AppData\\Local\\Android\\Sdk
   MAPS_API_KEY=AIzaSyYourActualKeyHere
   ```
2. In `app-passenger/build.gradle.kts`, read it from `local.properties`:
   ```kotlin
   val localProperties = java.util.Properties().apply {
       val localPropertiesFile = rootProject.file("local.properties")
       if (localPropertiesFile.exists()) {
           load(localPropertiesFile.inputStream())
       }
   }
   val mapsApiKey: String = localProperties.getProperty("MAPS_API_KEY") ?: ""

   android {
       defaultConfig {
           manifestPlaceholders["MAPS_API_KEY"] = mapsApiKey
       }
   }
   ```
3. In `app-passenger/src/main/AndroidManifest.xml`, reference the placeholder inside `<application>`:
   ```xml
   <meta-data
       android:name="com.google.android.geo.API_KEY"
       android:value="${MAPS_API_KEY}" />
   ```

---

## 🎨 UI/UX Architecture: The Grab Pinning Experience

```
+-------------------------------------------------------+
|  <- Book a Ride               [ 🎯 GPS My Location ]  |
|                                                       |
|                                                       |
|                     [ 📍 PIN ]                        |
|                  (Fixed in Center)                    |
|                                                       |
|                ~ Interactive Map ~                    |
|                                                       |
+-------------------------------------------------------+
|  [ 🟢 Pickup: Piat Public Market                    ] |
|  [ 🔴 Dropoff: Piat Municipal Hall                  ] |
| ----------------------------------------------------- |
|  👥 Passengers: [ - ]  1  [ + ]   🏷️ 20% Discount    |
|  Estimated Regulated Fare: ₱20.00                     |
|                                                       |
|  [         REQUEST TRICYCLE RIDE (₱20.00)           ] |
+-------------------------------------------------------+
```
