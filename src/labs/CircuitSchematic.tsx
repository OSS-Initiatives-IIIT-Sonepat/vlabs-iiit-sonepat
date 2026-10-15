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
  | { type: "label"; id: string; x: number; y: number; text: string };

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

/* ── Dot-grid pattern (exact OpenBench) ────────────────────────── */
function DotGrid({ width, height }: { width: number; height: number }) {
  const dots: React.ReactElement[] = [];
  for (let gx = 0; gx <= width; gx += GRID) {
    for (let gy = 0; gy <= height; gy += GRID) {
      dots.push(<circle key={`${gx}-${gy}`} cx={gx} cy={gy} r={0.8} fill={GRID_DOT} />);
    }
  }
  return <g>{dots}</g>;
}

/* ── Main component ────────────────────────────────────────────── */
export function CircuitSchematic({ schematic }: { schematic: SchematicData }) {
  const w = schematic.width ?? 340;
  const h = schematic.height ?? 260;

  return (
    <svg
      viewBox={`-10 -10 ${w + 20} ${h + 20}`}
      width="100%"
      height="100%"
      style={{ background: CANVAS_BG, borderRadius: 6, display: "block" }}
    >
      <DotGrid width={w} height={h} />

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
          default:
            return null;
        }
      })}
    </svg>
  );
}
