# Resolved Issues

## App Passenger
- [x] **Remove the server button on the login tab**: Removed `tvServerConfig` from `activity_login.xml` and removed server config dialog trigger from `LoginActivity.kt`.
- [x] **Home Tab**:
  - [x] **Modify the layout on the Home (add basic information and instruction on how to book)**: Added Hero Welcome Card, 4-step "How to Book a Ride" guide, and LGU Transport Advisory & Helpdesk card.
  - [x] **Add a panel with shortcut buttons for booking/ride status/profile**: Added Quick Actions panel with 4 shortcut cards (`Book Ride`, `Ride Status`, `Ride History`, `My Profile`) + Live Active Ride Tracking Card.