"use client";

import React from "react";

/* ── OpenBench-faithful tokens ─────────────────────────────────── */
const CANVAS_BG = "#fafafa";
const GRID_DOT = "rgba(212,212,212,0.45)";
const WIRE = "#171717";
const WIRE_HIGHLIGHT = "#2563eb";
const SYMBOL_BODY = "#ffffff";
const SYMBOL_STROKE = "#171717";
const PIN_COLOR = "#525252";
const GRID = 10; // world-space grid unit
const SW = 1.5; // default stroke width

const sp = {
  stroke: SYMBOL_STROKE,
  strokeWidth: SW,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── Types ─────────────────────────────────────────────────────── */
export type Pt = { x: number; y: number };

export type SchematicElement =
  | { type: "resistor"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
  | { type: "zener"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
  | { type: "diode"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "capacitor"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
  | { type: "vsource"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
  | { type: "ground"; id: string; x: number; y: number }
  | { type: "ammeter"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "voltmeter"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "wire"; id: string; points: Pt[]; highlight?: boolean }
  | { type: "junction"; id: string; x: number; y: number }
  | { type: "label"; id: string; x: number; y: number; text: string }
  // Transistors
  | { type: "npn-bjt"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "pnp-bjt"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "n-mosfet"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "p-mosfet"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  // Op-amp
  | { type: "op-amp"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  // Logic gates
  | { type: "and-gate"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "or-gate"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "not-gate"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "nand-gate"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "nor-gate"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "xor-gate"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "xnor-gate"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  // LED indicator
  | { type: "led"; id: string; x: number; y: number; rotation?: number; label?: string; color?: string; highlight?: boolean }
  // Function generator / AC source
  | { type: "acsource"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
  // Oscilloscope probe point
  | { type: "probe"; id: string; x: number; y: number; label?: string; highlight?: boolean };

export type SchematicData = {
  elements: SchematicElement[];
  width?: number;
  height?: number;
};

/* ── Highlight selection rect ──────────────────────────────────── */
function SelectionRect({ hw, hh }: { hw: number; hh: number }) {
  return (
    <rect
      x={-hw - 6}
      y={-hh - 6}
      width={hw * 2 + 12}
      height={hh * 2 + 12}
      rx={4}
      fill="rgba(37,99,235,0.12)"
      stroke={WIRE_HIGHLIGHT}
      strokeWidth={1}
    />
  );
}

/* ── Pin dot ───────────────────────────────────────────────────── */
function Pin({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={3} fill={PIN_COLOR} />;
}

/* ── Symbols (OpenBench faithful) ──────────────────────────────── */

function Resistor({ x, y, rotation = 0, label, value, highlight }: {
  x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={30} hh={10} />}
      {/* leads */}
      <line x1={-30} y1={0} x2={-20} y2={0} {...sp} />
      <line x1={20} y1={0} x2={30} y2={0} {...sp} />
      {/* body */}
      <rect x={-20} y={-7} width={40} height={14} fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      {/* pins */}
      <Pin x={-30} y={0} />
      <Pin x={30} y={0} />
      {label && <text x={0} y={-14} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
      {value && <text x={0} y={22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{value}</text>}
    </g>
  );
}

function ZenerDiode({ x, y, rotation = 0, label, value, highlight }: {
  x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={20} hh={14} />}
      {/* leads */}
      <line x1={-20} y1={0} x2={-8} y2={0} {...sp} />
      <line x1={8} y1={0} x2={20} y2={0} {...sp} />
      {/* triangle (anode side) */}
      <polygon points="-8,-9 -8,9 8,0" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinejoin="round" />
      {/* cathode bar */}
      <line x1={8} y1={-9} x2={8} y2={9} stroke={SYMBOL_STROKE} strokeWidth={2} />
      {/* zener wings */}
      <line x1={8} y1={-9} x2={4} y2={-9} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinecap="round" />
      <line x1={8} y1={9} x2={12} y2={9} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinecap="round" />
      {/* pins */}
      <Pin x={-20} y={0} />
      <Pin x={20} y={0} />
      {label && <text x={0} y={-18} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
      {value && <text x={0} y={24} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{value}</text>}
    </g>
  );
}

function Diode({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={20} hh={14} />}
      <line x1={-20} y1={0} x2={-8} y2={0} {...sp} />
      <line x1={8} y1={0} x2={20} y2={0} {...sp} />
      <polygon points="-8,-9 -8,9 8,0" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <line x1={8} y1={-9} x2={8} y2={9} stroke={SYMBOL_STROKE} strokeWidth={2} />
      <Pin x={-20} y={0} />
      <Pin x={20} y={0} />
      {label && <text x={0} y={-18} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

function Capacitor({ x, y, rotation = 0, label, value, highlight }: {
  x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={20} hh={12} />}
      <line x1={-20} y1={0} x2={-4} y2={0} {...sp} />
      <line x1={4} y1={0} x2={20} y2={0} {...sp} />
      <line x1={-4} y1={-12} x2={-4} y2={12} stroke={SYMBOL_STROKE} strokeWidth={2} />
      <line x1={4} y1={-12} x2={4} y2={12} stroke={SYMBOL_STROKE} strokeWidth={2} />
      <Pin x={-20} y={0} />
      <Pin x={20} y={0} />
      {label && <text x={0} y={-16} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
      {value && <text x={0} y={22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{value}</text>}
    </g>
  );
}

function VSource({ x, y, rotation = 0, label, value, highlight }: {
  x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={16} hh={30} />}
      {/* leads */}
      <line x1={0} y1={-30} x2={0} y2={-4} {...sp} />
      <line x1={0} y1={4} x2={0} y2={30} {...sp} />
      {/* + plate (long) */}
      <line x1={-16} y1={-4} x2={16} y2={-4} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      {/* - plate (short, thick) */}
      <line x1={-8} y1={4} x2={8} y2={4} stroke={SYMBOL_STROKE} strokeWidth={3} />
      {/* +/- signs */}
      <text x={12} y={-10} fontSize={10} fill={SYMBOL_STROKE} fontWeight={600}>+</text>
      <text x={12} y={16} fontSize={10} fill={SYMBOL_STROKE} fontWeight={600}>−</text>
      {/* pins */}
      <Pin x={0} y={-30} />
      <Pin x={0} y={30} />
      {label && <text x={-18} y={4} textAnchor="end" fontSize={10} fill={PIN_COLOR}>{label}</text>}
      {value && <text x={-18} y={16} textAnchor="end" fontSize={9} fill={PIN_COLOR}>{value}</text>}
    </g>
  );
}

function Ground({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={0} y1={0} x2={0} y2={0} {...sp} />
      <line x1={0} y1={0} x2={0} y2={8} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={-14} y1={8} x2={14} y2={8} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinecap="round" />
      <line x1={-9} y1={13} x2={9} y2={13} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinecap="round" />
      <line x1={-4} y1={18} x2={4} y2={18} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinecap="round" />
    </g>
  );
}

function MeterCircle({ x, y, rotation = 0, letter, label, highlight }: {
  x: number; y: number; rotation?: number; letter: string; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={14} hh={14} />}
      <circle cx={0} cy={0} r={14} fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <text x={0} y={5} textAnchor="middle" fontSize={13} fontWeight={600} fill={SYMBOL_STROKE}>{letter}</text>
      <line x1={0} y1={-14} x2={0} y2={-24} {...sp} />
      <line x1={0} y1={14} x2={0} y2={24} {...sp} />
      <Pin x={0} y={-24} />
      <Pin x={0} y={24} />
      {label && <text x={18} y={4} textAnchor="start" fontSize={10} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

function Wire({ points, highlight }: { points: Pt[]; highlight?: boolean }) {
  if (points.length < 2) return null;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  return (
    <path
      d={d}
      stroke={highlight ? WIRE_HIGHLIGHT : WIRE}
      strokeWidth={highlight ? 2.5 : SW}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Junction({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={3} fill={WIRE} />;
}

function Label({ x, y, text }: { x: number; y: number; text: string }) {
  return <text x={x} y={y} textAnchor="middle" fontSize={9} fill={PIN_COLOR} fontWeight={500}>{text}</text>;
}

/* ── NPN BJT Transistor ────────────────────────────────────────── */
function NpnBjt({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  // Default orientation: Base left, Collector top-right, Emitter bottom-right
  // Pin positions: B at (-20,0), C at (20,-20), E at (20,20)
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={24} hh={24} />}
      {/* Base lead */}
      <line x1={-20} y1={0} x2={-6} y2={0} {...sp} />
      {/* Vertical bar (base region) */}
      <line x1={-6} y1={-14} x2={-6} y2={14} stroke={SYMBOL_STROKE} strokeWidth={2.5} />
      {/* Collector line (angled up-right) */}
      <line x1={-6} y1={-7} x2={14} y2={-18} {...sp} />
      {/* Emitter line (angled down-right) with arrow */}
      <line x1={-6} y1={7} x2={14} y2={18} {...sp} />
      {/* Arrow on emitter (pointing outward for NPN) */}
      <polygon points="14,18 6,14 8,20" fill={SYMBOL_STROKE} />
      {/* Collector lead */}
      <line x1={14} y1={-18} x2={20} y2={-20} {...sp} />
      <line x1={20} y1={-20} x2={20} y2={-30} {...sp} />
      {/* Emitter lead */}
      <line x1={14} y1={18} x2={20} y2={20} {...sp} />
      <line x1={20} y1={20} x2={20} y2={30} {...sp} />
      {/* Pins */}
      <Pin x={-20} y={0} />
      <Pin x={20} y={-30} />
      <Pin x={20} y={30} />
      {/* Labels */}
      <text x={-14} y={-8} fontSize={8} fill={PIN_COLOR}>B</text>
      <text x={24} y={-24} fontSize={8} fill={PIN_COLOR}>C</text>
      <text x={24} y={28} fontSize={8} fill={PIN_COLOR}>E</text>
      {label && <text x={0} y={-28} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

/* ── PNP BJT Transistor ────────────────────────────────────────── */
function PnpBjt({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={24} hh={24} />}
      <line x1={-20} y1={0} x2={-6} y2={0} {...sp} />
      <line x1={-6} y1={-14} x2={-6} y2={14} stroke={SYMBOL_STROKE} strokeWidth={2.5} />
      <line x1={-6} y1={-7} x2={14} y2={-18} {...sp} />
      <line x1={-6} y1={7} x2={14} y2={18} {...sp} />
      {/* Arrow on emitter (pointing inward for PNP) */}
      <polygon points="-2,5 6,9 4,3" fill={SYMBOL_STROKE} />
      <line x1={14} y1={-18} x2={20} y2={-20} {...sp} />
      <line x1={20} y1={-20} x2={20} y2={-30} {...sp} />
      <line x1={14} y1={18} x2={20} y2={20} {...sp} />
      <line x1={20} y1={20} x2={20} y2={30} {...sp} />
      <Pin x={-20} y={0} />
      <Pin x={20} y={-30} />
      <Pin x={20} y={30} />
      <text x={-14} y={-8} fontSize={8} fill={PIN_COLOR}>B</text>
      <text x={24} y={-24} fontSize={8} fill={PIN_COLOR}>C</text>
      <text x={24} y={28} fontSize={8} fill={PIN_COLOR}>E</text>
      {label && <text x={0} y={-28} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

/* ── N-channel MOSFET (Enhancement) ────────────────────────────── */
function NMosfet({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  // Gate left, Drain top, Source bottom
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={24} hh={30} />}
      {/* Gate lead */}
      <line x1={-24} y1={0} x2={-10} y2={0} {...sp} />
      {/* Gate vertical (insulated) */}
      <line x1={-10} y1={-14} x2={-10} y2={14} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      {/* Channel (3 segments with gap for enhancement) */}
      <line x1={-6} y1={-14} x2={-6} y2={-5} stroke={SYMBOL_STROKE} strokeWidth={2} />
      <line x1={-6} y1={-2} x2={-6} y2={5} stroke={SYMBOL_STROKE} strokeWidth={2} />
      <line x1={-6} y1={8} x2={-6} y2={14} stroke={SYMBOL_STROKE} strokeWidth={2} />
      {/* Drain connection */}
      <line x1={-6} y1={-14} x2={10} y2={-14} {...sp} />
      <line x1={10} y1={-14} x2={10} y2={-30} {...sp} />
      {/* Source connection */}
      <line x1={-6} y1={14} x2={10} y2={14} {...sp} />
      <line x1={10} y1={14} x2={10} y2={30} {...sp} />
      {/* Body connection to source */}
      <line x1={-6} y1={0} x2={10} y2={0} {...sp} />
      <line x1={10} y1={0} x2={10} y2={14} {...sp} />
      {/* Arrow (N-channel: pointing in) */}
      <polygon points="-2,0 6,-4 6,4" fill={SYMBOL_STROKE} />
      {/* Pins */}
      <Pin x={-24} y={0} />
      <Pin x={10} y={-30} />
      <Pin x={10} y={30} />
      {/* Labels */}
      <text x={-18} y={-8} fontSize={8} fill={PIN_COLOR}>G</text>
      <text x={16} y={-24} fontSize={8} fill={PIN_COLOR}>D</text>
      <text x={16} y={28} fontSize={8} fill={PIN_COLOR}>S</text>
      {label && <text x={0} y={-36} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

/* ── P-channel MOSFET (Enhancement) ────────────────────────────── */
function PMosfet({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={24} hh={30} />}
      <line x1={-24} y1={0} x2={-10} y2={0} {...sp} />
      <line x1={-10} y1={-14} x2={-10} y2={14} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={-6} y1={-14} x2={-6} y2={-5} stroke={SYMBOL_STROKE} strokeWidth={2} />
      <line x1={-6} y1={-2} x2={-6} y2={5} stroke={SYMBOL_STROKE} strokeWidth={2} />
      <line x1={-6} y1={8} x2={-6} y2={14} stroke={SYMBOL_STROKE} strokeWidth={2} />
      <line x1={-6} y1={-14} x2={10} y2={-14} {...sp} />
      <line x1={10} y1={-14} x2={10} y2={-30} {...sp} />
      <line x1={-6} y1={14} x2={10} y2={14} {...sp} />
      <line x1={10} y1={14} x2={10} y2={30} {...sp} />
      <line x1={-6} y1={0} x2={10} y2={0} {...sp} />
      <line x1={10} y1={0} x2={10} y2={14} {...sp} />
      {/* Arrow (P-channel: pointing out) */}
      <polygon points="6,0 -2,-4 -2,4" fill={SYMBOL_STROKE} />
      <Pin x={-24} y={0} />
      <Pin x={10} y={-30} />
      <Pin x={10} y={30} />
      <text x={-18} y={-8} fontSize={8} fill={PIN_COLOR}>G</text>
      <text x={16} y={-24} fontSize={8} fill={PIN_COLOR}>D</text>
      <text x={16} y={28} fontSize={8} fill={PIN_COLOR}>S</text>
      {label && <text x={0} y={-36} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

/* ── Op-Amp (Triangle symbol) ──────────────────────────────────── */
function OpAmp({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  // Inputs left (+ bottom, - top), output right
  // Pin positions: V- at (-30,-12), V+ at (-30,12), Out at (30,0)
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={34} hh={26} />}
      {/* Triangle body */}
      <polygon points="-20,-24 -20,24 30,0" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinejoin="round" />
      {/* Input leads */}
      <line x1={-30} y1={-12} x2={-20} y2={-12} {...sp} />
      <line x1={-30} y1={12} x2={-20} y2={12} {...sp} />
      {/* Output lead */}
      <line x1={30} y1={0} x2={40} y2={0} {...sp} />
      {/* +/- labels inside */}
      <text x={-14} y={-8} fontSize={12} fill={SYMBOL_STROKE} fontWeight={600}>−</text>
      <text x={-14} y={17} fontSize={12} fill={SYMBOL_STROKE} fontWeight={600}>+</text>
      {/* Pins */}
      <Pin x={-30} y={-12} />
      <Pin x={-30} y={12} />
      <Pin x={40} y={0} />
      {label && <text x={0} y={-30} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

/* ── AC Source (sine wave in circle) ───────────────────────────── */
function AcSource({ x, y, rotation = 0, label, value, highlight }: {
  x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={16} hh={30} />}
      <line x1={0} y1={-30} x2={0} y2={-16} {...sp} />
      <line x1={0} y1={16} x2={0} y2={30} {...sp} />
      <circle cx={0} cy={0} r={16} fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      {/* Sine wave */}
      <path d="M-8,0 Q-4,-8 0,0 Q4,8 8,0" fill="none" stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <Pin x={0} y={-30} />
      <Pin x={0} y={30} />
      {label && <text x={-20} y={4} textAnchor="end" fontSize={10} fill={PIN_COLOR}>{label}</text>}
      {value && <text x={-20} y={16} textAnchor="end" fontSize={9} fill={PIN_COLOR}>{value}</text>}
    </g>
  );
}

/* ── LED ───────────────────────────────────────────────────────── */
function Led({ x, y, rotation = 0, label, color = "red", highlight }: {
  x: number; y: number; rotation?: number; label?: string; color?: string; highlight?: boolean;
}) {
  const fillColor = color === "red" ? "#ef4444" : color === "green" ? "#22c55e" : color === "yellow" ? "#eab308" : color === "blue" ? "#3b82f6" : "#f97316";
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={20} hh={14} />}
      <line x1={-20} y1={0} x2={-8} y2={0} {...sp} />
      <line x1={8} y1={0} x2={20} y2={0} {...sp} />
      <polygon points="-8,-9 -8,9 8,0" fill={fillColor} stroke={SYMBOL_STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <line x1={8} y1={-9} x2={8} y2={9} stroke={SYMBOL_STROKE} strokeWidth={2} />
      {/* Light rays */}
      <line x1={-2} y1={-12} x2={2} y2={-18} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={4} y1={-10} x2={10} y2={-16} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <Pin x={-20} y={0} />
      <Pin x={20} y={0} />
      {label && <text x={0} y={20} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

/* ── Probe Point (CRO/scope) ───────────────────────────────────── */
function Probe({ x, y, label, highlight }: {
  x: number; y: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      {highlight && <SelectionRect hw={8} hh={8} />}
      <circle cx={0} cy={0} r={6} fill={WIRE_HIGHLIGHT} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <circle cx={0} cy={0} r={2} fill={SYMBOL_STROKE} />
      {label && <text x={10} y={4} textAnchor="start" fontSize={9} fill={PIN_COLOR} fontWeight={500}>{label}</text>}
    </g>
  );
}

/* ── Logic Gates ───────────────────────────────────────────────── */
function AndGate({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  // 2-input AND: inputs left at y=-8 and y=8, output right at y=0
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={26} hh={18} />}
      {/* Body: flat left, curved right */}
      <path d="M-16,-16 L-16,16 L0,16 A16,16 0 0 0 0,-16 Z" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      {/* Input leads */}
      <line x1={-26} y1={-8} x2={-16} y2={-8} {...sp} />
      <line x1={-26} y1={8} x2={-16} y2={8} {...sp} />
      {/* Output lead */}
      <line x1={16} y1={0} x2={26} y2={0} {...sp} />
      <Pin x={-26} y={-8} />
      <Pin x={-26} y={8} />
      <Pin x={26} y={0} />
      {label && <text x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

function OrGate({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={26} hh={18} />}
      {/* OR shape */}
      <path d="M-16,-16 Q-6,-16 0,-16 Q16,-16 20,0 Q16,16 0,16 Q-6,16 -16,16 Q-8,0 -16,-16 Z" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={-26} y1={-8} x2={-12} y2={-8} {...sp} />
      <line x1={-26} y1={8} x2={-12} y2={8} {...sp} />
      <line x1={20} y1={0} x2={26} y2={0} {...sp} />
      <Pin x={-26} y={-8} />
      <Pin x={-26} y={8} />
      <Pin x={26} y={0} />
      {label && <text x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

function NotGate({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={22} hh={14} />}
      {/* Triangle */}
      <polygon points="-14,-12 -14,12 10,0" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      {/* Bubble */}
      <circle cx={14} cy={0} r={4} fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={-22} y1={0} x2={-14} y2={0} {...sp} />
      <line x1={18} y1={0} x2={26} y2={0} {...sp} />
      <Pin x={-22} y={0} />
      <Pin x={26} y={0} />
      {label && <text x={0} y={-18} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

function NandGate({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={28} hh={18} />}
      <path d="M-16,-16 L-16,16 L0,16 A16,16 0 0 0 0,-16 Z" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <circle cx={20} cy={0} r={4} fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={-26} y1={-8} x2={-16} y2={-8} {...sp} />
      <line x1={-26} y1={8} x2={-16} y2={8} {...sp} />
      <line x1={24} y1={0} x2={32} y2={0} {...sp} />
      <Pin x={-26} y={-8} />
      <Pin x={-26} y={8} />
      <Pin x={32} y={0} />
      {label && <text x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

function NorGate({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={28} hh={18} />}
      <path d="M-16,-16 Q-6,-16 0,-16 Q16,-16 20,0 Q16,16 0,16 Q-6,16 -16,16 Q-8,0 -16,-16 Z" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <circle cx={24} cy={0} r={4} fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={-26} y1={-8} x2={-12} y2={-8} {...sp} />
      <line x1={-26} y1={8} x2={-12} y2={8} {...sp} />
      <line x1={28} y1={0} x2={36} y2={0} {...sp} />
      <Pin x={-26} y={-8} />
      <Pin x={-26} y={8} />
      <Pin x={36} y={0} />
      {label && <text x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

function XorGate({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={28} hh={18} />}
      {/* Extra curve for XOR */}
      <path d="M-20,-16 Q-12,0 -20,16" fill="none" stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <path d="M-16,-16 Q-6,-16 0,-16 Q16,-16 20,0 Q16,16 0,16 Q-6,16 -16,16 Q-8,0 -16,-16 Z" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={-28} y1={-8} x2={-12} y2={-8} {...sp} />
      <line x1={-28} y1={8} x2={-12} y2={8} {...sp} />
      <line x1={20} y1={0} x2={28} y2={0} {...sp} />
      <Pin x={-28} y={-8} />
      <Pin x={-28} y={8} />
      <Pin x={28} y={0} />
      {label && <text x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

function XnorGate({ x, y, rotation = 0, label, highlight }: {
  x: number; y: number; rotation?: number; label?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={30} hh={18} />}
      <path d="M-20,-16 Q-12,0 -20,16" fill="none" stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <path d="M-16,-16 Q-6,-16 0,-16 Q16,-16 20,0 Q16,16 0,16 Q-6,16 -16,16 Q-8,0 -16,-16 Z" fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <circle cx={24} cy={0} r={4} fill={SYMBOL_BODY} stroke={SYMBOL_STROKE} strokeWidth={SW} />
      <line x1={-28} y1={-8} x2={-12} y2={-8} {...sp} />
      <line x1={-28} y1={8} x2={-12} y2={8} {...sp} />
      <line x1={28} y1={0} x2={36} y2={0} {...sp} />
      <Pin x={-28} y={-8} />
      <Pin x={-28} y={8} />
      <Pin x={36} y={0} />
      {label && <text x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</text>}
    </g>
  );
}

/* ── Dot-grid pattern (infinite via SVG <pattern>) ─────────────── */
const GRID_PAT_ID = "schematic-dot-grid";

/* ── Main component ────────────────────────────────────────────── */
export function CircuitSchematic({ schematic }: { schematic: SchematicData }) {
  const w = schematic.width ?? 340;
  const h = schematic.height ?? 260;

  // The viewBox stays tight around the circuit content (original sizing).
  // The dot-grid rect extends far beyond via a large negative offset,
  // but `overflow: visible` on the SVG lets PanZoomCanvas reveal it when panning.
  const DOT_PAD = 2000;

  return (
    <svg
      viewBox={`-10 -10 ${w + 20} ${h + 20}`}
      width="100%"
      height="100%"
      overflow="visible"
      style={{ background: CANVAS_BG, display: "block" }}
    >
      <defs>
        <pattern
          id={GRID_PAT_ID}
          x={0}
          y={0}
          width={GRID}
          height={GRID}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={0} cy={0} r={0.8} fill={GRID_DOT} />
        </pattern>
      </defs>

      {/* Dot grid — extends far beyond viewBox so it's visible when panning */}
      <rect
        x={-DOT_PAD}
        y={-DOT_PAD}
        width={w + DOT_PAD * 2}
        height={h + DOT_PAD * 2}
        fill={`url(#${GRID_PAT_ID})`}
      />

      {schematic.elements.map((el) => {
        switch (el.type) {
          case "resistor":
            return <Resistor key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
          case "zener":
            return <ZenerDiode key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
          case "diode":
            return <Diode key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "capacitor":
            return <Capacitor key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
          case "vsource":
            return <VSource key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
          case "ground":
            return <Ground key={el.id} x={el.x} y={el.y} />;
          case "ammeter":
            return <MeterCircle key={el.id} x={el.x} y={el.y} rotation={el.rotation} letter="A" label={el.label} highlight={el.highlight} />;
          case "voltmeter":
            return <MeterCircle key={el.id} x={el.x} y={el.y} rotation={el.rotation} letter="V" label={el.label} highlight={el.highlight} />;
          case "wire":
            return <Wire key={el.id} points={el.points} highlight={el.highlight} />;
          case "junction":
            return <Junction key={el.id} x={el.x} y={el.y} />;
          case "label":
            return <Label key={el.id} x={el.x} y={el.y} text={el.text} />;
          // Transistors
          case "npn-bjt":
            return <NpnBjt key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "pnp-bjt":
            return <PnpBjt key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "n-mosfet":
            return <NMosfet key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "p-mosfet":
            return <PMosfet key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          // Op-amp
          case "op-amp":
            return <OpAmp key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          // AC source
          case "acsource":
            return <AcSource key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
          // LED
          case "led":
            return <Led key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} color={el.color} highlight={el.highlight} />;
          // Probe
          case "probe":
            return <Probe key={el.id} x={el.x} y={el.y} label={el.label} highlight={el.highlight} />;
          // Logic gates
          case "and-gate":
            return <AndGate key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "or-gate":
            return <OrGate key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "not-gate":
            return <NotGate key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "nand-gate":
            return <NandGate key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "nor-gate":
            return <NorGate key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "xor-gate":
            return <XorGate key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          case "xnor-gate":
            return <XnorGate key={el.id} x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
          default:
            return null;
        }
      })}
    </svg>
  );
}
