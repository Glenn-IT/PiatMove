const fs = require('fs');
const path = require('path');

const targetHtml = path.resolve(__dirname, '..', 'prototype_piatmove.html');

console.log('Building Monochrome Visual UI Prototype (Smartphone & Browser Frames) at:', targetHtml);

// 1. Read compile_visual_prototype.js
const compileVisualPath = path.resolve(__dirname, 'compile_visual_prototype.js');
let scriptCode = fs.readFileSync(compileVisualPath, 'utf8');

// 2. Prepare Monochrome CSS Head
const monochromeHead = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PiatMove - Visual UI/UX Prototype Specification (Monochrome Wireframe)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #000000;
            --primary-dark: #000000;
            --primary-light: #f1f5f9;
            --electric-blue: #000000;
            --accent-green: #000000;
            --accent-green-bg: #f8fafc;
            --accent-amber: #000000;
            --accent-amber-bg: #f8fafc;
            --accent-red: #000000;
            --accent-red-bg: #f8fafc;
            --accent-purple: #000000;
            --accent-purple-bg: #f8fafc;
            --slate-900: #000000;
            --slate-700: #1e293b;
            --slate-500: #475569;
            --slate-300: #cbd5e1;
            --slate-100: #f1f5f9;
            --slate-50: #f8fafc;
            --border-color: #000000;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            background-color: #444444;
            color: #000000;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        /* Top Navigation Bar for Web Preview */
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
            font-weight: 800;
            font-size: 1rem;
            letter-spacing: 0.5px;
        }

        .toolbar-badge {
            background: #ffffff;
            color: #000000;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.68rem;
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
            background: #ffffff;
            color: #000000;
            border: 1px solid #ffffff;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 0.80rem;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            text-decoration: none;
            transition: all 0.2s;
        }

        .toolbar-btn:hover {
            background: #e2e8f0;
        }

        .toolbar-select {
            background: #222222;
            color: #ffffff;
            border: 1px solid #555555;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.80rem;
        }

        /* Printable Canvas */
        .prototype-canvas {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0 60px;
            gap: 30px;
        }

        .prototype-page {
            width: 210mm;
            min-height: 297mm;
            padding: 10mm 12mm 9mm 12mm;
            background: #ffffff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.35);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            page-break-after: always;
            break-after: page;
        }

        /* Page Header */
        .page-header-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #000000;
            padding-bottom: 6px;
            margin-bottom: 10px;
        }

        .header-title-box h1 {
            font-size: 1.05rem;
            font-weight: 800;
            color: #000000;
            letter-spacing: -0.2px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .header-title-box p {
            font-size: 0.68rem;
            color: #334155;
            font-weight: 600;
            margin-top: 1px;
        }

        .header-tag-pill {
            background: #ffffff;
            color: #000000;
            border: 1.5px solid #000000;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.64rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }

        /* Dual Phone Mockup Layout */
        .dual-phone-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            justify-items: center;
            align-items: start;
            margin-bottom: 8px;
        }

        .phone-column {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .phone-title-badge {
            background: #ffffff;
            border: 1px solid #000000;
            color: #000000;
            font-size: 0.68rem;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 12px;
            margin-bottom: 6px;
            text-align: center;
            letter-spacing: 0.3px;
        }

        /* Realistic Smartphone Device Mockup */
        .phone-mockup {
            width: 320px;
            height: 610px;
            background: #000000;
            border-radius: 40px;
            padding: 9px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 2px #000000;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .phone-screen {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 32px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
            font-size: 0.72rem;
            border: 1px solid #000000;
        }

        /* Dynamic Island & Status Bar */
        .status-bar {
            height: 32px;
            padding: 0 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.65rem;
            font-weight: 700;
            color: #000000;
            position: relative;
            z-index: 20;
            flex-shrink: 0;
            background: transparent;
        }

        .status-bar.white-text {
            color: #ffffff;
        }

        .dynamic-island {
            width: 78px;
            height: 18px;
            background: #000000;
            border-radius: 12px;
            position: absolute;
            left: 50%;
            top: 6px;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 7px;
        }

        .notch-camera {
            width: 7px;
            height: 7px;
            background: #222222;
            border-radius: 50%;
            border: 1px solid #444444;
        }

        .notch-sensor {
            width: 5px;
            height: 5px;
            background: #111111;
            border-radius: 50%;
        }

        .status-icons {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.65rem;
        }

        /* Screen Content Body */
        .screen-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background: #ffffff;
            position: relative;
        }

        /* Bottom Navigation Bar */
        .bottom-nav {
            height: 48px;
            background: #ffffff;
            border-top: 1px solid #000000;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 8px;
            flex-shrink: 0;
            z-index: 20;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            font-size: 0.55rem;
            font-weight: 600;
            color: #64748b;
            cursor: pointer;
        }

        .nav-item.active {
            color: #000000;
            font-weight: 800;
        }

        .nav-item-icon {
            font-size: 0.95rem;
        }

        .home-indicator {
            width: 110px;
            height: 4px;
            background: #000000;
            border-radius: 3px;
            margin: 4px auto 3px;
            opacity: 0.8;
        }

        /* UI Component Primitives */
        .ui-header-card {
            background: #000000;
            color: #ffffff;
            padding: 16px 14px 14px;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            margin-top: -32px;
            padding-top: 40px;
        }

        .ui-input-group {
            margin-bottom: 9px;
        }

        .ui-label {
            font-size: 0.62rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 3px;
            display: block;
        }

        .ui-input {
            width: 100%;
            height: 32px;
            border: 1px solid #000000;
            border-radius: 6px;
            padding: 0 10px;
            font-size: 0.68rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #ffffff;
            color: #000000;
        }

        .ui-btn-primary {
            background: #000000;
            color: #ffffff;
            border: 1px solid #000000;
            border-radius: 20px;
            padding: 8px 14px;
            font-size: 0.72rem;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
            box-shadow: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .ui-btn-success {
            background: #000000;
            color: #ffffff;
            border: 1px solid #000000;
            border-radius: 20px;
            padding: 8px 14px;
            font-size: 0.72rem;
            font-weight: 700;
            text-align: center;
            box-shadow: none;
        }

        .ui-btn-outline {
            background: #ffffff;
            color: #000000;
            border: 1.5px solid #000000;
            border-radius: 20px;
            padding: 6px 12px;
            font-size: 0.68rem;
            font-weight: 700;
            text-align: center;
        }

        .ui-badge-pill {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 7px;
            border-radius: 12px;
            font-size: 0.58rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border: 1px solid #000000;
            background: #ffffff;
            color: #000000;
        }

        .badge-green, .badge-blue, .badge-amber, .badge-red, .badge-purple {
            background: #ffffff;
            color: #000000;
            border: 1px solid #000000;
        }

        /* Map Simulation Container */
        .map-bg {
            background: #f8fafc;
            position: relative;
            overflow: hidden;
            width: 100%;
            border-radius: 12px;
            border: 1px solid #000000;
            background-image: 
                radial-gradient(#cbd5e1 1.5px, transparent 1.5px),
                linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            background-size: 20px 20px, 40px 40px, 40px 40px;
        }

        .map-road-1 {
            position: absolute;
            width: 160%;
            height: 12px;
            background: #ffffff;
            border-top: 1px solid #000000;
            border-bottom: 1px solid #000000;
            transform: rotate(-25deg);
            top: 45%;
            left: -30%;
        }

        .map-road-2 {
            position: absolute;
            height: 160%;
            width: 10px;
            background: #ffffff;
            border-left: 1px solid #000000;
            border-right: 1px solid #000000;
            transform: rotate(35deg);
            top: -30%;
            left: 55%;
        }

        .route-polyline {
            position: absolute;
            width: 130px;
            height: 3px;
            background: #000000;
            box-shadow: none;
            transform: rotate(-15deg);
            top: 50%;
            left: 28%;
            z-index: 5;
        }

        .map-pin {
            position: absolute;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #000000;
            color: #ffffff;
            border: 1px solid #ffffff;
        }

        /* Desktop Browser Window Mockup */
        .browser-window {
            width: 100%;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            border: 1.5px solid #000000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            margin-bottom: 6px;
        }

        .browser-chrome {
            height: 34px;
            background: #111111;
            padding: 0 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
            border-bottom: 1px solid #000000;
        }

        .chrome-dots {
            display: flex;
            gap: 5px;
        }

        .chrome-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            border: 1px solid #333333;
        }
        .dot-red { background: #555555; }
        .dot-yellow { background: #888888; }
        .dot-green { background: #cccccc; }

        .chrome-url-bar {
            flex: 1;
            height: 22px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #000000;
            display: flex;
            align-items: center;
            padding: 0 10px;
            font-size: 0.65rem;
            color: #000000;
            font-family: 'JetBrains Mono', monospace;
            gap: 6px;
        }

        .browser-body {
            height: 615px;
            display: flex;
            background: #ffffff;
            overflow: hidden;
        }

        /* Admin Layout Structure */
        .admin-sidebar {
            width: 165px;
            background: #111111;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 12px 8px;
            flex-shrink: 0;
            border-right: 1px solid #000000;
        }

        .admin-nav-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 7px 10px;
            border-radius: 6px;
            font-size: 0.68rem;
            font-weight: 600;
            color: #94a3b8;
            margin-bottom: 2px;
            cursor: pointer;
        }

        .admin-nav-item.active {
            background: #ffffff;
            color: #000000;
            font-weight: 800;
        }

        .admin-content-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background: #ffffff;
        }

        .admin-top-bar {
            height: 42px;
            background: #ffffff;
            border-bottom: 1px solid #000000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            flex-shrink: 0;
        }

        .admin-main-scroll {
            flex: 1;
            padding: 12px 14px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        /* Admin Cards & Data Tables */
        .admin-kpi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }

        .admin-kpi-card {
            background: #ffffff;
            border: 1px solid #000000;
            border-left: 4px solid #000000;
            border-radius: 8px;
            padding: 9px 12px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            box-shadow: none;
        }

        .admin-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.66rem;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #000000;
        }

        .admin-table th {
            background: #000000;
            color: #ffffff;
            padding: 6px 10px;
            text-align: left;
            font-weight: 700;
            border-bottom: 1px solid #000000;
        }

        .admin-table td {
            padding: 6px 10px;
            border-bottom: 1px solid #000000;
            color: #000000;
        }

        .admin-table tr:hover td {
            background: #f8fafc;
        }

        /* Annotation Bar at Bottom of Page */
        .page-annotations {
            background: #ffffff;
            border: 1px solid #000000;
            border-radius: 6px;
            padding: 6px 12px;
            font-size: 0.65rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 4px;
            color: #000000;
        }

        .anno-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .anno-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #000000;
        }

        /* Footer */
        .proto-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #000000;
            padding-top: 5px;
            margin-top: 6px;
            font-size: 0.65rem;
            color: #000000;
            font-weight: 600;
        }

        .proto-footer-brand {
            font-weight: 800;
            color: #000000;
        }

        @media print {
            body { background: #ffffff; margin: 0; padding: 0; }
            .no-print-toolbar { display: none !important; }
            .prototype-canvas { padding: 0; gap: 0; }
            .prototype-page {
                box-shadow: none;
                margin: 0;
                width: 100% !important;
                min-height: 100vh !important;
                padding: 10mm 12mm !important;
                page-break-after: always !important;
                break-after: page !important;
            }
            @page { size: A4 portrait; margin: 0; }
        }
    </style>
</head>
<body>

    <header class="no-print-toolbar">
        <div class="toolbar-brand">
            <span>🛵 PiatMove Mobility Platform</span>
            <span class="toolbar-badge">Simple Monochrome Visual Prototype</span>
        </div>
        <div class="toolbar-actions">
            <select class="toolbar-select" onchange="jumpToPage(this.value)">
                <option value="p1">Page 1: Visual Design System &amp; Portal Topology</option>
                <option value="p2">Page 2: Passenger &mdash; Splash &amp; Login Visual</option>
                <option value="p3">Page 3: Passenger &mdash; Landmark Route &amp; Booking</option>
                <option value="p4">Page 4: Passenger &mdash; Live Tracking &amp; Driver Rating</option>
                <option value="p5">Page 5: Passenger &mdash; Trip History &amp; Profile Hub</option>
                <option value="p6">Page 6: Driver &mdash; Partner Sign-In &amp; TODA KYC</option>
                <option value="p7">Page 7: Driver &mdash; Duty Console &amp; Incoming Radar</option>
                <option value="p8">Page 8: Driver &mdash; Turn Navigation &amp; Cash Fare</option>
                <option value="p9">Page 9: Driver &mdash; Shift Trips &amp; Income Analytics</option>
                <option value="p10">Page 10: Admin &mdash; Live Dispatch Command Center</option>
                <option value="p11">Page 11: Admin &mdash; Driver Franchise &amp; KYC Audit</option>
                <option value="p12">Page 12: Admin &mdash; Fare Matrix &amp; Subsidy Analytics</option>
            </select>
            <button class="toolbar-btn toolbar-btn-print" onclick="window.print()">
                <span>🖨️ Export / Print PDF (A4)</span>
            </button>
        </div>
    </header>

    <main class="prototype-canvas">
`;

// Extract pages from compile_visual_prototype.js (everything from first <section class="prototype-page" id="p1"> onwards)
const pageStartIndex = scriptCode.indexOf('<section class="prototype-page" id="p1">');
const pageEndIndex = scriptCode.lastIndexOf('</main>');

if (pageStartIndex === -1 || pageEndIndex === -1) {
    console.error('Failed to locate page boundaries in compile_visual_prototype.js');
    process.exit(1);
}

let pagesContent = scriptCode.substring(pageStartIndex, pageEndIndex);

// Apply comprehensive monochrome replacements across all inline colors
pagesContent = pagesContent
    // Blues
    .replace(/#2454e0/gi, '#000000')
    .replace(/#1565c0/gi, '#000000')
    .replace(/#0d47a1/gi, '#000000')
    .replace(/#1e40af/gi, '#000000')
    .replace(/#1d4ed8/gi, '#000000')
    .replace(/#f0f4ff/gi, '#f8fafc')
    .replace(/#eff6ff/gi, '#f8fafc')
    .replace(/#e3f2fd/gi, '#f8fafc')
    .replace(/#dbeafe/gi, '#f8fafc')
    .replace(/#bfdbfe/gi, '#ffffff')
    .replace(/#93c5fd/gi, '#ffffff')
    .replace(/#90caf9/gi, '#000000')
    .replace(/#3b82f6/gi, '#000000')
    
    // Greens
    .replace(/#12b76a/gi, '#000000')
    .replace(/#065f46/gi, '#000000')
    .replace(/#047857/gi, '#000000')
    .replace(/#059669/gi, '#000000')
    .replace(/#ecfdf3/gi, '#f8fafc')
    .replace(/#d1fae5/gi, '#f8fafc')
    .replace(/#86efac/gi, '#000000')
    .replace(/#10b981/gi, '#000000')

    // Ambers / Yellows
    .replace(/#f59e0b/gi, '#000000')
    .replace(/#92400e/gi, '#000000')
    .replace(/#b45309/gi, '#000000')
    .replace(/#d97706/gi, '#000000')
    .replace(/#fffbeb/gi, '#f8fafc')
    .replace(/#fef3c7/gi, '#f8fafc')
    .replace(/#fde68a/gi, '#000000')

    // Reds
    .replace(/#ef4444/gi, '#000000')
    .replace(/#991b1b/gi, '#000000')
    .replace(/#fee2e2/gi, '#f8fafc')
    .replace(/#fef2f2/gi, '#f8fafc')
    .replace(/#fca5a5/gi, '#000000')

    // Purples
    .replace(/#7c3aed/gi, '#000000')
    .replace(/#5b21b6/gi, '#000000')
    .replace(/#ede9fe/gi, '#f8fafc')
    .replace(/#f5f3ff/gi, '#f8fafc')
    .replace(/#8b5cf6/gi, '#000000')

    // Gradients & Shadows
    .replace(/linear-gradient\(135deg,\s*#000000,\s*#000000\)/gi, '#000000')
    .replace(/box-shadow:[^;]+;/gi, 'box-shadow:none;')

    // Page 1 color swatches title
    .replace(/OFFICIAL MUNICIPAL BLUE DESIGN SYSTEM/gi, 'OFFICIAL MUNICIPAL WIREFRAME DESIGN SYSTEM &bull; MONOCHROME SPECIFICATION')
    
    // Clean borders
    .replace(/border:\s*1\.5px\s*solid\s*#000000/gi, 'border:1px solid #000000');

// Combine full HTML
const fullHtml = monochromeHead + pagesContent + `
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
`;

fs.writeFileSync(targetHtml, fullHtml, 'utf8');
console.log('Successfully wrote monochrome visual prototype HTML (' + fullHtml.length + ' bytes)');
