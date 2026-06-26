# PiatMove — Development Guide

## What We're Building

```
xampp/htdocs/
├── piatmove-api/        ← PHP REST API (used by Android apps + admin panel)
└── PiatMoveAdmin/       ← PHP web admin dashboard
```

The API comes **first** — the admin panel and Android apps both depend on it.

---

## Build Order

### Step 1 — Database (MySQL via phpMyAdmin)

Create the `piatmove` database with these tables:

| Table | Purpose |
|---|---|
| `users` | Passengers and drivers (role field differentiates them) |
| `driver_info` | License no, vehicle no, approval status — linked to users |
| `bookings` | All ride requests and their status lifecycle |
| `fcm_tokens` | Push notification tokens per user |
| `admins` | Separate admin accounts for the web panel |

### Step 2 — PHP REST API (`piatmove-api/`)

Thin PHP router, no framework. Endpoints map exactly to what the Android `ApiService.kt` expects.

**All API endpoints:**

| Method | Endpoint | Role | Description |
|---|---|---|---|
| POST | `/auth/register` | public | Register passenger or driver |
| POST | `/auth/login` | public | Login, returns JWT token |
| POST | `/bookings` | passenger | Create a new ride request |
| GET | `/bookings` | any | List bookings (role-filtered) |
| GET | `/bookings/{id}` | any | Get a single booking |
| GET | `/passenger/history` | passenger | Ride history |
| POST | `/bookings/{id}/cancel` | passenger | Cancel a ride request |
| GET | `/driver/requests` | driver | See pending ride requests |
| POST | `/driver/accept/{id}` | driver | Accept a ride |
| POST | `/driver/reject/{id}` | driver | Reject a ride |
| POST | `/driver/start/{id}` | driver | Start a ride |
| POST | `/driver/complete/{id}` | driver | Complete a ride |
| PUT | `/driver/location` | driver | Update GPS coordinates |
| PUT | `/driver/status` | driver | Toggle online/offline |
| PUT | `/user/fcm-token` | any | Register push notification token |
| GET | `/admin/users` | admin | List all users |
| GET | `/admin/drivers/pending` | admin | List pending driver approvals |
| GET | `/admin/bookings` | admin | List all bookings |
| PUT | `/admin/driver/approve/{id}` | admin | Approve a driver |
| PUT | `/admin/driver/reject/{id}` | admin | Reject a driver |
| PUT | `/admin/user/activate/{id}` | admin | Activate a user |
| PUT | `/admin/user/deactivate/{id}` | admin | Deactivate a user |
| DELETE | `/admin/user/{id}` | admin | Delete a user |

**Every response follows the same JSON shape** (matches `ApiResponse.kt`):
```json
{ "success": true, "data": "...", "message": "..." }
```

Auth uses **JWT Bearer tokens** for Android apps.

**API folder structure:**
```
piatmove-api/
├── config/
│   └── database.php          ← DB credentials
├── middleware/
│   └── auth.php              ← JWT verification
├── routes/
│   ├── auth.php              ← register, login
│   ├── bookings.php          ← booking CRUD
│   ├── driver.php            ← driver actions
│   ├── passenger.php         ← passenger history
│   ├── user.php              ← FCM token update
│   └── admin.php             ← admin endpoints
├── helpers/
│   └── response.php          ← json_success() / json_error() helpers
└── index.php                 ← router entry point
```

### Step 3 — PHP Admin Panel (`PiatMoveAdmin/`)

Web dashboard with `$_SESSION` auth (separate from JWT).

**Admin panel folder structure:**
```
PiatMoveAdmin/
├── config.php                ← DB credentials, base URL
├── index.php                 ← Admin login page
├── dashboard.php             ← Overview: users, drivers, bookings
├── users.php                 ← List passengers, search, deactivate
├── drivers.php               ← Approve/reject drivers
├── bookings.php              ← All bookings with filters
├── includes/
│   ├── auth.php              ← Session guard (included on every page)
│   ├── db.php                ← PDO connection
│   ├── header.php            ← Nav sidebar + page header
│   └── footer.php
└── assets/
    ├── css/
    │   └── admin.css
    └── js/
        └── admin.js
```

---

## Progress Tracker

| Step | Task | Status |
|---|---|---|
| 1 | Create `piatmove` database in phpMyAdmin | Not started |
| 1 | Run SQL — create all tables | Not started |
| 2 | Create `piatmove-api/` folder in htdocs | Not started |
| 2 | `config/database.php` | Not started |
| 2 | `helpers/response.php` | Not started |
| 2 | `middleware/auth.php` (JWT) | Not started |
| 2 | `index.php` (router) | Not started |
| 2 | `routes/auth.php` | Not started |
| 2 | `routes/bookings.php` | Not started |
| 2 | `routes/driver.php` | Not started |
| 2 | `routes/passenger.php` | Not started |
| 2 | `routes/user.php` | Not started |
| 2 | `routes/admin.php` | Not started |
| 3 | Create `PiatMoveAdmin/` folder in htdocs | Not started |
| 3 | `includes/db.php` + `includes/auth.php` | Not started |
| 3 | `index.php` (admin login) | Not started |
| 3 | `dashboard.php` | Not started |
| 3 | `users.php` | Not started |
| 3 | `drivers.php` | Not started |
| 3 | `bookings.php` | Not started |

---

*Created: 2026-06-26*
*Approach: Option B — Step by step*
*Editor: VSCode*

---

## Prompt (Update this when resuming)

> Working in VSCode. Follow Option B — step by step.
> Update progress tracker above as each task is completed.
> Resume here when returning to this guide.
