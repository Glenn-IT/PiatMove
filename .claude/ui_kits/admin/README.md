# Admin Dashboard — UI Kit

Desktop admin console for the Municipal Transport Office (1280×800 app shell with sidebar + topbar).

**Views** (switch via sidebar): Dashboard home (4 KPI cards, weekly bookings line chart, vehicle-mix donut, quick actions, recent bookings table), Booking Management (data table + filter/export), Driver Management (driver cards with presence), Vehicle Management (fleet cards), Reports (line chart + donut + bar chart with export buttons).

**Files**
- `index.html` — loader.
- `admin-views.jsx` — chart helpers (`BarChart`, `LineChart`, `Donut`, `Panel`) + Bookings/Drivers/Vehicles/Reports views.
- `admin-app.jsx` — sidebar shell, topbar, dashboard home + router.

**Composes** `StatCard, Card, Badge, Avatar, Button`. Charts are lightweight inline SVG/CSS (no chart library) so they stay editable.
