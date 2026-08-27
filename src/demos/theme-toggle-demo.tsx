import { useState } from "react";
import { ThemeToggle } from "../../components/toggles";

export function ThemeToggleDemo() {
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
          ? "radial-gradient(circle at 50% 28%, #303642 0%, #171a20 52%, #101216 100%)"
          : "radial-gradient(circle at 50% 25%, #ffffff 0%, #f1f3f5 58%, #e7e9ec 100%)",
        transition: "background .45s ease",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 18 }}>
        <span
          style={{
            color: dark ? "#9ca3af" : "#6b7280",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: ".16em",
            transition: "color .35s ease",
          }}
        >
          SERENITY UI
        </span>
        <ThemeToggle checked={dark} onCheckedChange={setDark} size={50} />
        <strong
          style={{
            color: dark ? "#f8fafc" : "#1f2937",
            fontSize: 13,
            fontWeight: 700,
            transition: "color .35s ease",
          }}
        >
          {dark ? "Dark mode" : "Light mode"}
        </strong>
      </div>
    </div>
  );
}
