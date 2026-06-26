# PiatMove — Municipal Booking Design System

**PiatMove** is the official vehicle-booking service of the **Municipality of Piat, Cagayan**. It lets residents reserve municipal vehicles (vans, sedans, the Coaster bus, ambulances) for hospital trips, official business, and community travel — coordinated by the Municipal Transport Office (MTO). The product spans three surfaces:

- **Passenger app** (Android-first mobile) — book vehicles, track trips, manage profile.
- **Driver app** (mobile) — receive assignments, run trips, manage schedule.
- **Admin dashboard** (desktop) — MTO staff manage bookings, drivers, fleet, and reports.

The brand voice is **official but approachable**: a government service citizens of all ages trust, presented with the polish of a modern booking app (Grab/Angkas-class UX) rather than a dated e-gov portal.

> **Sources.** This system was created from a written product brief (no external codebase or Figma was provided). "PiatMove" is the product name coined for the service; the Municipality of Piat is the issuing authority. There are no upstream design files to reconcile — this repo is the single source of truth.

---

## Content fundamentals

**Voice — official, warm, plain.** Write like a helpful municipal clerk: respectful, clear, never bureaucratic. Short sentences. No jargon, no hype.

- **Person.** Address the user as **you** ("Where are you headed?", "Your trip is confirmed"). The municipality refers to itself by name or as "the Municipal Transport Office," not "we" in formal notices.
- **Casing.** **Title Case** for screen titles, buttons, and card headers ("Book Vehicle", "Driver Information"). **Sentence case** for body copy, helper text, and notifications. **UPPERCASE** only for tiny overlines/eyebrows ("ACTIVE BOOKING", "DRIVER PORTAL") with wide letter-spacing.
- **Tone examples.**
  - CTA: "Book Now", "Log In", "Accept Trip" — verb-first, concise.
  - Empty/helper: "Where are you headed?", "Tap to upload — Barangay ID, Driver's License, or PhilSys".
  - Status notices: "Booking Approved — your trip to Tuguegarao is confirmed." / "Driver Assigned — Jose Cruz will pick you up."
  - Trust line: "Secured by the Municipality of Piat", "Authorized municipal drivers only".
- **Numbers & references.** Booking refs are `BK-####`, driver IDs `DRV-####`, in monospace. Times use 12-hour ("9:00 AM"), dates "Jun 24, 2026".
- **Emoji:** none. This is a government service — status is communicated with iconography and color, never emoji.
- **Vibe:** trustworthy, calm, efficient. Real place names (Piat, Tuguegarao, the Basilica, the Provincial Hospital) make it feel local and concrete.

---

## Visual foundations

**Palette.** Government **blue** is primary (`--blue-600 #2454E0`) — used for headers, primary actions, links, and the hero gradient. Service **green** (`--green-500 #12B76A`) is secondary — confirmations, "approved/completed", "go" affordances. Backgrounds are **white cards on a soft gray app canvas** (`--gray-50`). A slate neutral ramp carries text and borders. Status semantics: green=success, amber=pending/warning, red=cancelled/danger, cyan=in-transit/info. Everything references semantic aliases (`--color-primary`, `--surface-card`, `--text-body`…).

**Gradients.** Used sparingly and only in blue: `--gradient-hero` (blue-600→700→800) backs dashboard/profile headers and the splash; never rainbow, never purple. Cards and content areas stay flat white — gradients are reserved for brand "header" zones.

**Typography.** Display = **Plus Jakarta Sans** (extrabold/bold, tight tracking) for titles, numerals, and KPIs. UI/body = **Public Sans** (the U.S. design-system typeface — a deliberate nod to official/government tone) at 400–600. Mono = **JetBrains Mono** for reference codes/plates. Mobile body floor is 13px; titles 16–18px; screen H1 27–28px. See `tokens/typography.css`.

**Spacing & layout.** 4px base grid (`--space-*`). Mobile content padding 20px. Phone canvas 390×844 with a 64px bottom nav and 56px top bar. Min tap target 44px. Desktop admin is a 244px sidebar + 68px topbar + scrolling content at 28px padding.

**Corner radii.** Friendly but not bubbly: inputs/buttons `--radius-md (14px)`, cards `--radius-lg (20px)`, hero panels round their bottom corners to 26px, pills/badges fully round. Icon tiles use `--radius-sm (10px)`.

**Cards.** White surface, `1px solid --border-subtle` hairline, `--radius-lg`, soft `--shadow-sm`. Interactive cards lift 2px and deepen to `--shadow-md` on hover. No colored left-border accents.

**Shadows / elevation.** Soft, low-contrast, slate-tinted (never harsh black): `--shadow-xs` (quick-action tiles), `--shadow-sm` (resting cards), `--shadow-md` (hover/active booking), `--shadow-lg` (sheets, device/admin frame), `--shadow-nav` (upward shadow on bottom nav), and `--shadow-focus` (4px blue 16% ring on inputs).

**Borders.** 1px hairlines in `--border-subtle (#E7EDF3)` separate rows and outline cards. Inputs use a 1.5px border that turns blue on focus. Dashed 1.5px border for upload dropzones.

**Backgrounds & imagery.** No photography in the system itself; maps are represented by a light blue **map strip** (CSS grid + a dashed SVG route with green origin / blue destination pins). Color vibe is cool and clean (blues/whites), professional, not warm or grainy.

**Motion.** Subtle and functional. Standard easing `cubic-bezier(0.2,0,0,1)` at 140–360ms. Buttons scale to 0.98 on press; icon buttons to 0.93. Cards translate up 2px on hover. The splash uses a 3-dot pulse loader. No bounces on content, no infinite decorative loops.

**Hover / press states.** Hover = slightly deeper shadow + small lift (cards) or subtle filter (buttons). Press = scale-down. Selected chips/cards = blue-50 fill + blue-500 border. Active nav tab = blue text + bold weight.

**Transparency / blur.** Used only on brand-blue headers: white pills/buttons at `rgba(255,255,255,.15–.18)` for online toggles, eyebrow chips, and header actions. No glassmorphism blur in content.

---

## Iconography

- **System:** a **Lucide-style** outline set — 24px grid, 2px stroke, round caps & joins, `currentColor`. Shipped as a lightweight React component in **`assets/icons.js`** (`window.Icon`, `<Icon name="…" size={} color={} stroke={} />`) with ~45 curated glyphs (home, ticket, bell, user, car, truck, map-pin, navigation, calendar, clock, arrows, check, phone, mail, lock, shield-check, bar-chart, file-text, etc.).
- **Production note / substitution:** the curated subset mirrors [Lucide](https://lucide.dev) so production code can drop in the full Lucide CDN/npm set 1:1 with no visual change. **Flag:** these paths are hand-matched to Lucide's style, not the official Lucide source — swap to real Lucide for the complete library.
- **Status is icon + color**, never emoji. Icon tiles (40px rounded squares with a soft tinted background + colored glyph) are the standard list/leading affordance.
- **No emoji, no unicode glyph hacks** beyond the battery/signal marks in the device status bar.
- **Logo:** see `assets/logo-mark.svg` (app icon), `logo-full.svg` (primary lockup), `logo-white.svg` (reversed on blue). The mark is a rounded-square badge with a dashed route between a green origin dot and a white destination pin.

---

## Index / manifest

**Root**
- `styles.css` — global entry (import-only). Consumers link this.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`.
- `assets/` — `logo-mark.svg`, `logo-full.svg`, `logo-white.svg`, `icons.js` (icon system), `frames.js` (phone bezel).
- `readme.md` (this file) · `SKILL.md` (Agent Skills entry point).

**Components** (`components/<group>/` — `window.PiatBookingDesignSystem_2c1fe9`)
- `core/` — Button, IconButton, Input, Card, Badge, Avatar, Chip, StatCard
- `navigation/` — TopBar, BottomNav
- `feedback/` — StatusTimeline, ListItem

Each has `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`; each directory ships one `@dsCard` demo HTML.

**UI Kits** (`ui_kits/<product>/index.html`)
- `passenger/` — 8-screen interactive passenger app
- `driver/` — 6-screen interactive driver app
- `admin/` — desktop admin dashboard (5 views)

**Foundation cards** (`guidelines/*.card.html`) — color, type, spacing, brand specimens shown in the Design System tab.
