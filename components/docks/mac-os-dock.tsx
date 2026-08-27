"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

export interface MacOSDockApp {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface MacOSDockProps {
  apps: MacOSDockApp[];
  onAppClick?: (appId: string) => void;
  openApps?: string[];
  className?: string;
  iconSize?: number;
  maxScale?: number;
}

export function MacOSDock({
  apps,
  onAppClick,
  openApps = [],
  className = "",
  iconSize = 54,
  maxScale = 1.7,
}: MacOSDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const gap = Math.max(5, iconSize * 0.1);
  const effectWidth = iconSize * 4.4;

  const scales = useMemo(() => {
    if (mouseX === null) return apps.map(() => 1);
    return apps.map((_, index) => {
      const center = index * (iconSize + gap) + iconSize / 2;
      const minX = mouseX - effectWidth / 2;
      const maxX = mouseX + effectWidth / 2;
      if (center < minX || center > maxX) return 1;
      const theta = ((center - minX) / effectWidth) * Math.PI * 2;
      const influence = (1 - Math.cos(Math.max(0, Math.min(Math.PI * 2, theta)))) / 2;
      return 1 + influence * (maxScale - 1);
    });
  }, [apps, effectWidth, gap, iconSize, maxScale, mouseX]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = dockRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX(event.clientX - rect.left - 10);
  }, []);

  return (
    <div
      ref={dockRef}
      className={`mac-os-dock ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setMouseX(null)}
      style={{ "--dock-gap": `${gap}px` } as CSSProperties}
    >
      <div className="mac-os-dock__items">
        {apps.map((app, index) => {
          const scale = scales[index] ?? 1;
          const size = iconSize * scale;
          const isOpen = openApps.includes(app.id);
          return (
            <button
              type="button"
              className="mac-os-dock__item"
              key={app.id}
              title={app.name}
              aria-label={app.name}
              onClick={() => onAppClick?.(app.id)}
              style={{ width: size, height: size }}
            >
              <span className="mac-os-dock__icon" style={{ width: size, height: size }}>
                {app.icon}
              </span>
              {isOpen ? <span className="mac-os-dock__indicator" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>

      <style>{`
        .mac-os-dock {
          display:inline-flex;
          align-items:flex-end;
          max-width:100%;
          padding:10px;
          overflow:visible;
          border:1px solid rgba(255,255,255,.16);
          border-radius:22px;
          background:rgba(45,45,48,.72);
          box-shadow:0 18px 40px rgba(0,0,0,.35),0 5px 14px rgba(0,0,0,.26),inset 0 1px rgba(255,255,255,.14),inset 0 -1px rgba(0,0,0,.22);
          backdrop-filter:blur(18px) saturate(135%);
        }
        .mac-os-dock__items { display:flex; align-items:flex-end; gap:var(--dock-gap); min-height:54px; }
        .mac-os-dock__item {
          position:relative; flex:0 0 auto; display:flex; align-items:flex-end; justify-content:center;
          padding:0; border:0; background:transparent; cursor:pointer; transition:width .09s linear,height .09s linear,transform .2s ease;
          transform-origin:bottom center;
        }
        .mac-os-dock__item:active { transform:translateY(-8px); }
        .mac-os-dock__item:focus-visible { outline:2px solid rgba(255,255,255,.8); outline-offset:4px; border-radius:14px; }
        .mac-os-dock__icon {
          display:grid; place-items:center; overflow:hidden; border-radius:23%;
          filter:drop-shadow(0 5px 7px rgba(0,0,0,.28));
          transition:width .09s linear,height .09s linear,filter .09s linear;
        }
        .mac-os-dock__icon > * { width:100%; height:100%; }
        .mac-os-dock__indicator { position:absolute; left:50%; bottom:-6px; width:4px; height:4px; border-radius:50%; background:rgba(255,255,255,.86); box-shadow:0 0 4px rgba(0,0,0,.45); transform:translateX(-50%); }
        @media (prefers-reduced-motion:reduce) {
          .mac-os-dock__item,.mac-os-dock__icon { transition:none; }
        }
      `}</style>
    </div>
  );
}
