# 🧠 PiatMove System Memory & Live Production Registry

> **System Status:** 🟢 **LIVE IN PRODUCTION**  
> **Last Deployment Sync:** 2026-08-26  
> **Hosting Provider:** Hostinger (Single Web Hosting Plan)  
> **Production Domain:** `https://piatmoveadmin.online`  

---

## 📌 System Architecture & Production Mapping

| Component | Local Path (XAMPP / Project) | Hostinger File Manager Path | Live Production URL | GitHub Repository |
| :--- | :--- | :--- | :--- | :--- |
| **Backend REST API** | `C:\xampp\htdocs\piatmove-api\` | `public_html/api/` | `https://piatmoveadmin.online/api/` | [`Glenn-IT/piatmove-api`](https://github.com/Glenn-IT/piatmove-api) |
| **Admin Web Portal** | `C:\xampp\htdocs\PiatMoveAdmin\` | `public_html/admin/` | `https://piatmoveadmin.online/admin/` | [`Glenn-IT/PiatMoveAdmin`](https://github.com/Glenn-IT/PiatMoveAdmin) |
| **Driver Uploads** | `C:\xampp\htdocs\PiatMoveAdmin\uploads\drivers\` | `public_html/admin/uploads/drivers/` | `https://piatmoveadmin.online/admin/uploads/drivers/...` | — |
| **Android Apps** | `C:\Users\GLENN\AndroidStudioProjects\PiatMove\` | — | Defaulted to `https://piatmoveadmin.online/api/` | [`Glenn-IT/PiatMove`](https://github.com/Glenn-IT/PiatMove) |
| **MySQL Database** | `piatmove` | Hostinger MySQL DB | Host: `localhost` | `piatmove.sql` |

---

## 🚀 How to Update & Upload Specific Files (Single-File Sync Guide)

Since the system is already live on Hostinger, **you do NOT need to re-upload the entire `.zip` package** when making small code changes or fixes. Follow the quick guide below based on what you modified:

---

### 1. 🔄 Updating a Backend API File (e.g., `routes/driver.php`, `helpers/response.php`)

When you or the AI modifies an API file on your local machine:

1. Look at the local modified file path in `C:\xampp\htdocs\piatmove-api\`.
   - *Example:* `routes/driver.php`
2. Open **Hostinger hPanel** → **Files** → **File Manager** (Access `public_html/`).
3. Navigate to the exact folder inside `public_html/api/`:
   - *Example:* Go to `public_html/api/routes/`
4. **Choose one of two quick methods:**
   - **Method A (Direct Upload):** Click the **Upload** button at the top right → Select your updated local file (`C:\xampp\htdocs\piatmove-api\routes\driver.php`) → Click **Overwrite**.
   - **Method B (Copy-Paste in Browser):** In Hostinger File Manager, double-click `driver.php` to open its built-in code editor → Paste the updated code → Click **Save**.
5. Test immediately at `https://piatmoveadmin.online/api/health` or run the API request.

---

### 2. 🔄 Updating an Admin Portal File (e.g., `drivers.php`, `users.php`, `assets/css/admin.css`)

When you or the AI modifies an Admin Web page or styling:

1. Look at the local file in `C:\xampp\htdocs\PiatMoveAdmin\`.
   - *Example:* `drivers.php` or `assets/css/admin.css`
2. Open **Hostinger File Manager** → Go into `public_html/admin/`.
3. Navigate to the target folder:
   - For PHP pages: `public_html/admin/`
   - For CSS styles: `public_html/admin/assets/css/`
4. Upload the single modified file and click **Overwrite** (or edit directly in Hostinger File Manager).
5. Refresh `https://piatmoveadmin.online/admin/` in your browser (press `Ctrl + F5` to clear browser cache).

---

### 3. 🗄️ Modifying the Database (Adding Columns or New Tables)

When modifying the database structure (e.g., adding a new column to `driver_info` or `bookings`):

> ⚠️ **DO NOT re-import `piatmove.sql`** because it will delete all live users and bookings.

Instead, run a targeted SQL query in phpMyAdmin:
1. Go to **Hostinger hPanel** → **Databases** → **Management** → Click **Enter phpMyAdmin**.
2. Select your database from the left menu.
3. Click the **SQL** tab at the top.
4. Paste the specific `ALTER TABLE` statement. For example:
   ```sql
   ALTER TABLE driver_info ADD COLUMN emergency_contact VARCHAR(20) NULL AFTER barangay;
   ```
5. Click **Go**.

---

### 4. 📱 Updating the Android Mobile Apps (Passenger & Driver)

When changing Kotlin code, layouts, or features in the Android app:

1. Run the build command in terminal:
   ```powershell
   $env:JAVA_HOME="C:\Program Files\Android\Android Studio1\jbr"; .\gradlew.bat assembleDebug
   ```
2. The fresh APKs will be located at:
   - **Passenger APK:** `app-passenger/build/outputs/apk/debug/app-passenger-debug.apk`
   - **Driver APK:** `app-driver/build/outputs/apk/debug/app-driver-debug.apk`
3. Send the APK to your test phones and install the update.

---

## 🔒 Permanent Configuration Reference

### Production API Database (`public_html/api/config/database.php`)
- **Host:** `localhost`
- **JWT Secret:** Loaded automatically from `.env.secret`
- **CORS:** Enabled (`Access-Control-Allow-Origin: *`)
- **Authorization Header:** Passed via Apache RewriteRule in `.htaccess`
- **SMTP Mailer:** Configured in `public_html/api/config/mail.php` & `helpers/mail.php` (Gmail SMTP with App Password)

### Production Admin Config (`public_html/admin/config.php`)
- **Host:** `localhost`
- **BASE_URL:** Dynamically resolves to `https://piatmoveadmin.online/admin`

---

## 🤖 Instructions for AI Assistants (System Rule)
When assisting with future tasks in this repository:
1. Recognize that **the system is actively deployed in production on Hostinger at `https://piatmoveadmin.online`**.
2. When creating or editing backend API routes or Admin features, always specify which exact file needs to be updated on Hostinger (`public_html/api/...` or `public_html/admin/...`).
3. Keep database changes backward-compatible using `ALTER TABLE` / `CREATE TABLE IF NOT EXISTS` migrations rather than destructive full resets.
4. Ensure default Android `BASE_URL` in `Constants.kt` remains set to `https://piatmoveadmin.online/api/`.

