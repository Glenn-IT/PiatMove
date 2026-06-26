# PiatMove — Implementation Plan

## Goal

Build PiatMove as a **multi-module Android project** from day one — no migration needed later. Start clean, structure right.

**Reference:** `MBPTODABookingApp` + `MBPTODABookingApp/docs/RESTRUCTURING_PLAN.md`

---

## Current State

Fresh Android Studio project with a single blank `app` module and package `com.example.piatmove`. No features yet — ideal time to set the structure before writing any real code.

---

## Phase 1 — Set Up Multi-Module Gradle Structure

**Goal:** Three modules recognized by Gradle. No code moved yet. Project syncs clean.

### Steps
1. Create folders at the project root:
   - `core/src/main/java/com/piatmove/core/`
   - `app-passenger/src/main/java/com/piatmove/passenger/`
   - `app-driver/src/main/java/com/piatmove/driver/`

2. Create `core/build.gradle.kts` — Android Library plugin, namespace `com.piatmove.core`

3. Create `app-passenger/build.gradle.kts` — Android Application plugin, namespace + applicationId `com.piatmove.passenger`

4. Create `app-driver/build.gradle.kts` — Android Application plugin, namespace + applicationId `com.piatmove.driver`

5. Update `settings.gradle.kts`:
   ```kotlin
   include(":core")
   include(":app-passenger")
   include(":app-driver")
   // include(":app")  ← keep commented until Phase 5
   ```

6. Add each module's `AndroidManifest.xml` (minimal — just the `<manifest>` tag for now)

7. Sync project in Android Studio — verify zero errors before continuing

**Done when:** Android Studio shows three modules in the project tree and Gradle sync passes.

---

## Phase 2 — Build `:core`

**Goal:** All shared networking, models, repositories, FCM, and utilities live in `:core`. Both app modules will depend on this.

### Files to create in `core/src/main/java/com/piatmove/core/`

| File | What it does |
|---|---|
| `data/api/ApiClient.kt` | Retrofit instance with OkHttp logging |
| `data/api/ApiService.kt` | All API endpoint definitions |
| `data/api/ApiResponse.kt` | Wrapper for API success/error |
| `data/models/User.kt` | Passenger/driver user model |
| `data/models/AuthModels.kt` | Login request/response, register request |
| `data/models/Booking.kt` | Booking model + status enum |
| `data/models/DriverModels.kt` | Driver profile, availability |
| `data/models/FcmModels.kt` | Push notification payloads |
| `data/repository/BaseRepository.kt` | Safe API call wrapper with error handling |
| `data/repository/AuthRepository.kt` | Login, register, logout |
| `data/repository/UserRepository.kt` | Get/update user profile |
| `data/repository/BookingRepository.kt` | Create, update, fetch bookings |
| `data/local/PrefsManager.kt` | EncryptedSharedPreferences: token, user role |
| `services/PiatMoveFirebaseMessagingService.kt` | FCM token refresh + notification routing |
| `utils/Constants.kt` | Base URL, shared keys |
| `utils/Resource.kt` | `sealed class Resource<T>` — Loading / Success / Error |

### Steps
1. Add dependencies to `core/build.gradle.kts` (Retrofit, OkHttp, Firebase Messaging, ViewModel, LiveData, Coroutines, SecurityCrypto, Gson)
2. Write files top-down: models → api → repositories → services → utils
3. Verify `:core` compiles on its own (`./gradlew :core:assembleDebug`)

**Done when:** `:core` builds without errors.

---

## Phase 3 — Build `:app-passenger`

**Goal:** A working Passenger APK — Login → Book a Ride → See Ride Status → View History.

### Files to create in `app-passenger/src/main/java/com/piatmove/passenger/`

| File | Screen |
|---|---|
| `PassengerApplication.kt` | App entry point, init Firebase |
| `ui/auth/LoginActivity.kt` | Login screen |
| `ui/auth/RegisterActivity.kt` | Registration screen |
| `ui/auth/AuthViewModel.kt` | Auth logic, token storage |
| `ui/home/PassengerHomeActivity.kt` | Home with bottom nav |
| `ui/home/PassengerViewModel.kt` | Load profile, ride state |
| `ui/booking/BookRideActivity.kt` | Select pickup/dropoff, confirm ride |
| `ui/booking/RideStatusActivity.kt` | Live status: searching → accepted → arriving |
| `ui/history/RideHistoryFragment.kt` | Past bookings list |
| `ui/theme/Theme.kt` + `Color.kt` + `Type.kt` | Passenger branding |

### Layouts to create in `app-passenger/src/main/res/layout/`
- `activity_login.xml`
- `activity_register.xml`
- `activity_passenger_home.xml`
- `activity_book_ride.xml`
- `activity_ride_status.xml`
- `fragment_ride_history.xml`
- `item_booking_history.xml`

### Steps
1. Add `implementation(project(":core"))` to `app-passenger/build.gradle.kts`
2. Add Maps, Location, Material, RecyclerView dependencies
3. Place `google-services.json` (registered as `com.piatmove.passenger`) in `app-passenger/`
4. Write `PassengerApplication.kt`
5. Write `AndroidManifest.xml` — `LoginActivity` as launcher
6. Build all screens and layouts
7. Run on emulator/device — test golden path: Register → Login → Book Ride → Ride Status → History

**Done when:** Passenger app runs end-to-end without crashes.

---

## Phase 4 — Build `:app-driver`

**Goal:** A working Driver APK — Login → See Requests → Accept → Active Ride.

### Files to create in `app-driver/src/main/java/com/piatmove/driver/`

| File | Screen |
|---|---|
| `DriverApplication.kt` | App entry point, init Firebase |
| `ui/auth/LoginActivity.kt` | Login screen |
| `ui/auth/RegisterActivity.kt` | Registration screen |
| `ui/auth/AuthViewModel.kt` | Auth logic |
| `ui/home/DriverHomeActivity.kt` | Home with bottom nav |
| `ui/home/DriverViewModel.kt` | Availability toggle, ride state |
| `ui/dashboard/DriverDashboardFragment.kt` | Stats: trips today, earnings |
| `ui/requests/DriverRequestsFragment.kt` | Incoming ride request list |
| `ui/requests/RideRequestActivity.kt` | Accept/reject a specific request |
| `ui/requests/RideRequestsAdapter.kt` | RecyclerView adapter for requests |
| `ui/status/DriverStatusFragment.kt` | Online/offline toggle |
| `ui/ride/ActiveRideActivity.kt` | In-progress ride: map + complete button |
| `ui/theme/Theme.kt` + `Color.kt` + `Type.kt` | Driver branding |

### Layouts to create in `app-driver/src/main/res/layout/`
- `activity_login.xml`
- `activity_register.xml`
- `activity_driver_home.xml`
- `activity_ride_request.xml`
- `activity_active_ride.xml`
- `fragment_driver_dashboard.xml`
- `fragment_driver_requests.xml`
- `fragment_driver_status.xml`
- `item_ride_request.xml`

### Steps
1. Add `implementation(project(":core"))` to `app-driver/build.gradle.kts`
2. Add Maps, Location, Material, RecyclerView dependencies
3. Place `google-services.json` (registered as `com.piatmove.driver`) in `app-driver/`
4. Write `DriverApplication.kt`
5. Write `AndroidManifest.xml` — `LoginActivity` as launcher
6. Build all screens and layouts
7. Run on emulator/device — test: Register → Login → Go Online → Receive Request → Accept → Complete Ride

**Done when:** Driver app runs end-to-end without crashes.

---

## Phase 5 — Build PHP Admin Panel (`PiatMoveAdmin`)

**Goal:** Web dashboard in XAMPP that replaces any need for admin features in the mobile apps.

### Location
`htdocs/PiatMoveAdmin/` in XAMPP

### Pages

| Page | Features |
|---|---|
| `index.php` | Admin login with `$_SESSION` |
| `dashboard.php` | Total users, drivers, bookings, revenue |
| `users.php` | List passengers, search, deactivate |
| `drivers.php` | Approve/reject pending drivers, view active |
| `bookings.php` | All bookings, filter by status and date range |

### Steps
1. Create folder structure (see `PROJECT_STRUCTURE.md`)
2. Write `includes/db.php` — PDO connection
3. Write `includes/auth.php` — session guard (included at top of every page)
4. Build `index.php` — login form with POST handler
5. Build `dashboard.php` — fetch aggregate stats from DB
6. Build `users.php`, `drivers.php`, `bookings.php`
7. Style with `assets/css/admin.css`
8. Test: Login → Approve driver → View bookings → Deactivate user

**Done when:** All pages load, session guard works, data displays correctly.

---

## Phase 6 — Clean Up

1. Confirm both APKs (`app-passenger`, `app-driver`) run correctly
2. Confirm admin panel works
3. Remove the original blank `app/` module from the project
4. Update `settings.gradle.kts` to exclude `:app`
5. Sync and do a final build — zero errors

---

## Key Decisions

**Why multi-module from the start?**
PiatMove starts blank — no migration cost. Setting up modules now means no refactor later when the codebase grows.

**One Firebase project or two?**
One Firebase project, two `google-services.json` files — one per app module, each registered under its own package name (`com.piatmove.passenger`, `com.piatmove.driver`).

**Why PHP for admin?**
Server-rendered PHP with `$_SESSION` is simple and fits a web-only admin panel. No JWT overhead needed.

**What about the original `app/` module?**
It's just the blank scaffold. Comment it out of `settings.gradle.kts` in Phase 1 and remove it in Phase 6.

---

## Progress Tracker

| Phase | Status |
|---|---|
| Phase 1 — Gradle multi-module setup | Not started |
| Phase 2 — `:core` module | Not started |
| Phase 3 — `:app-passenger` | Not started |
| Phase 4 — `:app-driver` | Not started |
| Phase 5 — PHP admin panel | Not started |
| Phase 6 — Clean up | Not started |

---

*Created: 2026-06-26*
*Status: Planning — not yet started*
