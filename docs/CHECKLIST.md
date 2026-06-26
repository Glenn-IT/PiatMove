# PiatMove — Master Checklist

> Update this file as tasks are completed. Check off `[ ]` → `[x]`.
> Resume from the first unchecked item.

---

## PHASE 0 — Project Setup (Android Studio)

- [x] Create Android Studio project (`PiatMove`)
- [x] Fix `compileSdk` / `targetSdk` → set to `37`
- [x] Update app icon (`ic_launcher_background` + `ic_launcher_foreground`)
- [x] Update brand colors in `colors.xml`
- [x] Set up multi-module Gradle structure
  - [x] Create `core/` folder + `build.gradle.kts`
  - [x] Create `app-passenger/` folder + `build.gradle.kts`
  - [x] Create `app-driver/` folder + `build.gradle.kts`
  - [x] Update `settings.gradle.kts` to include all 3 modules
  - [x] Sync project — verify zero errors

---

## PHASE 1 — Database (XAMPP / phpMyAdmin)

- [x] Create `piatmove` database (`utf8mb4_unicode_ci`)
- [x] Create `users` table
- [x] Create `driver_info` table
- [x] Create `bookings` table
- [x] Create `fcm_tokens` table
- [x] Create `admins` table
- [x] Test DB connection from PHP

---

## PHASE 2 — PHP REST API (`htdocs/piatmove-api/`)

### Setup
- [x] Create `piatmove-api/` folder in `htdocs/`
- [x] `config/database.php` — PDO connection
- [x] `helpers/response.php` — `json_success()` / `json_error()`
- [x] `middleware/auth.php` — JWT verification
- [x] `index.php` — router entry point + CORS headers

### Auth routes (`routes/auth.php`)
- [x] `POST /auth/register`
- [x] `POST /auth/login`

### Booking routes (`routes/bookings.php`)
- [x] `POST /bookings` — create ride request
- [x] `GET /bookings` — list (role-filtered)
- [x] `GET /bookings/{id}` — single booking
- [x] `POST /bookings/{id}/cancel` — cancel ride

### Passenger routes (`routes/passenger.php`)
- [x] `GET /passenger/history` — ride history

### Driver routes (`routes/driver.php`)
- [x] `GET /driver/requests` — pending requests
- [x] `POST /driver/accept/{id}`
- [x] `POST /driver/reject/{id}`
- [x] `POST /driver/start/{id}`
- [x] `POST /driver/complete/{id}`
- [x] `PUT /driver/location`
- [x] `PUT /driver/status`

### User routes (`routes/user.php`)
- [x] `PUT /user/fcm-token`

### Admin routes (`routes/admin.php`)
- [x] `POST /admin/login`
- [x] `GET /admin/users`
- [x] `GET /admin/drivers/pending`
- [x] `GET /admin/bookings`
- [x] `PUT /admin/driver/approve/{id}`
- [x] `PUT /admin/driver/reject/{id}`
- [x] `PUT /admin/user/activate/{id}`
- [x] `PUT /admin/user/deactivate/{id}`
- [x] `DELETE /admin/user/{id}`

### API Testing
- [x] Test all auth endpoints
- [x] Test all booking endpoints
- [x] Test all driver endpoints
- [x] Test all admin endpoints

---

## PHASE 3 — PHP Admin Panel (`htdocs/PiatMoveAdmin/`)

### Setup
- [x] Create `PiatMoveAdmin/` folder in `htdocs/`
- [x] `includes/db.php` — PDO connection
- [x] `includes/auth.php` — session guard
- [x] `includes/header.php` — nav sidebar
- [x] `includes/footer.php`
- [x] `assets/css/admin.css`
- [x] `assets/js/admin.js`

### Pages
- [x] `index.php` — admin login
- [x] `dashboard.php` — stats overview
- [x] `users.php` — manage passengers
- [x] `drivers.php` — approve/reject drivers
- [x] `bookings.php` — all bookings with filters

### Admin Panel Testing
- [x] Login / logout works
- [x] Dashboard stats load
- [x] Approve a driver
- [x] Deactivate a user
- [x] Filter bookings by status

---

## PHASE 4 — Android `:core` Module

- [x] `data/api/ApiClient.kt`
- [x] `data/api/ApiService.kt`
- [x] `data/api/ApiResponse.kt`
- [x] `data/models/User.kt`
- [x] `data/models/AuthModels.kt`
- [x] `data/models/Booking.kt`
- [x] `data/models/DriverModels.kt`
- [x] `data/models/FcmModels.kt`
- [x] `data/repository/BaseRepository.kt`
- [x] `data/repository/AuthRepository.kt`
- [x] `data/repository/UserRepository.kt`
- [x] `data/repository/BookingRepository.kt`
- [x] `data/local/PrefsManager.kt`
- [x] `services/PiatMoveFirebaseMessagingService.kt`
- [x] `utils/Constants.kt`
- [x] `utils/Resource.kt`
- [x] `:core` compiles clean (`assembleDebug`)

---

## PHASE 5 — Android `:app-passenger` Module

### Setup
- [x] `PassengerApplication.kt`
- [x] `AndroidManifest.xml`
- [ ] `google-services.json` (registered as `com.piatmove.passenger`)

### Screens
- [x] `ui/auth/LoginActivity.kt` + layout
- [x] `ui/auth/RegisterActivity.kt` + layout
- [x] `ui/auth/AuthViewModel.kt`
- [x] `ui/home/PassengerHomeActivity.kt` + layout
- [x] `ui/home/PassengerViewModel.kt`
- [x] `ui/booking/BookRideActivity.kt` + layout
- [x] `ui/booking/RideStatusActivity.kt` + layout
- [x] `ui/history/RideHistoryFragment.kt` + layout
- [x] `res/values/` (themes, colors, strings, menus, drawables)
- [x] `:app-passenger` compiles clean (`assembleDebug`)

### Passenger App Testing
- [x] Register → Login flow
- [x] Book a ride
- [x] View ride status
- [x] View ride history
- [ ] FCM notification received (booking accepted)

---

## PHASE 6 — Android `:app-driver` Module

### Setup
- [x] `DriverApplication.kt`
- [x] `AndroidManifest.xml`
- [ ] `google-services.json` (registered as `com.piatmove.driver`)

### Screens
- [x] `ui/auth/LoginActivity.kt` + layout
- [x] `ui/auth/RegisterActivity.kt` + layout
- [x] `ui/auth/AuthViewModel.kt`
- [x] `ui/home/DriverHomeActivity.kt` + layout
- [x] `ui/home/DriverViewModel.kt`
- [x] `ui/dashboard/DriverDashboardFragment.kt` + layout
- [x] `ui/requests/DriverRequestsFragment.kt` + layout
- [x] `ui/requests/RideRequestActivity.kt` + layout
- [x] `ui/requests/RideRequestsAdapter.kt`
- [x] `ui/status/DriverStatusFragment.kt` + layout
- [x] `ui/ride/ActiveRideActivity.kt` + layout
- [x] `res/values/` (themes, colors, strings, drawables)

### Driver App Testing
- [ ] Register → Login flow
- [ ] Go online / offline
- [ ] Receive ride request (FCM)
- [ ] Accept → Start → Complete ride

---

## PHASE 7 — Clean Up

- [ ] Both APKs run without crashes
- [ ] Admin panel fully functional
- [ ] API all endpoints tested
- [ ] Remove original blank `app/` module
- [ ] Update `settings.gradle.kts` to exclude `:app`
- [ ] Final Gradle sync — zero errors

---

## Design Rule (Read Before Building Any Screen)

> "Use the piatmove-design skill as my design reference.
> Build [screen] matching its colors, type, and components."
>
> **Design only — main function must never change.**

| Token | Value |
|---|---|
| Primary | `#2454E0` |
| Primary Dark | `#1D43B8` |
| Green | `#12B76A` |
| Text Primary | `#0F172A` |
| Text Secondary | `#64748B` |
| Heading Font | Plus Jakarta Sans 800 |
| Body Font | Public Sans 600 |

---

*Created: 2026-06-26*
*Last updated: 2026-06-26*
