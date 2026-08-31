// ── Bus Operations ─────────────────────────────────────────────────────────
//
// Matches DigitalJS bus.mjs: ZeroExtend, SignExtend, BusSlice, BusGroup, BusUngroup.
// These are purely combinational, zero-propagation-delay operations.
// They manipulate Signal widths without logic changes.

import {
  type Signal,
  zeroExtend, signExtend, concat, slice, sigX,
} from './3vl';

// ── Zero-Extend ───────────────────────────────────────────────────────────
// Pads the high bits with 0 to widen a signal.
// DigitalJS: ZeroExtend { extend: { input: n, output: m } }

export function opZeroExtend(s: Signal, outputBits: number): Signal {
  return zeroExtend(s, outputBits);
}

// ── Sign-Extend ───────────────────────────────────────────────────────────
// Pads the high bits with the MSB (sign bit) to widen a signed signal.
// DigitalJS: SignExtend { extend: { input: n, output: m } }

export function opSignExtend(s: Signal, outputBits: number): Signal {
  return signExtend(s, outputBits);
}

// ── Bus Slice ─────────────────────────────────────────────────────────────
// Extract a contiguous bit range from a wider signal.
// DigitalJS: BusSlice { slice: { first: f, count: c, total: t } }
// out = in[first .. first+count-1]

export function opBusSlice(s: Signal, first: number, count: number): Signal {
  if (first >= s.length) return sigX(count);
  return slice(s, first, first + count);
}

// ── Bus Group (concat N narrow signals → 1 wide signal) ───────────────────
// DigitalJS: BusGroup { groups: [n1, n2, ...] }
// Takes inputs in0, in1, in2, ... (each with width groups[i])
// Concatenates LSB to MSB: out = [...in0, ...in1, ...in2, ...]

export function opBusGroup(inputs: Signal[]): Signal {
  return inputs.reduce((acc, s) => concat(acc, s), [] as Signal);
}

// ── Bus Ungroup (split 1 wide signal → N narrow signals) ──────────────────
// DigitalJS: BusUngroup { groups: [n1, n2, ...] }
// out0 = in[0..n1-1], out1 = in[n1..n1+n2-1], ...

export function opBusUngroup(s: Signal, groups: number[]): Signal[] {
  const outputs: Signal[] = [];
  let pos = 0;
  for (const count of groups) {
    outputs.push(slice(s, pos, pos + count));
    pos += count;
  }
  return outputs;
}

export const BUS_TYPES = new Set([
  'zero-extend', 'sign-extend', 'bus-slice', 'bus-group', 'bus-ungroup',
]);
