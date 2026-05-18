import { useState, useRef, useEffect } from "react";

/* ───────────────────────────────────────────────────────
   GKTK step-7-section-4-transition — v6 (iPad Pro 13 M4)
   Variants:
     B "the descent" — slow ominous tilt, drop through void into light
     D "the warp"    — speed-line warp-jump from map into bright world
   ─────────────────────────────────────────────────────── */

const EASING = {
  gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  settle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  power: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  heavy: "cubic-bezier(0.4, 0, 0.2, 1)",
};

const C = {
  bg: "#F9F9F9",
  heading: "#25272C",
  sub: "#383A42",
  body: "#40444C",
  caption: "#5B616E",
  amber: "#FBB931",
  amber50: "#FFFBEc",
  amber100: "#FEF2C9",
};

const FONT_HEADING = '"REM", system-ui, sans-serif';
const FONT_BODY = '"Noto Sans JP", system-ui, sans-serif';

const an = (el, kf, opts) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: "forwards", ...opts }).finished;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const Glass = ({ children, style = {}, innerRef }) => (
  <div
    ref={innerRef}
    style={{
      background: "#F9F9F9",
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: 28,
      position: "relative",
      overflow: "hidden",
      boxShadow:
        "0 8px 32px rgba(0,0,0,0.10),0 2px 8px rgba(0,0,0,0.06)",
      ...style,
    }}
  >
    <div style={{ position: "relative", zIndex: 4 }}>{children}</div>
  </div>
);

const Resolve = ({ innerRef, headingRef, bodyRef }) => (
  <div
    ref={innerRef}
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 12,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding:
        "var(--safe-top) var(--content-margin) var(--safe-bottom)",
      opacity: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        zIndex: 0,
      }}
    />
    <div
      style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
      }}
    >
      <Glass style={{ padding: "56px 64px" }}>
        <div
          ref={headingRef}
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: C.heading,
            marginBottom: 28,
            opacity: 0,
          }}
        >
          3 to 5 million yen
        </div>
        <div
          ref={bodyRef}
          style={{
            fontFamily: FONT_BODY,
            fontWeight: 400,
            fontSize: 22,
            lineHeight: 1.5,
            color: C.body,
            maxWidth: "60ch",
            opacity: 0,
          }}
        >
          Estimated replacement cost per engineer who repatriates early
          due to family maladjustment.
        </div>
      </Glass>
    </div>
  </div>
);

const Tap = ({ innerRef }) => (
  <div
    ref={innerRef}
    style={{
      position: "absolute",
      bottom: "calc(96px + var(--safe-bottom))",
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      zIndex: 20,
      opacity: 0,
    }}
  >
    <div
      style={{
        fontFamily: FONT_BODY,
        fontSize: 17,
        color: C.caption,
        letterSpacing: "0.02em",
        opacity: 0.72,
      }}
    >
      Tap to continue
    </div>
  </div>
);

const reveal = async (res, tap, heading, body) => {
  await an(
    res,
    [
      { opacity: 0, transform: "translateY(30px) scale(0.97)" },
      { opacity: 0.4, transform: "translateY(15px) scale(0.985)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ],
    { duration: 700, easing: EASING.settle }
  );
  await wait(200);
  if (heading) {
    await an(
      heading,
      [
        { opacity: 0, transform: "translateY(12px) scale(0.94)" },
        { opacity: 0.6, transform: "translateY(5px) scale(0.98)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: 600, easing: EASING.settle }
    );
  }
  await wait(150);
  if (body) {
    await an(
      body,
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 450, easing: EASING.settle }
    );
  }
  await wait(300);
  if (tap)
    an(
      tap,
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 400, easing: EASING.smooth }
    );
};

const PlayBtn = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 15,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: 144,
        height: 144,
        borderRadius: "50%",
        background: "rgba(251,185,49,0.15)",
        border: "2px solid rgba(251,185,49,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 32px rgba(251,185,49,0.2)",
      }}
    >
      <svg width="48" height="48" viewBox="0 0 20 20" fill="none">
        <path d="M6 4L16 10L6 16V4Z" fill="rgba(251,185,49,0.85)" />
      </svg>
    </div>
  </div>
);

// ─── Map face (placeholder — same look, scaled-friendly aspect) ───
const MapFace = ({ style = {} }) => (
  <div
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background:
        "linear-gradient(170deg,#1a1d23 0%,#252830 30%,#1e2128 60%,#16181d 100%)",
      ...style,
    }}
  >
    <svg
      viewBox="0 0 1366 1024"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.13,
      }}
    >
      {[120, 220, 320, 420, 520, 620, 720, 820, 920].map((y, i) => (
        <path
          key={i}
          d={`M 0 ${y} Q ${300 + i * 60} ${y - 50 - i * 12} 683 ${
            y - 20 + i * 6
          } T 1366 ${y + 12}`}
          fill="none"
          stroke="#5B616E"
          strokeWidth={1.2}
        />
      ))}
    </svg>
    <svg
      viewBox="0 0 1366 1024"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.15,
      }}
    >
      <path
        d="M 180 0 L 180 320 Q 180 360 230 360 L 620 360 Q 680 360 680 410 L 680 1024"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth={2.4}
      />
      <path
        d="M 0 510 L 1366 510"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth={3}
      />
      <path
        d="M 980 0 L 980 220 Q 980 260 940 290 L 620 460"
        fill="none"
        stroke="#5B616E"
        strokeWidth={1.4}
      />
    </svg>
    <div
      style={{
        position: "absolute",
        top: "28%",
        left: "15%",
        width: "55%",
        height: "22%",
        background: "rgba(251,185,49,0.08)",
        border: "1px solid rgba(251,185,49,0.25)",
        borderRadius: 14,
      }}
    />
    {[
      { x: "25%", y: "32%", s: 16, a: 1 },
      { x: "40%", y: "36%", s: 12 },
      { x: "55%", y: "34%", s: 16, a: 1 },
      { x: "35%", y: "42%", s: 10 },
      { x: "60%", y: "40%", s: 14 },
      { x: "48%", y: "30%", s: 12, a: 1 },
      { x: "70%", y: "38%", s: 10 },
      { x: "30%", y: "55%", s: 9 },
      { x: "50%", y: "52%", s: 12 },
    ].map((p, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: p.x,
          top: p.y,
          width: p.s,
          height: p.s,
          borderRadius: "50%",
          background: p.a ? C.amber : "#FF9424",
          transform: "translate(-50%,-50%)",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        bottom: "16%",
        left: "6%",
        width: "44%",
        background: "#F9F9F9",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 16,
        padding: "20px 24px",
        boxShadow:
          "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: C.caption,
          fontFamily: FONT_BODY,
          letterSpacing: "0.015em",
          marginBottom: 10,
        }}
      >
        Kumamoto semiconductor corridor
      </div>
      <div style={{ display: "flex", gap: 28 }}>
        {[
          ["JASM", "12,800"],
          ["TSMC", "Phase 2"],
          ["Workers", "47,000"],
        ].map(([l, v], i) => (
          <div key={i}>
            <div
              style={{
                fontSize: 13,
                color: C.caption,
                fontFamily: FONT_BODY,
              }}
            >
              {l}
            </div>
            <div
              style={{
                fontSize: 17,
                color: C.heading,
                fontFamily: FONT_HEADING,
                fontWeight: 600,
              }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ───────────────────────────────────────────────────────
// B: THE DESCENT
// ───────────────────────────────────────────────────────
const Descent = ({ resolveRef, tapRef, headingRef, bodyRef, started }) => {
  const sceneRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const scene = sceneRef.current;
    const flash = flashRef.current;
    const res = resolveRef.current;
    const tap = tapRef.current;
    const h = headingRef?.current;
    const b = bodyRef?.current;
    if (!scene || !res) return;

    (async () => {
      // Phase 1 → 2 → 3: tilt, drop, settle (scaled to iPad height)
      await an(
        scene,
        [
          {
            transform:
              "rotateX(0deg) translateY(0px) translateZ(0px)",
            offset: 0,
          },
          {
            transform:
              "rotateX(3deg) translateY(0px) translateZ(0px)",
            offset: 0.06,
          },
          {
            transform:
              "rotateX(8deg) translateY(8px) translateZ(14px)",
            offset: 0.14,
          },
          {
            transform:
              "rotateX(14deg) translateY(22px) translateZ(28px)",
            offset: 0.22,
          },
          {
            transform:
              "rotateX(22deg) translateY(60px) translateZ(56px)",
            offset: 0.3,
          },
          {
            transform:
              "rotateX(35deg) translateY(220px) translateZ(110px)",
            offset: 0.4,
          },
          {
            transform:
              "rotateX(50deg) translateY(580px) translateZ(210px)",
            offset: 0.5,
          },
          {
            transform:
              "rotateX(62deg) translateY(1160px) translateZ(310px)",
            offset: 0.58,
          },
          {
            transform:
              "rotateX(70deg) translateY(1880px) translateZ(390px)",
            offset: 0.65,
          },
          {
            transform:
              "rotateX(72deg) translateY(2600px) translateZ(420px)",
            offset: 0.72,
          },
          {
            transform:
              "rotateX(65deg) translateY(3180px) translateZ(390px)",
            offset: 0.78,
          },
          {
            transform:
              "rotateX(50deg) translateY(3620px) translateZ(340px)",
            offset: 0.84,
          },
          {
            transform:
              "rotateX(30deg) translateY(3900px) translateZ(260px)",
            offset: 0.9,
          },
          {
            transform:
              "rotateX(12deg) translateY(4120px) translateZ(140px)",
            offset: 0.95,
          },
          {
            transform:
              "rotateX(0deg) translateY(4340px) translateZ(0px)",
            offset: 1.0,
          },
        ],
        { duration: 4200, easing: "linear" }
      );

      if (flash) {
        await an(
          flash,
          [
            { opacity: 0 },
            { opacity: 0.7, offset: 0.35 },
            { opacity: 0.9, offset: 0.6 },
            { opacity: 0 },
          ],
          { duration: 800, easing: EASING.smooth }
        );
      }

      await wait(500);
      await reveal(res, tap, h, b);
    })();
  }, [started, resolveRef, tapRef, headingRef, bodyRef]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        perspective: "1400px",
        perspectiveOrigin: "50% 25%",
        background: "#0c0e13",
      }}
    >
      <div
        ref={sceneRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "400%",
          top: 0,
          left: 0,
          transformStyle: "preserve-3d",
          transformOrigin: "50% 0%",
          transform:
            "rotateX(0deg) translateY(0px) translateZ(0px)",
        }}
      >
        {/* Layer 0: map surface */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "25%",
            transformStyle: "preserve-3d",
          }}
        >
          <MapFace />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background:
                "linear-gradient(90deg, transparent 10%, rgba(251,185,49,0.4) 30%, rgba(251,185,49,0.6) 50%, rgba(251,185,49,0.4) 70%, transparent 90%)",
              boxShadow:
                "0 0 28px rgba(251,185,49,0.3), 0 2px 60px rgba(251,185,49,0.15)",
            }}
          />
        </div>

        {/* Layer 1: upper void */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: 0,
            width: "100%",
            height: "25%",
            background:
              "linear-gradient(180deg, #080a0f 0%, #060810 50%, #0a0c12 100%)",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: 40 }, (_, i) => {
            const y = i * 2.5;
            const isAmber = i % 5 === 0;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: `${y}%`,
                  left: 0,
                  width: "100%",
                  height: isAmber ? 2 : 1,
                  background: isAmber
                    ? `linear-gradient(90deg, transparent ${
                        5 + (i % 4) * 8
                      }%, rgba(251,185,49,0.12) ${
                        25 + (i % 3) * 10
                      }%, rgba(251,185,49,0.2) 50%, rgba(251,185,49,0.12) ${
                        65 + (i % 3) * 5
                      }%, transparent ${90 - (i % 4) * 3}%)`
                    : `linear-gradient(90deg, transparent ${
                        10 + (i % 4) * 5
                      }%, rgba(107,114,128,0.08) ${
                        30 + (i % 3) * 10
                      }%, transparent ${70 + (i % 5) * 6}%)`,
                }}
              />
            );
          })}

          {Array.from({ length: 28 }, (_, i) => {
            const isAmber = i % 3 === 0;
            return (
              <div
                key={`f${i}`}
                style={{
                  position: "absolute",
                  left: `${8 + Math.random() * 84}%`,
                  top: `${5 + Math.random() * 90}%`,
                  width: 70 + Math.random() * 140,
                  height: 22 + Math.random() * 44,
                  background: isAmber
                    ? "rgba(251,185,49,0.06)"
                    : "rgba(107,114,128,0.04)",
                  border: `1px solid ${
                    isAmber
                      ? "rgba(251,185,49,0.1)"
                      : "rgba(107,114,128,0.06)"
                  }`,
                  borderRadius: 10,
                }}
              />
            );
          })}

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30%",
              background:
                "linear-gradient(180deg, rgba(8,10,15,0.95) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Layer 2: deep void */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "25%",
            background: "#050710",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: 22 }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                width: 5 + Math.random() * 9,
                height: 5 + Math.random() * 9,
                borderRadius: "50%",
                background: C.amber,
                opacity: 0.08 + Math.random() * 0.12,
              }}
            />
          ))}

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(249,249,249,0.03) 50%, rgba(249,249,249,0.1) 100%)",
            }}
          />
        </div>

        {/* Layer 3: bright world */}
        <div
          style={{
            position: "absolute",
            top: "75%",
            left: 0,
            width: "100%",
            height: "25%",
            background: C.bg,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: C.bg,
            }}
          />
        </div>
      </div>

      <div
        ref={flashRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          opacity: 0,
          background: C.bg,
        }}
      />
    </div>
  );
};

// ───────────────────────────────────────────────────────
// D: THE WARP
// ───────────────────────────────────────────────────────
const Warp = ({ resolveRef, tapRef, headingRef, bodyRef, started }) => {
  const canvasRef = useRef(null);
  const mapOverRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    const mapOver = mapOverRef.current;
    const res = resolveRef.current;
    const tap = tapRef.current;
    const h = headingRef?.current;
    const b = bodyRef?.current;
    if (!canvas || !res) return;

    const dpr = window.devicePixelRatio || 1;
    const W = (canvas.width = canvas.offsetWidth * dpr);
    const H = (canvas.height = canvas.offsetHeight * dpr);
    const ctx = canvas.getContext("2d");
    const cx = W / 2,
      cy = H * 0.42;

    // Speed lines — denser for the iPad canvas
    const lines = Array.from({ length: 520 }, () => {
      const isAmber = Math.random() > 0.65;
      return {
        angle: Math.random() * Math.PI * 2,
        baseDist: 30 + Math.random() * 120,
        speed: 0.3 + Math.random() * 2.5,
        maxDist: 500 + Math.random() * 900,
        hue: isAmber
          ? 38 + Math.random() * 10
          : 215 + Math.random() * 25,
        isAmber,
        brightness: 0.2 + Math.random() * 0.6,
        thickness: isAmber
          ? 1.8 + Math.random() * 1.8
          : 0.6 + Math.random() * 1.2,
      };
    });

    let mapFaded = false;
    const DUR = 4000;
    const t0 = performance.now();

    const loop = (now) => {
      const t = Math.min((now - t0) / DUR, 1);
      ctx.clearRect(0, 0, W, H);

      const bgBright = t > 0.82 ? (t - 0.82) / 0.18 : 0;
      const bgR = Math.round(13 + bgBright * 236);
      const bgG = Math.round(15 + bgBright * 234);
      const bgB = Math.round(20 + bgBright * 229);
      ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
      ctx.fillRect(0, 0, W, H);

      if (!mapFaded && mapOver) {
        const mapOpacity = Math.max(0, 1 - t / 0.35);
        mapOver.style.opacity = String(mapOpacity);
        if (mapOpacity <= 0) mapFaded = true;
      }

      let accel, lineAlpha;
      if (t < 0.2) {
        accel = (t / 0.2) * 0.03;
        lineAlpha = (t / 0.2) * 0.15;
      } else if (t < 0.4) {
        const lt = (t - 0.2) / 0.2;
        accel = 0.03 + lt * 0.08;
        lineAlpha = 0.15 + lt * 0.3;
      } else if (t < 0.6) {
        const lt = (t - 0.4) / 0.2;
        accel = 0.11 + lt * 0.2;
        lineAlpha = 0.45 + lt * 0.25;
      } else if (t < 0.78) {
        const lt = (t - 0.6) / 0.18;
        accel = 0.31 + lt * 0.4;
        lineAlpha = 0.7 + lt * 0.2;
      } else if (t < 0.9) {
        const lt = (t - 0.78) / 0.12;
        accel = 0.71 + lt * 0.29;
        lineAlpha = 0.9 + lt * 0.1;
      } else {
        accel = 1.0;
        lineAlpha = 1.0 - (t - 0.9) / 0.1;
      }

      for (const line of lines) {
        const currentDist =
          line.baseDist + accel * line.maxDist * line.speed;
        const lineLength = 2 + accel * 260 * line.speed;

        const x1 = cx + Math.cos(line.angle) * currentDist;
        const y1 = cy + Math.sin(line.angle) * currentDist;
        const x2 = cx + Math.cos(line.angle) * (currentDist + lineLength);
        const y2 = cy + Math.sin(line.angle) * (currentDist + lineLength);

        const alpha = line.brightness * lineAlpha;
        if (alpha < 0.01) continue;

        if (line.isAmber) {
          ctx.strokeStyle = `rgba(251,185,49,${alpha * 0.8})`;
        } else {
          ctx.strokeStyle = `rgba(140,150,170,${alpha * 0.45})`;
        }
        ctx.lineWidth = line.thickness * dpr * (0.5 + accel * 0.5);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      const glowIntensity = accel * accel;
      const glowR = 60 + glowIntensity * 640;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grd.addColorStop(0, `rgba(251,185,49,${glowIntensity * 0.5})`);
      grd.addColorStop(0.3, `rgba(251,185,49,${glowIntensity * 0.2})`);
      grd.addColorStop(0.6, `rgba(200,200,220,${glowIntensity * 0.08})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      if (t > 0.3 && t < 0.85) {
        const vigT =
          t < 0.6 ? (t - 0.3) / 0.3 : 1 - (t - 0.6) / 0.25;
        const vigGrd = ctx.createRadialGradient(
          cx,
          cy,
          W * 0.2,
          cx,
          cy,
          W * 0.7
        );
        vigGrd.addColorStop(0, "transparent");
        vigGrd.addColorStop(1, `rgba(5,7,16,${vigT * 0.5})`);
        ctx.fillStyle = vigGrd;
        ctx.fillRect(0, 0, W, H);
      }

      if (t > 0.88) {
        const flashT = (t - 0.88) / 0.12;
        const flashAlpha = flashT * flashT * flashT;
        ctx.fillStyle = `rgba(249,249,249,${flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) {
        requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, W, H);
        if (mapOver) mapOver.style.display = "none";
        canvas.style.display = "none";
        (async () => {
          await wait(500);
          await reveal(res, tap, h, b);
        })();
      }
    };

    requestAnimationFrame(loop);
  }, [started, resolveRef, tapRef, headingRef, bodyRef]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#0d0f14",
      }}
    >
      <div
        ref={mapOverRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          transition: "none",
        }}
      >
        <MapFace />
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
      />
    </div>
  );
};

// ─── MAIN ───
const VARIANT_INDEX = { B: 0, D: 1 };

export default function Step7V6({ variant = "B" } = {}) {
  const v = VARIANT_INDEX[variant] ?? 0;
  const [go, setGo] = useState(false);

  const rB = useRef(null),
    rD = useRef(null);
  const tB = useRef(null),
    tD = useRef(null);
  const hB = useRef(null),
    hD = useRef(null);
  const bB = useRef(null),
    bD = useRef(null);

  const tap = () => {
    if (!go) setGo(true);
  };

  return (
    <div
      data-proto="step-7"
      style={{
        position: "absolute",
        inset: 0,
        background: C.bg,
        fontFamily: FONT_BODY,
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-proto="step-7"] *,
          [data-proto="step-7"] *::before,
          [data-proto="step-7"] *::after {
            animation-duration: 0.001ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
      {v === 0 && (
        <div
          style={{ position: "absolute", inset: 0 }}
          onClick={tap}
          role="button"
          tabIndex={0}
          aria-label="Continue"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              tap();
            }
          }}
        >
          <Descent
            resolveRef={rB}
            tapRef={tB}
            headingRef={hB}
            bodyRef={bB}
            started={go}
          />
          <Resolve innerRef={rB} headingRef={hB} bodyRef={bB} />
          <Tap innerRef={tB} />
          {!go && <PlayBtn />}
        </div>
      )}
      {v === 1 && (
        <div
          style={{ position: "absolute", inset: 0 }}
          onClick={tap}
          role="button"
          tabIndex={0}
          aria-label="Continue"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              tap();
            }
          }}
        >
          <Warp
            resolveRef={rD}
            tapRef={tD}
            headingRef={hD}
            bodyRef={bD}
            started={go}
          />
          <Resolve innerRef={rD} headingRef={hD} bodyRef={bD} />
          <Tap innerRef={tD} />
          {!go && <PlayBtn />}
        </div>
      )}
    </div>
  );
}
