"use client";

import React, { useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLabInteraction } from "./lab-interaction";
import {
  PT_ICON_SIZE,
  PT_WINDOW,
  ptLinkPoints,
  ptWindowHeight,
  textBaselineOffset,
  uprightTextCenter,
  wideOrInputs,
} from "./schematics/geometry";

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
  | {
      type: "resistor";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      value?: string;
      highlight?: boolean;
    }
  | {
      type: "zener";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      value?: string;
      highlight?: boolean;
    }
  | {
      type: "diode";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "capacitor";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      value?: string;
      highlight?: boolean;
    }
  | {
      type: "inductor";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      value?: string;
      highlight?: boolean;
    }
  | {
      type: "vsource";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      value?: string;
      highlight?: boolean;
    }
  | { type: "ground"; id: string; x: number; y: number }
  | {
      type: "ammeter";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "voltmeter";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "wire";
      id: string;
      points: Pt[];
      highlight?: boolean;
      color?: string;
    }
  | { type: "junction"; id: string; x: number; y: number; color?: string }
  | {
      type: "label";
      id: string;
      x: number;
      y: number;
      text: string;
      color?: string;
      size?: number;
      /** Which end of the text sits at `x`. The middle by default. */
      anchor?: "start" | "middle" | "end";
      weight?: number;
    }
  // Transistors
  | {
      type: "npn-bjt";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "pnp-bjt";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "n-mosfet";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "p-mosfet";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  // Op-amp
  | {
      type: "op-amp";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  // Logic gates
  | {
      type: "and-gate";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "or-gate";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  /** Tall OR. `x`,`y` are the centre. `n` inputs are spaced down the left side. */
  | {
      type: "wide-or";
      id: string;
      x: number;
      y: number;
      h: number;
      n: number;
      highlight?: boolean;
    }
  | {
      type: "not-gate";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "nand-gate";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "nor-gate";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "xor-gate";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  | {
      type: "xnor-gate";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      highlight?: boolean;
    }
  // LED indicator
  | {
      type: "led";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      color?: string;
      highlight?: boolean;
    }
  // Function generator / AC source
  | {
      type: "acsource";
      id: string;
      x: number;
      y: number;
      rotation?: number;
      label?: string;
      value?: string;
      highlight?: boolean;
    }
  // Oscilloscope probe point
  | {
      type: "probe";
      id: string;
      x: number;
      y: number;
      label?: string;
      highlight?: boolean;
    }
  /** Rectangle in the same stroke as an IC body. `x` and `y` are the centre. */
  | {
      type: "block";
      id: string;
      x: number;
      y: number;
      w: number;
      h: number;
      label?: string;
      highlight?: boolean;
      fill?: string;
      ink?: string;
    }
  /** Rounded start or end terminal. `x` and `y` are the centre. */
  | {
      type: "terminal";
      id: string;
      x: number;
      y: number;
      w: number;
      h: number;
      label?: string;
      highlight?: boolean;
      fill?: string;
      ink?: string;
    }
  /** Diamond. `x` and `y` are the centre. Pins sit on the four points. */
  | {
      type: "decision";
      id: string;
      x: number;
      y: number;
      w: number;
      h: number;
      label?: string;
      highlight?: boolean;
    }
  /** One memory row: address, bits, contents. `x` and `y` are the left edge. */
  | {
      type: "memword";
      id: string;
      x: number;
      y: number;
      address: string;
      bits?: string;
      value: string;
      highlight?: boolean;
    }
  /** A wire that ends in an arrow head. `size` is the head length. */
  | {
      type: "arrow";
      id: string;
      points: Pt[];
      highlight?: boolean;
      color?: string;
      size?: number;
      double?: boolean;
      /** Broken shaft, for a peer protocol rather than a wire. */
      dashed?: boolean;
    }
  /**
   * Hollow frame: left bar, right bar, and a bar across the bottom.
   * `x` and `y` are the centre. Decorative — wires are not blocked by it.
   */
  | {
      type: "panel";
      id: string;
      x: number;
      y: number;
      w: number;
      h: number;
      t: number;
      fill?: string;
    }
  /**
   * Memory stack: straight sides, a wave along the top, a wave along the bottom.
   * `x` and `y` are the centre of the straight part. Decorative — it has no pins.
   */
  | {
      type: "stack";
      id: string;
      x: number;
      y: number;
      w: number;
      h: number;
      split?: boolean;
      highlight?: boolean;
    }
  /** A device icon of a Packet Tracer logical view. `x` and `y` are the centre. */
  | {
      type: "pt-device";
      id: string;
      x: number;
      y: number;
      kind: PtIcon;
      highlight?: boolean;
    }
  /**
   * A Packet Tracer cable from `a` to `b`, drawn straight in the style of
   * its kind, with a link light near each end.
   */
  | {
      type: "pt-link";
      id: string;
      a: Pt;
      b: Pt;
      cable: PtCable;
      lights?: readonly [PtLight, PtLight];
      highlight?: boolean;
    }
  /**
   * A PDU envelope that runs along `path` in simulation mode. It moves from
   * `begin` to `end` seconds of a `cycle` that repeats, and hides otherwise.
   */
  | {
      type: "pt-pdu";
      id: string;
      path: Pt[];
      color: string;
      begin: number;
      end: number;
      cycle: number;
      /** Lost at the end of its path: a red cross shows where. */
      drop?: boolean;
    }
  /** A filled rectangle drawn on the workspace to mark an area. Top left at `x`, `y`. */
  | {
      type: "pt-area";
      id: string;
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
    }
  /**
   * A Packet Tracer window: the Simulation Panel's event list, a PDU
   * information table, or a device's CLI tab. Top left at `x`, `y`; its
   * height comes from `ptWindowHeight`.
   */
  | ({
      type: "pt-window";
      id: string;
      x: number;
      y: number;
    } & PtWindow)
  /** The Logical / Physical tab bar across the top of the workspace. */
  | {
      type: "pt-bar";
      id: string;
      w: number;
      mode: "realtime" | "simulation";
    }
) & {
  /** Id of the 3D component this symbol stands for, when it can't be inferred. */
  ref?: string;
};

export type PtIcon =
  | "pc"
  | "laptop"
  | "server"
  | "switch"
  | "hub"
  | "router"
  | "ap"
  | "printer"
  | "cloud"
  | "terminator"
  | "tap";

export type PtCable =
  "straight" | "cross" | "console" | "serial" | "fiber" | "coax" | "wifi";

export type PtRow = {
  cells: readonly string[];
  /** Colour of the PDU square drawn in the window's swatch column. */
  swatch?: string;
  /** The event being looked at: highlighted, with the eye in the first column. */
  current?: boolean;
  /** "lost" is drawn red; "note" is one grey line across the table. */
  tone?: "lost" | "note";
};

export type PtWindow = {
  w: number;
  title: string;
  tabs?: readonly string[];
  tab?: number;
  heading?: string;
  columns?: readonly { label: string; w: number }[];
  rows?: readonly PtRow[];
  swatchCol?: number;
  /** Lines of a command line. The last "input" line gets the cursor. */
  console?: readonly { text: string; tone?: "input" | "output" }[];
  footer?: string;
};

/** Link light: green when up, red when down, amber while a port waits. */
export type PtLight = "up" | "down" | "amber" | "none";

export type SchematicData = {
  elements: SchematicElement[];
  width?: number;
  height?: number;
  /** A plain white workspace with no dot grid, as in Packet Tracer. */
  plain?: boolean;
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
function SymText({
  x,
  y,
  rotation = 0,
  textAnchor = "start",
  fontSize,
  fill = PIN_COLOR,
  fontWeight,
  inside,
  children,
}: {
  x: number;
  y: number;
  rotation?: number;
  textAnchor?: "start" | "middle" | "end";
  fontSize: number;
  fill?: string;
  fontWeight?: number;
  inside?: boolean;
  children: string;
}) {
  if (!(rotation % 360)) {
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fontSize={fontSize}
        fill={fill}
        fontWeight={fontWeight}
      >
        {children}
      </text>
    );
  }
  const c = uprightTextCenter(
    { x, y, text: children, fontSize, anchor: textAnchor },
    rotation,
    inside,
  );
  return (
    <text
      x={c.x}
      y={c.y + textBaselineOffset(fontSize)}
      transform={`rotate(${-rotation})`}
      textAnchor="middle"
      fontSize={fontSize}
      fill={fill}
      fontWeight={fontWeight}
    >
      {children}
    </text>
  );
}

/* ── Symbols (OpenBench faithful) ──────────────────────────────── */

function Resistor({
  x,
  y,
  rotation = 0,
  label,
  value,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={30} hh={10} />}
      {/* leads */}
      <line x1={-30} y1={0} x2={-20} y2={0} {...sp} />
      <line x1={20} y1={0} x2={30} y2={0} {...sp} />
      {/* body */}
      <rect
        x={-20}
        y={-7}
        width={40}
        height={14}
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      {/* pins */}
      <Pin x={-30} y={0} />
      <Pin x={30} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-14}
          textAnchor="middle"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
      {value && (
        <SymText
          rotation={rotation}
          x={0}
          y={22}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {value}
        </SymText>
      )}
    </g>
  );
}

function ZenerDiode({
  x,
  y,
  rotation = 0,
  label,
  value,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={20} hh={14} />}
      {/* leads */}
      <line x1={-20} y1={0} x2={-8} y2={0} {...sp} />
      <line x1={8} y1={0} x2={20} y2={0} {...sp} />
      {/* triangle (anode side) */}
      <polygon
        points="-8,-9 -8,9 8,0"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {/* cathode bar */}
      <line
        x1={8}
        y1={-9}
        x2={8}
        y2={9}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      {/* zener wings */}
      <line
        x1={8}
        y1={-9}
        x2={4}
        y2={-9}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinecap="round"
      />
      <line
        x1={8}
        y1={9}
        x2={12}
        y2={9}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinecap="round"
      />
      {/* pins */}
      <Pin x={-20} y={0} />
      <Pin x={20} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-18}
          textAnchor="middle"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
      {value && (
        <SymText
          rotation={rotation}
          x={0}
          y={24}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {value}
        </SymText>
      )}
    </g>
  );
}

function Diode({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={20} hh={14} />}
      <line x1={-20} y1={0} x2={-8} y2={0} {...sp} />
      <line x1={8} y1={0} x2={20} y2={0} {...sp} />
      <polygon
        points="-8,-9 -8,9 8,0"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <line
        x1={8}
        y1={-9}
        x2={8}
        y2={9}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      <Pin x={-20} y={0} />
      <Pin x={20} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-18}
          textAnchor="middle"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

function Capacitor({
  x,
  y,
  rotation = 0,
  label,
  value,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={20} hh={12} />}
      <line x1={-20} y1={0} x2={-4} y2={0} {...sp} />
      <line x1={4} y1={0} x2={20} y2={0} {...sp} />
      <line
        x1={-4}
        y1={-12}
        x2={-4}
        y2={12}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      <line
        x1={4}
        y1={-12}
        x2={4}
        y2={12}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      <Pin x={-20} y={0} />
      <Pin x={20} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-16}
          textAnchor="middle"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
      {value && (
        <SymText
          rotation={rotation}
          x={0}
          y={22}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {value}
        </SymText>
      )}
    </g>
  );
}

function Inductor({
  x,
  y,
  rotation = 0,
  label,
  value,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  value?: string;
  highlight?: boolean;
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
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-12}
          textAnchor="middle"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
      {value && (
        <SymText
          rotation={rotation}
          x={0}
          y={16}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {value}
        </SymText>
      )}
    </g>
  );
}

function VSource({
  x,
  y,
  rotation = 0,
  label,
  value,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={16} hh={30} />}
      {/* leads */}
      <line x1={0} y1={-30} x2={0} y2={-4} {...sp} />
      <line x1={0} y1={4} x2={0} y2={30} {...sp} />
      {/* + plate (long) */}
      <line
        x1={-16}
        y1={-4}
        x2={16}
        y2={-4}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      {/* - plate (short, thick) */}
      <line
        x1={-8}
        y1={4}
        x2={8}
        y2={4}
        stroke={SYMBOL_STROKE}
        strokeWidth={3}
      />
      {/* +/- signs */}
      <SymText
        rotation={rotation}
        x={12}
        y={-10}
        fontSize={10}
        fill={SYMBOL_STROKE}
        fontWeight={600}
      >
        +
      </SymText>
      <SymText
        rotation={rotation}
        x={12}
        y={16}
        fontSize={10}
        fill={SYMBOL_STROKE}
        fontWeight={600}
      >
        −
      </SymText>
      {/* pins */}
      <Pin x={0} y={-30} />
      <Pin x={0} y={30} />
      {label && (
        <SymText
          rotation={rotation}
          x={-18}
          y={4}
          textAnchor="end"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
      {value && (
        <SymText
          rotation={rotation}
          x={-18}
          y={16}
          textAnchor="end"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {value}
        </SymText>
      )}
    </g>
  );
}

function Ground({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={0} y1={0} x2={0} y2={0} {...sp} />
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={8}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line
        x1={-14}
        y1={8}
        x2={14}
        y2={8}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinecap="round"
      />
      <line
        x1={-9}
        y1={13}
        x2={9}
        y2={13}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinecap="round"
      />
      <line
        x1={-4}
        y1={18}
        x2={4}
        y2={18}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinecap="round"
      />
    </g>
  );
}

function MeterCircle({
  x,
  y,
  rotation = 0,
  letter,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  letter: string;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={14} hh={14} />}
      <circle
        cx={0}
        cy={0}
        r={14}
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <SymText
        rotation={rotation}
        inside
        x={0}
        y={5}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill={SYMBOL_STROKE}
      >
        {letter}
      </SymText>
      <line x1={0} y1={-14} x2={0} y2={-24} {...sp} />
      <line x1={0} y1={14} x2={0} y2={24} {...sp} />
      <Pin x={0} y={-24} />
      <Pin x={0} y={24} />
      {label && (
        <SymText
          rotation={rotation}
          x={18}
          y={4}
          textAnchor="start"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

const SchematicMotion = React.createContext(false);

function arrowHead(tip: Pt, toward: Pt, head: number) {
  const len = Math.hypot(toward.x - tip.x, toward.y - tip.y) || 1;
  const ux = (toward.x - tip.x) / len;
  const uy = (toward.y - tip.y) / len;
  const base = { x: tip.x + ux * head, y: tip.y + uy * head };
  const wing = head * 0.62;
  const left = { x: base.x - uy * wing, y: base.y + ux * wing };
  const right = { x: base.x + uy * wing, y: base.y - ux * wing };
  return {
    base,
    points: `${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`,
  };
}

function Arrow({
  points,
  highlight,
  color,
  size,
  double: both,
  dashed,
}: {
  points: Pt[];
  highlight?: boolean;
  color?: string;
  size?: number;
  double?: boolean;
  dashed?: boolean;
}) {
  const draw = useContext(SchematicMotion);
  if (points.length < 2) return null;
  const head = size ?? 11;
  const end = arrowHead(
    points[points.length - 1],
    points[points.length - 2],
    head,
  );
  let shaft = points.slice(0, -1).concat([end.base]);
  let tail = "";
  if (both) {
    const start = arrowHead(shaft[0], shaft[1] ?? end.base, head);
    shaft = [start.base, ...shaft.slice(1)];
    tail = start.points;
  }
  const d = shaft
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const stroke = color ?? (highlight ? WIRE_HIGHLIGHT : WIRE);
  const glide = {
    transition: "stroke 320ms ease, fill 320ms ease, stroke-width 320ms ease",
  };
  return (
    <g>
      <path
        d={d}
        stroke={stroke}
        strokeWidth={color || highlight ? 2.5 : SW}
        fill="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        pathLength={draw && !dashed ? 1 : undefined}
        style={
          dashed
            ? { ...glide, strokeDasharray: "6 4" }
            : draw
              ? {
                  ...glide,
                  strokeDasharray: 1,
                  animation: "schematic-draw 520ms ease both",
                }
              : glide
        }
      />
      <polygon
        points={end.points}
        fill={stroke}
        style={
          draw ? { animation: "schematic-in 280ms ease 240ms both" } : glide
        }
      />
      {tail && (
        <polygon
          points={tail}
          fill={stroke}
          style={
            draw ? { animation: "schematic-in 280ms ease 240ms both" } : glide
          }
        />
      )}
    </g>
  );
}

/** Left bar, right bar, and the bar that closes the bottom. The top stays open. */
function FramePanel({
  x,
  y,
  w,
  h,
  t,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  t: number;
  fill?: string;
}) {
  const x0 = -w / 2;
  const y0 = -h / 2;
  const d = [
    `M ${x0} ${y0}`,
    `L ${x0} ${y0 + h}`,
    `L ${x0 + w} ${y0 + h}`,
    `L ${x0 + w} ${y0}`,
    `L ${x0 + w - t} ${y0}`,
    `L ${x0 + w - t} ${y0 + h - t}`,
    `L ${x0 + t} ${y0 + h - t}`,
    `L ${x0 + t} ${y0}`,
    "Z",
  ].join(" ");
  return (
    <path d={d} transform={`translate(${x},${y})`} fill={fill ?? "#8a8a8a"} />
  );
}

function FlowBox({
  x,
  y,
  w,
  h,
  label,
  highlight,
  diamond,
  rounded,
  fill,
  ink,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  highlight?: boolean;
  diamond?: boolean;
  rounded?: boolean;
  fill?: string;
  ink?: string;
}) {
  const stroke = highlight ? WIRE_HIGHLIGHT : SYMBOL_STROKE;
  const body = fill ?? (highlight ? "#eff6ff" : SYMBOL_BODY);
  const points = diamond
    ? `${w / 2},0 ${0},${h / 2} ${-w / 2},0 ${0},${-h / 2}`
    : undefined;
  const glide = {
    transition: "stroke 320ms ease, fill 320ms ease, stroke-width 320ms ease",
  };
  return (
    <g transform={`translate(${x},${y})`}>
      {highlight && <SelectionRect hw={w / 2} hh={h / 2} />}
      {diamond ? (
        <polygon
          points={points}
          fill={body}
          stroke={stroke}
          strokeWidth={highlight ? 2.5 : SW}
          style={glide}
        />
      ) : (
        <rect
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          rx={rounded ? h / 2 : fill ? 0 : 6}
          fill={body}
          stroke={stroke}
          strokeWidth={highlight ? 2.5 : SW}
          style={glide}
        />
      )}
      {label &&
        label.split("\n").map((line, i, lines) => (
          <text
            key={line}
            x={0}
            y={4 + (i - (lines.length - 1) / 2) * 13}
            textAnchor="middle"
            fontSize={11}
            fill={ink ?? SYMBOL_STROKE}
            fontWeight={highlight ? 600 : 500}
          >
            {line}
          </text>
        ))}
    </g>
  );
}

/** Textbook memory: gray stack, curved top and bottom, optional split. */
function MemoryStack({
  x,
  y,
  w,
  h,
  split,
  highlight,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  split?: boolean;
  highlight?: boolean;
}) {
  const hw = w / 2;
  const hh = h / 2;
  const a = Math.min(20, w * 0.1);
  const d = [
    `M ${-hw} ${-hh}`,
    `Q ${-hw * 0.75} ${-hh - a} ${-hw * 0.5} ${-hh}`,
    `Q ${-hw * 0.25} ${-hh + a} 0 ${-hh}`,
    `Q ${hw * 0.25} ${-hh - a} ${hw * 0.5} ${-hh}`,
    `Q ${hw * 0.75} ${-hh + a} ${hw} ${-hh}`,
    `L ${hw} ${hh}`,
    `Q ${hw * 0.75} ${hh + a} ${hw * 0.5} ${hh}`,
    `Q ${hw * 0.25} ${hh - a} 0 ${hh}`,
    `Q ${-hw * 0.25} ${hh + a} ${-hw * 0.5} ${hh}`,
    `Q ${-hw * 0.75} ${hh - a} ${-hw} ${hh}`,
    "Z",
  ].join(" ");
  const stroke = highlight ? WIRE_HIGHLIGHT : SYMBOL_STROKE;
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d={d}
        fill={highlight ? "#e8eef9" : "#e4e4e7"}
        stroke={stroke}
        strokeWidth={highlight ? 2.5 : SW}
      />
      {split && (
        <line
          x1={-hw + 8}
          y1={0}
          x2={hw - 8}
          y2={0}
          stroke={stroke}
          strokeWidth={SW}
        />
      )}
    </g>
  );
}

function MemWord({
  x,
  y,
  address,
  bits,
  value,
  highlight,
}: {
  x: number;
  y: number;
  address: string;
  bits?: string;
  value: string;
  highlight?: boolean;
}) {
  const cells = bits ? [address, bits, value] : [address, value];
  const widths = bits ? [56, 88, 72] : [56, 120];
  const stroke = highlight ? WIRE_HIGHLIGHT : SYMBOL_STROKE;
  let cursor = 0;
  return (
    <g transform={`translate(${x},${y})`}>
      {cells.map((text, i) => {
        const width = widths[i];
        const node = (
          <g key={text + i}>
            <rect
              x={cursor}
              y={-14}
              width={width}
              height={28}
              fill={SYMBOL_BODY}
              stroke={stroke}
              strokeWidth={highlight ? 2.5 : SW}
            />
            <text
              x={cursor + width / 2}
              y={4}
              textAnchor="middle"
              fontSize={11}
              fill={SYMBOL_STROKE}
            >
              {text}
            </text>
          </g>
        );
        cursor += width;
        return node;
      })}
    </g>
  );
}

function Wire({
  points,
  highlight,
  color,
}: {
  points: Pt[];
  highlight?: boolean;
  color?: string;
}) {
  if (points.length < 2) return null;
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const stroke = color ?? (highlight ? WIRE_HIGHLIGHT : WIRE);
  return (
    <path
      d={d}
      stroke={stroke}
      strokeWidth={color || highlight ? 2.5 : SW}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Junction({ x, y, color }: { x: number; y: number; color?: string }) {
  return <circle cx={x} cy={y} r={3.5} fill={color ?? WIRE} />;
}

function Label({
  x,
  y,
  text,
  color,
  size,
  anchor = "middle",
  weight,
}: {
  x: number;
  y: number;
  text: string;
  color?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size ?? 9}
      fill={color ?? PIN_COLOR}
      fontWeight={weight ?? (size && size > 11 ? 650 : 500)}
    >
      {text}
    </text>
  );
}

/* ── NPN BJT Transistor ────────────────────────────────────────── */
function NpnBjt({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  // Default orientation: Base left, Collector top-right, Emitter bottom-right
  // Pin positions: B at (-20,0), C at (20,-20), E at (20,20)
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={24} hh={24} />}
      {/* Base lead */}
      <line x1={-20} y1={0} x2={-6} y2={0} {...sp} />
      {/* Vertical bar (base region) */}
      <line
        x1={-6}
        y1={-14}
        x2={-6}
        y2={14}
        stroke={SYMBOL_STROKE}
        strokeWidth={2.5}
      />
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
      <SymText rotation={rotation} x={-14} y={-8} fontSize={8} fill={PIN_COLOR}>
        B
      </SymText>
      <SymText rotation={rotation} x={24} y={-24} fontSize={8} fill={PIN_COLOR}>
        C
      </SymText>
      <SymText rotation={rotation} x={24} y={28} fontSize={8} fill={PIN_COLOR}>
        E
      </SymText>
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-28}
          textAnchor="middle"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

/* ── PNP BJT Transistor ────────────────────────────────────────── */
function PnpBjt({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={24} hh={24} />}
      <line x1={-20} y1={0} x2={-6} y2={0} {...sp} />
      <line
        x1={-6}
        y1={-14}
        x2={-6}
        y2={14}
        stroke={SYMBOL_STROKE}
        strokeWidth={2.5}
      />
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
      <SymText rotation={rotation} x={-14} y={-8} fontSize={8} fill={PIN_COLOR}>
        B
      </SymText>
      <SymText rotation={rotation} x={24} y={-24} fontSize={8} fill={PIN_COLOR}>
        C
      </SymText>
      <SymText rotation={rotation} x={24} y={28} fontSize={8} fill={PIN_COLOR}>
        E
      </SymText>
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-28}
          textAnchor="middle"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

/* ── N-channel MOSFET (Enhancement) ────────────────────────────── */
function NMosfet({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  // Gate left, Drain top, Source bottom
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={24} hh={30} />}
      {/* Gate lead */}
      <line x1={-24} y1={0} x2={-10} y2={0} {...sp} />
      {/* Gate vertical (insulated) */}
      <line
        x1={-10}
        y1={-14}
        x2={-10}
        y2={14}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      {/* Channel (3 segments with gap for enhancement) */}
      <line
        x1={-6}
        y1={-14}
        x2={-6}
        y2={-5}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      <line
        x1={-6}
        y1={-2}
        x2={-6}
        y2={5}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      <line
        x1={-6}
        y1={8}
        x2={-6}
        y2={14}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
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
      <SymText rotation={rotation} x={-18} y={-8} fontSize={8} fill={PIN_COLOR}>
        G
      </SymText>
      <SymText rotation={rotation} x={16} y={-24} fontSize={8} fill={PIN_COLOR}>
        D
      </SymText>
      <SymText rotation={rotation} x={16} y={28} fontSize={8} fill={PIN_COLOR}>
        S
      </SymText>
      {label && (
        <SymText
          rotation={rotation}
          x={-14}
          y={-20}
          textAnchor="end"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

/* ── P-channel MOSFET (Enhancement) ────────────────────────────── */
function PMosfet({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={24} hh={30} />}
      <line x1={-24} y1={0} x2={-10} y2={0} {...sp} />
      <line
        x1={-10}
        y1={-14}
        x2={-10}
        y2={14}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line
        x1={-6}
        y1={-14}
        x2={-6}
        y2={-5}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      <line
        x1={-6}
        y1={-2}
        x2={-6}
        y2={5}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      <line
        x1={-6}
        y1={8}
        x2={-6}
        y2={14}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
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
      <SymText rotation={rotation} x={-18} y={-8} fontSize={8} fill={PIN_COLOR}>
        G
      </SymText>
      <SymText rotation={rotation} x={16} y={-24} fontSize={8} fill={PIN_COLOR}>
        D
      </SymText>
      <SymText rotation={rotation} x={16} y={28} fontSize={8} fill={PIN_COLOR}>
        S
      </SymText>
      {label && (
        <SymText
          rotation={rotation}
          x={-14}
          y={-20}
          textAnchor="end"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

/* ── Op-Amp (Triangle symbol) ──────────────────────────────────── */
function OpAmp({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  // Inputs left (+ bottom, - top), output right
  // Pin positions: V- at (-30,-12), V+ at (-30,12), Out at (30,0)
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={34} hh={26} />}
      {/* Triangle body */}
      <polygon
        points="-20,-24 -20,24 30,0"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {/* Input leads */}
      <line x1={-30} y1={-12} x2={-20} y2={-12} {...sp} />
      <line x1={-30} y1={12} x2={-20} y2={12} {...sp} />
      {/* Output lead */}
      <line x1={30} y1={0} x2={40} y2={0} {...sp} />
      {/* +/- labels inside */}
      <SymText
        rotation={rotation}
        inside
        x={-14}
        y={-8}
        fontSize={12}
        fill={SYMBOL_STROKE}
        fontWeight={600}
      >
        −
      </SymText>
      <SymText
        rotation={rotation}
        inside
        x={-14}
        y={17}
        fontSize={12}
        fill={SYMBOL_STROKE}
        fontWeight={600}
      >
        +
      </SymText>
      {/* Pins */}
      <Pin x={-30} y={-12} />
      <Pin x={-30} y={12} />
      <Pin x={40} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-30}
          textAnchor="middle"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

/* ── AC Source (sine wave in circle) ───────────────────────────── */
function AcSource({
  x,
  y,
  rotation = 0,
  label,
  value,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={16} hh={30} />}
      <line x1={0} y1={-30} x2={0} y2={-16} {...sp} />
      <line x1={0} y1={16} x2={0} y2={30} {...sp} />
      <circle
        cx={0}
        cy={0}
        r={16}
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      {/* Sine wave */}
      <path
        d="M-8,0 Q-4,-8 0,0 Q4,8 8,0"
        fill="none"
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <Pin x={0} y={-30} />
      <Pin x={0} y={30} />
      {label && (
        <SymText
          rotation={rotation}
          x={-20}
          y={4}
          textAnchor="end"
          fontSize={10}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
      {value && (
        <SymText
          rotation={rotation}
          x={-20}
          y={16}
          textAnchor="end"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {value}
        </SymText>
      )}
    </g>
  );
}

/* ── LED ───────────────────────────────────────────────────────── */
function Led({
  x,
  y,
  rotation = 0,
  label,
  color = "red",
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  color?: string;
  highlight?: boolean;
}) {
  const fillColor =
    color === "red"
      ? "#ef4444"
      : color === "green"
        ? "#22c55e"
        : color === "yellow"
          ? "#eab308"
          : color === "blue"
            ? "#3b82f6"
            : "#f97316";
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={20} hh={14} />}
      <line x1={-20} y1={0} x2={-8} y2={0} {...sp} />
      <line x1={8} y1={0} x2={20} y2={0} {...sp} />
      <polygon
        points="-8,-9 -8,9 8,0"
        fill={fillColor}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <line
        x1={8}
        y1={-9}
        x2={8}
        y2={9}
        stroke={SYMBOL_STROKE}
        strokeWidth={2}
      />
      {/* Light rays */}
      <line
        x1={-2}
        y1={-12}
        x2={2}
        y2={-18}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line
        x1={4}
        y1={-10}
        x2={10}
        y2={-16}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <Pin x={-20} y={0} />
      <Pin x={20} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={20}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

/* ── Probe Point (CRO/scope) ───────────────────────────────────── */
function Probe({
  x,
  y,
  label,
  highlight,
}: {
  x: number;
  y: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      {highlight && <SelectionRect hw={8} hh={8} />}
      <circle
        cx={0}
        cy={0}
        r={6}
        fill={WIRE_HIGHLIGHT}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <circle cx={0} cy={0} r={2} fill={SYMBOL_STROKE} />
      {label && (
        <text
          x={10}
          y={4}
          textAnchor="start"
          fontSize={9}
          fill={PIN_COLOR}
          fontWeight={500}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ── Logic Gates ───────────────────────────────────────────────── */
function AndGate({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  // 2-input AND: inputs left at y=-8 and y=8, output right at y=0
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={26} hh={18} />}
      {/* Body: flat left, curved right */}
      <path
        d="M-16,-16 L-16,16 L0,16 A16,16 0 0 0 0,-16 Z"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      {/* Input leads */}
      <line x1={-26} y1={-8} x2={-16} y2={-8} {...sp} />
      <line x1={-26} y1={8} x2={-16} y2={8} {...sp} />
      {/* Output lead */}
      <line x1={16} y1={0} x2={26} y2={0} {...sp} />
      <Pin x={-26} y={-8} />
      <Pin x={-26} y={8} />
      <Pin x={26} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-22}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

function OrGate({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={26} hh={18} />}
      {/* OR shape */}
      <path
        d="M-16,-16 Q-6,-16 0,-16 Q16,-16 20,0 Q16,16 0,16 Q-6,16 -16,16 Q-8,0 -16,-16 Z"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line x1={-26} y1={-8} x2={-12} y2={-8} {...sp} />
      <line x1={-26} y1={8} x2={-12} y2={8} {...sp} />
      <line x1={20} y1={0} x2={26} y2={0} {...sp} />
      <Pin x={-26} y={-8} />
      <Pin x={-26} y={8} />
      <Pin x={26} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-22}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

function WideOr({
  x,
  y,
  h,
  n,
  highlight,
}: {
  x: number;
  y: number;
  h: number;
  n: number;
  highlight?: boolean;
}) {
  const ys = wideOrInputs(h, n);
  const top = -h / 2;
  const bot = h / 2;
  const stroke = highlight ? WIRE_HIGHLIGHT : SYMBOL_STROKE;
  const d = `M -16 ${top} Q 8 ${top * 0.2} 30 0 Q 8 ${bot * 0.2} -16 ${bot} Q -2 0 -16 ${top} Z`;
  return (
    <g transform={`translate(${x},${y})`}>
      {highlight && <SelectionRect hw={34} hh={h / 2} />}
      <path
        d={d}
        fill={highlight ? "#eff6ff" : SYMBOL_BODY}
        stroke={stroke}
        strokeWidth={highlight ? 2.5 : SW}
      />
      {ys.map((iy, i) => (
        <line
          key={i}
          x1={-36}
          y1={iy}
          x2={-10}
          y2={iy}
          stroke={stroke}
          strokeWidth={SW}
        />
      ))}
      <line x1={30} y1={0} x2={44} y2={0} stroke={stroke} strokeWidth={SW} />
      {ys.map((iy, i) => (
        <Pin key={`p${i}`} x={-36} y={iy} />
      ))}
      <Pin x={44} y={0} />
    </g>
  );
}

function NotGate({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={22} hh={14} />}
      {/* Triangle */}
      <polygon
        points="-14,-12 -14,12 10,0"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      {/* Bubble */}
      <circle
        cx={14}
        cy={0}
        r={4}
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line x1={-22} y1={0} x2={-14} y2={0} {...sp} />
      <line x1={18} y1={0} x2={26} y2={0} {...sp} />
      <Pin x={-22} y={0} />
      <Pin x={26} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-18}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

function NandGate({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={28} hh={18} />}
      <path
        d="M-16,-16 L-16,16 L0,16 A16,16 0 0 0 0,-16 Z"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <circle
        cx={20}
        cy={0}
        r={4}
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line x1={-26} y1={-8} x2={-16} y2={-8} {...sp} />
      <line x1={-26} y1={8} x2={-16} y2={8} {...sp} />
      <line x1={24} y1={0} x2={32} y2={0} {...sp} />
      <Pin x={-26} y={-8} />
      <Pin x={-26} y={8} />
      <Pin x={32} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-22}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

function NorGate({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={28} hh={18} />}
      <path
        d="M-16,-16 Q-6,-16 0,-16 Q16,-16 20,0 Q16,16 0,16 Q-6,16 -16,16 Q-8,0 -16,-16 Z"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <circle
        cx={24}
        cy={0}
        r={4}
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line x1={-26} y1={-8} x2={-12} y2={-8} {...sp} />
      <line x1={-26} y1={8} x2={-12} y2={8} {...sp} />
      <line x1={28} y1={0} x2={36} y2={0} {...sp} />
      <Pin x={-26} y={-8} />
      <Pin x={-26} y={8} />
      <Pin x={36} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-22}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

function XorGate({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={28} hh={18} />}
      {/* Extra curve for XOR */}
      <path
        d="M-20,-16 Q-12,0 -20,16"
        fill="none"
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <path
        d="M-16,-16 Q-6,-16 0,-16 Q16,-16 20,0 Q16,16 0,16 Q-6,16 -16,16 Q-8,0 -16,-16 Z"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line x1={-28} y1={-8} x2={-12} y2={-8} {...sp} />
      <line x1={-28} y1={8} x2={-12} y2={8} {...sp} />
      <line x1={20} y1={0} x2={28} y2={0} {...sp} />
      <Pin x={-28} y={-8} />
      <Pin x={-28} y={8} />
      <Pin x={28} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-22}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

function XnorGate({
  x,
  y,
  rotation = 0,
  label,
  highlight,
}: {
  x: number;
  y: number;
  rotation?: number;
  label?: string;
  highlight?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {highlight && <SelectionRect hw={30} hh={18} />}
      <path
        d="M-20,-16 Q-12,0 -20,16"
        fill="none"
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <path
        d="M-16,-16 Q-6,-16 0,-16 Q16,-16 20,0 Q16,16 0,16 Q-6,16 -16,16 Q-8,0 -16,-16 Z"
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <circle
        cx={24}
        cy={0}
        r={4}
        fill={SYMBOL_BODY}
        stroke={SYMBOL_STROKE}
        strokeWidth={SW}
      />
      <line x1={-28} y1={-8} x2={-12} y2={-8} {...sp} />
      <line x1={-28} y1={8} x2={-12} y2={8} {...sp} />
      <line x1={28} y1={0} x2={36} y2={0} {...sp} />
      <Pin x={-28} y={-8} />
      <Pin x={-28} y={8} />
      <Pin x={36} y={0} />
      {label && (
        <SymText
          rotation={rotation}
          x={0}
          y={-22}
          textAnchor="middle"
          fontSize={9}
          fill={PIN_COLOR}
        >
          {label}
        </SymText>
      )}
    </g>
  );
}

/* ── Packet Tracer logical view ────────────────────────────────── */
const PT_SKY = "#8cc8ee";
const PT_BLUE = "#2f86c5";
const PT_NAVY = "#1c5d91";
const PT_EDGE = "#164a73";
const PT_CASE = "#e3e7ec";
const PT_CASE_DARK = "#b7c0ca";
const PT_INK = "#4b5563";
const PT_SCREEN = "#3f97db";
const PT_GLARE = "#b4dcf6";

const ptFace = {
  stroke: PT_EDGE,
  strokeWidth: 0.8,
  strokeLinejoin: "round" as const,
};
const ptCase = {
  stroke: PT_INK,
  strokeWidth: 0.9,
  strokeLinejoin: "round" as const,
};

/** A small white arrow on the top of a switch or router. */
function PtArrow({ from, to }: { from: Pt; to: Pt }) {
  const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  const ux = (to.x - from.x) / len;
  const uy = (to.y - from.y) / len;
  const bx = to.x - ux * 3;
  const by = to.y - uy * 3;
  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={bx}
        y2={by}
        stroke="#ffffff"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <polygon
        points={`${to.x},${to.y} ${bx - uy * 1.9},${by + ux * 1.9} ${bx + uy * 1.9},${by - ux * 1.9}`}
        fill="#ffffff"
      />
    </g>
  );
}

/** Flat box seen from above and in front: a switch, a hub or an access point. */
function PtSlab({
  top,
  front,
  side,
  y0,
  y1,
  y2,
  x0,
  x1,
  skew,
}: {
  top: string;
  front: string;
  side: string;
  y0: number;
  y1: number;
  y2: number;
  x0: number;
  x1: number;
  skew: number;
}) {
  return (
    <g>
      <polygon
        points={`${x0 + skew},${y0} ${x1 + skew},${y0} ${x1},${y1} ${x0},${y1}`}
        fill={top}
        {...ptFace}
      />
      <polygon
        points={`${x0},${y1} ${x1},${y1} ${x1},${y2} ${x0},${y2}`}
        fill={front}
        {...ptFace}
      />
      <polygon
        points={`${x1},${y1} ${x1 + skew},${y0} ${x1 + skew},${y2 - (y1 - y0)} ${x1},${y2}`}
        fill={side}
        {...ptFace}
      />
    </g>
  );
}

function PtIconShape({ kind }: { kind: PtIcon }) {
  switch (kind) {
    case "pc":
      return (
        <g>
          <rect
            x={-14}
            y={-14}
            width={28}
            height={20}
            rx={2}
            fill={PT_CASE}
            {...ptCase}
          />
          <rect
            x={-11}
            y={-11.5}
            width={22}
            height={14.5}
            rx={1}
            fill={PT_SCREEN}
          />
          <polygon
            points="-11,-11.5 3,-11.5 -11,0"
            fill={PT_GLARE}
            opacity={0.55}
          />
          <rect x={-2.5} y={6} width={5} height={4} fill="#9aa3ad" />
          <rect
            x={-9}
            y={9.5}
            width={18}
            height={3.5}
            rx={1.5}
            fill="#cfd5dc"
            {...ptCase}
          />
        </g>
      );
    case "laptop":
      return (
        <g>
          <rect
            x={-12}
            y={-12}
            width={24}
            height={16}
            rx={1.5}
            fill={PT_CASE}
            {...ptCase}
          />
          <rect
            x={-10}
            y={-10}
            width={20}
            height={12}
            rx={0.8}
            fill={PT_SCREEN}
          />
          <polygon
            points="-10,-10 2,-10 -10,-1"
            fill={PT_GLARE}
            opacity={0.55}
          />
          <polygon
            points="-13,4 13,4 17,11 -17,11"
            fill="#cfd5dc"
            {...ptCase}
          />
          <line
            x1={-9}
            y1={7.5}
            x2={9}
            y2={7.5}
            stroke="#8a939e"
            strokeWidth={1.4}
          />
        </g>
      );
    case "server":
      return (
        <g>
          <polygon
            points="-9,-15.5 -6,-18 12,-18 9,-15.5"
            fill="#eef1f4"
            {...ptCase}
          />
          <polygon
            points="9,-15.5 12,-18 12,14.5 9,17"
            fill={PT_CASE_DARK}
            {...ptCase}
          />
          <rect
            x={-9}
            y={-15.5}
            width={18}
            height={32.5}
            rx={1}
            fill={PT_CASE}
            {...ptCase}
          />
          <rect
            x={-6}
            y={-12.5}
            width={12}
            height={3}
            rx={0.6}
            fill="#6b7a8c"
          />
          <rect x={-6} y={-8} width={12} height={3} rx={0.6} fill="#6b7a8c" />
          {[2, 4.5, 7, 9.5].map((y) => (
            <line
              key={y}
              x1={-6}
              y1={y}
              x2={6}
              y2={y}
              stroke="#9aa3ad"
              strokeWidth={0.9}
            />
          ))}
          <circle cx={-4.5} cy={13} r={1.3} fill="#22c55e" />
        </g>
      );
    case "switch":
      return (
        <g>
          <PtSlab
            top={PT_SKY}
            front={PT_BLUE}
            side={PT_NAVY}
            x0={-20}
            x1={15}
            y0={-9}
            y1={-2}
            y2={8}
            skew={5}
          />
          <PtArrow from={{ x: -9, y: -6.9 }} to={{ x: 1, y: -6.9 }} />
          <PtArrow from={{ x: 4, y: -6.9 }} to={{ x: 14, y: -6.9 }} />
          <PtArrow from={{ x: 9, y: -4 }} to={{ x: -1, y: -4 }} />
          <PtArrow from={{ x: -4, y: -4 }} to={{ x: -14, y: -4 }} />
        </g>
      );
    case "hub":
      return (
        <g>
          <PtSlab
            top="#b9d4e8"
            front="#5b88a8"
            side="#3e6680"
            x0={-20}
            x1={15}
            y0={-9}
            y1={-2}
            y2={8}
            skew={5}
          />
          <PtArrow from={{ x: 2, y: -5.5 }} to={{ x: 14, y: -5.5 }} />
          <PtArrow from={{ x: -2, y: -5.5 }} to={{ x: -14, y: -5.5 }} />
        </g>
      );
    case "router":
      return (
        <g>
          <path
            d="M-18,-4 L-18,6 A18,6 0 0 0 18,6 L18,-4 Z"
            fill={PT_BLUE}
            {...ptFace}
          />
          <ellipse cx={0} cy={-4} rx={18} ry={6} fill={PT_SKY} {...ptFace} />
          <PtArrow from={{ x: 2, y: -5.3 }} to={{ x: 12, y: -8.4 }} />
          <PtArrow from={{ x: -2, y: -2.7 }} to={{ x: -12, y: 0.4 }} />
          <PtArrow from={{ x: -13, y: -8.4 }} to={{ x: -3.5, y: -5.4 }} />
          <PtArrow from={{ x: 13, y: 0.4 }} to={{ x: 3.5, y: -2.6 }} />
        </g>
      );
    case "ap":
      return (
        <g>
          {[3.5, 7, 10.5].map((r) => (
            <path
              key={r}
              d={`M${-1 - r},-1 A${r},${r} 0 0 1 ${-1 + r},-1`}
              fill="none"
              stroke={PT_BLUE}
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          ))}
          <PtSlab
            top={PT_SKY}
            front={PT_BLUE}
            side={PT_NAVY}
            x0={-16}
            x1={11}
            y0={1}
            y1={5}
            y2={10}
            skew={4}
          />
        </g>
      );
    case "printer":
      return (
        <g>
          <polygon
            points="-8,-13 8,-13 10,-5 -10,-5"
            fill="#ffffff"
            {...ptCase}
          />
          <rect
            x={-15}
            y={-5}
            width={30}
            height={12}
            rx={2}
            fill={PT_CASE}
            {...ptCase}
          />
          <rect x={6} y={-2.5} width={6} height={3} rx={0.6} fill={PT_SCREEN} />
          <rect x={-9} y={3} width={18} height={2} fill="#6b7a8c" />
          <rect x={-8} y={5} width={16} height={7} fill="#ffffff" {...ptCase} />
        </g>
      );
    case "cloud":
      return (
        <path
          d="M-17,12 A7,7 0 0 1 -19,-1 A9,9 0 0 1 -3,-11 A10,10 0 0 1 15,-7 A9,9 0 0 1 18,12 Z"
          fill="#f3f4f6"
          stroke="#6b7280"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
      );
    case "terminator":
      return (
        <rect x={-3.5} y={-7} width={7} height={14} rx={1.5} fill="#374151" />
      );
    case "tap":
      return <circle cx={0} cy={0} r={3.5} fill="#1f2937" />;
  }
}

function PtDevice({
  x,
  y,
  kind,
  highlight,
}: {
  x: number;
  y: number;
  kind: PtIcon;
  highlight?: boolean;
}) {
  const [hw, hh] = PT_ICON_SIZE[kind];
  return (
    <g transform={`translate(${x},${y})`}>
      {highlight && (
        <rect
          x={-hw - 5}
          y={-hh - 5}
          width={hw * 2 + 10}
          height={hh * 2 + 10}
          rx={4}
          fill="rgba(37,99,235,0.08)"
          stroke={WIRE_HIGHLIGHT}
          strokeWidth={1}
          strokeDasharray="3 2"
        />
      )}
      <PtIconShape kind={kind} />
    </g>
  );
}

const PT_CABLE: Record<
  PtCable,
  { color: string; width: number; dash?: string }
> = {
  straight: { color: "#1f1f1f", width: 1.6 },
  cross: { color: "#1f1f1f", width: 1.6, dash: "5 3" },
  console: { color: "#4fb3e8", width: 1.8 },
  serial: { color: "#d62828", width: 1.8 },
  fiber: { color: "#f08a24", width: 1.8 },
  coax: { color: "#1f8fb4", width: 2.2 },
  wifi: { color: "#8a94a3", width: 1.2, dash: "2 3" },
};

const PT_LIGHT: Record<Exclude<PtLight, "none">, [string, string]> = {
  up: ["#22c55e", "#15803d"],
  down: ["#ef4444", "#991b1b"],
  amber: ["#f59e0b", "#b45309"],
};

function PtLink({
  a,
  b,
  cable,
  lights = ["up", "up"],
  highlight,
}: {
  a: Pt;
  b: Pt;
  cable: PtCable;
  lights?: readonly [PtLight, PtLight];
  highlight?: boolean;
}) {
  const draw = useContext(SchematicMotion);
  const style = PT_CABLE[cable];
  const pts = ptLinkPoints(a, b, cable);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const ux = (b.x - a.x) / len;
  const uy = (b.y - a.y) / len;
  const inset = Math.min(12, len * 0.3);
  const light = (end: Pt, toward: 1 | -1, state: PtLight) => {
    if (state === "none") return null;
    // Toward the device: the tip points at the end it belongs to.
    const dx = -ux * toward;
    const dy = -uy * toward;
    const cx = end.x - dx * inset;
    const cy = end.y - dy * inset;
    const [fill, edge] = PT_LIGHT[state];
    return (
      <polygon
        points={`${cx + dx * 3.4},${cy + dy * 3.4} ${cx - dx * 2.4 - dy * 3.2},${cy - dy * 2.4 + dx * 3.2} ${cx - dx * 2.4 + dy * 3.2},${cy - dy * 2.4 - dx * 3.2}`}
        fill={fill}
        stroke={edge}
        strokeWidth={0.6}
        strokeLinejoin="round"
      />
    );
  };
  return (
    <g>
      {highlight && (
        <path
          d={d}
          stroke="#60a5fa"
          strokeOpacity={0.45}
          strokeWidth={6.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <path
        d={d}
        stroke={style.color}
        strokeWidth={style.width}
        fill="none"
        strokeLinejoin="round"
        pathLength={draw && !style.dash ? 1 : undefined}
        style={
          style.dash
            ? { strokeDasharray: style.dash }
            : draw
              ? {
                  strokeDasharray: 1,
                  animation: "schematic-draw 520ms ease both",
                }
              : undefined
        }
      />
      {light(a, -1, lights[0])}
      {light(b, 1, lights[1])}
    </g>
  );
}

function PtPdu({
  path,
  color,
  begin,
  end,
  cycle,
  drop,
}: {
  path: Pt[];
  color: string;
  begin: number;
  end: number;
  cycle: number;
  drop?: boolean;
}) {
  if (path.length < 2) return null;
  const d = path.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const s = Math.max(0, Math.min(1, begin / cycle));
  const e = Math.max(s, Math.min(1, end / cycle));
  const motion = [
    { t: 0, p: 0 },
    { t: s, p: 0 },
    { t: e, p: 1 },
    { t: 1, p: 1 },
  ].filter((v, i, all) => i === 0 || v.t > all[i - 1].t);
  const shown =
    s === 0
      ? [
          { t: 0, v: 1 },
          { t: e, v: 0 },
        ]
      : [
          { t: 0, v: 0 },
          { t: s, v: 1 },
          { t: e, v: 0 },
        ];
  const vis = shown.filter((v) => v.t < 1);
  const last = path[path.length - 1];
  const prev = path[path.length - 2];
  const len = Math.hypot(last.x - prev.x, last.y - prev.y) || 1;
  // Out on the cable, clear of the icon it was lost at.
  const back = Math.min(32, len * 0.45);
  const cross = {
    x: last.x - ((last.x - prev.x) / len) * back,
    y: last.y - ((last.y - prev.y) / len) * back,
  };
  const dur = `${cycle}s`;
  return (
    <g>
      <g opacity={vis.length > 1 ? 0 : 1}>
        {vis.length > 1 && (
          <animate
            attributeName="opacity"
            values={vis.map((v) => v.v).join(";")}
            keyTimes={vis.map((v) => +v.t.toFixed(4)).join(";")}
            calcMode="discrete"
            dur={dur}
            repeatCount="indefinite"
          />
        )}
        <animateMotion
          path={d}
          keyPoints={motion.map((v) => v.p).join(";")}
          keyTimes={motion.map((v) => +v.t.toFixed(4)).join(";")}
          calcMode="linear"
          dur={dur}
          repeatCount="indefinite"
        />
        <rect
          x={-6.5}
          y={-4.5}
          width={13}
          height={9}
          rx={1}
          fill={color}
          stroke="rgba(0,0,0,0.45)"
          strokeWidth={0.7}
        />
        <polyline
          points="-6.5,-4.5 0,0.8 6.5,-4.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth={0.9}
        />
      </g>
      {drop && (
        <g transform={`translate(${cross.x},${cross.y})`}>
          <circle r={5.5} fill="#ffffff" stroke="#dc2626" strokeWidth={1.2} />
          <path
            d="M-2.6,-2.6 L2.6,2.6 M2.6,-2.6 L-2.6,2.6"
            stroke="#dc2626"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
}

/** An eye, for the event the Simulation Panel is showing. */
function PtEye({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d="M-5.5,0 Q0,-5 5.5,0 Q0,5 -5.5,0 Z"
        fill="#ffffff"
        stroke="#1f2937"
        strokeWidth={0.9}
      />
      <circle r={1.9} fill="#1f2937" />
    </g>
  );
}

const PT_MONO = "ui-monospace, Consolas, 'Courier New', monospace";

function PtWindowShape(el: PtWindow & { x: number; y: number }) {
  const { x, y, w } = el;
  const h = ptWindowHeight(el);
  const L = PT_WINDOW;
  let cy = y + L.title;
  const parts: React.ReactNode[] = [];
  if (el.tabs?.length) {
    let tx = x + 8;
    el.tabs.forEach((t, i) => {
      const tw = t.length * 5.2 + 16;
      const on = i === (el.tab ?? 0);
      parts.push(
        <g key={`tab-${i}`}>
          <rect
            x={tx}
            y={cy + 5}
            width={tw}
            height={L.tabs - 5}
            fill={on ? "#ffffff" : "#dde3ea"}
            stroke="#9aa7b5"
            strokeWidth={0.8}
          />
          <text
            x={tx + tw / 2}
            y={cy + 16}
            textAnchor="middle"
            fontSize={8.5}
            fontWeight={on ? 700 : 500}
            fill={on ? "#111827" : "#4b5563"}
          >
            {t}
          </text>
        </g>,
      );
      tx += tw + 2;
    });
    cy += L.tabs;
  }
  if (el.heading) {
    parts.push(
      <text
        key="heading"
        x={el.console ? x + w / 2 : x + 8}
        y={cy + 14}
        textAnchor={el.console ? "middle" : "start"}
        fontSize={10}
        fontWeight={700}
        fill="#1f2937"
      >
        {el.heading}
      </text>,
    );
    cy += L.heading;
  }
  if (el.columns?.length) {
    const cols = el.columns;
    const rows = el.rows ?? [];
    const x0 = x + 6;
    const xs = cols.reduce<number[]>(
      (acc, c) => [...acc, acc[acc.length - 1] + c.w],
      [x0],
    );
    const tw = xs[xs.length - 1] - x0;
    const top = cy;
    parts.push(
      <g key="thead">
        <rect
          x={x0}
          y={cy}
          width={tw}
          height={L.row}
          fill="#d9e1ea"
          stroke="#9aa7b5"
          strokeWidth={0.7}
        />
        {cols.map((c, i) => (
          <text
            key={i}
            x={xs[i] + 4}
            y={cy + 11.5}
            fontSize={8.5}
            fontWeight={700}
            fill="#374151"
          >
            {c.label}
          </text>
        ))}
      </g>,
    );
    cy += L.row;
    rows.forEach((r, ri) => {
      const ry = cy + ri * L.row;
      const ink = r.tone === "lost" ? "#dc2626" : "#1f2937";
      parts.push(
        <g key={`row-${ri}`}>
          <rect
            x={x0}
            y={ry}
            width={tw}
            height={L.row}
            fill={r.current ? "#cfe3fb" : ri % 2 ? "#ffffff" : "#f5f7fa"}
            stroke={r.current ? "#5b9be0" : "#dfe5ec"}
            strokeWidth={r.current ? 1 : 0.6}
          />
          {r.tone === "note" ? (
            <text
              x={x0 + tw / 2}
              y={ry + 11.5}
              textAnchor="middle"
              fontSize={8.5}
              fontStyle="italic"
              fill="#6b7280"
            >
              {r.cells[0]}
            </text>
          ) : (
            r.cells.map((c, ci) => {
              const sw = ci === el.swatchCol && r.swatch;
              return (
                <g key={ci}>
                  {ci === 0 && r.current && (
                    <PtEye x={xs[0] + 10} y={ry + L.row / 2} />
                  )}
                  {sw && (
                    <rect
                      x={xs[ci] + 4}
                      y={ry + 3.5}
                      width={9}
                      height={9}
                      rx={1.2}
                      fill={r.swatch}
                      stroke="rgba(0,0,0,0.35)"
                      strokeWidth={0.6}
                    />
                  )}
                  <text
                    x={xs[ci] + (sw ? 17 : 4)}
                    y={ry + 11.5}
                    fontSize={8.5}
                    fontWeight={r.current ? 600 : 400}
                    fill={ink}
                  >
                    {c}
                  </text>
                </g>
              );
            })
          )}
        </g>,
      );
    });
    cy += rows.length * L.row;
    for (let i = 1; i < cols.length; i++)
      parts.push(
        <line
          key={`col-${i}`}
          x1={xs[i]}
          y1={top}
          x2={xs[i]}
          y2={cy}
          stroke="#c3ccd6"
          strokeWidth={0.6}
        />,
      );
    cy += 4;
  }
  if (el.console) {
    const lines = el.console;
    const boxH = lines.length * L.line + 12;
    const last = lines.length - 1;
    const cursor = last >= 0 && lines[last].tone !== "output";
    parts.push(
      <g key="console">
        <rect
          x={x + 6}
          y={cy}
          width={w - 12}
          height={boxH}
          fill="#ffffff"
          stroke="#9aa7b5"
          strokeWidth={0.8}
        />
        {lines.map((l, i) => (
          <text
            key={i}
            x={x + 12}
            y={cy + 15 + i * L.line}
            fontSize={8.5}
            fontFamily={PT_MONO}
            fontWeight={l.tone === "output" ? 400 : 600}
            fill={l.tone === "output" ? "#4b5563" : "#111827"}
          >
            {l.text}
          </text>
        ))}
        {cursor && (
          <rect
            x={x + 12 + lines[last].text.length * 5.1 + 1}
            y={cy + 7 + last * L.line}
            width={4.5}
            height={9.5}
            fill="#111827"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              dur="1s"
              calcMode="discrete"
              repeatCount="indefinite"
            />
          </rect>
        )}
      </g>,
    );
  }
  return (
    <g>
      <defs>
        <linearGradient id="pt-window-fill" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" stopColor="#2d6aa6" />
          <stop offset="1" stopColor="#123f6e" />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill="#eef1f5"
        stroke="#7b8a9c"
        strokeWidth={1}
      />
      <path
        d={`M${x},${y + L.title} L${x},${y + 4} Q${x},${y} ${x + 4},${y} L${x + w - 4},${y} Q${x + w},${y} ${x + w},${y + 4} L${x + w},${y + L.title} Z`}
        fill="url(#pt-window-fill)"
      />
      <text
        x={x + 8}
        y={y + 13.5}
        fontSize={9.5}
        fontWeight={700}
        fill="#ffffff"
      >
        {el.title}
      </text>
      <g stroke="#ffffff" strokeWidth={1} fill="none">
        <line x1={x + w - 44} y1={y + 13} x2={x + w - 37} y2={y + 13} />
        <rect x={x + w - 30} y={y + 6.5} width={7} height={7} />
        <path
          d={`M${x + w - 16},${y + 6.5} l7,7 M${x + w - 9},${y + 6.5} l-7,7`}
        />
      </g>
      {parts}
      {el.footer && (
        <text x={x + 8} y={y + h - 9} fontSize={8.5} fill="#4b5563">
          {el.footer}
        </text>
      )}
    </g>
  );
}

/** The workspace bar: Logical and Physical tabs, and the time mode. */
function PtBar({ w, mode }: { w: number; mode: "realtime" | "simulation" }) {
  const sim = mode === "simulation";
  return (
    <g>
      <defs>
        <linearGradient id="pt-bar-fill" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" stopColor="#2d6aa6" />
          <stop offset="1" stopColor="#123f6e" />
        </linearGradient>
      </defs>
      <rect
        x={-10}
        y={-10}
        width={w + 20}
        height={24}
        fill="url(#pt-bar-fill)"
      />
      <rect
        x={-5}
        y={-7}
        width={60}
        height={18}
        rx={9}
        fill="#3d86d1"
        stroke="#d6e8fa"
        strokeWidth={0.9}
      />
      {[
        [3, -1],
        [8, 4],
        [3, 4],
      ].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={1.4} fill="#ffffff" />
      ))}
      <path
        d="M3,-1 L8,4 L3,4"
        fill="none"
        stroke="#ffffff"
        strokeWidth={0.7}
      />
      <text x={13} y={5.5} fontSize={9.5} fontWeight={700} fill="#ffffff">
        Logical
      </text>
      <rect
        x={60}
        y={-7}
        width={62}
        height={18}
        rx={9}
        fill="none"
        stroke="#8fb2d6"
        strokeWidth={0.9}
      />
      <rect
        x={67}
        y={-2.5}
        width={8}
        height={9}
        rx={1}
        fill="none"
        stroke="#cfe0f2"
        strokeWidth={0.8}
      />
      <line
        x1={69}
        y1={0.5}
        x2={73}
        y2={0.5}
        stroke="#cfe0f2"
        strokeWidth={0.7}
      />
      <line x1={69} y1={3} x2={73} y2={3} stroke="#cfe0f2" strokeWidth={0.7} />
      <text x={79} y={5.5} fontSize={9.5} fontWeight={600} fill="#cfe0f2">
        Physical
      </text>
      <g transform={`translate(${w - (sim ? 58 : 50)},2)`}>
        <circle
          r={5}
          fill="none"
          stroke={sim ? "#fcd34d" : "#ffffff"}
          strokeWidth={1.1}
        />
        {sim && <rect x={-1.2} y={-8} width={2.4} height={2} fill="#fcd34d" />}
        <path
          d="M0,-3 L0,0 L2.4,1.4"
          fill="none"
          stroke={sim ? "#fcd34d" : "#ffffff"}
          strokeWidth={1}
          strokeLinecap="round"
        />
        <text
          x={8}
          y={3.4}
          fontSize={9}
          fontWeight={600}
          fill={sim ? "#fde68a" : "#ffffff"}
        >
          {sim ? "Simulation" : "Realtime"}
        </text>
      </g>
    </g>
  );
}

/* ── Dot-grid pattern (infinite via SVG <pattern>) ─────────────── */
const GRID_PAT_ID = "schematic-dot-grid";

/* ── Main component ────────────────────────────────────────────── */

/** Half-extents [hw, hh, cx] of each linkable symbol, in its local frame. */
const SYMBOL_BOUNDS: Partial<
  Record<SchematicElement["type"], [number, number, number?]>
> = {
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
  animate = false,
  cover = false,
}: {
  schematic: SchematicData;
  /** Maps a symbol to its 3D component; enables hover/select linking. */
  linkElement?: (el: SchematicElement) => SchematicLink | null;
  /** Draw new flowchart nodes in when a procedure step reveals them. */
  animate?: boolean;
  /** Fill the frame and crop, the way a card preview fills its slot. */
  cover?: boolean;
}) {
  const w = schematic.width ?? 340;
  const h = schematic.height ?? 260;
  const { hovered, hover, unhover, setSelectedId } = useLabInteraction();
  const signature = schematic.elements.map((el) => el.id).join("|");
  const [frame, setFrame] = useState<{
    sig: string;
    entering: ReadonlySet<string>;
  }>({
    sig: "",
    entering: new Set(),
  });
  // Remember which nodes already appeared so only the newly revealed ones animate.
  // Adjusted while rendering so the class is on the frame that actually paints.
  if (animate && frame.sig !== signature) {
    const prev = frame.sig ? new Set(frame.sig.split("|")) : new Set<string>();
    const ids = signature ? signature.split("|") : [];
    setFrame({
      sig: signature,
      entering: new Set(ids.filter((id) => !prev.has(id))),
    });
  }
  const entering =
    animate && frame.sig === signature ? frame.entering : new Set<string>();
  const [tag, setTag] = useState<{
    key: string;
    name: string;
    x: number;
    y: number;
  } | null>(null);
  const hitRefs = useRef(new Map<string, SVGRectElement>());

  // The viewBox stays tight around the circuit content (original sizing).
  // The dot-grid rect extends far beyond via a large negative offset,
  // but `overflow: visible` on the SVG lets PanZoomCanvas reveal it when panning.
  const DOT_PAD = 2000;

  function showTag(el: SchematicElement, link: SchematicLink) {
    const rect = hitRefs.current.get(el.id)?.getBoundingClientRect();
    if (!rect) return;
    setTag({
      key: el.id,
      name: link.name,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }

  return (
    <>
      <svg
        viewBox={`-10 -10 ${w + 20} ${h + 20}`}
        width="100%"
        height="100%"
        overflow={cover ? "hidden" : "visible"}
        preserveAspectRatio={cover ? "xMidYMid slice" : undefined}
        style={{
          background: schematic.plain ? "#ffffff" : CANVAS_BG,
          display: "block",
        }}
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
          fill={schematic.plain ? "#ffffff" : `url(#${GRID_PAT_ID})`}
        />

        {schematic.elements.map((el) => {
          const symbol = renderSymbol(el);
          const bounds =
            el.type === "block" ||
            el.type === "decision" ||
            el.type === "terminal"
              ? ([el.w / 2, el.h / 2] as [number, number])
              : el.type === "memword"
                ? ([108, 14, 108] as [number, number, number])
                : SYMBOL_BOUNDS[el.type];
          const link = bounds && linkElement ? linkElement(el) : null;
          const motion = (
            <SchematicMotion.Provider value={entering.has(el.id)}>
              {symbol}
            </SchematicMotion.Provider>
          );
          if (!link || !bounds || !("x" in el)) {
            return (
              <g
                key={el.id}
                className={entering.has(el.id) ? "schematic-enter" : undefined}
              >
                {motion}
              </g>
            );
          }

          const [hw, hh, cx = 0] = bounds;
          const rotation = "rotation" in el ? (el.rotation ?? 0) : 0;
          const isHovered = hovered?.id === link.id;
          const frame = `translate(${el.x},${el.y}) rotate(${rotation})`;

          return (
            <g
              key={el.id}
              className={entering.has(el.id) ? "schematic-enter" : undefined}
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
              {motion}
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
      return (
        <Resistor
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          value={el.value}
          highlight={el.highlight}
        />
      );
    case "zener":
      return (
        <ZenerDiode
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          value={el.value}
          highlight={el.highlight}
        />
      );
    case "diode":
      return (
        <Diode
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "capacitor":
      return (
        <Capacitor
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          value={el.value}
          highlight={el.highlight}
        />
      );
    case "inductor":
      return (
        <Inductor
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          value={el.value}
          highlight={el.highlight}
        />
      );
    case "vsource":
      return (
        <VSource
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          value={el.value}
          highlight={el.highlight}
        />
      );
    case "ground":
      return <Ground x={el.x} y={el.y} />;
    case "ammeter":
      return (
        <MeterCircle
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          letter="A"
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "voltmeter":
      return (
        <MeterCircle
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          letter="V"
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "wire":
      return (
        <Wire points={el.points} highlight={el.highlight} color={el.color} />
      );
    case "junction":
      return <Junction x={el.x} y={el.y} color={el.color} />;
    case "label":
      return (
        <Label
          x={el.x}
          y={el.y}
          text={el.text}
          color={el.color}
          size={el.size}
          anchor={el.anchor}
          weight={el.weight}
        />
      );
    // Transistors
    case "npn-bjt":
      return (
        <NpnBjt
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "pnp-bjt":
      return (
        <PnpBjt
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "n-mosfet":
      return (
        <NMosfet
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "p-mosfet":
      return (
        <PMosfet
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    // Op-amp
    case "op-amp":
      return (
        <OpAmp
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    // AC source
    case "acsource":
      return (
        <AcSource
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          value={el.value}
          highlight={el.highlight}
        />
      );
    // LED
    case "led":
      return (
        <Led
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          color={el.color}
          highlight={el.highlight}
        />
      );
    // Probe
    case "probe":
      return (
        <Probe x={el.x} y={el.y} label={el.label} highlight={el.highlight} />
      );
    case "block":
      return (
        <FlowBox
          x={el.x}
          y={el.y}
          w={el.w}
          h={el.h}
          label={el.label}
          highlight={el.highlight}
          fill={el.fill}
          ink={el.ink}
        />
      );
    case "terminal":
      return (
        <FlowBox
          x={el.x}
          y={el.y}
          w={el.w}
          h={el.h}
          label={el.label}
          highlight={el.highlight}
          fill={el.fill}
          ink={el.ink}
          rounded
        />
      );
    case "decision":
      return (
        <FlowBox
          x={el.x}
          y={el.y}
          w={el.w}
          h={el.h}
          label={el.label}
          highlight={el.highlight}
          diamond
        />
      );
    case "memword":
      return (
        <MemWord
          x={el.x}
          y={el.y}
          address={el.address}
          bits={el.bits}
          value={el.value}
          highlight={el.highlight}
        />
      );
    case "stack":
      return (
        <MemoryStack
          x={el.x}
          y={el.y}
          w={el.w}
          h={el.h}
          split={el.split}
          highlight={el.highlight}
        />
      );
    case "arrow":
      return (
        <Arrow
          points={el.points}
          highlight={el.highlight}
          color={el.color}
          size={el.size}
          double={el.double}
          dashed={el.dashed}
        />
      );
    case "panel":
      return (
        <FramePanel
          x={el.x}
          y={el.y}
          w={el.w}
          h={el.h}
          t={el.t}
          fill={el.fill}
        />
      );
    // Packet Tracer logical view
    case "pt-device":
      return (
        <PtDevice x={el.x} y={el.y} kind={el.kind} highlight={el.highlight} />
      );
    case "pt-link":
      return (
        <PtLink
          a={el.a}
          b={el.b}
          cable={el.cable}
          lights={el.lights}
          highlight={el.highlight}
        />
      );
    case "pt-pdu":
      return (
        <PtPdu
          path={el.path}
          color={el.color}
          begin={el.begin}
          end={el.end}
          cycle={el.cycle}
          drop={el.drop}
        />
      );
    case "pt-area":
      return (
        <rect
          x={el.x}
          y={el.y}
          width={el.w}
          height={el.h}
          rx={3}
          fill={el.color}
          fillOpacity={0.09}
          stroke={el.color}
          strokeOpacity={0.45}
          strokeWidth={1}
        />
      );
    case "pt-bar":
      return <PtBar w={el.w} mode={el.mode} />;
    case "pt-window":
      return <PtWindowShape {...el} />;
    // Logic gates
    case "and-gate":
      return (
        <AndGate
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "or-gate":
      return (
        <OrGate
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "wide-or":
      return (
        <WideOr x={el.x} y={el.y} h={el.h} n={el.n} highlight={el.highlight} />
      );
    case "not-gate":
      return (
        <NotGate
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "nand-gate":
      return (
        <NandGate
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "nor-gate":
      return (
        <NorGate
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "xor-gate":
      return (
        <XorGate
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    case "xnor-gate":
      return (
        <XnorGate
          x={el.x}
          y={el.y}
          rotation={el.rotation}
          label={el.label}
          highlight={el.highlight}
        />
      );
    default:
      return null;
  }
}
