"use client";

import { CSSProperties, ReactNode, useId } from "react";

export interface LiquidGlassIcon {
  src: string;
  alt: string;
  onClick?: () => void;
}

export interface LiquidGlassProps {
  className?: string;
  style?: CSSProperties;
  height?: CSSProperties["height"];
  backgroundImage?: string;
  icons?: LiquidGlassIcon[];
  message?: ReactNode;
  dockHref?: string;
  buttonHref?: string;
}

const DEFAULT_BACKGROUND =
  "https://images.unsplash.com/photo-1432251407527-504a6b4174a2?q=80&w=1480&auto=format&fit=crop";

const DEFAULT_ICONS: LiquidGlassIcon[] = [
  {
    src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/a13d1acfd046f503f987c1c95af582c8_low_res_Claude.png",
    alt: "Claude",
  },
  {
    src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9e80c50a5802d3b0a7ec66f3fe4ce348_low_res_Finder.png",
    alt: "Finder",
  },
  {
    src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/c2c4a538c2d42a8dc0927d7d6530d125_low_res_ChatGPT___Liquid_Glass__Default_.png",
    alt: "ChatGPT",
  },
  {
    src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/6d26d432bd65c522b0708185c0768ec3_low_res_Maps.png",
    alt: "Maps",
  },
  {
    src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/7c59c945731aecf4f91eb8c2c5f867ce_low_res_Safari.png",
    alt: "Safari",
  },
  {
    src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/b7f24edc7183f63dbe34c1943bef2967_low_res_Steam___Liquid_Glass__Default_.png",
    alt: "Steam",
  },
];

interface GlassSurfaceProps {
  children: ReactNode;
  filterId: string;
  className?: string;
  href?: string;
  style?: CSSProperties;
}

function GlassSurface({
  children,
  filterId,
  className = "",
  href,
  style,
}: GlassSurfaceProps) {
  const surface = (
    <div
      className={`liquid-glass-surface relative isolate flex cursor-pointer overflow-hidden font-semibold text-black transition-all duration-700 ${className}`}
      style={{
        boxShadow:
          "0 6px 6px rgba(0, 0, 0, 0.20), 0 0 20px rgba(0, 0, 0, 0.10)",
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          filter: `url(#${filterId})`,
          isolation: "isolate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: "rgba(255, 255, 255, 0.25)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
        style={{
          boxShadow:
            "inset 2px 2px 1px rgba(255,255,255,.50), inset -1px -1px 1px 1px rgba(255,255,255,.50)",
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );

  if (!href) return surface;

  return (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {surface}
    </a>
  );
}

function GlassFilter({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute pointer-events-none">
      <defs>
        <filter
          id={id}
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
            result="noise"
          />
          <feComponentTransfer in="noise" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="mapped" stdDeviation="3" result="softMap" />
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
            result="litMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * Self-contained liquid-glass dock scene based on the public visual behavior
 * of Suraj Gaud's Liquid Glass component on 21st.dev / XD-UI-Library.
 */
export function LiquidGlass({
  className = "",
  style,
  height = 500,
  backgroundImage = DEFAULT_BACKGROUND,
  icons = DEFAULT_ICONS,
  message = "How can I help you today?",
  dockHref,
  buttonHref,
}: LiquidGlassProps) {
  const rawId = useId();
  const filterId = `liquid-glass-${rawId.replace(/:/g, "")}`;

  return (
    <div
      className={`liquid-glass-scene relative flex w-full items-center justify-center overflow-hidden font-light ${className}`}
      style={{
        height,
        backgroundColor: "#234e54",
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        className="liquid-glass-scene-bg absolute inset-[-14%]"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/10" />

      <GlassFilter id={filterId} />

      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6 px-4">
        <GlassSurface
          filterId={filterId}
          href={dockHref}
          className="liquid-glass-dock rounded-3xl p-3"
        >
          <div className="flex items-center justify-center gap-2 overflow-hidden rounded-3xl px-0.5">
            {icons.map((icon) => (
              <img
                key={`${icon.alt}-${icon.src}`}
                src={icon.src}
                alt={icon.alt}
                className="liquid-glass-icon h-16 w-16 cursor-pointer object-contain transition-all duration-700"
                style={{
                  transformOrigin: "center",
                  transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
                }}
                onClick={icon.onClick}
              />
            ))}
          </div>
        </GlassSurface>

        <GlassSurface
          filterId={filterId}
          href={buttonHref}
          className="liquid-glass-button rounded-3xl px-10 py-6 text-white"
        >
          <div className="liquid-glass-button-content text-xl transition-all duration-700">
            {message}
          </div>
        </GlassSurface>
      </div>

      <style>{`
        @keyframes tyr1onxLiquidGlassBackground {
          0% { transform: translate3d(-3%, -2%, 0) scale(1.08); }
          50% { transform: translate3d(3%, 2%, 0) scale(1.14); }
          100% { transform: translate3d(4%, -1%, 0) scale(1.10); }
        }

        .liquid-glass-scene-bg {
          background-position: center;
          background-size: cover;
          will-change: transform;
          animation: tyr1onxLiquidGlassBackground 60s linear infinite alternate;
        }

        .liquid-glass-dock:hover {
          padding: 1rem;
          border-radius: 2rem;
        }

        .liquid-glass-icon:hover {
          transform: translateY(-7px) scale(1.12);
        }

        .liquid-glass-button:hover {
          padding: 1.75rem 2.75rem;
          border-radius: 2rem;
        }

        .liquid-glass-button:hover .liquid-glass-button-content {
          transform: scale(.95);
        }

        @media (max-width: 720px) {
          .liquid-glass-icon {
            width: 44px;
            height: 44px;
          }

          .liquid-glass-dock {
            padding: .65rem;
          }

          .liquid-glass-button {
            padding: 1.15rem 1.75rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .liquid-glass-scene-bg {
            animation: none;
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
