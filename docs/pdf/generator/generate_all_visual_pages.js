const fs = require('fs');
const path = require('path');

const targetHtml = path.resolve(__dirname, '..', 'prototype_piatmove.html');

console.log('Writing generate_all_visual_pages.js to assemble prototype...');

const script = `
const fs = require('fs');
const path = require('path');

const targetHtml = path.resolve(__dirname, '..', 'prototype_piatmove.html');
let p = [];

// Helper functions for SVG icons & components
const phoneStatusBar = (white = false) => \`
    <div class="status-bar \${white ? 'white-text' : ''}">
        <span>09:41</span>
        <div class="dynamic-island">
            <div class="notch-sensor"></div>
            <div class="notch-camera"></div>
        </div>
        <div class="status-icons">
            <span>5G</span>
            <span>📶</span>
            <span>100% 🔋</span>
        </div>
    </div>
\`;

const passengerBottomNav = (active = 'home') => \`
    <div class="bottom-nav">
        <div class="nav-item \${active === 'home' ? 'active' : ''}">
            <div class="nav-item-icon">🏠</div>
            <span>Home</span>
        </div>
        <div class="nav-item \${active === 'trips' ? 'active' : ''}">
            <div class="nav-item-icon">📋</div>
            <span>My Trips</span>
        </div>
        <div class="nav-item \${active === 'alerts' ? 'active' : ''}">
            <div class="nav-item-icon">🔔</div>
            <span>Alerts</span>
        </div>
        <div class="nav-item \${active === 'profile' ? 'active' : ''}">
            <div class="nav-item-icon">👤</div>
            <span>Profile</span>
        </div>
    </div>
    <div class="home-indicator"></div>
\`;

const driverBottomNav = (active = 'radar') => \`
    <div class="bottom-nav">
        <div class="nav-item \${active === 'radar' ? 'active' : ''}">
            <div class="nav-item-icon">📡</div>
            <span>Radar</span>
        </div>
        <div class="nav-item \${active === 'trips' ? 'active' : ''}">
            <div class="nav-item-icon">🛵</div>
            <span>Rides</span>
        </div>
        <div class="nav-item \${active === 'income' ? 'active' : ''}">
            <div class="nav-item-icon">💰</div>
            <span>Income</span>
        </div>
        <div class="nav-item \${active === 'profile' ? 'active' : ''}">
            <div class="nav-item-icon">⚙️</div>
            <span>Account</span>
        </div>
    </div>
    <div class="home-indicator"></div>
\`;

// Read Head
const headContent = fs.readFileSync(path.resolve(__dirname, 'temp_head.txt'), 'utf8');
p.push(headContent);

// ==========================================
// PAGE 1: VISUAL DESIGN SYSTEM & PORTAL SHOWCASE
// ==========================================
p.push(\`
    <section class="prototype-page" id="p1">
        <div class="page-header-row">
            <div class="header-title-box">
                <h1>🛵 PiatMove Integrated Mobility System</h1>
                <p>Municipal Tricycle Booking &amp; Transport Regulation &bull; Municipality of Piat, Cagayan</p>
            </div>
            <div class="header-tag-pill">Page 1 of 12 &bull; Visual Ecosystem</div>
        </div>

        <div style="background:#f0f4ff; border:1px solid #90caf9; border-radius:10px; padding:12px 16px; margin-bottom:12px;">
            <div style="font-weight:800; font-size:0.82rem; color:#0d47a1; margin-bottom:4px;">OFFICIAL MUNICIPAL BLUE DESIGN SYSTEM &bull; TARIFF ORDINANCE NO. 2026-04</div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:28px; height:28px; border-radius:6px; background:#2454e0;"></div>
                    <div><div style="font-size:0.65rem; font-weight:700;">#2454E0</div><div style="font-size:0.58rem; color:#64748b;">Electric Blue (Primary)</div></div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:28px; height:28px; border-radius:6px; background:#1565c0;"></div>
                    <div><div style="font-size:0.65rem; font-weight:700;">#1565C0</div><div style="font-size:0.58rem; color:#64748b;">Deep Navy (Brand)</div></div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:28px; height:28px; border-radius:6px; background:#12b76a;"></div>
                    <div><div style="font-size:0.65rem; font-weight:700;">#12B76A</div><div style="font-size:0.58rem; color:#64748b;">Emerald (Success)</div></div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:28px; height:28px; border-radius:6px; background:#f59e0b;"></div>
                    <div><div style="font-size:0.65rem; font-weight:700;">#F59E0B</div><div style="font-size:0.58rem; color:#64748b;">Amber (Pending)</div></div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:28px; height:28px; border-radius:6px; background:#0f172a;"></div>
                    <div><div style="font-size:0.65rem; font-weight:700;">#0F172A</div><div style="font-size:0.58rem; color:#64748b;">Slate 900 (Text)</div></div>
                </div>
            </div>
        </div>

        <!-- 3 Portals Visual Preview Showcase -->
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:10px;">
            <!-- Column 1: Passenger Portal -->
            <div style="border:1.5px solid #2454e0; border-radius:12px; padding:10px; background:#ffffff; box-shadow:0 4px 12px rgba(36,84,224,0.08);">
                <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                    <span style="font-size:1.1rem;">📱</span>
                    <div>
                        <div style="font-weight:800; font-size:0.75rem; color:#1565c0;">PASSENGER MOBILE APP</div>
                        <div style="font-size:0.58rem; color:#64748b;">Native Android &bull; app-passenger</div>
                    </div>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px; font-size:0.64rem; line-height:1.4;">
                    <div style="font-weight:700; color:#0f172a; margin-bottom:3px;">Key Visual Experiences:</div>
                    &bull; Instant Landmark Route Selector<br>
                    &bull; <strong>Statutory 20% Discount</strong> (&#8369;16 Fare)<br>
                    &bull; Live Tricycle Dispatch &amp; Tracking Map<br>
                    &bull; Driver 5-Star Rating &amp; Feedback Dialog
                </div>
                <div style="margin-top:8px; text-align:center;">
                    <span class="ui-badge-pill badge-blue">PAGES 2 &bull; 3 &bull; 4 &bull; 5</span>
                </div>
            </div>

            <!-- Column 2: Driver Partner Portal -->
            <div style="border:1.5px solid #12b76a; border-radius:12px; padding:10px; background:#ffffff; box-shadow:0 4px 12px rgba(18,183,106,0.08);">
                <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                    <span style="font-size:1.1rem;">🛵</span>
                    <div>
                        <div style="font-weight:800; font-size:0.75rem; color:#065f46;">DRIVER PARTNER APP</div>
                        <div style="font-size:0.58rem; color:#64748b;">Native Android &bull; app-driver</div>
                    </div>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px; font-size:0.64rem; line-height:1.4;">
                    <div style="font-weight:700; color:#0f172a; margin-bottom:3px;">Key Visual Experiences:</div>
                    &bull; Online/Offline Duty Availability Radar<br>
                    &bull; Real-time Booking Sound Alert &amp; Countdown<br>
                    &bull; Turn-by-Turn Pickup Navigation Screen<br>
                    &bull; Cash Collection &amp; Shift Income Report
                </div>
                <div style="margin-top:8px; text-align:center;">
                    <span class="ui-badge-pill badge-green">PAGES 6 &bull; 7 &bull; 8 &bull; 9</span>
                </div>
            </div>

            <!-- Column 3: Admin Web Dispatch -->
            <div style="border:1.5px solid #0d47a1; border-radius:12px; padding:10px; background:#ffffff; box-shadow:0 4px 12px rgba(13,71,161,0.08);">
                <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">
                    <span style="font-size:1.1rem;">💻</span>
                    <div>
                        <div style="font-weight:800; font-size:0.75rem; color:#0d47a1;">ADMIN DISPATCH WEB</div>
                        <div style="font-size:0.58rem; color:#64748b;">PHP 8.2 &bull; piatmoveadmin.online</div>
                    </div>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px; font-size:0.64rem; line-height:1.4;">
                    <div style="font-weight:700; color:#0f172a; margin-bottom:3px;">Key Visual Experiences:</div>
                    &bull; Executive Command Center &amp; Live Map<br>
                    &bull; TODA Franchise &amp; KYC Document Inspector<br>
                    &bull; Master Filterable Commuter Booking Ledger<br>
                    &bull; Social Subsidy &amp; Fare Regulation Reports
                </div>
                <div style="margin-top:8px; text-align:center;">
                    <span class="ui-badge-pill badge-blue">PAGES 10 &bull; 11 &bull; 12</span>
                </div>
            </div>
        </div>

        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:10px; padding:12px; margin-bottom:6px;">
            <div style="font-weight:800; font-size:0.75rem; color:#0f172a; margin-bottom:6px;">MUNICIPAL TRANSPORT FARE COMPUTATION POLICY:</div>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px;">
                <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:8px; border-radius:6px; text-align:center;">
                    <div style="font-size:0.60rem; color:#64748b; font-weight:700;">REGULAR BASE FARE</div>
                    <div style="font-size:1.1rem; font-weight:800; color:#0f172a; font-family:'JetBrains Mono';">&#8369;20.00</div>
                    <div style="font-size:0.56rem; color:#64748b;">Per Commuter / Trip</div>
                </div>
                <div style="background:#ecfdf3; border:1px solid #86efac; padding:8px; border-radius:6px; text-align:center;">
                    <div style="font-size:0.60rem; color:#065f46; font-weight:700;">STUDENT (RA 11314)</div>
                    <div style="font-size:1.1rem; font-weight:800; color:#047857; font-family:'JetBrains Mono';">&#8369;16.00</div>
                    <div style="font-size:0.56rem; color:#047857;">Save &#8369;4.00 (20% OFF)</div>
                </div>
                <div style="background:#fffbeb; border:1px solid #fde68a; padding:8px; border-radius:6px; text-align:center;">
                    <div style="font-size:0.60rem; color:#92400e; font-weight:700;">SENIOR &bull; PWD &bull; PREGNANT</div>
                    <div style="font-size:1.1rem; font-weight:800; color:#b45309; font-family:'JetBrains Mono';">&#8369;16.00</div>
                    <div style="font-size:0.56rem; color:#b45309;">Save &#8369;4.00 (20% OFF)</div>
                </div>
                <div style="background:#eff6ff; border:1px solid #bfdbfe; padding:8px; border-radius:6px; text-align:center;">
                    <div style="font-size:0.60rem; color:#1e40af; font-weight:700;">LGU PLATFORM DEDUCTION</div>
                    <div style="font-size:1.1rem; font-weight:800; color:#1d4ed8; font-family:'JetBrains Mono';">&#8369;0.00</div>
                    <div style="font-size:0.56rem; color:#1d4ed8;">100% Remitted to Driver</div>
                </div>
            </div>
        </div>

        <div class="page-annotations">
            <div class="anno-item"><div class="anno-dot"></div><span><strong>Document Scale:</strong> ISO A4 Portrait Device-Frame Specification</span></div>
            <div class="anno-item"><div class="anno-dot"></div><span><strong>Hosting:</strong> Live on Hostinger at <code>https://piatmoveadmin.online</code></span></div>
            <div class="anno-item"><div class="anno-dot"></div><span><strong>Design Framework:</strong> Google Material 3 / Android Jetpack</span></div>
        </div>

        <div class="proto-footer">
            <span class="proto-footer-brand">PiatMove Mobility System Visual Specification</span>
            <span>Page 1 of 12 &bull; Ecosystem Overview</span>
        </div>
    </section>
\`);

// ==========================================
// PAGE 2: PASSENGER - SPLASH & LOGIN VISUAL
// ==========================================
p.push(\`
    <section class="prototype-page" id="p2">
        <div class="page-header-row">
            <div class="header-title-box">
                <h1>📱 Passenger App &mdash; Authentication &amp; Discount Onboarding</h1>
                <p>Native Mobile Visual Layout &bull; Splash, Commuter Sign-In, and Statutory 20% Category Declaration</p>
            </div>
            <div class="header-tag-pill">Page 2 of 12 &bull; Passenger App</div>
        </div>

        <div class="dual-phone-grid">
            <!-- Screen 1: Passenger Login -->
            <div class="phone-column">
                <div class="phone-title-badge">SCREEN 1: COMMUTER LOGIN (LoginActivity.kt)</div>
                <div class="phone-mockup">
                    <div class="phone-screen">
                        \${phoneStatusBar(false)}

                        <div class="screen-content" style="padding:20px 18px; justify-content:center;">
                            <!-- Brand Icon -->
                            <div style="width:52px; height:52px; background:#2454e0; border-radius:14px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; box-shadow:0 6px 16px rgba(36,84,224,0.35);">
                                <span style="font-size:1.6rem; color:#ffffff;">🛵</span>
                            </div>

                            <div style="font-size:1.35rem; font-weight:800; color:#0f172a; margin-bottom:4px; letter-spacing:-0.5px;">Welcome back</div>
                            <div style="font-size:0.68rem; color:#64748b; line-height:1.4; margin-bottom:20px;">
                                Sign in to book municipal tricycles and track your trips in Piat.
                            </div>

                            <div class="ui-input-group">
                                <label class="ui-label">Mobile Number</label>
                                <div class="ui-input">
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <span style="font-size:0.85rem;">📞</span>
                                        <span style="font-weight:600; font-family:'JetBrains Mono';">0917 555 0142</span>
                                    </div>
                                </div>
                            </div>

                            <div class="ui-input-group">
                                <label class="ui-label">Password</label>
                                <div class="ui-input">
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <span style="font-size:0.85rem;">🔒</span>
                                        <span style="font-family:'JetBrains Mono';">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</span>
                                    </div>
                                    <span style="color:#94a3b8; font-size:0.8rem;">👁️</span>
                                </div>
                            </div>

                            <div style="text-align:right; margin-bottom:16px;">
                                <a href="#p2" style="font-size:0.65rem; color:#2454e0; font-weight:700; text-decoration:none;">Forgot password?</a>
                            </div>

                            <div class="ui-btn-primary" style="margin-bottom:16px;">
                                Log In
                            </div>

                            <div style="text-align:center; font-size:0.66rem; color:#64748b; margin-bottom:24px;">
                                New to PiatMove? <strong style="color:#2454e0; cursor:pointer;">Create an account</strong>
                            </div>

                            <div style="text-align:center; font-size:0.60rem; color:#94a3b8; display:flex; align-items:center; justify-content:center; gap:4px;">
                                <span>🛡️</span>
                                <span>Secured by the Municipality of Piat</span>
                            </div>
                        </div>

                        <div class="home-indicator"></div>
                    </div>
                </div>
            </div>

            <!-- Screen 2: Passenger Registration -->
            <div class="phone-column">
                <div class="phone-title-badge">SCREEN 2: STATUTORY 20% DISCOUNT SIGNUP (RegisterActivity.kt)</div>
                <div class="phone-mockup">
                    <div class="phone-screen">
                        \${phoneStatusBar(false)}

                        <div class="screen-content" style="padding:14px 18px; justify-content:flex-start;">
                            <div style="font-size:1.05rem; font-weight:800; color:#0f172a; margin-bottom:2px;">Create Account</div>
                            <div style="font-size:0.64rem; color:#64748b; margin-bottom:12px;">Register to enjoy safe fares and statutory discounts.</div>

                            <div class="ui-input-group">
                                <label class="ui-label">Full Name</label>
                                <div class="ui-input"><span style="font-weight:600;">Maria Cristina Santos</span></div>
                            </div>

                            <div class="ui-input-group">
                                <label class="ui-label">Mobile Number (+63)</label>
                                <div class="ui-input"><span style="font-family:'JetBrains Mono'; font-weight:600;">+63 998 765 4321</span></div>
                            </div>

                            <!-- Statutory Classification Selector -->
                            <div class="ui-input-group">
                                <label class="ui-label">Commuter Category &bull; Mandated 20% Discount</label>
                                <div style="display:flex; flex-direction:column; gap:4px;">
                                    <div style="border:1.5px solid #2454e0; background:#f0f4ff; border-radius:8px; padding:6px 8px; display:flex; justify-content:space-between; align-items:center;">
                                        <div style="display:flex; align-items:center; gap:6px;">
                                            <span>🎓</span>
                                            <div>
                                                <div style="font-size:0.65rem; font-weight:800; color:#1565c0;">Student (CSU / High School)</div>
                                                <div style="font-size:0.56rem; color:#1e40af;">Mandated fare: &#8369;16.00 (Save &#8369;4.00)</div>
                                            </div>
                                        </div>
                                        <span style="font-size:0.9rem; color:#2454e0;">🔘</span>
                                    </div>

                                    <div style="border:1px solid #cbd5e1; background:#ffffff; border-radius:8px; padding:5px 8px; display:flex; justify-content:space-between; align-items:center; opacity:0.8;">
                                        <div style="display:flex; align-items:center; gap:6px;">
                                            <span>👴</span>
                                            <span style="font-size:0.62rem; font-weight:700;">Senior Citizen (OSCA ID) &bull; &#8369;16.00</span>
                                        </div>
                                        <span style="font-size:0.8rem; color:#cbd5e1;">⚪</span>
                                    </div>

                                    <div style="border:1px solid #cbd5e1; background:#ffffff; border-radius:8px; padding:5px 8px; display:flex; justify-content:space-between; align-items:center; opacity:0.8;">
                                        <div style="display:flex; align-items:center; gap:6px;">
                                            <span>♿</span>
                                            <span style="font-size:0.62rem; font-weight:700;">PWD / Pregnant &bull; &#8369;16.00</span>
                                        </div>
                                        <span style="font-size:0.8rem; color:#cbd5e1;">⚪</span>
                                    </div>

                                    <div style="border:1px solid #cbd5e1; background:#ffffff; border-radius:8px; padding:5px 8px; display:flex; justify-content:space-between; align-items:center; opacity:0.8;">
                                        <div style="display:flex; align-items:center; gap:6px;">
                                            <span>👤</span>
                                            <span style="font-size:0.62rem; font-weight:700;">Regular Commuter &bull; &#8369;20.00</span>
                                        </div>
                                        <span style="font-size:0.8rem; color:#cbd5e1;">⚪</span>
                                    </div>
                                </div>
                            </div>

                            <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:6px; font-size:0.58rem; color:#92400e; margin-bottom:10px; line-height:1.3;">
                                ⚠️ <strong>ID Requirement:</strong> Please present valid School ID or Senior ID upon boarding your tricycle for driver verification.
                            </div>

                            <div class="ui-btn-primary" style="margin-top:auto; margin-bottom:6px;">
                                Complete Registration
                            </div>
                        </div>

                        <div class="home-indicator"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-annotations">
            <div class="anno-item"><div class="anno-dot"></div><span><strong>Layout Files:</strong> <code>activity_login.xml</code> &amp; <code>activity_register.xml</code></span></div>
            <div class="anno-item"><div class="anno-dot"></div><span><strong>Backend API:</strong> <code>POST /api/auth/passenger/register</code> with <code>discount_type</code></span></div>
        </div>

        <div class="proto-footer">
            <span class="proto-footer-brand">PiatMove Mobility System Visual Specification</span>
            <span>Page 2 of 12 &bull; Passenger Authentication &amp; Signup</span>
        </div>
    </section>
\`);

// ==========================================
// PAGE 3: PASSENGER - LANDMARK ROUTE & BOOKING
// ==========================================
p.push(\`
    <section class="prototype-page" id="p3">
        <div class="page-header-row">
            <div class="header-title-box">
                <h1>📱 Passenger App &mdash; Landmark Route &amp; Fare Matrix</h1>
                <p>Native Mobile Visual Layout &bull; Interactive Piat Map, Destination Selector, and Real-time Fare Calculator</p>
            </div>
            <div class="header-tag-pill">Page 3 of 12 &bull; Passenger App</div>
        </div>

        <div class="dual-phone-grid">
            <!-- Screen 1: Home Dashboard -->
            <div class="phone-column">
                <div class="phone-title-badge">SCREEN 1: PASSENGER HOME DASHBOARD (PassengerHomeActivity.kt)</div>
                <div class="phone-mockup">
                    <div class="phone-screen">
                        \${phoneStatusBar(true)}

                        <!-- Blue Header Banner -->
                        <div class="ui-header-card">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <div style="font-size:0.64rem; color:#93c5fd; font-weight:600;">Good Morning ☀️</div>
                                    <div style="font-size:1.05rem; font-weight:800; color:#ffffff;">Maria Santos</div>
                                </div>
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <span class="ui-badge-pill badge-green" style="background:#ffffff; color:#047857; font-size:0.56rem;">🎓 STUDENT 20%</span>
                                    <div style="width:32px; height:32px; background:#ffffff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.85rem;">👩‍🎓</div>
                                </div>
                            </div>
                        </div>

                        <div class="screen-content" style="padding:10px 14px; gap:8px;">
                            <!-- Map Overview Card -->
                            <div class="map-bg" style="height:175px;">
                                <div class="map-road-1"></div>
                                <div class="map-road-2"></div>
                                
                                <!-- Tricycle Markers in Piat -->
                                <div class="map-pin" style="top:30%; left:40%; width:24px; height:24px; background:#2454e0; color:#fff; font-size:0.75rem;">🛵</div>
                                <div class="map-pin" style="top:55%; left:65%; width:24px; height:24px; background:#2454e0; color:#fff; font-size:0.75rem;">🛵</div>
                                <div class="map-pin" style="top:60%; left:25%; width:24px; height:24px; background:#12b76a; color:#fff; font-size:0.75rem;">📍</div>

                                <div style="position:absolute; bottom:8px; left:8px; right:8px; background:rgba(255,255,255,0.92); backdrop-filter:blur(4px); border-radius:8px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center; border:1px solid #cbd5e1;">
                                    <div>
                                        <div style="font-size:0.58rem; color:#64748b; font-weight:700;">CURRENT LOCATION</div>
                                        <div style="font-size:0.70rem; font-weight:800; color:#0f172a;">📍 Poblacion I &bull; Piat Public Market</div>
                                    </div>
                                    <span class="ui-badge-pill badge-green">8 ACTIVE TRIKES</span>
                                </div>
                            </div>

                            <!-- Fast Action Booking Card -->
                            <div style="border:1.5px solid #2454e0; background:#f0f4ff; border-radius:12px; padding:10px; box-shadow:0 4px 10px rgba(36,84,224,0.1);">
                                <div style="font-weight:800; font-size:0.75rem; color:#0d47a1; margin-bottom:4px;">Where would you like to ride?</div>
                                <div style="font-size:0.62rem; color:#334155; margin-bottom:8px;">Fast municipal dispatch across all Piat barangays.</div>
                                <div class="ui-btn-primary" style="padding:7px 12px; font-size:0.72rem;">
                                    <span>🔍</span> Select Destination Landmark
                                </div>
                            </div>

                            <!-- Active TODA Terminals -->
                            <div style="display:flex; justify-content:space-between; gap:6px;">
                                <div style="flex:1; border:1px solid #e2e8f0; border-radius:8px; padding:6px; background:#ffffff; text-align:center;">
                                    <div style="font-size:0.58rem; color:#64748b; font-weight:700;">BASILICA TODA</div>
                                    <div style="font-size:0.80rem; font-weight:800; color:#1565c0;">12 Trikes</div>
                                </div>
                                <div style="flex:1; border:1px solid #e2e8f0; border-radius:8px; padding:6px; background:#ffffff; text-align:center;">
                                    <div style="font-size:0.58rem; color:#64748b; font-weight:700;">MARKET TODA</div>
                                    <div style="font-size:0.80rem; font-weight:800; color:#12b76a;">6 Trikes</div>
                                </div>
                                <div style="flex:1; border:1px solid #e2e8f0; border-radius:8px; padding:6px; background:#ffffff; text-align:center;">
                                    <div style="font-size:0.58rem; color:#64748b; font-weight:700;">MAGUILLING</div>
                                    <div style="font-size:0.80rem; font-weight:800; color:#f59e0b;">4 Trikes</div>
                                </div>
                            </div>
                        </div>

                        \${passengerBottomNav('home')}
                    </div>
                </div>
            </div>

            <!-- Screen 2: Landmark Route Booking -->
            <div class="phone-column">
                <div class="phone-title-badge">SCREEN 2: LANDMARK BOOKING &amp; FARE (BookRideActivity.kt)</div>
                <div class="phone-mockup">
                    <div class="phone-screen">
                        \${phoneStatusBar(false)}

                        <div class="screen-content" style="padding:12px 16px; gap:8px;">
                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                                <div style="width:28px; height:28px; border-radius:50%; background:#f1f5f9; display:flex; align-items:center; justify-content:center; font-weight:800;">&larr;</div>
                                <div style="font-size:0.95rem; font-weight:800; color:#0f172a;">Confirm Trip Details</div>
                            </div>

                            <!-- Route Selector Card -->
                            <div style="border:1px solid #cbd5e1; border-radius:10px; padding:10px; background:#f8fafc;">
                                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                    <span style="font-size:0.8rem; color:#12b76a;">🟢</span>
                                    <div style="flex:1;">
                                        <div style="font-size:0.58rem; color:#64748b; font-weight:700;">PICKUP LANDMARK</div>
                                        <div style="font-size:0.72rem; font-weight:800; color:#0f172a;">Piat Public Market (Front Gate)</div>
                                    </div>
                                </div>
                                <div style="height:12px; border-left:2px dashed #cbd5e1; margin-left:6px;"></div>
                                <div style="display:flex; align-items:center; gap:8px; margin-top:2px;">
                                    <span style="font-size:0.8rem; color:#ef4444;">🔴</span>
                                    <div style="flex:1;">
                                        <div style="font-size:0.58rem; color:#64748b; font-weight:700;">DROP-OFF LANDMARK</div>
                                        <div style="font-size:0.72rem; font-weight:800; color:#0f172a;">Basilica Minore of Our Lady of Piat</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Route Visual Map Strip -->
                            <div class="map-bg" style="height:90px;">
                                <div class="map-road-1"></div>
                                <div class="route-polyline"></div>
                                <div class="map-pin" style="top:58%; left:22%; width:20px; height:20px; background:#12b76a; color:#fff; font-size:0.6rem;">📍</div>
                                <div class="map-pin" style="top:42%; left:75%; width:20px; height:20px; background:#ef4444; color:#fff; font-size:0.6rem;">🎯</div>
                                <div style="position:absolute; top:6px; right:8px; background:rgba(15,23,42,0.8); color:#fff; font-size:0.58rem; padding:2px 6px; border-radius:4px; font-weight:700;">1.8 km &bull; ~5 mins</div>
                            </div>

                            <!-- Fare Computation Card -->
                            <div style="border:1.5px solid #2454e0; background:#f0f4ff; border-radius:10px; padding:10px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                    <span style="font-weight:800; font-size:0.70rem; color:#0d47a1;">FARE COMPUTATION</span>
                                    <span class="ui-badge-pill badge-green">RA 11314 DISCOUNTED</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:#334155; margin-bottom:3px;">
                                    <span>Regular Municipal Base Fare:</span>
                                    <span style="font-family:'JetBrains Mono';">&#8369;20.00</span>
                                </div>
                                <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:#047857; font-weight:700; margin-bottom:4px;">
                                    <span>Student 20% Statutory Discount:</span>
                                    <span style="font-family:'JetBrains Mono';">-&#8369;4.00</span>
                                </div>
                                <div style="border-top:1px dashed #90caf9; padding-top:6px; display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-weight:800; font-size:0.78rem; color:#0d47a1;">Total Cash to Pay:</span>
                                    <span style="font-size:1.15rem; font-weight:800; color:#2454e0; font-family:'JetBrains Mono';">&#8369;16.00</span>
                                </div>
                            </div>

                            <div style="font-size:0.58rem; color:#64748b; text-align:center;">
                                💡 Payment Method: <strong>Exact Cash to Tricycle Driver</strong>
                            </div>

                            <div class="ui-btn-primary" style="margin-top:auto; font-size:0.75rem; padding:9px;">
                                🛵 Request Tricycle Dispatch Now
                            </div>
                        </div>

                        <div class="home-indicator"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-annotations">
            <div class="anno-item"><div class="anno-dot"></div><span><strong>Landmark Engine:</strong> <code>PiatPlaceAdapter.kt</code></span></div>
            <div class="anno-item"><div class="anno-dot"></div><span><strong>Fare Logic:</strong> <code>Base: ₱20</code> &bull; <code>Discount: -₱4</code> &bull; <code>Total: ₱16</code></span></div>
        </div>

        <div class="proto-footer">
            <span class="proto-footer-brand">PiatMove Mobility System Visual Specification</span>
            <span>Page 3 of 12 &bull; Passenger Route Booking &amp; Fare Matrix</span>
        </div>
    </section>
\`);

console.log('Appended Pages 1, 2, 3');
`;

fs.writeFileSync(path.resolve(__dirname, 'generate_all_visual_pages.js'), script);
console.log('Saved first part of generator script');
