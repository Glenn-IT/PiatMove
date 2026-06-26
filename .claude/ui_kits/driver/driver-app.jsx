/* PiatMove — Driver app · all screens + shell */
const D = window.PiatBookingDesignSystem_2c1fe9;

function DScroll({ children, style }) { return <div style={{ flex: 1, minHeight: 0, overflowY: "auto", ...style }}>{children}</div>; }
function DEye({ children, style }) { return <div style={{ font: "var(--fw-bold) 11px/1 var(--font-body)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-subtle)", ...style }}>{children}</div>; }
function DTile({ name, bg, fg, size = 40, r = "var(--radius-sm)" }) { return <span style={{ width: size, height: size, borderRadius: r, background: bg, color: fg, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name={name} size={size * 0.5} /></span>; }
function DMap({ height = 150 }) {
  return (
    <div style={{ position: "relative", height, borderRadius: "var(--radius-md)", overflow: "hidden", background: "linear-gradient(135deg,#E8EEF6,#DCE7F2)", border: "1px solid var(--border-subtle)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--gray-200) 1px,transparent 1px),linear-gradient(90deg,var(--gray-200) 1px,transparent 1px)", backgroundSize: "26px 26px", opacity: .6 }} />
      <svg viewBox="0 0 320 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M40 120 C100 100 130 70 180 64 C230 58 255 40 285 26" stroke="var(--blue-500)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 11" />
        <circle cx="40" cy="120" r="8" fill="var(--green-500)" stroke="#fff" strokeWidth="3" />
        <circle cx="285" cy="26" r="8" fill="var(--blue-600)" stroke="#fff" strokeWidth="3" />
      </svg>
    </div>
  );
}

/* ---------- Driver Login ---------- */
function DriverLogin({ onLogin }) {
  const { Button, Input } = D;
  return (
    <DScroll>
      <div style={{ background: "var(--gradient-hero)", padding: "30px 24px 34px", borderRadius: "0 0 26px 26px", color: "#fff" }}>
        <img src="../../assets/logo-white.svg" width="190" alt="" />
        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,.18)", font: "var(--fw-bold) 11px/1 var(--font-body)", letterSpacing: ".06em" }}>
          <Icon name="car" size={14} color="#fff" /> DRIVER PORTAL
        </div>
        <h1 style={{ fontSize: 25, fontWeight: 800, color: "#fff", marginTop: 16 }}>Driver Sign In</h1>
        <p style={{ color: "rgba(255,255,255,.82)", fontSize: 14, marginTop: 6 }}>Municipal Transport Office · Piat, Cagayan</p>
      </div>
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <Input label="Employee / Driver ID" defaultValue="DRV-0142" leadingIcon={<Icon name="user" size={18} />} />
        <Input label="Password" type="password" defaultValue="passw0rd" leadingIcon={<Icon name="lock" size={18} />} trailingIcon={<Icon name="eye" size={18} />} />
        <Button variant="primary" size="lg" block onClick={onLogin} style={{ marginTop: 4 }}>Log In</Button>
        <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", color: "var(--text-subtle)", fontSize: 13, marginTop: 8 }}>
          <Icon name="shield-check" size={16} /> Authorized municipal drivers only
        </div>
      </div>
    </DScroll>
  );
}

/* ---------- Driver Dashboard ---------- */
function DriverDashboard({ onAssignment, online, setOnline }) {
  const { Card, Avatar, Badge, StatCard } = D;
  return (
    <DScroll>
      <div style={{ background: "var(--gradient-hero)", padding: "12px 20px 56px", borderRadius: "0 0 26px 26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name="Jose Cruz" size={46} status={online ? "online" : "offline"} />
          <div style={{ flex: 1 }}>
            <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "rgba(255,255,255,.8)" }}>Welcome back,</div>
            <div style={{ font: "var(--fw-bold) 17px/1.2 var(--font-display)", color: "#fff", marginTop: 3 }}>Jose Cruz</div>
          </div>
          <button onClick={() => setOnline(!online)} style={{ border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, padding: "7px 12px", borderRadius: "var(--radius-pill)", background: online ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.18)", color: online ? "var(--green-600)" : "#fff", font: "var(--fw-bold) 12px/1 var(--font-body)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: online ? "var(--green-500)" : "rgba(255,255,255,.7)" }} /> {online ? "Online" : "Offline"}
          </button>
        </div>
      </div>
      <div style={{ padding: "0 20px", marginTop: -40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <StatCard label="Today's Trips" value="4" icon={<Icon name="navigation" />} tone="primary" />
          <StatCard label="Assigned" value="2" icon={<Icon name="ticket" />} tone="warning" />
          <StatCard label="Completed" value="312" icon={<Icon name="check-circle" />} tone="success" delta="8" />
          <StatCard label="Rating" value="4.9" icon={<Icon name="star" />} tone="info" />
        </div>
      </div>
      {/* assigned trips needing action */}
      <div style={{ padding: "22px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>New Assignment</h3>
          <Badge tone="warning" dot>Action needed</Badge>
        </div>
        <Card elevation="md" interactive onClick={onAssignment} padding="md">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <Avatar name="Maria Santos" size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ font: "var(--fw-bold) 15px/1.1 var(--font-display)", color: "var(--text-strong)" }}>Maria Santos</div>
              <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 4 }}>Ref BK-2041 · Jun 24, 9:00 AM</div>
            </div>
            <Badge tone="primary">HiAce</Badge>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--green-500)" }} />
              <span style={{ width: 2, flex: 1, minHeight: 20, background: "var(--gray-200)", margin: "3px 0" }} />
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--blue-600)" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ font: "var(--fw-semibold) 13px/1.3 var(--font-body)", color: "var(--text-strong)" }}>Municipal Hall, Piat</div>
              <div style={{ font: "var(--fw-semibold) 13px/1.3 var(--font-body)", color: "var(--text-strong)", marginTop: 18 }}>Tuguegarao City Hall</div>
            </div>
          </div>
        </Card>
      </div>
      {/* today schedule */}
      <div style={{ padding: "20px 20px 24px" }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>Today's Trips</h3>
        {[
          { t: "08:00", dest: "Provincial Hospital", st: "Completed", tone: "success" },
          { t: "11:30", dest: "Piat Public Market", st: "Completed", tone: "success" },
          { t: "14:00", dest: "Sta. Teresita", st: "Upcoming", tone: "neutral" },
        ].map((r, i) => (
          <Card key={i} padding="sm" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ font: "var(--fw-bold) 13px/1 var(--font-mono)", color: "var(--text-strong)", width: 46 }}>{r.t}</div>
            <div style={{ width: 1, alignSelf: "stretch", background: "var(--border-subtle)" }} />
            <div style={{ flex: 1, font: "var(--fw-semibold) 14px/1.2 var(--font-body)", color: "var(--text-strong)" }}>{r.dest}</div>
            <Badge tone={r.tone}>{r.st}</Badge>
          </Card>
        ))}
      </div>
    </DScroll>
  );
}

/* ---------- Trip Assignment ---------- */
function TripAssignment({ onBack, onAccept }) {
  const { Button, IconButton, Card, Avatar, Badge } = D;
  return (
    <>
      <D.TopBar title="Trip Assignment" leading={<IconButton label="Back" onClick={onBack}><Icon name="arrow-left" size={20} /></IconButton>} />
      <DScroll>
        <div style={{ padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ font: "var(--fw-bold) 18px/1 var(--font-mono)", color: "var(--text-strong)" }}>BK-2041</div>
            <Badge tone="warning" dot>Awaiting response</Badge>
          </div>
          <DMap height={150} />
          <Card padding="md">
            <DEye style={{ marginBottom: 12 }}>Passenger</DEye>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name="Maria Santos" size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ font: "var(--fw-bold) 15px/1.1 var(--font-display)", color: "var(--text-strong)" }}>Maria Santos</div>
                <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 4 }}>Verified Resident · 0917 555 0142</div>
              </div>
              <IconButton variant="primary" label="Call"><Icon name="phone" size={20} color="#fff" /></IconButton>
            </div>
          </Card>
          <Card padding="md">
            <DEye style={{ marginBottom: 12 }}>Trip Route</DEye>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 5 }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--green-500)" }} />
                <span style={{ width: 2, flex: 1, minHeight: 26, background: "var(--gray-200)", margin: "4px 0" }} />
                <span style={{ width: 11, height: 11, borderRadius: 2, background: "var(--blue-600)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)" }}>Pickup</div>
                <div style={{ font: "var(--fw-semibold) 14px/1.3 var(--font-body)", color: "var(--text-strong)", marginTop: 3 }}>Municipal Hall, Piat</div>
                <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 16 }}>Destination</div>
                <div style={{ font: "var(--fw-semibold) 14px/1.3 var(--font-body)", color: "var(--text-strong)", marginTop: 3 }}>Tuguegarao City Hall</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ font: "var(--fw-bold) 16px/1 var(--font-display)", color: "var(--blue-600)" }}>62 km</div>
                <div style={{ font: "var(--fw-regular) 11px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 4 }}>~1h 20m</div>
              </div>
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 8, alignItems: "center", color: "var(--text-muted)", fontSize: 13 }}>
              <Icon name="file-text" size={16} /> Purpose: Hospital check-up
            </div>
          </Card>
        </div>
      </DScroll>
      <div style={{ padding: "12px 20px calc(12px + env(safe-area-inset-bottom,0))", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)", display: "flex", gap: 12 }}>
        <Button variant="outline" size="lg" onClick={onBack} style={{ flex: 1, color: "var(--status-danger)", borderColor: "var(--border-subtle)" }}>Decline</Button>
        <Button variant="secondary" size="lg" onClick={onAccept} style={{ flex: 2 }} leadingIcon={<Icon name="check" size={18} color="#fff" />}>Accept Trip</Button>
      </div>
    </>
  );
}

/* ---------- Active Trip ---------- */
function ActiveTrip({ onBack, onComplete }) {
  const { Button, IconButton, Card, Avatar, StatusTimeline } = D;
  const stages = ["Arrived at Pickup", "Picked Up Passenger", "In Transit", "Completed"];
  const [step, setStep] = React.useState(0);
  const advance = () => { if (step >= stages.length - 1) { onComplete(); } else setStep(step + 1); };
  const steps = stages.map((label, i) => ({ label, time: i < step ? "Done" : i === step ? "Now" : undefined, state: i < step ? "done" : i === step ? "active" : "pending" }));
  return (
    <>
      <D.TopBar title="Active Trip" subtitle="BK-2041 · Maria Santos" leading={<IconButton label="Back" onClick={onBack}><Icon name="arrow-left" size={20} /></IconButton>} />
      <DScroll>
        <div style={{ padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <DMap height={180} />
          <Card padding="md" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name="Maria Santos" size={46} />
            <div style={{ flex: 1 }}>
              <div style={{ font: "var(--fw-bold) 15px/1.1 var(--font-display)", color: "var(--text-strong)" }}>Maria Santos</div>
              <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 3 }}>Tuguegarao City Hall</div>
            </div>
            <IconButton variant="outline" label="Message"><Icon name="message-circle" size={20} color="var(--blue-600)" /></IconButton>
            <IconButton variant="primary" label="Call"><Icon name="phone" size={20} color="#fff" /></IconButton>
          </Card>
          <Card padding="md">
            <DEye style={{ marginBottom: 14 }}>Trip Progress</DEye>
            <StatusTimeline steps={steps} />
          </Card>
        </div>
      </DScroll>
      <div style={{ padding: "12px 20px calc(12px + env(safe-area-inset-bottom,0))", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
        <Button variant={step >= stages.length - 1 ? "secondary" : "primary"} size="lg" block onClick={advance} trailingIcon={<Icon name="arrow-right" size={18} color="#fff" />}>
          {step >= stages.length - 1 ? "Complete Trip" : `Mark: ${stages[step + 1]}`}
        </Button>
      </div>
    </>
  );
}

/* ---------- Driver Schedule ---------- */
function DriverSchedule() {
  const { Card, Badge } = D;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const trips = { 24: 2, 25: 1, 26: 3, 28: 1 };
  const [sel, setSel] = React.useState(24);
  return (
    <DScroll>
      <D.TopBar title="My Schedule" />
      <div style={{ padding: "8px 20px 24px" }}>
        <Card padding="md" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ font: "var(--fw-bold) 16px/1 var(--font-display)", color: "var(--text-strong)" }}>June 2026</div>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--surface-sunken)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="arrow-left" size={15} /></span>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--surface-sunken)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="arrow-right" size={15} /></span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 6 }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} style={{ textAlign: "center", font: "var(--fw-bold) 11px/1 var(--font-body)", color: "var(--text-subtle)", padding: "4px 0" }}>{d}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
            {Array.from({ length: 0 }).map((_, i) => <div key={"e" + i} />)}
            {days.map(d => {
              const active = sel === d;
              return (
                <button key={d} onClick={() => setSel(d)} style={{ aspectRatio: "1", border: "none", cursor: "pointer", borderRadius: "var(--radius-sm)", background: active ? "var(--color-primary)" : "transparent", color: active ? "#fff" : "var(--text-body)", font: "var(--fw-semibold) 13px/1 var(--font-body)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, position: "relative" }}>
                  {d}
                  {trips[d] && <span style={{ width: 5, height: 5, borderRadius: "50%", background: active ? "#fff" : "var(--green-500)" }} />}
                </button>
              );
            })}
          </div>
        </Card>
        <DEye style={{ marginBottom: 12 }}>Trips on June {sel}</DEye>
        {(trips[sel] ? [
          { t: "09:00", dest: "Tuguegarao City Hall", p: "Maria Santos", tone: "primary", st: "Confirmed" },
          { t: "14:00", dest: "Provincial Hospital", p: "Pedro Reyes", tone: "warning", st: "Pending" },
        ].slice(0, trips[sel]) : []).map((r, i) => (
          <Card key={i} padding="sm" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ font: "var(--fw-bold) 13px/1 var(--font-mono)", color: "var(--blue-600)", width: 46 }}>{r.t}</div>
            <div style={{ flex: 1 }}>
              <div style={{ font: "var(--fw-semibold) 14px/1.2 var(--font-body)", color: "var(--text-strong)" }}>{r.dest}</div>
              <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 3 }}>{r.p}</div>
            </div>
            <Badge tone={r.tone}>{r.st}</Badge>
          </Card>
        ))}
        {!trips[sel] && <div style={{ textAlign: "center", color: "var(--text-subtle)", fontSize: 14, padding: "30px 0" }}>No trips scheduled</div>}
      </div>
    </DScroll>
  );
}

/* ---------- Driver Profile ---------- */
function DriverProfile({ onLogout }) {
  const { Card, Avatar, Button, Badge } = D;
  return (
    <DScroll>
      <div style={{ background: "var(--gradient-hero)", padding: "12px 20px 28px", borderRadius: "0 0 26px 26px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Avatar name="Jose Cruz" size={82} status="online" />
        <div style={{ textAlign: "center" }}>
          <div style={{ font: "var(--fw-bold) 20px/1.1 var(--font-display)", color: "#fff" }}>Jose Cruz</div>
          <div style={{ font: "var(--fw-regular) 13px/1 var(--font-body)", color: "rgba(255,255,255,.8)", marginTop: 5 }}>Driver ID · DRV-0142</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,.18)", color: "#fff", font: "var(--fw-semibold) 12px/1 var(--font-body)" }}><Icon name="star" size={14} color="#fff" /> 4.9 Rating</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,.18)", color: "#fff", font: "var(--fw-semibold) 12px/1 var(--font-body)" }}><Icon name="check-circle" size={14} color="#fff" /> 312 Trips</span>
        </div>
      </div>
      <div style={{ padding: "20px 20px 28px" }}>
        <Card padding="md" style={{ marginBottom: 16 }}>
          <DEye style={{ marginBottom: 12 }}>Assigned Vehicle</DEye>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <DTile name="truck" bg="var(--blue-50)" fg="var(--blue-600)" size={48} r="var(--radius-md)" />
            <div style={{ flex: 1 }}>
              <div style={{ font: "var(--fw-bold) 15px/1.1 var(--font-display)", color: "var(--text-strong)" }}>Toyota HiAce</div>
              <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 4 }}>Plate ABC 1234 · 12 seats · White</div>
            </div>
            <Badge tone="success" dot>Active</Badge>
          </div>
        </Card>
        <Card padding="md" style={{ marginBottom: 16 }}>
          {[{ ic: "user", t: "Edit Profile" }, { ic: "lock", t: "Change Password" }, { ic: "file-text", t: "Trip History" }, { ic: "settings", t: "Settings" }].map((m, i, a) => (
            <div key={m.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < a.length - 1 ? "1px solid var(--border-subtle)" : "none", cursor: "pointer" }}>
              <DTile name={m.ic} bg="var(--surface-sunken)" fg="var(--text-body)" />
              <span style={{ flex: 1, font: "var(--fw-semibold) 14px/1 var(--font-body)", color: "var(--text-strong)" }}>{m.t}</span>
              <Icon name="chevron-right" size={18} color="var(--text-subtle)" />
            </div>
          ))}
        </Card>
        <Button variant="outline" block onClick={onLogout} leadingIcon={<Icon name="log-out" size={18} color="var(--status-danger)" />} style={{ color: "var(--status-danger)", borderColor: "var(--border-subtle)" }}>Log Out</Button>
      </div>
    </DScroll>
  );
}

/* ---------- shell ---------- */
function DriverApp() {
  const { BottomNav } = D;
  const [screen, setScreen] = React.useState("login");
  const [tab, setTab] = React.useState("home");
  const [online, setOnline] = React.useState(true);

  let body, showNav = false;
  if (screen === "login") body = <DriverLogin onLogin={() => setScreen("app")} />;
  else if (screen === "assignment") body = <TripAssignment onBack={() => setScreen("app")} onAccept={() => setScreen("active")} />;
  else if (screen === "active") body = <ActiveTrip onBack={() => setScreen("app")} onComplete={() => { setTab("home"); setScreen("app"); }} />;
  else {
    showNav = true;
    if (tab === "schedule") body = <DriverSchedule />;
    else if (tab === "trips") body = <TripAssignment onBack={() => setTab("home")} onAccept={() => setScreen("active")} />;
    else if (tab === "profile") body = <DriverProfile onLogout={() => { setScreen("login"); setTab("home"); }} />;
    else body = <DriverDashboard onAssignment={() => setScreen("assignment")} online={online} setOnline={setOnline} />;
  }
  const navItems = [
    { key: "home", label: "Home", icon: <Icon name="home" size={22} /> },
    { key: "schedule", label: "Schedule", icon: <Icon name="calendar" size={22} /> },
    { key: "trips", label: "Trips", icon: <Icon name="navigation" size={22} />, badge: 2 },
    { key: "profile", label: "Profile", icon: <Icon name="user" size={22} /> },
  ];
  return (
    <PhoneFrame statusBar={true}>
      {body}
      {showNav && <BottomNav items={navItems} activeKey={tab} onChange={setTab} />}
    </PhoneFrame>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<DriverApp />);
