/* PiatMove — Passenger app · main screens + app shell */
const P = window.PiatBookingDesignSystem_2c1fe9;

/* ---------- Dashboard ---------- */
function Dashboard({ go }) {
  const { Card, Badge, Avatar, IconButton, StatusTimeline } = P;
  const actions = [
    { name: "car", label: "Book Vehicle", to: "book", tone: ["var(--blue-50)", "var(--blue-600)"] },
    { name: "ticket", label: "My Bookings", to: "details", tone: ["var(--green-50)", "var(--green-600)"] },
    { name: "bell", label: "Notifications", to: "alerts", tone: ["var(--amber-50)", "var(--amber-700)"] },
    { name: "user", label: "Profile", to: "profile", tone: ["var(--cyan-50)", "var(--cyan-700)"] },
  ];
  return (
    <Scroll style={{ background: "var(--surface-app)" }}>
      {/* hero */}
      <div style={{ background: "var(--gradient-hero)", padding: "10px 20px 64px", borderRadius: "0 0 26px 26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name="Maria Santos" size={44} status="online" />
          <div style={{ flex: 1 }}>
            <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "rgba(255,255,255,.8)" }}>Good morning,</div>
            <div style={{ font: "var(--fw-bold) 17px/1.2 var(--font-display)", color: "#fff", marginTop: 3 }}>Maria Santos</div>
          </div>
          <IconButton variant="ghost" label="Notifications" onClick={() => go("alerts")} style={{ background: "rgba(255,255,255,.15)" }}><Icon name="bell" size={20} color="#fff" /></IconButton>
        </div>
      </div>
      {/* active booking card lifts over hero */}
      <div style={{ padding: "0 20px", marginTop: -44 }}>
        <Card elevation="md" interactive onClick={() => go("details")} padding="none" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Eyebrow>Active Booking</Eyebrow>
              <div style={{ font: "var(--fw-bold) 16px/1.2 var(--font-display)", color: "var(--text-strong)", marginTop: 6 }}>Tuguegarao City Hall</div>
              <div style={{ font: "var(--fw-medium) 12px/1 var(--font-mono)", color: "var(--text-muted)", marginTop: 5 }}>Ref: BK-2041</div>
            </div>
            <Badge tone="primary" dot>In Transit</Badge>
          </div>
          <div style={{ padding: "0 18px 16px" }}><MapStrip height={120} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-sunken)" }}>
            <Avatar name="Jose Cruz" size={34} />
            <div style={{ flex: 1 }}>
              <div style={{ font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-strong)" }}>Jose Cruz · arriving 8 min</div>
              <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 3 }}>Toyota HiAce · ABC 1234</div>
            </div>
            <Icon name="chevron-right" size={18} color="var(--text-subtle)" />
          </div>
        </Card>
      </div>
      {/* quick actions */}
      <div style={{ padding: "22px 20px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {actions.map(a => (
            <button key={a.label} onClick={() => go(a.to)} style={{ border: "none", background: "var(--surface-card)", borderRadius: "var(--radius-md)", padding: "14px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", boxShadow: "var(--shadow-xs)", border: "1px solid var(--border-subtle)" }}>
              <IconTile name={a.name} bg={a.tone[0]} fg={a.tone[1]} size={42} r="var(--radius-md)" />
              <span style={{ font: "var(--fw-semibold) 11px/1.2 var(--font-body)", color: "var(--text-body)", textAlign: "center" }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* upcoming */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>Upcoming Trips</h3>
          <a style={{ font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-link)" }}>See all</a>
        </div>
        {[
          { dest: "Provincial Hospital", date: "Jun 24 · 9:00 AM", tone: "warning", st: "Pending", v: "Ambulance" },
          { dest: "Piat Basilica", date: "Jun 28 · 6:30 AM", tone: "success", st: "Approved", v: "Coaster Bus" },
        ].map((t, i) => (
          <Card key={i} padding="sm" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <IconTile name="calendar" bg="var(--blue-50)" fg="var(--blue-600)" size={42} />
            <div style={{ flex: 1 }}>
              <div style={{ font: "var(--fw-semibold) 14px/1.2 var(--font-body)", color: "var(--text-strong)" }}>{t.dest}</div>
              <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 4 }}>{t.date} · {t.v}</div>
            </div>
            <Badge tone={t.tone}>{t.st}</Badge>
          </Card>
        ))}
      </div>
      {/* recent activity */}
      <div style={{ padding: "14px 20px 24px" }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Recent Activity</h3>
        <Card padding="md">
          {[
            { ic: "check-circle", bg: "var(--green-50)", fg: "var(--green-600)", t: "Trip completed", s: "Piat → Tuguegarao", m: "Jun 18" },
            { ic: "user", bg: "var(--blue-50)", fg: "var(--blue-600)", t: "Driver assigned", s: "Jose Cruz · HiAce", m: "Jun 18" },
            { ic: "x", bg: "var(--red-50)", fg: "var(--red-500)", t: "Booking cancelled", s: "Schedule conflict", m: "Jun 12" },
          ].map((r, i, arr) => (
            <P.ListItem key={i} divider={i < arr.length - 1} leading={<IconTile name={r.ic} bg={r.bg} fg={r.fg} />} title={r.t} subtitle={r.s} meta={r.m} />
          ))}
        </Card>
      </div>
    </Scroll>
  );
}

/* ---------- Book Vehicle ---------- */
function BookVehicle({ onBack, onSubmit }) {
  const { Button, Input, Chip, IconButton, Card } = P;
  const [veh, setVeh] = React.useState("hiace");
  const vehicles = [
    { k: "sedan", label: "Sedan", ic: "car", seats: "4 seats" },
    { k: "hiace", label: "HiAce Van", ic: "truck", seats: "12 seats" },
    { k: "coaster", label: "Coaster Bus", ic: "truck", seats: "28 seats" },
    { k: "amb", label: "Ambulance", ic: "plus", seats: "Medical" },
  ];
  return (
    <>
      <P.TopBar title="Book Vehicle" leading={<IconButton label="Back" onClick={onBack}><Icon name="arrow-left" size={20} /></IconButton>} />
      <Scroll>
        <div style={{ padding: "16px 20px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* route block */}
          <Card padding="md" style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--green-500)" }} />
              <span style={{ width: 2, flex: 1, background: "var(--gray-200)", margin: "4px 0" }} />
              <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--blue-600)" }} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              <Input label="Pickup Location" defaultValue="Municipal Hall, Piat" placeholder="Where from?" />
              <Input label="Destination" placeholder="Where to?" defaultValue="Tuguegarao City Hall" />
            </div>
          </Card>
          <div style={{ display: "flex", gap: 12 }}>
            <Input label="Date" defaultValue="Jun 24, 2026" leadingIcon={<Icon name="calendar" size={18} />} style={{ flex: 1 }} />
            <Input label="Time" defaultValue="9:00 AM" leadingIcon={<Icon name="clock" size={18} />} style={{ flex: 1 }} />
          </div>
          <Input label="Purpose of Travel" placeholder="e.g. Medical appointment, official business" defaultValue="Hospital check-up" leadingIcon={<Icon name="file-text" size={18} />} />
          <div>
            <div style={{ font: "var(--fw-semibold) 13px/1.2 var(--font-body)", color: "var(--text-strong)", marginBottom: 10 }}>Vehicle Type</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {vehicles.map(v => (
                <button key={v.k} onClick={() => setVeh(v.k)} style={{ textAlign: "left", cursor: "pointer", background: veh === v.k ? "var(--blue-50)" : "var(--surface-card)", border: veh === v.k ? "1.5px solid var(--blue-500)" : "1.5px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <IconTile name={v.ic} bg={veh === v.k ? "var(--blue-600)" : "var(--surface-sunken)"} fg={veh === v.k ? "#fff" : "var(--text-muted)"} size={36} />
                  <div>
                    <div style={{ font: "var(--fw-bold) 13px/1 var(--font-body)", color: "var(--text-strong)" }}>{v.label}</div>
                    <div style={{ font: "var(--fw-regular) 11px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 4 }}>{v.seats}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Scroll>
      <div style={{ padding: "12px 20px calc(12px + env(safe-area-inset-bottom,0))", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
        <Button variant="primary" size="lg" block onClick={onSubmit} trailingIcon={<Icon name="arrow-right" size={18} color="#fff" />}>Book Now</Button>
      </div>
    </>
  );
}

/* ---------- Booking Details ---------- */
function BookingDetails({ onBack }) {
  const { Badge, Avatar, IconButton, Card, StatusTimeline, Button } = P;
  return (
    <>
      <P.TopBar title="Booking Details" leading={<IconButton label="Back" onClick={onBack}><Icon name="arrow-left" size={20} /></IconButton>} trailing={<IconButton label="More"><Icon name="more-vertical" size={20} /></IconButton>} />
      <Scroll>
        <div style={{ padding: "16px 20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Eyebrow>Reference No.</Eyebrow>
              <div style={{ font: "var(--fw-bold) 20px/1 var(--font-mono)", color: "var(--text-strong)", marginTop: 6 }}>BK-2041</div>
            </div>
            <Badge tone="primary" dot size="md">In Transit</Badge>
          </div>
          <MapStrip height={160} />
          {/* driver */}
          <Card padding="md">
            <Eyebrow style={{ marginBottom: 12 }}>Driver Information</Eyebrow>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name="Jose Cruz" size={52} status="online" />
              <div style={{ flex: 1 }}>
                <div style={{ font: "var(--fw-bold) 16px/1.1 var(--font-display)", color: "var(--text-strong)" }}>Jose Cruz</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4, color: "var(--text-muted)", fontSize: 13 }}>
                  <Icon name="star" size={14} color="var(--amber-500)" /> 4.9 · 320 trips
                </div>
              </div>
              <IconButton variant="outline" label="Message"><Icon name="message-circle" size={20} color="var(--blue-600)" /></IconButton>
              <IconButton variant="primary" label="Call"><Icon name="phone" size={20} color="#fff" /></IconButton>
            </div>
          </Card>
          {/* vehicle */}
          <Card padding="md">
            <Eyebrow style={{ marginBottom: 12 }}>Vehicle Information</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["Type", "Toyota HiAce"], ["Plate No.", "ABC 1234"], ["Color", "White"], ["Capacity", "12 seats"]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)" }}>{k}</div>
                  <div style={{ font: "var(--fw-semibold) 14px/1.2 var(--font-body)", color: "var(--text-strong)", marginTop: 5 }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>
          {/* timeline */}
          <Card padding="md">
            <Eyebrow style={{ marginBottom: 14 }}>Booking Status</Eyebrow>
            <StatusTimeline steps={[
              { label: "Booking Approved", time: "Today · 8:02 AM", state: "done" },
              { label: "Driver Assigned — Jose Cruz", time: "8:10 AM", state: "done" },
              { label: "In Transit to Tuguegarao", time: "Now · ETA 8 min", state: "active" },
              { label: "Trip Completed", state: "pending" },
            ]} />
          </Card>
          <Button variant="outline" block style={{ color: "var(--status-danger)", borderColor: "var(--red-200,#FECDCA)" }}>Cancel Booking</Button>
        </div>
      </Scroll>
    </>
  );
}

/* ---------- Notifications ---------- */
function Notifications({ onBack }) {
  const { IconButton, Card } = P;
  const groups = [
    { label: "Today", items: [
      { ic: "check-circle", bg: "var(--green-50)", fg: "var(--green-600)", t: "Booking Approved", s: "BK-2041 to Tuguegarao is confirmed", m: "8:02 AM", unread: true },
      { ic: "user", bg: "var(--blue-50)", fg: "var(--blue-600)", t: "Driver Assigned", s: "Jose Cruz will pick you up · HiAce ABC 1234", m: "8:10 AM", unread: true },
    ]},
    { label: "Earlier", items: [
      { ic: "flag", bg: "var(--amber-50)", fg: "var(--amber-700)", t: "Trip Completed", s: "Rate your trip to Piat Basilica", m: "Jun 18" },
      { ic: "bell", bg: "var(--cyan-50)", fg: "var(--cyan-700)", t: "Service Advisory", s: "Holiday schedule for Piat Fiesta announced", m: "Jun 15" },
    ]},
  ];
  return (
    <>
      <P.TopBar title="Notifications" leading={<IconButton label="Back" onClick={onBack}><Icon name="arrow-left" size={20} /></IconButton>} trailing={<a style={{ font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-link)", cursor: "pointer" }}>Mark all read</a>} />
      <Scroll>
        <div style={{ padding: "8px 20px 28px" }}>
          {groups.map(g => (
            <div key={g.label} style={{ marginTop: 16 }}>
              <Eyebrow style={{ marginBottom: 10 }}>{g.label}</Eyebrow>
              <Card padding="md">
                {g.items.map((r, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                    <IconTile name={r.ic} bg={r.bg} fg={r.fg} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ font: "var(--fw-semibold) 14px/1.2 var(--font-body)", color: "var(--text-strong)" }}>{r.t}</span>
                        {r.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-primary)" }} />}
                      </div>
                      <div style={{ font: "var(--fw-regular) 13px/1.4 var(--font-body)", color: "var(--text-muted)", marginTop: 3 }}>{r.s}</div>
                    </div>
                    <span style={{ font: "var(--fw-medium) 11px/1 var(--font-body)", color: "var(--text-subtle)", whiteSpace: "nowrap" }}>{r.m}</span>
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>
      </Scroll>
    </>
  );
}

/* ---------- Profile ---------- */
function Profile({ onLogout }) {
  const { Card, Avatar, Button } = P;
  const menu = [
    { ic: "edit", t: "Edit Profile" },
    { ic: "lock", t: "Change Password" },
    { ic: "credit-card", t: "Payment & Receipts" },
    { ic: "settings", t: "Settings" },
    { ic: "info", t: "Help & Support" },
  ];
  return (
    <Scroll>
      <div style={{ background: "var(--gradient-hero)", padding: "12px 20px 28px", borderRadius: "0 0 26px 26px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Avatar name="Maria Santos" size={82} />
        <div style={{ textAlign: "center" }}>
          <div style={{ font: "var(--fw-bold) 20px/1.1 var(--font-display)", color: "#fff" }}>Maria Santos</div>
          <div style={{ font: "var(--fw-regular) 13px/1 var(--font-body)", color: "rgba(255,255,255,.8)", marginTop: 5 }}>maria.santos@email.com</div>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,.18)", color: "#fff", font: "var(--fw-semibold) 12px/1 var(--font-body)" }}>
          <Icon name="shield-check" size={14} color="#fff" /> Verified Resident
        </div>
      </div>
      <div style={{ padding: "20px 20px 28px" }}>
        <Card padding="md" style={{ marginBottom: 16 }}>
          <Eyebrow style={{ marginBottom: 12 }}>Personal Information</Eyebrow>
          {[["Contact", "0917 555 0142"], ["Address", "Brgy. Centro, Piat, Cagayan"], ["Member since", "March 2024"]].map(([k, v], i, a) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < a.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <span style={{ font: "var(--fw-regular) 13px/1 var(--font-body)", color: "var(--text-muted)" }}>{k}</span>
              <span style={{ font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-strong)" }}>{v}</span>
            </div>
          ))}
        </Card>
        <Card padding="md" style={{ marginBottom: 16 }}>
          {menu.map((m, i, a) => (
            <div key={m.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < a.length - 1 ? "1px solid var(--border-subtle)" : "none", cursor: "pointer" }}>
              <IconTile name={m.ic} bg="var(--surface-sunken)" fg="var(--text-body)" />
              <span style={{ flex: 1, font: "var(--fw-semibold) 14px/1 var(--font-body)", color: "var(--text-strong)" }}>{m.t}</span>
              <Icon name="chevron-right" size={18} color="var(--text-subtle)" />
            </div>
          ))}
        </Card>
        <Button variant="outline" block onClick={onLogout} leadingIcon={<Icon name="log-out" size={18} color="var(--status-danger)" />} style={{ color: "var(--status-danger)", borderColor: "var(--border-subtle)" }}>Log Out</Button>
      </div>
    </Scroll>
  );
}

/* ---------- App shell ---------- */
function PassengerApp() {
  const { BottomNav } = P;
  const [screen, setScreen] = React.useState("splash"); // splash|login|register|app
  const [tab, setTab] = React.useState("home");
  const go = (t) => { if (t === "book") setScreen("book"); else if (t === "details") setScreen("details"); else if (t === "alerts") setScreen("alerts"); else if (t === "profile") { setTab("profile"); setScreen("app"); } else { setTab(t); setScreen("app"); } };

  let body, showNav = false, dark = false;
  if (screen === "splash") { body = <SplashScreen onDone={() => setScreen("login")} />; dark = true; }
  else if (screen === "login") body = <LoginScreen onLogin={() => setScreen("app")} onRegister={() => setScreen("register")} />;
  else if (screen === "register") body = <RegisterScreen onBack={() => setScreen("login")} onDone={() => setScreen("app")} />;
  else if (screen === "book") body = <BookVehicle onBack={() => setScreen("app")} onSubmit={() => setScreen("details")} />;
  else if (screen === "details") body = <BookingDetails onBack={() => setScreen("app")} />;
  else if (screen === "alerts") body = <Notifications onBack={() => setScreen("app")} />;
  else {
    showNav = true;
    if (tab === "profile") body = <Profile onLogout={() => { setScreen("login"); setTab("home"); }} />;
    else if (tab === "bookings") body = <BookingDetails onBack={() => setTab("home")} />;
    else if (tab === "alerts") body = <Notifications onBack={() => setTab("home")} />;
    else body = <Dashboard go={go} />;
  }

  const navItems = [
    { key: "home", label: "Home", icon: <Icon name="home" size={22} /> },
    { key: "bookings", label: "Bookings", icon: <Icon name="ticket" size={22} />, badge: 1 },
    { key: "book", label: "Book", icon: <Icon name="plus" size={22} /> },
    { key: "alerts", label: "Alerts", icon: <Icon name="bell" size={22} />, badge: 2 },
    { key: "profile", label: "Profile", icon: <Icon name="user" size={22} /> },
  ];

  return (
    <PhoneFrame dark={dark} statusBar={screen !== "splash"}>
      {body}
      {showNav && <BottomNav items={navItems} activeKey={tab === "profile" ? "profile" : tab} onChange={(k) => { if (k === "book") setScreen("book"); else { setTab(k); setScreen("app"); } }} />}
    </PhoneFrame>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PassengerApp />);
