/* @ds-bundle: {"format":3,"namespace":"PiatBookingDesignSystem_2c1fe9","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"StatCard","sourcePath":"components/core/StatCard.jsx"},{"name":"ListItem","sourcePath":"components/feedback/ListItem.jsx"},{"name":"StatusTimeline","sourcePath":"components/feedback/StatusTimeline.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"assets/frames.js":"db4ef04cce99","assets/icons.js":"66c1c431523b","components/core/Avatar.jsx":"831798d0ed32","components/core/Badge.jsx":"3677d1f05729","components/core/Button.jsx":"8def33c31a42","components/core/Card.jsx":"dea4a5826bf2","components/core/Chip.jsx":"0aeb7ea2e0ea","components/core/IconButton.jsx":"fdcf3d21a26f","components/core/Input.jsx":"7a191b91d349","components/core/StatCard.jsx":"32e0c9e46cf8","components/feedback/ListItem.jsx":"b2089cdeff7f","components/feedback/StatusTimeline.jsx":"ca0a95a6c8ad","components/navigation/BottomNav.jsx":"0fae6dc0074d","components/navigation/TopBar.jsx":"cf1e513ed8d6","ui_kits/admin/admin-app.jsx":"a5816c1e66ab","ui_kits/admin/admin-views.jsx":"eec09165b0e9","ui_kits/driver/driver-app.jsx":"6e73b9cc5441","ui_kits/passenger/passenger-app.jsx":"32448e3bc8b9","ui_kits/passenger/passenger-auth.jsx":"2771abf7418f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PiatBookingDesignSystem_2c1fe9 = window.PiatBookingDesignSystem_2c1fe9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/frames.js
try { (() => {
/* Shared device frames for PiatMove UI kits. Exposes window.PhoneFrame, window.StatusBar. */
(function () {
  function StatusBar({
    dark
  }) {
    const c = dark ? "#fff" : "var(--gray-900)";
    return React.createElement("div", {
      style: {
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 22px 0 26px",
        flex: "none"
      }
    }, React.createElement("span", {
      style: {
        font: "var(--fw-bold) 14px/1 var(--font-body)",
        color: c,
        letterSpacing: ".02em"
      }
    }, "9:41"), React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center",
        color: c
      }
    }, React.createElement("span", {
      style: {
        fontSize: 12,
        letterSpacing: "1px"
      }
    }, "●●●"), React.createElement("svg", {
      width: 17,
      height: 12,
      viewBox: "0 0 17 12",
      fill: "none"
    }, React.createElement("path", {
      d: "M1 8h2v3H1zM5 5h2v6H5zM9 3h2v8H9zM13 1h2v10h-2z",
      fill: c
    })), React.createElement("svg", {
      width: 24,
      height: 12,
      viewBox: "0 0 24 12",
      fill: "none"
    }, React.createElement("rect", {
      x: 1,
      y: 1,
      width: 19,
      height: 10,
      rx: 2.5,
      stroke: c,
      strokeOpacity: .5,
      fill: "none"
    }), React.createElement("rect", {
      x: 3,
      y: 3,
      width: 13,
      height: 6,
      rx: 1,
      fill: c
    }), React.createElement("rect", {
      x: 21,
      y: 4,
      width: 2,
      height: 4,
      rx: 1,
      fill: c,
      fillOpacity: .5
    }))));
  }
  function PhoneFrame({
    children,
    dark = false,
    statusBar = true,
    label
  }) {
    return React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12
      }
    }, label && React.createElement("div", {
      style: {
        font: "var(--fw-bold) 11px/1 var(--font-body)",
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: "var(--text-subtle)"
      }
    }, label), React.createElement("div", {
      style: {
        width: 390,
        height: 844,
        background: "#000",
        borderRadius: 52,
        padding: 11,
        boxShadow: "var(--shadow-lg)",
        flex: "none",
        position: "relative"
      }
    }, React.createElement("div", {
      style: {
        width: "100%",
        height: "100%",
        borderRadius: 42,
        overflow: "hidden",
        background: "var(--surface-app)",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }
    }, React.createElement("div", {
      style: {
        position: "absolute",
        top: 13,
        left: "50%",
        transform: "translateX(-50%)",
        width: 120,
        height: 30,
        background: "#000",
        borderRadius: 18,
        zIndex: 50
      }
    }), statusBar && React.createElement(StatusBar, {
      dark
    }), React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }
    }, children))));
  }
  window.PhoneFrame = PhoneFrame;
  window.StatusBar = StatusBar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/frames.js", error: String((e && e.message) || e) }); }

// assets/icons.js
try { (() => {
/* ============================================================
   PiatMove icon set — Lucide-style (24px grid, 2px stroke,
   round caps/joins). Mirrors lucide.dev so production code can
   swap in the full Lucide CDN set 1:1. Exposes window.Icon (React).
   ============================================================ */
(function () {
  // path data lifted to match Lucide's outline style
  var P = {
    home: 'M3 9.5 12 3l9 6.5M5 9v11h14V9',
    ticket: 'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4zM15 6v12',
    bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
    user: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    car: 'M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13M5 13h14a1 1 0 0 1 1 1v4H4v-4a1 1 0 0 1 1-1zM7 18v2M17 18v2',
    truck: 'M3 6h11v9H3zM14 9h4l3 3v3h-7zM7 18a2 2 0 1 0 0 .01M18 18a2 2 0 1 0 0 .01',
    'map-pin': 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 10a2 2 0 1 0 0 .01',
    navigation: 'M3 11l19-9-9 19-2-8-8-2z',
    route: 'M6 19a2 2 0 1 0 0 .01M18 5a2 2 0 1 0 0 .01M6 17V9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v0',
    calendar: 'M7 3v3M17 3v3M4 8h16M4 6h16v14H4zM4 8h16',
    clock: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
    'arrow-right': 'M5 12h14M12 5l7 7-7 7',
    'chevron-right': 'M9 6l6 6-6 6',
    'chevron-down': 'M6 9l6 6 6-6',
    plus: 'M12 5v14M5 12h14',
    x: 'M18 6 6 18M6 6l12 12',
    check: 'M20 6 9 17l-5-5',
    'check-circle': 'M9 12l2 2 4-4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',
    mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6',
    lock: 'M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM8 11V7a4 4 0 0 1 8 0v4',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    search: 'M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z',
    menu: 'M3 6h18M3 12h18M3 18h18',
    settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.2A1.6 1.6 0 0 0 7 19.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 0 1 0-4h.2A1.6 1.6 0 0 0 4.7 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9.4a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9.4a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.6 1.6 0 0 0-1.4 1z',
    'log-out': 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
    edit: 'M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z',
    camera: 'M14.5 4l1.5 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1.5-2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    star: 'M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.4 6.2 21l1.1-6.5L2.6 9.8l6.5-.9z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    'shield-check': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
    'bar-chart': 'M3 21h18M7 21V10M12 21V4M17 21v-7',
    'trending-up': 'M22 7l-8.5 8.5-5-5L2 17M16 7h6v6',
    'file-text': 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M9 13h6M9 17h6',
    download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    wallet: 'M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2H3zM3 7h17a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 13a1 1 0 1 0 .01 0z',
    building: 'M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M4 21h16M20 21v-9a2 2 0 0 0-2-2h-2M8 7h2M8 11h2M8 15h2',
    'more-vertical': 'M12 6a1 1 0 1 0 .01 0M12 12a1 1 0 1 0 .01 0M12 18a1 1 0 1 0 .01 0',
    filter: 'M3 5h18l-7 8v6l-4-2v-4z',
    info: 'M12 16v-4M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    'message-circle': 'M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z',
    'credit-card': 'M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM2 10h20',
    flag: 'M4 22V4s1-1 4-1 5 2 8 2 4-1 4-1v10s-1 1-4 1-5-2-8-2-4 1-4 1z'
  };
  function Icon(props) {
    var name = props.name,
      size = props.size || 22,
      stroke = props.stroke || 2;
    var color = props.color || 'currentColor';
    var d = P[name];
    if (!d) {
      return React.createElement('span', {
        style: {
          width: size,
          height: size,
          display: 'inline-block'
        }
      });
    }
    var paths = d.split('M').filter(Boolean).map(function (seg, i) {
      return React.createElement('path', {
        key: i,
        d: 'M' + seg
      });
    });
    return React.createElement('svg', Object.assign({
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
      style: Object.assign({
        display: 'block',
        flex: 'none'
      }, props.style || {})
    }), paths);
  }
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/icons.js", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * User avatar — image or initials fallback, with optional status ring.
 */
function Avatar({
  src,
  name = "",
  size = 44,
  status,
  style,
  ...rest
}) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const statusColors = {
    online: "var(--green-500)",
    busy: "var(--amber-500)",
    offline: "var(--gray-400)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: src ? "var(--surface-sunken)" : "var(--blue-100)",
      color: "var(--blue-700)",
      font: `var(--fw-bold) ${Math.round(size * 0.38)}px/1 var(--font-display)`,
      border: "2px solid var(--surface-card)",
      boxShadow: "var(--shadow-xs)"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -1,
      bottom: -1,
      width: Math.max(10, size * 0.26),
      height: Math.max(10, size * 0.26),
      borderRadius: "50%",
      background: statusColors[status] || statusColors.offline,
      border: "2px solid var(--surface-card)"
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Status badge / pill used for booking states and labels.
 */
function Badge({
  tone = "neutral",
  soft = true,
  size = "md",
  dot = false,
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      fg: "var(--gray-600)",
      soft: "var(--gray-100)",
      solid: "var(--gray-600)"
    },
    primary: {
      fg: "var(--blue-700)",
      soft: "var(--blue-50)",
      solid: "var(--blue-600)"
    },
    success: {
      fg: "var(--green-700)",
      soft: "var(--green-50)",
      solid: "var(--green-500)"
    },
    warning: {
      fg: "var(--amber-700)",
      soft: "var(--amber-50)",
      solid: "var(--amber-500)"
    },
    danger: {
      fg: "var(--red-700)",
      soft: "var(--red-50)",
      solid: "var(--red-500)"
    },
    info: {
      fg: "var(--cyan-700)",
      soft: "var(--cyan-50)",
      solid: "var(--cyan-500)"
    }
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: {
      f: 11,
      p: "3px 8px",
      g: 5
    },
    md: {
      f: 12,
      p: "4px 10px",
      g: 6
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: s.g,
      padding: s.p,
      borderRadius: "var(--radius-pill)",
      font: `var(--fw-semibold) ${s.f}px/1 var(--font-body)`,
      letterSpacing: "0.01em",
      background: soft ? t.soft : t.solid,
      color: soft ? t.fg : "#fff",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: soft ? t.solid : "#fff"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Primary action button for the Piat Booking system.
 */
function Button({
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  type = "button",
  onClick,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "0 14px",
      height: 38,
      font: 13,
      radius: "var(--radius-sm)",
      gap: 6
    },
    md: {
      padding: "0 18px",
      height: 46,
      font: 15,
      radius: "var(--radius-md)",
      gap: 8
    },
    lg: {
      padding: "0 24px",
      height: 54,
      font: 16,
      radius: "var(--radius-md)",
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--color-primary-on)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-sm)"
    },
    secondary: {
      background: "var(--color-secondary)",
      color: "var(--color-secondary-on)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-sm)"
    },
    outline: {
      background: "var(--surface-card)",
      color: "var(--color-primary)",
      border: "1.5px solid var(--blue-200)",
      boxShadow: "none"
    },
    ghost: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "1px solid transparent",
      boxShadow: "none"
    },
    danger: {
      background: "var(--status-danger)",
      color: "#fff",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-sm)"
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      width: block ? "100%" : "auto",
      height: s.height,
      padding: s.padding,
      font: `var(--fw-semibold) ${s.font}px/1 var(--font-body)`,
      letterSpacing: "0.01em",
      borderRadius: s.radius,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "filter var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.98)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), leadingIcon, children, trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. The base layout block for the system.
 */
function Card({
  padding = "md",
  elevation = "sm",
  interactive = false,
  style,
  children,
  ...rest
}) {
  const pads = {
    none: 0,
    sm: "var(--space-4)",
    md: "var(--space-5)",
    lg: "var(--space-6)"
  };
  const shadows = {
    none: "none",
    xs: "var(--shadow-xs)",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: pads[padding] ?? pads.md,
      boxShadow: shadows[elevation] ?? shadows.sm,
      transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
      cursor: interactive ? "pointer" : "default",
      ...style
    },
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.boxShadow = "var(--shadow-md)";
      e.currentTarget.style.transform = "translateY(-2px)";
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.boxShadow = shadows[elevation] ?? shadows.sm;
      e.currentTarget.style.transform = "translateY(0)";
    } : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Selectable chip — vehicle type, filters, quick options.
 */
function Chip({
  selected = false,
  leadingIcon = null,
  onClick,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      height: 38,
      padding: "0 14px",
      borderRadius: "var(--radius-pill)",
      font: "var(--fw-semibold) 13px/1 var(--font-body)",
      cursor: "pointer",
      background: selected ? "var(--blue-50)" : "var(--surface-card)",
      color: selected ? "var(--blue-700)" : "var(--text-body)",
      border: selected ? "1.5px solid var(--blue-500)" : "1.5px solid var(--border-subtle)",
      transition: "all var(--dur-fast) var(--ease-standard)",
      ...style
    }
  }, rest), leadingIcon, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button (header actions, toolbars).
 */
function IconButton({
  variant = "soft",
  size = 40,
  label,
  onClick,
  children,
  style,
  ...rest
}) {
  const variants = {
    soft: {
      background: "var(--surface-sunken)",
      color: "var(--text-body)",
      border: "1px solid transparent"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "1px solid transparent"
    },
    outline: {
      background: "var(--surface-card)",
      color: "var(--text-body)",
      border: "1px solid var(--border-subtle)"
    },
    primary: {
      background: "var(--color-primary)",
      color: "#fff",
      border: "1px solid transparent"
    }
  };
  const v = variants[variant] || variants.soft;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    onClick: onClick,
    style: {
      width: size,
      height: size,
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      cursor: "pointer",
      transition: "filter var(--dur-fast), transform var(--dur-fast)",
      ...v,
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = "scale(0.93)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Labeled text input with optional leading icon and helper/error text.
 */
function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  leadingIcon = null,
  trailingIcon = null,
  helperText,
  error = false,
  disabled = false,
  required = false,
  style,
  ...rest
}) {
  const borderColor = error ? "var(--status-danger)" : "var(--border-subtle)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      width: "100%",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--fw-semibold) 13px/1.2 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 7
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-danger)"
    }
  }, " *")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: 48,
      padding: "0 14px",
      background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)"
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-subtle)",
      display: "flex"
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      font: "var(--fw-medium) 15px/1.4 var(--font-body)",
      color: "var(--text-strong)"
    },
    onFocus: e => {
      const w = e.currentTarget.parentElement;
      if (!error) {
        w.style.borderColor = "var(--border-focus)";
        w.style.boxShadow = "var(--shadow-focus)";
      }
    },
    onBlur: e => {
      const w = e.currentTarget.parentElement;
      w.style.borderColor = borderColor;
      w.style.boxShadow = "none";
    }
  }, rest)), trailingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-subtle)",
      display: "flex"
    }
  }, trailingIcon)), helperText && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 6,
      font: "var(--fw-regular) 12px/1.4 var(--font-body)",
      color: error ? "var(--status-danger)" : "var(--text-muted)"
    }
  }, helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Compact analytics stat card for dashboards.
 */
function StatCard({
  label,
  value,
  icon = null,
  tone = "primary",
  delta,
  deltaDir = "up",
  style,
  ...rest
}) {
  const tones = {
    primary: {
      soft: "var(--blue-50)",
      fg: "var(--blue-600)"
    },
    success: {
      soft: "var(--green-50)",
      fg: "var(--green-600)"
    },
    warning: {
      soft: "var(--amber-50)",
      fg: "var(--amber-700)"
    },
    info: {
      soft: "var(--cyan-50)",
      fg: "var(--cyan-700)"
    },
    neutral: {
      soft: "var(--gray-100)",
      fg: "var(--gray-600)"
    }
  };
  const t = tones[tone] || tones.primary;
  const up = deltaDir === "up";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-5)",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "var(--radius-md)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: t.soft,
      color: t.fg
    }
  }, icon), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      font: "var(--fw-semibold) 12px/1 var(--font-body)",
      color: up ? "var(--green-600)" : "var(--red-500)"
    }
  }, up ? "▲" : "▼", " ", delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-extrabold) 30px/1 var(--font-display)",
      color: "var(--text-strong)",
      letterSpacing: "-0.02em"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      font: "var(--fw-medium) 13px/1.3 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ListItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Generic list row — notifications, settings, trips.
 */
function ListItem({
  leading = null,
  title,
  subtitle,
  meta = null,
  trailing = null,
  onClick,
  divider = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 4px",
      borderBottom: divider ? "1px solid var(--border-subtle)" : "none",
      cursor: onClick ? "pointer" : "default",
      ...style
    }
  }, rest), leading, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 15px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 13px/1.4 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, subtitle)), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) 12px/1 var(--font-body)",
      color: "var(--text-subtle)",
      whiteSpace: "nowrap"
    }
  }, meta), trailing);
}
Object.assign(__ds_scope, { ListItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ListItem.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatusTimeline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Vertical status timeline for booking / trip tracking.
 * steps: [{ label, time?, state: "done"|"active"|"pending" }]
 */
function StatusTimeline({
  steps = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, rest), steps.map((st, i) => {
    const last = i === steps.length - 1;
    const done = st.state === "done";
    const active = st.state === "active";
    const dot = done ? "var(--green-500)" : active ? "var(--blue-600)" : "var(--gray-300)";
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        flex: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: done || active ? dot : "var(--surface-card)",
        border: done || active ? "none" : "2px solid var(--gray-300)",
        color: "#fff",
        font: "var(--fw-bold) 12px/1 var(--font-body)",
        boxShadow: active ? "0 0 0 4px var(--blue-50)" : "none"
      }
    }, done ? "✓" : ""), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 2,
        flex: 1,
        minHeight: 28,
        background: done ? "var(--green-300)" : "var(--gray-200)",
        marginTop: 2
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: last ? 0 : 18,
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: `${active ? "var(--fw-bold)" : "var(--fw-semibold)"} 14px/1.3 var(--font-body)`,
        color: done || active ? "var(--text-strong)" : "var(--text-subtle)"
      }
    }, st.label), st.time && /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--fw-regular) 12px/1.3 var(--font-body)",
        color: "var(--text-muted)",
        marginTop: 2
      }
    }, st.time)));
  }));
}
Object.assign(__ds_scope, { StatusTimeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatusTimeline.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mobile bottom navigation bar. Pass items with icon nodes.
 */
function BottomNav({
  items = [],
  activeKey,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "stretch",
      justifyContent: "space-around",
      height: "var(--bottomnav-h)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-nav)",
      ...style
    }
  }, rest), items.map(it => {
    const active = it.key === activeKey;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onChange && onChange(it.key),
      style: {
        flex: 1,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        color: active ? "var(--color-primary)" : "var(--text-subtle)",
        transition: "color var(--dur-fast)",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 24
      }
    }, it.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        font: `${active ? "var(--fw-bold)" : "var(--fw-medium)"} 11px/1 var(--font-body)`
      }
    }, it.label), it.badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 6,
        right: "50%",
        marginRight: -18,
        minWidth: 16,
        height: 16,
        padding: "0 4px",
        borderRadius: 8,
        background: "var(--status-danger)",
        color: "#fff",
        font: "var(--fw-bold) 10px/16px var(--font-body)",
        textAlign: "center"
      }
    }, it.badge) : null);
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mobile app top bar / header.
 */
function TopBar({
  title,
  subtitle,
  leading = null,
  trailing = null,
  variant = "default",
  style,
  ...rest
}) {
  const onBrand = variant === "brand";
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      minHeight: "var(--header-h)",
      padding: "0 16px",
      background: onBrand ? "transparent" : "var(--surface-card)",
      borderBottom: onBrand ? "none" : "1px solid var(--border-subtle)",
      color: onBrand ? "#fff" : "var(--text-strong)",
      ...style
    }
  }, rest), leading, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 17px/1.2 var(--font-display)",
      color: "inherit",
      letterSpacing: "-0.01em"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1.3 var(--font-body)",
      color: onBrand ? "rgba(255,255,255,.8)" : "var(--text-muted)",
      marginTop: 2
    }
  }, subtitle)), trailing);
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/admin-app.jsx
try { (() => {
/* PiatMove — Admin desktop · shell + dashboard home */
const AD = window.PiatBookingDesignSystem_2c1fe9;
function AdminHome() {
  const {
    StatCard,
    Badge,
    Avatar,
    Button
  } = AD;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Total Bookings",
    value: "1,284",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "ticket"
    }),
    tone: "primary",
    delta: "12%"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Active Trips",
    value: "38",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "navigation"
    }),
    tone: "success",
    delta: "5%"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Drivers Online",
    value: "12",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "users"
    }),
    tone: "info"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Vehicles Available",
    value: "9",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "truck"
    }),
    tone: "warning",
    deltaDir: "down",
    delta: "2"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Bookings This Week",
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "+12% vs last week")
  }, /*#__PURE__*/React.createElement(LineChart, {
    points: [42, 58, 49, 71, 64, 88, 76],
    height: 210
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 6,
      font: "var(--fw-semibold) 11px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(m => /*#__PURE__*/React.createElement("span", {
    key: m
  }, m)))), /*#__PURE__*/React.createElement(Panel, {
    title: "Trips by Vehicle"
  }, /*#__PURE__*/React.createElement(Donut, {
    segments: [{
      k: "HiAce Van",
      v: 142,
      color: "var(--blue-600)"
    }, {
      k: "Sedan",
      v: 98,
      color: "var(--green-500)"
    }, {
      k: "Coaster",
      v: 64,
      color: "var(--amber-500)"
    }, {
      k: "Ambulance",
      v: 38,
      color: "var(--cyan-500)"
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16
    }
  }, [["plus", "New Booking", "var(--blue-50)", "var(--blue-600)"], ["users", "Assign Driver", "var(--green-50)", "var(--green-600)"], ["truck", "Add Vehicle", "var(--amber-50)", "var(--amber-700)"], ["file-text", "Generate Report", "var(--cyan-50)", "var(--cyan-700)"]].map((q, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: "16px 18px",
      cursor: "pointer",
      boxShadow: "var(--shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: "var(--radius-sm)",
      background: q[2],
      color: q[3],
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: q[0],
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-semibold) 14px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, q[1])))), /*#__PURE__*/React.createElement(BookingManagement, null));
}
function AdminApp() {
  const {
    Avatar,
    Badge
  } = AD;
  const [route, setRoute] = React.useState("home");
  const nav = [{
    k: "home",
    label: "Dashboard",
    ic: "bar-chart"
  }, {
    k: "bookings",
    label: "Bookings",
    ic: "ticket"
  }, {
    k: "drivers",
    label: "Drivers",
    ic: "users"
  }, {
    k: "vehicles",
    label: "Vehicles",
    ic: "truck"
  }, {
    k: "reports",
    label: "Reports",
    ic: "file-text"
  }];
  const titles = {
    home: "Dashboard",
    bookings: "Booking Management",
    drivers: "Driver Management",
    vehicles: "Vehicle Management",
    reports: "Reports & Analytics"
  };
  let content;
  if (route === "bookings") content = /*#__PURE__*/React.createElement(BookingManagement, null);else if (route === "drivers") content = /*#__PURE__*/React.createElement(DriverManagement, null);else if (route === "vehicles") content = /*#__PURE__*/React.createElement(VehicleManagement, null);else if (route === "reports") content = /*#__PURE__*/React.createElement(Reports, null);else content = /*#__PURE__*/React.createElement(AdminHome, null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      height: 800,
      display: "flex",
      background: "var(--surface-app)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 244,
      background: "var(--surface-card)",
      borderRight: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px 18px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-full.svg",
    style: {
      width: 180
    },
    alt: "PiatMove"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 14px",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 10px/1 var(--font-body)",
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--text-subtle)",
      padding: "14px 12px 8px"
    }
  }, "Admin Portal"), nav.map(n => {
    const active = route === n.k;
    return /*#__PURE__*/React.createElement("button", {
      key: n.k,
      onClick: () => setRoute(n.k),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 12px",
        marginBottom: 2,
        border: "none",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        background: active ? "var(--blue-50)" : "transparent",
        color: active ? "var(--blue-700)" : "var(--text-body)",
        font: `${active ? "var(--fw-bold)" : "var(--fw-medium)"} 14px/1 var(--font-body)`
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.ic,
      size: 19,
      color: active ? "var(--blue-600)" : "var(--text-muted)"
    }), " ", n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px",
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Admin Office",
    size: 38
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 13px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "MTO Admin"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 11px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, "Transport Office")), /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 18,
    color: "var(--text-subtle)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 68,
      flex: "none",
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 20,
      fontWeight: 800
    }
  }, titles[route])), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      height: 40,
      padding: "0 14px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-sunken)",
      width: 280,
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 17
  }), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-regular) 13px/1 var(--font-body)"
    }
  }, "Search bookings, drivers\u2026")), /*#__PURE__*/React.createElement("button", {
    style: {
      position: "relative",
      width: 40,
      height: 40,
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-sunken)",
      border: "none",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 19,
    color: "var(--text-body)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 7,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--status-danger)",
      border: "2px solid var(--surface-card)"
    }
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: 28
    }
  }, content)));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(AdminApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/admin-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/admin-views.jsx
try { (() => {
/* PiatMove — Admin desktop · charts, helpers, secondary views */
const A = window.PiatBookingDesignSystem_2c1fe9;

/* ---------- chart helpers ---------- */
function BarChart({
  data,
  height = 180,
  color = "var(--blue-600)"
}) {
  const max = Math.max(...data.map(d => d.v));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      height,
      paddingTop: 10
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      height: "100%",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 38,
      height: `${d.v / max * 100}%`,
      background: i === data.length - 1 ? color : "var(--blue-200)",
      borderRadius: "6px 6px 0 0",
      transition: "height .4s var(--ease-standard)"
    },
    title: d.v
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-semibold) 11px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, d.k))));
}
function LineChart({
  points,
  height = 200
}) {
  const max = Math.max(...points) * 1.15,
    w = 520,
    h = height - 30;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - p / max * h]);
  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0].toFixed(1)} ${c[1].toFixed(1)}`).join(" ");
  const area = `${path} L${w} ${h} L0 ${h} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${height}`,
    style: {
      width: "100%",
      height
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "lcg",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "var(--blue-500)",
    stopOpacity: ".22"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "var(--blue-500)",
    stopOpacity: "0"
  }))), [0, 0.5, 1].map((g, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "0",
    x2: w,
    y1: h * g,
    y2: h * g,
    stroke: "var(--border-subtle)",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#lcg)"
  }), /*#__PURE__*/React.createElement("path", {
    d: path,
    fill: "none",
    stroke: "var(--blue-600)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), coords.map((c, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: c[0],
    cy: c[1],
    r: "4",
    fill: "#fff",
    stroke: "var(--blue-600)",
    strokeWidth: "2.5"
  })));
}
function Donut({
  segments,
  size = 150
}) {
  const total = segments.reduce((s, x) => s + x.v, 0);
  let acc = 0;
  const r = 56,
    c = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 150 150"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "75",
    cy: "75",
    r: r,
    fill: "none",
    stroke: "var(--surface-sunken)",
    strokeWidth: "20"
  }), segments.map((s, i) => {
    const len = s.v / total * c;
    const off = acc;
    acc += len;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: "75",
      cy: "75",
      r: r,
      fill: "none",
      stroke: s.color,
      strokeWidth: "20",
      strokeDasharray: `${len} ${c - len}`,
      strokeDashoffset: -off,
      transform: "rotate(-90 75 75)",
      strokeLinecap: "butt"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: "75",
    y: "70",
    textAnchor: "middle",
    style: {
      font: "var(--fw-extrabold) 26px var(--font-display)",
      fill: "var(--text-strong)"
    }
  }, total), /*#__PURE__*/React.createElement("text", {
    x: "75",
    y: "90",
    textAnchor: "middle",
    style: {
      font: "var(--fw-medium) 11px var(--font-body)",
      fill: "var(--text-muted)"
    }
  }, "total")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, segments.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: s.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-semibold) 13px/1 var(--font-body)",
      color: "var(--text-body)"
    }
  }, s.k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) 13px/1 var(--font-body)",
      color: "var(--text-strong)",
      marginLeft: 4
    }
  }, s.v)))));
}
function Panel({
  title,
  action,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      padding: 22,
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, title), action), children);
}
Object.assign(window, {
  BarChart,
  LineChart,
  Donut,
  Panel
});

/* ---------- Booking Management ---------- */
function BookingManagement() {
  const {
    Badge,
    Avatar
  } = A;
  const rows = [["BK-2041", "Maria Santos", "Tuguegarao City Hall", "HiAce Van", "Jun 24, 9:00 AM", "primary", "In Transit"], ["BK-2040", "Pedro Reyes", "Provincial Hospital", "Ambulance", "Jun 24, 8:00 AM", "warning", "Pending"], ["BK-2039", "Ana Lim", "Piat Basilica", "Coaster Bus", "Jun 23, 6:30 AM", "success", "Approved"], ["BK-2038", "Carlos Tan", "Sta. Teresita", "Sedan", "Jun 22, 2:00 PM", "success", "Completed"], ["BK-2037", "Liza Cruz", "Public Market", "Sedan", "Jun 22, 10:00 AM", "danger", "Cancelled"], ["BK-2036", "Mark Dizon", "Tuao Junction", "HiAce Van", "Jun 21, 7:00 AM", "success", "Completed"]];
  return /*#__PURE__*/React.createElement(Panel, {
    title: "All Bookings",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: chipBtn
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "filter",
      size: 15
    }), " Filter"), /*#__PURE__*/React.createElement("button", {
      style: {
        ...chipBtn,
        background: "var(--color-primary)",
        color: "#fff",
        border: "1px solid transparent"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 15,
      color: "#fff"
    }), " Export"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["Reference", "Passenger", "Destination", "Vehicle", "Schedule", "Status", ""].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: thStyle
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) 13px/1 var(--font-mono)",
      color: "var(--blue-600)"
    }
  }, r[0])), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: r[1],
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, r[1]))), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, r[2]), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, r[3]), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdStyle,
      color: "var(--text-muted)"
    }
  }, r[4]), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: r[5],
    dot: true
  }, r[6])), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-vertical",
    size: 18,
    color: "var(--text-subtle)"
  }))))))));
}

/* ---------- Driver Management ---------- */
function DriverManagement() {
  const {
    Card,
    Avatar,
    Badge
  } = A;
  const drivers = [{
    n: "Jose Cruz",
    id: "DRV-0142",
    v: "Toyota HiAce",
    r: 4.9,
    t: 312,
    st: "online"
  }, {
    n: "Ramon Bautista",
    id: "DRV-0138",
    v: "Coaster Bus",
    r: 4.8,
    t: 287,
    st: "online"
  }, {
    n: "Elena Marquez",
    id: "DRV-0151",
    v: "Sedan",
    r: 5.0,
    t: 198,
    st: "busy"
  }, {
    n: "Tomas Aquino",
    id: "DRV-0129",
    v: "Ambulance",
    r: 4.7,
    t: 421,
    st: "offline"
  }, {
    n: "Grace Villa",
    id: "DRV-0160",
    v: "HiAce Van",
    r: 4.9,
    t: 156,
    st: "online"
  }, {
    n: "Danilo Sy",
    id: "DRV-0144",
    v: "Sedan",
    r: 4.6,
    t: 233,
    st: "offline"
  }];
  const stTone = {
    online: "success",
    busy: "warning",
    offline: "neutral"
  };
  return /*#__PURE__*/React.createElement(Panel, {
    title: "Drivers",
    action: /*#__PURE__*/React.createElement("button", {
      style: {
        ...chipBtn,
        background: "var(--color-primary)",
        color: "#fff",
        border: "1px solid transparent"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15,
      color: "#fff"
    }), " Add Driver")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 16
    }
  }, drivers.map((d, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "md",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: d.n,
    size: 48,
    status: d.st
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 15px/1.1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, d.n), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-mono)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, d.id)), /*#__PURE__*/React.createElement(Badge, {
    tone: stTone[d.st],
    dot: true
  }, d.st)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 14,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, [["Vehicle", d.v], ["Rating", `★ ${d.r}`], ["Trips", d.t]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 11px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 13px/1 var(--font-body)",
      color: "var(--text-strong)",
      marginTop: 5
    }
  }, v))))))));
}

/* ---------- Vehicle Management ---------- */
function VehicleManagement() {
  const {
    Card,
    Badge
  } = A;
  const fleet = [{
    n: "Toyota HiAce",
    p: "ABC 1234",
    cap: "12",
    st: "In Use",
    tone: "primary",
    ic: "truck"
  }, {
    n: "Hyundai Coaster",
    p: "DEF 5678",
    cap: "28",
    st: "Available",
    tone: "success",
    ic: "truck"
  }, {
    n: "Toyota Vios",
    p: "GHI 9012",
    cap: "4",
    st: "Available",
    tone: "success",
    ic: "car"
  }, {
    n: "Ambulance Unit 1",
    p: "AMB 001",
    cap: "Medical",
    st: "Maintenance",
    tone: "warning",
    ic: "plus"
  }, {
    n: "Isuzu Crosswind",
    p: "JKL 3456",
    cap: "8",
    st: "Available",
    tone: "success",
    ic: "car"
  }, {
    n: "Toyota HiAce 2",
    p: "MNO 7890",
    cap: "12",
    st: "In Use",
    tone: "primary",
    ic: "truck"
  }];
  return /*#__PURE__*/React.createElement(Panel, {
    title: "Fleet Overview",
    action: /*#__PURE__*/React.createElement("button", {
      style: {
        ...chipBtn,
        background: "var(--color-primary)",
        color: "#fff",
        border: "1px solid transparent"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15,
      color: "#fff"
    }), " Add Vehicle")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 16
    }
  }, fleet.map((v, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "md",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: "var(--radius-md)",
      background: "var(--blue-50)",
      color: "var(--blue-600)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: v.ic,
    size: 26
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: v.tone,
    dot: true
  }, v.st)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 16px/1.1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, v.n), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      marginTop: 10,
      color: "var(--text-muted)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 600
    }
  }, v.p), /*#__PURE__*/React.createElement("span", null, "\xB7 ", v.cap, " seats"))))));
}

/* ---------- Reports ---------- */
function Reports() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Bookings \u2014 Last 6 Months",
    action: /*#__PURE__*/React.createElement("button", {
      style: {
        ...chipBtn,
        background: "var(--color-secondary)",
        color: "#fff",
        border: "1px solid transparent"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 15,
      color: "#fff"
    }), " Export PDF")
  }, /*#__PURE__*/React.createElement(LineChart, {
    points: [180, 240, 210, 320, 290, 384],
    height: 220
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 6,
      font: "var(--fw-semibold) 11px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(m => /*#__PURE__*/React.createElement("span", {
    key: m
  }, m)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Trips by Vehicle Type"
  }, /*#__PURE__*/React.createElement(Donut, {
    segments: [{
      k: "HiAce Van",
      v: 142,
      color: "var(--blue-600)"
    }, {
      k: "Sedan",
      v: 98,
      color: "var(--green-500)"
    }, {
      k: "Coaster",
      v: 64,
      color: "var(--amber-500)"
    }, {
      k: "Ambulance",
      v: 38,
      color: "var(--cyan-500)"
    }]
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Trips by Destination"
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: [{
      k: "Tugue.",
      v: 142
    }, {
      k: "Hospital",
      v: 96
    }, {
      k: "Market",
      v: 74
    }, {
      k: "Basilica",
      v: 120
    }, {
      k: "Tuao",
      v: 58
    }],
    height: 180
  }))));
}
const chipBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 38,
  padding: "0 14px",
  borderRadius: "var(--radius-sm)",
  background: "var(--surface-card)",
  border: "1px solid var(--border-subtle)",
  font: "var(--fw-semibold) 13px/1 var(--font-body)",
  color: "var(--text-body)",
  cursor: "pointer"
};
const thStyle = {
  textAlign: "left",
  padding: "0 14px 12px",
  font: "var(--fw-bold) 11px/1 var(--font-body)",
  letterSpacing: ".06em",
  textTransform: "uppercase",
  color: "var(--text-subtle)"
};
const tdStyle = {
  padding: "14px",
  font: "var(--fw-medium) 13px/1.3 var(--font-body)",
  color: "var(--text-body)"
};
Object.assign(window, {
  BookingManagement,
  DriverManagement,
  VehicleManagement,
  Reports,
  chipBtn
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/admin-views.jsx", error: String((e && e.message) || e) }); }

// ui_kits/driver/driver-app.jsx
try { (() => {
/* PiatMove — Driver app · all screens + shell */
const D = window.PiatBookingDesignSystem_2c1fe9;
function DScroll({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      ...style
    }
  }, children);
}
function DEye({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 11px/1 var(--font-body)",
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--text-subtle)",
      ...style
    }
  }, children);
}
function DTile({
  name,
  bg,
  fg,
  size = 40,
  r = "var(--radius-sm)"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: r,
      background: bg,
      color: fg,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: size * 0.5
  }));
}
function DMap({
  height = 150
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "linear-gradient(135deg,#E8EEF6,#DCE7F2)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "linear-gradient(var(--gray-200) 1px,transparent 1px),linear-gradient(90deg,var(--gray-200) 1px,transparent 1px)",
      backgroundSize: "26px 26px",
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 150",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40 120 C100 100 130 70 180 64 C230 58 255 40 285 26",
    stroke: "var(--blue-500)",
    strokeWidth: "4",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: "1 11"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "40",
    cy: "120",
    r: "8",
    fill: "var(--green-500)",
    stroke: "#fff",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "285",
    cy: "26",
    r: "8",
    fill: "var(--blue-600)",
    stroke: "#fff",
    strokeWidth: "3"
  })));
}

/* ---------- Driver Login ---------- */
function DriverLogin({
  onLogin
}) {
  const {
    Button,
    Input
  } = D;
  return /*#__PURE__*/React.createElement(DScroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gradient-hero)",
      padding: "30px 24px 34px",
      borderRadius: "0 0 26px 26px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-white.svg",
    width: "190",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      background: "rgba(255,255,255,.18)",
      font: "var(--fw-bold) 11px/1 var(--font-body)",
      letterSpacing: ".06em"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "car",
    size: 14,
    color: "#fff"
  }), " DRIVER PORTAL"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 25,
      fontWeight: 800,
      color: "#fff",
      marginTop: 16
    }
  }, "Driver Sign In"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,.82)",
      fontSize: 14,
      marginTop: 6
    }
  }, "Municipal Transport Office \xB7 Piat, Cagayan")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Employee / Driver ID",
    defaultValue: "DRV-0142",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    defaultValue: "passw0rd",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 18
    }),
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    onClick: onLogin,
    style: {
      marginTop: 4
    }
  }, "Log In"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-subtle)",
      fontSize: 13,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 16
  }), " Authorized municipal drivers only")));
}

/* ---------- Driver Dashboard ---------- */
function DriverDashboard({
  onAssignment,
  online,
  setOnline
}) {
  const {
    Card,
    Avatar,
    Badge,
    StatCard
  } = D;
  return /*#__PURE__*/React.createElement(DScroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gradient-hero)",
      padding: "12px 20px 56px",
      borderRadius: "0 0 26px 26px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Jose Cruz",
    size: 46,
    status: online ? "online" : "offline"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "rgba(255,255,255,.8)"
    }
  }, "Welcome back,"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 17px/1.2 var(--font-display)",
      color: "#fff",
      marginTop: 3
    }
  }, "Jose Cruz")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnline(!online),
    style: {
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "7px 12px",
      borderRadius: "var(--radius-pill)",
      background: online ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.18)",
      color: online ? "var(--green-600)" : "#fff",
      font: "var(--fw-bold) 12px/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: online ? "var(--green-500)" : "rgba(255,255,255,.7)"
    }
  }), " ", online ? "Online" : "Offline"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      marginTop: -40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Today's Trips",
    value: "4",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "navigation"
    }),
    tone: "primary"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Assigned",
    value: "2",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "ticket"
    }),
    tone: "warning"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Completed",
    value: "312",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle"
    }),
    tone: "success",
    delta: "8"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Rating",
    value: "4.9",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "star"
    }),
    tone: "info"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "New Assignment"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    dot: true
  }, "Action needed")), /*#__PURE__*/React.createElement(Card, {
    elevation: "md",
    interactive: true,
    onClick: onAssignment,
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maria Santos",
    size: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 15px/1.1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Maria Santos"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Ref BK-2041 \xB7 Jun 24, 9:00 AM")), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary"
  }, "HiAce")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "var(--green-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      flex: 1,
      minHeight: 20,
      background: "var(--gray-200)",
      margin: "3px 0"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: "var(--blue-600)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 13px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Municipal Hall, Piat"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 13px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      marginTop: 18
    }
  }, "Tuguegarao City Hall"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 24px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      marginBottom: 12
    }
  }, "Today's Trips"), [{
    t: "08:00",
    dest: "Provincial Hospital",
    st: "Completed",
    tone: "success"
  }, {
    t: "11:30",
    dest: "Piat Public Market",
    st: "Completed",
    tone: "success"
  }, {
    t: "14:00",
    dest: "Sta. Teresita",
    st: "Upcoming",
    tone: "neutral"
  }].map((r, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "sm",
    style: {
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 13px/1 var(--font-mono)",
      color: "var(--text-strong)",
      width: 46
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      alignSelf: "stretch",
      background: "var(--border-subtle)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      font: "var(--fw-semibold) 14px/1.2 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, r.dest), /*#__PURE__*/React.createElement(Badge, {
    tone: r.tone
  }, r.st)))));
}

/* ---------- Trip Assignment ---------- */
function TripAssignment({
  onBack,
  onAccept
}) {
  const {
    Button,
    IconButton,
    Card,
    Avatar,
    Badge
  } = D;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(D.TopBar, {
    title: "Trip Assignment",
    leading: /*#__PURE__*/React.createElement(IconButton, {
      label: "Back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 20
    }))
  }), /*#__PURE__*/React.createElement(DScroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 18px/1 var(--font-mono)",
      color: "var(--text-strong)"
    }
  }, "BK-2041"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    dot: true
  }, "Awaiting response")), /*#__PURE__*/React.createElement(DMap, {
    height: 150
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(DEye, {
    style: {
      marginBottom: 12
    }
  }, "Passenger"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maria Santos",
    size: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 15px/1.1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Maria Santos"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Verified Resident \xB7 0917 555 0142")), /*#__PURE__*/React.createElement(IconButton, {
    variant: "primary",
    label: "Call"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 20,
    color: "#fff"
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(DEye, {
    style: {
      marginBottom: 12
    }
  }, "Trip Route"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "var(--green-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      flex: 1,
      minHeight: 26,
      background: "var(--gray-200)",
      margin: "4px 0"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 2,
      background: "var(--blue-600)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "Pickup"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 14px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      marginTop: 3
    }
  }, "Municipal Hall, Piat"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 16
    }
  }, "Destination"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 14px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      marginTop: 3
    }
  }, "Tuguegarao City Hall")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 16px/1 var(--font-display)",
      color: "var(--blue-600)"
    }
  }, "62 km"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 11px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "~1h 20m"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      gap: 8,
      alignItems: "center",
      color: "var(--text-muted)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 16
  }), " Purpose: Hospital check-up")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px calc(12px + env(safe-area-inset-bottom,0))",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-card)",
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    onClick: onBack,
    style: {
      flex: 1,
      color: "var(--status-danger)",
      borderColor: "var(--border-subtle)"
    }
  }, "Decline"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: onAccept,
    style: {
      flex: 2
    },
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 18,
      color: "#fff"
    })
  }, "Accept Trip")));
}

/* ---------- Active Trip ---------- */
function ActiveTrip({
  onBack,
  onComplete
}) {
  const {
    Button,
    IconButton,
    Card,
    Avatar,
    StatusTimeline
  } = D;
  const stages = ["Arrived at Pickup", "Picked Up Passenger", "In Transit", "Completed"];
  const [step, setStep] = React.useState(0);
  const advance = () => {
    if (step >= stages.length - 1) {
      onComplete();
    } else setStep(step + 1);
  };
  const steps = stages.map((label, i) => ({
    label,
    time: i < step ? "Done" : i === step ? "Now" : undefined,
    state: i < step ? "done" : i === step ? "active" : "pending"
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(D.TopBar, {
    title: "Active Trip",
    subtitle: "BK-2041 \xB7 Maria Santos",
    leading: /*#__PURE__*/React.createElement(IconButton, {
      label: "Back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 20
    }))
  }), /*#__PURE__*/React.createElement(DScroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DMap, {
    height: 180
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maria Santos",
    size: 46
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 15px/1.1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Maria Santos"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, "Tuguegarao City Hall")), /*#__PURE__*/React.createElement(IconButton, {
    variant: "outline",
    label: "Message"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 20,
    color: "var(--blue-600)"
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "primary",
    label: "Call"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 20,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(DEye, {
    style: {
      marginBottom: 14
    }
  }, "Trip Progress"), /*#__PURE__*/React.createElement(StatusTimeline, {
    steps: steps
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px calc(12px + env(safe-area-inset-bottom,0))",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: step >= stages.length - 1 ? "secondary" : "primary",
    size: "lg",
    block: true,
    onClick: advance,
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18,
      color: "#fff"
    })
  }, step >= stages.length - 1 ? "Complete Trip" : `Mark: ${stages[step + 1]}`)));
}

/* ---------- Driver Schedule ---------- */
function DriverSchedule() {
  const {
    Card,
    Badge
  } = D;
  const days = Array.from({
    length: 30
  }, (_, i) => i + 1);
  const trips = {
    24: 2,
    25: 1,
    26: 3,
    28: 1
  };
  const [sel, setSel] = React.useState(24);
  return /*#__PURE__*/React.createElement(DScroll, null, /*#__PURE__*/React.createElement(D.TopBar, {
    title: "My Schedule"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 24px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 16px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "June 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--surface-sunken)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--surface-sunken)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 4,
      marginBottom: 6
    }
  }, ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: "center",
      font: "var(--fw-bold) 11px/1 var(--font-body)",
      color: "var(--text-subtle)",
      padding: "4px 0"
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 4
    }
  }, Array.from({
    length: 0
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: "e" + i
  })), days.map(d => {
    const active = sel === d;
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      onClick: () => setSel(d),
      style: {
        aspectRatio: "1",
        border: "none",
        cursor: "pointer",
        borderRadius: "var(--radius-sm)",
        background: active ? "var(--color-primary)" : "transparent",
        color: active ? "#fff" : "var(--text-body)",
        font: "var(--fw-semibold) 13px/1 var(--font-body)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        position: "relative"
      }
    }, d, trips[d] && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: active ? "#fff" : "var(--green-500)"
      }
    }));
  }))), /*#__PURE__*/React.createElement(DEye, {
    style: {
      marginBottom: 12
    }
  }, "Trips on June ", sel), (trips[sel] ? [{
    t: "09:00",
    dest: "Tuguegarao City Hall",
    p: "Maria Santos",
    tone: "primary",
    st: "Confirmed"
  }, {
    t: "14:00",
    dest: "Provincial Hospital",
    p: "Pedro Reyes",
    tone: "warning",
    st: "Pending"
  }].slice(0, trips[sel]) : []).map((r, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "sm",
    style: {
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 13px/1 var(--font-mono)",
      color: "var(--blue-600)",
      width: 46
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 14px/1.2 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, r.dest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, r.p)), /*#__PURE__*/React.createElement(Badge, {
    tone: r.tone
  }, r.st))), !trips[sel] && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: "var(--text-subtle)",
      fontSize: 14,
      padding: "30px 0"
    }
  }, "No trips scheduled")));
}

/* ---------- Driver Profile ---------- */
function DriverProfile({
  onLogout
}) {
  const {
    Card,
    Avatar,
    Button,
    Badge
  } = D;
  return /*#__PURE__*/React.createElement(DScroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gradient-hero)",
      padding: "12px 20px 28px",
      borderRadius: "0 0 26px 26px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Jose Cruz",
    size: 82,
    status: "online"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 20px/1.1 var(--font-display)",
      color: "#fff"
    }
  }, "Jose Cruz"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 13px/1 var(--font-body)",
      color: "rgba(255,255,255,.8)",
      marginTop: 5
    }
  }, "Driver ID \xB7 DRV-0142")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      background: "rgba(255,255,255,.18)",
      color: "#fff",
      font: "var(--fw-semibold) 12px/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 14,
    color: "#fff"
  }), " 4.9 Rating"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      background: "rgba(255,255,255,.18)",
      color: "#fff",
      font: "var(--fw-semibold) 12px/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 14,
    color: "#fff"
  }), " 312 Trips"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 28px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(DEye, {
    style: {
      marginBottom: 12
    }
  }, "Assigned Vehicle"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DTile, {
    name: "truck",
    bg: "var(--blue-50)",
    fg: "var(--blue-600)",
    size: 48,
    r: "var(--radius-md)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 15px/1.1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Toyota HiAce"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Plate ABC 1234 \xB7 12 seats \xB7 White")), /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "Active"))), /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      marginBottom: 16
    }
  }, [{
    ic: "user",
    t: "Edit Profile"
  }, {
    ic: "lock",
    t: "Change Password"
  }, {
    ic: "file-text",
    t: "Trip History"
  }, {
    ic: "settings",
    t: "Settings"
  }].map((m, i, a) => /*#__PURE__*/React.createElement("div", {
    key: m.t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 0",
      borderBottom: i < a.length - 1 ? "1px solid var(--border-subtle)" : "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(DTile, {
    name: m.ic,
    bg: "var(--surface-sunken)",
    fg: "var(--text-body)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "var(--fw-semibold) 14px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, m.t), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-subtle)"
  })))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    onClick: onLogout,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "log-out",
      size: 18,
      color: "var(--status-danger)"
    }),
    style: {
      color: "var(--status-danger)",
      borderColor: "var(--border-subtle)"
    }
  }, "Log Out")));
}

/* ---------- shell ---------- */
function DriverApp() {
  const {
    BottomNav
  } = D;
  const [screen, setScreen] = React.useState("login");
  const [tab, setTab] = React.useState("home");
  const [online, setOnline] = React.useState(true);
  let body,
    showNav = false;
  if (screen === "login") body = /*#__PURE__*/React.createElement(DriverLogin, {
    onLogin: () => setScreen("app")
  });else if (screen === "assignment") body = /*#__PURE__*/React.createElement(TripAssignment, {
    onBack: () => setScreen("app"),
    onAccept: () => setScreen("active")
  });else if (screen === "active") body = /*#__PURE__*/React.createElement(ActiveTrip, {
    onBack: () => setScreen("app"),
    onComplete: () => {
      setTab("home");
      setScreen("app");
    }
  });else {
    showNav = true;
    if (tab === "schedule") body = /*#__PURE__*/React.createElement(DriverSchedule, null);else if (tab === "trips") body = /*#__PURE__*/React.createElement(TripAssignment, {
      onBack: () => setTab("home"),
      onAccept: () => setScreen("active")
    });else if (tab === "profile") body = /*#__PURE__*/React.createElement(DriverProfile, {
      onLogout: () => {
        setScreen("login");
        setTab("home");
      }
    });else body = /*#__PURE__*/React.createElement(DriverDashboard, {
      onAssignment: () => setScreen("assignment"),
      online: online,
      setOnline: setOnline
    });
  }
  const navItems = [{
    key: "home",
    label: "Home",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "home",
      size: 22
    })
  }, {
    key: "schedule",
    label: "Schedule",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 22
    })
  }, {
    key: "trips",
    label: "Trips",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "navigation",
      size: 22
    }),
    badge: 2
  }, {
    key: "profile",
    label: "Profile",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 22
    })
  }];
  return /*#__PURE__*/React.createElement(PhoneFrame, {
    statusBar: true
  }, body, showNav && /*#__PURE__*/React.createElement(BottomNav, {
    items: navItems,
    activeKey: tab,
    onChange: setTab
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(DriverApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/driver/driver-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/passenger/passenger-app.jsx
try { (() => {
/* PiatMove — Passenger app · main screens + app shell */
const P = window.PiatBookingDesignSystem_2c1fe9;

/* ---------- Dashboard ---------- */
function Dashboard({
  go
}) {
  const {
    Card,
    Badge,
    Avatar,
    IconButton,
    StatusTimeline
  } = P;
  const actions = [{
    name: "car",
    label: "Book Vehicle",
    to: "book",
    tone: ["var(--blue-50)", "var(--blue-600)"]
  }, {
    name: "ticket",
    label: "My Bookings",
    to: "details",
    tone: ["var(--green-50)", "var(--green-600)"]
  }, {
    name: "bell",
    label: "Notifications",
    to: "alerts",
    tone: ["var(--amber-50)", "var(--amber-700)"]
  }, {
    name: "user",
    label: "Profile",
    to: "profile",
    tone: ["var(--cyan-50)", "var(--cyan-700)"]
  }];
  return /*#__PURE__*/React.createElement(Scroll, {
    style: {
      background: "var(--surface-app)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gradient-hero)",
      padding: "10px 20px 64px",
      borderRadius: "0 0 26px 26px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maria Santos",
    size: 44,
    status: "online"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "rgba(255,255,255,.8)"
    }
  }, "Good morning,"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 17px/1.2 var(--font-display)",
      color: "#fff",
      marginTop: 3
    }
  }, "Maria Santos")), /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    label: "Notifications",
    onClick: () => go("alerts"),
    style: {
      background: "rgba(255,255,255,.15)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 20,
    color: "#fff"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      marginTop: -44
    }
  }, /*#__PURE__*/React.createElement(Card, {
    elevation: "md",
    interactive: true,
    onClick: () => go("details"),
    padding: "none",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Active Booking"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 16px/1.2 var(--font-display)",
      color: "var(--text-strong)",
      marginTop: 6
    }
  }, "Tuguegarao City Hall"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) 12px/1 var(--font-mono)",
      color: "var(--text-muted)",
      marginTop: 5
    }
  }, "Ref: BK-2041")), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    dot: true
  }, "In Transit")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 18px 16px"
    }
  }, /*#__PURE__*/React.createElement(MapStrip, {
    height: 120
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 18px",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Jose Cruz",
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 13px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Jose Cruz \xB7 arriving 8 min"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, "Toyota HiAce \xB7 ABC 1234")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-subtle)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 10
    }
  }, actions.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.label,
    onClick: () => go(a.to),
    style: {
      border: "none",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-md)",
      padding: "14px 6px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      boxShadow: "var(--shadow-xs)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    name: a.name,
    bg: a.tone[0],
    fg: a.tone[1],
    size: 42,
    r: "var(--radius-md)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-semibold) 11px/1.2 var(--font-body)",
      color: "var(--text-body)",
      textAlign: "center"
    }
  }, a.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "Upcoming Trips"), /*#__PURE__*/React.createElement("a", {
    style: {
      font: "var(--fw-semibold) 13px/1 var(--font-body)",
      color: "var(--text-link)"
    }
  }, "See all")), [{
    dest: "Provincial Hospital",
    date: "Jun 24 · 9:00 AM",
    tone: "warning",
    st: "Pending",
    v: "Ambulance"
  }, {
    dest: "Piat Basilica",
    date: "Jun 28 · 6:30 AM",
    tone: "success",
    st: "Approved",
    v: "Coaster Bus"
  }].map((t, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "sm",
    style: {
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    name: "calendar",
    bg: "var(--blue-50)",
    fg: "var(--blue-600)",
    size: 42
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 14px/1.2 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, t.dest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, t.date, " \xB7 ", t.v)), /*#__PURE__*/React.createElement(Badge, {
    tone: t.tone
  }, t.st)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 20px 24px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Recent Activity"), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, [{
    ic: "check-circle",
    bg: "var(--green-50)",
    fg: "var(--green-600)",
    t: "Trip completed",
    s: "Piat → Tuguegarao",
    m: "Jun 18"
  }, {
    ic: "user",
    bg: "var(--blue-50)",
    fg: "var(--blue-600)",
    t: "Driver assigned",
    s: "Jose Cruz · HiAce",
    m: "Jun 18"
  }, {
    ic: "x",
    bg: "var(--red-50)",
    fg: "var(--red-500)",
    t: "Booking cancelled",
    s: "Schedule conflict",
    m: "Jun 12"
  }].map((r, i, arr) => /*#__PURE__*/React.createElement(P.ListItem, {
    key: i,
    divider: i < arr.length - 1,
    leading: /*#__PURE__*/React.createElement(IconTile, {
      name: r.ic,
      bg: r.bg,
      fg: r.fg
    }),
    title: r.t,
    subtitle: r.s,
    meta: r.m
  })))));
}

/* ---------- Book Vehicle ---------- */
function BookVehicle({
  onBack,
  onSubmit
}) {
  const {
    Button,
    Input,
    Chip,
    IconButton,
    Card
  } = P;
  const [veh, setVeh] = React.useState("hiace");
  const vehicles = [{
    k: "sedan",
    label: "Sedan",
    ic: "car",
    seats: "4 seats"
  }, {
    k: "hiace",
    label: "HiAce Van",
    ic: "truck",
    seats: "12 seats"
  }, {
    k: "coaster",
    label: "Coaster Bus",
    ic: "truck",
    seats: "28 seats"
  }, {
    k: "amb",
    label: "Ambulance",
    ic: "plus",
    seats: "Medical"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(P.TopBar, {
    title: "Book Vehicle",
    leading: /*#__PURE__*/React.createElement(IconButton, {
      label: "Back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 20
    }))
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: "var(--green-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      flex: 1,
      background: "var(--gray-200)",
      margin: "4px 0"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 3,
      background: "var(--blue-600)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Pickup Location",
    defaultValue: "Municipal Hall, Piat",
    placeholder: "Where from?"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Destination",
    placeholder: "Where to?",
    defaultValue: "Tuguegarao City Hall"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Date",
    defaultValue: "Jun 24, 2026",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 18
    }),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Time",
    defaultValue: "9:00 AM",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 18
    }),
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Purpose of Travel",
    placeholder: "e.g. Medical appointment, official business",
    defaultValue: "Hospital check-up",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "file-text",
      size: 18
    })
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 13px/1.2 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 10
    }
  }, "Vehicle Type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, vehicles.map(v => /*#__PURE__*/React.createElement("button", {
    key: v.k,
    onClick: () => setVeh(v.k),
    style: {
      textAlign: "left",
      cursor: "pointer",
      background: veh === v.k ? "var(--blue-50)" : "var(--surface-card)",
      border: veh === v.k ? "1.5px solid var(--blue-500)" : "1.5px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: "12px 14px",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    name: v.ic,
    bg: veh === v.k ? "var(--blue-600)" : "var(--surface-sunken)",
    fg: veh === v.k ? "#fff" : "var(--text-muted)",
    size: 36
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 13px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, v.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 11px/1 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, v.seats)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px calc(12px + env(safe-area-inset-bottom,0))",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    onClick: onSubmit,
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18,
      color: "#fff"
    })
  }, "Book Now")));
}

/* ---------- Booking Details ---------- */
function BookingDetails({
  onBack
}) {
  const {
    Badge,
    Avatar,
    IconButton,
    Card,
    StatusTimeline,
    Button
  } = P;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(P.TopBar, {
    title: "Booking Details",
    leading: /*#__PURE__*/React.createElement(IconButton, {
      label: "Back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 20
    })),
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      label: "More"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "more-vertical",
      size: 20
    }))
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Reference No."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 20px/1 var(--font-mono)",
      color: "var(--text-strong)",
      marginTop: 6
    }
  }, "BK-2041")), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    dot: true,
    size: "md"
  }, "In Transit")), /*#__PURE__*/React.createElement(MapStrip, {
    height: 160
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 12
    }
  }, "Driver Information"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Jose Cruz",
    size: 52,
    status: "online"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 16px/1.1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Jose Cruz"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      marginTop: 4,
      color: "var(--text-muted)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 14,
    color: "var(--amber-500)"
  }), " 4.9 \xB7 320 trips")), /*#__PURE__*/React.createElement(IconButton, {
    variant: "outline",
    label: "Message"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 20,
    color: "var(--blue-600)"
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "primary",
    label: "Call"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 20,
    color: "#fff"
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 12
    }
  }, "Vehicle Information"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, [["Type", "Toyota HiAce"], ["Plate No.", "ABC 1234"], ["Color", "White"], ["Capacity", "12 seats"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 14px/1.2 var(--font-body)",
      color: "var(--text-strong)",
      marginTop: 5
    }
  }, v))))), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, "Booking Status"), /*#__PURE__*/React.createElement(StatusTimeline, {
    steps: [{
      label: "Booking Approved",
      time: "Today · 8:02 AM",
      state: "done"
    }, {
      label: "Driver Assigned — Jose Cruz",
      time: "8:10 AM",
      state: "done"
    }, {
      label: "In Transit to Tuguegarao",
      time: "Now · ETA 8 min",
      state: "active"
    }, {
      label: "Trip Completed",
      state: "pending"
    }]
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    style: {
      color: "var(--status-danger)",
      borderColor: "var(--red-200,#FECDCA)"
    }
  }, "Cancel Booking"))));
}

/* ---------- Notifications ---------- */
function Notifications({
  onBack
}) {
  const {
    IconButton,
    Card
  } = P;
  const groups = [{
    label: "Today",
    items: [{
      ic: "check-circle",
      bg: "var(--green-50)",
      fg: "var(--green-600)",
      t: "Booking Approved",
      s: "BK-2041 to Tuguegarao is confirmed",
      m: "8:02 AM",
      unread: true
    }, {
      ic: "user",
      bg: "var(--blue-50)",
      fg: "var(--blue-600)",
      t: "Driver Assigned",
      s: "Jose Cruz will pick you up · HiAce ABC 1234",
      m: "8:10 AM",
      unread: true
    }]
  }, {
    label: "Earlier",
    items: [{
      ic: "flag",
      bg: "var(--amber-50)",
      fg: "var(--amber-700)",
      t: "Trip Completed",
      s: "Rate your trip to Piat Basilica",
      m: "Jun 18"
    }, {
      ic: "bell",
      bg: "var(--cyan-50)",
      fg: "var(--cyan-700)",
      t: "Service Advisory",
      s: "Holiday schedule for Piat Fiesta announced",
      m: "Jun 15"
    }]
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(P.TopBar, {
    title: "Notifications",
    leading: /*#__PURE__*/React.createElement(IconButton, {
      label: "Back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 20
    })),
    trailing: /*#__PURE__*/React.createElement("a", {
      style: {
        font: "var(--fw-semibold) 13px/1 var(--font-body)",
        color: "var(--text-link)",
        cursor: "pointer"
      }
    }, "Mark all read")
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 28px"
    }
  }, groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.label,
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 10
    }
  }, g.label), /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, g.items.map((r, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: "12px 0",
      borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    name: r.ic,
    bg: r.bg,
    fg: r.fg
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-semibold) 14px/1.2 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, r.t), r.unread && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--color-primary)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 13px/1.4 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, r.s)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-medium) 11px/1 var(--font-body)",
      color: "var(--text-subtle)",
      whiteSpace: "nowrap"
    }
  }, r.m)))))))));
}

/* ---------- Profile ---------- */
function Profile({
  onLogout
}) {
  const {
    Card,
    Avatar,
    Button
  } = P;
  const menu = [{
    ic: "edit",
    t: "Edit Profile"
  }, {
    ic: "lock",
    t: "Change Password"
  }, {
    ic: "credit-card",
    t: "Payment & Receipts"
  }, {
    ic: "settings",
    t: "Settings"
  }, {
    ic: "info",
    t: "Help & Support"
  }];
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gradient-hero)",
      padding: "12px 20px 28px",
      borderRadius: "0 0 26px 26px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maria Santos",
    size: 82
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 20px/1.1 var(--font-display)",
      color: "#fff"
    }
  }, "Maria Santos"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 13px/1 var(--font-body)",
      color: "rgba(255,255,255,.8)",
      marginTop: 5
    }
  }, "maria.santos@email.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      background: "rgba(255,255,255,.18)",
      color: "#fff",
      font: "var(--fw-semibold) 12px/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 14,
    color: "#fff"
  }), " Verified Resident")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 28px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 12
    }
  }, "Personal Information"), [["Contact", "0917 555 0142"], ["Address", "Brgy. Centro, Piat, Cagayan"], ["Member since", "March 2024"]].map(([k, v], i, a) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: i < a.length - 1 ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-regular) 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-semibold) 13px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, v)))), /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      marginBottom: 16
    }
  }, menu.map((m, i, a) => /*#__PURE__*/React.createElement("div", {
    key: m.t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 0",
      borderBottom: i < a.length - 1 ? "1px solid var(--border-subtle)" : "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    name: m.ic,
    bg: "var(--surface-sunken)",
    fg: "var(--text-body)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "var(--fw-semibold) 14px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, m.t), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-subtle)"
  })))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    onClick: onLogout,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "log-out",
      size: 18,
      color: "var(--status-danger)"
    }),
    style: {
      color: "var(--status-danger)",
      borderColor: "var(--border-subtle)"
    }
  }, "Log Out")));
}

/* ---------- App shell ---------- */
function PassengerApp() {
  const {
    BottomNav
  } = P;
  const [screen, setScreen] = React.useState("splash"); // splash|login|register|app
  const [tab, setTab] = React.useState("home");
  const go = t => {
    if (t === "book") setScreen("book");else if (t === "details") setScreen("details");else if (t === "alerts") setScreen("alerts");else if (t === "profile") {
      setTab("profile");
      setScreen("app");
    } else {
      setTab(t);
      setScreen("app");
    }
  };
  let body,
    showNav = false,
    dark = false;
  if (screen === "splash") {
    body = /*#__PURE__*/React.createElement(SplashScreen, {
      onDone: () => setScreen("login")
    });
    dark = true;
  } else if (screen === "login") body = /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: () => setScreen("app"),
    onRegister: () => setScreen("register")
  });else if (screen === "register") body = /*#__PURE__*/React.createElement(RegisterScreen, {
    onBack: () => setScreen("login"),
    onDone: () => setScreen("app")
  });else if (screen === "book") body = /*#__PURE__*/React.createElement(BookVehicle, {
    onBack: () => setScreen("app"),
    onSubmit: () => setScreen("details")
  });else if (screen === "details") body = /*#__PURE__*/React.createElement(BookingDetails, {
    onBack: () => setScreen("app")
  });else if (screen === "alerts") body = /*#__PURE__*/React.createElement(Notifications, {
    onBack: () => setScreen("app")
  });else {
    showNav = true;
    if (tab === "profile") body = /*#__PURE__*/React.createElement(Profile, {
      onLogout: () => {
        setScreen("login");
        setTab("home");
      }
    });else if (tab === "bookings") body = /*#__PURE__*/React.createElement(BookingDetails, {
      onBack: () => setTab("home")
    });else if (tab === "alerts") body = /*#__PURE__*/React.createElement(Notifications, {
      onBack: () => setTab("home")
    });else body = /*#__PURE__*/React.createElement(Dashboard, {
      go: go
    });
  }
  const navItems = [{
    key: "home",
    label: "Home",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "home",
      size: 22
    })
  }, {
    key: "bookings",
    label: "Bookings",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "ticket",
      size: 22
    }),
    badge: 1
  }, {
    key: "book",
    label: "Book",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 22
    })
  }, {
    key: "alerts",
    label: "Alerts",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 22
    }),
    badge: 2
  }, {
    key: "profile",
    label: "Profile",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 22
    })
  }];
  return /*#__PURE__*/React.createElement(PhoneFrame, {
    dark: dark,
    statusBar: screen !== "splash"
  }, body, showNav && /*#__PURE__*/React.createElement(BottomNav, {
    items: navItems,
    activeKey: tab === "profile" ? "profile" : tab,
    onChange: k => {
      if (k === "book") setScreen("book");else {
        setTab(k);
        setScreen("app");
      }
    }
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(PassengerApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/passenger/passenger-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/passenger/passenger-auth.jsx
try { (() => {
/* PiatMove — Passenger app · auth & shared screen helpers */
const PNS = window.PiatBookingDesignSystem_2c1fe9;

/* ---------- small shared helpers ---------- */
function Eyebrow({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 11px/1 var(--font-body)",
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--text-subtle)",
      ...style
    }
  }, children);
}
function Scroll({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      ...style
    }
  }, children);
}
function IconTile({
  name,
  bg,
  fg,
  size = 40,
  r = "var(--radius-sm)"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: r,
      background: bg,
      color: fg,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: size * 0.5
  }));
}
function MapStrip({
  height = 150
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "linear-gradient(135deg,#E8EEF6 0%,#DCE7F2 100%)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "linear-gradient(var(--gray-200) 1px,transparent 1px),linear-gradient(90deg,var(--gray-200) 1px,transparent 1px)",
      backgroundSize: "26px 26px",
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 150",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M48 118 C90 90 120 96 165 70 C205 47 240 52 280 30",
    stroke: "var(--blue-500)",
    strokeWidth: "4",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: "1 11"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "48",
    cy: "118",
    r: "8",
    fill: "var(--green-500)",
    stroke: "#fff",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "280",
    cy: "30",
    r: "8",
    fill: "var(--blue-600)",
    stroke: "#fff",
    strokeWidth: "3"
  })));
}
Object.assign(window, {
  Eyebrow,
  Scroll,
  IconTile,
  MapStrip
});

/* ---------- Splash ---------- */
function SplashScreen({
  onDone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "var(--gradient-hero)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 22,
      position: "relative"
    },
    onClick: onDone
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-white.svg",
    alt: "PiatMove",
    style: {
      width: 230
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pm-dots",
    style: {
      display: "flex",
      gap: 8
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: "rgba(255,255,255,.85)",
      animation: `pmPulse 1.1s ${i * .18}s infinite ease-in-out`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) 12px/1 var(--font-body)",
      color: "rgba(255,255,255,.7)",
      letterSpacing: ".06em"
    }
  }, "OFFICIAL TRANSPORT SERVICE \xB7 PIAT, CAGAYAN")), /*#__PURE__*/React.createElement("style", null, `@keyframes pmPulse{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}`));
}

/* ---------- Login ---------- */
function LoginScreen({
  onLogin,
  onRegister
}) {
  const {
    Button,
    Input
  } = PNS;
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 24px 32px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "58",
    height: "58",
    alt: ""
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 27,
      fontWeight: 800,
      marginTop: 22,
      color: "var(--text-strong)"
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      color: "var(--text-muted)",
      fontSize: 15
    }
  }, "Sign in to book municipal vehicles and track your trips."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Mobile Number",
    placeholder: "0917 123 4567",
    defaultValue: "0917 555 0142",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    defaultValue: "passw0rd",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 18
    }),
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      size: 18
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      marginTop: -4
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      font: "var(--fw-semibold) 13px/1 var(--font-body)",
      color: "var(--text-link)",
      textDecoration: "none"
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    onClick: onLogin,
    style: {
      marginTop: 4
    }
  }, "Log In")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 24,
      fontSize: 14,
      color: "var(--text-muted)"
    }
  }, "New to PiatMove? ", /*#__PURE__*/React.createElement("a", {
    onClick: onRegister,
    style: {
      color: "var(--text-link)",
      fontWeight: 700,
      cursor: "pointer",
      textDecoration: "none"
    }
  }, "Create an account")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      paddingTop: 22,
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-subtle)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 16
  }), " Secured by the Municipality of Piat")));
}

/* ---------- Register ---------- */
function RegisterScreen({
  onBack,
  onDone
}) {
  const {
    Button,
    Input,
    IconButton
  } = PNS;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PNS.TopBar, {
    title: "Create Account",
    leading: /*#__PURE__*/React.createElement(IconButton, {
      label: "Back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 20
    }))
  }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 24px 30px",
      display: "flex",
      flexDirection: "column",
      gap: 15
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full Name",
    placeholder: "Juan dela Cruz",
    required: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Home Address",
    placeholder: "Brgy. Centro, Piat, Cagayan",
    required: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Contact Number",
    placeholder: "0917 123 4567",
    required: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email Address",
    placeholder: "juan@email.com",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    required: true,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 18
    }),
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      size: 18
    })
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 13px/1.2 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 7
    }
  }, "Upload Valid ID ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-danger)"
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1.5px dashed var(--border-strong)",
      borderRadius: "var(--radius-md)",
      padding: "22px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    name: "camera",
    bg: "var(--blue-50)",
    fg: "var(--blue-600)",
    size: 44,
    r: "var(--radius-md)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 14px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Tap to upload"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-regular) 12px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "Barangay ID, Driver's License, or PhilSys"))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      fontSize: 13,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: true,
    style: {
      width: 18,
      height: 18,
      marginTop: 1,
      accentColor: "var(--color-primary)"
    }
  }), /*#__PURE__*/React.createElement("span", null, "I agree to the Municipality of Piat's ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--text-link)",
      fontWeight: 600
    }
  }, "Terms of Service"), " and Data Privacy Policy.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    onClick: onDone,
    style: {
      marginTop: 6
    }
  }, "Register"))));
}
Object.assign(window, {
  SplashScreen,
  LoginScreen,
  RegisterScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/passenger/passenger-auth.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.ListItem = __ds_scope.ListItem;

__ds_ns.StatusTimeline = __ds_scope.StatusTimeline;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
