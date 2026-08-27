"use client";

import { useState } from "react";

export interface ThemeToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  size?: number;
}

/**
 * Serenity-style light/dark toggle inspired by Ayushmaan Singh's public
 * Theme Toggle preview. Dependency-free so it can be copied into plain React.
 */
export function ThemeToggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  className = "",
  size = 46,
}: ThemeToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isDark = checked ?? internalChecked;

  const update = () => {
    const next = !isDark;
    if (checked === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      className={`serenity-theme-toggle ${className}`}
      data-dark={isDark ? "true" : "false"}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={update}
      style={{
        width: size * 2.05,
        height: size,
        borderRadius: size,
      }}
    >
      <span className="serenity-theme-toggle__icon serenity-theme-toggle__icon--moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
        </svg>
      </span>

      <span className="serenity-theme-toggle__icon serenity-theme-toggle__icon--sun" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>

      <span className="serenity-theme-toggle__thumb" aria-hidden="true">
        <span className="serenity-theme-toggle__thumb-moon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
          </svg>
        </span>
        <span className="serenity-theme-toggle__thumb-sun">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </span>
      </span>

      <style>{`
        .serenity-theme-toggle {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px;
          border: 1px solid rgba(15, 23, 42, .12);
          color: #697386;
          background: #f1f3f6;
          box-shadow: inset 0 1px 2px rgba(15, 23, 42, .08), 0 1px 2px rgba(15, 23, 42, .05);
          cursor: pointer;
          transition: background .42s cubic-bezier(.22,1,.36,1), border-color .42s ease, box-shadow .42s ease;
          isolation: isolate;
        }

        .serenity-theme-toggle[data-dark="true"] {
          border-color: rgba(255,255,255,.11);
          color: #8f98aa;
          background: #151820;
          box-shadow: inset 0 1px 2px rgba(0,0,0,.45), 0 1px 2px rgba(0,0,0,.14);
        }

        .serenity-theme-toggle:focus-visible {
          outline: 3px solid rgba(99, 102, 241, .28);
          outline-offset: 3px;
        }

        .serenity-theme-toggle__icon {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          width: 38%;
          height: 100%;
          transition: opacity .32s ease, transform .46s cubic-bezier(.34,1.56,.64,1);
        }

        .serenity-theme-toggle__icon svg {
          width: 43%;
          height: 43%;
        }

        .serenity-theme-toggle__icon--moon {
          opacity: .45;
        }

        .serenity-theme-toggle__icon--sun {
          color: #9a7c10;
          opacity: .78;
        }

        .serenity-theme-toggle[data-dark="true"] .serenity-theme-toggle__icon--moon {
          color: #cbd5e1;
          opacity: .9;
        }

        .serenity-theme-toggle[data-dark="true"] .serenity-theme-toggle__icon--sun {
          opacity: .35;
        }

        .serenity-theme-toggle__thumb {
          position: absolute;
          z-index: 2;
          top: 4px;
          left: 4px;
          display: grid;
          place-items: center;
          width: calc(50% - 4px);
          height: calc(100% - 8px);
          overflow: hidden;
          border-radius: 999px;
          color: #334155;
          background: #fff;
          box-shadow: 0 4px 12px rgba(15,23,42,.16), inset 0 1px rgba(255,255,255,.8);
          transform: translateX(0);
          transition: transform .48s cubic-bezier(.34,1.56,.64,1), color .35s ease, background .35s ease;
        }

        .serenity-theme-toggle[data-dark="true"] .serenity-theme-toggle__thumb {
          color: #fde68a;
          background: #252936;
          transform: translateX(100%);
          box-shadow: 0 4px 14px rgba(0,0,0,.42), inset 0 1px rgba(255,255,255,.07);
        }

        .serenity-theme-toggle__thumb > span {
          position: absolute;
          display: grid;
          place-items: center;
          width: 52%;
          height: 52%;
          transition: opacity .28s ease, transform .46s cubic-bezier(.34,1.56,.64,1);
        }

        .serenity-theme-toggle__thumb svg {
          width: 100%;
          height: 100%;
        }

        .serenity-theme-toggle__thumb-moon {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .serenity-theme-toggle__thumb-sun {
          opacity: 0;
          transform: rotate(-90deg) scale(.6);
        }

        .serenity-theme-toggle[data-dark="true"] .serenity-theme-toggle__thumb-moon {
          opacity: 0;
          transform: rotate(70deg) scale(.6);
        }

        .serenity-theme-toggle[data-dark="true"] .serenity-theme-toggle__thumb-sun {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .serenity-theme-toggle,
          .serenity-theme-toggle * {
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </button>
  );
}
