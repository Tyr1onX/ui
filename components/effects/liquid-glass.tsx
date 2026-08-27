"use client";

import React, { CSSProperties, ReactNode, useId } from "react";

export interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  /** Background blur radius in pixels. */
  blur?: number;
  /** White glass tint opacity. */
  tintOpacity?: number;
  /** SVG displacement strength. */
  distortion?: number;
  /** Disable when a lightweight fallback is preferred. */
  enableDistortion?: boolean;
}

/**
 * Reusable liquid-glass surface primitive.
 *
 * Extracted from the supplied liquid-glass demo so buttons, docks, cards,
 * navbars and panels can share the effect without duplicating its layers.
 */
export function LiquidGlass({
  children,
  className = "",
  contentClassName = "",
  style,
  blur = 3,
  tintOpacity = 0.25,
  distortion = 200,
  enableDistortion = true,
}: LiquidGlassProps) {
  const rawId = useId();
  const filterId = `liquid-glass-${rawId.replace(/:/g, "")}`;

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{
        boxShadow:
          "0 6px 6px rgba(0, 0, 0, 0.20), 0 0 20px rgba(0, 0, 0, 0.10)",
        ...style,
      }}
    >
      {enableDistortion && (
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          className="absolute pointer-events-none"
        >
          <defs>
            <filter
              id={filterId}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              filterUnits="objectBoundingBox"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.001 0.005"
                numOctaves="1"
                seed="17"
                result="turbulence"
              />

              <feComponentTransfer in="turbulence" result="mapped">
                <feFuncR
                  type="gamma"
                  amplitude="1"
                  exponent="10"
                  offset="0.5"
                />
                <feFuncG
                  type="gamma"
                  amplitude="0"
                  exponent="1"
                  offset="0"
                />
                <feFuncB
                  type="gamma"
                  amplitude="0"
                  exponent="1"
                  offset="0.5"
                />
              </feComponentTransfer>

              <feGaussianBlur
                in="turbulence"
                stdDeviation="3"
                result="softMap"
              />

              <feSpecularLighting
                in="softMap"
                surfaceScale="5"
                specularConstant="1"
                specularExponent="100"
                lightingColor="white"
                result="specLight"
              >
                <fePointLight x="-200" y="-200" z="300" />
              </feSpecularLighting>

              <feComposite
                in="specLight"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
                result="litImage"
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="softMap"
                scale={distortion}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          borderRadius: "inherit",
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          filter: enableDistortion ? `url(#${filterId})` : undefined,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          borderRadius: "inherit",
          background: `rgba(255, 255, 255, ${tintOpacity})`,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          borderRadius: "inherit",
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.50), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.50)",
        }}
      />

      <div className={`relative z-30 ${contentClassName}`}>{children}</div>
    </div>
  );
}
