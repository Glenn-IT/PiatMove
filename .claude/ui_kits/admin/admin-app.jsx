/* PiatMove — Admin desktop · shell + dashboard home */
const AD = window.PiatBookingDesignSystem_2c1fe9;

function AdminHome() {
  const { StatCard, Badge, Avatar, Button } = AD;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <StatCard label="Total Bookings" value="1,284" icon={<Icon name="ticket" />} tone="primary" delta="12%" />
        <StatCard label="Active Trips" value="38" icon={<Icon name="navigation" />} tone="success" delta="5%" />
        <StatCard label="Drivers Online" value="12" icon={<Icon name="users" />} tone="info" />
        <StatCard label="Vehicles Available" value="9" icon={<Icon name="truck" />} tone="warning" deltaDir="down" delta="2" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}>
        <Panel title="Bookings This Week" action={<Badge tone="success" dot>+12% vs last week</Badge>}>
          <LineChart points={[42, 58, 49, 71, 64, 88, 76]} height={210} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, font: "var(--fw-semibold) 11px/1 var(--font-body)", color: "var(--text-muted)" }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(m => <span key={m}>{m}</span>)}
          </div>
        </Panel>
        <Panel title="Trips by Vehicle">
          <Donut segments={[{ k: "HiAce Van", v: 142, color: "var(--blue-600)" }, { k: "Sedan", v: 98, color: "var(--green-500)" }, { k: "Coaster", v: 64, color: "var(--amber-500)" }, { k: "Ambulance", v: 38, color: "var(--cyan-500)" }]} />
        </Panel>
      </div>
      {/* quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {[["plus", "New Booking", "var(--blue-50)", "var(--blue-600)"], ["users", "Assign Driver", "var(--green-50)", "var(--green-600)"], ["truck", "Add Vehicle", "var(--amber-50)", "var(--amber-700)"], ["file-text", "Generate Report", "var(--cyan-50)", "var(--cyan-700)"]].map((q, i) => (
          <button key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "16px 18px", cursor: "pointer", boxShadow: "var(--shadow-xs)" }}>
            <span style={{ width: 42, height: 42, borderRadius: "var(--radius-sm)", background: q[2], color: q[3], display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name={q[0]} size={20} /></span>
            <span style={{ font: "var(--fw-semibold) 14px/1 var(--font-body)", color: "var(--text-strong)" }}>{q[1]}</span>
          </button>
        ))}
      </div>
      {/* recent bookings preview */}
      <BookingManagement />
    </div>
  );
}

function AdminApp() {
  const { Avatar, Badge } = AD;
  const [route, setRoute] = React.useState("home");
  const nav = [
    { k: "home", label: "Dashboard", ic: "bar-chart" },
    { k: "bookings", label: "Bookings", ic: "ticket" },
    { k: "drivers", label: "Drivers", ic: "users" },
    { k: "vehicles", label: "Vehicles", ic: "truck" },
    { k: "reports", label: "Reports", ic: "file-text" },
  ];
  const titles = { home: "Dashboard", bookings: "Booking Management", drivers: "Driver Management", vehicles: "Vehicle Management", reports: "Reports & Analytics" };
  let content;
  if (route === "bookings") content = <BookingManagement />;
  else if (route === "drivers") content = <DriverManagement />;
  else if (route === "vehicles") content = <VehicleManagement />;
  else if (route === "reports") content = <Reports />;
  else content = <AdminHome />;

  return (
    <div style={{ width: 1280, height: 800, display: "flex", background: "var(--surface-app)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-subtle)" }}>
      {/* sidebar */}
      <aside style={{ width: 244, background: "var(--surface-card)", borderRight: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", flex: "none" }}>
        <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid var(--border-subtle)" }}>
          <img src="../../assets/logo-full.svg" style={{ width: 180 }} alt="PiatMove" />
        </div>
        <div style={{ padding: "8px 14px", flex: 1 }}>
          <div style={{ font: "var(--fw-bold) 10px/1 var(--font-body)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-subtle)", padding: "14px 12px 8px" }}>Admin Portal</div>
          {nav.map(n => {
            const active = route === n.k;
            return (
              <button key={n.k} onClick={() => setRoute(n.k)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", marginBottom: 2, border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", background: active ? "var(--blue-50)" : "transparent", color: active ? "var(--blue-700)" : "var(--text-body)", font: `${active ? "var(--fw-bold)" : "var(--fw-medium)"} 14px/1 var(--font-body)` }}>
                <Icon name={n.ic} size={19} color={active ? "var(--blue-600)" : "var(--text-muted)"} /> {n.label}
              </button>
            );
          })}
        </div>
        <div style={{ padding: "14px", borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name="Admin Office" size={38} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-strong)" }}>MTO Admin</div>
            <div style={{ font: "var(--fw-regular) 11px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 3 }}>Transport Office</div>
          </div>
          <Icon name="log-out" size={18} color="var(--text-subtle)" />
        </div>
      </aside>
      {/* main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ height: 68, flex: "none", background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 16, padding: "0 28px" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800 }}>{titles[route]}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, height: 40, padding: "0 14px", borderRadius: "var(--radius-pill)", background: "var(--surface-sunken)", width: 280, color: "var(--text-subtle)" }}>
            <Icon name="search" size={17} /> <span style={{ font: "var(--fw-regular) 13px/1 var(--font-body)" }}>Search bookings, drivers…</span>
          </div>
          <button style={{ position: "relative", width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "var(--surface-sunken)", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="bell" size={19} color="var(--text-body)" />
            <span style={{ position: "absolute", top: 7, right: 8, width: 8, height: 8, borderRadius: "50%", background: "var(--status-danger)", border: "2px solid var(--surface-card)" }} />
          </button>
        </header>
        <main style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: 28 }}>{content}</main>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<AdminApp />);
