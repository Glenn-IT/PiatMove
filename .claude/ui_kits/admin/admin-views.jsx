/* PiatMove — Admin desktop · charts, helpers, secondary views */
const A = window.PiatBookingDesignSystem_2c1fe9;

/* ---------- chart helpers ---------- */
function BarChart({ data, height = 180, color = "var(--blue-600)" }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height, paddingTop: 10 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", maxWidth: 38, height: `${(d.v / max) * 100}%`, background: i === data.length - 1 ? color : "var(--blue-200)", borderRadius: "6px 6px 0 0", transition: "height .4s var(--ease-standard)" }} title={d.v} />
          <span style={{ font: "var(--fw-semibold) 11px/1 var(--font-body)", color: "var(--text-muted)" }}>{d.k}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ points, height = 200 }) {
  const max = Math.max(...points) * 1.15, w = 520, h = height - 30;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - (p / max) * h]);
  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0].toFixed(1)} ${c[1].toFixed(1)}`).join(" ");
  const area = `${path} L${w} ${h} L0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} style={{ width: "100%", height }}>
      <defs>
        <linearGradient id="lcg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--blue-500)" stopOpacity=".22" />
          <stop offset="1" stopColor="var(--blue-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((g, i) => <line key={i} x1="0" x2={w} y1={h * g} y2={h * g} stroke="var(--border-subtle)" strokeWidth="1" />)}
      <path d={area} fill="url(#lcg)" />
      <path d={path} fill="none" stroke="var(--blue-600)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => <circle key={i} cx={c[0]} cy={c[1]} r="4" fill="#fff" stroke="var(--blue-600)" strokeWidth="2.5" />)}
    </svg>
  );
}

function Donut({ segments, size = 150 }) {
  const total = segments.reduce((s, x) => s + x.v, 0);
  let acc = 0; const r = 56, c = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg width={size} height={size} viewBox="0 0 150 150">
        <circle cx="75" cy="75" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth="20" />
        {segments.map((s, i) => {
          const len = (s.v / total) * c; const off = acc; acc += len;
          return <circle key={i} cx="75" cy="75" r={r} fill="none" stroke={s.color} strokeWidth="20" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off} transform="rotate(-90 75 75)" strokeLinecap="butt" />;
        })}
        <text x="75" y="70" textAnchor="middle" style={{ font: "var(--fw-extrabold) 26px var(--font-display)", fill: "var(--text-strong)" }}>{total}</text>
        <text x="75" y="90" textAnchor="middle" style={{ font: "var(--fw-medium) 11px var(--font-body)", fill: "var(--text-muted)" }}>total</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
            <span style={{ font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-body)" }}>{s.k}</span>
            <span style={{ font: "var(--fw-bold) 13px/1 var(--font-body)", color: "var(--text-strong)", marginLeft: 4 }}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Panel({ title, action, children, style }) {
  return (
    <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: 22, ...style }}>
      {title && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>{action}
      </div>}
      {children}
    </div>
  );
}
Object.assign(window, { BarChart, LineChart, Donut, Panel });

/* ---------- Booking Management ---------- */
function BookingManagement() {
  const { Badge, Avatar } = A;
  const rows = [
    ["BK-2041", "Maria Santos", "Tuguegarao City Hall", "HiAce Van", "Jun 24, 9:00 AM", "primary", "In Transit"],
    ["BK-2040", "Pedro Reyes", "Provincial Hospital", "Ambulance", "Jun 24, 8:00 AM", "warning", "Pending"],
    ["BK-2039", "Ana Lim", "Piat Basilica", "Coaster Bus", "Jun 23, 6:30 AM", "success", "Approved"],
    ["BK-2038", "Carlos Tan", "Sta. Teresita", "Sedan", "Jun 22, 2:00 PM", "success", "Completed"],
    ["BK-2037", "Liza Cruz", "Public Market", "Sedan", "Jun 22, 10:00 AM", "danger", "Cancelled"],
    ["BK-2036", "Mark Dizon", "Tuao Junction", "HiAce Van", "Jun 21, 7:00 AM", "success", "Completed"],
  ];
  return (
    <Panel title="All Bookings" action={<div style={{ display: "flex", gap: 8 }}>
      <button style={chipBtn}><Icon name="filter" size={15} /> Filter</button>
      <button style={{ ...chipBtn, background: "var(--color-primary)", color: "#fff", border: "1px solid transparent" }}><Icon name="download" size={15} color="#fff" /> Export</button>
    </div>}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Reference", "Passenger", "Destination", "Vehicle", "Schedule", "Status", ""].map((h, i) => (
              <th key={i} style={thStyle}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <td style={tdStyle}><span style={{ font: "var(--fw-bold) 13px/1 var(--font-mono)", color: "var(--blue-600)" }}>{r[0]}</span></td>
                <td style={tdStyle}><div style={{ display: "flex", alignItems: "center", gap: 9 }}><Avatar name={r[1]} size={30} /><span style={{ fontWeight: 600, color: "var(--text-strong)" }}>{r[1]}</span></div></td>
                <td style={tdStyle}>{r[2]}</td>
                <td style={tdStyle}>{r[3]}</td>
                <td style={{ ...tdStyle, color: "var(--text-muted)" }}>{r[4]}</td>
                <td style={tdStyle}><Badge tone={r[5]} dot>{r[6]}</Badge></td>
                <td style={tdStyle}><Icon name="more-vertical" size={18} color="var(--text-subtle)" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

/* ---------- Driver Management ---------- */
function DriverManagement() {
  const { Card, Avatar, Badge } = A;
  const drivers = [
    { n: "Jose Cruz", id: "DRV-0142", v: "Toyota HiAce", r: 4.9, t: 312, st: "online" },
    { n: "Ramon Bautista", id: "DRV-0138", v: "Coaster Bus", r: 4.8, t: 287, st: "online" },
    { n: "Elena Marquez", id: "DRV-0151", v: "Sedan", r: 5.0, t: 198, st: "busy" },
    { n: "Tomas Aquino", id: "DRV-0129", v: "Ambulance", r: 4.7, t: 421, st: "offline" },
    { n: "Grace Villa", id: "DRV-0160", v: "HiAce Van", r: 4.9, t: 156, st: "online" },
    { n: "Danilo Sy", id: "DRV-0144", v: "Sedan", r: 4.6, t: 233, st: "offline" },
  ];
  const stTone = { online: "success", busy: "warning", offline: "neutral" };
  return (
    <Panel title="Drivers" action={<button style={{ ...chipBtn, background: "var(--color-primary)", color: "#fff", border: "1px solid transparent" }}><Icon name="plus" size={15} color="#fff" /> Add Driver</button>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {drivers.map((d, i) => (
          <Card key={i} padding="md" interactive>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Avatar name={d.n} size={48} status={d.st} />
              <div style={{ flex: 1 }}>
                <div style={{ font: "var(--fw-bold) 15px/1.1 var(--font-display)", color: "var(--text-strong)" }}>{d.n}</div>
                <div style={{ font: "var(--fw-regular) 12px/1 var(--font-mono)", color: "var(--text-muted)", marginTop: 4 }}>{d.id}</div>
              </div>
              <Badge tone={stTone[d.st]} dot>{d.st}</Badge>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
              {[["Vehicle", d.v], ["Rating", `★ ${d.r}`], ["Trips", d.t]].map(([k, v]) => (
                <div key={k}><div style={{ font: "var(--fw-regular) 11px/1 var(--font-body)", color: "var(--text-muted)" }}>{k}</div><div style={{ font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-strong)", marginTop: 5 }}>{v}</div></div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Panel>
  );
}

/* ---------- Vehicle Management ---------- */
function VehicleManagement() {
  const { Card, Badge } = A;
  const fleet = [
    { n: "Toyota HiAce", p: "ABC 1234", cap: "12", st: "In Use", tone: "primary", ic: "truck" },
    { n: "Hyundai Coaster", p: "DEF 5678", cap: "28", st: "Available", tone: "success", ic: "truck" },
    { n: "Toyota Vios", p: "GHI 9012", cap: "4", st: "Available", tone: "success", ic: "car" },
    { n: "Ambulance Unit 1", p: "AMB 001", cap: "Medical", st: "Maintenance", tone: "warning", ic: "plus" },
    { n: "Isuzu Crosswind", p: "JKL 3456", cap: "8", st: "Available", tone: "success", ic: "car" },
    { n: "Toyota HiAce 2", p: "MNO 7890", cap: "12", st: "In Use", tone: "primary", ic: "truck" },
  ];
  return (
    <Panel title="Fleet Overview" action={<button style={{ ...chipBtn, background: "var(--color-primary)", color: "#fff", border: "1px solid transparent" }}><Icon name="plus" size={15} color="#fff" /> Add Vehicle</button>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {fleet.map((v, i) => (
          <Card key={i} padding="md" interactive>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ width: 52, height: 52, borderRadius: "var(--radius-md)", background: "var(--blue-50)", color: "var(--blue-600)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name={v.ic} size={26} /></span>
              <Badge tone={v.tone} dot>{v.st}</Badge>
            </div>
            <div style={{ font: "var(--fw-bold) 16px/1.1 var(--font-display)", color: "var(--text-strong)" }}>{v.n}</div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, color: "var(--text-muted)", fontSize: 13 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{v.p}</span>
              <span>· {v.cap} seats</span>
            </div>
          </Card>
        ))}
      </div>
    </Panel>
  );
}

/* ---------- Reports ---------- */
function Reports() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Panel title="Bookings — Last 6 Months" action={<button style={{ ...chipBtn, background: "var(--color-secondary)", color: "#fff", border: "1px solid transparent" }}><Icon name="download" size={15} color="#fff" /> Export PDF</button>}>
        <LineChart points={[180, 240, 210, 320, 290, 384]} height={220} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, font: "var(--fw-semibold) 11px/1 var(--font-body)", color: "var(--text-muted)" }}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(m => <span key={m}>{m}</span>)}
        </div>
      </Panel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Panel title="Trips by Vehicle Type"><Donut segments={[{ k: "HiAce Van", v: 142, color: "var(--blue-600)" }, { k: "Sedan", v: 98, color: "var(--green-500)" }, { k: "Coaster", v: 64, color: "var(--amber-500)" }, { k: "Ambulance", v: 38, color: "var(--cyan-500)" }]} /></Panel>
        <Panel title="Trips by Destination"><BarChart data={[{ k: "Tugue.", v: 142 }, { k: "Hospital", v: 96 }, { k: "Market", v: 74 }, { k: "Basilica", v: 120 }, { k: "Tuao", v: 58 }]} height={180} /></Panel>
      </div>
    </div>
  );
}

const chipBtn = { display: "inline-flex", alignItems: "center", gap: 6, height: 38, padding: "0 14px", borderRadius: "var(--radius-sm)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-body)", cursor: "pointer" };
const thStyle = { textAlign: "left", padding: "0 14px 12px", font: "var(--fw-bold) 11px/1 var(--font-body)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-subtle)" };
const tdStyle = { padding: "14px", font: "var(--fw-medium) 13px/1.3 var(--font-body)", color: "var(--text-body)" };
Object.assign(window, { BookingManagement, DriverManagement, VehicleManagement, Reports, chipBtn });
