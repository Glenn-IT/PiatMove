# Driver app icon — install instructions

These replace the placeholder driver-app icon (which was a copy of the passenger one)
with a distinct **steering-wheel** mark. Drop each file into `app-driver/src/main/res/`:

```
app-driver/src/main/res/
├─ drawable/
│  ├─ logo_mark.xml               ← REPLACE with this (in-app logo: R.drawable.logo_mark)
│  └─ ic_launcher_foreground.xml  ← REPLACE with this (launcher foreground)
└─ mipmap-anydpi-v26/
   ├─ ic_launcher.xml             ← REPLACE with this
   └─ ic_launcher_round.xml       ← REPLACE with this
```

`values/colors.xml` (the `#2454E0` launcher background) is unchanged — keep the one
that's already there.

After copying: Android Studio → **Build ▸ Clean Project**, then **Run** `app-driver`.
The driver app now shows the steering-wheel icon with a green "online" badge, while the
passenger app keeps the route-and-pins icon.

> Still the placeholder PiatMove brand — swap for the official municipal seal when ready.
