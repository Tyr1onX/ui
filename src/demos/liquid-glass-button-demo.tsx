import { LiquidGlassButton } from "../../components/buttons";

export function LiquidGlassButtonDemo() {
  return (
    <div
      style={{
        minHeight: 384,
        borderRadius: 13,
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 18% 22%, rgba(255,114,167,.9), transparent 28%), radial-gradient(circle at 78% 24%, rgba(73,166,255,.95), transparent 32%), radial-gradient(circle at 50% 82%, rgba(134,92,246,.9), transparent 30%), linear-gradient(135deg,#232733,#11151d)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: .35,
          backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, display: "grid", justifyItems: "center", gap: 18 }}>
        <span style={{ color: "rgba(255,255,255,.68)", fontSize: 10, fontWeight: 850, letterSpacing: ".16em" }}>DESIGNALI</span>
        <LiquidGlassButton>Continue</LiquidGlassButton>
      </div>
    </div>
  );
}
