import { useMemo, useState, type ComponentType } from "react";
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
import { SpotlightDemo } from "./demos/spotlight-demo";
import { TactileButtonDemo } from "./demos/tactile-button-demo";
import { ThemeToggleDemo } from "./demos/theme-toggle-demo";

type Category = "effects" | "buttons" | "toggles" | "docks";
type Fidelity = "source" | "adapted" | "reproduction";

type GalleryItem = {
  name: string;
  author: string;
  category: Category;
  tags: string[];
  source: string;
  original: string;
  fidelity: Fidelity;
  Demo: ComponentType;
};

const items: GalleryItem[] = [
  { name: "Liquid Glass", author: "suraj-xd", category: "effects", tags: ["Glass", "Dock"], source: "components/effects/liquid-glass.tsx", original: "https://21st.dev/@suraj-xd/components/liquid-glass", fidelity: "source", Demo: LiquidGlassDemo },
  { name: "Aurora Background", author: "manuarora700", category: "effects", tags: ["Background", "Aurora"], source: "components/effects/aurora-background.tsx", original: "https://21st.dev/@manuarora700/components/aurora-background", fidelity: "source", Demo: AuroraBackgroundDemo },
  { name: "Oceanic Currents", author: "community / shaders", category: "effects", tags: ["Shader", "WebGL"], source: "components/effects/oceanic-currents.tsx", original: "https://21st.dev/community/shaders/oceanic-currents-5fc8773a-9561-4cba-9eec-27b7899021e3", fidelity: "reproduction", Demo: OceanicCurrentsDemo },
  { name: "Spark Badge", author: "mengto", category: "effects", tags: ["Canvas", "Particles"], source: "components/effects/spark-badge.tsx", original: "https://21st.dev/@mengto/components/spark-badge", fidelity: "adapted", Demo: SparkBadgeDemo },
  { name: "Particle Drift", author: "mengto", category: "effects", tags: ["Canvas", "Particles"], source: "components/effects/particle-drift.tsx", original: "https://21st.dev/@mengto/components/particle-drift", fidelity: "adapted", Demo: ParticleDriftDemo },
  { name: "Spotlight", author: "ibelick", category: "effects", tags: ["Cursor", "Spotlight"], source: "components/effects/spotlight.tsx", original: "https://21st.dev/@ibelick/components/spotlight", fidelity: "source", Demo: SpotlightDemo },
  { name: "Theme Toggle", author: "ayushmxxn", category: "toggles", tags: ["Theme", "Serenity"], source: "components/toggles/theme-toggle.tsx", original: "https://21st.dev/@ayushmxxn/components/theme-toggle", fidelity: "adapted", Demo: ThemeToggleDemo },
  { name: "Sky Toggle", author: "ravikatiyar162", category: "toggles", tags: ["Theme", "Sky"], source: "components/toggles/sky-toggle.tsx", original: "https://21st.dev/@ravikatiyar162/components/sky-toggle", fidelity: "source", Demo: SkyToggleDemo },
  { name: "Curtain Theme Toggle", author: "fatih-developer", category: "toggles", tags: ["Theme", "Transition"], source: "components/toggles/curtain-theme-toggle.tsx", original: "https://21st.dev/@fatih-developer/components/curtain-theme-toggle", fidelity: "reproduction", Demo: CurtainThemeToggleDemo },
  { name: "Cinematic Theme Switcher", author: "omrohilla6", category: "toggles", tags: ["Theme", "Cinematic"], source: "components/toggles/cinematic-theme-switcher.tsx", original: "https://21st.dev/@omrohilla6/components/cinematic-theme-switcher", fidelity: "adapted", Demo: CinematicThemeSwitcherDemo },
  { name: "Liquid Glass Button", author: "designali-in", category: "buttons", tags: ["Glass", "Liquid"], source: "components/buttons/liquid-glass-button.tsx", original: "https://21st.dev/@designali-in/components/liquid-glass-button", fidelity: "source", Demo: LiquidGlassButtonDemo },
  { name: "Button 1 · Github Liquid", author: "uilayout.contact", category: "buttons", tags: ["Liquid", "Motion"], source: "components/buttons/liquid-gradient-button.tsx", original: "https://21st.dev/@uilayout.contact/components/button-1", fidelity: "adapted", Demo: ButtonOneDemo },
  { name: "Button 7 · Expand Arrow", author: "uilayout.contact", category: "buttons", tags: ["Hover", "Arrow"], source: "components/buttons/expand-arrow-button.tsx", original: "https://21st.dev/@uilayout.contact/components/button-7", fidelity: "source", Demo: ButtonSevenDemo },
  { name: "Tactile Button", author: "mengto", category: "buttons", tags: ["WebGL", "Tactile"], source: "components/buttons/tactile-button.tsx", original: "https://21st.dev/@mengto/components/tactile-button", fidelity: "adapted", Demo: TactileButtonDemo },
  { name: "Mac OS Dock", author: "dhmnpunit", category: "docks", tags: ["Navigation", "macOS"], source: "components/docks/mac-os-dock.tsx", original: "https://21st.dev/@dhmnpunit/components/mac-os-dock", fidelity: "adapted", Demo: MacOSDockDemo },
];

const categoryLabels: Record<Category | "all", string> = {
  all: "全部组件",
  effects: "视觉效果",
  buttons: "按钮",
  toggles: "主题开关",
  docks: "Dock / 导航",
};

const fidelityLabels: Record<Fidelity | "all", string> = {
  all: "全部",
  source: "原版源码",
  adapted: "最小适配",
  reproduction: "复刻待核对",
};

export default function App() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [fidelity, setFidelity] = useState<Fidelity | "all">("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => ({
    all: items.length,
    effects: items.filter((item) => item.category === "effects").length,
    buttons: items.filter((item) => item.category === "buttons").length,
    toggles: items.filter((item) => item.category === "toggles").length,
    docks: items.filter((item) => item.category === "docks").length,
  }), []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (fidelity !== "all" && item.fidelity !== fidelity) return false;
      if (!keyword) return true;
      return [item.name, item.author, ...item.tags].some((value) => value.toLowerCase().includes(keyword));
    });
  }, [category, fidelity, query]);

  return (
    <div className="browser-shell">
      <header className="browser-topbar">
        <div className="brand-mark"><span className="brand-cube" /> <strong>TYR1ONX UI</strong></div>
        <div className="topbar-path">Components <span>/</span> {categoryLabels[category]}</div>
        <a href="https://github.com/Tyr1onX/ui" className="topbar-github">GitHub ↗</a>
      </header>

      <aside className="browser-sidebar">
        <div className="sidebar-title">Components</div>
        <label className="sidebar-search">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索组件" />
        </label>
        <nav className="sidebar-nav" aria-label="Component categories">
          {(Object.keys(categoryLabels) as Array<Category | "all">).map((key) => (
            <button key={key} type="button" className={category === key ? "active" : ""} onClick={() => setCategory(key)}>
              <span>{categoryLabels[key]}</span><em>{counts[key]}</em>
            </button>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <div className="sidebar-note">
          <strong>收录规则</strong>
          <p>21st 链接是视觉真值。公开上游存在时优先保留原实现，只做运行环境适配。</p>
        </div>
      </aside>

      <main className="browser-content">
        <section className="content-head">
          <div><span className="content-eyebrow">COMPONENT LIBRARY</span><h1>{categoryLabels[category]}</h1></div>
          <span className="result-count">{filtered.length} / {items.length}</span>
        </section>

        <div className="browser-tabs" role="tablist" aria-label="Fidelity filter">
          {(Object.keys(fidelityLabels) as Array<Fidelity | "all">).map((key) => (
            <button key={key} type="button" className={fidelity === key ? "active" : ""} onClick={() => setFidelity(key)}>{fidelityLabels[key]}</button>
          ))}
        </div>

        <section className="component-grid">
          {filtered.map(({ name, author, tags, source, original, fidelity: itemFidelity, Demo }) => (
            <article className="component-card" key={name}>
              <div className="component-preview">
                <div className="component-preview-inner"><Demo /></div>
              </div>
              <div className="component-card-footer">
                <div className="component-identity">
                  <strong>{name}</strong>
                  <span>@{author}</span>
                </div>
                <div className="component-actions">
                  <span className={`fidelity-dot ${itemFidelity}`} title={fidelityLabels[itemFidelity]} />
                  <a href={`https://github.com/Tyr1onX/ui/blob/main/${source}`} title="仓库源码">Code</a>
                  <a href={original} target="_blank" rel="noreferrer" title="21st 原页面">21st ↗</a>
                </div>
              </div>
              <div className="component-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </section>

        {filtered.length === 0 ? <div className="empty-state">没有匹配的组件。</div> : null}
      </main>
    </div>
  );
}
