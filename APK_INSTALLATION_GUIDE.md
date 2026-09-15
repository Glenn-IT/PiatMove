# 📱 PiatMove: Android APK Sharing & Installation Guide

> **Purpose:** Step-by-step troubleshooting guide for installing the PiatMove Passenger and Driver APKs on other Android phones without errors.

---

## 🚨 Top 4 Reasons APK Installation Fails & Quick Fixes

| Problem | Cause | Quick Solution |
| :--- | :--- | :--- |
| **"Blocked by Play Protect"** or **"Unrecognized App"** | Google Play Protect flags unverified debug APKs | Tap **"More details"** → Tap **"Install anyway"** |
| **"App not installed"** or **"Corrupt package"** | Signature conflict with an existing version | **Uninstall** any older PiatMove version first |
| **"Cannot install from this source"** | Android security blocks third-party installs | Enable **"Allow from this source"** in Settings |
| **Corrupt / 0-byte APK** | Third-party APK extractor or chat file truncation | Share original `.apk` directly from your PC |

---

### 1. 🛡️ Google Play Protect Blocked It (Most Common)

#### Why It Happens:
Because the app is in development and hasn't been uploaded to the Google Play Store yet, Google Play Protect's security scanner doesn't recognize its digital signature and flags it as unknown.

#### How to Fix:
1. When the orange/red warning dialog appears (**"Blocked by Play Protect"** or **"Harmful app blocked"**):
   - Tap **"More details"** (small text or dropdown arrow).
   - Tap **"Install anyway"**.
2. **If Play Protect blocks it silently without asking:**
   - Open the **Google Play Store** app on that phone.
   - Tap your **Profile icon** (top right) → select **Play Protect**.
   - Tap the **Settings gear ⚙️** (top right).
   - Temporarily toggle **OFF** *"Scan apps with Play Protect"*.
   - Return to the file and tap Install.

---

### 2. ⚠️ Signature Conflict / "App not installed"

#### Why It Happens:
Android strictly forbids installing an APK with the same package name (`com.piatmove.passenger` or `com.piatmove.driver`) if an existing app was signed with a different debug certificate or built on another computer.

#### How to Fix:
1. Go to the phone's home screen or **Settings** → **Apps**.
2. **Uninstall any previous version of PiatMove** completely.
3. Restart the installation of the new APK file.

---

### 3. 📁 "Install Unknown Apps" Permission Required

#### Why It Happens:
For user safety, modern Android versions (Android 8 to 15) block file managers, web browsers, and chat apps from triggering installations unless explicitly permitted.

#### How to Fix:
1. Open phone **Settings**.
2. Go to **Apps** → **Special app access** (or type *"unknown apps"* into the Settings search bar).
3. Select **Install unknown apps**.
4. Tap the application you used to open the APK (e.g., **Files by Google**, **Chrome**, **Google Drive**, **WhatsApp**, or **Telegram**).
5. Toggle **"Allow from this source"** to **ON**.
6. Return to your download and tap the APK to install.

---

### 4. 📦 Proper Way to Share the APK

> **Note:** **Do NOT** use third-party "Share App" or "APK Extractor" apps from one phone to another. Android Studio installs split-architectures tailored only to the first device, resulting in corrupt packages on other phones.

#### The Correct APK Files to Send:
Always send the **original compiled standalone APKs** produced by Gradle:

- **Passenger App:**
  ```text
  app-passenger/build/outputs/apk/debug/app-passenger-debug.apk
  ```

- **Driver App:**
  ```text
  app-driver/build/outputs/apk/debug/app-driver-debug.apk
  ```

#### Recommended Sharing Methods:
1. **Google Drive:** Upload the APK to Google Drive from your computer, generate a download link, and download it on the target phone.
2. **USB Cable / Flash Drive:** Copy the APK directly to the phone's `Downloads` folder using a USB cable.
3. **Telegram / Nearby Share / Quick Share:** Send the file as an uncompressed document.
