import { useState } from "react";
import { CinematicThemeSwitcher } from "../../components/toggles";

export function CinematicThemeSwitcherDemo() {
  const [dark, setDark] = useState(false);

  return (
    <div
      style={{
        minHeight: 384,
        borderRadius: 13,
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        background: dark
          ? "radial-gradient(circle at 50% 20%, #202b3d 0%, #0b101a 58%, #020617 100%)"
          : "radial-gradient(circle at 50% 20%, #ffffff 0%, #edf2f7 60%, #d8e0e9 100%)",
        transition: "background .45s ease",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 20 }}>
        <span style={{ color: dark ? "#8ea0b8" : "#64748b", fontSize: 10, fontWeight: 850, letterSpacing: ".16em" }}>
          CINEMATIC SWITCH
        </span>
        <CinematicThemeSwitcher checked={dark} onCheckedChange={setDark} />
        <span style={{ color: dark ? "#dbe5f2" : "#334155", fontSize: 12, fontWeight: 700 }}>
          {dark ? "Midnight grain" : "Daylight grain"}
        </span>
      </div>
    </div>
  );
}
