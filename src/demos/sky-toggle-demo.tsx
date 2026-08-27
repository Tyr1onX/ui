import { useState } from "react";
import { SkyToggle } from "../../components/toggles";

export function SkyToggleDemo() {
  const [night, setNight] = useState(false);

  return (
    <div
      style={{
        minHeight: 384,
        borderRadius: 13,
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        background: night
          ? "linear-gradient(180deg, #0d1322 0%, #1b2840 58%, #2c3544 100%)"
          : "linear-gradient(180deg, #8bd4ff 0%, #c9edff 56%, #f8fcff 100%)",
        transition: "background .55s ease",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: night ? 1 : 0,
          backgroundImage:
            "radial-gradient(circle at 16% 18%, rgba(255,255,255,.9) 0 1px, transparent 1.6px), radial-gradient(circle at 72% 24%, rgba(255,255,255,.8) 0 1px, transparent 1.7px), radial-gradient(circle at 58% 68%, rgba(255,255,255,.7) 0 1px, transparent 1.5px), radial-gradient(circle at 88% 72%, rgba(255,255,255,.8) 0 1px, transparent 1.6px)",
          backgroundSize: "130px 120px, 170px 150px, 190px 170px, 140px 135px",
          transition: "opacity .5s ease",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, display: "grid", justifyItems: "center", gap: 22 }}>
        <span
          style={{
            color: night ? "rgba(255,255,255,.68)" : "#2e6d93",
            fontSize: 10,
            fontWeight: 850,
            letterSpacing: ".16em",
          }}
        >
          {night ? "NIGHT SKY" : "DAY SKY"}
        </span>
        <SkyToggle checked={night} onCheckedChange={setNight} scale={1.5} />
      </div>
    </div>
  );
}
