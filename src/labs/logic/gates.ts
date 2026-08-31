// ── Gate Operations ────────────────────────────────────────────────────────
//
// Matches every gate in DigitalJS gates.mjs.
// Each function takes Signal inputs and returns a Signal output.
// All use 3VL semantics from 3vl.ts.

import {
  type Signal,
  sigNot, sigAnd, sigOr, sigXor, sigNand, sigNor, sigXnor,
  reduceAnd, reduceOr, reduceNand, reduceNor, reduceXor, reduceXnor,
  isFullyDefined, sigX,
} from './3vl';

// ── Single-input gates ─────────────────────────────────────────────────────

/** Buffer / Repeater: out = in */
export function opBuffer(input: Signal): Signal {
  return input;
}

/** NOT gate: out = NOT in */
export function opNot(input: Signal): Signal {
  return sigNot(input);
}

// ── Two-input gates (also work N-input by folding) ─────────────────────────

/** AND gate: out = in1 AND in2 AND ... */
export function opAnd(...inputs: Signal[]): Signal {
  return inputs.reduce((acc, s) => sigAnd(acc, s));
}

/** OR gate: out = in1 OR in2 OR ... */
export function opOr(...inputs: Signal[]): Signal {
  return inputs.reduce((acc, s) => sigOr(acc, s));
}

/** NAND gate: out = NOT (in1 AND in2 AND ...) */
export function opNand(...inputs: Signal[]): Signal {
  return sigNot(opAnd(...inputs));
}

/** NOR gate: out = NOT (in1 OR in2 OR ...) */
export function opNor(...inputs: Signal[]): Signal {
  return sigNot(opOr(...inputs));
}

/** XOR gate: out = in1 XOR in2 XOR ... (parity) */
export function opXor(...inputs: Signal[]): Signal {
  return inputs.reduce((acc, s) => sigXor(acc, s));
}

/** XNOR gate: out = NOT (in1 XOR in2 XOR ...) */
export function opXnor(...inputs: Signal[]): Signal {
  return sigNot(opXor(...inputs));
}

// ── Reducing gates (N-bit input → 1-bit output) ───────────────────────────
// Matches DigitalJS OrReduce, AndReduce, etc.

export function opAndReduce (s: Signal): Signal { return reduceAnd(s);  }
export function opOrReduce  (s: Signal): Signal { return reduceOr(s);   }
export function opNandReduce(s: Signal): Signal { return reduceNand(s); }
export function opNorReduce (s: Signal): Signal { return reduceNor(s);  }
export function opXorReduce (s: Signal): Signal { return reduceXor(s);  }
export function opXnorReduce(s: Signal): Signal { return reduceXnor(s); }

// ── Gate dispatcher ────────────────────────────────────────────────────────
// Generic entry point used by the simulator.
// `type` matches ComponentInstance type strings.
// `inputs` is an ordered array of input Signals (gate1 inputs first).

export type GateInputs = {
  in1?: Signal;   // primary A input
  in2?: Signal;   // primary B input
  in?: Signal;    // single-input gates (NOT, Buffer, reduce)
  [key: string]: Signal | undefined;  // in3, in4, ...
};

export type GateOutputs = {
  out: Signal;
  [key: string]: Signal;
};

export function evaluateGate(
  type: string,
  inputs: GateInputs,
  bits = 1,
): GateOutputs | null {
  const a = inputs.in1 ?? inputs.in ?? sigX(bits);
  const b = inputs.in2 ?? sigX(bits);

  switch (type) {
    case 'buffer-gate': return { out: opBuffer(a) };
    case 'not-gate':    return { out: opNot(a) };
    case 'and-gate':    return { out: opAnd(a, b) };
    case 'or-gate':     return { out: opOr(a, b) };
    case 'nand-gate':   return { out: opNand(a, b) };
    case 'nor-gate':    return { out: opNor(a, b) };
    case 'xor-gate':    return { out: opXor(a, b) };
    case 'xnor-gate':   return { out: opXnor(a, b) };

    // Reducing gates take a single multi-bit input
    case 'and-reduce':  return { out: opAndReduce(a) };
    case 'or-reduce':   return { out: opOrReduce(a) };
    case 'nand-reduce': return { out: opNandReduce(a) };
    case 'nor-reduce':  return { out: opNorReduce(a) };
    case 'xor-reduce':  return { out: opXorReduce(a) };
    case 'xnor-reduce': return { out: opXnorReduce(a) };

    default: return null;
  }
}

// Export the set of all gate type strings for use in the simulator
export const GATE_TYPES = new Set([
  'buffer-gate', 'not-gate',
  'and-gate', 'or-gate', 'nand-gate', 'nor-gate', 'xor-gate', 'xnor-gate',
  'and-reduce', 'or-reduce', 'nand-reduce', 'nor-reduce', 'xor-reduce', 'xnor-reduce',
]);
