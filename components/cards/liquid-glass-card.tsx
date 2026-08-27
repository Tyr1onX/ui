import React, { type CSSProperties, type ReactNode } from "react";

export interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: string;
}

/** Lightweight liquid-glass card for isolated previews and reusable panels. */
export function LiquidGlassCard({ children, className = "", accent = "#ff4667" }: LiquidGlassCardProps) {
  return (
    <div
      className={`ui-liquid-card ${className}`}
      style={{ "--liquid-card-accent": accent } as CSSProperties}
    >
      <svg aria-hidden="true" className="ui-liquid-card-filter" width="0" height="0">
        <filter id="ui-liquid-card-distortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.018" numOctaves="1" seed="11" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.4" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="18" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>
      <div className="ui-liquid-card-refraction" aria-hidden="true" />
      <div className="ui-liquid-card-shine" aria-hidden="true" />
      <div className="ui-liquid-card-content">{children}</div>
    </div>
  );
}
