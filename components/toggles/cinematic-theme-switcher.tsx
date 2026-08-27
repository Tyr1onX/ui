"use client";

import { useState } from "react";

export interface CinematicThemeSwitcherProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function CinematicThemeSwitcher({
  checked,
  defaultChecked = false,
  onCheckedChange,
  className = "",
}: CinematicThemeSwitcherProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const [burst, setBurst] = useState(0);
  const dark = checked ?? internal;

  const toggle = () => {
    const next = !dark;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
    setBurst((value) => value + 1);
  };

  return (
    <button
      type="button"
      className={`cinematic-theme-switcher ${className}`}
      data-dark={dark ? "true" : "false"}
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="cinematic-theme-switcher__track" aria-hidden="true">
        <span className="cinematic-theme-switcher__sun">☀</span>
        <span className="cinematic-theme-switcher__moon">☾</span>
        <span className="cinematic-theme-switcher__thumb">
          <span className="cinematic-theme-switcher__grain" />
          <span className="cinematic-theme-switcher__thumb-icon">{dark ? "☾" : "☀"}</span>
          <span key={burst} className="cinematic-theme-switcher__burst" />
        </span>
      </span>

      <style>{`
        .cinematic-theme-switcher { padding: 0; border: 0; background: transparent; cursor: pointer; }
        .cinematic-theme-switcher:focus-visible { outline: 3px solid rgba(148,163,184,.35); outline-offset: 5px; border-radius: 999px; }
        .cinematic-theme-switcher__track {
          position: relative; display: flex; align-items: center; justify-content: space-between;
          width: 104px; height: 64px; padding: 6px 14px; overflow: hidden; border-radius: 999px;
          color: #5f6672; border: 2px solid rgba(203,213,225,.62);
          background: radial-gradient(ellipse at top left,#fff 0%,#f1f5f9 42%,#cbd5e1 100%);
          box-shadow: inset 5px 5px 12px rgba(148,163,184,.45), inset -5px -5px 12px rgba(255,255,255,.95), 0 14px 30px rgba(15,23,42,.12);
          transition: .38s ease;
        }
        .cinematic-theme-switcher[data-dark="true"] .cinematic-theme-switcher__track {
          color: #d6c88b; border-color: rgba(71,85,105,.65);
          background: radial-gradient(ellipse at top left,#1e293b 0%,#0f172a 44%,#020617 100%);
          box-shadow: inset 5px 5px 12px rgba(0,0,0,.85), inset -5px -5px 12px rgba(71,85,105,.3), 0 18px 38px rgba(0,0,0,.3);
        }
        .cinematic-theme-switcher__sun,.cinematic-theme-switcher__moon { position: relative; z-index: 1; font-size: 20px; line-height: 1; opacity: .8; }
        .cinematic-theme-switcher__thumb {
          position: absolute; z-index: 2; top: 8px; left: 8px; display: grid; place-items: center;
          width: 44px; height: 44px; overflow: hidden; border-radius: 50%; color: #d99513;
          background: linear-gradient(145deg,#fff,#f8fafc);
          border: 2px solid rgba(255,255,255,.9);
          box-shadow: inset 2px 2px 4px rgba(203,213,225,.3), 0 8px 22px rgba(15,23,42,.18);
          transform: translateX(0); transition: transform .52s cubic-bezier(.34,1.56,.64,1), background .35s ease, color .35s ease;
        }
        .cinematic-theme-switcher[data-dark="true"] .cinematic-theme-switcher__thumb {
          color: #fff0a6; background: linear-gradient(145deg,#64748b,#334155); border-color: rgba(148,163,184,.3);
          box-shadow: inset 2px 2px 4px rgba(100,116,139,.35), inset -2px -2px 4px rgba(0,0,0,.55), 0 8px 24px rgba(0,0,0,.5);
          transform: translateX(44px);
        }
        .cinematic-theme-switcher__thumb-icon { position: relative; z-index: 3; font-size: 22px; }
        .cinematic-theme-switcher__grain { position:absolute; inset:0; opacity:.14; mix-blend-mode:overlay; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .cinematic-theme-switcher__burst { position:absolute; inset:50%; width:8px; height:8px; border-radius:50%; background:currentColor; opacity:0; transform:translate(-50%,-50%) scale(1); animation:cinematicBurst .7s ease-out; }
        @keyframes cinematicBurst { 0%{opacity:.45;transform:translate(-50%,-50%) scale(.3)} 100%{opacity:0;transform:translate(-50%,-50%) scale(6)} }
        @media (prefers-reduced-motion:reduce){.cinematic-theme-switcher *{transition-duration:.01ms!important;animation:none!important}}
      `}</style>
    </button>
  );
}
