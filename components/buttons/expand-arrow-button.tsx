import { type ButtonHTMLAttributes } from "react";

export interface ExpandArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ExpandArrowButton({
  label = "Visit",
  className = "",
  ...props
}: ExpandArrowButtonProps) {
  return (
    <button {...props} className={`expand-arrow-button ${className}`}>
      <span className="expand-arrow-button__label">{label}</span>
      <span className="expand-arrow-button__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
          <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </span>
      <style>{`
        .expand-arrow-button {
          position:relative; display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px;
          overflow:hidden; border:2px solid #656fe2; border-radius:999px; color:#f1f3ff;
          background:linear-gradient(90deg,#c0c7ff 0%,#4c64ff 100%); cursor:pointer;
          font-size:14px; font-weight:650; transition:width .3s ease,transform .2s ease,box-shadow .3s ease;
          box-shadow:0 8px 22px rgba(76,100,255,.22);
        }
        .expand-arrow-button:hover { width:128px; box-shadow:0 12px 28px rgba(76,100,255,.3); }
        .expand-arrow-button:active { transform:scale(.97); }
        .expand-arrow-button__label { white-space:nowrap; opacity:0; transform:translateX(10px); transition:opacity .2s ease,transform .2s ease; }
        .expand-arrow-button:hover .expand-arrow-button__label { opacity:1; transform:translateX(-12px); }
        .expand-arrow-button__icon { position:absolute; right:12px; display:grid; place-items:center; }
        .expand-arrow-button:focus-visible { outline:3px solid rgba(101,111,226,.32); outline-offset:4px; }
        @media (prefers-color-scheme:dark) {.expand-arrow-button{background:linear-gradient(90deg,#070e41,#263381)}}
      `}</style>
    </button>
  );
}
