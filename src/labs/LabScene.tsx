"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { benchPlacement } from "@/components/shared";
import {
  componentDisplayName,
  formatOhms,
  useLabInteraction,
} from "./lab-interaction";
import { NavPill, PILL_SURFACE_CLASS } from "./NavPill";

import {
  hole,
  railHole,
  COLS,
  colsForBoardId,
  PITCH,
  TOP_Y,
  BOARD_D,
} from "./coords";
import {
  buildBreadboard,
  buildLongBreadboard,
  buildDip,
  buildDip14,
  buildDip16,
  buildLed,
  buildResistor,
  buildCapacitor,
  buildInductor,
  buildWire,
  buildDcPowerSupply,
  buildIcMeter,
  buildAmmeter,
  buildAmmeterSide,
  buildVoltmeter,
  buildVoltmeterSide,
  buildOscilloscope,
  buildFunctionGenerator,
  FG_OUT_ANCHOR,
  FG_GND_ANCHOR,
  buildBjt,
  buildMosfet,
  buildDiode,
  buildZenerDiode,
  buildOpAmp,
  buildSevenSegment,
  buildDipSwitch,
  buildLogicAnalyzer,
  buildTransformer,
  buildSwitchStandalone,
  buildPushButtonStandalone,
  buildMcuTrainerStandalone,
} from "@/components";
import { resolveIcPin } from "@/components/ic";
// NOTE: adjust this path to wherever you saved oscilloscope.ts
import {
  OSCILLOSCOPE_CH1_ANCHOR,
  OSCILLOSCOPE_GND_ANCHOR,
} from "@/components/oscilloscope";
import { probeWire } from "@/components/shared/instrument-wire";
import { simulate } from "./simulate";
import {
  type Circuit,
  type ComponentInstance,
  type PinRef,
  type TiePin,
  type RailPin,
  type IcPin,
  type PassivePin,
  type LedPin,
  type Row,
} from "./types";

// ── Adjacent-row selector so wires & component leads never share the same hole ──
function pickWireRow(
  mountRow: string,
  peerPin?: PinRef,
  targetCol?: number,
): Row {
  const r = mountRow.toLowerCase();
  const topBank: Row[] = ["a", "b", "c", "d", "e"];
  const botBank: Row[] = ["f", "g", "h", "i", "j"];
  const inTop = topBank.includes(r as Row);

  // Check if the other end of the wire is on a top/bottom power rail
  if (peerPin && "rail" in peerPin) {
    if (peerPin.rail === "vcc_top" || peerPin.rail === "gnd_top") {
      return inTop ? (r === "a" ? "b" : "a") : "f";
    }
    if (peerPin.rail === "vcc_bot" || peerPin.rail === "gnd_bot") {
      return inTop ? "e" : r === "j" ? "i" : "j";
    }
  }

  // Otherwise pick an adjacent row in the same column bank so the wire ferrule
  // sits cleanly next to the component lead rather than colliding with it
  let candidate: Row;
  if (inTop) {
    if (r === "c") candidate = "d";
    else if (r === "d") candidate = "b";
    else if (r === "b") candidate = "d";
    else if (r === "a") candidate = "b";
    else candidate = "d";
  } else {
    if (r === "h") candidate = "i";
    else if (r === "g") candidate = "i";
    else if (r === "i") candidate = "g";
    else candidate = "g";
  }

  // Avoid picking the exact same (col, row) if peerPin is a TiePin in the same column
  if (
    peerPin &&
    "col" in peerPin &&
    "row" in peerPin &&
    (targetCol === undefined || peerPin.col === targetCol) &&
    peerPin.row.toLowerCase() === candidate
  ) {
    if (inTop) {
      candidate = candidate === "d" ? "b" : "d";
    } else {
      candidate = candidate === "g" ? "i" : "g";
    }
  }

  return candidate;
}

// ── PinRef → THREE.Vector3 ────────────────────────────────────────────────
// Uses the real DIP-14 pin resolver for IcPins and smart adjacent-row
// selection for PassivePin / LedPin so each breadboard hole holds one lead.
function resolvePin(
  pin: PinRef,
  all: ComponentInstance[],
  peerPin?: PinRef,
): THREE.Vector3 | null {
  if ("col" in pin && "row" in pin && "board" in pin) {
    const tie = pin as TiePin;
    const cols = colsForBoardId(tie.board, all);
    return hole(tie.col, tie.row, cols);
  }

  if ("rail" in pin) {
    const rp = pin as RailPin;
    const cols = colsForBoardId(rp.board, all);
    const railMap = {
      vcc_top: "top_red",
      gnd_top: "top_blue",
      vcc_bot: "bot_red",
      gnd_bot: "bot_blue",
    } as const;
    return railHole(rp.col, railMap[rp.rail], cols);
  }

  if ("ic" in pin) {
    const ip = pin as IcPin;
    const inst = all.find((c) => c.id === ip.ic);
    if (!inst || !("mountedAt" in inst) || !inst.mountedAt) return null;
    const cols = colsForBoardId(inst.mountedAt.board, all);
    return resolveIcPin(
      ip.pin,
      inst.mountedAt.col,
      inst.mountedAt.row,
      cols,
      inst.type,
    );
  }

  if ("component" in pin) {
    const pp = pin as PassivePin;
    const inst = all.find((c) => c.id === pp.component);
    if (!inst || !("mountedAt" in inst) || !inst.mountedAt) return null;
    const { col, row, board } = inst.mountedAt;
    const cols = colsForBoardId(board, all);
    const span = inst.type === "capacitor" ? 1 : 3;
    const endStr = (pp as any).end as string;
    const isFirstEnd = endStr === "p1" || endStr === "anode";
    const targetCol = isFirstEnd ? col : col + span;
    const targetRow = pickWireRow(row, peerPin, targetCol);
    return hole(targetCol, targetRow, cols);
  }

  if ("led" in pin) {
    const lp = pin as LedPin;
    const inst = all.find((c) => c.id === lp.led);
    if (!inst || !("mountedAt" in inst) || !inst.mountedAt) return null;
    const { col, row, board } = inst.mountedAt;
    const cols = colsForBoardId(board, all);
    const span = inst.type === "diode" || inst.type === "zener" ? 3 : 1;
    const targetCol = lp.end === "anode" ? col : col + span;
    const targetRow = pickWireRow(row, peerPin, targetCol);
    return hole(targetCol, targetRow, cols);
  }

  return null;
}

// ── Component builder ─────────────────────────────────────────────────────
// isOn map is passed for LEDs so they light up when the simulation says HIGH.
//
// Must match LEAD_LENGTH in src/components/bjt — used to seat the TO-92 body
// so its three leads land on the board surface.
const BJT_LEAD_LENGTH = PITCH * 0.75;

// Bench instruments stand behind the board in a row of slots (see
// bench-layout). This assigns each instrument a stable slot index, ordered
// left-to-right by the smallest board column it connects to, so the row on
// the bench mirrors the layout on the board.
const BENCH_TYPES = new Set([
  "dc-jack",
  "battery",
  "potentiometer",
  "ammeter",
  "voltmeter",
  "oscilloscope",
  "function-generator",
]);

function benchPins(
  inst: ComponentInstance,
): { board?: string; col?: number }[] {
  const anyInst = inst as any;
  if (Array.isArray(anyInst.terminals)) return anyInst.terminals;
  if (Array.isArray(anyInst.probes)) return anyInst.probes;
  if (anyInst.mountedAt) return [anyInst.mountedAt];
  return [];
}

function benchSlotMap(all: ComponentInstance[]): Map<string, number> {
  const bench = all.filter((c) => BENCH_TYPES.has(c.type));
  const withCol = bench.map((inst) => {
    const cols = benchPins(inst)
      .map((p) => (typeof p?.col === "number" ? p.col : Infinity))
      .filter((c) => Number.isFinite(c));
    return { id: inst.id, col: cols.length ? Math.min(...cols) : Infinity };
  });
  withCol.sort((a, b) => a.col - b.col || a.id.localeCompare(b.id));

  const map = new Map<string, number>();
  const n = withCol.length;

  withCol.forEach((entry, i) => {
    if (n === 1) {
      map.set(entry.id, 2);
    } else {
      // Spread instruments evenly across the bench slots [0.4 .. 6.6]
      map.set(entry.id, 0.4 + (i / (n - 1)) * 6.2);
    }
  });

  return map;
}

// ── Oscilloscope: stands on the bench, OUTSIDE the breadboard ─────────────
// The scope body sits on the bench behind the board. Only its two probe
// cables (CH1 and GND) run to the breadboard holes listed in `probes`.
function buildBenchOscilloscope(
  inst: ComponentInstance,
  all: ComponentInstance[],
  slot: number,
  readingText = "4.2 Vpp, 1 kHz",
): THREE.Group {
  const p = (inst as any).probes as [PinRef, PinRef] | undefined;
  const ch1Target = p ? resolvePin(p[0], all) : null;
  const gndTarget = p ? resolvePin(p[1], all) : null;

  const placement = benchPlacement(slot);
  const scope = buildOscilloscope(new THREE.Vector3(), readingText);
  scope.scale.setScalar(0.76);
  scope.position.copy(placement.position);

  const wrapper = new THREE.Group();
  wrapper.add(scope);
  wrapper.updateMatrixWorld(true);

  const ch1 = scope.getObjectByName(OSCILLOSCOPE_CH1_ANCHOR);
  const gnd = scope.getObjectByName(OSCILLOSCOPE_GND_ANCHOR);

  if (ch1 && ch1Target) {
    wrapper.add(
      probeWire(
        ch1.getWorldPosition(new THREE.Vector3()),
        ch1Target,
        0xdda000, // yellow CH1 probe cable
      ),
    );
  }
  if (gnd && gndTarget) {
    wrapper.add(
      probeWire(
        gnd.getWorldPosition(new THREE.Vector3()),
        gndTarget,
        0x1c1e22, // black GND reference lead
      ),
    );
  }

  return wrapper;
}

function buildBenchFunctionGenerator(
  inst: ComponentInstance,
  all: ComponentInstance[],
  slot: number,
  readingText?: string,
): THREE.Group {
  const p = (inst as any).probes as [PinRef, PinRef] | undefined;
  const outTarget = p ? resolvePin(p[0], all) : null;
  const gndTarget = p ? resolvePin(p[1], all) : null;

  const placement = benchPlacement(slot);

  let freqDisplay = "1.000";
  let waveform: "sine" | "square" | "triangle" = "sine";
  if (readingText) {
    const m = readingText.match(/([\d.]+)\s*(k?Hz)/i);
    if (m) {
      const v = parseFloat(m[1]);
      freqDisplay = Number.isFinite(v) ? v.toFixed(3).slice(0, 5) : "1.000";
    }
    if (/square/i.test(readingText)) waveform = "square";
    else if (/tri/i.test(readingText)) waveform = "triangle";
  }

  const fgScale = 0.056;
  const fg = buildFunctionGenerator(
    placement.position,
    waveform,
    freqDisplay,
    3,
    true,
    fgScale,
  );

  const wrapper = new THREE.Group();
  wrapper.add(fg);
  wrapper.updateMatrixWorld(true);

  const outAnchor = fg.getObjectByName(FG_OUT_ANCHOR);
  const gndAnchor = fg.getObjectByName(FG_GND_ANCHOR) ?? outAnchor;

  if (outAnchor && outTarget) {
    wrapper.add(
      probeWire(
        outAnchor.getWorldPosition(new THREE.Vector3()),
        outTarget,
        0xd62828, // red signal output lead
      ),
    );
  }
  if (gndAnchor && gndTarget) {
    wrapper.add(
      probeWire(
        gndAnchor.getWorldPosition(new THREE.Vector3()),
        gndTarget,
        0x1c1e22, // black ground lead
      ),
    );
  }

  return wrapper;
}

function buildInstance(
  inst: ComponentInstance,
  all: ComponentInstance[],
  ledOnMap: Map<string, boolean>,
): THREE.Group | null {
  switch (inst.type) {
    case "breadboard":
      return buildBreadboard(COLS);

    case "long-breadboard":
      return buildLongBreadboard();

    case "xor-gate":
    case "and-gate":
    case "or-gate":
    case "not-gate":
    case "nand-gate":
    case "nor-gate":
    case "xnor-gate":
    case "buffer-gate":
    case "dff":
    case "sr-latch":
    case "counter-4bit-async": {
      const { col, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const labels: Record<string, string> = {
        "xor-gate": "XOR",
        "and-gate": "AND",
        "or-gate": "OR",
        "not-gate": "NOT",
        "nand-gate": "NAND",
        "nor-gate": "NOR",
        "xnor-gate": "XNOR",
        "buffer-gate": "BUF",
        dff: "74HC74",
        "sr-latch": "74HC279",
        "counter-4bit-async": "74HC93",
      };
      return buildDip14(col, labels[inst.type] ?? "IC", cols);
    }

    case "mux-4to1":
    case "demux-1to4":
    case "demux-1to8":
    case "decoder-3to8":
    case "encoder-8to3":
    case "adder-4bit":
    case "jk-ff":
    case "counter-4bit-sync":
    case "register-4bit": {
      const { col, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const labels16: Record<string, string> = {
        "mux-4to1": "74HC153",
        "demux-1to4": "74HC139",
        "demux-1to8": "74HC138",
        "decoder-3to8": "74HC138",
        "encoder-8to3": "74HC148",
        "adder-4bit": "74HC283",
        "jk-ff": "74HC73",
        "counter-4bit-sync": "74HC161",
        "register-4bit": "74HC194",
      };
      return buildDip16(col, labels16[inst.type] ?? "74HC153", cols);
    }

    case "register-8bit":
    case "register-8bit-tri": {
      const { col, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildDip(
        col,
        10,
        inst.type === "register-8bit-tri" ? "74HC374" : "74HC595",
        cols,
      );
    }

    case "n-mosfet":
    case "p-mosfet": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildMosfet(hole(col, row, cols));
    }

    case "diode": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildDiode(hole(col, row, cols), hole(col + 3, row, cols), inst.model ?? "1N4148");
    }

    case "zener": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildZenerDiode(hole(col, row, cols), hole(col + 3, row, cols));
    }

    case "op-amp": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const pin1Hole = hole(col, row, cols);

      // buildOpAmp() is centered on the IC body, while mountedAt
      // represents the pin-1 hole. Shift the model so all DIP-8
      // leads land exactly on the breadboard holes.
      const mountPos = pin1Hole.clone();
      mountPos.x += PITCH * 1.5;
      mountPos.z -= PITCH * 1.5;

      return buildOpAmp(mountPos);
    }

    case "7seg-display": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildSevenSegment(hole(col, row, cols));
    }

    case "dip-switch": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildDipSwitch(hole(col, row, cols), (inst as any).poles ?? 8);
    }

    case "switch": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const group = buildSwitchStandalone();
      group.position.copy(hole(col, row, cols));
      return group;
    }

    case "push-button": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const group = buildPushButtonStandalone();
      group.position.copy(hole(col, row, cols));
      return group;
    }

    case "resistor": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildResistor(
        hole(col, row, cols),
        hole(col + 3, row, cols),
        inst.ohms,
      );
    }

    case "capacitor": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildCapacitor(
        hole(col, row, cols),
        hole(col + 1, row, cols),
        inst.capacitance,
      );
    }

    case "inductor": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      return buildInductor(
        hole(col, row, cols),
        hole(col + 3, row, cols),
        inst.henrys,
      );
    }

    case "led": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      const isOn = ledOnMap.get(inst.id) ?? false;
      return buildLed(
        hole(col, row, cols),
        hole(col + 1, row, cols),
        inst.color,
        isOn,
      );
    }

    case "npn-bjt":
    case "pnp-bjt": {
      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, all);
      // buildBjt() seats the TO-92 body at mountPos with its three leads
      // (C, B, E from left to right) hanging LEAD_LENGTH below. Raise it so
      // the lead tips meet the board surface (TOP_Y), and fan the leads out
      // to one full column pitch so each lands in its own breadboard hole.
      // The base (middle lead) sits on mountedAt.col, so collector = col-1
      // and emitter = col+1.
      const mount = hole(col, row, cols);
      mount.y = TOP_Y + BJT_LEAD_LENGTH;
      return buildBjt(mount, { leadSpacing: PITCH });
    }

    case "wire": {
      const from = resolvePin(inst.from, all, inst.to);
      const to = resolvePin(inst.to, all, inst.from);
      if (!from || !to) return null;
      return buildWire(from, to, inst.color);
    }

    // ── Instruments (placed on the bench behind the breadboard) ───────
    case "dc-jack":
    case "battery": {
      const t = (inst as any).terminals as [any, any] | undefined;
      const targets = t
        ? {
            vcc: resolvePin(t[0], all) ?? new THREE.Vector3(),
            gnd: resolvePin(t[1], all) ?? new THREE.Vector3(),
          }
        : undefined;
      const slot = benchSlotMap(all).get(inst.id) ?? 0;
      return buildDcPowerSupply(slot, "--", targets);
    }
    case "potentiometer": {
      const p = (inst as any).probes as [any, any] | undefined;
      const targets = p
        ? {
            probe1: resolvePin(p[0], all) ?? new THREE.Vector3(),
            probe2: resolvePin(p[1], all) ?? new THREE.Vector3(),
          }
        : undefined;
      const slot = benchSlotMap(all).get(inst.id) ?? 0;
      return buildIcMeter(slot, "--", targets);
    }

    case "ammeter": {
      const p = (inst as any).probes as [any, any] | undefined;
      const targets = p
        ? {
            probe1: resolvePin(p[0], all) ?? new THREE.Vector3(),
            probe2: resolvePin(p[1], all) ?? new THREE.Vector3(),
          }
        : undefined;
      const slot = benchSlotMap(all).get(inst.id) ?? 0;
      return buildAmmeterSide(slot, targets);
    }

    case "voltmeter": {
      const p = (inst as any).probes as [any, any] | undefined;
      const targets = p
        ? {
            probe1: resolvePin(p[0], all) ?? new THREE.Vector3(),
            probe2: resolvePin(p[1], all) ?? new THREE.Vector3(),
          }
        : undefined;
      const slot = benchSlotMap(all).get(inst.id) ?? 0;
      return buildVoltmeterSide(slot, targets);
    }

    case "oscilloscope": {
      // Off-board: scope stands on the bench, only the probe cables
      // (CH1 + GND) connect to the breadboard.
      const slot = benchSlotMap(all).get(inst.id) ?? 0;
      return buildBenchOscilloscope(inst, all, slot);
    }

    case "function-generator": {
      const slot = benchSlotMap(all).get(inst.id) ?? 0;
      return buildBenchFunctionGenerator(inst, all, slot);
    }

    case "logic-analyser": {
      return buildLogicAnalyzer(new THREE.Vector3());
    }

    case "transformer": {
      return buildTransformer(new THREE.Vector3());
    }

    case "mcu-trainer": {
      return buildMcuTrainerStandalone();
    }

    default:
      return null;
  }
}

// ── Geometry disposal helper ──────────────────────────────────────────────
// Recursively disposes all geometries and materials in a scene graph.
function disposeGroup(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();
      const mat = child.material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose();
    }
    if (child instanceof THREE.LineSegments || child instanceof THREE.Line) {
      child.geometry?.dispose();
      (child.material as THREE.Material)?.dispose();
    }
  });
}

// ── Marker system (bob-the-builder style pre-placement pointers) ──────────
export type StepMarker = {
  pos: [number, number, number];
  dir: [number, number, number];
  label?: string;
};

function buildMarkerGroup(marker: StepMarker): {
  group: THREE.Group;
  update: (t: number) => void;
} {
  const pos = new THREE.Vector3(...marker.pos);
  const dir = new THREE.Vector3(...marker.dir).normalize();
  const out = dir.clone().negate();
  const UP = new THREE.Vector3(0, 1, 0);
  const ZAX = new THREE.Vector3(0, 0, 1);

  const group = new THREE.Group();

  // Target ring at insertion point
  const ringGeo = new THREE.RingGeometry(0.038, 0.065, 24);
  const ring = new THREE.Mesh(
    ringGeo,
    new THREE.MeshBasicMaterial({ color: 0xe6502e, side: THREE.DoubleSide }),
  );
  ring.quaternion.setFromUnitVectors(ZAX, out);
  ring.position.copy(pos).addScaledVector(out, 0.006);
  group.add(ring);

  // Bobbing cone
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.055, 0.16, 14),
    new THREE.MeshBasicMaterial({ color: 0xe6502e }),
  );
  cone.quaternion.setFromUnitVectors(UP, dir);
  group.add(cone);

  // Approach line
  const linePts = [
    pos.clone().addScaledVector(out, 0.22),
    pos.clone().addScaledVector(out, 0.5),
  ];
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
  group.add(
    new THREE.Line(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0xe6502e,
        transparent: true,
        opacity: 0.5,
      }),
    ),
  );

  const BASE = 0.34,
    BOB = 0.07;
  function update(t: number) {
    cone.position
      .copy(pos)
      .addScaledVector(out, BASE + Math.sin(t * 2.4) * BOB);
  }

  return { group, update };
}

// ── Component inspection: name + current step reading ─────────────────────
type StepReading = { id: string; name: string; value: string };

type ComponentInspection = {
  name: string;
  category: string;
  subtitle: string;
  readingLabel: string;
  reading: string;
  otherReadings: StepReading[];
};

function mountSummary(inst: ComponentInstance, span: number): string {
  if (!("mountedAt" in inst) || !inst.mountedAt) return "On the bench";
  const { row, col } = inst.mountedAt;
  return span > 0
    ? `Row ${row.toUpperCase()} · columns ${col}–${col + span}`
    : `Row ${row.toUpperCase()} · column ${col}`;
}

function inspectComponent(
  inst: ComponentInstance,
  circuit: Circuit,
  stepIndex: number,
): ComponentInspection {
  const step = circuit.steps[stepIndex] ?? circuit.steps[0];
  const readings = step?.readings ?? {};
  const shown = new Set(step?.show ?? []);
  const vs = step?.supplyVoltage;
  const inputs = step?.activeInputs ?? {};
  const powered =
    (vs !== undefined && vs > 0) || Object.values(inputs).some((v) => v === 1);
  const own = readings[inst.id];

  const otherReadings: StepReading[] = Object.entries(readings)
    .filter(([id, v]) => id !== inst.id && v && shown.has(id))
    .map(([id, v]) => {
      const c = circuit.components.find((x) => x.id === id);
      return {
        id,
        name: c ? componentDisplayName(c) : id.toUpperCase(),
        value: String(v),
      };
    });

  const base = { name: componentDisplayName(inst), otherReadings };
  const stateReading = powered ? "Powered" : "Unpowered";
  const withOwn = (label: string, fallback: string) =>
    own
      ? { readingLabel: "Reading", reading: own }
      : { readingLabel: label, reading: fallback };

  switch (inst.type) {
    case "dc-jack":
    case "battery":
      return {
        ...base,
        category: "Power source",
        subtitle: "Feeds the breadboard power rails",
        ...withOwn(
          "Output voltage",
          vs !== undefined ? `${vs.toFixed(1)} V` : "5.0 V",
        ),
      };
    case "potentiometer":
      return {
        ...base,
        category: "Measurement",
        subtitle: "V/Ω and COM probes on the board",
        ...withOwn("Display", "--"),
      };
    case "ammeter":
      return {
        ...base,
        category: "Measurement",
        subtitle: "Connected in series with the load",
        ...withOwn("Current", "--"),
      };
    case "voltmeter":
      return {
        ...base,
        category: "Measurement",
        subtitle: "Connected in parallel across the part",
        ...withOwn("Voltage", "--"),
      };
    case "oscilloscope":
      return {
        ...base,
        category: "Measurement",
        subtitle: "CH1 probe and ground clip on the board",
        ...withOwn("CH1 trace", "No signal"),
      };
    case "function-generator":
      return {
        ...base,
        category: "Signal source",
        subtitle: "Output and ground leads on the board",
        ...withOwn("Output", "Off"),
      };
    case "resistor":
      return {
        ...base,
        category: "Passive",
        subtitle: mountSummary(inst, 3),
        ...withOwn("Resistance", formatOhms(inst.ohms)),
      };
    case "capacitor":
      return {
        ...base,
        category: "Passive",
        subtitle: mountSummary(inst, 1),
        ...withOwn("Capacitance", `${inst.capacitance} µF`),
      };
    case "inductor":
      return {
        ...base,
        category: "Passive",
        subtitle: mountSummary(inst, 3),
        ...withOwn("Inductance", `${+(inst.henrys * 1000).toFixed(2)} mH`),
      };
    case "led": {
      const b = step?.ledBrightness?.[inst.id];
      const on = b !== undefined ? b > 0.05 : powered;
      const pct = Math.round((b ?? (on ? 1 : 0)) * 100);
      return {
        ...base,
        category: "Active",
        subtitle: `${mountSummary(inst, 1)} · anode on the left`,
        ...withOwn("State", on ? `On · ${pct}% brightness` : "Off"),
      };
    }
    case "zener":
      return {
        ...base,
        category: "Active",
        subtitle: mountSummary(inst, 3),
        ...withOwn("Breakdown voltage", `${inst.vz} V`),
      };
    case "diode":
      return {
        ...base,
        category: "Active",
        subtitle: mountSummary(inst, 3),
        ...withOwn("State", stateReading),
      };
    case "npn-bjt":
    case "pnp-bjt":
      return {
        ...base,
        category: "Active",
        subtitle: `${mountSummary(inst, 0)} · C, B, E`,
        ...withOwn("State", stateReading),
      };
    case "n-mosfet":
    case "p-mosfet":
      return {
        ...base,
        category: "Active",
        subtitle: `${mountSummary(inst, 0)} · G, D, S`,
        ...withOwn("State", stateReading),
      };
    case "wire":
      return {
        ...base,
        category: "Wiring",
        subtitle: "Solid-core breadboard jumper",
        ...withOwn("State", stateReading),
      };
    default: {
      const entries = Object.entries(inputs);
      return {
        ...base,
        category: "Integrated circuit",
        subtitle: mountSummary(inst, 0),
        ...(entries.length > 0
          ? withOwn(
              "Inputs",
              entries.map(([k, v]) => `${k.toUpperCase()}=${v}`).join(", "),
            )
          : withOwn("State", stateReading)),
      };
    }
  }
}

// ── Camera framing & screen projection ────────────────────────────────────
const HOME_POS = new THREE.Vector3(0, 6.5, 7.0);
const HOME_TARGET = new THREE.Vector3(0, 0.1, 0);
const NON_FOCUSABLE = new Set(["breadboard", "long-breadboard"]);
const WORLD_UP = new THREE.Vector3(0, 1, 0);

/** Bench instruments frame their chassis, not the long probe cables. */
function computeFocusBox(group: THREE.Object3D): THREE.Box3 {
  group.updateWorldMatrix(true, true);
  let target: THREE.Object3D = group;
  group.traverse((child) => {
    if (child.userData?.isInstrumentBody) target = child;
  });
  return new THREE.Box3().setFromObject(target);
}

function framingFor(
  box: THREE.Box3,
  isBench: boolean,
  camera: THREE.PerspectiveCamera,
): { pos: THREE.Vector3; target: THREE.Vector3 } {
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
  const fill = isBench ? 0.6 : 0.4;
  const dist = Math.max(
    maxDim / (2 * Math.tan(halfFov) * fill),
    isBench ? 1.2 : 0.6,
  );

  const azimuth = THREE.MathUtils.clamp(
    (camera.position.x - center.x) * 0.12,
    -0.25,
    0.25,
  );
  const dir = (
    isBench
      ? new THREE.Vector3(azimuth * 0.4, 0.36, 0.93)
      : new THREE.Vector3(azimuth, 0.62, 0.78)
  ).normalize();

  // Look slightly right of the part so it sits left of centre, leaving room
  // for the inspection popover on its right.
  const right = new THREE.Vector3()
    .crossVectors(dir.clone().negate(), WORLD_UP)
    .normalize();
  const viewWidth = 2 * dist * Math.tan(halfFov) * camera.aspect;
  const target = center.clone().addScaledVector(right, viewWidth * 0.12);

  return { pos: target.clone().addScaledVector(dir, dist), target };
}

type ScreenRect = { minX: number; maxX: number; minY: number; maxY: number };
const _corner = new THREE.Vector3();

function projectBox(
  box: THREE.Box3,
  camera: THREE.Camera,
  w: number,
  h: number,
): ScreenRect | null {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity,
    inFront = false;
  for (let i = 0; i < 8; i++) {
    _corner
      .set(
        i & 1 ? box.max.x : box.min.x,
        i & 2 ? box.max.y : box.min.y,
        i & 4 ? box.max.z : box.min.z,
      )
      .project(camera);
    if (_corner.z < 1) inFront = true;
    const sx = ((_corner.x + 1) / 2) * w;
    const sy = ((1 - _corner.y) / 2) * h;
    minX = Math.min(minX, sx);
    maxX = Math.max(maxX, sx);
    minY = Math.min(minY, sy);
    maxY = Math.max(maxY, sy);
  }
  return inFront ? { minX, maxX, minY, maxY } : null;
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M11.5 7H2.5M6 3.5L2.5 7L6 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const KBD_STYLE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 20,
  minWidth: 20,
  padding: "0 6px",
  borderRadius: 4,
  border: "1px solid rgba(0,0,0,0.1)",
  background: "#fff",
  fontFamily: "var(--font-mono, monospace)",
  fontSize: 10,
  color: "#737373",
  boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
};

const EYEBROW_STYLE: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "#a3a3a3",
};

// ── React component ───────────────────────────────────────────────────────
export type LabSceneProps = {
  circuit: Circuit;
  activeStepIndex: number;
  markers?: StepMarker[];
  showControlsHint?: boolean;
  /** Compact card thumbnail — tilted, auto-rotate, no orbit controls */
  previewMode?: boolean;
};

type ZoomTween = {
  startTime: number;
  duration: number;
  fromPos: THREE.Vector3;
  toPos: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toTarget: THREE.Vector3;
};

export function LabSceneCanvas({
  circuit,
  activeStepIndex,
  markers = [],
  showControlsHint = true,
  previewMode = false,
}: LabSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const pivotRef = useRef<THREE.Group | null>(null);
  const markerGrpRef = useRef<THREE.Group | null>(null);
  const markerUpdaters = useRef<Array<(t: number) => void>>([]);
  const clockRef = useRef(0);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const zoomAnimRef = useRef<ZoomTween | null>(null);
  const meshMapRef = useRef<Map<string, THREE.Group>>(new Map());

  const { hovered, hover, unhover, selectedId, setSelectedId } =
    useLabInteraction();
  const interactive = !previewMode;

  const hoveredRef = useRef(hovered);
  const selectedRef = useRef(selectedId);

  const focusBoxRef = useRef<THREE.Box3 | null>(null);
  const hoverBoxRef = useRef<{ id: string; box: THREE.Box3 } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const nameTagRef = useRef<HTMLDivElement>(null);

  // Components the ‹ › buttons cycle through in the current step.
  const cycleIds = useMemo(() => {
    const shown = new Set(circuit.steps[activeStepIndex]?.show ?? []);
    return circuit.components
      .filter(
        (c) =>
          shown.has(c.id) && !NON_FOCUSABLE.has(c.type) && c.type !== "wire",
      )
      .map((c) => c.id);
  }, [circuit, activeStepIndex]);
  const cycleIdsRef = useRef(cycleIds);

  const animateCameraTo = useCallback(
    (toPos: THREE.Vector3, toTarget: THREE.Vector3, duration = 600) => {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!camera || !controls) return;
      zoomAnimRef.current = {
        startTime: performance.now(),
        duration,
        fromPos: camera.position.clone(),
        toPos: toPos.clone(),
        fromTarget: controls.target.clone(),
        toTarget: toTarget.clone(),
      };
    },
    [],
  );

  const focusCamera = useCallback(
    (id: string): boolean => {
      const group = meshMapRef.current.get(id);
      const inst = circuit.components.find((c) => c.id === id);
      const camera = cameraRef.current;
      if (!group || !inst || !group.visible || !camera) return false;
      const box = computeFocusBox(group);
      if (box.isEmpty()) return false;
      focusBoxRef.current = box;
      const { pos, target } = framingFor(
        box,
        BENCH_TYPES.has(inst.type),
        camera,
      );
      animateCameraTo(pos, target);
      return true;
    },
    [circuit.components, animateCameraTo],
  );
  const focusCameraRef = useRef(focusCamera);

  const cycleComponent = useCallback(
    (dir: 1 | -1) => {
      const ids = cycleIdsRef.current.filter((id) =>
        meshMapRef.current.has(id),
      );
      if (ids.length === 0) return;
      const cur = selectedRef.current ? ids.indexOf(selectedRef.current) : -1;
      const next =
        cur === -1
          ? dir > 0
            ? 0
            : ids.length - 1
          : (cur + dir + ids.length) % ids.length;
      setSelectedId(ids[next]);
    },
    [setSelectedId],
  );
  const cycleRef = useRef(cycleComponent);

  // Read inside the render loop / native listeners without re-subscribing.
  useLayoutEffect(() => {
    hoveredRef.current = hovered;
    selectedRef.current = selectedId;
    cycleIdsRef.current = cycleIds;
    focusCameraRef.current = focusCamera;
    cycleRef.current = cycleComponent;
  });

  // ── Build scene once per circuit ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setSelectedId(null);
    unhover("3d");

    // Dispose previous scene
    if (sceneRef.current) {
      sceneRef.current.traverse(disposeGroup);
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(previewMode ? 0xffffff : 0xf7f6f3, 1);
    renderer.shadowMap.enabled = false;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ── Camera ────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      previewMode ? 38 : 35,
      1,
      0.05,
      previewMode ? 100 : 200,
    );
    if (previewMode) {
      camera.position.set(0.6, 5.2, 6.0);
    } else {
      camera.position.copy(HOME_POS);
    }
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // ── Controls — orbit for labs, drag-spin for card previews ────────
    let controls: OrbitControls | null = null;
    const spin = { dragging: false, lx: 0, ly: 0, ry: -0.3, rx: 0.3 };

    if (previewMode) {
      controlsRef.current = null;
    } else {
      controls = new OrbitControls(camera, canvas);
      controls.target.copy(HOME_TARGET);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 0.35;
      controls.maxDistance = 20;
      controls.maxPolarAngle = Math.PI * 0.48;
      controls.minPolarAngle = Math.PI * 0.05;
      controls.enablePan = true;
      controls.panSpeed = 0.8;
      controls.rotateSpeed = 0.6;
      controls.zoomSpeed = 1.0;
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };
      controls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
      // Manual orbit / zoom takes over from any running camera tween.
      controls.addEventListener("start", () => {
        zoomAnimRef.current = null;
      });
      controls.update();
      controlsRef.current = controls;
    }

    // ── Pivot group for circuit components ────────────────────────────
    const pivot = new THREE.Group();
    if (previewMode) pivot.rotation.x = 0.3;
    scene.add(pivot);
    pivotRef.current = pivot;

    // ── Lighting ─────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(3, 8, 5);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.22);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // Initial simulation with step 0 inputs
    const step0 = circuit.steps[0];
    const simResult = simulate(circuit, step0?.activeInputs ?? {});

    // Build all component meshes
    const map = new Map<string, THREE.Group>();
    for (const inst of circuit.components) {
      const g = buildInstance(inst, circuit.components, simResult.ledOn);
      if (g) {
        g.userData.componentId = inst.id;
        g.userData.componentType = inst.type;
        g.visible = false;
        pivot.add(g);
        map.set(inst.id, g);
      }
    }
    meshMapRef.current = map;

    // Marker group
    const markerGroup = new THREE.Group();
    pivot.add(markerGroup);
    markerGrpRef.current = markerGroup;

    // Resize
    function resize() {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Picking: click to inspect, hover to name ──────────────────────
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const down = { x: 0, y: 0, button: -1 };
    const pointer = { x: 0, y: 0, buttons: 0, dirty: false };

    /** Topmost visible component under the cursor; parts beat wires beat the board. */
    function pick(clientX: number, clientY: number): string | null {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      ndc.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);

      const groups: THREE.Object3D[] = [];
      meshMapRef.current.forEach((g) => {
        if (g.visible) groups.push(g);
      });

      let wireHit: string | null = null;
      let boardHit: string | null = null;
      for (const hit of raycaster.intersectObjects(groups, true)) {
        let cur: THREE.Object3D | null = hit.object;
        while (cur && !cur.userData?.componentId) cur = cur.parent;
        const id = cur?.userData?.componentId as string | undefined;
        const type = cur?.userData?.componentType as string | undefined;
        if (!id || !type) continue;
        if (NON_FOCUSABLE.has(type)) boardHit ??= id;
        else if (type === "wire") wireHit ??= id;
        else return id;
      }
      return wireHit ?? boardHit;
    }

    function focusableAt(clientX: number, clientY: number): string | null {
      const id = pick(clientX, clientY);
      const inst = id ? circuit.components.find((c) => c.id === id) : undefined;
      return inst && !NON_FOCUSABLE.has(inst.type) ? inst.id : null;
    }

    const onLabPointerDown = (e: PointerEvent) => {
      down.x = e.clientX;
      down.y = e.clientY;
      down.button = e.button;
    };
    const onLabPointerUp = (e: PointerEvent) => {
      if (e.button !== 0 || down.button !== 0) return;
      // Ignore the end of an orbit drag.
      if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) return;
      const id = focusableAt(e.clientX, e.clientY);
      if (!id) {
        if (selectedRef.current) setSelectedId(null);
      } else if (id === selectedRef.current) {
        focusCameraRef.current(id);
      } else {
        setSelectedId(id);
      }
    };
    const onLabPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.buttons = e.buttons;
      pointer.dirty = true;
    };
    const onLabPointerLeave = () => {
      pointer.dirty = false;
      unhover("3d");
      canvas.style.cursor = "grab";
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedRef.current) return;
      if (e.key === "Escape") {
        setSelectedId(null);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        cycleRef.current(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        cycleRef.current(-1);
      }
    };

    let raf: number;
    const onDown = (e: PointerEvent) => {
      spin.dragging = true;
      spin.lx = e.clientX;
      spin.ly = e.clientY;
    };
    const onUp = () => {
      spin.dragging = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!spin.dragging) return;
      spin.ry += (e.clientX - spin.lx) * 0.01;
      spin.rx += (e.clientY - spin.ly) * 0.006;
      spin.rx = Math.max(-0.05, Math.min(0.75, spin.rx));
      spin.lx = e.clientX;
      spin.ly = e.clientY;
    };

    if (previewMode) {
      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointermove", onMove);
    } else {
      canvas.addEventListener("pointerdown", onLabPointerDown);
      canvas.addEventListener("pointerup", onLabPointerUp);
      canvas.addEventListener("pointermove", onLabPointerMove);
      canvas.addEventListener("pointerleave", onLabPointerLeave);
      window.addEventListener("keydown", onKeyDown);
    }

    // ── DOM overlays that track 3D positions (written directly, per frame) ──
    function updateOverlays() {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width,
        h = rect.height;

      const tag = nameTagRef.current;
      if (tag) {
        const hv = hoveredRef.current;
        let placed = false;
        if (hv && hv.source === "3d" && hv.id !== selectedRef.current) {
          let hb = hoverBoxRef.current;
          if (!hb || hb.id !== hv.id) {
            const g = meshMapRef.current.get(hv.id);
            hb = g ? { id: hv.id, box: computeFocusBox(g) } : null;
            hoverBoxRef.current = hb;
          }
          const p = hb ? projectBox(hb.box, camera, w, h) : null;
          if (p) {
            tag.style.left = `${rect.left + (p.minX + p.maxX) / 2}px`;
            tag.style.top = `${rect.top + Math.max(p.minY, 40) - 10}px`;
            placed = true;
          }
        }
        tag.style.visibility = placed ? "visible" : "hidden";
      }

      const pop = popoverRef.current;
      const caret = caretRef.current;
      const box = focusBoxRef.current;
      if (pop && caret) {
        const p = box ? projectBox(box, camera, w, h) : null;
        if (!p) {
          pop.style.visibility = "hidden";
          return;
        }
        const GAP = 18,
          M = 16;
        const pw = pop.offsetWidth,
          ph = pop.offsetHeight;
        const cy = (p.minY + p.maxY) / 2;

        let onRight = true;
        let x = p.maxX + GAP;
        if (x + pw > w - M) {
          const leftX = p.minX - GAP - pw;
          if (leftX >= M) {
            x = leftX;
            onRight = false;
          } else {
            x = w - M - pw;
          }
        }
        const y = THREE.MathUtils.clamp(
          cy - ph / 2,
          M,
          Math.max(M, h - M - ph),
        );

        pop.style.left = `${rect.left + x}px`;
        pop.style.top = `${rect.top + y}px`;
        pop.style.visibility = "visible";

        caret.style.top = `${THREE.MathUtils.clamp(cy - y, 18, ph - 18) - 6}px`;
        caret.style.left = onRight ? "-6px" : "";
        caret.style.right = onRight ? "" : "-6px";
        caret.style.borderWidth = onRight ? "0 0 1px 1px" : "1px 1px 0 0";
      }
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      clockRef.current += 0.016;
      if (previewMode) {
        if (!spin.dragging) spin.ry += 0.002;
        pivot.rotation.y = spin.ry;
        pivot.rotation.x = spin.rx;
      } else {
        const anim = zoomAnimRef.current;
        if (anim) {
          const t = Math.min(
            1,
            (performance.now() - anim.startTime) / anim.duration,
          );
          const ease = 1 - Math.pow(1 - t, 3);
          camera.position.lerpVectors(anim.fromPos, anim.toPos, ease);
          controls!.target.lerpVectors(anim.fromTarget, anim.toTarget, ease);
          if (t >= 1) zoomAnimRef.current = null;
        }
        controls!.update();

        // Hover picking at most once per frame.
        if (pointer.dirty) {
          pointer.dirty = false;
          const id =
            pointer.buttons === 0 ? focusableAt(pointer.x, pointer.y) : null;
          if (id) hover(id, "3d");
          else unhover("3d");
          canvas.style.cursor = id ? "pointer" : "grab";
        }
        updateOverlays();
      }
      for (const upd of markerUpdaters.current) upd(clockRef.current);
      renderer.render(scene, camera);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (previewMode) {
        canvas.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointermove", onMove);
      } else {
        canvas.removeEventListener("pointerdown", onLabPointerDown);
        canvas.removeEventListener("pointerup", onLabPointerUp);
        canvas.removeEventListener("pointermove", onLabPointerMove);
        canvas.removeEventListener("pointerleave", onLabPointerLeave);
        window.removeEventListener("keydown", onKeyDown);
        controls?.dispose();
      }
      meshMapRef.current.forEach((g) => disposeGroup(g));
      meshMapRef.current.clear();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuit.id, previewMode]);

  // ── Selection drives the camera: zoom in, or glide back out ──────────
  const wasSelectedRef = useRef(false);
  useEffect(() => {
    if (previewMode) return;
    if (selectedId) {
      if (!focusCamera(selectedId)) {
        setSelectedId(null);
        return;
      }
      wasSelectedRef.current = true;
    } else {
      focusBoxRef.current = null;
      if (wasSelectedRef.current) animateCameraTo(HOME_POS, HOME_TARGET, 560);
      wasSelectedRef.current = false;
    }
  }, [selectedId, focusCamera, animateCameraTo, previewMode, setSelectedId]);

  // ── Update on step change: visibility + LED states ─────────────────────
  useEffect(() => {
    const step = circuit.steps[activeStepIndex];
    if (!step) return;

    // Run simulation for this step's inputs
    const simResult = simulate(circuit, step.activeInputs ?? {});

    // Visibility
    const visible = new Set(step.show);
    const pivot = pivotRef.current;
    if (!pivot) return;

    meshMapRef.current.forEach((g, id) => {
      g.visible = visible.has(id);
    });

    // Rebuild LED meshes with correct isOn state
    // For analog circuits (no gates), activeInputs with any truthy value
    // means "power is on" → all visible LEDs glow.
    const hasActiveInput = Object.values(step.activeInputs ?? {}).some(
      (v) => v === 1,
    );
    const hasSimResults = simResult.ledOn.size > 0;

    for (const inst of circuit.components) {
      if (inst.type !== "led") continue;
      if (!visible.has(inst.id)) continue;

      const old = meshMapRef.current.get(inst.id);
      if (old) {
        disposeGroup(old);
        pivot.remove(old);
      }

      const { col, row, board } = inst.mountedAt;
      const cols = colsForBoardId(board, circuit.components);
      const brightness = step.ledBrightness?.[inst.id];
      const isOn =
        brightness !== undefined
          ? brightness > 0.05
          : hasSimResults
            ? (simResult.ledOn.get(inst.id) ?? false)
            : hasActiveInput;
      const bright = step.ledBrightness?.[inst.id] ?? (isOn ? 1.0 : 0.0);
      const fresh = buildLed(
        hole(col, row, cols),
        hole(col + 1, row, cols),
        inst.color,
        isOn,
        bright,
      );
      fresh.userData.componentId = inst.id;
      fresh.userData.componentType = inst.type;
      fresh.visible = true;
      pivot.add(fresh);
      meshMapRef.current.set(inst.id, fresh);
    }

    // ── Rebuild instruments with dynamic display values ───────────────
    const slotMap = benchSlotMap(circuit.components);
    for (const inst of circuit.components) {
      if (
        inst.type !== "dc-jack" &&
        inst.type !== "battery" &&
        inst.type !== "potentiometer" &&
        inst.type !== "ammeter" &&
        inst.type !== "voltmeter" &&
        inst.type !== "oscilloscope" &&
        inst.type !== "function-generator"
      )
        continue;
      if (!visible.has(inst.id)) continue;

      const old = meshMapRef.current.get(inst.id);
      if (old) {
        disposeGroup(old);
        pivot.remove(old);
      }

      const displayVal = step.readings?.[inst.id] ?? "--";
      let fresh: THREE.Group;

      if (inst.type === "potentiometer") {
        const p = (inst as any).probes as [any, any] | undefined;
        const targets = p
          ? {
              probe1:
                resolvePin(p[0], circuit.components) ?? new THREE.Vector3(),
              probe2:
                resolvePin(p[1], circuit.components) ?? new THREE.Vector3(),
            }
          : undefined;
        fresh = buildIcMeter(slotMap.get(inst.id) ?? 0, displayVal, targets);
      } else if (inst.type === "ammeter") {
        const p = (inst as any).probes as [any, any] | undefined;
        const targets = p
          ? {
              probe1:
                resolvePin(p[0], circuit.components) ?? new THREE.Vector3(),
              probe2:
                resolvePin(p[1], circuit.components) ?? new THREE.Vector3(),
            }
          : undefined;
        fresh = buildAmmeterSide(
          slotMap.get(inst.id) ?? 0,
          targets,
          displayVal,
        );
      } else if (inst.type === "voltmeter") {
        const p = (inst as any).probes as [any, any] | undefined;
        const targets = p
          ? {
              probe1:
                resolvePin(p[0], circuit.components) ?? new THREE.Vector3(),
              probe2:
                resolvePin(p[1], circuit.components) ?? new THREE.Vector3(),
            }
          : undefined;
        fresh = buildVoltmeterSide(
          slotMap.get(inst.id) ?? 0,
          targets,
          displayVal,
        );
      } else if (inst.type === "oscilloscope") {
        const slot = slotMap.get(inst.id) ?? 0;
        const croReading = step.readings?.[inst.id] ?? "4.2 Vpp, 1 kHz";
        fresh = buildBenchOscilloscope(
          inst,
          circuit.components,
          slot,
          croReading,
        );
      } else if (inst.type === "function-generator") {
        const slot = slotMap.get(inst.id) ?? 0;
        fresh = buildBenchFunctionGenerator(
          inst,
          circuit.components,
          slot,
          step.readings?.[inst.id],
        );
      } else {
        // dc-jack / battery
        const t = (inst as any).terminals as [any, any] | undefined;
        const targets = t
          ? {
              vcc: resolvePin(t[0], circuit.components) ?? new THREE.Vector3(),
              gnd: resolvePin(t[1], circuit.components) ?? new THREE.Vector3(),
            }
          : undefined;
        const psuVal =
          step.readings?.[inst.id] ??
          (step.supplyVoltage !== undefined
            ? step.supplyVoltage.toFixed(1)
            : "5.0");
        fresh = buildDcPowerSupply(slotMap.get(inst.id) ?? 0, psuVal, targets);
      }
      fresh.userData.componentId = inst.id;
      fresh.userData.componentType = inst.type;
      fresh.visible = true;
      pivot.add(fresh);
      meshMapRef.current.set(inst.id, fresh);
    }

    // Rebuilt meshes invalidate cached boxes; drop the view if its part left.
    hoverBoxRef.current = null;
    const sel = selectedRef.current;
    if (sel) {
      const g = meshMapRef.current.get(sel);
      if (!g || !visible.has(sel)) setSelectedId(null);
      else focusBoxRef.current = computeFocusBox(g);
    }
  }, [circuit, activeStepIndex, setSelectedId]);

  // ── Rebuild markers when they change ─────────────────────────────────
  useEffect(() => {
    const mg = markerGrpRef.current;
    if (!mg) return;

    // Dispose old markers
    mg.children.forEach(disposeGroup);
    while (mg.children.length) mg.remove(mg.children[0]);
    markerUpdaters.current = [];

    for (const marker of markers) {
      const { group, update } = buildMarkerGroup(marker);
      mg.add(group);
      markerUpdaters.current.push(update);
    }
  }, [markers]);

  const selectedInst = selectedId
    ? circuit.components.find((c) => c.id === selectedId)
    : undefined;
  const inspection =
    interactive && selectedInst
      ? inspectComponent(selectedInst, circuit, activeStepIndex)
      : null;
  const hoveredInst =
    interactive && hovered?.source === "3d" && hovered.id !== selectedId
      ? circuit.components.find((c) => c.id === hovered.id)
      : undefined;
  const cyclePos = selectedId ? cycleIds.indexOf(selectedId) : -1;
  const canPortal = typeof document !== "undefined";

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          cursor: "grab",
          touchAction: "none",
        }}
      />

      {showControlsHint && !inspection && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 14,
            fontSize: 10,
            color: "rgba(0,0,0,0.3)",
            pointerEvents: "none",
            userSelect: "none",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        >
          click a component: inspect · left drag: orbit · right drag: pan ·
          scroll: zoom
        </div>
      )}

      {/* Hover name tag over the 3D part */}
      {canPortal &&
        hoveredInst &&
        createPortal(
          <div
            ref={nameTagRef}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              transform: "translate(-50%, -100%)",
              zIndex: 900,
              pointerEvents: "none",
              visibility: "hidden",
            }}
          >
            <div key={hoveredInst.id} className="lab-name-tag">
              {componentDisplayName(hoveredInst)}
            </div>
          </div>,
          document.body,
        )}

      {/* Component view: popover pointing at the part + navigation bar */}
      {canPortal &&
        inspection &&
        createPortal(
          <>
            <div
              ref={popoverRef}
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: 280,
                zIndex: 900,
                visibility: "hidden",
              }}
            >
              <div
                key={selectedId}
                className="lab-popover"
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: 12,
                  padding: "14px 16px",
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
                  fontFamily: "var(--font-sans, sans-serif)",
                }}
              >
                <div
                  ref={caretRef}
                  style={{
                    position: "absolute",
                    left: -6,
                    top: 20,
                    width: 12,
                    height: 12,
                    background: "#fff",
                    borderStyle: "solid",
                    borderColor: "rgba(0,0,0,0.1)",
                    borderWidth: "0 0 1px 1px",
                    transform: "rotate(45deg)",
                  }}
                />

                <div style={EYEBROW_STYLE}>{inspection.category}</div>
                <div
                  style={{
                    marginTop: 2,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#171717",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {inspection.name}
                </div>
                <div style={{ marginTop: 2, fontSize: 12, color: "#737373" }}>
                  {inspection.subtitle}
                </div>

                <div
                  style={{
                    marginTop: 12,
                    padding: "9px 12px",
                    borderRadius: 8,
                    background: "#fafafa",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={EYEBROW_STYLE}>
                    {inspection.readingLabel} · Step {activeStepIndex + 1}
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "#171717",
                    }}
                  >
                    {inspection.reading}
                  </div>
                </div>

                {inspection.otherReadings.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ ...EYEBROW_STYLE, marginBottom: 6 }}>
                      Other readings this step
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {inspection.otherReadings.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSelectedId(r.id)}
                          className="appearance-none border-none outline-none cursor-pointer rounded-[6px] bg-[var(--color-black-5)] hover:bg-[var(--color-black-10)] transition-colors"
                          style={{
                            padding: "4px 8px",
                            fontSize: 11.5,
                            color: "#737373",
                            fontFamily: "var(--font-sans, sans-serif)",
                          }}
                        >
                          {r.name}{" "}
                          <span
                            style={{
                              color: "#171717",
                              fontFamily: "var(--font-mono, monospace)",
                            }}
                          >
                            {r.value}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                position: "fixed",
                left: "50%",
                bottom: 24,
                transform: "translateX(-50%)",
                zIndex: 900,
              }}
            >
              <div
                className="lab-popover"
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Back to the full bench"
                  className={`appearance-none outline-none cursor-pointer flex items-center gap-2 h-[52px] pl-4 pr-5 text-[13px] font-medium text-[var(--ink)] hover:bg-white transition-colors ${PILL_SURFACE_CLASS}`}
                >
                  <BackIcon />
                  Back
                </button>

                <NavPill
                  eyebrow={
                    cyclePos >= 0
                      ? `Component ${cyclePos + 1} of ${cycleIds.length}`
                      : "Component"
                  }
                  label={inspection.name}
                  onPrev={() => cycleComponent(-1)}
                  onNext={() => cycleComponent(1)}
                  prevDisabled={cycleIds.length < 2 && cyclePos >= 0}
                  nextDisabled={cycleIds.length < 2 && cyclePos >= 0}
                  prevLabel="Previous component"
                  nextLabel="Next component"
                />

                <div
                  className={`flex items-center gap-2 h-[52px] px-4 select-none ${PILL_SURFACE_CLASS}`}
                >
                  <kbd style={KBD_STYLE}>esc</kbd>
                  <span style={{ fontSize: 12, color: "#737373" }}>
                    to exit
                  </span>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
