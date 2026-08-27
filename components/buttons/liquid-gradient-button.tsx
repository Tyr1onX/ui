"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

export interface LiquidGradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export function LiquidGradientButton({
  children = "Explore",
  className = "",
  ...props
}: LiquidGradientButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      {...props}
      className={`liquid-gradient-button ${className}`}
      data-hovered={hovered ? "true" : "false"}
      onMouseEnter={(event) => { setHovered(true); props.onMouseEnter?.(event); }}
      onMouseLeave={(event) => { setHovered(false); props.onMouseLeave?.(event); }}
    >
      <span className="liquid-gradient-button__field" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i />
      </span>
      <span className="liquid-gradient-button__label">{children}</span>
      <style>{`
        .liquid-gradient-button {
          position:relative; display:inline-flex; align-items:center; justify-content:center; min-width:210px; height:58px;
          overflow:hidden; border:1px solid rgba(255,255,255,.26); border-radius:999px; color:#fff; background:#0d0d12;
          box-shadow:0 18px 46px rgba(0,0,0,.28), inset 0 1px rgba(255,255,255,.18); cursor:pointer;
          font-size:15px; font-weight:750; letter-spacing:-.015em; isolation:isolate;
        }
        .liquid-gradient-button__field { position:absolute; inset:-65%; z-index:0; filter:saturate(145%) blur(1px); transform:rotate(-8deg); transition:transform .8s cubic-bezier(.2,.8,.2,1); }
        .liquid-gradient-button[data-hovered="true"] .liquid-gradient-button__field { transform:rotate(18deg) scale(1.08); }
        .liquid-gradient-button__field i { position:absolute; left:50%; top:50%; width:82%; height:28%; border-radius:50%; mix-blend-mode:screen; opacity:.88; transform-origin:center; animation:liquidField 9s linear infinite; }
        .liquid-gradient-button__field i:nth-child(1){background:radial-gradient(circle,#ffef78 0,#ff7a00 36%,transparent 72%);transform:translate(-62%,-90%) rotate(0deg)}
        .liquid-gradient-button__field i:nth-child(2){background:radial-gradient(circle,#ff4dc4 0,#8028ff 38%,transparent 72%);transform:translate(-30%,-10%) rotate(52deg);animation-delay:-1.2s}
        .liquid-gradient-button__field i:nth-child(3){background:radial-gradient(circle,#4ce8ff 0,#2366ff 38%,transparent 72%);transform:translate(-65%,45%) rotate(98deg);animation-delay:-2.4s}
        .liquid-gradient-button__field i:nth-child(4){background:radial-gradient(circle,#95ff91 0,#13a963 40%,transparent 72%);transform:translate(-25%,-82%) rotate(150deg);animation-delay:-3.6s}
        .liquid-gradient-button__field i:nth-child(5){background:radial-gradient(circle,#fff 0,#8a7bff 34%,transparent 70%);transform:translate(-58%,-5%) rotate(205deg);animation-delay:-4.8s}
        .liquid-gradient-button__field i:nth-child(6){background:radial-gradient(circle,#ffbd6b 0,#ff355e 38%,transparent 72%);transform:translate(-38%,52%) rotate(252deg);animation-delay:-6s}
        .liquid-gradient-button__field i:nth-child(7){background:radial-gradient(circle,#69f7ff 0,#334bff 38%,transparent 72%);transform:translate(-42%,-38%) rotate(310deg);animation-delay:-7.2s}
        .liquid-gradient-button__label { position:relative; z-index:2; text-shadow:0 1px 12px rgba(0,0,0,.45); transition:transform .3s ease; }
        .liquid-gradient-button:hover .liquid-gradient-button__label { transform:scale(1.04); }
        .liquid-gradient-button::after { position:absolute; inset:0; z-index:1; content:""; border-radius:inherit; background:linear-gradient(180deg,rgba(255,255,255,.16),transparent 38%,rgba(0,0,0,.13)); box-shadow:inset 0 0 18px rgba(255,255,255,.09); pointer-events:none; }
        .liquid-gradient-button:focus-visible{outline:3px solid rgba(99,102,241,.4);outline-offset:4px}
        @keyframes liquidField{0%{margin-left:0;margin-top:0}25%{margin-left:8%;margin-top:-4%}50%{margin-left:-3%;margin-top:7%}75%{margin-left:-8%;margin-top:-2%}100%{margin-left:0;margin-top:0}}
        @media(prefers-reduced-motion:reduce){.liquid-gradient-button__field i{animation:none}}
      `}</style>
    </button>
  );
}
