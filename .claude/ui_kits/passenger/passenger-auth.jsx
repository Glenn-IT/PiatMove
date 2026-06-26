/* PiatMove — Passenger app · auth & shared screen helpers */
const PNS = window.PiatBookingDesignSystem_2c1fe9;

/* ---------- small shared helpers ---------- */
function Eyebrow({ children, style }) {
  return <div style={{ font: "var(--fw-bold) 11px/1 var(--font-body)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-subtle)", ...style }}>{children}</div>;
}
function Scroll({ children, style }) {
  return <div style={{ flex: 1, minHeight: 0, overflowY: "auto", ...style }}>{children}</div>;
}
function IconTile({ name, bg, fg, size = 40, r = "var(--radius-sm)" }) {
  return <span style={{ width: size, height: size, borderRadius: r, background: bg, color: fg, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name={name} size={size * 0.5} /></span>;
}
function MapStrip({ height = 150 }) {
  return (
    <div style={{ position: "relative", height, borderRadius: "var(--radius-md)", overflow: "hidden",
      background: "linear-gradient(135deg,#E8EEF6 0%,#DCE7F2 100%)", border: "1px solid var(--border-subtle)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--gray-200) 1px,transparent 1px),linear-gradient(90deg,var(--gray-200) 1px,transparent 1px)", backgroundSize: "26px 26px", opacity: .6 }} />
      <svg viewBox="0 0 320 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M48 118 C90 90 120 96 165 70 C205 47 240 52 280 30" stroke="var(--blue-500)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 11" />
        <circle cx="48" cy="118" r="8" fill="var(--green-500)" stroke="#fff" strokeWidth="3" />
        <circle cx="280" cy="30" r="8" fill="var(--blue-600)" stroke="#fff" strokeWidth="3" />
      </svg>
    </div>
  );
}
Object.assign(window, { Eyebrow, Scroll, IconTile, MapStrip });

/* ---------- Splash ---------- */
function SplashScreen({ onDone }) {
  return (
    <div style={{ flex: 1, background: "var(--gradient-hero)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, position: "relative" }} onClick={onDone}>
      <img src="../../assets/logo-white.svg" alt="PiatMove" style={{ width: 230 }} />
      <div style={{ position: "absolute", bottom: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div className="pm-dots" style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map(i => <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,.85)", animation: `pmPulse 1.1s ${i * .18}s infinite ease-in-out` }} />)}
        </div>
        <div style={{ font: "var(--fw-medium) 12px/1 var(--font-body)", color: "rgba(255,255,255,.7)", letterSpacing: ".06em" }}>OFFICIAL TRANSPORT SERVICE · PIAT, CAGAYAN</div>
      </div>
      <style>{`@keyframes pmPulse{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}`}</style>
    </div>
  );
}

/* ---------- Login ---------- */
function LoginScreen({ onLogin, onRegister }) {
  const { Button, Input } = PNS;
  return (
    <Scroll>
      <div style={{ padding: "28px 24px 32px" }}>
        <img src="../../assets/logo-mark.svg" width="58" height="58" alt="" />
        <h1 style={{ fontSize: 27, fontWeight: 800, marginTop: 22, color: "var(--text-strong)" }}>Welcome back</h1>
        <p style={{ marginTop: 8, color: "var(--text-muted)", fontSize: 15 }}>Sign in to book municipal vehicles and track your trips.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
          <Input label="Mobile Number" placeholder="0917 123 4567" defaultValue="0917 555 0142" leadingIcon={<Icon name="phone" size={18} />} />
          <Input label="Password" type="password" placeholder="••••••••" defaultValue="passw0rd" leadingIcon={<Icon name="lock" size={18} />} trailingIcon={<Icon name="eye" size={18} />} />
          <div style={{ textAlign: "right", marginTop: -4 }}>
            <a style={{ font: "var(--fw-semibold) 13px/1 var(--font-body)", color: "var(--text-link)", textDecoration: "none" }}>Forgot password?</a>
          </div>
          <Button variant="primary" size="lg" block onClick={onLogin} style={{ marginTop: 4 }}>Log In</Button>
        </div>
        <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--text-muted)" }}>
          New to PiatMove? <a onClick={onRegister} style={{ color: "var(--text-link)", fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>Create an account</a>
        </div>
        <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 10, alignItems: "center", justifyContent: "center", color: "var(--text-subtle)", fontSize: 13 }}>
          <Icon name="shield-check" size={16} /> Secured by the Municipality of Piat
        </div>
      </div>
    </Scroll>
  );
}

/* ---------- Register ---------- */
function RegisterScreen({ onBack, onDone }) {
  const { Button, Input, IconButton } = PNS;
  return (
    <>
      <PNS.TopBar title="Create Account" leading={<IconButton label="Back" onClick={onBack}><Icon name="arrow-left" size={20} /></IconButton>} />
      <Scroll>
        <div style={{ padding: "18px 24px 30px", display: "flex", flexDirection: "column", gap: 15 }}>
          <Input label="Full Name" placeholder="Juan dela Cruz" required leadingIcon={<Icon name="user" size={18} />} />
          <Input label="Home Address" placeholder="Brgy. Centro, Piat, Cagayan" required leadingIcon={<Icon name="map-pin" size={18} />} />
          <Input label="Contact Number" placeholder="0917 123 4567" required leadingIcon={<Icon name="phone" size={18} />} />
          <Input label="Email Address" placeholder="juan@email.com" leadingIcon={<Icon name="mail" size={18} />} />
          <Input label="Password" type="password" placeholder="Create a password" required leadingIcon={<Icon name="lock" size={18} />} trailingIcon={<Icon name="eye" size={18} />} />
          <div>
            <div style={{ font: "var(--fw-semibold) 13px/1.2 var(--font-body)", color: "var(--text-strong)", marginBottom: 7 }}>Upload Valid ID <span style={{ color: "var(--status-danger)" }}>*</span></div>
            <div style={{ border: "1.5px dashed var(--border-strong)", borderRadius: "var(--radius-md)", padding: "22px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "var(--surface-sunken)" }}>
              <IconTile name="camera" bg="var(--blue-50)" fg="var(--blue-600)" size={44} r="var(--radius-md)" />
              <div style={{ font: "var(--fw-semibold) 14px/1 var(--font-body)", color: "var(--text-strong)" }}>Tap to upload</div>
              <div style={{ font: "var(--fw-regular) 12px/1 var(--font-body)", color: "var(--text-muted)" }}>Barangay ID, Driver's License, or PhilSys</div>
            </div>
          </div>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
            <input type="checkbox" defaultChecked style={{ width: 18, height: 18, marginTop: 1, accentColor: "var(--color-primary)" }} />
            <span>I agree to the Municipality of Piat's <a style={{ color: "var(--text-link)", fontWeight: 600 }}>Terms of Service</a> and Data Privacy Policy.</span>
          </label>
          <Button variant="primary" size="lg" block onClick={onDone} style={{ marginTop: 6 }}>Register</Button>
        </div>
      </Scroll>
    </>
  );
}

Object.assign(window, { SplashScreen, LoginScreen, RegisterScreen });
