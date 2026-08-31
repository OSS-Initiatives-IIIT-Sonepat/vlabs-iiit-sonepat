import { describe, it, expect } from 'vitest';
import {
  type Signal,
  HIGH, LOW, X,
  sigHigh, sigLow, sigX,
  fromBin, fromBigInt, fromNumber, fromBool,
  toBigInt, toNumber, toBin,
  isFullyDefined, isHigh, isLow,
  getBit, msb,
  sigAnd, sigOr, sigXor, sigNot, sigNand, sigNor, sigXnor,
  reduceAnd, reduceOr, reduceXor, reduceNand, reduceNor, reduceXnor,
  concat, slice, zeroExtend, signExtend,
  eq,
} from '@/labs/logic/3vl';

// ── helpers ──────────────────────────────────────────────────────────────
const b = (...bits: (0|1|'x')[]): Signal => bits; // shorthand

describe('3VL — constructors', () => {
  it('HIGH is [1]',  () => expect(HIGH).toEqual([1]));
  it('LOW  is [0]',  () => expect(LOW).toEqual([0]));
  it('X    is [x]',  () => expect(X).toEqual(['x']));

  it('sigHigh(4)',   () => expect(sigHigh(4)).toEqual([1,1,1,1]));
  it('sigLow(3)',    () => expect(sigLow(3)).toEqual([0,0,0]));
  it('sigX(2)',      () => expect(sigX(2)).toEqual(['x','x']));
});

describe('3VL — fromBin / toBin', () => {
  it('fromBin("1010") → [0,1,0,1] (LSB first)', () => {
    expect(fromBin('1010')).toEqual([0,1,0,1]);
  });
  it('fromBin("1") → [1]', () => expect(fromBin('1')).toEqual([1]));
  it('fromBin("0") → [0]', () => expect(fromBin('0')).toEqual([0]));
  it('toBin([0,1,0,1]) → "1010"', () => {
    expect(toBin([0,1,0,1])).toBe('1010');
  });
  it('round-trips', () => {
    const s = fromBin('11001010');
    expect(toBin(s)).toBe('11001010');
  });
});

describe('3VL — fromBigInt / toBigInt', () => {
  it('fromBigInt(5n, 4) → [1,0,1,0]', () => {
    expect(fromBigInt(5n, 4)).toEqual([1,0,1,0]);
  });
  it('fromBigInt(0n, 4) → [0,0,0,0]', () => {
    expect(fromBigInt(0n, 4)).toEqual([0,0,0,0]);
  });
  it('fromBigInt(15n, 4) → [1,1,1,1]', () => {
    expect(fromBigInt(15n, 4)).toEqual([1,1,1,1]);
  });
  it('toBigInt([1,0,1,0]) → 5n', () => {
    expect(toBigInt([1,0,1,0])).toBe(5n);
  });
  it('toBigInt undefined if any x', () => {
    expect(toBigInt(['x',1,0,1])).toBeNull();
  });
  it('signed: toBigInt([1,1,1,1], signed=true) → -1n', () => {
    expect(toBigInt([1,1,1,1], true)).toBe(-1n);
  });
});

describe('3VL — fromNumber', () => {
  it('fromNumber(7, 4) → [1,1,1,0]', () => {
    expect(fromNumber(7, 4)).toEqual([1,1,1,0]);
  });
});

describe('3VL — predicates', () => {
  it('isFullyDefined [1,0,1]', () => expect(isFullyDefined([1,0,1])).toBe(true));
  it('!isFullyDefined [1,x,1]', () => expect(isFullyDefined([1,'x',1])).toBe(false));
  it('isHigh [1]',  () => expect(isHigh([1])).toBe(true));
  it('!isHigh [0]', () => expect(isHigh([0])).toBe(false));
  it('isLow [0]',   () => expect(isLow([0])).toBe(true));
  it('getBit index 0', () => expect(getBit([0,1,0], 0)).toBe(0));
  it('getBit index 2', () => expect(getBit([0,1,0], 2)).toBe(0));
  it('getBit out of range → x', () => expect(getBit([0,1], 5)).toBe('x'));
  it('msb', () => expect(msb([0,1,0,1])).toBe(1));
});

describe('3VL — bitwise AND (3-valued rules)', () => {
  it('0 AND 0 = 0', () => expect(sigAnd([0],[0])).toEqual([0]));
  it('0 AND 1 = 0', () => expect(sigAnd([0],[1])).toEqual([0]));
  it('1 AND 1 = 1', () => expect(sigAnd([1],[1])).toEqual([1]));
  it('0 AND x = 0  (short-circuit)', () => expect(sigAnd([0],['x'])).toEqual([0]));
  it('x AND 0 = 0  (short-circuit)', () => expect(sigAnd(['x'],[0])).toEqual([0]));
  it('1 AND x = x', () => expect(sigAnd([1],['x'])).toEqual(['x']));
  it('x AND x = x', () => expect(sigAnd(['x'],['x'])).toEqual(['x']));
  it('multi-bit [1,0] AND [1,1] = [1,0]', () => {
    expect(sigAnd([1,0],[1,1])).toEqual([1,0]);
  });
});

describe('3VL — bitwise OR (3-valued rules)', () => {
  it('1 OR 0 = 1', () => expect(sigOr([1],[0])).toEqual([1]));
  it('0 OR 0 = 0', () => expect(sigOr([0],[0])).toEqual([0]));
  it('1 OR x = 1  (short-circuit)', () => expect(sigOr([1],['x'])).toEqual([1]));
  it('x OR 1 = 1  (short-circuit)', () => expect(sigOr(['x'],[1])).toEqual([1]));
  it('0 OR x = x', () => expect(sigOr([0],['x'])).toEqual(['x']));
});

describe('3VL — bitwise XOR', () => {
  it('0 XOR 0 = 0', () => expect(sigXor([0],[0])).toEqual([0]));
  it('0 XOR 1 = 1', () => expect(sigXor([0],[1])).toEqual([1]));
  it('1 XOR 1 = 0', () => expect(sigXor([1],[1])).toEqual([0]));
  it('x XOR 0 = x', () => expect(sigXor(['x'],[0])).toEqual(['x']));
  it('x XOR 1 = x', () => expect(sigXor(['x'],[1])).toEqual(['x']));
});

describe('3VL — NOT', () => {
  it('NOT 0 = 1', () => expect(sigNot([0])).toEqual([1]));
  it('NOT 1 = 0', () => expect(sigNot([1])).toEqual([0]));
  it('NOT x = x', () => expect(sigNot(['x'])).toEqual(['x']));
  it('multi-bit NOT [1,0,x] = [0,1,x]', () => {
    expect(sigNot([1,0,'x'])).toEqual([0,1,'x']);
  });
});

describe('3VL — compound gates', () => {
  it('NAND(1,1) = 0', () => expect(sigNand([1],[1])).toEqual([0]));
  it('NAND(0,x) = 1', () => expect(sigNand([0],['x'])).toEqual([1]));
  it('NOR(0,0) = 1',  () => expect(sigNor([0],[0])).toEqual([1]));
  it('NOR(1,x) = 0',  () => expect(sigNor([1],['x'])).toEqual([0]));
  it('XNOR(0,0) = 1', () => expect(sigXnor([0],[0])).toEqual([1]));
  it('XNOR(1,0) = 0', () => expect(sigXnor([1],[0])).toEqual([0]));
});

describe('3VL — reduce operations', () => {
  it('AND-reduce [1,1,1] = 1', () => expect(reduceAnd([1,1,1])).toEqual([1]));
  it('AND-reduce [1,0,1] = 0', () => expect(reduceAnd([1,0,1])).toEqual([0]));
  it('AND-reduce [1,x,1] = x', () => expect(reduceAnd([1,'x',1])).toEqual(['x']));
  it('AND-reduce [0,x,1] = 0 (short-circuit)', () => expect(reduceAnd([0,'x',1])).toEqual([0]));
  it('OR-reduce  [0,0,1] = 1', () => expect(reduceOr([0,0,1])).toEqual([1]));
  it('OR-reduce  [0,0,0] = 0', () => expect(reduceOr([0,0,0])).toEqual([0]));
  it('OR-reduce  [1,x,0] = 1 (short-circuit)', () => expect(reduceOr([1,'x',0])).toEqual([1]));
  it('XOR-reduce [1,1,0] = 0 (even parity)', () => expect(reduceXor([1,1,0])).toEqual([0]));
  it('XOR-reduce [1,0,1] = 0 (even parity)', () => expect(reduceXor([1,0,1])).toEqual([0]));
  it('XOR-reduce [1,0,0] = 1 (odd parity)',  () => expect(reduceXor([1,0,0])).toEqual([1]));
  it('NAND-reduce [1,1] = 0', () => expect(reduceNand([1,1])).toEqual([0]));
  it('NOR-reduce  [0,0] = 1', () => expect(reduceNor([0,0])).toEqual([1]));
  it('XNOR-reduce [1,1] = 1', () => expect(reduceXnor([1,1])).toEqual([1]));
});

describe('3VL — concat / slice / extend', () => {
  it('concat([1,0],[1,1]) → [1,0,1,1]', () => {
    expect(concat([1,0],[1,1])).toEqual([1,0,1,1]);
  });
  it('slice([1,0,1,0], 1, 3) → [0,1]', () => {
    expect(slice([1,0,1,0], 1, 3)).toEqual([0,1]);
  });
  it('zeroExtend([1,0], 4) → [1,0,0,0]', () => {
    expect(zeroExtend([1,0], 4)).toEqual([1,0,0,0]);
  });
  it('signExtend([1,1], 4) → [1,1,1,1] (MSB=1 → extend with 1)', () => {
    expect(signExtend([1,1], 4)).toEqual([1,1,1,1]);
  });
  it('signExtend([1,0], 4) → [1,0,0,0] (MSB=0 → extend with 0)', () => {
    expect(signExtend([1,0], 4)).toEqual([1,0,0,0]);
  });
  it('eq([1,0],[1,0]) → true',  () => expect(eq([1,0],[1,0])).toBe(true));
  it('eq([1,0],[0,1]) → false', () => expect(eq([1,0],[0,1])).toBe(false));
  it('eq different lengths → false', () => expect(eq([1],[1,0])).toBe(false));
});
