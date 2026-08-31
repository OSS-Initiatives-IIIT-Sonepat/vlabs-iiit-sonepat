// ── Multiplexer / Demultiplexer Operations ─────────────────────────────────
//
// Matches DigitalJS mux.mjs (GenMux, Mux, Mux1Hot).
// Also covers physical ICs: 74HC153 (4:1 MUX), 74HC157 (2:1 MUX),
// 74HC139 (1:4 DEMUX), 74HC138 (1:8 DEMUX).

import {
  type Signal,
  toBigInt, fromBigInt, isFullyDefined, sigX, HIGH, LOW,
} from './3vl';

// ── Generic binary-select MUX ─────────────────────────────────────────────
// sel is `selBits` wide → selects from 2^selBits inputs.
// inputs is an array of `2^selBits` data signals, each `dataBits` wide.
// Returns the selected input, or all-x if sel is undefined.

export function opMux(
  sel:    Signal,
  inputs: Signal[],   // ordered: inputs[0] selected when sel=0, inputs[1] when sel=1, etc.
  dataBits: number,
): Signal {
  if (!isFullyDefined(sel)) return sigX(dataBits);
  const idx = Number(toBigInt(sel, false)!);
  return inputs[idx] ?? sigX(dataBits);
}

// ── One-hot MUX ───────────────────────────────────────────────────────────
// sel is N bits wide, exactly one bit should be HIGH.
// inputs has N+1 entries: inputs[0] = default (sel all-zero), inputs[1..N] = for each hot bit.

export function opMux1Hot(
  sel:    Signal,
  inputs: Signal[],
  dataBits: number,
): Signal {
  if (!isFullyDefined(sel)) return sigX(dataBits);
  const hotIdx = sel.indexOf(1);
  const oneHot = sel.filter(b => b === 1).length;
  if (oneHot > 1) return sigX(dataBits);   // more than one bit high = invalid
  if (hotIdx === -1) return inputs[0] ?? sigX(dataBits);  // all-zero = default
  return inputs[hotIdx + 1] ?? sigX(dataBits);
}

// ── 74HC153: Dual 4:1 Multiplexer ─────────────────────────────────────────
// Two independent 4:1 MUXes sharing the same 2-bit select.
// Each MUX has 4 data inputs and one output.
// Enable (active low) per MUX — when EN=1 (HIGH), output = 0.
//
// Inputs per MUX: I0, I1, I2, I3 (data), EN (enable, active-low)
// Select: S0, S1 (shared, 2-bit)
// Output per MUX: Y

export function op74HC153_MUX(
  sel:  Signal,    // 2-bit [S0, S1], S0=LSB
  en:   Signal,    // 1-bit, active-low enable
  i0: Signal, i1: Signal, i2: Signal, i3: Signal,  // 1-bit data inputs
): Signal {
  // If enable is HIGH (active-low means disabled), output = 0
  if (en[0] === 1) return LOW;
  if (en[0] === 'x') return ['x'];
  return opMux(sel, [i0, i1, i2, i3], 1);
}

// ── 74HC157: Quad 2:1 Multiplexer ─────────────────────────────────────────
// One 1-bit select S, one active-low enable OE.
// When S=0: Y = A. When S=1: Y = B.
// When OE=1 (disabled): Y = 0.
// Four identical channels.

export function op74HC157_MUX(
  sel:  Signal,  // 1-bit
  oe:   Signal,  // 1-bit active-low output enable
  a:    Signal,  // 1-bit data A
  b:    Signal,  // 1-bit data B
): Signal {
  if (oe[0] === 1) return LOW;
  if (oe[0] === 'x') return ['x'];
  return opMux(sel, [a, b], 1);
}

// ── 74HC139: Dual 2:4 Demultiplexer / Decoder ─────────────────────────────
// Two independent 2:4 decoders sharing nothing.
// Inputs: A, B (2-bit address), EN (active-low enable)
// Outputs: Y0, Y1, Y2, Y3 (active-low)
//   When EN=1: all outputs HIGH (disabled)
//   When EN=0: exactly one output LOW, rest HIGH

export type Demux1to4Outputs = { y0: Signal; y1: Signal; y2: Signal; y3: Signal };

export function op74HC139_DEMUX(
  a:  Signal,  // 1-bit LSB address
  b:  Signal,  // 1-bit MSB address
  en: Signal,  // 1-bit active-low enable
): Demux1to4Outputs {
  const disabled: Demux1to4Outputs = { y0: HIGH, y1: HIGH, y2: HIGH, y3: HIGH };
  if (!isFullyDefined(a) || !isFullyDefined(b)) {
    return { y0: ['x'], y1: ['x'], y2: ['x'], y3: ['x'] };
  }
  if (en[0] === 1) return disabled;  // disabled
  if (en[0] === 'x') return { y0: ['x'], y1: ['x'], y2: ['x'], y3: ['x'] };

  const addr = (b[0] as number) * 2 + (a[0] as number);
  return {
    y0: addr === 0 ? LOW : HIGH,
    y1: addr === 1 ? LOW : HIGH,
    y2: addr === 2 ? LOW : HIGH,
    y3: addr === 3 ? LOW : HIGH,
  };
}

// ── 74HC138: 3:8 Decoder / Demultiplexer ─────────────────────────────────
// Inputs: A0, A1, A2 (3-bit address)
// Enable: E1 (active-high), E2 (active-low), E3 (active-low) — all must be active
// Outputs: Y0–Y7 (active-low), exactly one LOW when enabled

export type Demux1to8Outputs = {
  y0: Signal; y1: Signal; y2: Signal; y3: Signal;
  y4: Signal; y5: Signal; y6: Signal; y7: Signal;
};

export function op74HC138_DEMUX(
  a0: Signal, a1: Signal, a2: Signal,  // 3-bit address
  e1: Signal,  // active-high enable
  e2: Signal,  // active-low enable
  e3: Signal,  // active-low enable
): Demux1to8Outputs {
  const all_high: Demux1to8Outputs = {
    y0: HIGH, y1: HIGH, y2: HIGH, y3: HIGH,
    y4: HIGH, y5: HIGH, y6: HIGH, y7: HIGH,
  };
  const all_x: Demux1to8Outputs = {
    y0: ['x'], y1: ['x'], y2: ['x'], y3: ['x'],
    y4: ['x'], y5: ['x'], y6: ['x'], y7: ['x'],
  };

  // Enable logic: active when E1=1 AND E2=0 AND E3=0
  if (!isFullyDefined(e1) || !isFullyDefined(e2) || !isFullyDefined(e3)) return all_x;
  if (e1[0] !== 1 || e2[0] !== 0 || e3[0] !== 0) return all_high;
  if (!isFullyDefined(a0) || !isFullyDefined(a1) || !isFullyDefined(a2)) return all_x;

  const addr = (a2[0] as number) * 4 + (a1[0] as number) * 2 + (a0[0] as number);
  const out = { ...all_high };
  const key = `y${addr}` as keyof Demux1to8Outputs;
  out[key] = LOW;
  return out;
}

// ── 74HC148: Priority Encoder 8:3 ─────────────────────────────────────────
// Inputs: I0–I7 (active-low), EI (enable input, active-low)
// Outputs: A0, A1, A2 (3-bit code, active-low), EO (enable output), GS (group signal)
// Highest-priority input = I7.

export type Encoder8to3Outputs = {
  a0: Signal; a1: Signal; a2: Signal;  // 3-bit code (active-low)
  eo: Signal;  // enable output (active-low — valid when EI=0 and no input active)
  gs: Signal;  // group signal (active-low — valid when EI=0 and at least one input active)
};

export function op74HC148_ENC(
  ei: Signal,
  i0: Signal, i1: Signal, i2: Signal, i3: Signal,
  i4: Signal, i5: Signal, i6: Signal, i7: Signal,
): Encoder8to3Outputs {
  const disabled: Encoder8to3Outputs = {
    a0: HIGH, a1: HIGH, a2: HIGH, eo: HIGH, gs: HIGH,
  };
  const x_out: Encoder8to3Outputs = {
    a0: ['x'], a1: ['x'], a2: ['x'], eo: ['x'], gs: ['x'],
  };

  if (!isFullyDefined(ei)) return x_out;
  if (ei[0] === 1) return disabled;  // disabled

  const inputs = [i0, i1, i2, i3, i4, i5, i6, i7];
  // Find highest-priority active input (active-low: 0 = active)
  let priority = -1;
  for (let n = 7; n >= 0; n--) {
    if (inputs[n][0] === 0) { priority = n; break; }
  }

  if (priority === -1) {
    // No active input: EO goes LOW (cascading enable), GS stays HIGH
    return { a0: HIGH, a1: HIGH, a2: HIGH, eo: LOW, gs: HIGH };
  }

  // Active-low output encoding:
  // Output pin is LOW (0) when the corresponding bit of the priority code is 1.
  // Output pin is HIGH (1) when the bit is 0.
  // e.g. priority=7 (=111): A2=LOW, A1=LOW, A0=LOW
  //      priority=0 (=000): A2=HIGH, A1=HIGH, A0=HIGH
  //      priority=5 (=101): A2=LOW, A1=HIGH, A0=LOW
  return {
    a0: (priority & 1) ? LOW : HIGH,
    a1: (priority & 2) ? LOW : HIGH,
    a2: (priority & 4) ? LOW : HIGH,
    eo: HIGH,
    gs: LOW,
  };
}

export const MUX_TYPES = new Set([
  'mux', 'mux-4to1', 'mux-2to1-ic',
  'demux-1to4', 'demux-1to8',
  'encoder-8to3',
]);
