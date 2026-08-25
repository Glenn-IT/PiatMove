# Resolved Issues

## Book Ride
- [x] **Add passenger count selector (Maximum 5 persons)**: Added passenger stepper (+ / –) with limit 1 to 5 passengers.
- [x] **Auto compute estimated fare (₱20 per person)**: Dynamic live calculation (₱20.00 × count) displayed on fare card and passed to booking API.
- [x] **Bottom navigation uniform with other tabs**: Persistent bottom navigation bar integrated in Book Ride screen matching Home, History, and Profile tabs.

## Profile
- [x] **Passenger can edit their details**: Editable Name and Phone Number fields with `PUT /user/profile` API synchronization.
- [x] **Add profile picture feature**: Image gallery picker + multipart photo upload (`POST /user/profile-photo`), stored in `uploads/profiles/` and cached locally in `PrefsManager`.

## Account and Support
- [x] **Add menu for System Manual**: Added System Manual modal with guide on municipal transport, booking steps, live tracking, and fares.
- [x] **Add menu for Developers (2 Devs)**: Added Development Team dialog with formatted cards for the 2 lead developers.
- [x] **Add menu for About Us**: Added About Us dialog with Municipality of Piat Municipal Transport Office overview, mission, and version info.

## Sidebar Menu
- [x] **Profile picture in Drawer Header**: Dynamic circular avatar in sidebar header that loads the passenger's actual profile photo (with default avatar fallback).