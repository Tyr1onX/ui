import { useState } from "react";
import {
  CurtainThemeToggle,
  type CurtainTheme,
} from "../../components/toggles";

export function CurtainThemeToggleDemo() {
  const [theme, setTheme] = useState<CurtainTheme>("light");
  const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null);
  const dark = theme === "dark";

  return (
    <div
      ref={(node) => setPortalTarget(node)}
      style={{
        minHeight: 384,
        borderRadius: 13,
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        color: dark ? "#f8fafc" : "#171717",
        background: dark ? "#15171c" : "#f7f7f4",
        transition: "background .2s ease, color .2s ease",
        isolation: "isolate",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: dark
            ? "radial-gradient(circle at 75% 15%, rgba(120,130,165,.18), transparent 30%), linear-gradient(135deg, transparent 0 48%, rgba(255,255,255,.035) 48% 49%, transparent 49%)"
            : "radial-gradient(circle at 75% 15%, rgba(255,190,100,.18), transparent 30%), linear-gradient(135deg, transparent 0 48%, rgba(0,0,0,.035) 48% 49%, transparent 49%)",
          backgroundSize: "auto, 34px 34px",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "min(330px, calc(100% - 42px))" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
          <div>
            <span style={{ display: "block", marginBottom: 8, opacity: .55, fontSize: 9, fontWeight: 850, letterSpacing: ".16em" }}>
              CURTAIN TRANSITION
            </span>
            <strong style={{ display: "block", fontSize: 22, letterSpacing: "-.04em" }}>
              {dark ? "After dark" : "Daylight"}
            </strong>
            <p style={{ margin: "7px 0 0", opacity: .58, fontSize: 12, lineHeight: 1.5 }}>
              The theme swaps only after the curtain fully covers this preview.
            </p>
          </div>

          <CurtainThemeToggle
            theme={theme}
            onThemeChange={setTheme}
            portalTarget={portalTarget}
            buttonSize={46}
          />
        </div>
      </div>
    </div>
  );
}
