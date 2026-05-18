"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findPrototype } from "@/playground/manifest";

/* ───────────────────────────────────────────────────────
   Prototype preview (sandboxed)
   URL: /playground/prototypes/preview/<step-id>/<filename>?orientation=landscape|portrait

   Every prototype — HTML or JSX — is rendered inside the
   iPad Pro 13 M4 frame drawn below. HTML prototypes pass
   a `src` to load in an iframe; JSX prototypes pass their
   rendered component as `children`. Pass ?orientation=
   portrait for portrait view.

   Older JSX prototypes draw their own iPhone 17 Pro shell
   inside the screen area — that's by design until each is
   adapted for iPad dimensions; the outer iPad frame makes
   their iPhone-era origin obvious. Newer JSX prototypes
   (step-8, step-21, step-22) render iPad-sized content
   directly into the screen.
   ─────────────────────────────────────────────────────── */

function IpadFrame({
  src,
  title,
  children,
  orientation = "landscape",
}: {
  src?: string;
  title?: string;
  children?: React.ReactNode;
  orientation?: "landscape" | "portrait";
}) {
  const isLandscape = orientation === "landscape";

  // Content area (CSS px, iPad Pro 13 M4)
  const screenW = isLandscape ? 1366 : 1024;
  const screenH = isLandscape ? 1024 : 1366;

  // Shell = content + 22px bezel on each side
  const bezel = 22;
  const shellW = screenW + bezel * 2;
  const shellH = screenH + bezel * 2;

  // Camera dot centered in its bezel strip
  const camSize = 8;
  const camOffset = (bezel - camSize) / 2; // 7px — centers 8px dot in 22px strip

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#EDEEF1",
      }}
    >
      <div
        style={{
          position: "relative",
          width: shellW,
          height: shellH,
          borderRadius: 22,
          background: "#1C1C1E",
          flexShrink: 0,
        }}
      >
        {/* Subtle metallic edge highlight */}
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 23,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.06) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Front camera
            Landscape: top edge, horizontally centered (iPad Pro M4 landscape camera)
            Portrait:  right edge, vertically centered */}
        <div
          style={{
            position: "absolute",
            ...(isLandscape
              ? { top: camOffset, left: "50%", transform: "translateX(-50%)" }
              : { right: camOffset, top: "50%", transform: "translateY(-50%)" }),
            width: camSize,
            height: camSize,
            borderRadius: "50%",
            background: "#2C2C2E",
            border: "0.5px solid rgba(255,255,255,0.1)",
            zIndex: 2,
          }}
        />

        {/* Power / Touch ID button
            Landscape: right edge near top
            Portrait:  top edge near right */}
        <div
          style={{
            position: "absolute",
            ...(isLandscape
              ? { right: -3, top: 80, width: 3, height: 32 }
              : { top: -3, right: 80, width: 32, height: 3 }),
            borderRadius: 2,
            background: "linear-gradient(180deg, #3A3A3C, #2A2A2C)",
            zIndex: 2,
          }}
        />

        {/* Screen */}
        <div
          style={{
            position: "absolute",
            top: bezel,
            left: bezel,
            width: screenW,
            height: screenH,
            borderRadius: 18,
            overflow: "hidden",
            background: "#F9F9F9",
          }}
        >
          {src ? (
            <iframe
              src={src}
              title={title}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
                background: "#F9F9F9",
              }}
            />
          ) : (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: "#F9F9F9",
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function IphoneEraPlaceholder({
  filename,
  stepId,
}: {
  filename: string;
  stepId: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--safe-top) var(--content-margin) var(--safe-bottom)",
        background: "#F9F9F9",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        {/* Amber accent line */}
        <div
          style={{
            width: 32,
            height: 2,
            background: "#FBB931",
            borderRadius: 2,
            margin: "0 auto 28px",
            boxShadow: "0 0 12px rgba(251,185,49,0.4)",
          }}
        />
        <p
          style={{
            fontFamily: '"Noto Sans JP", system-ui, sans-serif',
            fontSize: 13,
            fontWeight: 500,
            color: "#5B616E",
            letterSpacing: "0.18em",
            margin: 0,
          }}
        >
          IPHONE-ERA PROTOTYPE
        </p>
        <h1
          style={{
            fontFamily: '"REM", system-ui, sans-serif',
            fontSize: 36,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            color: "#25272C",
            margin: "16px 0 0",
          }}
        >
          Pending iPad adaptation
        </h1>
        <p
          style={{
            fontFamily: '"Noto Sans JP", system-ui, sans-serif',
            fontSize: 17,
            lineHeight: 1.5,
            color: "#40444C",
            margin: "16px 0 0",
          }}
        >
          This prototype was designed at iPhone dimensions (393×852) and still
          draws its own phone shell. Tell Claude to adapt this step to iPad
          Pro 13 and the original design will be redrawn for the larger canvas.
        </p>
        <div
          style={{
            marginTop: 36,
            padding: "16px 20px",
            background: "#F9F9F9",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 12,
            boxShadow:
              "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            display: "inline-block",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 12,
              color: "#5B616E",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            step: {stepId}
            <br />
            file: {filename}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PrototypePreviewPage() {
  const params = useParams<{ step: string; file: string }>();
  const search = useSearchParams();
  const step = decodeURIComponent(params.step);
  const file = decodeURIComponent(params.file);
  const variant = search.get("variant") ?? undefined;
  const orientation = (search.get("orientation") ?? "landscape") as
    | "landscape"
    | "portrait";

  const proto = findPrototype(step, file);

  if (!proto) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: 32,
          fontFamily: "var(--font-noto-sans-jp), system-ui, sans-serif",
          color: "#5B616E",
          fontSize: 14,
          textAlign: "center",
        }}
      >
        Prototype not found: {step} / {file}
      </div>
    );
  }

  if (proto.kind === "jsx" && proto.component) {
    // Old prototypes that draw their own iPhone shell get a clean placeholder
    // instead of the nested iPhone-in-iPad render. Remove the iphoneEra flag
    // in manifest.ts once the prototype is redesigned at iPad dimensions.
    if (proto.iphoneEra) {
      return (
        <>
          <style>{`html, body { background: #EDEEF1 !important; margin: 0; }`}</style>
          <IpadFrame title={file} orientation={orientation}>
            <IphoneEraPlaceholder filename={file} stepId={step} />
          </IpadFrame>
        </>
      );
    }
    const Proto = proto.component;
    return (
      <>
        <style>{`html, body { background: #EDEEF1 !important; margin: 0; }`}</style>
        <IpadFrame title={file} orientation={orientation}>
          <Proto variant={variant} orientation={orientation} />
        </IpadFrame>
      </>
    );
  }

  if (proto.kind === "html" && proto.publicPath) {
    return (
      <>
        <style>{`html, body { background: #EDEEF1 !important; margin: 0; }`}</style>
        <IpadFrame
          src={proto.publicPath}
          title={file}
          orientation={orientation}
        />
      </>
    );
  }

  return null;
}
