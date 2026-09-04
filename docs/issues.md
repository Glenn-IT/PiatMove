# Issues Resolution Status

## Driver Side Features & Enhancements

- [x] **Include history transaction feature**
  - Added `GET /driver/history` and `GET /driver/trips` backend endpoints in `piatmove-api` and `piatmove-deploy`.
  - Added `DriverTripsAdapter` and `DriverActivityFragment` supporting full transaction history with fare amount (₱), discount tags (Student, Senior, PWD, Pregnant), passenger details, and route breakdown.
  - Linked to Navigation Drawer and Driver Dashboard.

- [x] **Include Daily income for report feature**
  - Added `GET /driver/reports` and `GET /driver/daily-income` backend endpoints for daily gross income calculation and trip categorization.
  - Created `DriverIncomeReportActivity` with interactive date navigation (Previous/Next day, Calendar DatePicker), Gross Earnings summary, Average / Trip, Regular vs Discounted breakdown, statutory discount counts (🎓 Student, 👴 Senior, ♿ PWD, 🤰 Pregnant), detailed transaction lists, and "Share Income Report" feature.
  - Added Today's Income live summary card and quick report action on `DriverDashboardFragment`.

- [x] **Include also all accepted and rejected feature**
  - Backend `GET /driver/trips` supports status filtering (`all`, `accepted`, `started`, `completed`, `rejected`, `cancelled`).
  - Enhanced `POST /driver/reject/{id}` to preserve `driver_id` and track rejected requests.
  - Added `POST /driver/cancel/{id}` for driver ride cancellation.
  - Added interactive Choice Chips in `DriverActivityFragment` for **All Activity**, **Accepted** (Active), **Completed**, and **Rejected / Cancelled**.
  - Added "Decline / Reject Request" button with confirmation dialog in `RideRequestActivity`.
  - Added "Cancel Ride" button with confirmation dialog in `ActiveRideActivity`.