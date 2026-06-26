/* Shared device frames for PiatMove UI kits. Exposes window.PhoneFrame, window.StatusBar. */
(function () {
  function StatusBar({ dark }) {
    const c = dark ? "#fff" : "var(--gray-900)";
    return (
      React.createElement("div", { style: { height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px 0 26px", flex: "none" } },
        React.createElement("span", { style: { font: "var(--fw-bold) 14px/1 var(--font-body)", color: c, letterSpacing: ".02em" } }, "9:41"),
        React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", color: c } },
          React.createElement("span", { style: { fontSize: 12, letterSpacing: "1px" } }, "●●●"),
          React.createElement("svg", { width: 17, height: 12, viewBox: "0 0 17 12", fill: "none" },
            React.createElement("path", { d: "M1 8h2v3H1zM5 5h2v6H5zM9 3h2v8H9zM13 1h2v10h-2z", fill: c })),
          React.createElement("svg", { width: 24, height: 12, viewBox: "0 0 24 12", fill: "none" },
            React.createElement("rect", { x: 1, y: 1, width: 19, height: 10, rx: 2.5, stroke: c, strokeOpacity: .5, fill: "none" }),
            React.createElement("rect", { x: 3, y: 3, width: 13, height: 6, rx: 1, fill: c }),
            React.createElement("rect", { x: 21, y: 4, width: 2, height: 4, rx: 1, fill: c, fillOpacity: .5 })))
      )
    );
  }

  function PhoneFrame({ children, dark = false, statusBar = true, label }) {
    return (
      React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 } },
        label && React.createElement("div", { style: { font: "var(--fw-bold) 11px/1 var(--font-body)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-subtle)" } }, label),
        React.createElement("div", { style: {
          width: 390, height: 844, background: "#000", borderRadius: 52, padding: 11,
          boxShadow: "var(--shadow-lg)", flex: "none", position: "relative",
        } },
          React.createElement("div", { style: {
            width: "100%", height: "100%", borderRadius: 42, overflow: "hidden",
            background: "var(--surface-app)", display: "flex", flexDirection: "column", position: "relative",
          } },
            React.createElement("div", { style: { position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)", width: 120, height: 30, background: "#000", borderRadius: 18, zIndex: 50 } }),
            statusBar && React.createElement(StatusBar, { dark }),
            React.createElement("div", { style: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" } }, children)
          )
        )
      )
    );
  }

  window.PhoneFrame = PhoneFrame;
  window.StatusBar = StatusBar;
})();
