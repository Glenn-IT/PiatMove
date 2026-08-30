# 🛠️ PiatMove Issues & Enhancements Log

## 1. App Driver UI Uniformity & Experience ✅ RESOLVED
- Synchronized driver app design system, Material cards, and navigation with the passenger app while maintaining dedicated driver features.

## 2. Driver Profile Tab ✅ RESOLVED
- Created dedicated **Driver Profile Tab** (`DriverProfileFragment.kt` & `fragment_driver_profile.xml`).
- Allows driver to update contact number (`phone`), assigned `barangay`, and `password`.
- Restricts official credentials (license number, tricycle plate number, full name, email) as verified read-only records.
- Backend API route added: `PUT /driver/profile`.

## 3. First-Come, First-Served Ride Requests ✅ RESOLVED
- Removed the confusing "Reject" action from the ride request review screen.
- Streamlined to **"Accept Ride (Claim Booking)"** operating strictly on a first-come, first-served basis. Drivers can return to the available request pool at any time using the back button without modifying the ride's availability for other drivers.

## 4. Driver Registration Default to Tricycle ✅ RESOLVED
- Fixed vehicle type to **Tricycle** only (`Tricycle` default, non-editable without irrelevant vehicle types).

## 5. Admin Document Image 404 Resolution ✅ RESOLVED
- Fixed file path replication in `api/routes/auth.php` to guarantee files are saved in both `admin/uploads/drivers/` and `api/uploads/drivers/`.
- Updated `PiatMoveAdmin/drivers.php` with `get_driver_doc_url()` and automatic client-side image fallback handlers so modal previews and "View Full" links never 404.