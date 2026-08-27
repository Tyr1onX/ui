"use client";

import { useState } from "react";

export interface SkyToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  scale?: number;
}

/**
 * Playful day/night sky toggle adapted from Ravi Katiyar's public Sky Toggle
 * preview: sun, layered clouds, moon craters and a star field in one switch.
 */
export function SkyToggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  className = "",
  scale = 1,
}: SkyToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isNight = checked ?? internalChecked;

  const update = () => {
    const next = !isNight;
    if (checked === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      className={`sky-toggle ${className}`}
      data-night={isNight ? "true" : "false"}
      aria-label={isNight ? "Switch to day" : "Switch to night"}
      aria-pressed={isNight}
      onClick={update}
      style={{ transform: `scale(${scale})` }}
    >
      <span className="sky-toggle__stars" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </span>
      <span className="sky-toggle__clouds sky-toggle__clouds--back" aria-hidden="true" />
      <span className="sky-toggle__clouds sky-toggle__clouds--front" aria-hidden="true" />
      <span className="sky-toggle__orb-halo" aria-hidden="true">
        <span className="sky-toggle__orb">
          <span className="sky-toggle__moon">
            <i /><i /><i />
          </span>
        </span>
      </span>

      <style>{`
        .sky-toggle {
          position: relative;
          display: inline-block;
          width: 90px;
          height: 40px;
          padding: 0;
          overflow: hidden;
          border: 0;
          border-radius: 999px;
          background: #3d7eae;
          box-shadow:
            inset 0 2px 3px rgba(0,0,0,.24),
            inset 0 -1px 1px rgba(255,255,255,.45),
            0 4px 10px rgba(26,66,96,.18);
          cursor: pointer;
          transform-origin: center;
          transition: background .5s cubic-bezier(0,-.02,.4,1.25), box-shadow .4s ease;
          isolation: isolate;
        }

        .sky-toggle[data-night="true"] {
          background: #1d1f2c;
          box-shadow:
            inset 0 2px 4px rgba(0,0,0,.6),
            inset 0 -1px rgba(255,255,255,.09),
            0 5px 12px rgba(0,0,0,.22);
        }

        .sky-toggle:focus-visible {
          outline: 3px solid rgba(77, 157, 255, .35);
          outline-offset: 4px;
        }

        .sky-toggle__orb-halo {
          position: absolute;
          z-index: 4;
          top: -7px;
          left: -7px;
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(255,255,255,.08);
          box-shadow:
            0 0 0 10px rgba(255,255,255,.075),
            0 0 0 20px rgba(255,255,255,.05);
          transition: left .46s cubic-bezier(0,-.02,.35,1.17), transform .3s ease;
          pointer-events: none;
        }

        .sky-toggle:hover .sky-toggle__orb-halo {
          transform: translateX(2px);
        }

        .sky-toggle[data-night="true"] .sky-toggle__orb-halo {
          left: 43px;
        }

        .sky-toggle[data-night="true"]:hover .sky-toggle__orb-halo {
          transform: translateX(-2px);
        }

        .sky-toggle__orb {
          position: relative;
          width: 34px;
          height: 34px;
          overflow: hidden;
          border-radius: 50%;
          background: #ecca2f;
          box-shadow:
            inset 1px 1px 1px rgba(255,255,240,.65),
            inset 0 -1px 1px #a1872a,
            1px 2px 3px rgba(0,0,0,.28);
          transition: background .5s cubic-bezier(0,-.02,.4,1.25);
        }

        .sky-toggle__moon {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: #c4c9d1;
          box-shadow: inset 1px 1px 1px rgba(255,255,255,.65), inset 0 -1px 1px #969696;
          transform: translateX(105%);
          transition: transform .5s cubic-bezier(0,-.02,.4,1.25);
        }

        .sky-toggle[data-night="true"] .sky-toggle__moon {
          transform: translateX(0);
        }

        .sky-toggle__moon i {
          position: absolute;
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #959db1;
          box-shadow: inset 0 1px 2px rgba(0,0,0,.24);
        }

        .sky-toggle__moon i:nth-child(1) { left: 6px; top: 12px; }
        .sky-toggle__moon i:nth-child(2) { left: 22px; top: 15px; width: 6px; height: 6px; }
        .sky-toggle__moon i:nth-child(3) { left: 13px; top: 5px; width: 4px; height: 4px; }

        .sky-toggle__clouds {
          position: absolute;
          z-index: 3;
          display: block;
          border-radius: 999px;
          transition: transform .5s cubic-bezier(0,-.02,.4,1.25), opacity .35s ease;
        }

        .sky-toggle__clouds--back {
          right: -10px;
          bottom: -2px;
          width: 23px;
          height: 17px;
          background: #aacadf;
          box-shadow:
            -15px 2px 0 1px #aacadf,
            -29px 4px 0 2px #aacadf,
            8px -10px 0 4px #aacadf,
            -7px -6px 0 3px #aacadf;
        }

        .sky-toggle__clouds--front {
          right: -5px;
          bottom: -7px;
          width: 26px;
          height: 21px;
          background: #f3fdff;
          box-shadow:
            -18px 2px 0 2px #f3fdff,
            -36px 5px 0 3px #f3fdff,
            7px -12px 0 4px #f3fdff,
            -8px -7px 0 4px #f3fdff,
            -28px -4px 0 2px #f3fdff;
        }

        .sky-toggle[data-night="true"] .sky-toggle__clouds {
          transform: translateY(48px);
          opacity: 0;
        }

        .sky-toggle__stars {
          position: absolute;
          z-index: 2;
          inset: 0;
          opacity: 0;
          transform: translateY(-18px);
          transition: opacity .32s ease, transform .5s cubic-bezier(0,-.02,.4,1.25);
        }

        .sky-toggle[data-night="true"] .sky-toggle__stars {
          opacity: 1;
          transform: translateY(0);
        }

        .sky-toggle__stars i {
          position: absolute;
          display: block;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 3px rgba(255,255,255,.8);
        }

        .sky-toggle__stars i::before,
        .sky-toggle__stars i::after {
          position: absolute;
          content: "";
          background: white;
          opacity: .75;
        }

        .sky-toggle__stars i::before { left: -2px; top: .5px; width: 6px; height: 1px; }
        .sky-toggle__stars i::after { left: .5px; top: -2px; width: 1px; height: 6px; }
        .sky-toggle__stars i:nth-child(1) { left: 12px; top: 10px; }
        .sky-toggle__stars i:nth-child(2) { left: 28px; top: 25px; transform: scale(.65); }
        .sky-toggle__stars i:nth-child(3) { left: 43px; top: 9px; transform: scale(.75); }
        .sky-toggle__stars i:nth-child(4) { left: 19px; top: 31px; transform: scale(.5); }
        .sky-toggle__stars i:nth-child(5) { left: 55px; top: 26px; transform: scale(.45); }
        .sky-toggle__stars i:nth-child(6) { left: 36px; top: 17px; transform: scale(.4); }

        @media (prefers-reduced-motion: reduce) {
          .sky-toggle,
          .sky-toggle * {
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </button>
  );
}

export default SkyToggle;
