# 🌐 PiatMove — Hostinger Deployment Guide & Checklist
### Complete Step-by-Step Guide for Hostinger Single Web Hosting & Domain Setup

This guide provides instructions for deploying the **PiatMove REST API**, **PiatMove Admin Portal**, and **MySQL Database** to **Hostinger Single Web Hosting** with your custom domain.

---

## 📁 Pre-Packaged Upload Files

All deployment files and zip archives have been organized and prepared for upload:

📍 **Deployment Package Directory:** [`C:\xampp\htdocs\piatmove-deploy\`](file:///C:/xampp/htdocs/piatmove-deploy/)

| File / Folder | Destination on Hostinger | Description |
| :--- | :--- | :--- |
| 📦 **`api.zip`** | Upload & extract to `public_html/api/` | REST API (routes, controllers, `.htaccess`, `.env.secret`) |
| 📦 **`admin.zip`** | Upload & extract to `public_html/admin/` | Admin Web Portal & dashboard assets |
| 🗄️ **`database/piatmove.sql`** | Import via Hostinger phpMyAdmin | Complete database schema with all tables & constraints |

---

## 📌 Hostinger Target Architecture

```
public_html/
├── api/                    <-- Upload & extract api.zip here
│   ├── config/
│   │   └── database.php
│   ├── helpers/
│   ├── middleware/
│   ├── routes/
│   ├── .env.secret
│   ├── .htaccess
│   └── index.php
│
└── admin/                  <-- Upload & extract admin.zip here
    ├── assets/
    ├── database/
    ├── includes/
    ├── uploads/
    │   └── drivers/        <-- Driver proof uploads (chmod 755)
    ├── config.php
    ├── index.php
    └── ...
```

### 🔗 Live Production URLs:
- **Admin Web Portal:** `https://yourdomain.com/admin/`
- **Backend API Base:** `https://yourdomain.com/api/`
- **API Health Endpoint:** `https://yourdomain.com/api/health`

---

## 📋 Comprehensive Hostinger Deployment Checklist

Follow this checklist from purchase to final live launch:

### Phase 1: Purchase & Hosting Activation
- [x] **Step 1.1:** Go to [Hostinger](https://www.hostinger.com) and purchase the **Single Web Hosting Plan** (or Premium) + your custom **Domain Name** (e.g., `piatmove.com` or `piatmove.ph`).
- [x] **Step 1.2:** Complete the hPanel onboarding setup and link your domain to the hosting plan.
- [x] **Step 1.3:** Go to **Security** → **SSL** in hPanel and ensure the **Lifetime Free SSL** is active (`https://` enabled).

---

### Phase 2: Create Live Database & Import Schema
- [x] **Step 2.1:** In hPanel, navigate to **Databases** → **Management**.
- [x] **Step 2.2:** Create a new MySQL database:
  - Database Name: e.g. `u123456789_piatmove`
  - Username: e.g. `u123456789_admin`
  - Password: *[Set a strong password]*
- [x] **Step 2.3:** Save the credentials (Host is `localhost`).
- [x] **Step 2.4:** Click **Enter phpMyAdmin** next to the new database.
- [x] **Step 2.5:** Click the **Import** tab → Choose [`C:\xampp\htdocs\piatmove-deploy\database\piatmove.sql`](file:///C:/xampp/htdocs/piatmove-deploy/database/piatmove.sql) → Click **Import**.
- [x] **Step 2.6:** Verify the 5 tables exist: `admins`, `users`, `driver_info`, `bookings`, `fcm_tokens`.

---

### Phase 3: Upload & Extract Files
- [x] **Step 3.1:** In hPanel, go to **Files** → **File Manager** (Access `public_html/`).
- [x] **Step 3.2:** Create two folders inside `public_html/`:
  - `api`
  - `admin`
- [x] **Step 3.3:** Upload [`C:\xampp\htdocs\piatmove-deploy\api.zip`](file:///C:/xampp/htdocs/piatmove-deploy/api.zip) into `public_html/api/` and click **Extract**.
- [x] **Step 3.4:** Upload [`C:\xampp\htdocs\piatmove-deploy\admin.zip`](file:///C:/xampp/htdocs/piatmove-deploy/admin.zip) into `public_html/admin/` and click **Extract**.
- [x] **Step 3.5:** Delete the uploaded `.zip` files from the server after extraction to save space.

---

### Phase 4: Configure Live Database Connection
- [x] **Step 4.1:** In File Manager, open `public_html/api/config/database.php` and fill in your Hostinger database details:
  ```php
  define('DB_HOST', 'localhost');
  define('DB_NAME', 'u123456789_piatmove');
  define('DB_USER', 'u123456789_admin');
  define('DB_PASS', 'YOUR_ACTUAL_DB_PASSWORD');
  ```
- [x] **Step 4.2:** Open `public_html/admin/config.php` and fill in the same database credentials:
  ```php
  define('DB_HOST', 'localhost');
  define('DB_NAME', 'u123456789_piatmove');
  define('DB_USER', 'u123456789_admin');
  define('DB_PASS', 'YOUR_ACTUAL_DB_PASSWORD');
  ```
- [x] **Step 4.3:** Ensure `public_html/admin/uploads/drivers/` folder permissions are set to `755` (Read/Write/Execute).

---

### Phase 5: Configure Hostinger PHP Settings
- [x] **Step 5.1:** In hPanel, go to **Advanced** → **PHP Configuration**.
- [x] **Step 5.2:** Ensure PHP version is **PHP 8.1** or **PHP 8.2**.
- [x] **Step 5.3:** Under **PHP Options**, set:
  - `upload_max_filesize`: `64M`
  - `post_max_size`: `64M`
  - `memory_limit`: `256M`
  - `max_execution_time`: `300`
- [x] **Step 5.4:** Click **Save**.

---

### Phase 6: Verify Live URLs in Browser
- [x] **Step 6.1:** Open `https://piatmoveadmin.online/api/health` in your browser.
  - Expected output:
    ```json
    {"success":true,"data":{"status":"online","service":"PiatMove API"},"message":"Success"}
    ```
- [x] **Step 6.2:** Open `https://piatmoveadmin.online/admin/` in your browser.
  - Log in with default admin credentials:
    - **Email:** `admin@piatmove.com`
    - **Password:** `admin123`
- [x] **Step 6.3:** Verify the Admin Dashboard, Drivers list, and Users list load without error.

---

### Phase 7: Connect Android Mobile Apps
- [x] **Step 7.1:** Open the **Passenger App** or **Driver App** on an Android phone.
- [x] **Step 7.2:** On the Login screen, tap **`⚙ Server`** at the bottom.
- [x] **Step 7.3:** Enter your live API URL:
  ```
  https://piatmoveadmin.online/api/
  ```
- [x] **Step 7.4:** Tap **Save**.
- [x] **Step 7.5:** Test passenger registration & login.
- [x] **Step 7.6:** Test driver registration with document uploads (`Proof of License`, `Proof of Plate`, `Driver Photo`, `Tricycle Photo`).
- [x] **Step 7.7:** Log into the Admin Portal (`https://piatmoveadmin.online/admin/`), review the uploaded driver documents, and click **Approve**.
- [x] **Step 7.8:** Verify the driver app automatically unlocks the online toggle once approved.
