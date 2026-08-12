# PiatMove Ecosystem — System Architecture & Reference Manual

Complete technical documentation for the **PiatMove** ride-booking system, including the Android mobile applications, the PHP REST API backend, the MySQL database, and the PHP Web Admin Panel.

---

## 1. System Architecture Overview

The PiatMove system operates across three interconnected tiers:

```
                  ┌──────────────────────────────────────────────┐
                  │          Android Mobile Apps                 │
                  │  (Passenger APK  &  Driver APK)             │
                  └──────┬─────────────────────────────▲─────────┘
                         │ REST API Requests           │ Push Notifications
                         │ (JWT Bearer Token)          │ (Firebase FCM)
                         ▼                             │
┌──────────────────────────────────────────────────────┴─────────┐
│                    PHP REST API Backend                        │
│                (C:\xampp\htdocs\piatmove-api)                  │
└───────────────┬────────────────────────────────────────────────┘
                │
                │ Database Queries (PDO)
                ▼
┌────────────────────────────────────────────────────────────────┐
│                   MySQL Database (`piatmove`)                  │
└───────────────▲────────────────────────────────────────────────┘
                │
                │ Session Auth / Direct PDO Queries
                │
┌───────────────┴────────────────────────────────────────────────┐
│                   PHP Web Admin Panel                          │
│               (C:\xampp\htdocs\PiatMoveAdmin)                  │
└────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Specifications

### A. Android Mobile Applications (`PiatMove`)
* **Location:** `C:\Users\GLENN\AndroidStudioProjects\PiatMove`
* **Language & Build:** Kotlin, Gradle Multi-Module (Android SDK 36, Min SDK 24)
* **Architecture:** Shared Core Library + 2 Independent App Modules

#### Module Structure:
1. **`:core` (`com.piatmove.core`)**:
   * Shared networking layer built with **Retrofit 2**, **OkHttp**, and Kotlin **Coroutines**.
   * Data Models: `User`, `AuthModels`, `Booking`, `DriverModels`, `FcmModels`.
   * Repositories: `AuthRepository`, `UserRepository`, `BookingRepository`.
   * Storage & Security: `PrefsManager` using EncryptedSharedPreferences.
   * Services: `PiatMoveFirebaseMessagingService` handling incoming FCM push notifications.
   * Utilities: [`Constants.kt`](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/core/src/main/java/com/piatmove/core/utils/Constants.kt) defining API base URLs, Enums, and status helpers.

2. **`:app-passenger` (`com.piatmove.passenger`)**:
   * App module producing `app-passenger-debug.apk`.
   * Package: `com.piatmove.passenger`
   * Views & Flows: Auth (Login/Register), Home dashboard, Interactive Google Maps pickup/dropoff selector, Real-time ride status tracker, Ride history list.

3. **`:app-driver` (`com.piatmove.driver`)**:
   * App module producing `app-driver-debug.apk`.
   * Package: `com.piatmove.driver`
   * Views & Flows: Auth (Login/Register with license & vehicle details), Driver dashboard (Online/Offline toggle), Incoming ride request alerts, Active ride execution, GPS location broadcasting.

---

### B. PHP REST API Backend (`piatmove-api`)
* **Location:** `C:\xampp\htdocs\piatmove-api`
* **Server Stack:** PHP 8+, Apache (XAMPP), MySQL (PDO)
* **Authentication:** JWT Bearer Token (`Authorization: Bearer <token>`)
* **Entry Router:** [`index.php`](file:///C:/xampp/htdocs/piatmove-api/index.php)

#### API Endpoints Reference:

| Method | Endpoint | Access Role | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register passenger or driver account |
| `POST` | `/auth/login` | Public | Authenticate user and issue JWT token |
| `POST` | `/bookings` | Passenger | Create a new ride booking request |
| `GET` | `/bookings` | Any (Authenticated) | List bookings (filtered by role) |
| `GET` | `/bookings/{id}` | Any (Authenticated) | Get detailed information for a specific booking |
| `POST` | `/bookings/{id}/cancel` | Passenger | Cancel a pending/accepted ride booking |
| `GET` | `/passenger/history` | Passenger | Retrieve passenger's ride history |
| `GET` | `/driver/requests` | Driver | Fetch available/pending ride requests |
| `POST` | `/driver/accept/{id}` | Driver | Accept a pending ride request |
| `POST` | `/driver/reject/{id}` | Driver | Reject a ride request |
| `POST` | `/driver/start/{id}` | Driver | Signal start of ride trip |
| `POST` | `/driver/complete/{id}` | Driver | Complete the ride trip |
| `PUT` | `/driver/location` | Driver | Update real-time driver GPS coordinates |
| `PUT` | `/driver/status` | Driver | Toggle online/offline availability |
| `PUT` | `/user/fcm-token` | Any (Authenticated) | Register or refresh Firebase push token |
| `GET` | `/admin/users` | Admin | List all registered users |
| `GET` | `/admin/drivers/pending` | Admin | List drivers awaiting verification |
| `GET` | `/admin/bookings` | Admin | Retrieve all system bookings |
| `PUT` | `/admin/driver/approve/{id}` | Admin | Approve pending driver application |
| `PUT` | `/admin/driver/reject/{id}` | Admin | Reject driver application |
| `PUT` | `/admin/user/activate/{id}` | Admin | Activate passenger/driver user account |
| `PUT` | `/admin/user/deactivate/{id}`| Admin | Deactivate user account |
| `DELETE`| `/admin/user/{id}` | Admin | Remove user from system |

---

### C. PHP Web Admin Panel (`PiatMoveAdmin`)
* **Location:** `C:\xampp\htdocs\PiatMoveAdmin`
* **Server Stack:** PHP (PHP Sessions), HTML5, CSS3, JavaScript, Chart.js
* **Configuration:** [`config.php`](file:///C:/xampp/htdocs/PiatMoveAdmin/config.php), [`includes/db.php`](file:///C:/xampp/htdocs/PiatMoveAdmin/includes/db.php)

#### Admin Dashboard Features:
* **Dashboard (`dashboard.php`):** Key Performance Indicators (KPIs) showing active drivers, total passengers, total rides, revenue, pending driver verification queue, and dynamic Chart.js analytics.
* **Driver Management (`drivers.php`):** Review driver applications, license numbers, vehicle details, and approve/reject drivers.
* **User Management (`users.php`):** List, search, activate, or suspend passenger accounts.
* **Bookings Overview (`bookings.php`):** Audit all live and completed ride transactions.
* **Reports (`report.php`):** Exportable analytical summaries and performance metrics.
* **Profile (`profile.php`):** Admin account management and password security updates.

---

## 3. Database Schema (`piatmove`)

The MySQL database consists of 5 relational tables:

```sql
users (id, name, email, password, phone, role, status, created_at, updated_at)
  │
  ├──► driver_info (id, user_id, license_no, vehicle_no, vehicle_type, approval_status, is_online, current_lat, current_lng)
  ├──► bookings (id, passenger_id, driver_id, pickup_address, pickup_lat, pickup_lng, dropoff_address, dropoff_lat, dropoff_lng, status, fare)
  └──► fcm_tokens (id, user_id, token)

admins (id, name, email, password, created_at, updated_at)
```

### Table Definitions:

1. **`users`**: Base account table for all app users.
   * `role`: `ENUM('passenger', 'driver')`
   * `status`: `ENUM('active', 'inactive')`
2. **`driver_info`**: Extended driver profile linked via `user_id`.
   * `approval_status`: `ENUM('pending', 'approved', 'rejected')`
   * `is_online`: `TINYINT(1)`
   * `current_lat` / `current_lng`: `DECIMAL(10,7)`
3. **`bookings`**: Full ride transaction record.
   * `status`: `ENUM('pending', 'accepted', 'rejected', 'started', 'completed', 'cancelled')`
4. **`fcm_tokens`**: Push notification tokens linked per `user_id`.
5. **`admins`**: Web admin panel accounts.

---

## 4. Lifecycle & Workflows

### A. Ride Booking Lifecycle
```
[Passenger Creates Booking]
            │
            ▼
    Status: `pending` ───────────► (Passenger Cancels) ──► Status: `cancelled`
            │
    (Driver Accepts)
            │
            ▼
    Status: `accepted`
            │
    (Driver Starts Trip)
            │
            ▼
    Status: `started`
            │
  (Driver Completes Trip)
            │
            ▼
    Status: `completed`
```

### B. Driver Approval Workflow
1. Driver registers via `:app-driver` app. Account is created in `users` (`role='driver'`) and `driver_info` (`approval_status='pending'`).
2. Admin logs into `PiatMoveAdmin` web portal and navigates to **Pending Drivers**.
3. Admin reviews submitted license and vehicle details, then clicks **Approve** or **Reject**.
4. Approved drivers can toggle their status to `is_online=1` and accept ride requests.

---

## 5. Network & Environment Configuration

### API Connection Strings (`Constants.kt`)
* **Android Emulator:** `http://10.0.2.2/piatmove-api/`
* **Physical Device (LAN):** `http://10.135.203.14/piatmove-api/`
* **Web Admin Panel:** `http://localhost/PiatMoveAdmin`

### Database Credentials (`config/database.php` & `PiatMoveAdmin/config.php`)
* **Host:** `localhost`
* **Database Name:** `piatmove`
* **Username:** `root`
* **Password:** `""` (Empty default XAMPP setting)
* **JWT Secret:** Managed via `.env.secret` or environment variable.
