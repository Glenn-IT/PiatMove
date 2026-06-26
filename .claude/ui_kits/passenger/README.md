# Passenger App — UI Kit

Interactive click-through of the PiatMove passenger mobile app (Android-first, 390×844 frame).

**Flow:** Splash → Login → (Register) → Dashboard → Book Vehicle → Booking Details (tracking) → Notifications → Profile. Tap the splash to begin; use the bottom nav and in-screen buttons to move around. "Book" (center tab) opens the booking form; submitting routes to the live tracking screen.

**Files**
- `index.html` — loads React, the DS bundle, icons, device frame, then the two screen scripts.
- `passenger-auth.jsx` — Splash, Login, Register + shared helpers (`Scroll`, `Eyebrow`, `IconTile`, `MapStrip`).
- `passenger-app.jsx` — Dashboard, Book Vehicle, Booking Details, Notifications, Profile + the app shell/router.

**Composes** `Button, Input, Card, Badge, Avatar, Chip, IconButton, TopBar, BottomNav, StatusTimeline, ListItem, StatCard` from the design system. Icons come from `assets/icons.js`; the phone bezel from `assets/frames.js`.

Sample persona: **Maria Santos**, verified resident, booking a municipal HiAce to Tuguegarao (Ref BK-2041).
