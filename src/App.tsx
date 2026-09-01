import { useEffect, useMemo, useState, type ComponentType, type MouseEvent } from "react";
import { getComponentSource } from "./component-sources";
import { AnimatedGlowCardDemo } from "./demos/animated-glow-card-demo";
import { AnimatedGradientBorderDemo } from "./demos/animated-gradient-border-demo";
import { AuroraBackgroundDemo } from "./demos/aurora-background-demo";
import { ButtonOneDemo } from "./demos/button-one-demo";
import { ButtonSevenDemo } from "./demos/button-seven-demo";
import { CardStackDemo } from "./demos/card-stack-demo";
import { CinematicThemeSwitcherDemo } from "./demos/cinematic-theme-switcher-demo";
import { CurtainThemeToggleDemo } from "./demos/curtain-theme-toggle-demo";
import { DynamicIslandDemo } from "./demos/dynamic-island-demo";
import { FlippingCardDemo } from "./demos/flipping-card-demo";
import { GooeyDockDemo } from "./demos/gooey-dock-demo";
import { HandwritingTextDemo } from "./demos/handwriting-text-demo";
import { InteractiveSelectorDemo } from "./demos/interactive-selector-demo";
import { LiquidGlassButtonDemo } from "./demos/liquid-glass-button-demo";
import { LiquidGlassCardDemo } from "./demos/liquid-glass-card-demo";
import { LiquidGlassDemo } from "./demos/liquid-glass-demo";
import { LiquidGooeyDemo } from "./demos/liquid-gooey-demo";
import { MacOSDockDemo } from "./demos/mac-os-dock-demo";
import { MorphingSquareDemo } from "./demos/morphing-square-demo";
import { OceanicCurrentsDemo } from "./demos/oceanic-currents-demo";
import { ParticleDriftDemo } from "./demos/particle-drift-demo";
import { PlayingCardDemo } from "./demos/playing-card-demo";
import { ProgressiveFluxLoaderDemo } from "./demos/progressive-flux-loader-demo";
import { SkyToggleDemo } from "./demos/sky-toggle-demo";
import { SparkBadgeDemo } from "./demos/spark-badge-demo";
import { SpotlightDemo } from "./demos/spotlight-demo";
import { TactileButtonDemo } from "./demos/tactile-button-demo";
import { ThemeToggleDemo } from "./demos/theme-toggle-demo";

type Category = "effects" | "cards" | "status" | "borders" | "buttons" | "toggles" | "docks" | "loaders" | "selectors" | "text";
type Fidelity = "source" | "adapted" | "reproduction";
type DetailTab = "preview" | "code";

type GalleryItem = {
  name: string;
  author: string;
  category: Category;
  tags: string[];
  source: string;
  original: string;
  originalLabel?: string;
  fidelity: Fidelity;
  Demo: ComponentType;
};

const items: GalleryItem[] = [
  { name: "Playing Card", author: "maxim.bort.devel", category: "cards", tags: ["Card", "Event", "RedPalm"], source: "components/cards/playing-card.tsx", original: "https://21st.dev/@maxim.bort.devel/components/playing-card", fidelity: "reproduction", Demo: PlayingCardDemo },
  { name: "Flipping Card", author: "aghasisahakyan1", category: "cards", tags: ["Card", "Flip", "RedPalm"], source: "components/cards/flipping-card.tsx", original: "https://21st.dev/@aghasisahakyan1/components/flipping-card", fidelity: "source", Demo: FlippingCardDemo },
  { name: "Card Stack", author: "ruixen.ui", category: "cards", tags: ["Card", "Stack", "Drag", "RedPalm"], source: "components/cards/card-stack.tsx", original: "https://21st.dev/@ruixen.ui/components/card-stack", fidelity: "adapted", Demo: CardStackDemo },
  { name: "Animated Glow Card", author: "easemize", category: "cards", tags: ["Card", "Glow", "Active", "RedPalm"], source: "components/cards/animated-glow-card.tsx", original: "https://21st.dev/@easemize/components/animated-glow-card", fidelity: "adapted", Demo: AnimatedGlowCardDemo },
  { name: "Liquid Glass Card", author: "aliimam", category: "cards", tags: ["Card", "Glass", "Liquid", "RedPalm"], source: "components/cards/liquid-glass-card.tsx", original: "https://21st.dev/community/components/aliimam/liquid-glass-card/default", fidelity: "reproduction", Demo: LiquidGlassCardDemo },
  { name: "Dynamic Island", author: "aghasisahakyan1", category: "status", tags: ["HUD", "Status", "Motion", "RedPalm"], source: "components/status/dynamic-island.tsx", original: "https://21st.dev/@aghasisahakyan1/components/dynamic-island", fidelity: "adapted", Demo: DynamicIslandDemo },
  { name: "Animated Gradient Border", author: "easemize", category: "borders", tags: ["Border", "Gradient", "Active", "RedPalm"], source: "components/borders/animated-gradient-border.tsx", original: "https://21st.dev/@easemize/components/animated-gradient-border", fidelity: "source", Demo: AnimatedGradientBorderDemo },
  { name: "Gooey Dock", author: "ruixen.ui", category: "docks", tags: ["Navigation", "Motion", "RedPalm"], source: "components/docks/gooey-dock.tsx", original: "https://21st.dev/@ruixen.ui/components/gooey-dock", fidelity: "source", Demo: GooeyDockDemo },
  { name: "Interactive Selector", author: "minhxthanh", category: "selectors", tags: ["Selector", "Cards", "Interaction", "Images"], source: "components/selectors/interactive-selector.tsx", original: "https://21st.dev/@minhxthanh/components/interactive-selector", fidelity: "adapted", Demo: InteractiveSelectorDemo },
  { name: "Handwriting Text", author: "Moazzam", category: "text", tags: ["Typography", "Text", "Animation", "SVG"], source: "components/text/handwriting-text.tsx", original: "https://21st.dev/@davailospirasto/components/handwriting-text", fidelity: "reproduction", Demo: HandwritingTextDemo },
  { name: "Liquid Glass", author: "suraj-xd", category: "effects", tags: ["Glass", "Dock"], source: "components/effects/liquid-glass.tsx", original: "https://21st.dev/@suraj-xd/components/liquid-glass", fidelity: "source", Demo: LiquidGlassDemo },
  { name: "Liquid Gooey", author: "Jakub Antalik", category: "effects", tags: ["Liquid", "Gooey", "Morph", "Motion", "RedPalm"], source: "components/effects/liquid-gooey.tsx", original: "https://gooey.jakubantalik.com/", originalLabel: "Demo", fidelity: "adapted", Demo: LiquidGooeyDemo },
  { name: "Aurora Background", author: "manuarora700", category: "effects", tags: ["Background", "Aurora"], source: "components/effects/aurora-background.tsx", original: "https://21st.dev/@manuarora700/components/aurora-background", fidelity: "source", Demo: AuroraBackgroundDemo },
  { name: "Oceanic Currents", author: "community / shaders", category: "effects", tags: ["Shader", "WebGL"], source: "components/effects/oceanic-currents.tsx", original: "https://21st.dev/community/shaders/oceanic-currents-5fc8773a-9561-4cba-9eec-27b7899021e3", fidelity: "reproduction", Demo: OceanicCurrentsDemo },
  { name: "Spark Badge", author: "mengto", category: "effects", tags: ["Canvas", "Particles"], source: "components/effects/spark-badge.tsx", original: "https://21st.dev/@mengto/components/spark-badge", fidelity: "adapted", Demo: SparkBadgeDemo },
  { name: "Particle Drift", author: "mengto", category: "effects", tags: ["Canvas", "Particles"], source: "components/effects/particle-drift.tsx", original: "https://21st.dev/@mengto/components/particle-drift", fidelity: "adapted", Demo: ParticleDriftDemo },
  { name: "Spotlight", author: "ibelick", category: "effects", tags: ["Cursor", "Spotlight"], source: "components/effects/spotlight.tsx", original: "https://21st.dev/@ibelick/components/spotlight", fidelity: "source", Demo: SpotlightDemo },
  { name: "Progressive Flux Loader", author: "ruixen.ui", category: "loaders", tags: ["Progress", "Motion"], source: "components/loaders/progressive-flux-loader.tsx", original: "https://21st.dev/@ruixen.ui/components/progressive-flux-loader", fidelity: "source", Demo: ProgressiveFluxLoaderDemo },
  { name: "Morphing Square", author: "molecule-lab-rushil", category: "loaders", tags: ["Loader", "Motion"], source: "components/loaders/morphing-square.tsx", original: "https://21st.dev/@molecule-lab-rushil/components/morphing-square", fidelity: "source", Demo: MorphingSquareDemo },
  { name: "Theme Toggle", author: "ayushmxxn", category: "toggles", tags: ["Theme", "Serenity"], source: "components/toggles/theme-toggle.tsx", original: "https://21st.dev/@ayushmxxn/components/theme-toggle", fidelity: "adapted", Demo: ThemeToggleDemo },
  { name: "Sky Toggle", author: "ravikatiyar162", category: "toggles", tags: ["Theme", "Sky"], source: "components/toggles/sky-toggle.tsx", original: "https://21st.dev/@ravikatiyar162/components/sky-toggle", fidelity: "source", Demo: SkyToggleDemo },
  { name: "Curtain Theme Toggle", author: "fatih-developer", category: "toggles", tags: ["Theme", "Transition"], source: "components/toggles/curtain-theme-toggle.tsx", original: "https://21st.dev/@fatih-developer/components/curtain-theme-toggle", fidelity: "adapted", Demo: CurtainThemeToggleDemo },
  { name: "Cinematic Theme Switcher", author: "omrohilla6", category: "toggles", tags: ["Theme", "Cinematic"], source: "components/toggles/cinematic-theme-switcher.tsx", original: "https://21st.dev/@omrohilla6/components/cinematic-theme-switcher", fidelity: "adapted", Demo: CinematicThemeSwitcherDemo },
  { name: "Liquid Glass Button", author: "designali-in", category: "buttons", tags: ["Glass", "Liquid", "RedPalm"], source: "components/buttons/liquid-glass-button.tsx", original: "https://21st.dev/@designali-in/components/liquid-glass-button", fidelity: "source", Demo: LiquidGlassButtonDemo },
  { name: "Button 1 · Github Liquid", author: "uilayout.contact", category: "buttons", tags: ["Liquid", "Motion"], source: "components/buttons/liquid-gradient-button.tsx", original: "https://21st.dev/@uilayout.contact/components/button-1", fidelity: "adapted", Demo: ButtonOneDemo },
  { name: "Button 7 · Expand Arrow", author: "uilayout.contact", category: "buttons", tags: ["Hover", "Arrow"], source: "components/buttons/expand-arrow-button.tsx", original: "https://21st.dev/@uilayout.contact/components/button-7", fidelity: "source", Demo: ButtonSevenDemo },
  { name: "Tactile Button", author: "mengto", category: "buttons", tags: ["WebGL", "Tactile"], source: "components/buttons/tactile-button.tsx", original: "https://21st.dev/@mengto/components/tactile-button", fidelity: "adapted", Demo: TactileButtonDemo },
  { name: "Mac OS Dock", author: "dhmnpunit", category: "docks", tags: ["Navigation", "macOS"], source: "components/docks/mac-os-dock.tsx", original: "https://21st.dev/@dhmnpunit/components/mac-os-dock", fidelity: "source", Demo: MacOSDockDemo },
];

const categoryLabels: Record<Category | "all", string> = {
  all: "全部组件",
  effects: "视觉效果",
  cards: "卡片 / 事件",
  status: "状态 / HUD",
  borders: "边框",
  buttons: "按钮",
  toggles: "主题开关",
  docks: "Dock / 导航",
  loaders: "加载器",
  selectors: "选择器",
  text: "文字 / 排版",
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
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("preview");
  const [copied, setCopied] = useState(false);

  const counts = useMemo(() => {
    const result = { all: items.length } as Record<Category | "all", number>;
    (Object.keys(categoryLabels) as Array<Category | "all">).forEach((key) => {
      if (key !== "all") result[key] = items.filter((item) => item.category === key).length;
    });
    return result;
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (fidelity !== "all" && item.fidelity !== fidelity) return false;
      if (!keyword) return true;
      return [item.name, item.author, ...item.tags].some((value) => value.toLowerCase().includes(keyword));
    });
  }, [category, fidelity, query]);

  const selectedSource = selectedItem ? getComponentSource(selectedItem.source) : "";

  useEffect(() => {
    if (!selectedItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem]);

  function openItem(item: GalleryItem) {
    setSelectedItem(item);
    setDetailTab("preview");
    setCopied(false);
  }

  function handleCardClick(event: MouseEvent<HTMLElement>, item: GalleryItem) {
    const target = event.target as HTMLElement;
    if (target.closest("a,button,input,textarea,select,[role='button']")) return;
    openItem(item);
  }

  async function copySelectedSource() {
    if (!selectedSource) return;
    try {
      await navigator.clipboard.writeText(selectedSource);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = selectedSource;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

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
          {filtered.map((item) => {
            const { name, author, tags, source, original, originalLabel, fidelity: itemFidelity, Demo } = item;
            return (
              <article
                className="component-card"
                key={name}
                tabIndex={0}
                role="button"
                aria-label={`打开 ${name} 大预览`}
                onClick={(event) => handleCardClick(event, item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openItem(item);
                  }
                }}
              >
                <div className="component-preview"><div className="component-preview-inner"><Demo /></div></div>
                <div className="component-card-footer">
                  <div className="component-identity"><strong>{name}</strong><span>@{author}</span></div>
                  <div className="component-actions">
                    <span className={`fidelity-dot ${itemFidelity}`} title={fidelityLabels[itemFidelity]} />
                    <button type="button" onClick={() => openItem(item)} title="放大预览">Preview</button>
                    <a href={`https://github.com/Tyr1onX/ui/blob/main/${source}`} onClick={(event) => event.stopPropagation()} title="仓库源码">Code</a>
                    <a href={original} onClick={(event) => event.stopPropagation()} target="_blank" rel="noreferrer" title="原始页面">{originalLabel ?? "21st"} ↗</a>
                  </div>
                </div>
                <div className="component-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            );
          })}
        </section>
        {filtered.length === 0 ? <div className="empty-state">没有匹配的组件。</div> : null}
      </main>

      {selectedItem ? (
        <div className="component-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedItem(null); }}>
          <section className="component-modal" role="dialog" aria-modal="true" aria-label={`${selectedItem.name} 组件详情`}>
            <header className="component-modal-header">
              <div className="component-modal-title">
                <strong>{selectedItem.name}</strong>
                <span>@{selectedItem.author}</span>
              </div>
              <div className="component-modal-actions">
                <button className="primary" type="button" onClick={copySelectedSource} disabled={!selectedSource}>{copied ? "已复制" : "复制源码"}</button>
                <a href={`https://github.com/Tyr1onX/ui/blob/main/${selectedItem.source}`} target="_blank" rel="noreferrer">GitHub 源码 ↗</a>
                <a href={selectedItem.original} target="_blank" rel="noreferrer">{selectedItem.originalLabel ?? "21st 来源"} ↗</a>
                <button className="close" type="button" onClick={() => setSelectedItem(null)} aria-label="关闭">×</button>
              </div>
            </header>

            <div className="component-modal-subbar">
              <div className="component-modal-tabs" role="tablist" aria-label="预览与源码">
                <button type="button" className={detailTab === "preview" ? "active" : ""} onClick={() => setDetailTab("preview")}>预览</button>
                <button type="button" className={detailTab === "code" ? "active" : ""} onClick={() => setDetailTab("code")}>源码</button>
              </div>
              <div className="component-modal-meta">
                <span className={`fidelity-dot ${selectedItem.fidelity}`} />
                <span>{fidelityLabels[selectedItem.fidelity]}</span>
                {selectedItem.tags.map((tag) => <em key={tag}>{tag}</em>)}
              </div>
            </div>

            {detailTab === "preview" ? (
              <div className="component-modal-preview"><selectedItem.Demo /></div>
            ) : (
              <div className="component-modal-code">
                <div className="component-modal-codebar"><span>{selectedItem.source}</span><button type="button" onClick={copySelectedSource}>{copied ? "已复制" : "复制"}</button></div>
                <pre><code>{selectedSource || "未能载入该组件源码。"}</code></pre>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
