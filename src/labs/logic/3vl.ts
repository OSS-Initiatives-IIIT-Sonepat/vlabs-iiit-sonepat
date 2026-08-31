// ── Three-Valued Logic ────────────────────────────────────────────────────
//
// Mirrors DigitalJS's Vector3vl but as a pure TypeScript value type.
// Each bit is one of:
//   1  = HIGH (driven by VCC or gate output HIGH)
//   0  = LOW  (driven by GND or gate output LOW)
//   x  = unknown / floating / undefined
//
// A Signal is an array of bits, index 0 = LSB (matches 3vl convention).
// Single-bit signals are Signal of length 1.
//
// All operations return a new Signal — no mutation.

export type Bit    = 1 | 0 | 'x';
export type Signal = Bit[];                 // [LSB, ..., MSB]

// ── Constructors ──────────────────────────────────────────────────────────

export function sigHigh(bits = 1): Signal {
  return Array(bits).fill(1);
}

export function sigLow(bits = 1): Signal {
  return Array(bits).fill(0);
}

export function sigX(bits = 1): Signal {
  return Array(bits).fill('x');
}

/** Single-bit convenience */
export const HIGH: Signal = [1];
export const LOW:  Signal = [0];
export const X:    Signal = ['x'];

/** From a JS boolean */
export function fromBool(b: boolean): Signal {
  return [b ? 1 : 0];
}

/** From a binary string e.g. "1010" (MSB first → reversed to LSB-first) */
export function fromBin(s: string): Signal {
  return s.split('').reverse().map(c => c === '1' ? 1 : c === '0' ? 0 : 'x') as Signal;
}

/** From a BigInt, truncated to `bits` bits (2's complement for signed) */
export function fromBigInt(n: bigint, bits: number): Signal {
  const out: Bit[] = [];
  const mask = 1n;
  for (let i = 0; i < bits; i++) {
    out.push(Number((n >> BigInt(i)) & mask) as 0 | 1);
  }
  return out;
}

/** From a JS number, truncated to `bits` bits */
export function fromNumber(n: number, bits: number): Signal {
  return fromBigInt(BigInt(Math.trunc(n)), bits);
}

// ── Accessors ─────────────────────────────────────────────────────────────

export function getBit(s: Signal, i: number): Bit {
  return i >= 0 && i < s.length ? s[i] : 'x';
}

export function msb(s: Signal): Bit {
  return s[s.length - 1] ?? 'x';
}

export function isFullyDefined(s: Signal): boolean {
  return s.every(b => b !== 'x');
}

export function isHigh(s: Signal): boolean {
  return s.length === 1 && s[0] === 1;
}

export function isLow(s: Signal): boolean {
  return s.length === 1 && s[0] === 0;
}

export function isX(s: Signal): boolean {
  return s.every(b => b === 'x');
}

/** Convert to BigInt (unsigned). Returns null if any bit is 'x'. */
export function toBigInt(s: Signal, signed = false): bigint | null {
  if (!isFullyDefined(s)) return null;
  let n = 0n;
  for (let i = s.length - 1; i >= 0; i--) {
    n = (n << 1n) | BigInt(s[i] as 0 | 1);
  }
  // two's complement for signed
  if (signed && s[s.length - 1] === 1) {
    n = n - (1n << BigInt(s.length));
  }
  return n;
}

/** Convert to JS number (unsigned, max 32 bits reliably). Null if undefined. */
export function toNumber(s: Signal, signed = false): number | null {
  const n = toBigInt(s, signed);
  return n === null ? null : Number(n);
}

/** Convert to binary string "1010" (MSB first) */
export function toBin(s: Signal): string {
  return [...s].reverse().map(b => b === 'x' ? 'x' : String(b)).join('');
}

// ── Equality ──────────────────────────────────────────────────────────────

export function eq(a: Signal, b: Signal): boolean {
  if (a.length !== b.length) return false;
  return a.every((bit, i) => bit === b[i]);
}

// ── Bitwise operations ─────────────────────────────────────────────────────
// These match DigitalJS's 3vl semantics exactly:
//   0 AND x = 0   (short-circuit: 0 always wins for AND)
//   1 OR  x = 1   (short-circuit: 1 always wins for OR)
//   x XOR x = x   (unknown XOR unknown = unknown)
//   NOT x   = x   (unknown stays unknown)

function bitAnd(a: Bit, b: Bit): Bit {
  if (a === 0 || b === 0) return 0;           // 0 AND anything = 0
  if (a === 'x' || b === 'x') return 'x';
  return 1;
}

function bitOr(a: Bit, b: Bit): Bit {
  if (a === 1 || b === 1) return 1;           // 1 OR anything = 1
  if (a === 'x' || b === 'x') return 'x';
  return 0;
}

function bitXor(a: Bit, b: Bit): Bit {
  if (a === 'x' || b === 'x') return 'x';
  return (a ^ b) as 0 | 1;
}

function bitNot(a: Bit): Bit {
  if (a === 'x') return 'x';
  return a === 1 ? 0 : 1;
}

function zipBits(a: Signal, b: Signal, op: (x: Bit, y: Bit) => Bit): Signal {
  const len = Math.max(a.length, b.length);
  const out: Bit[] = [];
  for (let i = 0; i < len; i++) {
    out.push(op(getBit(a, i), getBit(b, i)));
  }
  return out;
}

export function sigAnd(a: Signal, b: Signal): Signal  { return zipBits(a, b, bitAnd); }
export function sigOr (a: Signal, b: Signal): Signal  { return zipBits(a, b, bitOr);  }
export function sigXor(a: Signal, b: Signal): Signal  { return zipBits(a, b, bitXor); }
export function sigNot(a: Signal):            Signal  { return a.map(bitNot);          }
export function sigNand(a: Signal, b: Signal): Signal { return sigNot(sigAnd(a, b));  }
export function sigNor (a: Signal, b: Signal): Signal { return sigNot(sigOr(a, b));   }
export function sigXnor(a: Signal, b: Signal): Signal { return sigNot(sigXor(a, b));  }

// ── Reduce operations — N bits → 1 bit ────────────────────────────────────
// Match DigitalJS OrReduce / AndReduce etc.

export function reduceOr (s: Signal): Signal { return [s.reduce<Bit>((acc, b) => bitOr(acc, b),  0)]; }
export function reduceAnd(s: Signal): Signal { return [s.reduce<Bit>((acc, b) => bitAnd(acc, b), 1)]; }
export function reduceXor(s: Signal): Signal { return [s.reduce<Bit>((acc, b) => bitXor(acc, b), 0)]; }
export function reduceNor (s: Signal): Signal { return sigNot(reduceOr(s));  }
export function reduceNand(s: Signal): Signal { return sigNot(reduceAnd(s)); }
export function reduceXnor(s: Signal): Signal { return sigNot(reduceXor(s)); }

// ── Concatenation / slicing ────────────────────────────────────────────────
// concat(a, b): b's bits become the high bits  (matches 3vl: a.concat(ext))

export function concat(lo: Signal, hi: Signal): Signal {
  return [...lo, ...hi];
}

export function slice(s: Signal, first: number, last: number): Signal {
  return s.slice(first, last);
}

export function extend(s: Signal, toLen: number, fill: Bit): Signal {
  if (s.length >= toLen) return s.slice(0, toLen);
  return [...s, ...Array<Bit>(toLen - s.length).fill(fill)];
}

export function zeroExtend(s: Signal, toLen: number): Signal {
  return extend(s, toLen, 0);
}

export function signExtend(s: Signal, toLen: number): Signal {
  return extend(s, toLen, msb(s) === 'x' ? 'x' : msb(s) as 0 | 1);
}
