# PiatMove — Development Guide & Build Requirements

> How to turn this design system into a working municipal booking system.
> Scope: **Passenger app** + **Driver app** (Android, Kotlin/Compose) and an **Admin dashboard** (web).
> Authority: Municipal Transport Office (MTO), Municipality of Piat, Cagayan.

---

## 1. Recommended tech stack

### Mobile (Passenger + Driver) — **native Android**
| Concern | Choice | Why |
|---|---|---|
| Language | **Kotlin** | Modern, official Android language |
| UI toolkit | **Jetpack Compose** | Declarative; maps 1:1 to this design system's components |
| Min SDK | **API 24 (Android 7.0)** | Covers low-end devices common in the province |
| Architecture | **MVVM + Clean-ish layers** | `ui / domain / data` with ViewModels |
| Async | **Kotlin Coroutines + Flow** | Standard for Compose state |
| DI | **Hilt** | Simple dependency injection |
| Navigation | **Navigation-Compose** | Screen routing |
| Local cache | **Room** (+ DataStore for prefs/session) | Offline trips, token storage |
| Networking | **Retrofit + OkHttp + Kotlinx Serialization** | REST client |
| Images | **Coil** | Avatar / ID upload previews |
| Maps | **Google Maps SDK for Android** + **Directions API** | Live pickup→destination tracking |
| Push | **Firebase Cloud Messaging (FCM)** | "Booking Approved", "Driver Assigned" notifications |
| Icons | **Lucide** (this system mirrors it) | Drop-in vector set |

> **One app or two?** Simplest: **two separate apps** (`piatmove-passenger`, `piatmove-driver`) sharing a `:core-design` and `:core-network` Gradle module. Alternative: one app, role-gated after login. Two apps is cleaner for Play Store listing and permissions (driver needs background location).

### Admin dashboard — **web**
| Concern | Choice |
|---|---|
| Framework | **React + TypeScript + Vite** (the UI kit in `ui_kits/admin/` is already React — port it) |
| Charts | **Recharts** or **Chart.js** |
| Tables | **TanStack Table** |
| Styling | Reuse `styles.css` tokens (or Tailwind mapped to the same values) |
| Auth | Same backend, admin role |

### Backend (pick ONE path)

**Path A — Firebase (fastest, lowest ops).** Best if the MTO has no server team.
- **Firebase Auth** (phone/OTP for residents, email for drivers/admin)
- **Cloud Firestore** (bookings, users, vehicles, trips)
- **Cloud Storage** (uploaded IDs, profile photos)
- **Cloud Functions** (assignment logic, status transitions, sending FCM)
- **FCM** (push)

**Path B — Custom server (more control, needed if data must stay on-prem).**
- **Kotlin + Spring Boot** (team already knows Kotlin) *or* **Node + NestJS**
- **PostgreSQL** (relational — good fit for bookings/trips/audit)
- **JWT** auth, **S3-compatible** storage (or local) for IDs
- Host: a provincial server, or DigitalOcean/Render/Railway

> **Recommendation for a municipality:** start on **Path A (Firebase)** to ship fast and cheap, with a clean repository/service layer so you can migrate to Path B later if data-sovereignty rules require it.

---

## 2. System architecture

```
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│ Passenger app  │   │  Driver app    │   │ Admin web      │
│ Kotlin/Compose │   │ Kotlin/Compose │   │ React/TS       │
└───────┬────────┘   └───────┬────────┘   └───────┬────────┘
        │                    │                    │
        └─────────── HTTPS / SDK ─────────────────┘
                             │
                ┌────────────▼─────────────┐
                │   Backend (Firebase or    │
                │   Spring Boot + Postgres) │
                │  Auth · Bookings · Trips  │
                │  Assignment · Push · Files│
                └────────────┬─────────────┘
                             │
                 ┌───────────▼───────────┐
                 │ FCM push · Maps APIs  │
                 └───────────────────────┘
```

**Roles:** `PASSENGER`, `DRIVER`, `ADMIN`. Every API call is role-checked server-side.

---

## 3. Data model (core entities)

```
User
  id, role(PASSENGER|DRIVER|ADMIN), fullName, contactNumber,
  email?, address, photoUrl?, validIdUrl?, verified(bool), createdAt

Vehicle
  id, name, type(SEDAN|HIACE|COASTER|AMBULANCE), plateNo,
  capacity, color, status(AVAILABLE|IN_USE|MAINTENANCE), assignedDriverId?

Booking
  id, ref("BK-####"), passengerId, pickupLocation, pickupLat/Lng,
  destination, destLat/Lng, scheduledAt, purpose,
  vehicleType, vehicleId?, driverId?,
  status(PENDING|APPROVED|ASSIGNED|IN_TRANSIT|COMPLETED|CANCELLED),
  createdAt, updatedAt

Trip            // the live execution of an approved booking
  id, bookingId, driverId, vehicleId,
  stage(ASSIGNED|ARRIVED|PICKED_UP|IN_TRANSIT|COMPLETED),
  startedAt?, completedAt?, route(points[])

Notification
  id, userId, type, title, body, read(bool), createdAt
```

**Booking lifecycle (state machine):**
`PENDING → APPROVED → ASSIGNED → IN_TRANSIT → COMPLETED`
(any non-terminal → `CANCELLED`). Admin approves & assigns; driver accepts/declines and advances stages; passenger sees the timeline (the `StatusTimeline` component).

---

## 4. API surface (REST example — Path B)

```
# Auth
POST /auth/register            (passenger self-signup + ID upload)
POST /auth/login               (mobile number + password / OTP)
POST /auth/driver/login

# Passenger
GET    /bookings?me            list my bookings
POST   /bookings               create booking
GET    /bookings/{id}          details + driver/vehicle + timeline
DELETE /bookings/{id}          cancel
GET    /notifications?me

# Driver
GET   /driver/assignments      pending assignments
POST  /trips/{id}/accept
POST  /trips/{id}/decline
POST  /trips/{id}/stage        { stage: ARRIVED|PICKED_UP|IN_TRANSIT|COMPLETED }
GET   /driver/schedule?month=

# Admin
GET   /admin/bookings          filter/paginate/export
POST  /admin/bookings/{id}/approve
POST  /admin/bookings/{id}/assign   { driverId, vehicleId }
CRUD  /admin/drivers  /admin/vehicles
GET   /admin/reports           aggregates for charts
```

With **Firebase (Path A)** these become Firestore reads/writes + a few Cloud Functions (`approveBooking`, `assignDriver`, `advanceTripStage`) that also push FCM.

---

## 5. Mapping THIS design system → Jetpack Compose

| Design system | Compose equivalent |
|---|---|
| `tokens/colors.css` | `ui/theme/Color.kt` + `lightColorScheme()` |
| `tokens/typography.css` | `ui/theme/Type.kt` (`Typography`) + fonts in `res/font/` |
| `tokens/spacing.css` (radius/shadow) | `Dp` consts, `Shapes`, `tonalElevation` |
| `Button.jsx` | `@Composable fun PiatButton(...)` |
| `Card.jsx` | `Card(...)` with `RoundedCornerShape(20.dp)` |
| `Badge.jsx` | `@Composable fun StatusBadge(tone, text)` |
| `BottomNav.jsx` | `NavigationBar { NavigationBarItem(...) }` |
| `StatusTimeline.jsx` | custom `Column` with dot/line `Canvas` |
| `Icon` (icons.js) | Lucide vector drawables / `Icon(painterResource(...))` |

The brand values to hard-code: **primary `#2454E0`**, **secondary `#12B76A`**, **app bg `#F8FAFC`**, **card `#FFFFFF`**, **text `#0F172A`/`#475569`**, card radius **20dp**, button radius **14dp**, body font **Public Sans**, display **Plus Jakarta Sans**.

---

## 6. Screen checklist (build order)

**Passenger** (see `ui_kits/passenger/`): Splash → Login → Register (with ID upload) → Dashboard → Book Vehicle → Booking Details/Tracking → Notifications → Profile.

**Driver** (see `ui_kits/driver/`): Login → Dashboard (online toggle + stats) → Trip Assignment (accept/decline) → Active Trip (stage advance) → Schedule → Profile.

**Admin** (see `ui_kits/admin/`): Dashboard (KPIs + charts) → Booking Management table → Driver Management → Vehicle Management → Reports/export.

Each screen's exact layout, copy, and components are already built in the UI kits — use them as the visual spec.

---

## 7. Suggested milestones

1. **M0 — Project setup (1 wk):** repos, Gradle modules, Firebase/Spring project, theme ported from tokens, CI.
2. **M1 — Auth (1–2 wk):** passenger register + ID upload, login, driver login, session, role gate.
3. **M2 — Booking core (2 wk):** create booking, list, details, cancel; admin approve/assign.
4. **M3 — Driver flow (2 wk):** assignments, accept/decline, trip stage machine, schedule.
5. **M4 — Live tracking + push (2 wk):** Google Maps, driver location, FCM notifications, status timeline.
6. **M5 — Admin dashboard (2 wk):** tables, driver/vehicle CRUD, reports + export.
7. **M6 — Hardening (1–2 wk):** validation, offline cache, accessibility (44dp targets, contrast), Play Store + deploy.

---

## 8. Non-negotiables for a government app

- **Accessibility:** min 44dp tap targets, WCAG AA contrast (the palette already passes), large-text support, TalkBack labels on icons.
- **Data privacy:** Philippine **Data Privacy Act (RA 10173)** — explicit consent on registration, encrypt uploaded IDs at rest, retention policy, right to deletion.
- **Security:** HTTPS only, hashed passwords (bcrypt/argon2) or OTP, JWT/Firebase token expiry, server-side role checks, audit log on admin actions.
- **Reliability:** offline read of upcoming trips, graceful errors, no crash on poor connectivity (province reality).
- **Localization:** copy is English now; consider **Ilocano / Tagalog** strings (`res/values-tl/`).

---

## 9. What this repo gives the developers

- `styles.css` + `tokens/` → exact colors, type, spacing, radii, shadows.
- `components/` → component behavior + props (`.d.ts`) and usage (`.prompt.md`).
- `ui_kits/` → pixel-level, interactive spec for every screen.
- `assets/` → logo, icon set, device frame.
- This file → stack, architecture, data model, API, milestones.

Start by porting `tokens/` into the Compose theme, then build screens top-down against the UI kits.
