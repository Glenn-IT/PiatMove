# PiatMove — Capstone Defense Presentation Walkthrough & Panelist Demonstration Guide
<!-- System: PiatMove — Tricycle Transport Hailing and Fare Monitoring System in the Municipality of Piat, Cagayan -->
<!-- Target Audience: Capstone Panelists, Advisers, Deans, and Technical Evaluators -->
<!-- Developers: Glenard Pagurayan & Capstone Research Team | BSIT 4th Year · Cagayan State University – Piat Campus -->

---

## 🧭 Executive Summary & Timing Strategy

| Phase | Presentation Section | Role Demonstrated | Recommended Duration | Primary Interface / Source |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | Project Rationale & Rural Mobility Problem Context | Overview | 1.5 mins | Title Slide / [SYSTEM_MEMORY.md](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/docs/SYSTEM_MEMORY.md) |
| **Phase 2** | Technical Architecture, Multi-Module Design & Security Baseline | Architecture | 1.5 mins | [ApiClient.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/core/src/main/java/com/piatmove/core/data/api/ApiClient.kt) / [Constants.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/core/src/main/java/com/piatmove/core/utils/Constants.kt) |
| **Phase 3** | Administrator Command Center & Real-time Municipal Fleet KPI | **Admin** | 1.0 min | [dashboard.php](file:///C:/xampp/htdocs/PiatMoveAdmin/dashboard.php) |
| **Phase 4** | Driver Compliance & 4-Document Dossier Verification | **Admin** | 1.5 mins | [drivers.php](file:///C:/xampp/htdocs/PiatMoveAdmin/drivers.php) |
| **Phase 5** | Driver Registration & Security Guard Trapping | **Driver** | 1.0 min | [RegisterActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/auth/RegisterActivity.kt) |
| **Phase 6** | Driver Command Dashboard & Availability Switch (Online/Offline) | **Driver** | 1.0 min | [DriverDashboardFragment.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/dashboard/DriverDashboardFragment.kt) |
| **Phase 7** | Passenger Authentication & Piat Landmark Map Picker | **Passenger** | 1.5 mins | [PassengerHomeActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/home/PassengerHomeActivity.kt) |
| **Phase 8** | Statutory 20% Discount Trapping & Fare Matrix Computation | **Passenger** | 1.5 mins | [BookRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/BookRideActivity.kt) |
| **Phase 9** | Live Ride Dispatch & Driver Broadcast Notification | **Driver** | 1.0 min | [DriverRequestsFragment.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/requests/DriverRequestsFragment.kt) / [RideRequestActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/requests/RideRequestActivity.kt) |
| **Phase 10** | Driver Acceptance & Live Passenger Status Synchronization | **Driver** & **Passenger** | 1.5 mins | [ActiveRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/ride/ActiveRideActivity.kt) & [RideStatusActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/RideStatusActivity.kt) |
| **Phase 11** | Turn-by-Turn Transit Lifecycle (`Started` to `Completed`) | **Driver** & **Passenger** | 1.5 mins | [ActiveRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/ride/ActiveRideActivity.kt) |
| **Phase 12** | Cash Settlement & 5-Star Driver Rating/Feedback System | **Passenger** | 1.0 min | [RideStatusActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/RideStatusActivity.kt) |
| **Phase 13** | Driver Daily Earnings Report & Activity Audit | **Driver** | 1.0 min | [DriverIncomeReportActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/report/DriverIncomeReportActivity.kt) |
| **Phase 14** | Municipal Transport Analytics & Multi-Format Export (PDF/CSV) | **Admin** | 1.5 mins | [report.php](file:///C:/xampp/htdocs/PiatMoveAdmin/report.php) |
| **Phase 15** | Centralized Booking Log, System Health & Transition to Q&A | **Admin** | 0.5 min | [bookings.php](file:///C:/xampp/htdocs/PiatMoveAdmin/bookings.php) |
| **Total** | **Comprehensive 3-Role Defense Walkthrough** | **All Roles** | **~18.0 mins** | — |

---

## 🛠️ Pre-Defense Staging & Credentials Setup

Before the panel convenes, configure your dual-device and presentation environment:

### 1. Presentation Station Hardware & Screen Layout
* **Screen 1 (Laptop / Main Projector):** 
  * Browser Window 1: **Admin Web Portal** (`https://piatmoveadmin.online/admin/` or `http://localhost/PiatMoveAdmin/`).
  * Mirroring Utility (e.g., *Scrcpy* / *Vysor* / Android Studio Device Mirroring): Displays Phone A (Passenger) and Phone B (Driver) side-by-side on the projector.
* **Device A (Physical Android Phone or Emulator 1):** 
  * Installed with [`PiatMove-Passenger.apk`](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/installable-apks/PiatMove-Passenger.apk).
  * Logged in with a test commuter account (e.g., `glenard0823@gmail.com`).
* **Device B (Physical Android Phone or Emulator 2):** 
  * Installed with [`PiatMove-Driver.apk`](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/installable-apks/PiatMove-Driver.apk).
  * Logged in with an **Approved Driver** account (e.g., `ramon.delacruz@example.com`).

---

### 2. Standard Defense Demonstration Accounts

| Role | Account Name | Email | Password | Status / Vehicle Info | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Administrator** | Super Admin | `admin@piatmove.com` | `password123` | Full Municipal Privileges | [PiatMoveAdmin/index.php](file:///C:/xampp/htdocs/PiatMoveAdmin/index.php) |
| **Passenger 1** | Pagurayan Glenard | `glenard0823@gmail.com` | `password123` | Active Passenger | Standard test commuter |
| **Passenger 2 (Student)** | Juan Dela Cruz | `juan@example.com` | `password123` | Active Passenger | Demo 20% Student Discount |
| **Driver 1 (Approved)** | Ramon Dela Cruz | `ramon.delacruz@example.com` | `password123` | **Approved** / Tricycle / Maguilling | Primary live demo driver |
| **Driver 2 (Approved)** | Lucky Baltazar | `lucky@gmail.com` | `password123` | **Approved** / Tricycle / Santa Barbara | Secondary live demo driver |
| **Driver 3 (Pending)** | Bayani Cruz | `bayani.cruz@example.com` | `password123` | **Pending** / Tricycle / Poblacion I | Use to demonstrate Admin Approval |
| **Driver 4 (Rejected)** | Mario Torres | `mario.torres@example.com` | `password123` | **Rejected** / Tricycle / Santa Barbara | Demonstrates compliance enforcement |

---

### 3. Municipal Fare Matrix & Statutory 20% Discount Rules (2026)

All computations are hardcoded and validated symmetrically between the Android client ([BookRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/BookRideActivity.kt)) and the backend API ([routes/bookings.php](file:///C:/xampp/htdocs/piatmove-api/routes/bookings.php)):

* **Standard Regular Base Fare:** `₱20.00 / passenger`
* **Statutory 20% Discount Categories** *(Republic Act Nos. 10931, 9994, 7277)*:
  * 🎓 **Student** — `₱16.00 / pax` *(Save ₱4.00)*
  * 👴 **Senior Citizen** — `₱16.00 / pax` *(Save ₱4.00)*
  * ♿ **Person with Disability (PWD)** — `₱16.00 / pax` *(Save ₱4.00)*
  * 🤰 **Pregnant Commuter** — `₱16.00 / pax` *(Save ₱4.00)*
* **ID Presentation Protocol:** When boarding, the passenger must show their physical Student ID, Senior Citizen OSCA ID, PWD Card, or Medical Certificate to the tricycle operator.

---

### 4. Key Piat Municipal Landmarks Pre-loaded in Map Picker

* ⛪ **Basilica Minore of Our Lady of Piat** (`17.7885° N, 121.4805° E`)
* 🏛️ **Piat Municipal Hall (Poblacion)** (`17.7912° N, 121.4698° E`)
* 🛒 **Piat Public Market (Commercial District)** (`17.7887° N, 121.4673° E`)
* 🎓 **Cagayan State University (CSU) - Piat Campus** (`17.7930° N, 121.4610° E`)
* 🌉 **Calaoagan Bridge / Crossing** (`17.7780° N, 121.4800° E`)
* 🛣️ **Maguilling Junction / Terminal** (`17.8010° N, 121.4550° E`)

---

### 5. Municipal Administrative Coverage (The 18 Barangays of Piat, Cagayan)

All drivers are registered under their specific home barangay to monitor local fleet distribution:

| Cluster | Barangays Included | Primary Transit Hubs / Feeder Points |
| :--- | :--- | :--- |
| **Commercial & Civic Center** | Poblacion I, Poblacion II | Piat Municipal Hall, Public Market, RHU |
| **Pilgrimage & Educational** | Minanga, Baung | Basilica Minore of Our Lady of Piat, CSU Piat Campus |
| **Northern Agricultural** | Maguilling, Santa Barbara, Apayao, Villa Rey | Maguilling National High School, Rice Mill Terminals |
| **Southern & Riverine** | Calaoagan, Warat, Sicatna, Tagurpatu | Calaoagan Bridge, Chico River Crossings |
| **Outer Rural Communities** | Aquing, Catarauan, Dugayung, Gumarueng, Macapil | Provincial Road Junctions & Barangay Health Stations |

---

### 6. Production Cloud & Local Health Verification

Before presenting to the panel, verify that all services are online:
1. **Cloud Production API:** Open `https://piatmoveadmin.online/api/health` in your browser. Expected response:
   ```json
   { "success": true, "data": { "status": "online", "service": "PiatMove API" } }
   ```
2. **Local Fallback XAMPP:** Ensure Apache and MySQL are running in XAMPP Control Panel.
3. **APK Builds:** Verify that both [`PiatMove-Passenger.apk`](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/installable-apks/PiatMove-Passenger.apk) and [`PiatMove-Driver.apk`](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/installable-apks/PiatMove-Driver.apk) are compiled and functioning.

---

## 🎬 Step-by-Step Presentation Script (From First to Last)

---

### Step 1: Opening & Rural Mobility Problem Statement
* **Screen Display:** Title Slide / System Architecture Diagram / [SYSTEM_MEMORY.md](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/docs/SYSTEM_MEMORY.md)
* **Estimated Time:** 1.5 minutes
* **Screen Action:** Present title slide featuring the PiatMove logo and official municipal context of Piat, Cagayan.
* **🗣️ Verbal Script:**
  > *"Good morning, honorable members of the panel, our research adviser, and guests. We are 4th-year BSIT students of Cagayan State University – Piat Campus. Today, we are proud to present our capstone project: **PiatMove — a Tricycle Transport Hailing and Fare Monitoring System tailored for the Municipality of Piat, Cagayan**.*
  >
  > *In rural agricultural and pilgrimage hubs like Piat, motorized tricycles serve as the lifeblood of local mobility. However, passengers face severe challenges: long waiting times in scorching heat or rain, arbitrary overcharging by opportunistic drivers, lack of standard fare transparency, and zero safety tracking. Conversely, tricycle operators waste costly fuel roaming empty streets seeking fares, particularly between remote barangays and the central town market or the famous Basilica of Our Lady of Piat.*
  >
  > *PiatMove solves this through a unified, 3-tier ecosystem: a Passenger Android App for instant booking and transparent discounts, a Driver Android App for real-time dispatch and trip logging, and a Web-based Administrator Command Center for municipal fleet regulation, document verification, and analytical reporting."*

---

### Step 2: System Architecture, Multi-Module Engineering & Security Baseline
* **Screen Display:** Project Architecture Diagram or [ApiClient.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/core/src/main/java/com/piatmove/core/data/api/ApiClient.kt) / [Constants.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/core/src/main/java/com/piatmove/core/utils/Constants.kt)
* **Estimated Time:** 1.5 minutes
* **Screen Action:** Show the Android Studio multi-module workspace (`:core`, `:app-passenger`, `:app-driver`) and highlight the production REST API endpoints.
* **🗣️ Verbal Script:**
  > *"Under the hood, PiatMove is engineered with industry-grade software architecture:
  >
  > 1. **Multi-Module Android Architecture:** We separated the mobile apps into `:app-passenger`, `:app-driver`, and a shared `:core` library module. This guarantees zero code duplication for networking, JWT storage, and models while keeping the APKs lightweight under 9 Megabytes.
  > 2. **Modern MVVM & Kotlin Coroutines:** Clean separation of UI and business logic through ViewModels, LiveData, and Retrofit 2 REST networking.
  > 3. **Production Cloud Deployment:** Our backend is actively deployed on Hostinger cloud servers at `https://piatmoveadmin.online/api/`, backed by MySQL and PHP 8+.
  > 4. **Enterprise Security:** Stateless JWT (JSON Web Token) authentication on every API transaction, 100% prepared SQL PDO queries to eliminate SQL injections, and strict Role-Based Access Control enforcing that drivers cannot access passenger routes and vice versa."*

---

### Step 3: Administrator Command Center & Live Municipal KPI Metrics
* **Screen Display:** Admin Web Portal: [dashboard.php](file:///C:/xampp/htdocs/PiatMoveAdmin/dashboard.php)
* **Estimated Time:** 1.0 minute
* **Screen Action:** Log into Admin Portal (`admin@piatmove.com`), highlight the real-time summary cards: *Total Registered Users, Registered Drivers, Active Bookings, and Total Completed Revenue*. Point to the breakdown badges (*Pending, Accepted, Started, Completed, Cancelled*).
* **🗣️ Verbal Script:**
  > *"We begin our live demonstration at the Municipal Administrator Portal. 
  >
  > *The Admin Dashboard acts as the municipal transport command center. At a single glance, local transport regulators can monitor total commuter volume, active tricycle fleet size, and real-time transit status across Piat. 
  >
  > *Notice our dynamic metric counters: live trips currently in transit, completed trips generating local commerce, and pending driver applications awaiting municipal vetting."*

---

### Step 4: Driver Compliance & 4-Document Dossier Verification
* **Screen Display:** Admin Web Portal: [drivers.php](file:///C:/xampp/htdocs/PiatMoveAdmin/drivers.php)
* **Estimated Time:** 1.5 minutes
* **Screen Action:**
  1. Click **"Drivers"** in the navigation sidebar.
  2. Filter by **"Pending"** tab.
  3. Locate applicant **Bayani Cruz** (`LIC-2003`, Poblacion I).
  4. Click **"View"** to open the modal dossier.
  5. Inspect the 4 mandatory municipal compliance documents:
     * 🪪 **Driver Photo / Selfie**
     * 📜 **LTO Driver's License Proof**
     * 🏷️ **Tricycle Plate / Franchise Proof**
     * 🛺 **Tricycle Unit Vehicle Photo**
  6. Click **"Approve"** to authorize the driver.
* **🗣️ Verbal Script:**
  > *"Passenger safety begins with strict driver onboarding. Unlike commercial apps that allow unverified drivers on the road, PiatMove enforces municipal compliance.
  >
  > *In [drivers.php](file:///C:/xampp/htdocs/PiatMoveAdmin/drivers.php), the administrator reviews every applicant's complete 4-document dossier: official driver's license, franchise registration plate, driver identity photo, and the actual tricycle unit photo. 
  >
  > *As demonstrated, we inspect applicant Bayani Cruz from Poblacion I. Once verified, one click on 'Approve' promotes his account in the MySQL database, instantly allowing his driver mobile app to go online."*

---

### Step 5: Driver Mobile Registration & Security Guard Trapping
* **Screen Display:** Device B (Driver App): [RegisterActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/auth/RegisterActivity.kt)
* **Estimated Time:** 1.0 minute
* **Screen Action:**
  1. Show the Driver registration screen on Phone B.
  2. Point out the input fields: *Full Name, Email, Phone, Password (minimum 8 characters), License Number, Vehicle/Plate Number, Barangay Dropdown, and Document Attachments*.
  3. Explain the security guard: newly registered drivers are restricted from accepting rides until approved by Admin.
* **🗣️ Verbal Script:**
  > *"On the driver's device, operators register by providing their vehicle specifications and assigning their home barangay among Piat's 18 barangays.
  >
  > *Both client-side in Kotlin and server-side in PHP, we enforce strict data hygiene: phone numbers, plate format trapping, and 8+ character password encryption using Bcrypt. If an unapproved driver attempts to log in and go online, our system blocks them with a prominent alert stating: 'Your account is pending admin approval.'"*

---

### Step 6: Driver Command Dashboard & Availability Management (Online/Offline)
* **Screen Display:** Device B (Driver App): [DriverDashboardFragment.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/dashboard/DriverDashboardFragment.kt)
* **Estimated Time:** 1.0 minute
* **Screen Action:**
  1. Log into Driver App as approved driver **Ramon Dela Cruz**.
  2. Point out the **"✓ Account Approved"** badge and today's summary card (`₱0.00` / 0 trips).
  3. Toggle the **"Go Online"** switch to ON.
  4. Show the status change to green: *"You are Online — Ready to receive ride requests"*.
* **🗣️ Verbal Script:**
  > *"Now logged in as approved driver Ramon Dela Cruz, the driver sees his daily performance metrics. 
  >
  > *When the operator is fueled up and ready for service, he flicks the switch to **Online**. This sends a PUT request to `/driver/status` on our REST API, updating `is_online = 1` in the database. The driver is now registered in the active municipal dispatch pool to receive nearby ride requests."*

---

### Step 7: Passenger Authentication & Piat Landmark Map Picker
* **Screen Display:** Device A (Passenger App): [PassengerHomeActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/home/PassengerHomeActivity.kt) & [BookRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/BookRideActivity.kt)
* **Estimated Time:** 1.5 minutes
* **Screen Action:**
  1. Open the Passenger App on Device A.
  2. Click **"Book a Ride"**.
  3. Demonstrate the Google Maps interface centered over Piat, Cagayan (`17.7885, 121.4805`).
  4. Tap the pickup location (e.g., *Piat Public Market*) or tap the landmark chip.
  5. Tap the dropoff destination (e.g., *Basilica Minore of Our Lady of Piat*).
  6. Point out the animated map pin and automatic reverse geocoding resolving the exact street name.
* **🗣️ Verbal Script:**
  > *"Turning to the commuter experience on Device A. The passenger opens PiatMove and selects 'Book a Ride'. 
  >
  > *The screen opens our interactive Google Maps interface. For commuter convenience, we pre-programmed prominent municipal landmark chips: the Basilica of Our Lady of Piat, Piat Public Market, CSU Piat Campus, and Poblacion Barangay Halls. 
  >
  > *The passenger can tap any preset landmark or drag the map pin to any customized pickup point in town. Reverse geocoding instantly resolves the geographical coordinates into human-readable street names."*

---

### Step 8: Statutory 20% Discount Trapping & Fare Matrix Computation
* **Screen Display:** Device A (Passenger App): [BookRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/BookRideActivity.kt) (Fare Sheet bottom drawer)
* **Estimated Time:** 1.5 minutes
* **Screen Action:**
  1. Adjust the passenger count from 1 to 2.
  2. Notice the base regular fare computation: `2 passengers × ₱20.00 = ₱40.00`.
  3. Select the **"Student"** discount chip.
  4. Watch the fare instantly recompute: `2 passengers × ₱16.00 = ₱32.00` *(Saving ₱8.00)*.
  5. Show the on-screen policy reminder: *"Please present valid Student ID upon boarding"*.
  6. Cycle through Senior Citizen, PWD, and Pregnant options to show consistent 20% discount calculations.
  7. Set back to 1 Student passenger (`₱16.00`).
* **🗣️ Verbal Script:**
  > *"One of PiatMove's flagship innovations is automated compliance with Philippine transportation laws — specifically Republic Acts 10931, 9994, and 7277 covering Students, Senior Citizens, PWDs, and Pregnant women.
  >
  > *Traditionally, rural commuters argue over fares. In PiatMove, fare computation is completely automated and tamper-proof:
  > - Base regular fare is locked at ₱20.00.
  > - When a passenger selects 'Student', the system calculates a 20% discount, pricing the ride at exactly ₱16.00.
  > - An on-screen compliance notice prompts the rider to present their physical ID when the tricycle arrives.
  >
  > *This eliminates overcharging disputes before the vehicle even moves."*

---

### Step 9: Live Ride Request Dispatch & Real-Time Driver Broadcast
* **Screen Display:** Device A & Device B side-by-side: [BookRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/BookRideActivity.kt) → [DriverRequestsFragment.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/requests/DriverRequestsFragment.kt)
* **Estimated Time:** 1.0 minute
* **Screen Action:**
  1. On Device A (Passenger), click **"Confirm & Request Ride"**.
  2. Immediately switch panel focus to Device B (Driver).
  3. Point out the new ride request card popping up on the Driver's screen:
     * Passenger Name: *Pagurayan Glenard*
     * Pickup: *Piat Public Market*
     * Dropoff: *Basilica Minore of Our Lady of Piat*
     * Badge: 🎓 *Student Discount (₱16.00)*
  4. Tap the card on Device B to open the full request view ([RideRequestActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/requests/RideRequestActivity.kt)).
* **🗣️ Verbal Script:**
  > *"When the passenger confirms the booking, a POST request is transmitted to `/bookings`. 
  >
  > *Look at the driver's device on the right: within milliseconds, the active driver's request feed receives the dispatch card! The driver sees the exact route, the passenger's name, the fixed ₱16.00 fare, and the student badge so the driver knows to verify the ID. 
  >
  > *The driver has full autonomy to Accept or Reject based on proximity."*

---

### Step 10: Driver Acceptance & Real-Time Passenger Status Synchronization
* **Screen Display:** Device B: [RideRequestActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/requests/RideRequestActivity.kt) & Device A: [RideStatusActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/RideStatusActivity.kt)
* **Estimated Time:** 1.5 minutes
* **Screen Action:**
  1. On Device B (Driver), tap **"Accept Ride"**.
  2. Driver screen navigates to [ActiveRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/ride/ActiveRideActivity.kt).
  3. Direct panel attention back to Device A (Passenger):
     * Status updates automatically from `Looking for driver...` to `Driver on the way!`.
     * The **Driver Information Card** slides up showing: Driver Name (*Ramon Dela Cruz*), Tricycle Plate (*TRC-3001*), Vehicle (*Tricycle*), and Call Button.
     * Route polyline and tricycle marker appear on the Google Map.
* **🗣️ Verbal Script:**
  > *"When the driver taps 'Accept', our backend initiates a database transaction linking the driver to the booking and updating status to `accepted`.
  >
  > *Instantly, on the passenger's screen, the waiting state transforms into our Live Tracking screen. The passenger is presented with full accountability metrics: driver name, contact phone, and tricycle plate number. A route polyline connects the pickup to the destination. 
  >
  > *The commuter no longer has to guess who is picking them up or wonder if anyone is coming."*

---

### Step 11: Turn-by-Turn Transit Lifecycle (`Started` to `Completed`)
* **Screen Display:** Device B: [ActiveRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/ride/ActiveRideActivity.kt) & Device A: [RideStatusActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/RideStatusActivity.kt)
* **Estimated Time:** 1.5 minutes
* **Screen Action:**
  1. On Device B, show the **"Navigate"** button that opens external Google Maps turn-by-turn directions if needed.
  2. Tap **"Start Ride"** (Status changes to `started` - *"Heading to destination"*).
  3. Show the passenger phone reflecting the `started` transit state.
  4. On Device B, tap **"Complete Ride"** once arriving at the Basilica.
  5. Confirmation toast appears: *"Ride completed successfully"*.
* **🗣️ Verbal Script:**
  > *"Upon meeting the passenger, the driver taps 'Start Ride'. The system transitions to the `started` state, recording the transit timestamp. 
  >
  > *Once safely arriving at the Basilica of Our Lady of Piat, the driver taps 'Complete Ride'. This marks the booking `completed`, locks the fare, and frees the driver to accept subsequent bookings."*

---

### Step 12: Cash Settlement & 5-Star Driver Rating/Feedback System
* **Screen Display:** Device A (Passenger App): [RideStatusActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-passenger/src/main/java/com/piatmove/passenger/ui/booking/RideStatusActivity.kt) (Rating Modal)
* **Estimated Time:** 1.0 minute
* **Screen Action:**
  1. On Device A, observe the **"Rate Your Driver"** dialog automatically popping up upon ride completion.
  2. Select **5 Stars** for Ramon Dela Cruz.
  3. Enter a review comment: *"Ingat mag-drive, very polite and followed student fare!"*.
  4. Tap **"Submit Rating"**.
  5. Show the submission confirmation and smooth navigation back to the passenger home dashboard.
* **🗣️ Verbal Script:**
  > *"Immediately upon completion, the passenger app triggers our Quality Assurance modal. 
  >
  > *The commuter rates the driver from 1 to 5 stars and submits qualitative feedback. This feedback is securely transmitted to `/bookings/{id}/rate` and permanently stored in our MySQL database. 
  >
  > *This provides municipal transport officials and tricycle associations with direct metrics to reward courteous drivers and flag repeat safety offenders."*

---

### Step 13: Driver Daily Earnings Report & Activity Audit
* **Screen Display:** Device B (Driver App): [DriverIncomeReportActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/report/DriverIncomeReportActivity.kt) & [DriverActivityFragment.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/history/DriverActivityFragment.kt)
* **Estimated Time:** 1.0 minute
* **Screen Action:**
  1. On Device B, navigate back to the Driver Dashboard.
  2. Notice today's income is now updated with `₱16.00` and trip count = `1`.
  3. Tap **"View Daily Report"** to open [DriverIncomeReportActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/report/DriverIncomeReportActivity.kt).
  4. Highlight the detailed summary: Gross earnings, trip list with timestamps, pickup/dropoff points, and discount badges.
* **🗣️ Verbal Script:**
  > *"Tricycle drivers often struggle to track daily take-home pay. 
  >
  > *In the driver app, our Daily Report feature compiles every completed transaction in real-time. Operators see their exact daily income, trip counts, and historical audit logs. This empowers rural drivers with clear financial records and verifiable proof of earnings."*

---

### Step 14: Municipal Transport Analytics & Multi-Format Export (PDF/CSV)
* **Screen Display:** Admin Web Portal: [report.php](file:///C:/xampp/htdocs/PiatMoveAdmin/report.php)
* **Estimated Time:** 1.5 minutes
* **Screen Action:**
  1. Switch browser to [report.php](file:///C:/xampp/htdocs/PiatMoveAdmin/report.php).
  2. Demonstrate the date range filter pills: *Today, This Week, This Month, All Time, or Custom Date Range*.
  3. Scroll through the analytical visualizations:
     * 📊 **Booking History Trend Chart**
     * 🍩 **Trips by Status Distribution**
     * 📍 **Active Tricycle Fleet by Barangay** *(Poblacion, Maguilling, Baung, Calaoagan, Santa Barbara, etc.)*
  4. Click the **"Export CSV"** button to show direct spreadsheet download.
  5. Click **"Print / Save PDF"** to preview the official municipal audit report format with Piat municipal header.
* **🗣️ Verbal Script:**
  > *"Returning to the Administrator Web Portal, we present our Analytical Reporting Engine in [report.php](file:///C:/xampp/htdocs/PiatMoveAdmin/report.php).
  >
  > *For Local Government Units (LGU) and Tricycle Regulatory Boards, reliable data is essential. PiatMove automatically compiles traffic patterns, peak booking hours, and driver distribution across all barangays.
  >
  > *Transport regulators can filter by date range and instantly export reports to CSV for spreadsheet modeling or generate formatted PDF copies for presentation before the Sangguniang Bayan or Mayor's Office."*

---

### Step 15: Centralized Booking Log, System Health & Transition to Q&A
* **Screen Display:** Admin Web Portal: [bookings.php](file:///C:/xampp/htdocs/PiatMoveAdmin/bookings.php) & Cloud API Health Check
* **Estimated Time:** 0.5 minute
* **Screen Action:**
  1. Open [bookings.php](file:///C:/xampp/htdocs/PiatMoveAdmin/bookings.php) to display the newly completed transaction with status `completed`, fare `₱16.00`, and rating `5★`.
  2. Briefly show the live API health confirmation: `{"status": "online", "service": "PiatMove API"}`.
  3. Face the panel for closing remarks.
* **🗣️ Verbal Script:**
  > *"Finally, in [bookings.php](file:///C:/xampp/htdocs/PiatMoveAdmin/bookings.php), we observe that our live test trip is immutably logged with its complete lifecycle trail: passenger name, driver name, fare, discount classification, and 5-star passenger rating.
  >
  > *In conclusion, PiatMove modernizes rural transit in the Municipality of Piat by guaranteeing transparent fares, enhancing passenger safety, protecting driver livelihoods, and equipping municipal authorities with real-time operational oversight.
  >
  > *Thank you very much, honorable members of the panel. We are now ready to accept your questions and technical inquiries."*

---

## 🛡️ Capstone Defense Panelist Q&A Cheat Sheet

| # | Technical / Policy Question | Recommended Verbatim Answer |
| :- | :--- | :--- |
| **Q1** | **Why did you build two separate Android apps (`:app-passenger` and `:app-driver`) instead of putting everything into one single application?** | *"We adopted a multi-module architecture with two distinct APKs for security, usability, and app size efficiency. Drivers and passengers have completely divergent workflows: drivers need continuous background GPS polling, earnings reports, and vehicle documents; passengers only need booking and map pinning. Separate APKs prevent APK bloat (each stays under 9MB), eliminate UI confusion, and ensure strict separation of concerns through our shared `:core` module."* |
| **Q2** | **Why rely on Google Maps and GPS when internet connectivity in rural barangays of Piat can be unstable?** | *"PiatMove is designed defensively for rural environments: (1) All municipal landmarks in Piat (e.g., Basilica, Public Market, CSU Campus) are pre-loaded in memory so commuters can book even if geocoding requests lag; (2) The Android app uses a lightweight 4-second HTTP polling mechanism with intelligent error handling, reconnecting automatically when data resumes without crashing; and (3) The app supports direct one-touch phone calling so passengers and drivers can communicate over cellular voice even if 4G drops."* |
| **Q3** | **How do you prevent passengers from abusing the 20% Student or Senior Citizen discount to cheat drivers?** | *"Discounts are not self-authenticating. When a passenger selects 'Student', 'Senior', 'PWD', or 'Pregnant', the app explicitly alerts them that physical ID presentation is mandatory upon boarding. The driver's incoming request card prominently displays a yellow discount badge. If the passenger fails to present a valid Student ID or OSCA card, the driver has the right to collect the standard ₱20.00 regular base fare."* |
| **Q4** | **How do you protect driver credentials and sensitive documents from unauthorized access?** | *"All uploaded verification files (driver's licenses, plate registrations, photos) are sanitized with randomized hashed filenames and saved outside public browsing roots in [uploads/drivers/](file:///C:/xampp/htdocs/PiatMoveAdmin/uploads/drivers/). Only authenticated administrators with active PHP session tokens can view these documents via [drivers.php](file:///C:/xampp/htdocs/PiatMoveAdmin/drivers.php). Android API endpoints enforce JWT bearer token validation on every single request."* |
| **Q5** | **What prevents SQL Injection and Cross-Site Scripting (XSS) attacks on the web and API?** | *"We enforce 100% prepared parameterized SQL statements using PHP PDO across every route in both [piatmove-api/](file:///C:/xampp/htdocs/piatmove-api/) and [PiatMoveAdmin/](file:///C:/xampp/htdocs/PiatMoveAdmin/). Zero raw query string interpolation is allowed. On the admin dashboard, all dynamic variables are sanitized using `htmlspecialchars()` to neutralize XSS, and all forms require cryptographic CSRF tokens."* |
| **Q6** | **What happens if a driver accepts a ride but then experiences a vehicle breakdown or emergency?** | *"Both the driver and passenger have active cancellation controls. In [ActiveRideActivity.kt](file:///C:/Users/GLENN/AndroidStudioProjects/PiatMove/app-driver/src/main/java/com/piatmove/driver/ui/ride/ActiveRideActivity.kt), the driver can tap 'Cancel Active Ride' with a required confirmation. The system transitions the booking status to `cancelled`, unlinks the driver, records the cancellation in the audit history, and notifies the passenger so they can immediately hail another tricycle."* |
| **Q7** | **Can a driver manually alter or inflate the fare inside the mobile app?** | *"No. Fares are calculated deterministically on the server side in [routes/bookings.php](file:///C:/xampp/htdocs/piatmove-api/routes/bookings.php) using the municipal formula (`passenger_count × base_fare × (1 - discount)`). The client only presents the calculated fare and cannot submit arbitrary monetary amounts, ensuring 100% price integrity."* |
| **Q8** | **Is the system capable of running live on the internet right now, or is it limited to localhost?** | *"The entire system is already live and deployed in production on Hostinger cloud hosting at `https://piatmoveadmin.online`. The Android client APKs are configured with dynamic base URL support: pointing to `https://piatmoveadmin.online/api/` in production, with fallback support for local LAN IP testing."* |
| **Q9** | **How does the 5-star rating and qualitative feedback protect passengers and improve transport quality?** | *"Ratings are aggregated in the driver database profile. Tricycle associations and municipal regulators can view average ratings and passenger comments in [drivers.php](file:///C:/xampp/htdocs/PiatMoveAdmin/drivers.php). Drivers maintaining high ratings can receive municipal commendations or route preferences, while drivers with chronic low ratings or safety complaints can be temporarily suspended or have their franchise renewal flagged."* |
| **Q10** | **How does the Local Government Unit (LGU) or MDRRMO benefit from the transport analytics reports?** | *"Municipal planning boards traditionally lack empirical data on rural tricycle travel demand. PiatMove's [report.php](file:///C:/xampp/htdocs/PiatMoveAdmin/report.php) module visualizes high-demand routes, peak hours, and fleet concentration across all 18 barangays. This data assists the Sangguniang Bayan in determining tricycle franchise caps, planning road repairs, and deploying emergency transport during flood or typhoon alerts."* |

---

## 💡 Pro-Tips for Defense Day

1. **Dual Device Mirroring (Scrcpy / Vysor):**
   * Connect both Phone A (Passenger) and Phone B (Driver) via USB with USB Debugging enabled.
   * Run `scrcpy -s <device_id_1> --window-title "Passenger App"` and `scrcpy -s <device_id_2> --window-title "Driver App"` side-by-side on your main screen. The panel will see the real-time interaction without you having to hold two phones in the air.
2. **Dedicated Mobile Hotspot:**
   * Do not rely on university campus Wi-Fi, which often blocks local ports or has unstable bandwidth. Turn on your personal 4G/5G mobile hotspot and connect both phones and your laptop to the same network.
3. **Keep Admin Web in Fullscreen:**
   * Press `F11` in Chrome to display the Admin Dashboard without URL clutter for a polished, enterprise appearance.
4. **Pre-Staged Backup State:**
   * Keep a completed booking and an approved driver ready so you never have to scramble if network latency momentarily slows down an individual transaction.
5. **Rehearse the Transition Hand-offs:**
   * If presenting in a group, assign specific roles:
     * **Presenter 1:** Rationale, Architecture, and Administrator Web Portal.
     * **Presenter 2:** Passenger booking flow, map interaction, and discount computation.
     * **Presenter 3:** Driver dispatch, ride execution, daily earnings, and panel Q&A defense.
