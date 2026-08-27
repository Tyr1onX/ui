import { AuroraBackgroundDemo } from "./demos/aurora-background-demo";
import { ButtonOneDemo } from "./demos/button-one-demo";
import { ButtonSevenDemo } from "./demos/button-seven-demo";
import { CinematicThemeSwitcherDemo } from "./demos/cinematic-theme-switcher-demo";
import { CurtainThemeToggleDemo } from "./demos/curtain-theme-toggle-demo";
import { LiquidGlassButtonDemo } from "./demos/liquid-glass-button-demo";
import { LiquidGlassDemo } from "./demos/liquid-glass-demo";
import { MacOSDockDemo } from "./demos/mac-os-dock-demo";
import { OceanicCurrentsDemo } from "./demos/oceanic-currents-demo";
import { ParticleDriftDemo } from "./demos/particle-drift-demo";
import { SkyToggleDemo } from "./demos/sky-toggle-demo";
import { SparkBadgeDemo } from "./demos/spark-badge-demo";
import { TactileButtonDemo } from "./demos/tactile-button-demo";
import { ThemeToggleDemo } from "./demos/theme-toggle-demo";

const items = [
  {
    name: "Liquid Glass",
    description: "Dynamic liquid-glass dock and CTA inspired by Suraj Gaud's public Liquid Glass component.",
    tags: ["Effect", "Glass", "Dock"],
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
  {
    name: "Spark Badge",
    description: "Meng To's animated credential badge rebuilt from sparks and rain with a local Canvas renderer.",
    tags: ["Effect", "Canvas", "Particles"],
    source: "components/effects/spark-badge.tsx",
    Demo: SparkBadgeDemo,
  },
  {
    name: "Particle Drift",
    description: "Meng To's ASCII node field with rising beams, proximity links and pointer-connected particles.",
    tags: ["Effect", "Canvas", "Particles"],
    source: "components/effects/particle-drift.tsx",
    Demo: ParticleDriftDemo,
  },
  {
    name: "Theme Toggle",
    description: "Serenity-style animated moon and sun theme switch inspired by Ayushmaan Singh's public component.",
    tags: ["Toggle", "Theme", "Serenity"],
    source: "components/toggles/theme-toggle.tsx",
    Demo: ThemeToggleDemo,
  },
  {
    name: "Sky Toggle",
    description: "Playful day-to-night switch with sun, cloud layers, stars and a cratered moon.",
    tags: ["Toggle", "Theme", "Sky"],
    source: "components/toggles/sky-toggle.tsx",
    Demo: SkyToggleDemo,
  },
  {
    name: "Curtain Theme Toggle",
    description: "Theme switch that covers its target with a curtain before revealing the new appearance.",
    tags: ["Toggle", "Theme", "Transition"],
    source: "components/toggles/curtain-theme-toggle.tsx",
    Demo: CurtainThemeToggleDemo,
  },
  {
    name: "Cinematic Theme Switcher",
    description: "Tactile film-grain day/night switch adapted from Om Rohilla's public cinematic switcher.",
    tags: ["Toggle", "Theme", "Cinematic"],
    source: "components/toggles/cinematic-theme-switcher.tsx",
    Demo: CinematicThemeSwitcherDemo,
  },
  {
    name: "Liquid Glass Button",
    description: "Designali-style glass button using local SVG displacement, highlights and layered glass shadows.",
    tags: ["Button", "Glass", "Liquid"],
    source: "components/buttons/liquid-glass-button.tsx",
    Demo: LiquidGlassButtonDemo,
  },
  {
    name: "Button 1 — Liquid Gradient",
    description: "UI Layout's animated multicolor liquid-gradient button, adapted to run without Motion.",
    tags: ["Button", "Gradient", "Liquid"],
    source: "components/buttons/liquid-gradient-button.tsx",
    Demo: ButtonOneDemo,
  },
  {
    name: "Button 7 — Expand Arrow",
    description: "UI Layout's compact round arrow button that expands to reveal its label on hover.",
    tags: ["Button", "Hover", "Arrow"],
    source: "components/buttons/expand-arrow-button.tsx",
    Demo: ButtonSevenDemo,
  },
  {
    name: "Tactile Button",
    description: "Meng To's cyan tactile-fluid CTA rebuilt as a local WebGL surface with pointer slosh and click discharge.",
    tags: ["Button", "WebGL", "Tactile"],
    source: "components/buttons/tactile-button.tsx",
    Demo: TactileButtonDemo,
  },
  {
    name: "Mac OS Dock",
    description: "dhmnpunit's responsive Dock interaction with cosine magnification, bounce feedback and open-app indicators.",
    tags: ["Dock", "Navigation", "macOS"],
    source: "components/docks/mac-os-dock.tsx",
    Demo: MacOSDockDemo,
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
          <button type="button">Toggles</button>
          <button type="button">Docks</button>
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
