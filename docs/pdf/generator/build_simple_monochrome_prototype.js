const fs = require('fs');
const path = require('path');

const targetHtml = path.resolve(__dirname, '..', 'prototype_piatmove.html');
console.log('Building Simple Monochrome Prototype (Just like MBPSAAS) at:', targetHtml);

let p = [];

p.push(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PiatMove - Municipal Tricycle Booking &amp; Mobility Dispatch Platform (Simple Wireframe Prototype)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --frame-border: #000000;
            --frame-inner-border: #000000;
            --banner-bg: #000000;
            --banner-text: #ffffff;
            --header-sub-bg: #ffffff;
            --header-sub-text: #000000;
            --input-bg: #ffffff;
            --input-border: #000000;
            --btn-primary-bg: #000000;
            --btn-primary-text: #ffffff;
            --btn-secondary-bg: #ffffff;
            --btn-secondary-text: #000000;
            --btn-secondary-border: #000000;
            --arrow-color: #000000;
            --table-th-bg: #000000;
            --table-th-text: #ffffff;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #555555;
            color: #000000;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        .no-print-toolbar {
            position: sticky;
            top: 0;
            z-index: 9999;
            background: #111111;
            color: #ffffff;
            padding: 10px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            border-bottom: 2px solid #000000;
        }

        .toolbar-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
            font-size: 0.95rem;
            letter-spacing: 0.5px;
        }

        .toolbar-badge {
            background: #ffffff;
            color: #000000;
            padding: 2px 7px;
            border-radius: 3px;
            font-size: 0.68rem;
            text-transform: uppercase;
            font-weight: 700;
        }

        .toolbar-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .toolbar-btn {
            background: #ffffff;
            color: #000000;
            border: 1px solid #ffffff;
            padding: 5px 14px;
            border-radius: 4px;
            font-size: 0.78rem;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
        }

        .toolbar-select {
            background: #222222;
            color: #ffffff;
            border: 1px solid #555555;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.78rem;
        }

        .prototype-canvas {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0 60px;
            gap: 28px;
        }

        .prototype-page {
            width: 210mm;
            min-height: 297mm;
            padding: 13mm 16mm 13mm 16mm;
            background: #ffffff;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            page-break-after: always;
            break-after: page;
        }

        .proto-header {
            text-align: center;
            margin-bottom: 10px;
        }

        .proto-header .proto-tag {
            font-size: 0.85rem;
            font-weight: 800;
            letter-spacing: 2px;
            color: #000000;
            text-transform: uppercase;
            margin-bottom: 2px;
        }

        .proto-header .proto-title {
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 1.2px;
            color: #000000;
            text-transform: uppercase;
        }

        .wire-frame-box {
            border: 2px solid #000000;
            padding: 3px;
            background: #ffffff;
            margin-bottom: 2px;
        }

        .wire-frame-inner {
            border: 1px solid #000000;
            padding: 11px 13px;
            display: flex;
            flex-direction: column;
            gap: 9px;
        }

        .wire-banner {
            border: 1.5px solid #000000;
            background: #000000;
            color: #ffffff;
            text-align: center;
            padding: 5px 10px;
            font-size: 0.80rem;
            font-weight: 700;
            letter-spacing: 0.4px;
        }

        .wire-tabs {
            display: flex;
            border: 1px solid #000000;
            text-align: center;
            font-size: 0.72rem;
            font-weight: 600;
            overflow: hidden;
        }

        .wire-tab {
            flex: 1;
            padding: 4px 6px;
            background: #ffffff;
            color: #000000;
            border-right: 1px solid #000000;
        }

        .wire-tab:last-child {
            border-right: none;
        }

        .wire-tab.active {
            background: #000000;
            color: #ffffff;
        }

        .wire-form-row {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.72rem;
        }

        .wire-label {
            width: 155px;
            font-weight: 600;
            color: #000000;
            flex-shrink: 0;
        }

        .wire-input {
            flex: 1;
            height: 27px;
            border: 1px solid #000000;
            background: #ffffff;
            padding: 0 8px;
            font-size: 0.70rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #000000;
            border-radius: 2px;
        }

        .wire-input-val {
            font-family: 'Inter', sans-serif;
        }

        .wire-input-code {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            letter-spacing: 0.4px;
        }

        .wire-input-icon {
            font-size: 0.72rem;
            color: #000000;
        }

        .wire-arrow-down {
            text-align: center;
            font-size: 1.25rem;
            line-height: 1;
            color: #000000;
            margin: 7px 0;
            font-weight: 800;
        }

        .wire-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 14px;
            font-size: 0.70rem;
            font-weight: 600;
            border: 1px solid #000000;
            background: #000000;
            color: #ffffff;
            border-radius: 2px;
            cursor: default;
        }

        .wire-btn-secondary {
            background: #ffffff;
            color: #000000;
            border: 1px solid #000000;
        }

        .wire-btn-sm {
            padding: 2px 8px;
            font-size: 0.64rem;
        }

        .wire-action-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 4px;
            border-top: 1px dashed #000000;
            font-size: 0.70rem;
        }

        .wire-link {
            color: #000000;
            text-decoration: underline;
            font-size: 0.70rem;
            font-weight: 600;
            cursor: pointer;
        }

        .wire-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 6px;
            border-radius: 2px;
            font-size: 0.64rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border: 1px solid #000000;
            background: #ffffff;
            color: #000000;
        }

        .wire-badge-solid {
            background: #000000;
            color: #ffffff;
            border-color: #000000;
        }

        .wire-grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
        }

        .wire-grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
        }

        .wire-card {
            border: 1px solid #000000;
            background: #ffffff;
            padding: 6px 8px;
            border-radius: 2px;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .wire-card-title {
            font-size: 0.60rem;
            font-weight: 700;
            color: #000000;
            text-transform: uppercase;
        }

        .wire-card-val {
            font-size: 0.95rem;
            font-weight: 800;
            color: #000000;
            font-family: 'JetBrains Mono', monospace;
        }

        .wire-card-sub {
            font-size: 0.58rem;
            color: #000000;
        }

        .wire-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.68rem;
            border: 1px solid #000000;
        }

        .wire-table th {
            background: #000000;
            color: #ffffff;
            padding: 4px 6px;
            text-align: left;
            font-weight: 700;
            border: 1px solid #000000;
        }

        .wire-table td {
            padding: 4px 6px;
            border: 1px solid #000000;
            background: #ffffff;
            color: #000000;
        }

        .wire-spec-box {
            border: 1px solid #000000;
            background: #ffffff;
            padding: 7px 10px;
            font-size: 0.67rem;
            display: flex;
            flex-direction: column;
            gap: 3px;
            margin-top: 4px;
        }

        .wire-spec-title {
            font-weight: 800;
            color: #000000;
            font-size: 0.70rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #000000;
            padding-bottom: 2px;
            text-transform: uppercase;
        }

        .wire-spec-list {
            list-style: none;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3px 10px;
        }

        .wire-spec-list li {
            position: relative;
            padding-left: 9px;
            line-height: 1.25;
            color: #000000;
        }

        .wire-spec-list li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #000000;
            font-weight: 800;
        }

        .wire-spec-code {
            font-family: 'JetBrains Mono', monospace;
            background: #ffffff;
            border: 1px solid #000000;
            padding: 0 3px;
            border-radius: 2px;
            color: #000000;
            font-weight: 600;
            font-size: 0.63rem;
        }

        .proto-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #000000;
            padding-top: 5px;
            margin-top: 6px;
            font-size: 0.66rem;
            color: #000000;
            font-weight: 600;
        }

        .proto-footer-brand {
            font-weight: 800;
            color: #000000;
        }

        @media print {
            body {
                background: #ffffff;
                margin: 0;
                padding: 0;
            }
            .no-print-toolbar {
                display: none !important;
            }
            .prototype-canvas {
                padding: 0;
                gap: 0;
            }
            .prototype-page {
                box-shadow: none;
                margin: 0;
                width: 100% !important;
                min-height: 100vh !important;
                padding: 12mm 15mm !important;
                page-break-after: always !important;
                break-after: page !important;
            }
            @page {
                size: A4 portrait;
                margin: 0;
            }
        }
    </style>
</head>
<body>

    <header class="no-print-toolbar">
        <div class="toolbar-brand">
            <span>🛵 PiatMove Integrated Mobility System</span>
            <span class="toolbar-badge">Simple Wireframe Specification</span>
        </div>
        <div class="toolbar-actions">
            <select class="toolbar-select" onchange="jumpToPage(this.value)">
                <option value="p1">Page 1: System Topology &amp; Architecture</option>
                <option value="p2">Page 2: Passenger &mdash; Auth &amp; 20% Discount Signup</option>
                <option value="p3">Page 3: Passenger &mdash; Landmark Route &amp; Booking</option>
                <option value="p4">Page 4: Passenger &mdash; Live Tracking &amp; Driver Rating</option>
                <option value="p5">Page 5: Passenger &mdash; Ride History &amp; Profile Hub</option>
                <option value="p6">Page 6: Driver &mdash; Partner Sign-In &amp; TODA KYC</option>
                <option value="p7">Page 7: Driver &mdash; Duty Console &amp; Incoming Radar</option>
                <option value="p8">Page 8: Driver &mdash; Turn Navigation &amp; Cash Fare</option>
                <option value="p9">Page 9: Driver &mdash; Shift Trips &amp; Income Report</option>
                <option value="p10">Page 10: Admin &mdash; Live Dispatch Command Center</option>
                <option value="p11">Page 11: Admin &mdash; Driver Franchise &amp; KYC Audit</option>
                <option value="p12">Page 12: Admin &mdash; Fare Matrix &amp; Regulatory Audit</option>
            </select>
            <button class="toolbar-btn" onclick="window.print()">
                <span>🖨️ Export / Print PDF (A4)</span>
            </button>
        </div>
    </header>

    <main class="prototype-canvas">
`);

// ==========================================
// PAGE 1: SYSTEM TOPOLOGY & ECOSYSTEM
// ==========================================
p.push(`
        <section class="prototype-page" id="p1">
            <div class="proto-header">
                <div class="proto-tag">MUNICIPAL TRANSPORT SYSTEM SPECIFICATION</div>
                <div class="proto-title">SYSTEM TOPOLOGY &amp; TRI-PORTAL OPERATIONAL ARCHITECTURE</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        PiatMove Municipal Mobility Network &mdash; End-to-End Enterprise Architecture
                    </div>

                    <div style="text-align:center; padding:8px 0 4px;">
                        <div style="width:48px; height:48px; margin:0 auto 4px; border:2px solid #000000; border-radius:50%; background:#ffffff; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                            🛵
                        </div>
                        <div style="font-weight:800; font-size:0.95rem; color:#000000; letter-spacing:1px;">PIATMOVE MOBILITY PLATFORM</div>
                        <div style="font-size:0.66rem; color:#000000; font-weight:600;">Municipality of Piat, Province of Cagayan &bull; Production Hostinger Deployment</div>
                    </div>

                    <table class="wire-table">
                        <thead>
                            <tr>
                                <th style="width:25%;">System Portal</th>
                                <th style="width:25%;">Platform &amp; Client</th>
                                <th style="width:32%;">Primary Operational Responsibilities</th>
                                <th style="width:18%;">State Flow</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Admin Web Portal</strong></td>
                                <td>Web App (PHP / Bootstrap 5 / Chart.js)</td>
                                <td>Driver accreditation, KYC audit, live dispatch oversight, fare matrix regulations.</td>
                                <td><span class="wire-badge wire-badge-solid">DISPATCH ACTIVE</span></td>
                            </tr>
                            <tr>
                                <td><strong>Passenger Mobile App</strong></td>
                                <td>Android Native (Kotlin / Retrofit)</td>
                                <td>Landmark search, automated 20% statutory discount calculator, live driver tracking.</td>
                                <td><span class="wire-badge">COMMUTER READY</span></td>
                            </tr>
                            <tr>
                                <td><strong>Driver Partner App</strong></td>
                                <td>Android Native (Foreground Service)</td>
                                <td>Shift duty toggle (Online/Offline), sound-enabled booking radar, cash fare collection.</td>
                                <td><span class="wire-badge">DRIVER EN ROUTE</span></td>
                            </tr>
                            <tr>
                                <td><strong>REST API &amp; MySQL Engine</strong></td>
                                <td>Hostinger Production (PHP 8.2 / MySQL)</td>
                                <td>Central dispatch concurrency lock, JWT auth, SMS/SMTP notices, reporting ledger.</td>
                                <td><span class="wire-badge wire-badge-solid">SYNCED &bull; 200 OK</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Municipal Transport Regulatory Matrix &mdash; Piat Fare Tariff Ordinance
                    </div>

                    <div class="wire-grid-4">
                        <div class="wire-card">
                            <span class="wire-card-title">Base Regular Fare</span>
                            <span class="wire-card-val">&#8369;20.00</span>
                            <span class="wire-card-sub">Per Commuter / Trip</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Statutory Discount</span>
                            <span class="wire-card-val">20% OFF</span>
                            <span class="wire-card-sub">Mandated by Republic Acts</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Discounted Fare</span>
                            <span class="wire-card-val">&#8369;16.00</span>
                            <span class="wire-card-sub">Save &#8369;4.00 per ride</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Active TODA Fleet</span>
                            <span class="wire-card-val">4 Terminals</span>
                            <span class="wire-card-sub">Basilica, Market, Centro, Maguilling</span>
                        </div>
                    </div>

                    <div style="border:1px solid #000000; padding:6px 8px; font-size:0.67rem; line-height:1.4;">
                        <strong>Statutory Commuter Protections:</strong> 
                        Republic Act No. 11314 (Student Fare Discount Act) &bull; Republic Act No. 9994 (Expanded Senior Citizens Act) &bull; Republic Act No. 10754 (Persons with Disability Rights) &bull; Municipal Ordinance for Expectant Mothers. Fares are automatically computed at <strong>&#8369;16.00</strong> upon selecting the verified classification.
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Architecture</span>
                    <span class="wire-spec-code">Pure Wireframe Standard &bull; Monochrome</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Production API Endpoint:</strong> <span class="wire-spec-code">https://piatmoveadmin.online/api/</span> with SSL encryption and JWT authentication.</li>
                    <li><strong>Multi-Module Structure:</strong> Root repository contains <span class="wire-spec-code">:core</span>, <span class="wire-spec-code">:app-passenger</span>, and <span class="wire-spec-code">:app-driver</span>.</li>
                    <li><strong>Admin Web Source:</strong> Stored locally at <span class="wire-spec-code">C:/xampp/htdocs/PiatMoveAdmin/</span> and deployed to Hostinger.</li>
                    <li><strong>Zero Platform Fee:</strong> 100% of commuter cash fares are directly collected and retained by tricycle operators.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 1 of 12 &bull; Architecture &amp; System Topology</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 2: PASSENGER AUTH & 20% DISCOUNT SIGNUP
// ==========================================
p.push(`
        <section class="prototype-page" id="p2">
            <div class="proto-header">
                <div class="proto-tag">PASSENGER APPLICATION PROTOTYPE</div>
                <div class="proto-title">COMMUTER AUTHENTICATION &amp; STATUTORY DISCOUNT ONBOARDING</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Commuter Login Screen &mdash; Mobile Authentication (LoginActivity.kt)
                    </div>

                    <div style="text-align:center; padding:6px 0 4px;">
                        <div style="width:40px; height:40px; margin:0 auto 3px; border:1.5px solid #000000; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                            🛵
                        </div>
                        <div style="font-weight:800; font-size:0.88rem; color:#000000;">PiatMove Commuter</div>
                        <div style="font-size:0.64rem; color:#000000;">Fast, safe, and regulated tricycle booking in Piat</div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Mobile Number / Email:</div>
                        <div class="wire-input">
                            <span class="wire-input-code">0917 555 0142</span>
                            <span class="wire-input-icon">📱</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Security Password:</div>
                        <div class="wire-input">
                            <span class="wire-input-code">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</span>
                            <span class="wire-input-icon">🔒</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <span class="wire-badge">RETROFIT API READY</span>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <a href="#p2" class="wire-link">Forgot Password?</a>
                            <div class="wire-btn" style="padding:4px 18px;">Sign In</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Commuter Registration &mdash; Statutory 20% Discount Classification (RegisterActivity.kt)
                    </div>

                    <div class="wire-tabs">
                        <div class="wire-tab active">🎓 Student (&#8369;16)</div>
                        <div class="wire-tab">👴 Senior (&#8369;16)</div>
                        <div class="wire-tab">♿ PWD (&#8369;16)</div>
                        <div class="wire-tab">🤰 Pregnant (&#8369;16)</div>
                        <div class="wire-tab">👤 Regular (&#8369;20)</div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Full Name:</div>
                        <div class="wire-input">
                            <span class="wire-input-val">Maria Cristina Santos</span>
                            <span class="wire-input-icon">👤</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Mobile Number (+63):</div>
                        <div class="wire-input">
                            <span class="wire-input-code">+63 998 765 4321</span>
                            <span class="wire-input-icon">📞</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Statutory Commuter Tier:</div>
                        <div class="wire-input">
                            <span class="wire-input-val">🎓 Student (Eligible for 20% Discount &bull; &#8369;16.00 Fare)</span>
                            <span class="wire-badge wire-badge-solid">VERIFIED</span>
                        </div>
                    </div>

                    <div style="border:1px solid #000000; padding:5px 8px; font-size:0.64rem; border-radius:2px;">
                        <strong>ID Verification Notice:</strong> When boarding the tricycle, please present your valid Student ID, Senior Citizen Card, or PWD ID to the driver partner to validate statutory fare compliance.
                    </div>

                    <div class="wire-action-row">
                        <a href="#p2" class="wire-link">Already registered? Log in</a>
                        <div class="wire-btn" style="padding:4px 18px;">Create Passenger Account &rarr;</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Module: app-passenger &bull; Auth Flow</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Android Activities:</strong> <span class="wire-spec-code">LoginActivity.kt</span> and <span class="wire-spec-code">RegisterActivity.kt</span> using ViewBinding.</li>
                    <li><strong>ViewModel Architecture:</strong> <span class="wire-spec-code">AuthViewModel.kt</span> managing LiveData / StateFlow for authentication.</li>
                    <li><strong>API Endpoints:</strong> POST <span class="wire-spec-code">/api/auth/passenger/register</span> and POST <span class="wire-spec-code">/api/auth/passenger/login</span>.</li>
                    <li><strong>Database Schema:</strong> Table <span class="wire-spec-code">users</span> with column <span class="wire-spec-code">discount_type ENUM('regular', 'student', 'senior', 'pwd', 'pregnant')</span>.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 2 of 12 &bull; Passenger Authentication &amp; Registration</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 3: PASSENGER BOOKING & LANDMARK MATRIX
// ==========================================
p.push(`
        <section class="prototype-page" id="p3">
            <div class="proto-header">
                <div class="proto-tag">PASSENGER APPLICATION PROTOTYPE</div>
                <div class="proto-title">HOME DASHBOARD &amp; LANDMARK ROUTE BOOKING MATRIX</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Commuter Home Interface &mdash; Available Fleet &amp; Quick Dispatch (PassengerHomeActivity.kt)
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; border:1px solid #000000; padding:6px 10px;">
                        <div>
                            <div style="font-weight:700; font-size:0.75rem;">Good Morning, Maria! 👋</div>
                            <div style="font-size:0.62rem;">Poblacion I, Piat, Cagayan &bull; GPS Active</div>
                        </div>
                        <span class="wire-badge wire-badge-solid">🎓 20% DISCOUNT ACTIVE</span>
                    </div>

                    <div class="wire-grid-3">
                        <div class="wire-card">
                            <span class="wire-card-title">Nearby Tricycles</span>
                            <span class="wire-card-val">8 Units</span>
                            <span class="wire-card-sub">Ready to dispatch</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Avg Pickup Wait</span>
                            <span class="wire-card-val">2.8 Min</span>
                            <span class="wire-card-sub">Piat Centro Area</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Active Station</span>
                            <span class="wire-card-val">Market TODA</span>
                            <span class="wire-card-sub">Fastest response</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <span style="font-size:0.66rem;">Need a ride right now?</span>
                        <div class="wire-btn" style="padding:4px 20px;">Book a Tricycle Now &rarr;</div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Landmark Booking &amp; Automatic Fare Computation (BookRideActivity.kt)
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Pickup Landmark:</div>
                        <div class="wire-input">
                            <span class="wire-input-val">📍 Piat Public Market (Front Gate Terminal)</span>
                            <span class="wire-input-icon">🔍</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Destination Landmark:</div>
                        <div class="wire-input">
                            <span class="wire-input-val">🎯 Basilica Minore of Our Lady of Piat</span>
                            <span class="wire-input-icon">🔍</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Number of Passengers:</div>
                        <div class="wire-input" style="width:120px; flex:none;">
                            <span class="wire-input-code">1 Commuter</span>
                            <span class="wire-input-icon">👥</span>
                        </div>
                        <span style="font-size:0.62rem;">(Maximum 4 per tricycle unit)</span>
                    </div>

                    <div style="border:1px solid #000000; padding:8px 10px; border-radius:2px;">
                        <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.72rem; margin-bottom:4px;">
                            <span>FARE COMPUTATION MATRIX</span>
                            <span>MUNICIPAL TARIFF NO. 2026-04</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.67rem; margin-bottom:2px;">
                            <span>Standard Regular Base Fare:</span>
                            <span style="font-family:'JetBrains Mono';">&#8369;20.00</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.67rem; font-weight:700; margin-bottom:2px;">
                            <span>Statutory Student Discount (20% OFF):</span>
                            <span style="font-family:'JetBrains Mono';">-&#8369;4.00</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.80rem; font-weight:800; border-top:1px dashed #000000; padding-top:4px;">
                            <span>Total Payable Cash Fare:</span>
                            <span style="font-family:'JetBrains Mono'; font-weight:800;">&#8369;16.00</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <a href="#p3" class="wire-link">&larr; Change Landmark</a>
                        <div class="wire-btn" style="padding:5px 22px;">Confirm &amp; Request Dispatch</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Module: app-passenger &bull; Booking Engine</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Landmark Adapter:</strong> <span class="wire-spec-code">PiatPlaceAdapter.kt</span> preloaded with Piat municipal landmarks.</li>
                    <li><strong>Fare Algorithm:</strong> Base fare (<span class="wire-spec-code">₱20.00</span>) minus statutory deduction (<span class="wire-spec-code">₱4.00</span>).</li>
                    <li><strong>API Endpoint:</strong> POST <span class="wire-spec-code">/api/bookings/create</span> with payload <span class="wire-spec-code">{ pickup, destination, fare: 16.00 }</span>.</li>
                    <li><strong>Concurrency State:</strong> Marked as <span class="wire-spec-code">pending</span> and dispatched to online drivers in Piat radius.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 3 of 12 &bull; Passenger Route Booking &amp; Fare Calculation</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 4: PASSENGER RIDE TRACKER & RATING
// ==========================================
p.push(`
        <section class="prototype-page" id="p4">
            <div class="proto-header">
                <div class="proto-tag">PASSENGER APPLICATION PROTOTYPE</div>
                <div class="proto-title">LIVE RIDE STATUS TRACKING &amp; DRIVER RATING SETTLEMENT</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Active Ride Status &mdash; Driver Assigned &amp; In-Transit (RideStatusActivity.kt)
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; border:1px solid #000000; padding:6px 10px;">
                        <div style="font-weight:700; font-size:0.72rem;">STATUS: DRIVER ON THE WAY TO PICKUP</div>
                        <span class="wire-badge wire-badge-solid">ACCEPTED &bull; EN ROUTE</span>
                    </div>

                    <div style="display:flex; gap:10px; border:1px solid #000000; padding:8px 10px; background:#ffffff; align-items:center;">
                        <div style="width:40px; height:40px; border:1.5px solid #000000; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
                            👨‍✈️
                        </div>
                        <div style="flex:1;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="font-weight:800; font-size:0.80rem;">Mario Agcaoili</div>
                                <span style="font-size:0.68rem; font-weight:700;">★ 4.9 (124 ratings)</span>
                            </div>
                            <div style="font-size:0.66rem; font-weight:600;">Poblacion-Basilica TODA &bull; Body #042</div>
                            <div style="font-size:0.62rem;">Plate: 9821-TG &bull; Blue / Silver Skygo 150</div>
                        </div>
                    </div>

                    <div class="wire-grid-3">
                        <div class="wire-card">
                            <span class="wire-card-title">Driver Distance</span>
                            <span class="wire-card-val">350 Meters</span>
                            <span class="wire-card-sub">Approaching Market</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Est. Arrival</span>
                            <span class="wire-card-val">~2 Mins</span>
                            <span class="wire-card-sub">Real-time update</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Payable Fare</span>
                            <span class="wire-card-val">&#8369;16.00</span>
                            <span class="wire-card-sub">Cash on drop-off</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <div style="display:flex; gap:8px;">
                            <div class="wire-btn wire-btn-secondary" style="padding:4px 12px;">📞 Call Driver</div>
                            <div class="wire-btn wire-btn-secondary" style="padding:4px 12px;">💬 Send SMS</div>
                        </div>
                        <div class="wire-btn wire-btn-secondary" style="padding:4px 12px;">Cancel Booking</div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Trip Completion &mdash; Driver Rating &amp; Commuter Feedback (dialog_rate_driver.xml)
                    </div>

                    <div style="text-align:center; padding:4px 0;">
                        <span class="wire-badge wire-badge-solid" style="font-size:0.70rem; padding:3px 10px;">TRIP COMPLETED &bull; FARE COLLECTED</span>
                        <div style="font-size:0.70rem; margin-top:3px;">How was your tricycle ride with Mario Agcaoili?</div>
                    </div>

                    <div style="text-align:center; font-size:1.4rem; letter-spacing:4px; margin:2px 0;">
                        ★ ★ ★ ★ ★
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Commuter Compliments:</div>
                        <div style="display:flex; gap:6px; flex-wrap:wrap;">
                            <span class="wire-badge">✓ Safe Driving</span>
                            <span class="wire-badge">✓ Polite &amp; Courteous</span>
                            <span class="wire-badge">✓ Clean Tricycle</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Feedback Notes:</div>
                        <div class="wire-input" style="height:30px;">
                            <span class="wire-input-val">Napakabilis at ligtas ang biyahe papuntang Basilica! Salamat po.</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <a href="#p3" class="wire-link">Skip Rating</a>
                        <div class="wire-btn" style="padding:4px 20px;">Submit Rating &amp; Finish</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Module: app-passenger &bull; Ride State &amp; Rating</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Status Polling Engine:</strong> Periodic polling (3-second cadence) querying GET <span class="wire-spec-code">/api/bookings/status?id={id}</span>.</li>
                    <li><strong>Driver Details Mapping:</strong> Parses assigned driver profile, vehicle body number, and plate number.</li>
                    <li><strong>Rating API Endpoint:</strong> POST <span class="wire-spec-code">/api/bookings/rate</span> updating columns <span class="wire-spec-code">rating</span> (1-5) and <span class="wire-spec-code">rating_comment</span>.</li>
                    <li><strong>Driver Score Update:</strong> Automatically recalculates rolling average rating upon submission.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 4 of 12 &bull; Ride Status Tracking &amp; Driver Feedback</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 5: PASSENGER HISTORY & COMMUTER PROFILE
// ==========================================
p.push(`
        <section class="prototype-page" id="p5">
            <div class="proto-header">
                <div class="proto-tag">PASSENGER APPLICATION PROTOTYPE</div>
                <div class="proto-title">COMMUTER RIDE HISTORY &amp; PROFILE IDENTITY MANAGEMENT</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Commuter Ride History Ledger (RideHistoryFragment.kt)
                    </div>

                    <table class="wire-table">
                        <thead>
                            <tr>
                                <th>Trip ID</th>
                                <th>Route (Pickup &rarr; Drop-off)</th>
                                <th>Date &amp; Time</th>
                                <th>Fare Paid</th>
                                <th>Driver / TODA</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1092</td>
                                <td>Market &rarr; Basilica Minore</td>
                                <td>Today, 09:14 AM</td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;16.00</td>
                                <td>Mario Agcaoili (042)</td>
                                <td><span class="wire-badge wire-badge-solid">COMPLETED</span></td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1088</td>
                                <td>CSU Piat &rarr; Centro Poblacion</td>
                                <td>Yesterday, 04:30 PM</td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;16.00</td>
                                <td>Danilo Pascual (019)</td>
                                <td><span class="wire-badge wire-badge-solid">COMPLETED</span></td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1075</td>
                                <td>Piat Municipal Hall &rarr; Baung</td>
                                <td>Sep 21, 11:20 AM</td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;16.00</td>
                                <td>Efren Rivera (035)</td>
                                <td><span class="wire-badge wire-badge-solid">COMPLETED</span></td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1061</td>
                                <td>Centro &rarr; Maguilling Junction</td>
                                <td>Sep 19, 02:45 PM</td>
                                <td style="font-family:'JetBrains Mono';">&#8369;0.00</td>
                                <td>None Assigned</td>
                                <td><span class="wire-badge">CANCELLED</span></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="wire-action-row">
                        <span style="font-size:0.64rem;">Showing 4 recent rides</span>
                        <div class="wire-btn wire-btn-secondary">Export Commuter Trip Log (PDF)</div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Commuter Profile &amp; Regulatory Verification Hub (ProfileFragment.kt)
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Commuter Account:</div>
                        <div class="wire-input">
                            <span class="wire-input-val">Maria Cristina Santos</span>
                            <span class="wire-input-icon">👤</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Registered Mobile:</div>
                        <div class="wire-input">
                            <span class="wire-input-code">+63 998 765 4321</span>
                            <span class="wire-input-icon">📱</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Verified Discount Tier:</div>
                        <div class="wire-input">
                            <span class="wire-input-val" style="font-weight:700;">🎓 Student &mdash; CSU Piat Campus (ID #2024-1049)</span>
                            <span class="wire-badge wire-badge-solid">VERIFIED</span>
                        </div>
                    </div>

                    <div class="wire-grid-3">
                        <div class="wire-card">
                            <span class="wire-card-title">Total Lifetime Rides</span>
                            <span class="wire-card-val">34 Trips</span>
                            <span class="wire-card-sub">Piat Municipality</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Statutory Savings</span>
                            <span class="wire-card-val">&#8369;136.00</span>
                            <span class="wire-card-sub">20% Fare Benefit</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Emergency Hotline</span>
                            <span class="wire-card-val">Piat PNP</span>
                            <span class="wire-card-sub">MDRRMO Rescue</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <div style="display:flex; gap:8px;">
                            <div class="wire-btn wire-btn-secondary">📘 System Manual</div>
                            <div class="wire-btn wire-btn-secondary">ℹ️ About PiatMove</div>
                        </div>
                        <div class="wire-btn wire-btn-secondary">Sign Out</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Module: app-passenger &bull; History &amp; Identity</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Fragment Architecture:</strong> <span class="wire-spec-code">RideHistoryFragment.kt</span> and <span class="wire-spec-code">ProfileFragment.kt</span> inside BottomNavigationView.</li>
                    <li><strong>API Endpoint:</strong> GET <span class="wire-spec-code">/api/passenger/history</span> returning JSON collection sorted by date.</li>
                    <li><strong>Data Privacy:</strong> Compliant with Republic Act No. 10173 (Data Privacy Act). Commuter numbers masked.</li>
                    <li><strong>Offline Resilience:</strong> Caches recent trip history locally for offline viewing.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 5 of 12 &bull; Commuter Trip Ledger &amp; Profile Hub</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 6: DRIVER PARTNER AUTH & TODA KYC UPLOAD
// ==========================================
p.push(`
        <section class="prototype-page" id="p6">
            <div class="proto-header">
                <div class="proto-tag">DRIVER PARTNER APPLICATION PROTOTYPE</div>
                <div class="proto-title">DRIVER AUTHENTICATION &amp; TODA FRANCHISE ACCREDITATION</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Driver Partner Sign-In &mdash; Shift Terminal Access (LoginActivity.kt)
                    </div>

                    <div style="text-align:center; padding:6px 0 4px;">
                        <div style="width:40px; height:40px; margin:0 auto 3px; border:1.5px solid #000000; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                            👨‍✈️
                        </div>
                        <div style="font-weight:800; font-size:0.88rem; color:#000000;">PiatMove Driver Partner</div>
                        <div style="font-size:0.64rem;">Official Municipal Tricycle Operator Terminal</div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Driver Phone / ID:</div>
                        <div class="wire-input">
                            <span class="wire-input-code">+63 915 889 4412</span>
                            <span class="wire-input-icon">📱</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Security PIN / Password:</div>
                        <div class="wire-input">
                            <span class="wire-input-code">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</span>
                            <span class="wire-input-icon">🔒</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <a href="#p6" class="wire-link">Forgot Credentials?</a>
                        <div class="wire-btn" style="padding:4px 22px;">Sign In to Shift</div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Driver Partner Registration &mdash; KYC Accreditation Upload (RegisterActivity.kt)
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">Driver Legal Name:</div>
                        <div class="wire-input">
                            <span class="wire-input-val">Mario Agcaoili y Corpuz</span>
                            <span class="wire-input-icon">👤</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">TODA Association &amp; Unit:</div>
                        <div class="wire-input">
                            <span class="wire-input-val">Poblacion-Basilica TODA &bull; Body #042</span>
                            <span class="wire-input-icon">🛵</span>
                        </div>
                    </div>

                    <div class="wire-form-row">
                        <div class="wire-label">LTO Motorcycle Plate:</div>
                        <div class="wire-input">
                            <span class="wire-input-code">9821-TG (Skygo 150 - Blue)</span>
                            <span class="wire-input-icon">🏷️</span>
                        </div>
                    </div>

                    <div style="border:1px solid #000000; padding:6px 10px; border-radius:2px;">
                        <div style="font-weight:700; font-size:0.68rem; margin-bottom:4px;">REQUIRED MUNICIPAL KYC ACCREDITATION DOCUMENTS:</div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px; font-size:0.65rem;">
                            <span>1. LTO Professional Driver's License:</span>
                            <span class="wire-badge wire-badge-solid">✓ UPLOADED (license_042.jpg)</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px; font-size:0.65rem;">
                            <span>2. Piat Municipal Tricycle Franchise Permit:</span>
                            <span class="wire-badge wire-badge-solid">✓ UPLOADED (franchise_042.pdf)</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.65rem;">
                            <span>3. Barangay Clearance (Poblacion I):</span>
                            <span class="wire-badge wire-badge-solid">✓ UPLOADED (brgy_042.jpg)</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <span class="wire-badge">PENDING LGU VERIFICATION</span>
                        <div class="wire-btn" style="padding:4px 20px;">Submit Accreditation Dossier</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Module: app-driver &bull; Accreditation Engine</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Android Activity:</strong> <span class="wire-spec-code">RegisterActivity.kt</span> with multipart HTTP image/document picker.</li>
                    <li><strong>Storage Architecture:</strong> Files stored at <span class="wire-spec-code">public_html/admin/uploads/drivers/</span> on Hostinger.</li>
                    <li><strong>Gatekeeper Security:</strong> Driver cannot go online until status is updated from <span class="wire-spec-code">pending</span> to <span class="wire-spec-code">approved</span>.</li>
                    <li><strong>Database Schema:</strong> Table <span class="wire-spec-code">drivers</span> containing <span class="wire-spec-code">license_no, franchise_no, body_no, is_verified</span>.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 6 of 12 &bull; Driver Partner Authentication &amp; KYC</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 7: DRIVER DUTY CONSOLE & INCOMING ALERT
// ==========================================
p.push(`
        <section class="prototype-page" id="p7">
            <div class="proto-header">
                <div class="proto-tag">DRIVER PARTNER APPLICATION PROTOTYPE</div>
                <div class="proto-title">DUTY RADAR CONSOLE &amp; REAL-TIME DISPATCH ALERT</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Driver Operational Console &mdash; Shift Availability &amp; Earnings (DriverDashboardFragment.kt)
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; border:1px solid #000000; padding:6px 10px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-size:1.1rem;">🛵</span>
                            <div>
                                <div style="font-weight:800; font-size:0.75rem;">SHIFT STATUS: ONLINE &amp; ACCEPTING COMMUTERS</div>
                                <div style="font-size:0.62rem;">TODA Station: Poblacion Market Terminal &bull; GPS Tracked</div>
                            </div>
                        </div>
                        <div class="wire-btn wire-btn-secondary wire-btn-sm">Go Offline</div>
                    </div>

                    <div class="wire-grid-4">
                        <div class="wire-card">
                            <span class="wire-card-title">Today's Earnings</span>
                            <span class="wire-card-val">&#8369;384.00</span>
                            <span class="wire-card-sub">24 Rides completed</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Driver Rating</span>
                            <span class="wire-card-val">★ 4.95</span>
                            <span class="wire-card-sub">Top feedback</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Shift Duration</span>
                            <span class="wire-card-val">5h 20m</span>
                            <span class="wire-card-sub">On duty since 08:00 AM</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Acceptance Rate</span>
                            <span class="wire-card-val">96%</span>
                            <span class="wire-card-sub">1 Decline today</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Incoming Ride Request Modal Alert (RideRequestActivity.kt / item_ride_request.xml)
                    </div>

                    <div style="border:1px solid #000000; padding:6px 10px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="font-weight:800; font-size:0.75rem;">🚨 NEW COMMUTER RIDE REQUEST DISPATCHED</div>
                        <span class="wire-badge wire-badge-solid" style="font-size:0.70rem;">24s COUNTDOWN</span>
                    </div>

                    <div style="border:1px solid #000000; padding:8px 10px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <div style="font-weight:800; font-size:0.80rem;">Commuter: Maria Cristina Santos</div>
                            <span class="wire-badge wire-badge-solid">🎓 20% STUDENT DISCOUNT</span>
                        </div>

                        <div style="font-size:0.68rem; margin-bottom:2px;">
                            <strong>Pickup Spot:</strong> Piat Public Market (Front Gate Terminal) &bull; <strong>350m away (1 min)</strong>
                        </div>
                        <div style="font-size:0.68rem; margin-bottom:4px;">
                            <strong>Destination:</strong> Basilica Minore of Our Lady of Piat
                        </div>

                        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #000000; padding-top:4px;">
                            <div>
                                <span style="font-size:0.62rem;">Statutory Payable Fare:</span>
                                <div style="font-size:0.95rem; font-weight:800; font-family:'JetBrains Mono';">&#8369;16.00 CASH</div>
                            </div>
                            <span style="font-size:0.62rem; font-weight:600;">Standard &#8369;20 minus &#8369;4 Student Discount</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <div class="wire-btn wire-btn-secondary" style="padding:5px 22px;">Decline Request</div>
                        <div class="wire-btn" style="padding:5px 30px; font-size:0.75rem;">ACCEPT RIDE &rarr;</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Module: app-driver &bull; Radar &amp; Dispatch Alert</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Foreground Location Service:</strong> Continuously streams GPS coordinates to <span class="wire-spec-code">/api/driver/location</span> while status is <span class="wire-spec-code">online</span>.</li>
                    <li><strong>Audio / Vibration Signal:</strong> Plays high-priority alert chime and initiates a 30-second response timeout countdown.</li>
                    <li><strong>Concurrency Locking:</strong> Uses atomic SQL updates (<span class="wire-spec-code">UPDATE bookings SET driver_id = ?, status = 'accepted' WHERE id = ?</span>).</li>
                    <li><strong>Fair Dispatch Queue:</strong> Dispatches to nearest available driver in the designated TODA terminal zone.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 7 of 12 &bull; Driver Partner Duty Console &amp; Booking Radar</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 8: DRIVER ACTIVE TRIP & FARE COLLECTION
// ==========================================
p.push(`
        <section class="prototype-page" id="p8">
            <div class="proto-header">
                <div class="proto-tag">DRIVER PARTNER APPLICATION PROTOTYPE</div>
                <div class="proto-title">ACTIVE TRIP NAVIGATION &amp; STATUTORY FARE COLLECTION</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Active Ride Phase 1 &mdash; Navigation to Commuter Pickup (ActiveRideActivity.kt)
                    </div>

                    <div style="border:1px solid #000000; padding:6px 10px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="font-weight:800; font-size:0.72rem;">EN ROUTE TO COMMUTER PICKUP LOCATION</div>
                        <span class="wire-badge wire-badge-solid">HEADING TO MARKET</span>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; border:1px solid #000000; padding:6px 10px; background:#ffffff;">
                        <div>
                            <div style="font-weight:700; font-size:0.75rem;">Commuter: Maria Cristina Santos</div>
                            <div style="font-size:0.64rem;">Pickup: Piat Public Market &bull; Phone: +63 998 765 4321</div>
                        </div>
                        <div style="display:flex; gap:6px;">
                            <div class="wire-btn wire-btn-secondary wire-btn-sm">📞 Call</div>
                            <div class="wire-btn wire-btn-secondary wire-btn-sm">💬 SMS</div>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <span style="font-size:0.64rem;">Distance to commuter: 120m</span>
                        <div class="wire-btn" style="padding:4px 20px;">📍 I Have Arrived at Pickup Spot</div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Active Ride Phase 2 &mdash; In-Transit &amp; Cash Fare Settlement (ActiveRideActivity.kt)
                    </div>

                    <div style="border:1px solid #000000; padding:6px 10px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="font-weight:800; font-size:0.72rem;">TRIP IN PROGRESS &rarr; DESTINATION: BASILICA MINORE</div>
                        <span class="wire-badge wire-badge-solid">IN-TRANSIT</span>
                    </div>

                    <div style="border:1.5px solid #000000; padding:8px 10px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; font-weight:800; font-size:0.74rem; margin-bottom:4px;">
                            <span>MUNICIPAL FARE COLLECTION SUMMARY</span>
                            <span class="wire-badge">20% STATUTORY DISCOUNT</span>
                        </div>

                        <div class="wire-grid-3" style="margin-bottom:6px;">
                            <div class="wire-card">
                                <span class="wire-card-title">Tariff Fare</span>
                                <span class="wire-card-val">&#8369;20.00</span>
                                <span class="wire-card-sub">Base Commute</span>
                            </div>
                            <div class="wire-card">
                                <span class="wire-card-title">Student Discount</span>
                                <span class="wire-card-val">-&#8369;4.00</span>
                                <span class="wire-card-sub">RA 11314 Benefit</span>
                            </div>
                            <div class="wire-card">
                                <span class="wire-card-title">Cash to Collect</span>
                                <span class="wire-card-val">&#8369;16.00</span>
                                <span class="wire-card-sub">Exact Cash Amount</span>
                            </div>
                        </div>

                        <div style="font-size:0.64rem; line-height:1.3;">
                            <strong>Operator Advisory:</strong> Please confirm you have verified the passenger's valid Student ID prior to completing fare collection. 100% of the fare is retained by the tricycle operator.
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <span class="wire-badge wire-badge-solid">CASH FARE: &#8369;16.00</span>
                        <div class="wire-btn" style="padding:5px 22px; font-size:0.74rem;">✓ Confirm &#8369;16.00 Received &amp; Complete Trip</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Module: app-driver &bull; Active Trip Workflow</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Trip State Machine:</strong> Strictly enforces lifecycle: <span class="wire-spec-code">accepted &rarr; arrived &rarr; started &rarr; completed</span>.</li>
                    <li><strong>API Endpoint:</strong> POST <span class="wire-spec-code">/api/driver/update-trip-status</span> with booking ID and status payload.</li>
                    <li><strong>Cash Audit Guarantee:</strong> Immediately records ₱16.00 cash fare under driver's shift earnings ledger upon completion.</li>
                    <li><strong>Passenger Notification:</strong> Backend triggers instant status update to Passenger App via polling synchronization.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 8 of 12 &bull; Active Trip Navigation &amp; Fare Settlement</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 9: DRIVER TRIP LOG & SHIFT INCOME REPORT
// ==========================================
p.push(`
        <section class="prototype-page" id="p9">
            <div class="proto-header">
                <div class="proto-tag">DRIVER PARTNER APPLICATION PROTOTYPE</div>
                <div class="proto-title">SHIFT TRIP LOG &amp; DAILY REVENUE ANALYTICS</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Driver Shift Activity Log (DriverActivityFragment.kt / DriverTripsAdapter.kt)
                    </div>

                    <table class="wire-table">
                        <thead>
                            <tr>
                                <th>Trip #</th>
                                <th>Route Taken</th>
                                <th>Time</th>
                                <th>Category</th>
                                <th>Fare Collected</th>
                                <th>Commuter Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1092</td>
                                <td>Market Front Gate &rarr; Basilica Minore</td>
                                <td>09:14 AM</td>
                                <td><span class="wire-badge wire-badge-solid">STUDENT</span></td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;16.00</td>
                                <td style="font-weight:700;">★ 5.0</td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1090</td>
                                <td>Basilica Terminal &rarr; Minanga Bridge</td>
                                <td>08:48 AM</td>
                                <td><span class="wire-badge">REGULAR</span></td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;20.00</td>
                                <td style="font-weight:700;">★ 5.0</td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1087</td>
                                <td>Poblacion Centro &rarr; CSU Piat Campus</td>
                                <td>08:22 AM</td>
                                <td><span class="wire-badge wire-badge-solid">STUDENT</span></td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;16.00</td>
                                <td style="font-weight:700;">★ 4.8</td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1084</td>
                                <td>Piat Municipal Hall &rarr; Baung</td>
                                <td>08:05 AM</td>
                                <td><span class="wire-badge">SENIOR</span></td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;16.00</td>
                                <td style="font-weight:700;">★ 5.0</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="wire-action-row">
                        <span style="font-size:0.64rem;">Shift: Mario Agcaoili &bull; Body #042</span>
                        <span style="font-size:0.66rem; font-weight:700;">Today's Fares: &#8369;384.00 (24 Trips)</span>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Daily Income Analytics &amp; Take-Home Summary (DriverIncomeReportActivity.kt)
                    </div>

                    <div class="wire-grid-3">
                        <div class="wire-card">
                            <span class="wire-card-title">Gross Commuter Fares</span>
                            <span class="wire-card-val">&#8369;384.00</span>
                            <span class="wire-card-sub">100% Cash In Hand</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Platform Service Fee</span>
                            <span class="wire-card-val">&#8369;0.00</span>
                            <span class="wire-card-sub">0% LGU Commission</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Net Driver Income</span>
                            <span class="wire-card-val">&#8369;384.00</span>
                            <span class="wire-card-sub">Full Driver Take-Home</span>
                        </div>
                    </div>

                    <div style="border:1px solid #000000; padding:6px 10px; border-radius:2px;">
                        <div style="font-weight:700; font-size:0.68rem; margin-bottom:3px;">STATUTORY COMMUTE DISTRIBUTION:</div>
                        <div style="display:flex; justify-content:space-between; font-size:0.65rem; margin-bottom:2px;">
                            <span>Regular Passenger Fares (12 Trips @ &#8369;20):</span>
                            <span style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;240.00</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.65rem; margin-bottom:2px;">
                            <span>Discounted Student/Senior Fares (9 Trips @ &#8369;16):</span>
                            <span style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;144.00</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.68rem; font-weight:800; border-top:1px dashed #000000; padding-top:3px;">
                            <span>Total Shift Fares Tally:</span>
                            <span style="font-family:'JetBrains Mono';">&#8369;384.00</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <div class="wire-btn wire-btn-secondary">Export Shift Receipt (PDF)</div>
                        <div class="wire-btn">End Shift &amp; Reconcile</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Module: app-driver &bull; Analytics &amp; Ledger</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Activity:</strong> <span class="wire-spec-code">DriverIncomeReportActivity.kt</span> aggregating completed rides by date and shift window.</li>
                    <li><strong>API Endpoint:</strong> GET <span class="wire-spec-code">/api/driver/earnings</span> computing fare breakdown and statutory discount distribution.</li>
                    <li><strong>Municipal Policy:</strong> 100% of commuter cash fares are directly collected and retained by accredited tricycle operators.</li>
                    <li><strong>Audit Integrity:</strong> Logs GPS timestamps for departure and arrival to prevent fraudulent trip completions.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 9 of 12 &bull; Driver Partner Shift Log &amp; Income Analytics</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 10: ADMIN WEB DISPATCH & EXECUTIVE KPI
// ==========================================
p.push(`
        <section class="prototype-page" id="p10">
            <div class="proto-header">
                <div class="proto-tag">MUNICIPAL ADMIN WEB PORTAL PROTOTYPE</div>
                <div class="proto-title">EXECUTIVE COMMAND CENTER &amp; REAL-TIME FLEET DISPATCH (dashboard.php)</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Municipal Admin Console &mdash; Dispatch Operations &amp; Fleet Overview (dashboard.php)
                    </div>

                    <div class="wire-grid-4">
                        <div class="wire-card">
                            <span class="wire-card-title">Total Bookings Today</span>
                            <span class="wire-card-val">1,482</span>
                            <span class="wire-card-sub">&uarr; +14% vs yesterday</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">On-Duty Tricycles</span>
                            <span class="wire-card-val">38 Units</span>
                            <span class="wire-card-sub">Across 4 TODA terminals</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Registered Commuters</span>
                            <span class="wire-card-val">2,940</span>
                            <span class="wire-card-sub">Active Piat residents</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Municipal Revenue</span>
                            <span class="wire-card-val">&#8369;26,480.00</span>
                            <span class="wire-card-sub">Total Commuter Turnover</span>
                        </div>
                    </div>

                    <div style="border:1px solid #000000; padding:6px 10px;">
                        <div style="font-weight:700; font-size:0.68rem; margin-bottom:4px;">REAL-TIME TODA FLEET DISTRIBUTION:</div>
                        <div style="display:flex; justify-content:space-between; font-size:0.66rem;">
                            <span>📍 <strong>Poblacion Market TODA:</strong> 14 Online / 2 Busy</span>
                            <span>📍 <strong>Basilica Minore TODA:</strong> 12 Online / 4 Busy</span>
                            <span>📍 <strong>Maguilling TODA:</strong> 8 Online / 1 Busy</span>
                            <span>📍 <strong>Minanga TODA:</strong> 4 Online / 0 Busy</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Live Booking Queue &amp; Municipal Dispatch Oversight
                    </div>

                    <table class="wire-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Commuter</th>
                                <th>Pickup &rarr; Destination</th>
                                <th>Driver Assigned</th>
                                <th>Fare</th>
                                <th>Category</th>
                                <th>Dispatch Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1092</td>
                                <td>Maria Cristina Santos</td>
                                <td>Public Market &rarr; Basilica Minore</td>
                                <td>Mario Agcaoili (042)</td>
                                <td style="font-family:'JetBrains Mono';">&#8369;16.00</td>
                                <td><span class="wire-badge wire-badge-solid">STUDENT</span></td>
                                <td><span class="wire-badge wire-badge-solid">ACCEPTED</span></td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1091</td>
                                <td>Roberto D. Garcia</td>
                                <td>CSU Piat &rarr; Poblacion Centro</td>
                                <td>Searching Nearby...</td>
                                <td style="font-family:'JetBrains Mono';">&#8369;20.00</td>
                                <td><span class="wire-badge">REGULAR</span></td>
                                <td><span class="wire-badge">PENDING</span></td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1090</td>
                                <td>Elena Fernandez</td>
                                <td>Basilica &rarr; Minanga Bridge</td>
                                <td>Danilo Pascual (019)</td>
                                <td style="font-family:'JetBrains Mono';">&#8369;16.00</td>
                                <td><span class="wire-badge wire-badge-solid">SENIOR</span></td>
                                <td><span class="wire-badge wire-badge-solid">IN-TRANSIT</span></td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1089</td>
                                <td>Eduardo Ramos</td>
                                <td>Municipal Hall &rarr; Baung</td>
                                <td>Efren Rivera (035)</td>
                                <td style="font-family:'JetBrains Mono';">&#8369;20.00</td>
                                <td><span class="wire-badge">REGULAR</span></td>
                                <td><span class="wire-badge wire-badge-solid">COMPLETED</span></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="wire-action-row">
                        <span style="font-size:0.64rem;">Auto-refreshing every 5 seconds</span>
                        <div style="display:flex; gap:8px;">
                            <div class="wire-btn wire-btn-secondary">Broadcast Emergency Alert</div>
                            <div class="wire-btn">Refresh Dispatch Queue</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Portal: PiatMoveAdmin &bull; dashboard.php</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Tech Stack:</strong> PHP 8.2, Bootstrap 5, Chart.js, hosted live on Hostinger at <span class="wire-spec-code">https://piatmoveadmin.online/admin/</span>.</li>
                    <li><strong>Live Aggregation:</strong> Executes SQL queries aggregating booking states (<span class="wire-spec-code">pending, accepted, in-transit, completed</span>).</li>
                    <li><strong>Role-Based Access:</strong> Protected by admin session authentication (<span class="wire-spec-code">auth_admin()</span>) and CSRF token protection.</li>
                    <li><strong>Dispatch Interventions:</strong> Allows municipal operators to reassign stalled bookings or contact drivers directly.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 10 of 12 &bull; Municipal Admin Command Center</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 11: ADMIN DRIVER FRANCHISE & KYC AUDIT
// ==========================================
p.push(`
        <section class="prototype-page" id="p11">
            <div class="proto-header">
                <div class="proto-tag">MUNICIPAL ADMIN WEB PORTAL PROTOTYPE</div>
                <div class="proto-title">TRICYCLE DRIVER ACCREDITATION &amp; KYC AUDIT HUB (drivers.php)</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Driver Accreditation Registry &mdash; Municipal TODA Audit Ledger (drivers.php)
                    </div>

                    <div class="wire-tabs">
                        <div class="wire-tab">All Drivers (54)</div>
                        <div class="wire-tab active">Pending Accreditation (3)</div>
                        <div class="wire-tab">Accredited Active (48)</div>
                        <div class="wire-tab">Suspended (3)</div>
                    </div>

                    <table class="wire-table">
                        <thead>
                            <tr>
                                <th>Driver Name</th>
                                <th>Contact</th>
                                <th>TODA Association</th>
                                <th>Body #</th>
                                <th>Plate #</th>
                                <th>KYC Documents</th>
                                <th>Accreditation Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Mario Agcaoili</strong></td>
                                <td>0915-889-4412</td>
                                <td>Poblacion-Basilica</td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#042</td>
                                <td>9821-TG</td>
                                <td><span class="wire-badge wire-badge-solid">3 / 3 VERIFIED</span></td>
                                <td><span class="wire-badge">PENDING AUDIT</span></td>
                                <td><div class="wire-btn wire-btn-sm">Inspect Dossier</div></td>
                            </tr>
                            <tr>
                                <td><strong>Rodrigo Dela Cruz</strong></td>
                                <td>0920-112-9988</td>
                                <td>Maguilling TODA</td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#018</td>
                                <td>7742-BG</td>
                                <td><span class="wire-badge">2 / 3 UPLOADED</span></td>
                                <td><span class="wire-badge">PENDING DOCS</span></td>
                                <td><div class="wire-btn wire-btn-sm">Inspect Dossier</div></td>
                            </tr>
                            <tr>
                                <td><strong>Arnel Manalo</strong></td>
                                <td>0917-334-5566</td>
                                <td>Minanga TODA</td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#029</td>
                                <td>5519-TG</td>
                                <td><span class="wire-badge wire-badge-solid">3 / 3 VERIFIED</span></td>
                                <td><span class="wire-badge wire-badge-solid">ACCREDITED</span></td>
                                <td><div class="wire-btn wire-btn-sm wire-btn-secondary">View Profile</div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        KYC Document Inspection &amp; Municipal Verification Modal
                    </div>

                    <div style="border:1px solid #000000; padding:6px 10px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="font-weight:700; font-size:0.75rem;">INSPECTING ACCREDITATION DOSSIER &mdash; MARIO AGCAOILI (BODY #042)</div>
                        <span class="wire-badge wire-badge-solid">TODA VERIFIED</span>
                    </div>

                    <div class="wire-grid-3">
                        <div style="border:1px solid #000000; padding:6px; background:#ffffff; text-align:center;">
                            <div style="font-size:0.65rem; font-weight:700; margin-bottom:4px;">1. LTO DRIVER'S LICENSE</div>
                            <div style="height:55px; border:1px dashed #000000; display:flex; align-items:center; justify-content:center; font-size:0.62rem;">
                                📄 license_042.jpg<br>(Valid until 2028)
                            </div>
                            <span class="wire-badge wire-badge-solid" style="margin-top:4px;">✓ VALID PRO</span>
                        </div>

                        <div style="border:1px solid #000000; padding:6px; background:#ffffff; text-align:center;">
                            <div style="font-size:0.65rem; font-weight:700; margin-bottom:4px;">2. TRICYCLE FRANCHISE PERMIT</div>
                            <div style="height:55px; border:1px dashed #000000; display:flex; align-items:center; justify-content:center; font-size:0.62rem;">
                                📄 franchise_042.pdf<br>(Permit #2026-TODA-042)
                            </div>
                            <span class="wire-badge wire-badge-solid" style="margin-top:4px;">✓ LGU COMPLIANT</span>
                        </div>

                        <div style="border:1px solid #000000; padding:6px; background:#ffffff; text-align:center;">
                            <div style="font-size:0.65rem; font-weight:700; margin-bottom:4px;">3. BARANGAY CLEARANCE</div>
                            <div style="height:55px; border:1px dashed #000000; display:flex; align-items:center; justify-content:center; font-size:0.62rem;">
                                📄 brgy_042.jpg<br>(Barangay Poblacion I)
                            </div>
                            <span class="wire-badge wire-badge-solid" style="margin-top:4px;">✓ CLEARED</span>
                        </div>
                    </div>

                    <div class="wire-action-row">
                        <div class="wire-btn wire-btn-secondary" style="padding:4px 16px;">Reject Accreditation (State Reason)</div>
                        <div class="wire-btn" style="padding:4px 24px;">✓ Approve &amp; Accredit Driver Partner</div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Portal: PiatMoveAdmin &bull; drivers.php</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>KYC Approval Workflow:</strong> Approving updates <span class="wire-spec-code">drivers.is_verified = 1</span> and unlocks the driver's ability to switch to "Online".</li>
                    <li><strong>Document Security:</strong> Uploaded files stored in <span class="wire-spec-code">uploads/drivers/</span> with sanitized hashes.</li>
                    <li><strong>Audit Logging:</strong> Logs admin username, timestamp, and decision reason in the municipal audit table.</li>
                    <li><strong>Automated Driver SMS:</strong> Dispatches SMS notice to driver confirming municipal accreditation.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 11 of 12 &bull; Municipal Driver Accreditation &amp; KYC Audit</span>
            </div>
        </section>
`);

// ==========================================
// PAGE 12: ADMIN FARE MATRIX & REGULATORY AUDIT
// ==========================================
p.push(`
        <section class="prototype-page" id="p12">
            <div class="proto-header">
                <div class="proto-tag">MUNICIPAL ADMIN WEB PORTAL PROTOTYPE</div>
                <div class="proto-title">MUNICIPAL FARE REGULATION, BOOKINGS AUDIT &amp; ANALYTICS (bookings.php &amp; report.php)</div>
            </div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Comprehensive Municipal Booking Audit Ledger (bookings.php)
                    </div>

                    <div style="display:flex; gap:8px; align-items:center; border:1px solid #000000; padding:5px 8px;">
                        <span style="font-size:0.65rem; font-weight:700;">Filter Ledger:</span>
                        <div class="wire-input" style="flex:1; height:24px;">
                            <span class="wire-input-val">Date: Today (Sep 24, 2026)</span>
                        </div>
                        <div class="wire-input" style="flex:1; height:24px;">
                            <span class="wire-input-val">Category: All Discount Tiers</span>
                        </div>
                        <div class="wire-input" style="flex:1; height:24px;">
                            <span class="wire-input-val">TODA: All Terminals</span>
                        </div>
                        <div class="wire-btn wire-btn-sm">Filter</div>
                    </div>

                    <table class="wire-table">
                        <thead>
                            <tr>
                                <th>Booking Ref</th>
                                <th>Date/Time</th>
                                <th>Commuter</th>
                                <th>Driver &amp; Unit</th>
                                <th>Tariff</th>
                                <th>Discount</th>
                                <th>Net Cash</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1092</td>
                                <td>09:14 AM</td>
                                <td>Maria Cristina Santos</td>
                                <td>Mario Agcaoili (042)</td>
                                <td>&#8369;20.00</td>
                                <td><span class="wire-badge wire-badge-solid">20% STUDENT</span></td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;16.00</td>
                                <td style="font-weight:700;">★ 5.0</td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1090</td>
                                <td>08:48 AM</td>
                                <td>Elena Fernandez</td>
                                <td>Danilo Pascual (019)</td>
                                <td>&#8369;20.00</td>
                                <td><span class="wire-badge wire-badge-solid">20% SENIOR</span></td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;16.00</td>
                                <td style="font-weight:700;">★ 5.0</td>
                            </tr>
                            <tr>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">#BK-1088</td>
                                <td>08:30 AM</td>
                                <td>Ramon Bautista</td>
                                <td>Efren Rivera (035)</td>
                                <td>&#8369;20.00</td>
                                <td><span class="wire-badge">REGULAR</span></td>
                                <td style="font-family:'JetBrains Mono'; font-weight:700;">&#8369;20.00</td>
                                <td style="font-weight:700;">★ 4.8</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="wire-action-row">
                        <span style="font-size:0.64rem;">Showing 1,482 daily records</span>
                        <div style="display:flex; gap:8px;">
                            <div class="wire-btn wire-btn-secondary">Export CSV / Excel</div>
                            <div class="wire-btn wire-btn-secondary">Export Official PDF Ledger</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wire-arrow-down">&darr;</div>

            <div class="wire-frame-box">
                <div class="wire-frame-inner">
                    <div class="wire-banner">
                        Municipal Regulatory &amp; Subsidy Analytics Report (report.php)
                    </div>

                    <div class="wire-grid-3">
                        <div class="wire-card">
                            <span class="wire-card-title">Daily Commuters Carried</span>
                            <span class="wire-card-val">1,482 Commuters</span>
                            <span class="wire-card-sub">Peak: 07:00 - 09:00 AM</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Total Statutory Discount</span>
                            <span class="wire-card-val">&#8369;4,184.00</span>
                            <span class="wire-card-sub">Commuter Social Savings</span>
                        </div>
                        <div class="wire-card">
                            <span class="wire-card-title">Driver Retention</span>
                            <span class="wire-card-val">100% Retained</span>
                            <span class="wire-card-sub">Zero Platform Deduction</span>
                        </div>
                    </div>

                    <div style="border:1px solid #000000; padding:6px 10px; border-radius:2px;">
                        <div style="font-weight:700; font-size:0.68rem; margin-bottom:3px;">STATUTORY COMMUTE BENEFICIARY DISTRIBUTION (SEPTEMBER 2026):</div>
                        <div style="display:flex; justify-content:space-between; font-size:0.65rem; margin-bottom:2px;">
                            <span>🎓 Students (CSU Piat, High Schools):</span>
                            <span style="font-weight:700;">48.2% (714 trips &bull; &#8369;11,424.00)</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.65rem; margin-bottom:2px;">
                            <span>👴 Senior Citizens (Piat OSCA):</span>
                            <span style="font-weight:700;">24.6% (365 trips &bull; &#8369;5,840.00)</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.65rem; margin-bottom:2px;">
                            <span>♿ Persons with Disability &amp; Pregnant Mothers:</span>
                            <span style="font-weight:700;">11.8% (175 trips &bull; &#8369;2,800.00)</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.65rem;">
                            <span>👤 Regular Commuters:</span>
                            <span style="font-weight:700;">15.4% (228 trips &bull; &#8369;4,560.00)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wire-spec-box">
                <div class="wire-spec-title">
                    <span>Component &amp; Technical Specification</span>
                    <span class="wire-spec-code">Portal: PiatMoveAdmin &bull; bookings.php &amp; report.php</span>
                </div>
                <ul class="wire-spec-list">
                    <li><strong>Regulatory Compliance:</strong> Aligns with Municipal Ordinance No. 2026-04 setting base fares at ₱20 and statutory discounts at ₱16.</li>
                    <li><strong>Hostinger Production:</strong> Live at <span class="wire-spec-code">https://piatmoveadmin.online/admin/report.php</span>.</li>
                    <li><strong>Export Engine:</strong> Formats downloadable reports in standard CSV and printable A4 PDF formats.</li>
                    <li><strong>Performance Optimization:</strong> Database indexing on <span class="wire-spec-code">created_at, status, discount_type</span>.</li>
                </ul>
            </div>

            <div class="proto-footer">
                <span class="proto-footer-brand">PiatMove Mobility System Prototype</span>
                <span>Page 12 of 12 &bull; Municipal Fare Regulations &amp; Regulatory Audit</span>
            </div>
        </section>
`);

// Close Main & Add Interactive Scripts
p.push(`
    </main>

    <script>
        function jumpToPage(pageId) {
            const el = document.getElementById(pageId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    </script>
</body>
</html>
`);

const finalOutput = p.join('');
fs.writeFileSync(targetHtml, finalOutput, 'utf8');
console.log('Successfully wrote simple monochrome prototype HTML (' + finalOutput.length + ' bytes)');
