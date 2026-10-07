import React from "react";
import { type EceComponentKind } from "@/labs/previews/EceComponentViewer";

type Props = {
  kind: EceComponentKind;
  className?: string;
};

export function ComponentDockIcon({ kind, className = "w-6 h-6" }: Props) {
  switch (kind) {
    case "resistor":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M2 12h3l2-4 3 8 3-8 3 8 2-4h4" />
        </svg>
      );
    case "capacitor":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M2 12h8m4 0h8M10 6v12m4-12v12" />
        </svg>
      );
    case "diode":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M3 12h6m6 0h6M9 6l6 6-6 6V6zM15 6v12" />
        </svg>
      );
    case "zener-diode":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M3 12h6m6 0h6M9 6l6 6-6 6V6zM13 6h2v12h2" />
        </svg>
      );
    case "led":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M3 14h6m6 0h6M9 8l6 6-6 6V8zM15 8v12M14 6l3-3m-1 0h2v2M18 8l3-3m-1 0h2v2" />
        </svg>
      );
    case "breadboard":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="7" cy="9" r="0.75" fill="currentColor" />
          <circle cx="12" cy="9" r="0.75" fill="currentColor" />
          <circle cx="17" cy="9" r="0.75" fill="currentColor" />
          <circle cx="7" cy="15" r="0.75" fill="currentColor" />
          <circle cx="12" cy="15" r="0.75" fill="currentColor" />
          <circle cx="17" cy="15" r="0.75" fill="currentColor" />
        </svg>
      );
    case "bjt":
    case "mosfet":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M3 12h6M9 5v14m0-10l8-4m-8 7l8 4m-4-1l4 1-1-4" />
        </svg>
      );
    case "op-amp":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M3 8h5m-5 8h5m9-4h4M8 4l11 8-11 8V4zM6 7v2m-1-1h2m-1 8h2" />
        </svg>
      );
    case "and-gate":
    case "xor-gate":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 4v-2m6 2v-2M9 22v-2m6 2v-2M2 9h3m-3 6h3M19 9h3m-3 6h3" />
        </svg>
      );
    case "seven-segment":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 7h6M9 12h6M9 17h6M9 7v5M15 12v5" />
        </svg>
      );
    case "oscilloscope":
    case "logic-analyser":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M6 13h2l2-4 3 6 2-4 2 2h1" />
        </svg>
      );
    case "function-generator":
    case "transformer":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M7 12c1.5-3 3-3 5 0s3.5 3 5 0" />
        </svg>
      );
    case "ammeter":
    case "voltmeter":
    case "ic-meter":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 16V8m-3 2l3-2 3 2" />
        </svg>
      );
    case "switch":
    case "push-button":
    case "dip-switch":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="12" r="2" />
          <path d="M8 11l8-4" />
        </svg>
      );
    case "battery":
    case "dc-jack":
    case "dc-power-supply":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="2" y="7" width="16" height="10" rx="2" />
          <path d="M18 10h2v4h-2M6 12h4m-2-2v4" />
        </svg>
      );
    case "mcu-trainer":
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          <circle cx="15" cy="9" r="1.5" fill="currentColor" />
          <path d="M8 15h8" />
        </svg>
      );
  }
}
