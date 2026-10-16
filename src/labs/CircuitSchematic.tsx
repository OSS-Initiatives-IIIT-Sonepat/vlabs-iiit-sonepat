"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLabInteraction } from "./lab-interaction";
import { textBaselineOffset, uprightTextCenter } from "./schematics/geometry";

/* ── OpenBench-faithful tokens ─────────────────────────────────── */
const CANVAS_BG = "#fafafa";
const GRID_DOT = "rgba(212,212,212,0.45)";
const WIRE = "#171717";
const WIRE_HIGHLIGHT = "#2563eb";
const HOVER_FILL = "rgba(250,204,21,0.3)";
const HOVER_STROKE = "#eab308";
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

export type SchematicElement = (
  | { type: "resistor"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
  | { type: "zener"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
  | { type: "diode"; id: string; x: number; y: number; rotation?: number; label?: string; highlight?: boolean }
  | { type: "capacitor"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
  | { type: "inductor"; id: string; x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean }
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
  | { type: "probe"; id: string; x: number; y: number; label?: string; highlight?: boolean }
) & {
  /** Id of the 3D component this symbol stands for, when it can't be inferred. */
  ref?: string;
};

export type SchematicData = {
  elements: SchematicElement[];
  width?: number;
  height?: number;
  /** Symbols shown on their own (a legend or pictorial), not a wired circuit. */
  gallery?: boolean;
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

/* ── Symbol text: stays upright when the symbol is rotated ─────── */
function SymText({ x, y, rotation = 0, textAnchor = "start", fontSize, fill = PIN_COLOR, fontWeight, inside, children }: {
  x: number; y: number; rotation?: number; textAnchor?: "start" | "middle" | "end";
  fontSize: number; fill?: string; fontWeight?: number; inside?: boolean; children: string;
}) {
  if (!(rotation % 360)) {
    return <text x={x} y={y} textAnchor={textAnchor} fontSize={fontSize} fill={fill} fontWeight={fontWeight}>{children}</text>;
  }
  const c = uprightTextCenter({ x, y, text: children, fontSize, anchor: textAnchor }, rotation, inside);
  return (
    <text x={c.x} y={c.y + textBaselineOffset(fontSize)} transform={`rotate(${-rotation})`} textAnchor="middle" fontSize={fontSize} fill={fill} fontWeight={fontWeight}>
      {children}
    </text>
  );
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
      {label && <SymText rotation={rotation} x={0} y={-14} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
      {value && <SymText rotation={rotation} x={0} y={22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{value}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-18} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
      {value && <SymText rotation={rotation} x={0} y={24} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{value}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-18} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-16} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
      {value && <SymText rotation={rotation} x={0} y={22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{value}</SymText>}
    </g>
  );
}

function Inductor({ x, y, rotation = 0, label, value, highlight }: {
  x: number; y: number; rotation?: number; label?: string; value?: string; highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={30} hh={10} />}
      <line x1={-30} y1={0} x2={-20} y2={0} {...sp} />
      <line x1={20} y1={0} x2={30} y2={0} {...sp} />
      <path
        d="M -20 0 a 5 5 0 0 1 10 0 a 5 5 0 0 1 10 0 a 5 5 0 0 1 10 0 a 5 5 0 0 1 10 0"
        fill="none"
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinecap="round"
      />
      <Pin x={-30} y={0} />
      <Pin x={30} y={0} />
      {label && <SymText rotation={rotation} x={0} y={-12} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
      {value && <SymText rotation={rotation} x={0} y={16} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{value}</SymText>}
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
      <SymText rotation={rotation} x={12} y={-10} fontSize={10} fill={SYMBOL_STROKE} fontWeight={600}>+</SymText>
      <SymText rotation={rotation} x={12} y={16} fontSize={10} fill={SYMBOL_STROKE} fontWeight={600}>−</SymText>
      {/* pins */}
      <Pin x={0} y={-30} />
      <Pin x={0} y={30} />
      {label && <SymText rotation={rotation} x={-18} y={4} textAnchor="end" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
      {value && <SymText rotation={rotation} x={-18} y={16} textAnchor="end" fontSize={9} fill={PIN_COLOR}>{value}</SymText>}
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
      <SymText rotation={rotation} inside x={0} y={5} textAnchor="middle" fontSize={13} fontWeight={600} fill={SYMBOL_STROKE}>{letter}</SymText>
      <line x1={0} y1={-14} x2={0} y2={-24} {...sp} />
      <line x1={0} y1={14} x2={0} y2={24} {...sp} />
      <Pin x={0} y={-24} />
      <Pin x={0} y={24} />
      {label && <SymText rotation={rotation} x={18} y={4} textAnchor="start" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
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
      <SymText rotation={rotation} x={-14} y={-8} fontSize={8} fill={PIN_COLOR}>B</SymText>
      <SymText rotation={rotation} x={24} y={-24} fontSize={8} fill={PIN_COLOR}>C</SymText>
      <SymText rotation={rotation} x={24} y={28} fontSize={8} fill={PIN_COLOR}>E</SymText>
      {label && <SymText rotation={rotation} x={0} y={-28} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
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
      <SymText rotation={rotation} x={-14} y={-8} fontSize={8} fill={PIN_COLOR}>B</SymText>
      <SymText rotation={rotation} x={24} y={-24} fontSize={8} fill={PIN_COLOR}>C</SymText>
      <SymText rotation={rotation} x={24} y={28} fontSize={8} fill={PIN_COLOR}>E</SymText>
      {label && <SymText rotation={rotation} x={0} y={-28} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
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
      <SymText rotation={rotation} x={-18} y={-8} fontSize={8} fill={PIN_COLOR}>G</SymText>
      <SymText rotation={rotation} x={16} y={-24} fontSize={8} fill={PIN_COLOR}>D</SymText>
      <SymText rotation={rotation} x={16} y={28} fontSize={8} fill={PIN_COLOR}>S</SymText>
      {label && <SymText rotation={rotation} x={-14} y={-20} textAnchor="end" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
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
      <SymText rotation={rotation} x={-18} y={-8} fontSize={8} fill={PIN_COLOR}>G</SymText>
      <SymText rotation={rotation} x={16} y={-24} fontSize={8} fill={PIN_COLOR}>D</SymText>
      <SymText rotation={rotation} x={16} y={28} fontSize={8} fill={PIN_COLOR}>S</SymText>
      {label && <SymText rotation={rotation} x={-14} y={-20} textAnchor="end" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
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
      <SymText rotation={rotation} inside x={-14} y={-8} fontSize={12} fill={SYMBOL_STROKE} fontWeight={600}>−</SymText>
      <SymText rotation={rotation} inside x={-14} y={17} fontSize={12} fill={SYMBOL_STROKE} fontWeight={600}>+</SymText>
      {/* Pins */}
      <Pin x={-30} y={-12} />
      <Pin x={-30} y={12} />
      <Pin x={40} y={0} />
      {label && <SymText rotation={rotation} x={0} y={-30} textAnchor="middle" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={-20} y={4} textAnchor="end" fontSize={10} fill={PIN_COLOR}>{label}</SymText>}
      {value && <SymText rotation={rotation} x={-20} y={16} textAnchor="end" fontSize={9} fill={PIN_COLOR}>{value}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={20} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-18} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</SymText>}
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
      {label && <SymText rotation={rotation} x={0} y={-22} textAnchor="middle" fontSize={9} fill={PIN_COLOR}>{label}</SymText>}
    </g>
  );
}

/* ── Dot-grid pattern (infinite via SVG <pattern>) ─────────────── */
const GRID_PAT_ID = "schematic-dot-grid";

/* ── Main component ────────────────────────────────────────────── */

/** Half-extents [hw, hh, cx] of each linkable symbol, in its local frame. */
const SYMBOL_BOUNDS: Partial<Record<SchematicElement["type"], [number, number, number?]>> = {
  resistor: [32, 12],
  zener: [22, 14],
  diode: [22, 14],
  capacitor: [22, 14],
  inductor: [32, 12],
  vsource: [18, 32],
  acsource: [20, 32],
  ammeter: [17, 26],
  voltmeter: [17, 26],
  "npn-bjt": [24, 32, 2],
  "pnp-bjt": [24, 32, 2],
  "n-mosfet": [26, 32, -4],
  "p-mosfet": [26, 32, -4],
  "op-amp": [38, 27, 5],
  led: [22, 20],
  probe: [10, 10],
  "and-gate": [30, 19],
  "or-gate": [30, 19],
  "not-gate": [28, 15, 2],
  "nand-gate": [34, 19, 3],
  "nor-gate": [36, 19, 5],
  "xor-gate": [32, 19],
  "xnor-gate": [36, 19, 4],
};

export type SchematicLink = { id: string; name: string };

export function CircuitSchematic({
  schematic,
  linkElement,
}: {
  schematic: SchematicData;
  /** Maps a symbol to its 3D component; enables hover/select linking. */
  linkElement?: (el: SchematicElement) => SchematicLink | null;
}) {
  const w = schematic.width ?? 340;
  const h = schematic.height ?? 260;
  const { hovered, hover, unhover, setSelectedId } = useLabInteraction();
  const [tag, setTag] = useState<{ key: string; name: string; x: number; y: number } | null>(null);
  const hitRefs = useRef(new Map<string, SVGRectElement>());

  // The viewBox stays tight around the circuit content (original sizing).
  // The dot-grid rect extends far beyond via a large negative offset,
  // but `overflow: visible` on the SVG lets PanZoomCanvas reveal it when panning.
  const DOT_PAD = 2000;

  function showTag(el: SchematicElement, link: SchematicLink) {
    const rect = hitRefs.current.get(el.id)?.getBoundingClientRect();
    if (!rect) return;
    setTag({ key: el.id, name: link.name, x: rect.left + rect.width / 2, y: rect.top });
  }

  return (
    <>
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
          const symbol = renderSymbol(el);
          const bounds = SYMBOL_BOUNDS[el.type];
          const link = bounds && linkElement ? linkElement(el) : null;
          if (!link || !bounds || !("x" in el)) {
            return <React.Fragment key={el.id}>{symbol}</React.Fragment>;
          }

          const [hw, hh, cx = 0] = bounds;
          const rotation = "rotation" in el ? (el.rotation ?? 0) : 0;
          const isHovered = hovered?.id === link.id;
          const frame = `translate(${el.x},${el.y}) rotate(${rotation})`;

          return (
            <g
              key={el.id}
              style={{ cursor: "pointer" }}
              onPointerEnter={() => {
                hover(link.id, "2d");
                showTag(el, link);
              }}
              onPointerLeave={() => {
                unhover("2d");
                setTag(null);
              }}
              // Keep the click from starting a pan of the schematic canvas.
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setTag(null);
                setSelectedId(link.id);
              }}
            >
              {isHovered && (
                <g transform={frame}>
                  <rect
                    x={cx - hw}
                    y={-hh}
                    width={hw * 2}
                    height={hh * 2}
                    rx={5}
                    fill={HOVER_FILL}
                    stroke={HOVER_STROKE}
                    strokeWidth={1.2}
                  />
                </g>
              )}
              {symbol}
              <g transform={frame}>
                <rect
                  ref={(node) => {
                    if (node) hitRefs.current.set(el.id, node);
                    else hitRefs.current.delete(el.id);
                  }}
                  x={cx - hw}
                  y={-hh}
                  width={hw * 2}
                  height={hh * 2}
                  fill="transparent"
                  pointerEvents="all"
                />
              </g>
            </g>
          );
        })}
      </svg>

      {tag &&
        hovered?.source === "2d" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: tag.x,
              top: tag.y - 8,
              transform: "translate(-50%, -100%)",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <div key={tag.key} className="lab-name-tag">
              {tag.name}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function renderSymbol(el: SchematicElement): React.ReactNode {
  switch (el.type) {
    case "resistor":
      return <Resistor x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
    case "zener":
      return <ZenerDiode x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
    case "diode":
      return <Diode x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "capacitor":
      return <Capacitor x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
    case "inductor":
      return <Inductor x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
    case "vsource":
      return <VSource x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
    case "ground":
      return <Ground x={el.x} y={el.y} />;
    case "ammeter":
      return <MeterCircle x={el.x} y={el.y} rotation={el.rotation} letter="A" label={el.label} highlight={el.highlight} />;
    case "voltmeter":
      return <MeterCircle x={el.x} y={el.y} rotation={el.rotation} letter="V" label={el.label} highlight={el.highlight} />;
    case "wire":
      return <Wire points={el.points} highlight={el.highlight} />;
    case "junction":
      return <Junction x={el.x} y={el.y} />;
    case "label":
      return <Label x={el.x} y={el.y} text={el.text} />;
    // Transistors
    case "npn-bjt":
      return <NpnBjt x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "pnp-bjt":
      return <PnpBjt x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "n-mosfet":
      return <NMosfet x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "p-mosfet":
      return <PMosfet x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    // Op-amp
    case "op-amp":
      return <OpAmp x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    // AC source
    case "acsource":
      return <AcSource x={el.x} y={el.y} rotation={el.rotation} label={el.label} value={el.value} highlight={el.highlight} />;
    // LED
    case "led":
      return <Led x={el.x} y={el.y} rotation={el.rotation} label={el.label} color={el.color} highlight={el.highlight} />;
    // Probe
    case "probe":
      return <Probe x={el.x} y={el.y} label={el.label} highlight={el.highlight} />;
    // Logic gates
    case "and-gate":
      return <AndGate x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "or-gate":
      return <OrGate x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "not-gate":
      return <NotGate x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "nand-gate":
      return <NandGate x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "nor-gate":
      return <NorGate x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "xor-gate":
      return <XorGate x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    case "xnor-gate":
      return <XnorGate x={el.x} y={el.y} rotation={el.rotation} label={el.label} highlight={el.highlight} />;
    default:
      return null;
  }
}
