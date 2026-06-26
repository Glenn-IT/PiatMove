---
name: piatmove-design
description: Use this skill to generate well-branded interfaces and assets for PiatMove — the official vehicle-booking service of the Municipality of Piat (passenger app, driver app, admin dashboard) — for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, icons, and UI kit components for prototyping municipal/government booking interfaces.
user-invocable: true
---

Read the `readme.md` file in this skill first — it covers product context, content fundamentals (voice, casing, tone), visual foundations (color, type, spacing, motion, shadows), and iconography. Then explore the other files as needed.

**Key files**
- `styles.css` — link this one file to get all tokens + fonts. It `@import`s everything in `tokens/`.
- `tokens/` — colors, typography, spacing/radius/shadow, fonts, base resets (CSS custom properties).
- `assets/icons.js` — `window.Icon` React component (Lucide-style; `<Icon name size color stroke/>`).
- `assets/frames.js` — `window.PhoneFrame` 390×844 device bezel for mobile mockups.
- `assets/logo-*.svg` — mark, full lockup, reversed-on-blue.
- `components/` — React primitives (Button, Input, Card, Badge, Avatar, Chip, StatCard, TopBar, BottomNav, StatusTimeline, ListItem). Build the bundle, then read via `window.PiatBookingDesignSystem_2c1fe9`; each has a `.prompt.md` with usage.
- `ui_kits/` — full interactive screen recreations (passenger, driver, admin) to copy patterns from.
- `guidelines/*.card.html` — foundation specimens.

**How to work**
- If creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets you need (`icons.js`, `frames.js`, logos, `styles.css`) into your output folder and build static HTML. Compose the documented components or mirror the UI-kit patterns.
- If working in production code, copy assets and apply the token + component rules to become an expert in the PiatMove brand.
- Honor the voice: official-but-warm, Title Case titles / sentence-case body, **no emoji**, status communicated via icon + color. Government blue primary, service green secondary, white cards on soft gray, soft slate shadows, 14/20px radii.

If invoked with no specific guidance, ask what the user wants to build (which surface, which screens, production vs mock), ask a few clarifying questions, then act as an expert designer outputting HTML artifacts or production code as appropriate.
