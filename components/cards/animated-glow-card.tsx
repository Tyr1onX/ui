import React, { type CSSProperties, type ReactNode } from "react";

export interface AnimatedGlowCardProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
  glowColor?: string;
}

/** Self-contained adaptation of EaseMize's animated glow-card treatment. */
export function AnimatedGlowCard({
  children,
  active = true,
  className = "",
  glowColor = "#ef3559",
}: AnimatedGlowCardProps) {
  const style = {
    "--glow-card-color": glowColor,
  } as CSSProperties;

  return (
    <div className={`ui-glow-card ${active ? "ui-glow-card-active" : ""} ${className}`} style={style}>
      <span className="ui-glow-card-orbit" aria-hidden="true" />
      <div className="ui-glow-card-inner">{children}</div>
    </div>
  );
}
