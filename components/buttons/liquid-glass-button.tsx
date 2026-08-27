"use client";

import { useId, type ButtonHTMLAttributes, type ReactNode } from "react";

export interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function LiquidGlassButton({
  children = "Liquid Glass",
  className = "",
  size = "lg",
  ...props
}: LiquidGlassButtonProps) {
  const filterId = `liquid-button-${useId().replace(/:/g, "")}`;
  const padding = size === "sm" ? "10px 18px" : size === "md" ? "12px 24px" : "15px 30px";

  return (
    <button
      {...props}
      className={`liquid-glass-button ${className}`}
      style={{ padding, ...(props.style ?? {}) }}
    >
      <span className="liquid-glass-button__shadow" aria-hidden="true" />
      <span className="liquid-glass-button__distortion" aria-hidden="true" style={{ backdropFilter: `url(#${filterId})` }} />
      <span className="liquid-glass-button__highlight" aria-hidden="true" />
      <span className="liquid-glass-button__content">{children}</span>
      <svg className="liquid-glass-button__filter" aria-hidden="true">
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
            <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>

      <style>{`
        .liquid-glass-button {
          position: relative; display: inline-flex; align-items: center; justify-content: center; isolation: isolate;
          overflow: visible; border: 0; border-radius: 999px; color: #fff; background: transparent;
          font-size: 15px; font-weight: 700; letter-spacing: -.01em; cursor: pointer;
          transition: transform .3s cubic-bezier(.2,.8,.2,1);
        }
        .liquid-glass-button:hover { transform: scale(1.05); }
        .liquid-glass-button:active { transform: scale(.98); }
        .liquid-glass-button:focus-visible { outline: 3px solid rgba(255,255,255,.45); outline-offset: 4px; }
        .liquid-glass-button__shadow,.liquid-glass-button__distortion,.liquid-glass-button__highlight { position:absolute; inset:0; border-radius:inherit; }
        .liquid-glass-button__shadow {
          z-index:0;
          box-shadow: 0 0 6px rgba(0,0,0,.03),0 2px 6px rgba(0,0,0,.08),inset 3px 3px .5px -3px rgba(255,255,255,.8),inset -3px -3px .5px -3px rgba(255,255,255,.65),inset 0 0 6px 6px rgba(255,255,255,.12),0 0 18px rgba(255,255,255,.15);
          background:rgba(255,255,255,.12); backdrop-filter:blur(12px) saturate(135%);
        }
        .liquid-glass-button__distortion { z-index:1; overflow:hidden; background:rgba(255,255,255,.02); }
        .liquid-glass-button__highlight { z-index:2; pointer-events:none; box-shadow:inset 0 1px rgba(255,255,255,.55),inset 0 -1px rgba(255,255,255,.12); background:linear-gradient(180deg,rgba(255,255,255,.16),transparent 44%); }
        .liquid-glass-button__content { position:relative; z-index:3; text-shadow:0 1px 8px rgba(0,0,0,.28); }
        .liquid-glass-button__filter { position:absolute; width:0; height:0; pointer-events:none; }
        @media (prefers-reduced-motion:reduce){.liquid-glass-button{transition:none}}
      `}</style>
    </button>
  );
}
