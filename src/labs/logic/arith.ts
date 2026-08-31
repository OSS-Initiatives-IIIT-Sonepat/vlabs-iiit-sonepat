// ── Arithmetic Operations ──────────────────────────────────────────────────
//
// Matches DigitalJS arith.mjs exactly.
// All arithmetic is done in BigInt to handle arbitrary bit widths correctly.
// If any input bit is 'x' (undefined), the output is all-x (DigitalJS behaviour).

import {
  type Signal,
  toBigInt, fromBigInt, fromBool, isFullyDefined, sigX,
} from './3vl';

// ── BigInt arithmetic helpers ─────────────────────────────────────────────

/** Truncate BigInt to `bits` bits (wrapping, unsigned) */
function trunc(n: bigint, bits: number): bigint {
  const mask = (1n << BigInt(bits)) - 1n;
  return ((n % (1n << BigInt(bits))) + (1n << BigInt(bits))) & mask;
}

// ── Unary operations ──────────────────────────────────────────────────────

/** Arithmetic negation: out = -in (2's complement) */
export function opNegation(input: Signal, outBits: number, signed = false): Signal {
  if (!isFullyDefined(input)) return sigX(outBits);
  const n = toBigInt(input, signed)!;
  return fromBigInt(-n, outBits);
}

/** Unary plus: out = +in (identity, just resize) */
export function opUnaryPlus(input: Signal, outBits: number, signed = false): Signal {
  if (!isFullyDefined(input)) return sigX(outBits);
  const n = toBigInt(input, signed)!;
  return fromBigInt(n, outBits);
}

// ── Binary arithmetic ─────────────────────────────────────────────────────

function binArith(
  a: Signal, b: Signal,
  outBits: number,
  signed: boolean,
  op: (x: bigint, y: bigint) => bigint,
): Signal {
  if (!isFullyDefined(a) || !isFullyDefined(b)) return sigX(outBits);
  const na = toBigInt(a, signed)!;
  const nb = toBigInt(b, signed)!;
  return fromBigInt(op(na, nb), outBits);
}

export function opAdd(a: Signal, b: Signal, outBits: number, signed = false): Signal {
  return binArith(a, b, outBits, signed, (x, y) => x + y);
}

export function opSub(a: Signal, b: Signal, outBits: number, signed = false): Signal {
  return binArith(a, b, outBits, signed, (x, y) => x - y);
}

export function opMul(a: Signal, b: Signal, outBits: number, signed = false): Signal {
  return binArith(a, b, outBits, signed, (x, y) => x * y);
}

export function opDiv(a: Signal, b: Signal, outBits: number, signed = false): Signal {
  return binArith(a, b, outBits, signed, (x, y) => y === 0n ? x : x / y);
}

export function opMod(a: Signal, b: Signal, outBits: number, signed = false): Signal {
  return binArith(a, b, outBits, signed, (x, y) => y === 0n ? x : x % y);
}

export function opPow(a: Signal, b: Signal, outBits: number, signed = false): Signal {
  return binArith(a, b, outBits, signed, (x, y) => {
    if (y >= 0n) return x ** y;
    if (x === 1n) return 1n;
    if (x === -1n) return (y % 2n ? -1n : 1n);
    return 0n;
  });
}

// ── Shift operations ──────────────────────────────────────────────────────
// Matches DigitalJS shiftHelp() exactly.

function shiftHelp(
  input: Signal,
  amount: number,      // positive = right-shift, negative = left-shift
  inBits: number,
  outBits: number,
  signedIn: boolean,
  signedOut: boolean,
  fillX: boolean,
): Signal {
  const signBit = input[input.length - 1] ?? 'x';
  const fillBit = fillX ? 0 : signedIn ? signBit : 0;
  // Extend input to outBits if needed
  const extended = [...input];
  while (extended.length < outBits) extended.push(fillBit as typeof fillBit);

  if (amount < 0) {
    // Left shift: prepend zeros/fill
    const prepend = Array(-amount).fill(fillX ? 0 : 0);
    const concat = [...prepend, ...extended] as Signal;
    return concat.slice(0, outBits) as Signal;
  } else {
    // Right shift: drop `amount` LSBs, fill MSBs
    const dropped = extended.slice(amount);
    const msbFill = fillX ? ('x' as const) : signedOut ? (extended[extended.length - 1] as 0|1|'x') : (0 as const);
    while (dropped.length < outBits) dropped.push(msbFill);
    return dropped.slice(0, outBits) as Signal;
  }
}

export function opShiftLeft(
  data: Signal, amount: Signal,
  bits: { in: number; amount: number; out: number },
  signed = false, fillX = false,
): Signal {
  if (!isFullyDefined(amount)) return sigX(bits.out);
  const am = Number(toBigInt(amount, false)!);
  return shiftHelp(data, -am, bits.in, bits.out, signed, signed, fillX);
}

export function opShiftRight(
  data: Signal, amount: Signal,
  bits: { in: number; amount: number; out: number },
  signedIn = false, signedOut = false, fillX = false,
): Signal {
  if (!isFullyDefined(amount)) return sigX(bits.out);
  const am = Number(toBigInt(amount, false)!);
  return shiftHelp(data, am, bits.in, bits.out, signedIn, signedOut, fillX);
}

// ── Comparison operations ─────────────────────────────────────────────────
// All return a 1-bit Signal.

function binCompare(
  a: Signal, b: Signal,
  signed: boolean,
  op: (x: bigint, y: bigint) => boolean,
): Signal {
  if (!isFullyDefined(a) || !isFullyDefined(b)) return ['x'];
  const na = toBigInt(a, signed)!;
  const nb = toBigInt(b, signed)!;
  return fromBool(op(na, nb));
}

export function opEq (a: Signal, b: Signal, signed = false): Signal {
  if (!isFullyDefined(a) || !isFullyDefined(b)) return ['x'];
  // Extend shorter operand with zeros for equality (matches DigitalJS EqCompare)
  const len = Math.max(a.length, b.length);
  const ae = [...a, ...Array(len - a.length).fill(0)];
  const be = [...b, ...Array(len - b.length).fill(0)];
  return fromBool(ae.every((bit, i) => bit === be[i]));
}
export function opNe (a: Signal, b: Signal, signed = false): Signal {
  const r = opEq(a, b, signed);
  return r[0] === 'x' ? ['x'] : [r[0] === 1 ? 0 : 1];
}
export function opLt (a: Signal, b: Signal, signed = false): Signal { return binCompare(a, b, signed, (x, y) => x < y);  }
export function opLe (a: Signal, b: Signal, signed = false): Signal { return binCompare(a, b, signed, (x, y) => x <= y); }
export function opGt (a: Signal, b: Signal, signed = false): Signal { return binCompare(a, b, signed, (x, y) => x > y);  }
export function opGe (a: Signal, b: Signal, signed = false): Signal { return binCompare(a, b, signed, (x, y) => x >= y); }

// ── 4-bit binary adder (74HC283) ─────────────────────────────────────────
// Pins: A1–A4 (4-bit addend), B1–B4 (4-bit addend), C0 (carry-in)
// Outputs: S1–S4 (sum bits), C4 (carry-out)

export function op4BitAdder(
  a: Signal,    // 4-bit
  b: Signal,    // 4-bit
  cin: Signal,  // 1-bit carry-in
): { sum: Signal; cout: Signal } {
  if (!isFullyDefined(a) || !isFullyDefined(b) || !isFullyDefined(cin)) {
    return { sum: sigX(4), cout: sigX(1) };
  }
  const na   = Number(toBigInt(a, false)!);
  const nb   = Number(toBigInt(b, false)!);
  const nc   = Number(toBigInt(cin, false)!);
  const res  = na + nb + nc;
  const sum  = fromBigInt(BigInt(res & 0xF), 4);
  const cout = fromBigInt(BigInt((res >> 4) & 1), 1);
  return { sum, cout };
}

// ── Dispatcher ────────────────────────────────────────────────────────────

export const ARITH_TYPES = new Set([
  'adder', 'subtractor', 'multiplier', 'negator',
  'compare-eq', 'compare-ne', 'compare-lt', 'compare-le', 'compare-gt', 'compare-ge',
  'shift-left', 'shift-right', 'adder-4bit',
]);
