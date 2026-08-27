import { AuroraBackgroundDemo } from "./demos/aurora-background-demo";
import { LiquidGlassDemo } from "./demos/liquid-glass-demo";
import { OceanicCurrentsDemo } from "./demos/oceanic-currents-demo";

const items = [
  {
    name: "Liquid Glass",
    description: "Apple-like translucent surface with blur, tint, edge highlights and SVG distortion.",
    tags: ["Effect", "Glass", "Apple"],
    source: "components/effects/liquid-glass.tsx",
    Demo: LiquidGlassDemo,
  },
  {
    name: "Aurora Background",
    description: "Aceternity UI's layered animated aurora background, kept inside a single gallery tile.",
    tags: ["Effect", "Background", "Aurora"],
    source: "components/effects/aurora-background.tsx",
    Demo: AuroraBackgroundDemo,
  },
  {
    name: "Oceanic Currents",
    description: "Zero-dependency WebGL smoke field inspired by Serafim's Oceanic Currents shader preset on 21st.dev.",
    tags: ["Effect", "Shader", "WebGL"],
    source: "components/effects/oceanic-currents.tsx",
    Demo: OceanicCurrentsDemo,
  },
];

export default function App() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div>
          <span className="site-kicker">TYR1ONX / UI</span>
          <h1>UI Components</h1>
          <p>Small reusable interface elements and visual effects.</p>
        </div>
        <a className="github-link" href="https://github.com/Tyr1onX/ui">
          GitHub
        </a>
      </header>

      <section className="library-toolbar">
        <div className="toolbar-copy">
          <strong>All components</strong>
          <span>{items.length} {items.length === 1 ? "item" : "items"}</span>
        </div>
        <div className="filter-pills" aria-label="Component filters">
          <button className="active" type="button">All</button>
          <button type="button">Effects</button>
          <button type="button">Buttons</button>
          <button type="button">Cards</button>
        </div>
      </section>

      <section className="component-grid">
        {items.map(({ name, description, tags, source, Demo }) => (
          <article className="component-card" key={name}>
            <div className="component-preview">
              <Demo />
            </div>

            <div className="component-meta">
              <div>
                <h2>{name}</h2>
                <p>{description}</p>
              </div>
              <div className="component-footer">
                <div className="tag-list">
                  {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a href={`https://github.com/Tyr1onX/ui/blob/main/${source}`}>
                  View source
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
