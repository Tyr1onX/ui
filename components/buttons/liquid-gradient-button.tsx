"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FC, type SVGProps } from "react";

type ColorKey =
  | "color1" | "color2" | "color3" | "color4" | "color5" | "color6"
  | "color7" | "color8" | "color9" | "color10" | "color11" | "color12"
  | "color13" | "color14" | "color15" | "color16" | "color17";

export type Colors = Record<ColorKey, string>;

const svgOrder = ["svg1", "svg2", "svg3", "svg4", "svg3", "svg2", "svg1"] as const;
type SvgKey = (typeof svgOrder)[number];
type Stop = { offset: number; stopColor: string };
type SvgState = { gradientTransform: string; stops: Stop[] };
type SvgStates = Record<SvgKey, SvgState>;

const createStopsArray = (states: SvgStates, order: readonly SvgKey[], maxStops: number) =>
  Array.from({ length: maxStops }, (_, index) =>
    order.map((key) => states[key].stops[index] || states[key].stops[states[key].stops.length - 1]),
  );

const GradientSvg: FC<{ className: string; isHovered: boolean; colors: Colors }> = ({ className, isHovered, colors }) => {
  const svgStates: SvgStates = {
    svg1: {
      gradientTransform: "translate(287.5 280) rotate(-29.0546) scale(689.807 1000)",
      stops: [
        { offset: 0, stopColor: colors.color1 }, { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color3 }, { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 }, { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 }, { offset: 0.537556, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 }, { offset: 0.725645, stopColor: colors.color8 },
        { offset: 0.817779, stopColor: colors.color9 }, { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 }, { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg2: {
      gradientTransform: "translate(126.5 418.5) rotate(-64.756) scale(533.444 773.324)",
      stops: [
        { offset: 0, stopColor: colors.color1 }, { offset: 0.104167, stopColor: colors.color12 },
        { offset: 0.182292, stopColor: colors.color13 }, { offset: 0.28125, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 }, { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.453125, stopColor: colors.color6 }, { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 }, { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.75, stopColor: colors.color14 }, { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 }, { offset: 1, stopColor: colors.color1 },
      ],
    },
    svg3: {
      gradientTransform: "translate(264.5 339.5) rotate(-42.3022) scale(946.451 1372.05)",
      stops: [
        { offset: 0, stopColor: colors.color1 }, { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.307292, stopColor: colors.color1 }, { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 }, { offset: 0.442708, stopColor: colors.color15 },
        { offset: 0.537556, stopColor: colors.color16 }, { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color17 }, { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 }, { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg4: {
      gradientTransform: "translate(860.5 420) rotate(-153.984) scale(957.528 1388.11)",
      stops: [
        { offset: 0.109375, stopColor: colors.color11 }, { offset: 0.171875, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color13 }, { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 }, { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 }, { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 }, { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.817708, stopColor: colors.color9 }, { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
  };

  const maxStops = Math.max(...Object.values(svgStates).map((state) => state.stops.length));
  const stopsAnimationArray = createStopsArray(svgStates, svgOrder, maxStops);
  const gradientTransform = svgOrder.map((key) => svgStates[key].gradientTransform);

  return (
    <svg className={className} width="1030" height="280" viewBox="0 0 1030 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1030" height="280" rx="140" fill="url(#ui-layout-liquid-gradient)" />
      <defs>
        <motion.radialGradient
          id="ui-layout-liquid-gradient"
          cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          animate={{ gradientTransform }}
          transition={{ duration: isHovered ? 50 : 10, repeat: Infinity, ease: "linear" }}
        >
          {stopsAnimationArray.map((configs, index) => (
            <AnimatePresence key={index}>
              <motion.stop
                initial={{ offset: configs[0].offset, stopColor: configs[0].stopColor }}
                animate={{ offset: configs.map((config) => config.offset), stopColor: configs.map((config) => config.stopColor) }}
                transition={{ duration: isHovered ? 50 : 10, repeat: Infinity, ease: "linear" }}
              />
            </AnimatePresence>
          ))}
        </motion.radialGradient>
      </defs>
    </svg>
  );
};

export const Liquid: FC<{ isHovered: boolean; colors: Colors }> = ({ isHovered, colors }) => (
  <>
    {Array.from({ length: 7 }).map((_, index) => (
      <div
        key={index}
        className={`absolute ${index < 3 ? "w-[443px] h-[121px]" : "w-[756px] h-[207px]"} ${
          index === 0 ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" :
          index === 1 ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[164.971deg] mix-blend-difference" :
          index === 2 ? "top-1/2 left-1/2 -translate-x-[53%] -translate-y-[53%] rotate-[-11.61deg] mix-blend-difference" :
          index === 3 ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-[57%] rotate-[-179.012deg] mix-blend-difference" :
          index === 4 ? "top-1/2 left-1/2 -translate-x-[57%] -translate-y-1/2 rotate-[-29.722deg] mix-blend-difference" :
          index === 5 ? "top-1/2 left-1/2 -translate-x-[62%] -translate-y-[24%] rotate-[160.227deg] mix-blend-difference" :
          "top-1/2 left-1/2 -translate-x-[67%] -translate-y-[29%] rotate-180 mix-blend-hard-light"
        }`}
      >
        <GradientSvg className="w-full h-full" isHovered={isHovered} colors={colors} />
      </div>
    ))}
  </>
);

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const COLORS: Colors = {
  color1: "#FFFFFF", color2: "#1E10C5", color3: "#9089E2", color4: "#FCFCFE", color5: "#F9F9FD",
  color6: "#B2B8E7", color7: "#0E2DCB", color8: "#0017E9", color9: "#4743EF", color10: "#7D7BF4",
  color11: "#0B06FC", color12: "#C5C1EA", color13: "#1403DE", color14: "#B6BAF6", color15: "#C1BEEB",
  color16: "#290ECB", color17: "#3F4CC0",
};

export interface LiquidGradientButtonProps {
  className?: string;
}

export function LiquidGradientButton({ className = "" }: LiquidGradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={`flex justify-center ${className}`}>
      <a
        href="https://github.com/ui-layouts/uilayouts"
        target="_blank"
        rel="noreferrer noopener"
        className="relative inline-block w-32 h-[2.7em] mx-auto group bg-white dark:bg-black border-black dark:border-white border-2 rounded-lg"
      >
        <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 blur-[19px] opacity-70">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] blur-[6.5px]" />
          <div className="relative w-full h-full overflow-hidden rounded-lg"><Liquid isHovered={isHovered} colors={COLORS} /></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] blur-[7.3px]" />
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]" />
          <span className="absolute inset-0 rounded-lg bg-black" />
          <Liquid isHovered={isHovered} colors={COLORS} />
          {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`absolute inset-0 rounded-lg border-[3px] border-white/80 mix-blend-overlay ${i <= 2 ? "blur-[3px]" : i === 3 ? "blur-[5px]" : "blur-[2px]"}`} />)}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg blur-[15px] bg-[#006]" />
        </div>
        <button
          className="absolute inset-0 rounded-lg bg-transparent cursor-pointer"
          aria-label="Github"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="flex items-center justify-center px-2 gap-1 rounded-lg group-hover:text-yellow-400 text-white text-xl font-semibold tracking-wide whitespace-nowrap">
            <GithubIcon className="inline-block group-hover:fill-yellow-400 fill-white w-6 h-6 shrink-0" />
            Github
          </span>
        </button>
      </a>
    </div>
  );
}
