import { ExpandArrowButton } from "../../components/buttons";

export function ButtonSevenDemo() {
  return (
    <div
      style={{
        minHeight: 384,
        borderRadius: 13,
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(145deg,#f1f3ff 0%,#dce2ff 55%,#cbd4ff 100%)",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 16 }}>
        <span style={{ color: "#6570a8", fontSize: 10, fontWeight: 850, letterSpacing: ".16em" }}>UI LAYOUT / BUTTON 7</span>
        <ExpandArrowButton />
      </div>
    </div>
  );
}
