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

import { Netlist, type NetId, type Signal as NetSignal } from './netlist';
import { type Circuit, type ComponentInstance } from './types';
import {
  type Signal,
  HIGH, LOW, sigX, sigNot,
  evaluateGate, GATE_TYPES,
  opAdd, opSub, opMul, opNegation, opEq, opNe, opLt, opLe, opGt, opGe,
  opShiftLeft, opShiftRight, op4BitAdder, ARITH_TYPES,
  opMux, MUX_TYPES,
  opZeroExtend, opSignExtend, opBusSlice, opBusGroup, opBusUngroup, BUS_TYPES,
  createSequentialState, type SequentialState, SEQUENTIAL_TYPES,
  fromBin, isFullyDefined,
} from './logic/index';

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
  if (!netId) return ['x'];
  return nv.get(netId) ?? ['x'];
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
  for (const rail of ['vcc_top', 'vcc_bot'] as const) {
    nv.set(nl.netOfRail(rail), HIGH);
  }
  for (const rail of ['gnd_top', 'gnd_bot'] as const) {
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
    if (inst.type !== 'wire') continue;
    const from = inst.from as Record<string, unknown>;
    const to   = inst.to   as Record<string, unknown>;

    // Must be TiePin source (input wire, not internal wire)
    if (!('col' in from && 'row' in from)) continue;
    // Must be IcPin destination
    if (!('ic' in to && 'pin' in to)) continue;

    // Extract signal name from wire ID: "w_cin_xor2" → parts[1] = "cin"
    const parts    = inst.id.split('_');
    const namePart = parts[1] ?? '';
    if (!namePart) continue;

    const inputKey = Object.keys(activeInputs).find(k =>
      namePart.toLowerCase() === k.toLowerCase(),
    );
    if (inputKey === undefined) continue;

    // Write to the DESTINATION IC pin's net — avoids TiePin column conflicts
    const icId  = to.ic as string;
    const pin   = to.pin as string;
    const net   = nl.componentPinNet(icId, pin);
    if (net) nv.set(net, activeInputs[inputKey] === 1 ? HIGH : LOW);
  }

  // ── 3. Seed constants ────────────────────────────────────────────────
  for (const inst of components) {
    if (inst.type !== 'constant') continue;
    const net = nl.componentPinNet(inst.id, 'out');
    if (net) nv.set(net, fromBin(inst.value));
  }

  // ── 4. Combinational evaluation (iterative fixpoint) ────────────────
  const combGates = components.filter(c => GATE_TYPES.has(c.type) || ARITH_TYPES.has(c.type) || MUX_TYPES.has(c.type) || BUS_TYPES.has(c.type));

  for (let iter = 0; iter < 40; iter++) {
    let changed = false;

    for (const gate of combGates) {
      if (!('mountedAt' in gate)) continue;
      const id   = gate.id;
      const type = gate.type;

      // ── Standard gates (not/and/or/xor/nand/nor/xnor + reduce) ────
      if (GATE_TYPES.has(type)) {
        // Gate 1 only (alias pins A/1A, B/1B → Y/1Y)
        const nA = nl.componentPinNet(id, 'A') ?? nl.componentPinNet(id, '1A');
        const nB = nl.componentPinNet(id, 'B') ?? nl.componentPinNet(id, '1B');
        const nY = nl.componentPinNet(id, 'Y') ?? nl.componentPinNet(id, '1Y');

        if (nY) {
          const res = evaluateGate(type, { in1: sig(nv, nA), in2: sig(nv, nB), in: sig(nv, nA) }, 1);
          if (res && !signalsEqual(nv.get(nY), res.out)) {
            nv.set(nY, res.out); changed = true;
          }
        }
      }

      // ── Arithmetic ────────────────────────────────────────────────
      else if (type === 'adder' && 'bits' in gate) {
        const bits = (gate as any).bits as number;
        const signed = (gate as any).signed ?? false;
        const nA = nl.componentPinNet(id, 'in1');
        const nB = nl.componentPinNet(id, 'in2');
        const nY = nl.componentPinNet(id, 'out');
        if (nA && nB && nY) {
          const out = opAdd(sig(nv, nA), sig(nv, nB), bits, signed);
          if (!signalsEqual(nv.get(nY), out)) { nv.set(nY, out); changed = true; }
        }
      }

      else if (type === 'adder-4bit') {
        // 74HC283: A[1-4], B[1-4], C0 → S[1-4], C4
        const a    = [nl.componentPinNet(id,'a1'),nl.componentPinNet(id,'a2'),nl.componentPinNet(id,'a3'),nl.componentPinNet(id,'a4')].map(n => sig(nv,n)[0] ?? 'x' as any);
        const b    = [nl.componentPinNet(id,'b1'),nl.componentPinNet(id,'b2'),nl.componentPinNet(id,'b3'),nl.componentPinNet(id,'b4')].map(n => sig(nv,n)[0] ?? 'x' as any);
        const cin  = sig(nv, nl.componentPinNet(id, 'c0'));
        const { sum, cout } = op4BitAdder(a as Signal, b as Signal, cin);
        [nl.componentPinNet(id,'s1'),nl.componentPinNet(id,'s2'),nl.componentPinNet(id,'s3'),nl.componentPinNet(id,'s4')].forEach((net, i) => {
          if (net && !signalsEqual(nv.get(net), [sum[i]])) { nv.set(net, [sum[i]]); changed = true; }
        });
        const nC4 = nl.componentPinNet(id, 'c4');
        if (nC4 && !signalsEqual(nv.get(nC4), cout)) { nv.set(nC4, cout); changed = true; }
      }

      else if (type === 'mux' && 'bits' in gate) {
        const bits = (gate as any).bits as { in: number; sel: number };
        const nSel = nl.componentPinNet(id, 'sel');
        const selSig = sig(nv, nSel);
        const numInputs = 1 << bits.sel;
        const inputs: Signal[] = [];
        for (let i = 0; i < numInputs; i++) {
          inputs.push(sig(nv, nl.componentPinNet(id, `in${i}`)));
        }
        const nOut = nl.componentPinNet(id, 'out');
        if (nOut) {
          const out = opMux(selSig, inputs, bits.in);
          if (!signalsEqual(nv.get(nOut), out)) { nv.set(nOut, out); changed = true; }
        }
      }

      else if (type === 'zero-extend' && 'extend' in gate) {
        const ext = (gate as any).extend as { input: number; output: number };
        const nIn  = nl.componentPinNet(id, 'in');
        const nOut = nl.componentPinNet(id, 'out');
        if (nIn && nOut) {
          const out = opZeroExtend(sig(nv, nIn), ext.output);
          if (!signalsEqual(nv.get(nOut), out)) { nv.set(nOut, out); changed = true; }
        }
      }

      else if (type === 'sign-extend' && 'extend' in gate) {
        const ext = (gate as any).extend as { input: number; output: number };
        const nIn  = nl.componentPinNet(id, 'in');
        const nOut = nl.componentPinNet(id, 'out');
        if (nIn && nOut) {
          const out = opSignExtend(sig(nv, nIn), ext.output);
          if (!signalsEqual(nv.get(nOut), out)) { nv.set(nOut, out); changed = true; }
        }
      }

      else if (type === 'bus-slice' && 'slice' in gate) {
        const sl = (gate as any).slice as { first: number; count: number };
        const nIn  = nl.componentPinNet(id, 'in');
        const nOut = nl.componentPinNet(id, 'out');
        if (nIn && nOut) {
          const out = opBusSlice(sig(nv, nIn), sl.first, sl.count);
          if (!signalsEqual(nv.get(nOut), out)) { nv.set(nOut, out); changed = true; }
        }
      }
    }

    if (!changed) break;
  }

  // ── 5. Sequential evaluation (one pass, uses current net values) ────
  for (const inst of components) {
    if (!SEQUENTIAL_TYPES.has(inst.type)) continue;
    if (!('mountedAt' in inst)) continue;

    const state = getOrCreateSeqState(circuitId, inst.id, inst.type, inst as any);
    if (!state) continue;

    // Gather inputs from netlist
    const seqInputs: Record<string, Signal> = {};
    for (const pinName of ['in','d','clk','clk_a','clk_b','set','clr','en','j','k','r','s',
                           'r01','r02','clr_bar','ld_bar','enp','ent','mr_bar','arst']) {
      const net = nl.componentPinNet(inst.id, pinName);
      if (net) seqInputs[pinName] = sig(nv, net);
    }

    const outputs = state.evaluate(seqInputs);

    // Write outputs to nets
    for (const [pinName, outSig] of Object.entries(outputs)) {
      const net = nl.componentPinNet(inst.id, pinName);
      if (net) nv.set(net, outSig);
    }
  }

  // ── 6. LED evaluation via explicit wire tracing ─────────────────────
  // Traces backwards through explicit wire connections — independent of
  // physical layout / hole topology. Works even when components share columns.
  //
  // For anode: follow wire chain backwards until we reach a gate output net.
  // For cathode: check if a wire from cathode goes to a GND rail.

  function traceSource(ep: Record<string, unknown>, depth = 0): Signal {
    if (depth > 6) return ['x'];
    // Gate output: read from netValues
    if ('ic' in ep) {
      const net = nl.componentPinNet(ep.ic as string, ep.pin as string);
      return net ? (nv.get(net) ?? ['x']) : ['x'];
    }
    // Resistor/capacitor p2: trace backwards through the passive to p1's driver
    if ('component' in ep && ep.end === 'p2') {
      for (const w of components) {
        if (w.type !== 'wire') continue;
        const t = w.to as Record<string, unknown>;
        if ('component' in t && t.component === ep.component && t.end === 'p1') {
          return traceSource(w.from as Record<string, unknown>, depth + 1);
        }
      }
      return ['x'];
    }
    // Resistor p1: read the driving net
    if ('component' in ep && ep.end === 'p1') {
      const net = nl.componentPinNet(ep.component as string, 'p1');
      return net ? (nv.get(net) ?? ['x']) : ['x'];
    }
    // Power rail
    if ('rail' in ep) {
      const r = ep.rail as string;
      return (r === 'vcc_top' || r === 'vcc_bot') ? HIGH : LOW;
    }
    // Tie-point hole
    if ('col' in ep && 'row' in ep) {
      const net = nl.netOf(ep.col as number, ep.row as 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j');
      return nv.get(net) ?? ['x'];
    }
    return ['x'];
  }

  function cathodeIsGnd(ep: Record<string, unknown>): boolean {
    if ('rail' in ep) {
      const r = ep.rail as string;
      return r === 'gnd_top' || r === 'gnd_bot';
    }
    if ('col' in ep && 'row' in ep) {
      const net = nl.netOf(ep.col as number, ep.row as 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j');
      const s   = nv.get(net);
      return s !== undefined && s[0] === 0;
    }
    return false;
  }

  const ledOn = new Map<string, boolean>();
  for (const inst of components) {
    if (inst.type !== 'led') continue;
    let anodeSig: Signal  = ['x'];
    let cathodeGnd        = false;

    for (const w of components) {
      if (w.type !== 'wire') continue;
      const wTo   = w.to   as Record<string, unknown>;
      const wFrom = w.from as Record<string, unknown>;
      if ('led' in wTo   && wTo.led === inst.id   && wTo.end === 'anode')   anodeSig   = traceSource(wFrom);
      if ('led' in wFrom && wFrom.led === inst.id && wFrom.end === 'cathode') cathodeGnd = cathodeGnd || cathodeIsGnd(wTo);
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
}
