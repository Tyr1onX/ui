"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

export type CurtainTheme = "light" | "dark";

export interface CurtainThemeToggleProps {
  theme?: CurtainTheme;
  defaultTheme?: CurtainTheme;
  onThemeChange?: (theme: CurtainTheme) => void;
  buttonSize?: number;
  duration?: number;
  className?: string;
  /** Portal into a positioned element to contain the curtain; defaults to document.body. */
  portalTarget?: HTMLElement | null;
}

const CURTAIN_COLORS: Record<CurtainTheme, string> = {
  light: "#f7f7f4",
  dark: "#111318",
};

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

/**
 * Curtain-style theme transition inspired by Fatih's public 21st.dev component.
 * The curtain can cover the viewport or be portaled into a preview container.
 */
export function CurtainThemeToggle({
  theme,
  defaultTheme = "light",
  onThemeChange,
  buttonSize = 42,
  duration = 520,
  className = "",
  portalTarget,
}: CurtainThemeToggleProps) {
  const [internalTheme, setInternalTheme] = useState<CurtainTheme>(defaultTheme);
  const resolvedTheme = theme ?? internalTheme;
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(false);
  const [curtainTheme, setCurtainTheme] = useState<CurtainTheme>(resolvedTheme);
  const curtainRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    setMounted(true);
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const timer = window.setTimeout(fn, delay);
    timersRef.current.push(timer);
  }, []);

  const toggle = useCallback(() => {
    if (animating) return;

    const next: CurtainTheme = resolvedTheme === "light" ? "dark" : "light";
    setCurtainTheme(next);
    setAnimating(true);
    setCurtainVisible(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const curtain = curtainRef.current;
        if (!curtain) return;
        curtain.style.transformOrigin = "top";
        curtain.style.transform = "scaleY(1)";

        schedule(() => {
          if (theme === undefined) setInternalTheme(next);
          onThemeChange?.(next);

          requestAnimationFrame(() => {
            const activeCurtain = curtainRef.current;
            if (!activeCurtain) return;
            activeCurtain.style.transition = "none";
            activeCurtain.style.transformOrigin = "bottom";
            activeCurtain.style.transform = "scaleY(1)";
            activeCurtain.getBoundingClientRect();
            activeCurtain.style.transition = `transform ${duration}ms ${EASING}`;
            activeCurtain.style.transform = "scaleY(0)";
          });

          schedule(() => {
            setCurtainVisible(false);
            setAnimating(false);
          }, duration + 40);
        }, duration);
      });
    });
  }, [animating, duration, onThemeChange, resolvedTheme, schedule, theme]);

  const target = mounted ? (portalTarget ?? document.body) : null;
  const isContained = Boolean(portalTarget);

  const curtainStyle: CSSProperties = {
    position: isContained ? "absolute" : "fixed",
    inset: 0,
    zIndex: 99999,
    pointerEvents: "none",
    background: CURTAIN_COLORS[curtainTheme],
    transform: "scaleY(0)",
    transformOrigin: "top",
    transition: `transform ${duration}ms ${EASING}`,
  };

  return (
    <>
      {target && curtainVisible
        ? createPortal(<div ref={curtainRef} aria-hidden="true" style={curtainStyle} />, target)
        : null}

      <button
        type="button"
        className={`curtain-theme-toggle ${className}`}
        data-theme={resolvedTheme}
        data-animating={animating ? "true" : "false"}
        onClick={toggle}
        aria-label={resolvedTheme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        aria-pressed={resolvedTheme === "dark"}
        disabled={animating}
        style={{ width: buttonSize, height: buttonSize }}
      >
        <span className="curtain-theme-toggle__icon curtain-theme-toggle__icon--moon" aria-hidden="true"><MoonIcon /></span>
        <span className="curtain-theme-toggle__icon curtain-theme-toggle__icon--sun" aria-hidden="true"><SunIcon /></span>
        <span className="curtain-theme-toggle__ring" aria-hidden="true" />

        <style>{`
          .curtain-theme-toggle {
            position: relative;
            display: grid;
            place-items: center;
            padding: 0;
            overflow: hidden;
            border: 1px solid rgba(15, 23, 42, .12);
            border-radius: 12px;
            color: #1f2937;
            background: rgba(255,255,255,.74);
            box-shadow: 0 8px 24px rgba(15,23,42,.08), inset 0 1px rgba(255,255,255,.8);
            backdrop-filter: blur(12px);
            cursor: pointer;
            transition: transform .18s ease, color .28s ease, background .28s ease, border-color .28s ease;
          }

          .curtain-theme-toggle:hover:not(:disabled) { transform: translateY(-1px) scale(1.04); }
          .curtain-theme-toggle:active:not(:disabled) { transform: scale(.96); }
          .curtain-theme-toggle:disabled { cursor: default; }
          .curtain-theme-toggle[data-theme="dark"] {
            border-color: rgba(255,255,255,.12);
            color: #f8fafc;
            background: rgba(25,28,35,.82);
            box-shadow: 0 8px 24px rgba(0,0,0,.24), inset 0 1px rgba(255,255,255,.08);
          }

          .curtain-theme-toggle:focus-visible {
            outline: 3px solid rgba(249, 115, 22, .28);
            outline-offset: 3px;
          }

          .curtain-theme-toggle__icon {
            position: absolute;
            display: grid;
            place-items: center;
            width: 18px;
            height: 18px;
            transition: opacity .28s ease, transform .42s cubic-bezier(.34,1.56,.64,1);
          }

          .curtain-theme-toggle__icon svg { width: 100%; height: 100%; }
          .curtain-theme-toggle__icon--moon { opacity: 1; transform: translateY(0) rotate(0deg); }
          .curtain-theme-toggle__icon--sun { opacity: 0; transform: translateY(18px) rotate(-55deg); color: #f59e0b; }
          .curtain-theme-toggle[data-theme="dark"] .curtain-theme-toggle__icon--moon { opacity: 0; transform: translateY(-18px) rotate(55deg); }
          .curtain-theme-toggle[data-theme="dark"] .curtain-theme-toggle__icon--sun { opacity: 1; transform: translateY(0) rotate(0deg); }

          .curtain-theme-toggle__ring {
            position: absolute;
            inset: 3px;
            border: 1px solid transparent;
            border-radius: 9px;
            transition: border-color .2s ease;
          }

          .curtain-theme-toggle:hover .curtain-theme-toggle__ring { border-color: rgba(249,115,22,.18); }

          @media (prefers-reduced-motion: reduce) {
            .curtain-theme-toggle,
            .curtain-theme-toggle * { transition-duration: .01ms !important; }
          }
        `}</style>
      </button>
    </>
  );
}
