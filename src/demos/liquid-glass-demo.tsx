import { LiquidGlass } from "../../components/effects";

const dockItems = [
  { label: "AI", className: "icon-ai" },
  { label: "F", className: "icon-finder" },
  { label: "C", className: "icon-chat" },
  { label: "M", className: "icon-maps" },
  { label: "S", className: "icon-safari" },
  { label: "ST", className: "icon-steam" },
];

export function LiquidGlassDemo() {
  return (
    <div className="liquid-demo-stage">
      <div className="liquid-demo-background" aria-hidden="true" />
      <div className="liquid-demo-shade" aria-hidden="true" />

      <div className="liquid-demo-content">
        <LiquidGlass className="liquid-demo-dock rounded-3xl p-3">
          <div className="liquid-demo-icons">
            {dockItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`liquid-demo-icon ${item.className}`}
                aria-label={item.label}
              >
                {item.label}
              </button>
            ))}
          </div>
        </LiquidGlass>

        <LiquidGlass className="liquid-demo-button rounded-3xl px-10 py-6">
          <button type="button">How can I help you today?</button>
        </LiquidGlass>
      </div>
    </div>
  );
}
