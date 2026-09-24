const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '..', 'prototype_piatmove.html');

console.log('Generating PiatMove Prototype HTML at:', outputPath);

// We'll write the script that compiles the complete HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PiatMove - Municipal Tricycle Booking &amp; Mobility Dispatch Platform (Specification &amp; UI Prototype)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --piat-primary: #1565c0;
            --piat-primary-dark: #0d47a1;
            --piat-electric: #2454e0;
            --piat-accent: #12b76a;
            --piat-amber: #f59e0b;
            --piat-crimson: #ef4444;
            --piat-purple: #7c3aed;
            --piat-ink: #0f172a;
            --piat-muted: #475569;
            --piat-border: #90caf9;
            --piat-border-light: #e2e8f4;
            --piat-bg-subtle: #f0f4ff;
        }

        /* Color Scheme Modes: Blue Theme (Default) */
        body.color-theme {
            --frame-border: #1565c0;
            --frame-inner-border: #1976d2;
            --banner-bg: #1565c0;
            --banner-text: #ffffff;
            --header-sub-bg: #e3f2fd;
            --header-sub-text: #0d47a1;
            --input-bg: #f8faff;
            --input-border: #90caf9;
            --btn-primary-bg: #1976d2;
            --btn-primary-text: #ffffff;
            --btn-secondary-bg: #ffffff;
            --btn-secondary-text: #1565c0;
            --btn-secondary-border: #1565c0;
            --btn-accent-bg: #12b76a;
            --btn-accent-text: #ffffff;
            --btn-danger-bg: #ef4444;
            --btn-danger-text: #ffffff;
            --arrow-color: #1565c0;
            --badge-safe-bg: #d1fae5;
            --badge-safe-text: #065f46;
            --badge-safe-border: #10b981;
            --badge-alert-bg: #fee2e2;
            --badge-alert-text: #991b1b;
            --badge-alert-border: #ef4444;
            --badge-blue-bg: #dbeafe;
            --badge-blue-text: #1e40af;
            --badge-blue-border: #3b82f6;
            --badge-amber-bg: #fef3c7;
            --badge-amber-text: #92400e;
            --badge-amber-border: #f59e0b;
            --badge-purple-bg: #ede9fe;
            --badge-purple-text: #5b21b6;
            --badge-purple-border: #8b5cf6;
            --stat-card-bg: #f0f4ff;
            --table-th-bg: #e3f2fd;
            --table-th-text: #0d47a1;
            --highlight-bg: #e8efff;
        }

        body.monochrome-theme {
            --frame-border: #000000;
            --frame-inner-border: #000000;
            --banner-bg: #ffffff;
            --banner-text: #000000;
            --header-sub-bg: #ffffff;
            --header-sub-text: #000000;
            --input-bg: #ffffff;
            --input-border: #000000;
            --btn-primary-bg: #ffffff;
            --btn-primary-text: #000000;
            --btn-secondary-bg: #ffffff;
            --btn-secondary-text: #000000;
            --btn-secondary-border: #000000;
            --btn-accent-bg: #ffffff;
            --btn-accent-text: #000000;
            --btn-danger-bg: #ffffff;
            --btn-danger-text: #000000;
            --arrow-color: #000000;
            --badge-safe-bg: #ffffff;
            --badge-safe-text: #000000;
            --badge-safe-border: #000000;
            --badge-alert-bg: #ffffff;
            --badge-alert-text: #000000;
            --badge-alert-border: #000000;
            --badge-blue-bg: #ffffff;
            --badge-blue-text: #000000;
            --badge-blue-border: #000000;
            --badge-amber-bg: #ffffff;
            --badge-amber-text: #000000;
            --badge-amber-border: #000000;
            --badge-purple-bg: #ffffff;
            --badge-purple-text: #000000;
            --badge-purple-border: #000000;
            --stat-card-bg: #ffffff;
            --table-th-bg: #ffffff;
            --table-th-text: #000000;
            --highlight-bg: #f1f5f9;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #3b4252;
            color: #0f172a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        /* Screen Control Bar (Sticky when previewed in browser) */
        .no-print-toolbar {
            position: sticky;
            top: 0;
            z-index: 9999;
            background: #0d2847;
            color: #ffffff;
            padding: 12px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 16px rgba(0,0,0,0.4);
            border-bottom: 2px solid var(--piat-electric);
        }

        .toolbar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
            font-size: 1.02rem;
            letter-spacing: 0.5px;
        }

        .toolbar-badge {
            background: var(--piat-electric);
            color: #fff;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
        }

        .toolbar-actions {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .toolbar-btn {
            background: #1565c0;
            color: #fff;
            border: 1px solid #90caf9;
            padding: 7px 15px;
            border-radius: 6px;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            transition: all 0.2s ease;
            text-decoration: none;
        }

        .toolbar-btn:hover {
            background: #1976d2;
            color: #fff;
        }

        .toolbar-btn-print {
            background: #12b76a;
            border-color: #86efac;
            color: #ffffff;
            font-weight: 700;
        }
        .toolbar-btn-print:hover {
            background: #0e9355;
        }

        .toolbar-select {
            background: #08182b;
            color: #fff;
            border: 1px solid #1976d2;
            padding: 7px 12px;
            border-radius: 6px;
            font-size: 0.82rem;
        }

        /* Printable Prototype Page Canvas */
        .prototype-canvas {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px 0 60px;
            gap: 32px;
        }

        .prototype-page {
            width: 210mm;
            min-height: 297mm;
            padding: 12mm 15mm 12mm 15mm;
            background: #ffffff;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            page-break-after: always;
            break-after: page;
        }

        /* Top Header */
        .proto-header {
            text-align: center;
            margin-bottom: 8px;
        }

        .proto-header .proto-tag {
            font-size: 0.82rem;
            font-weight: 800;
            letter-spacing: 2px;
            color: var(--frame-border);
            text-transform: uppercase;
            margin-bottom: 2px;
        }

        .proto-header .proto-title {
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 1.2px;
            color: #0f172a;
            text-transform: uppercase;
        }

        /* Main Double-Bordered Wireframe Containers */
        .wire-frame-box {
            border: 2px solid var(--frame-border);
            padding: 3px;
            background: #ffffff;
            margin-bottom: 2px;
        }

        .wire-frame-inner {
            border: 1px solid var(--frame-inner-border);
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        /* Banner title box */
        .wire-banner {
            border: 1.5px solid var(--frame-border);
            background: var(--banner-bg);
            color: var(--banner-text);
            text-align: center;
            padding: 5px 10px;
            font-size: 0.80rem;
            font-weight: 700;
            letter-spacing: 0.4px;
        }

        /* Subheader tabs bar */
        .wire-tabs {
            display: flex;
            border: 1px solid var(--frame-border);
            text-align: center;
            font-size: 0.72rem;
            font-weight: 600;
            overflow: hidden;
        }

        .wire-tab {
            flex: 1;
            padding: 4px 6px;
            background: var(--header-sub-bg);
            color: var(--header-sub-text);
            border-right: 1px solid var(--frame-border);
        }

        .wire-tab:last-child {
            border-right: none;
        }

        .wire-tab.active {
            background: var(--banner-bg);
            color: #ffffff;
        }

        /* Form Row & Field Layout */
        .wire-form-row {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.72rem;
        }

        .wire-label {
            width: 150px;
            font-weight: 600;
            color: #0f172a;
            flex-shrink: 0;
        }

        .wire-input {
            flex: 1;
            height: 26px;
            border: 1px solid var(--input-border);
            background: var(--input-bg);
            padding: 0 8px;
            font-size: 0.70rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #1e293b;
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
            color: var(--piat-muted);
        }

        /* Flow Arrow Between Panels */
        .wire-arrow-down {
            text-align: center;
            font-size: 1.2rem;
            line-height: 1;
            color: var(--arrow-color);
            margin: 6px 0;
            font-weight: 800;
        }

        /* Button elements */
        .wire-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 12px;
            font-size: 0.70rem;
            font-weight: 600;
            border: 1px solid var(--frame-border);
            background: var(--btn-primary-bg);
            color: var(--btn-primary-text);
            border-radius: 2px;
            cursor: default;
        }

        .wire-btn-secondary {
            background: var(--btn-secondary-bg);
            color: var(--btn-secondary-text);
            border: 1px solid var(--btn-secondary-border);
        }

        .wire-btn-accent {
            background: var(--btn-accent-bg);
            color: var(--btn-accent-text);
            border: 1px solid #10b981;
        }

        .wire-btn-danger {
            background: var(--btn-danger-bg);
            color: var(--btn-danger-text);
            border: 1px solid #ef4444;
        }

        .wire-btn-sm {
            padding: 2px 8px;
            font-size: 0.65rem;
        }

        .wire-action-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 4px;
            border-top: 1px dashed var(--piat-border);
            font-size: 0.70rem;
        }

        .wire-link {
            color: var(--frame-border);
            text-decoration: underline;
            font-size: 0.70rem;
            font-weight: 600;
            cursor: pointer;
        }

        /* Badge status indicators */
        .wire-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 7px;
            border-radius: 3px;
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border: 1px solid transparent;
        }

        .wire-badge-safe {
            background: var(--badge-safe-bg);
            color: var(--badge-safe-text);
            border-color: var(--badge-safe-border);
        }

        .wire-badge-alert {
            background: var(--badge-alert-bg);
            color: var(--badge-alert-text);
            border-color: var(--badge-alert-border);
        }

        .wire-badge-blue {
            background: var(--badge-blue-bg);
            color: var(--badge-blue-text);
            border-color: var(--badge-blue-border);
        }

        .wire-badge-amber {
            background: var(--badge-amber-bg);
            color: var(--badge-amber-text);
            border-color: var(--badge-amber-border);
        }

        .wire-badge-purple {
            background: var(--badge-purple-bg);
            color: var(--badge-purple-text);
            border-color: var(--badge-purple-border);
        }

        /* Metric / Card Grid */
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

        .wire-grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }

        .wire-card {
            border: 1px solid var(--frame-inner-border);
            background: var(--stat-card-bg);
            padding: 6px 8px;
            border-radius: 2px;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .wire-card-title {
            font-size: 0.62rem;
            font-weight: 700;
            color: var(--piat-muted);
            text-transform: uppercase;
        }

        .wire-card-val {
            font-size: 0.95rem;
            font-weight: 800;
            color: var(--frame-border);
            font-family: 'JetBrains Mono', monospace;
        }

        .wire-card-sub {
            font-size: 0.60rem;
            color: var(--piat-muted);
        }

        /* Table styles */
        .wire-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.68rem;
            border: 1px solid var(--frame-border);
        }

        .wire-table th {
            background: var(--table-th-bg);
            color: var(--table-th-text);
            padding: 4px 6px;
            text-align: left;
            font-weight: 700;
            border: 1px solid var(--frame-inner-border);
        }

        .wire-table td {
            padding: 4px 6px;
            border: 1px solid var(--piat-border-light);
            background: #ffffff;
            color: #1e293b;
        }

        .wire-table tr:nth-child(even) td {
            background: var(--highlight-bg);
        }

        /* Spec / Documentation Box at Bottom */
        .wire-spec-box {
            border: 1px solid var(--frame-border);
            background: #fdfdfd;
            padding: 8px 10px;
            font-size: 0.68rem;
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin-top: 4px;
        }

        .wire-spec-title {
            font-weight: 800;
            color: var(--frame-border);
            font-size: 0.70rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--frame-inner-border);
            padding-bottom: 3px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .wire-spec-list {
            list-style: none;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px 12px;
        }

        .wire-spec-list li {
            position: relative;
            padding-left: 10px;
            line-height: 1.3;
            color: #334155;
        }

        .wire-spec-list li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: var(--frame-border);
            font-weight: 800;
        }

        .wire-spec-code {
            font-family: 'JetBrains Mono', monospace;
            background: #eef2ff;
            padding: 1px 4px;
            border-radius: 2px;
            color: #1e40af;
            font-weight: 600;
            font-size: 0.65rem;
        }

        /* Page Footer */
        .proto-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid var(--frame-border);
            padding-top: 6px;
            margin-top: 8px;
            font-size: 0.68rem;
            color: var(--piat-muted);
            font-weight: 500;
        }

        .proto-footer-brand {
            font-weight: 700;
            color: var(--frame-border);
        }

        /* Print Media Styles */
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
                padding: 12mm 14mm !important;
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
<body class="color-theme">

    <!-- Interactive Navigation Bar (Web View Only) -->
    <header class="no-print-toolbar">
        <div class="toolbar-brand">
            <span>PiatMove Integrated Mobility System</span>
            <span class="toolbar-badge">Tri-Portal Blueprint</span>
        </div>
        <div class="toolbar-actions">
            <select class="toolbar-select" onchange="jumpToPage(this.value)">
                <option value="p1">Page 1: System Topology &amp; Architecture</option>
                <option value="p2">Page 2: Passenger Auth &amp; 20% Discount Signup</option>
                <option value="p3">Page 3: Passenger Booking &amp; Landmark Matrix</option>
                <option value="p4">Page 4: Passenger Ride Tracker &amp; Rating</option>
                <option value="p5">Page 5: Passenger History &amp; Commuter Profile</option>
                <option value="p6">Page 6: Driver Auth &amp; TODA KYC Upload</option>
                <option value="p7">Page 7: Driver Duty Console &amp; Incoming Alert</option>
                <option value="p8">Page 8: Driver Active Trip &amp; Fare Collection</option>
                <option value="p9">Page 9: Driver Trip Log &amp; Shift Income Report</option>
                <option value="p10">Page 10: Admin Web Dispatch &amp; Executive KPI</option>
                <option value="p11">Page 11: Admin Driver Franchise &amp; KYC Audit</option>
                <option value="p12">Page 12: Admin Fare Matrix &amp; Regulatory Audit</option>
            </select>
            <button class="toolbar-btn" onclick="toggleTheme()">
                <span id="themeBtnText">🎨 Theme: Piat Blue</span>
            </button>
            <button class="toolbar-btn toolbar-btn-print" onclick="window.print()">
                <span>🖨️ Export / Print PDF (A4)</span>
            </button>
        </div>
    </header>

    <main class="prototype-canvas">
`;

fs.writeFileSync(path.resolve(__dirname, 'head.html'), html);
console.log('Saved head.html');
