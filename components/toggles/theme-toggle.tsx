"use client";

import { useState } from "react";

export interface ThemeToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function ThemeToggle({ checked, defaultChecked = true, onCheckedChange, className = "" }: ThemeToggleProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const dark = checked ?? internal;

  const toggle = () => {
    const next = !dark;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle theme"
      onClick={toggle}
      className={`flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300 border ${dark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-100 border-zinc-200"} ${className}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className={`flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300 ${dark ? "translate-x-0 bg-zinc-800" : "bg-transparent"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${dark ? "text-white" : "text-gray-500"}`} aria-hidden="true">
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
          </svg>
        </div>
        <div className={`flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300 ${dark ? "bg-transparent" : "bg-white shadow-sm"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${dark ? "text-gray-500" : "text-zinc-900"}`} aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2m-7.07-15.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </div>
      </div>
    </button>
  );
}
