import { useMemo, useState } from "react";
import { MacOSDock, type MacOSDockApp } from "../../components/docks";

function DockIcon({
  label,
  background,
  color = "#fff",
}: {
  label: string;
  background: string;
  color?: string;
}) {
  return (
    <span
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
        borderRadius: "23%",
        color,
        background,
        boxShadow: "inset 0 1px rgba(255,255,255,.35)",
        fontSize: "clamp(12px, 2vw, 20px)",
        fontWeight: 850,
        letterSpacing: "-.04em",
      }}
    >
      {label}
    </span>
  );
}

export function MacOSDockDemo() {
  const [openApps, setOpenApps] = useState(["finder", "safari"]);
  const apps = useMemo<MacOSDockApp[]>(
    () => [
      { id: "finder", name: "Finder", icon: <DockIcon label="⌘" background="linear-gradient(145deg,#79c8ff,#247dd2)" /> },
      { id: "mail", name: "Mail", icon: <DockIcon label="✉" background="linear-gradient(145deg,#62d8ff,#1477e8)" /> },
      { id: "safari", name: "Safari", icon: <DockIcon label="↗" background="radial-gradient(circle at 50% 46%,#f6fbff 0 35%,#3eb5ff 36% 60%,#1471d6 61%)" /> },
      { id: "notes", name: "Notes", icon: <DockIcon label="≡" background="linear-gradient(#fff7a8 0 34%,#fff 35%)" color="#6b5b18" /> },
      { id: "music", name: "Music", icon: <DockIcon label="♪" background="linear-gradient(145deg,#ff7599,#ff3b6b)" /> },
      { id: "settings", name: "Settings", icon: <DockIcon label="⚙" background="linear-gradient(145deg,#a8b0bb,#59616d)" /> },
    ],
    [],
  );

  return (
    <div
      style={{
        minHeight: 384,
        borderRadius: 13,
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 25% 20%,rgba(255,184,120,.85),transparent 26%), radial-gradient(circle at 76% 26%,rgba(117,139,255,.86),transparent 32%), linear-gradient(150deg,#152030,#43506b 52%,#182033)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(16px)",
          background: "linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.08))",
        }}
      />
      <div style={{ position: "absolute", top: 12, left: 16, right: 16, display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.72)", fontSize: 10, fontWeight: 700 }}>
        <span>● ● ●</span>
        <span>UI Dock · 10:24</span>
      </div>
      <div style={{ position: "absolute", left: "50%", bottom: 28, transform: "translateX(-50%)", width: "max-content", maxWidth: "calc(100% - 28px)" }}>
        <MacOSDock
          apps={apps}
          openApps={openApps}
          iconSize={46}
          maxScale={1.65}
          onAppClick={(id) => {
            setOpenApps((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
          }}
        />
      </div>
    </div>
  );
}
