import { LiquidGradientButton } from "../../components/buttons";

export function ButtonOneDemo() {
  return (
    <div
      style={{
        minHeight: 384,
        borderRadius: 13,
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(circle at 50% 40%, #23232d 0%, #0d0d12 58%, #060609 100%)",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 16 }}>
        <span style={{ color: "rgba(255,255,255,.48)", fontSize: 10, fontWeight: 850, letterSpacing: ".16em" }}>UI LAYOUT / BUTTON 1</span>
        <LiquidGradientButton>Get Started</LiquidGradientButton>
      </div>
    </div>
  );
}
