// ── Circuit Simulator ──────────────────────────────────────────────────────
//
// Orchestrates: Netlist → seed → evaluate → LED states.
//
// Architecture (mirrors DigitalJS SynchEngine, simplified for combinational):
//   1. Build Netlist from circuit components (union-find over holes + wires).
//   2. Seed driven nets: VCC=1, GND=0, user activeInputs.
//   3. Evaluate all combinational gates iteratively until convergence.
//   4. Evaluate sequential elements (DFF etc.) once per step.
//   5. Return LED on/off states derived from net signals.

import { Netlist, type NetId, type Signal as NetSignal } from "./netlist";
import { type Circuit, type ComponentInstance } from "./types";
import {
  type Signal,
  HIGH,
  LOW,
  sigX,
  sigNot,
  evaluateGate,
  GATE_TYPES,
  opAdd,
  opSub,
  opMul,
  opNegation,
  opEq,
  opNe,
  opLt,
  opLe,
  opGt,
  opGe,
  opShiftLeft,
  opShiftRight,
  op4BitAdder,
  ARITH_TYPES,
  opMux,
  op74HC153_MUX,
  op74HC138_DEMUX,
  op74HC139_DEMUX,
  MUX_TYPES,
  opZeroExtend,
  opSignExtend,
  opBusSlice,
  opBusGroup,
  opBusUngroup,
  BUS_TYPES,
  createSequentialState,
  type SequentialState,
  SEQUENTIAL_TYPES,
  fromBin,
  isFullyDefined,
} from "./logic/index";

const MULTI_GATE_TYPES = new Set([
  "not-hex",
  "and-quad",
  "or-quad",
  "nand-quad",
  "xor-quad",
]);

const QUAD_GATE: Record<string, string> = {
  "and-quad": "and-gate",
  "or-quad": "or-gate",
  "nand-quad": "nand-gate",
  "xor-quad": "xor-gate",
};

// Map NetId → Signal (1-bit or multi-bit)
export type NetValues = Map<NetId, Signal>;

export type SimResult = {
  netValues: NetValues;
  /** component id → true if LED is lit */
  ledOn: Map<string, boolean>;
};

// ── Stateful component registry (persists across steps for same circuit) ───
// Keyed by circuit.id so state resets when circuit changes.
const sequentialRegistry = new Map<string, Map<string, SequentialState>>();

type MachineState = { pc: number; clk: number; latch: number; flag: number; stb: number };
const machineState = new Map<string, MachineState>();

function machineOf(circuitId: string, id: string): MachineState {
  const key = `${circuitId}:${id}`;
  let state = machineState.get(key);
  if (!state) {
    state = { pc: 0, clk: 0, latch: 0, flag: 0, stb: 0 };
    machineState.set(key, state);
  }
  return state;
}

function getOrCreateSeqState(
  circuitId: string,
  compId: string,
  type: string,
  config?: Record<string, unknown>,
): SequentialState | null {
  if (!sequentialRegistry.has(circuitId)) {
    sequentialRegistry.set(circuitId, new Map());
  }
  const map = sequentialRegistry.get(circuitId)!;
  if (!map.has(compId)) {
    const state = createSequentialState(type, config);
    if (state) map.set(compId, state);
  }
  return map.get(compId) ?? null;
}

// ── Signal lookup helper ───────────────────────────────────────────────────
function sig(nv: NetValues, netId: NetId | null): Signal {
  if (!netId) return ["x"];
  return nv.get(netId) ?? ["x"];
}

function setSig(nv: NetValues, netId: NetId | null, s: Signal) {
  if (netId) nv.set(netId, s);
}

// ── Main simulator ─────────────────────────────────────────────────────────
export function simulate(
  circuit: Circuit,
  activeInputs: Record<string, 0 | 1> = {},
): SimResult {
  const { components, id: circuitId } = circuit;
  const nl = new Netlist(components);
  const nv: NetValues = new Map();

  // ── 1. Seed power rails ─────────────────────────────────────────────
  for (const rail of ["vcc_top", "vcc_bot"] as const) {
    nv.set(nl.netOfRail(rail), HIGH);
  }
  for (const rail of ["gnd_top", "gnd_bot"] as const) {
    nv.set(nl.netOfRail(rail), LOW);
  }

  // ── 2. Seed user inputs ─────────────────────────────────────────────
  // For each input wire: identify the signal name from the wire ID
  // (namePart convention: "w_a_xor" → 'a' → input 'A'), then write
  // the signal value to the DESTINATION IC pin's net (not the source
  // TiePin, which may be merged with other IC pins via earlier wires).
  //
  // Writing to the destination net directly avoids the "column merge
  // corruption" where a TiePin source column overlaps with another
  // IC's physical pin column due to union-find merges.
  for (const inst of components) {
    if (inst.type !== "wire") continue;
    const from = inst.from as Record<string, unknown>;
    const to = inst.to as Record<string, unknown>;

    // Must be TiePin source (input wire, not internal wire)
    if (!("col" in from && "row" in from)) continue;
    // Must be IcPin destination
    if (!("ic" in to && "pin" in to)) continue;

    // Extract signal name from wire ID: "w_cin_xor2" → parts[1] = "cin"
    const parts = inst.id.split("_");
    const namePart = parts[1] ?? "";
    if (!namePart) continue;

    const inputKey = Object.keys(activeInputs).find(
      (k) => namePart.toLowerCase() === k.toLowerCase(),
    );
    if (inputKey === undefined) continue;

    // Write to the DESTINATION IC pin's net — avoids TiePin column conflicts
    const icId = to.ic as string;
    const pin = to.pin as string;
    const net = nl.componentPinNet(icId, pin);
    if (net) nv.set(net, activeInputs[inputKey] === 1 ? HIGH : LOW);
  }

  // ── 3. Seed constants ────────────────────────────────────────────────
  for (const inst of components) {
    if (inst.type !== "constant") continue;
    const net = nl.componentPinNet(inst.id, "out");
    if (net) nv.set(net, fromBin(inst.value));
  }

  // ── 4. Combinational evaluation (iterative fixpoint) ────────────────
  const combGates = components.filter(
    (c) =>
      GATE_TYPES.has(c.type) ||
      MULTI_GATE_TYPES.has(c.type) ||
      ARITH_TYPES.has(c.type) ||
      MUX_TYPES.has(c.type) ||
      BUS_TYPES.has(c.type),
  );

  const runComb = () => {
  for (let iter = 0; iter < 40; iter++) {
    let changed = false;

    for (const gate of combGates) {
      if (!("mountedAt" in gate)) continue;
      const id = gate.id;
      const type = gate.type;

      // ── Standard gates (not/and/or/xor/nand/nor/xnor + reduce) ────
      if (type === "not-hex") {
        for (const n of [1, 2, 3, 4, 5, 6]) {
          const nY = nl.componentPinNet(id, `${n}Y`);
          if (!nY) continue;
          const res = evaluateGate(
            "not-gate",
            { in: sig(nv, nl.componentPinNet(id, `${n}A`)) },
            1,
          );
          if (res && !signalsEqual(nv.get(nY), res.out)) {
            nv.set(nY, res.out);
            changed = true;
          }
        }
      } else if (QUAD_GATE[type]) {
        for (const n of [1, 2, 3, 4]) {
          const nY = nl.componentPinNet(id, `${n}Y`);
          if (!nY) continue;
          const res = evaluateGate(
            QUAD_GATE[type],
            {
              in1: sig(nv, nl.componentPinNet(id, `${n}A`)),
              in2: sig(nv, nl.componentPinNet(id, `${n}B`)),
            },
            1,
          );
          if (res && !signalsEqual(nv.get(nY), res.out)) {
            nv.set(nY, res.out);
            changed = true;
          }
        }
      } else if (type === "buffer-gate") {
        // 74HC125: A is the data pin, B is active-low output enable.
        // Y is driven only while enable is low. A high enable is high impedance.
        const nY = nl.componentPinNet(id, "Y") ?? nl.componentPinNet(id, "1Y");
        const oe = sig(nv, nl.componentPinNet(id, "B") ?? nl.componentPinNet(id, "1B"));
        if (nY && oe[0] === 0) {
          const data = sig(nv, nl.componentPinNet(id, "A") ?? nl.componentPinNet(id, "1A"));
          if (!signalsEqual(nv.get(nY), data)) {
            nv.set(nY, data);
            changed = true;
          }
        }
      } else if (GATE_TYPES.has(type)) {
        // Gate 1 only (alias pins A/1A, B/1B → Y/1Y)
        const nA = nl.componentPinNet(id, "A") ?? nl.componentPinNet(id, "1A");
        const nB = nl.componentPinNet(id, "B") ?? nl.componentPinNet(id, "1B");
        const nY = nl.componentPinNet(id, "Y") ?? nl.componentPinNet(id, "1Y");

        if (nY) {
          const res = evaluateGate(
            type,
            { in1: sig(nv, nA), in2: sig(nv, nB), in: sig(nv, nA) },
            1,
          );
          if (res && !signalsEqual(nv.get(nY), res.out)) {
            nv.set(nY, res.out);
            changed = true;
          }
        }
      }

      // ── Arithmetic ────────────────────────────────────────────────
      else if (type === "adder" && "bits" in gate) {
        const bits = (gate as any).bits as number;
        const signed = (gate as any).signed ?? false;
        const nA = nl.componentPinNet(id, "in1");
        const nB = nl.componentPinNet(id, "in2");
        const nY = nl.componentPinNet(id, "out");
        if (nA && nB && nY) {
          const out = opAdd(sig(nv, nA), sig(nv, nB), bits, signed);
          if (!signalsEqual(nv.get(nY), out)) {
            nv.set(nY, out);
            changed = true;
          }
        }
      } else if (type === "adder-4bit") {
        // 74HC283: A[1-4], B[1-4], C0 → S[1-4], C4
        const a = [
          nl.componentPinNet(id, "a1"),
          nl.componentPinNet(id, "a2"),
          nl.componentPinNet(id, "a3"),
          nl.componentPinNet(id, "a4"),
        ].map((n) => sig(nv, n)[0] ?? ("x" as any));
        const b = [
          nl.componentPinNet(id, "b1"),
          nl.componentPinNet(id, "b2"),
          nl.componentPinNet(id, "b3"),
          nl.componentPinNet(id, "b4"),
        ].map((n) => sig(nv, n)[0] ?? ("x" as any));
        const cin = sig(nv, nl.componentPinNet(id, "c0"));
        const { sum, cout } = op4BitAdder(a as Signal, b as Signal, cin);
        [
          nl.componentPinNet(id, "s1"),
          nl.componentPinNet(id, "s2"),
          nl.componentPinNet(id, "s3"),
          nl.componentPinNet(id, "s4"),
        ].forEach((net, i) => {
          if (net && !signalsEqual(nv.get(net), [sum[i]])) {
            nv.set(net, [sum[i]]);
            changed = true;
          }
        });
        const nC4 = nl.componentPinNet(id, "c4");
        if (nC4 && !signalsEqual(nv.get(nC4), cout)) {
          nv.set(nC4, cout);
          changed = true;
        }
      } else if (type === "mux" && "bits" in gate) {
        const bits = (gate as any).bits as { in: number; sel: number };
        const nSel = nl.componentPinNet(id, "sel");
        const selSig = sig(nv, nSel);
        const numInputs = 1 << bits.sel;
        const inputs: Signal[] = [];
        for (let i = 0; i < numInputs; i++) {
          inputs.push(sig(nv, nl.componentPinNet(id, `in${i}`)));
        }
        const nOut = nl.componentPinNet(id, "out");
        if (nOut) {
          const out = opMux(selSig, inputs, bits.in);
          if (!signalsEqual(nv.get(nOut), out)) {
            nv.set(nOut, out);
            changed = true;
          }
        }
      } else if (type === "zero-extend" && "extend" in gate) {
        const ext = (gate as any).extend as { input: number; output: number };
        const nIn = nl.componentPinNet(id, "in");
        const nOut = nl.componentPinNet(id, "out");
        if (nIn && nOut) {
          const out = opZeroExtend(sig(nv, nIn), ext.output);
          if (!signalsEqual(nv.get(nOut), out)) {
            nv.set(nOut, out);
            changed = true;
          }
        }
      } else if (type === "sign-extend" && "extend" in gate) {
        const ext = (gate as any).extend as { input: number; output: number };
        const nIn = nl.componentPinNet(id, "in");
        const nOut = nl.componentPinNet(id, "out");
        if (nIn && nOut) {
          const out = opSignExtend(sig(nv, nIn), ext.output);
          if (!signalsEqual(nv.get(nOut), out)) {
            nv.set(nOut, out);
            changed = true;
          }
        }
      } else if (type === "bus-slice" && "slice" in gate) {
        const sl = (gate as any).slice as { first: number; count: number };
        const nIn = nl.componentPinNet(id, "in");
        const nOut = nl.componentPinNet(id, "out");
        if (nIn && nOut) {
          const out = opBusSlice(sig(nv, nIn), sl.first, sl.count);
          if (!signalsEqual(nv.get(nOut), out)) {
            nv.set(nOut, out);
            changed = true;
          }
        }
      } else if (type === "mux-4to1") {
        const s0 = sig(nv, nl.componentPinNet(id, "s0"));
        const s1 = sig(nv, nl.componentPinNet(id, "s1"));
        const y = op74HC153_MUX(
          [s0[0] ?? "x", s1[0] ?? "x"],
          sig(nv, nl.componentPinNet(id, "en1_bar")),
          sig(nv, nl.componentPinNet(id, "i0_1")),
          sig(nv, nl.componentPinNet(id, "i1_1")),
          sig(nv, nl.componentPinNet(id, "i2_1")),
          sig(nv, nl.componentPinNet(id, "i3_1")),
        );
        const nY = nl.componentPinNet(id, "y1");
        if (nY && !signalsEqual(nv.get(nY), y)) {
          nv.set(nY, y);
          changed = true;
        }
        const y2 = op74HC153_MUX(
          [s0[0] ?? "x", s1[0] ?? "x"],
          sig(nv, nl.componentPinNet(id, "en2_bar")),
          sig(nv, nl.componentPinNet(id, "i0_2")),
          sig(nv, nl.componentPinNet(id, "i1_2")),
          sig(nv, nl.componentPinNet(id, "i2_2")),
          sig(nv, nl.componentPinNet(id, "i3_2")),
        );
        const nY2 = nl.componentPinNet(id, "y2");
        if (nY2 && !signalsEqual(nv.get(nY2), y2)) {
          nv.set(nY2, y2);
          changed = true;
        }
      } else if (type === "demux-1to4") {
        const out = op74HC139_DEMUX(
          sig(nv, nl.componentPinNet(id, "a")),
          sig(nv, nl.componentPinNet(id, "b")),
          sig(nv, nl.componentPinNet(id, "en_bar")),
        );
        for (const [pin, val] of Object.entries(out)) {
          const net = nl.componentPinNet(id, pin);
          if (net && !signalsEqual(nv.get(net), val)) {
            nv.set(net, val);
            changed = true;
          }
        }
      } else if (type === "decoder-3to8" || type === "demux-1to8") {
        const out = op74HC138_DEMUX(
          sig(nv, nl.componentPinNet(id, "a0")),
          sig(nv, nl.componentPinNet(id, "a1")),
          sig(nv, nl.componentPinNet(id, "a2")),
          sig(nv, nl.componentPinNet(id, "e1")),
          sig(nv, nl.componentPinNet(id, "e2")),
          sig(nv, nl.componentPinNet(id, "e3")),
        );
        for (const [pin, val] of Object.entries(out)) {
          const net = nl.componentPinNet(id, pin);
          if (net && !signalsEqual(nv.get(net), val)) {
            nv.set(net, val);
            changed = true;
          }
        }
      }
    }

    for (const inst of components) {
      if (inst.type !== "ram" && inst.type !== "rom") continue;
      const cs = pinBit(nv, nl, inst.id, "cs");
      const oe = pinBit(nv, nl, inst.id, "oe");
      if (cs !== 0 || oe !== 0) continue;
      const addr = nibble(nv, nl, inst.id, "a");
      if (addr === null) continue;
      const word = (inst.words?.[addr] ?? 0) & 0xff;
      for (let i = 0; i < 8; i++) {
        if (driveBit(nv, nl, inst.id, `d${i}`, (word >> i) & 1)) changed = true;
      }
    }

    if (!changed) break;
  }
  };
  runComb();

  // ── 5. Sequential evaluation (one pass, uses current net values) ────
  for (const inst of components) {
    if (!SEQUENTIAL_TYPES.has(inst.type)) continue;
    if (!("mountedAt" in inst)) continue;

    const state = getOrCreateSeqState(
      circuitId,
      inst.id,
      inst.type,
      inst as any,
    );
    if (!state) continue;

    // Gather inputs from netlist
    const seqInputs: Record<string, Signal> = {};
    for (const pinName of [
      "in",
      "d",
      "clk",
      "clk_a",
      "clk_b",
      "set",
      "clr",
      "en",
      "j",
      "k",
      "r",
      "s",
      "r01",
      "r02",
      "clr_bar",
      "ld_bar",
      "enp",
      "ent",
      "mr_bar",
      "arst",
    ]) {
      const net = nl.componentPinNet(inst.id, pinName);
      if (net) seqInputs[pinName] = sig(nv, net);
    }

    const outputs = state.evaluate(seqInputs);

    // Write outputs to nets
    for (const [pinName, outSig] of Object.entries(outputs)) {
      const net = nl.componentPinNet(inst.id, pinName);
      if (net) nv.set(net, outSig);
    }
    // 74HC161 publishes one 4-bit bus named `q`. The DIP pins are q0–q3.
    if (inst.type === "counter-4bit-sync" && outputs.q && outputs.q.length >= 4) {
      for (let i = 0; i < 4; i++) {
        const net = nl.componentPinNet(inst.id, `q${i}`);
        if (net) nv.set(net, [outputs.q[i]]);
      }
    }
  }

  for (const inst of components) {
    if (inst.type === "cpu") {
      const state = machineOf(circuitId, inst.id);
      const clk = pinBit(nv, nl, inst.id, "clk");
      // Clock low always shows address 0, so the fetch step can be repeated.
      // A rising edge then advances one word. A second call at clk=1 does not.
      if (clk === 0) {
        state.pc = 0;
        state.clk = 0;
      } else if (clk === 1) {
        if (state.clk === 0) state.pc = (state.pc + 1) & 0xf;
        state.clk = 1;
      }
      for (let i = 0; i < 4; i++) {
        driveBit(nv, nl, inst.id, `a${i}`, (state.pc >> i) & 1);
      }
    } else if (inst.type === "io-port") {
      const state = machineOf(circuitId, inst.id);
      const stb = pinBit(nv, nl, inst.id, "stb");
      if (state.stb === 0 && stb === 1) {
        const data = nibble(nv, nl, inst.id, "d");
        state.latch = data ?? 0;
        state.flag = 1;
      }
      if (stb === 0 || stb === 1) state.stb = stb;
      for (let i = 0; i < 4; i++) {
        driveBit(nv, nl, inst.id, `q${i}`, (state.latch >> i) & 1);
      }
      driveBit(nv, nl, inst.id, "flag", state.flag);
    }
  }

  // Gates that read a flip-flop or counter (opcode decode, Q LEDs through a NOT)
  // need a second combinational pass after the sequential write.
  runComb();

  // ── 6. LED evaluation via explicit wire tracing ─────────────────────
  // Traces backwards through explicit wire connections — independent of
  // physical layout / hole topology. Works even when components share columns.
  //
  // For anode: follow wire chain backwards until we reach a gate output net.
  // For cathode: check if a wire from cathode goes to a GND rail.

  function traceSource(ep: Record<string, unknown>, depth = 0): Signal {
    if (depth > 6) return ["x"];
    // Gate output: read from netValues
    if ("ic" in ep) {
      const net = nl.componentPinNet(ep.ic as string, ep.pin as string);
      return net ? (nv.get(net) ?? ["x"]) : ["x"];
    }
    // Resistor/capacitor p2: trace backwards through the passive to p1's driver
    if ("component" in ep && ep.end === "p2") {
      for (const w of components) {
        if (w.type !== "wire") continue;
        const t = w.to as Record<string, unknown>;
        if (
          "component" in t &&
          t.component === ep.component &&
          t.end === "p1"
        ) {
          return traceSource(w.from as Record<string, unknown>, depth + 1);
        }
      }
      return ["x"];
    }
    // Resistor p1: read the driving net
    if ("component" in ep && ep.end === "p1") {
      const net = nl.componentPinNet(ep.component as string, "p1");
      return net ? (nv.get(net) ?? ["x"]) : ["x"];
    }
    // Power rail
    if ("rail" in ep) {
      const r = ep.rail as string;
      return r === "vcc_top" || r === "vcc_bot" ? HIGH : LOW;
    }
    // Tie-point hole
    if ("col" in ep && "row" in ep) {
      const net = nl.netOf(
        ep.col as number,
        ep.row as "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j",
      );
      return nv.get(net) ?? ["x"];
    }
    return ["x"];
  }

  function cathodeIsGnd(ep: Record<string, unknown>): boolean {
    if ("rail" in ep) {
      const r = ep.rail as string;
      return r === "gnd_top" || r === "gnd_bot";
    }
    if ("col" in ep && "row" in ep) {
      const net = nl.netOf(
        ep.col as number,
        ep.row as "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j",
      );
      const s = nv.get(net);
      return s !== undefined && s[0] === 0;
    }
    return false;
  }

  const ledOn = new Map<string, boolean>();
  for (const inst of components) {
    if (inst.type !== "led") continue;
    let anodeSig: Signal = ["x"];
    let cathodeGnd = false;

    for (const w of components) {
      if (w.type !== "wire") continue;
      const wTo = w.to as Record<string, unknown>;
      const wFrom = w.from as Record<string, unknown>;
      if ("led" in wTo && wTo.led === inst.id && wTo.end === "anode")
        anodeSig = traceSource(wFrom);
      if ("led" in wFrom && wFrom.led === inst.id && wFrom.end === "cathode")
        cathodeGnd = cathodeGnd || cathodeIsGnd(wTo);
    }

    ledOn.set(inst.id, anodeSig[0] === 1 && cathodeGnd);
  }

  return { netValues: nv, ledOn };
}

// ── Helper ─────────────────────────────────────────────────────────────────
function signalsEqual(a: Signal | undefined, b: Signal): boolean {
  if (!a) return false;
  if (a.length !== b.length) return false;
  return a.every((bit, i) => bit === b[i]);
}

/** Reset all sequential state for a given circuit (call when circuit changes) */
export function resetSequentialState(circuitId: string) {
  sequentialRegistry.delete(circuitId);
  for (const key of machineState.keys()) {
    if (key.startsWith(`${circuitId}:`)) machineState.delete(key);
  }
}

function pinBit(
  nv: NetValues,
  nl: Netlist,
  id: string,
  pin: string,
): 0 | 1 | "x" {
  const bit = sig(nv, nl.componentPinNet(id, pin))[0];
  return bit === 0 || bit === 1 ? bit : "x";
}

function nibble(
  nv: NetValues,
  nl: Netlist,
  id: string,
  prefix: string,
): number | null {
  let value = 0;
  for (let i = 0; i < 4; i++) {
    const bit = pinBit(nv, nl, id, `${prefix}${i}`);
    if (bit === "x") return null;
    value |= bit << i;
  }
  return value;
}

function driveBit(
  nv: NetValues,
  nl: Netlist,
  id: string,
  pin: string,
  bit: number,
): boolean {
  const net = nl.componentPinNet(id, pin);
  const next: Signal = [bit ? 1 : 0];
  if (!net || signalsEqual(nv.get(net), next)) return false;
  nv.set(net, next);
  return true;
}
