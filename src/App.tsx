import { useState } from "react";
import { LiquidGlass } from "../components/effects";

const dockItems = ["⌘", "F", "C", "M", "S", "⚙"];

export default function App() {
  const [blur, setBlur] = useState(3);
  const [distortion, setDistortion] = useState(200);
  const [tintOpacity, setTintOpacity] = useState(0.2);

  const glassProps = { blur, distortion, tintOpacity };

  return (
    <main className="preview-stage">
      <div className="background-grid" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="orb orb-c" aria-hidden="true" />

      <div className="page-shell">
        <LiquidGlass
          {...glassProps}
          className="topbar rounded-[28px]"
          contentClassName="w-full"
        >
          <div className="topbar-content">
            <div className="brand-mark">T</div>
            <div>
              <strong>Tyr1onX UI</strong>
              <span>Component Lab</span>
            </div>
            <nav>
              <a href="#preview">预览</a>
              <a href="#controls">参数</a>
              <a href="https://github.com/Tyr1onX/ui">GitHub</a>
            </nav>
          </div>
        </LiquidGlass>

        <section className="hero" id="preview">
          <div className="hero-copy">
            <span className="eyebrow">EFFECT / LIQUID GLASS</span>
            <h1>液态玻璃<br />真实效果预览</h1>
            <p>
              这是仓库里的正式 LiquidGlass 基础组件。下面所有卡片、Dock 和按钮都直接复用同一个实现。
            </p>
          </div>

          <LiquidGlass
            {...glassProps}
            className="hero-card rounded-[36px]"
            contentClassName="w-full"
          >
            <div className="hero-card-content">
              <span className="mini-label">LIVE SURFACE</span>
              <strong>Refraction</strong>
              <p>Blur · Tint · Edge Highlight · SVG Distortion</p>
              <div className="metric-row">
                <div><span>Blur</span><b>{blur}px</b></div>
                <div><span>Distortion</span><b>{distortion}</b></div>
                <div><span>Tint</span><b>{Math.round(tintOpacity * 100)}%</b></div>
              </div>
            </div>
          </LiquidGlass>
        </section>

        <section className="showcase-grid">
          <LiquidGlass
            {...glassProps}
            className="showcase-card rounded-[32px]"
            contentClassName="w-full h-full"
          >
            <div className="showcase-content">
              <span className="mini-label">CARD</span>
              <h2>玻璃卡片</h2>
              <p>适合信息面板、设置面板、弹窗和浮层。</p>
              <div className="fake-chart">
                <span style={{ height: "42%" }} />
                <span style={{ height: "67%" }} />
                <span style={{ height: "51%" }} />
                <span style={{ height: "82%" }} />
                <span style={{ height: "64%" }} />
                <span style={{ height: "94%" }} />
              </div>
            </div>
          </LiquidGlass>

          <div className="dock-area">
            <span className="section-caption">DOCK</span>
            <LiquidGlass
              {...glassProps}
              className="dock rounded-[30px]"
            >
              <div className="dock-icons">
                {dockItems.map((item, index) => (
                  <button key={index} aria-label={`Dock item ${index + 1}`}>
                    {item}
                  </button>
                ))}
              </div>
            </LiquidGlass>
          </div>

          <div className="button-area">
            <span className="section-caption">BUTTON</span>
            <LiquidGlass
              {...glassProps}
              className="glass-button rounded-full"
            >
              <button type="button">打开组件</button>
            </LiquidGlass>
          </div>
        </section>

        <section className="controls-panel" id="controls">
          <div>
            <span className="eyebrow">PLAYGROUND</span>
            <h2>实时调节效果</h2>
            <p>修改参数，页面上的玻璃组件会同步变化。</p>
          </div>

          <div className="controls">
            <label>
              <span><b>Blur</b><em>{blur}px</em></span>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={blur}
                onChange={(event) => setBlur(Number(event.target.value))}
              />
            </label>

            <label>
              <span><b>Distortion</b><em>{distortion}</em></span>
              <input
                type="range"
                min="0"
                max="350"
                step="10"
                value={distortion}
                onChange={(event) => setDistortion(Number(event.target.value))}
              />
            </label>

            <label>
              <span><b>Tint</b><em>{Math.round(tintOpacity * 100)}%</em></span>
              <input
                type="range"
                min="0"
                max="0.55"
                step="0.01"
                value={tintOpacity}
                onChange={(event) => setTintOpacity(Number(event.target.value))}
              />
            </label>
          </div>
        </section>
      </div>
    </main>
  );
}
