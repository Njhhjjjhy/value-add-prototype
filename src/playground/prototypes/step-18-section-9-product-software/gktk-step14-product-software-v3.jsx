import { useState, useEffect, useRef } from "react";

/* ───────────────────────────────────────────────────────
   step-14 section 7 product software — iPad Pro 13 M4
   Two variants:
   A "the lock screen" — Moha Intel notifications shown
                         on a dark device-screen card
                         (the metaphor for what the
                         operator/resident sees on phone).
   B "the thread"      — Property secretary chat thread
                         rendered the same way, on a dark
                         device-screen card.

   iPad adaptation:
   - iPhone 17 Pro bezel/Dynamic Island stripped.
   - Page split into two columns (landscape) or stacked
     (portrait): left/top is the editorial intro copy +
     CTA, right/bottom is the dark device-screen card
     that hosts the running demo.
   - The dark card uses #1A1A1E / #1C1C1E per CLAUDE.md's
     allowance for device-shell representations.
   - Type bumped to iPad HIG floors (body 17, caption 13).
   ─────────────────────────────────────────────────────── */

const AMBER = "#FBB931";
const BG = "#F9F9F9";
const N950 = "#25272C";
const N800 = "#40444C";
const N600 = "#5B616E";
const N100 = "#EDEEF1";

// Dark device-screen card colors
const CARD_BG = "#1A1A1E";
const CARD_PANEL = "#26262B";
const CARD_BORDER = "rgba(255,255,255,0.08)";
const CARD_TEXT_PRIMARY = "#F2F2F4";
const CARD_TEXT_SECONDARY = "#A8AAB0";
const CARD_TEXT_MUTED = "#7B7E86";

const FONT_HEADING = "'REM', system-ui, sans-serif";
const FONT_BODY = "'Noto Sans JP', system-ui, sans-serif";

const variants = [
  { id: "A", label: "The lock screen" },
  { id: "B", label: "The thread" },
];

// ─── notification data ──────────────────────────────────────────────
const YEAR_1 = {
  label: "Year 1", sub: "Landing", tag: "Included",
  notifications: [
    { from: "Lin Wei-Chen", msg: "Your SoftBank appointment is confirmed for Thursday, 2:00 PM. I will meet you at the entrance.", time: "9:41 AM" },
    { from: "Maintenance", msg: "Delta AC unit in 4F serviced. Everything is running normally.", time: "2:15 PM" },
    { from: "MoreHarvest", msg: "Your residence guide is ready. Available in Chinese and Japanese.", time: "10:00 AM" },
  ],
};
const YEAR_2 = {
  label: "Year 2", sub: "Family", tag: "Add-on",
  notifications: [
    { from: "Medical nav", msg: "Dr. Tanaka appointment confirmed. Chinese interpreter arranged for 10:30 AM.", time: "8:20 AM" },
    { from: "Education", msg: "KIS school bus: Monday pickup at Building A, 7:45 AM. Driver is Mr. Oda.", time: "7:00 PM" },
    { from: "Community", msg: "Lunar New Year dinner at the residents lounge, January 25. RSVP open.", time: "3:30 PM" },
  ],
};
const YEAR_3 = {
  label: "Year 3+", sub: "Wellness", tag: "Premium",
  notifications: [
    { from: "Wellness", msg: "Your wellness check-in is Tuesday at 3:00 PM. Counselor Chen is available in Chinese.", time: "11:00 AM" },
    { from: "Concierge", msg: "Golf reservation confirmed. Aso Grand Vrio, Saturday 7:30 AM. Shuttle arranged.", time: "6:45 PM" },
    { from: "Culture", msg: "New: Kumamoto pottery workshop series. 4 sessions starting March 8.", time: "9:15 AM" },
  ],
};
const ALL_YEARS = [YEAR_1, YEAR_2, YEAR_3];

// ─── entrance hooks (Web Animations API) ────────────────────────────
const useNotifEntrance = (ref, visible) => {
  useEffect(() => {
    if (!ref.current || !visible) return;
    const el = ref.current;
    el.animate([
      { opacity: 0, transform: "translateY(24px) scale(0.98)" },
      { opacity: 0.4, transform: "translateY(12px) scale(0.99)", offset: 0.35 },
      { opacity: 0.85, transform: "translateY(4px) scale(0.998)", offset: 0.7 },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ], { duration: 600, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fill: "forwards" });
  }, [visible]);
};

const useMsgEntrance = (ref, visible, fromRight = false) => {
  useEffect(() => {
    if (!ref.current || !visible) return;
    const el = ref.current;
    const x = fromRight ? -12 : 12;
    el.animate([
      { opacity: 0, transform: `translateY(16px) translateX(${x}px) scale(0.96)` },
      { opacity: 0.5, transform: `translateY(6px) translateX(${x * 0.3}px) scale(0.985)`, offset: 0.4 },
      { opacity: 1, transform: "translateY(0) translateX(0) scale(1)" },
    ], { duration: 550, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fill: "forwards" });
  }, [visible]);
};

// ─── dark device-screen card ────────────────────────────────────────
const DeviceScreenCard = ({ children, orientation = "landscape" }) => {
  const isLandscape = orientation === "landscape";
  // Card is a tall rectangle representing a phone-style screen, not
  // a literal phone bezel. Sized to feel like the operator's device
  // sitting on the iPad canvas.
  const cardW = isLandscape ? 480 : 520;
  const cardH = isLandscape ? 820 : 880;
  return (
    <div
      style={{
        position: "relative",
        width: cardW,
        height: cardH,
        maxHeight: "100%",
        borderRadius: 36,
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.35), 0 12px 32px rgba(0,0,0,0.20)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
};

// ─── status bar (inside the dark card) ──────────────────────────────
const DarkStatusBar = () => (
  <div
    style={{
      position: "absolute",
      top: 18,
      left: 32,
      right: 32,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 30,
      color: CARD_TEXT_PRIMARY,
      fontSize: 13,
      fontWeight: 600,
      fontFamily: FONT_BODY,
    }}
  >
    <span>9:41</span>
    <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <span style={{ fontSize: 13 }}>5G</span>
      <svg width="18" height="13" viewBox="0 0 16 12">
        <rect x="0" y="4" width="3" height="8" rx="0.5" fill="currentColor" />
        <rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5" fill="currentColor" />
        <rect x="9" y="0.5" width="3" height="11.5" rx="0.5" fill="currentColor" />
        <rect x="13" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
      </svg>
    </span>
  </div>
);

// ─── editorial intro (left/top column) ──────────────────────────────
const IntroColumn = ({ onContinue, orientation = "landscape" }) => {
  const isLandscape = orientation === "landscape";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
        maxWidth: isLandscape ? 540 : 760,
        width: "100%",
      }}
    >
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13,
          fontWeight: 500,
          color: N600,
          letterSpacing: "0.18em",
        }}
      >
        SECTION 7 — PRODUCT, SOFTWARE
      </div>
      <h2
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: 48,
          color: N950,
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
        }}
      >
        Software-defined real estate
      </h2>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 18,
          color: N800,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        Taiwanese staff solve all problems, from daily logistics to language
        barriers. Nothing affects expected quality of life.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {[
          { year: "Year 1", name: "Landing", tag: "Included", items: "Property secretary. Admin accompaniment. Maintenance." },
          { year: "Year 2", name: "Family", tag: "Add-on", items: "Medical navigation. Education support. Community events." },
          { year: "Year 3+", name: "Wellness", tag: "Premium", items: "Mental health. Health management. Golf, onsen, culture." },
        ].map((tier, i) => (
          <div
            key={i}
            style={{
              padding: "16px 18px",
              borderRadius: 12,
              background: BG,
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: FONT_HEADING, fontWeight: 600, fontSize: 17, color: N950 }}>{tier.year}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 15, color: N600 }}>{tier.name}</span>
              </div>
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  fontWeight: 500,
                  color: N800,
                  background: N100,
                  borderRadius: 8,
                  padding: "4px 10px",
                }}
              >
                {tier.tag}
              </span>
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: N800, margin: 0, lineHeight: 1.55 }}>{tier.items}</p>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: N600, margin: 0, lineHeight: 1.55 }}>
        The software layer keeps growing. New modules pushed without modifying buildings.
      </p>

      <button
        className="step-14-cta"
        onClick={onContinue}
        style={{
          alignSelf: "flex-start",
          padding: "18px 32px",
          minHeight: 56,
          borderRadius: 12,
          border: "none",
          background: AMBER,
          color: N950,
          fontFamily: FONT_HEADING,
          fontSize: 17,
          fontWeight: 600,
          marginTop: 8,
        }}
      >
        See it in action
      </button>
    </div>
  );
};

// ─── NOTIF CARD (variant A) ─────────────────────────────────────────
const NotifCard = ({ from, msg, time }) => {
  const ref = useRef(null);
  useNotifEntrance(ref, true);
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <div
        style={{
          padding: "12px 14px",
          borderRadius: 14,
          background: CARD_PANEL,
          border: `1px solid ${CARD_BORDER}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15, color: CARD_TEXT_PRIMARY }}>{from}</span>
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: CARD_TEXT_MUTED }}>{time}</span>
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: CARD_TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{msg}</p>
      </div>
    </div>
  );
};

// ─── YEAR HEADER (variant A) ────────────────────────────────────────
const YearHeader = ({ label, sub, tag }) => {
  const ref = useRef(null);
  useNotifEntrance(ref, true);
  return (
    <div ref={ref} style={{ opacity: 0, display: "flex", alignItems: "center", gap: 10, padding: "12px 4px 4px" }}>
      <span style={{ fontFamily: FONT_HEADING, fontWeight: 600, fontSize: 15, color: CARD_TEXT_PRIMARY }}>{label}</span>
      <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: CARD_TEXT_MUTED }}>{sub}</span>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: CARD_TEXT_PRIMARY,
          background: "rgba(255,255,255,0.10)",
          borderRadius: 8,
          padding: "4px 10px",
          fontWeight: 500,
        }}
      >
        {tag}
      </span>
    </div>
  );
};

// ─── VARIANT A: the lock screen ─────────────────────────────────────
const VariantA = ({ active }) => {
  const [items, setItems] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) { setItems([]); return; }
    const flat = ALL_YEARS.flatMap((y, yi) =>
      y.notifications.map((n, ni) => ({ ...n, yearIdx: yi, yearLabel: y.label, yearSub: y.sub, tag: y.tag, key: `${yi}-${ni}` }))
    );
    let idx = 0;
    const show = () => {
      if (idx >= flat.length) return;
      setItems(prev => [...prev, flat[idx]]);
      idx++;
      timerRef.current = setTimeout(show, 1400);
    };
    timerRef.current = setTimeout(show, 700);
    return () => clearTimeout(timerRef.current);
  }, [active]);

  const grouped = [];
  let lastYi = -1;
  items.forEach(n => {
    if (n.yearIdx !== lastYi) {
      grouped.push({ type: "year", label: n.yearLabel, sub: n.yearSub, tag: n.tag, yearIdx: n.yearIdx, key: `y${n.yearIdx}` });
      lastYi = n.yearIdx;
    }
    grouped.push({ type: "notif", ...n });
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: active ? 1 : 0,
        transition: "opacity 400ms",
      }}
    >
      <DarkStatusBar />
      <div style={{ position: "absolute", top: 64, left: 28, right: 28 }}>
        <h3
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 22,
            color: CARD_TEXT_PRIMARY,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Software-defined real estate
        </h3>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            color: CARD_TEXT_SECONDARY,
            margin: "6px 0 0",
            lineHeight: 1.45,
          }}
        >
          What your phone looks like as a MoreHarvest resident.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 16,
          right: 16,
          bottom: 24,
          overflow: "hidden",
        }}
      >
        {grouped.map((item) => (
          <div key={item.key} style={{ marginBottom: item.type === "year" ? 4 : 10 }}>
            {item.type === "year" ? (
              <YearHeader label={item.label} sub={item.sub} tag={item.tag} />
            ) : (
              <NotifCard from={item.from} msg={item.msg} time={item.time} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── CHAT BUBBLES (variant B) ───────────────────────────────────────
const ChatBubbleSec = ({ text }) => {
  const ref = useRef(null);
  useMsgEntrance(ref, true, false);
  return (
    <div ref={ref} aria-live="polite" style={{ opacity: 0, maxWidth: "82%", marginRight: "auto" }}>
      <div
        style={{
          padding: "12px 14px",
          borderRadius: "14px 14px 14px 4px",
          background: CARD_PANEL,
          border: `1px solid ${CARD_BORDER}`,
        }}
      >
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: CARD_TEXT_PRIMARY, margin: 0, lineHeight: 1.5 }}>{text}</p>
      </div>
    </div>
  );
};

const ChatBubbleTen = ({ text }) => {
  const ref = useRef(null);
  useMsgEntrance(ref, true, true);
  return (
    <div ref={ref} aria-live="polite" style={{ opacity: 0, maxWidth: "78%", marginLeft: "auto" }}>
      <div style={{ padding: "12px 14px", borderRadius: "14px 14px 4px 14px", background: AMBER }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: N950, margin: 0, lineHeight: 1.5 }}>{text}</p>
      </div>
    </div>
  );
};

const ChatDate = ({ text }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.animate([
      { opacity: 0 },
      { opacity: 1 },
    ], { duration: 400, easing: "ease-out", fill: "forwards" });
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, textAlign: "center", padding: "10px 0 4px" }}>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: CARD_TEXT_MUTED,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 8,
          padding: "4px 12px",
        }}
      >
        {text}
      </span>
    </div>
  );
};

// ─── VARIANT B: the thread ──────────────────────────────────────────
const VariantB = ({ active }) => {
  const [messages, setMessages] = useState([]);
  const timerRef = useRef(null);

  const chatData = [
    { type: "date", text: "Year 1 — landing" },
    { type: "sec", text: "Hi, this is Lin Wei-Chen, your property secretary. Welcome to Kumamoto." },
    { type: "sec", text: "I have confirmed your SoftBank appointment for Thursday at 2:00 PM. I will meet you at the entrance." },
    { type: "ten", text: "Thank you. The AC in 4F is making a noise." },
    { type: "sec", text: "Maintenance dispatched. Delta unit serviced, running normally now." },
    { type: "date", text: "Year 2 — family" },
    { type: "sec", text: "Dr. Tanaka can see your daughter Thursday. Chinese interpreter arranged." },
    { type: "sec", text: "KIS school bus confirmed. Monday pickup at Building A, 7:45 AM." },
    { type: "ten", text: "My wife is looking for community events." },
    { type: "sec", text: "Lunar New Year dinner at the residents lounge, January 25. I will send the RSVP link." },
    { type: "date", text: "Year 3+ — wellness" },
    { type: "sec", text: "Your wellness check-in is Tuesday at 3:00 PM. Counselor Chen speaks Chinese." },
    { type: "sec", text: "Golf reservation confirmed. Aso Grand Vrio, Saturday 7:30 AM. Shuttle arranged." },
  ];

  useEffect(() => {
    if (!active) { setMessages([]); return; }
    let idx = 0;
    const show = () => {
      if (idx >= chatData.length) return;
      setMessages(prev => [...prev, chatData[idx]]);
      idx++;
      timerRef.current = setTimeout(show, chatData[idx - 1]?.type === "date" ? 600 : 1200);
    };
    timerRef.current = setTimeout(show, 600);
    return () => clearTimeout(timerRef.current);
  }, [active]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: active ? 1 : 0,
        transition: "opacity 400ms",
      }}
    >
      <DarkStatusBar />
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 0,
          right: 0,
          zIndex: 20,
          padding: "12px 20px",
          borderBottom: `1px solid ${CARD_BORDER}`,
          background: CARD_BG,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/logos-and-icons/favicon.svg"
            alt="MoreHarvest"
            style={{ display: "block", width: 40, height: 40, borderRadius: 20 }}
          />
          <div>
            <div style={{ fontFamily: FONT_HEADING, fontWeight: 600, fontSize: 17, color: CARD_TEXT_PRIMARY, lineHeight: 1.2 }}>MoreHarvest</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: CARD_TEXT_MUTED }}>Property secretary</div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 132,
          left: 16,
          right: 16,
          bottom: 20,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            {m.type === "date" ? (
              <ChatDate text={m.text} />
            ) : m.type === "sec" ? (
              <ChatBubbleSec text={m.text} />
            ) : (
              <ChatBubbleTen text={m.text} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────────────
const VARIANT_MAP = {
  A: VariantA,
  B: VariantB,
};

export default function Step14ProductSoftware({ variant = "A", orientation = "landscape" } = {}) {
  const resolved = variants.find(v => v.id === variant) ? variant : "A";
  const [screen, setScreen] = useState("intro");

  useEffect(() => {
    setScreen("intro");
  }, [resolved]);

  const Variant = VARIANT_MAP[resolved];
  const isLandscape = orientation === "landscape";

  return (
    <div
      data-proto="step-14"
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-14"] *,
          [data-proto="step-14"] *::before,
          [data-proto="step-14"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
        .step-14-cta { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }
        .step-14-cta:active { transform: scale(0.97); }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: "calc(96px + var(--safe-top))",
          bottom: "calc(64px + var(--safe-bottom))",
          left: "var(--content-margin)",
          right: "var(--content-margin)",
          display: "flex",
          flexDirection: isLandscape ? "row" : "column",
          alignItems: isLandscape ? "center" : "flex-start",
          justifyContent: isLandscape ? "space-between" : "flex-start",
          gap: isLandscape ? 64 : 40,
        }}
      >
        {/* Left/top column: editorial intro + CTA (always visible) */}
        <div
          style={{
            flex: isLandscape ? "1 1 0" : "0 0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: isLandscape ? 600 : 880,
            width: "100%",
          }}
        >
          <IntroColumn
            onContinue={() => setScreen("demo")}
            orientation={orientation}
          />
        </div>

        {/* Right/bottom column: dark device-screen card */}
        <div
          style={{
            flex: isLandscape ? "0 0 auto" : "1 1 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: isLandscape ? "center" : "center",
            width: isLandscape ? "auto" : "100%",
          }}
        >
          <DeviceScreenCard orientation={orientation}>
            {screen === "demo" && Variant && (
              <Variant active={screen === "demo"} />
            )}
            {screen === "intro" && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 32,
                }}
              >
                <DarkStatusBar />
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    color: CARD_TEXT_MUTED,
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  Tap &ldquo;See it in action&rdquo; to begin
                </div>
              </div>
            )}
          </DeviceScreenCard>
        </div>
      </div>
    </div>
  );
}
