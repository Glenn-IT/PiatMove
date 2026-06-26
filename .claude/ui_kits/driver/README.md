# Driver App — UI Kit

Interactive click-through of the PiatMove driver mobile app (390×844 frame).

**Flow:** Driver Login → Dashboard (online toggle, stats, new assignment) → Trip Assignment (Accept/Decline) → Active Trip (advancing timeline: Arrived → Picked Up → In Transit → Completed) → Schedule (calendar) → Profile. Accepting the assignment opens the active-trip flow; the primary button advances the trip stage each tap.

**Files**
- `index.html` — loader.
- `driver-app.jsx` — all six screens + shell/router (self-contained helpers prefixed `D`).

**Composes** `Button, Input, Card, Badge, Avatar, IconButton, TopBar, BottomNav, StatusTimeline, StatCard`.

Sample persona: **Jose Cruz**, Driver ID DRV-0142, Toyota HiAce ABC 1234, 4.9★ / 312 trips.
