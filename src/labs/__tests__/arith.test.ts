import { describe, it, expect } from 'vitest';
import {
  opAdd, opSub, opMul, opDiv, opMod, opPow,
  opNegation, opEq, opNe, opLt, opLe, opGt, opGe,
  opShiftLeft, opShiftRight,
  op4BitAdder,
} from '@/labs/logic/arith';
import { fromBigInt, fromNumber, sigX } from '@/labs/logic/3vl';

// helpers
const n = (val: number, bits: number) => fromNumber(val, bits);

describe('Addition', () => {
  it('2+3=5 (4-bit)',   () => expect(opAdd(n(2,4), n(3,4), 4)).toEqual(n(5,4)));
  it('7+7=14 (4-bit)',  () => expect(opAdd(n(7,4), n(7,4), 4)).toEqual(n(14,4)));
  it('15+1=0 (wraps)',  () => expect(opAdd(n(15,4), n(1,4), 4)).toEqual(n(0,4)));
  it('x+3=x',          () => expect(opAdd(sigX(4), n(3,4), 4)).toEqual(sigX(4)));
});

describe('Subtraction', () => {
  it('5-3=2',   () => expect(opSub(n(5,4), n(3,4), 4)).toEqual(n(2,4)));
  it('3-5 wraps unsigned', () => {
    // 3-5 = -2 → 0xE in 4-bit unsigned
    expect(opSub(n(3,4), n(5,4), 4)).toEqual(n(14,4));
  });
});

describe('Multiplication', () => {
  it('3×4=12 (8-bit)', () => expect(opMul(n(3,8), n(4,8), 8)).toEqual(n(12,8)));
  it('2×7=14',         () => expect(opMul(n(2,4), n(7,4), 8)).toEqual(n(14,8)));
});

describe('Division', () => {
  it('10÷3=3 (integer)',  () => expect(opDiv(n(10,8), n(3,8), 8)).toEqual(n(3,8)));
  it('÷0 = dividend',     () => expect(opDiv(n(7,4), n(0,4), 4)).toEqual(n(7,4)));
});

describe('Modulo', () => {
  it('10%3=1', () => expect(opMod(n(10,8), n(3,8), 8)).toEqual(n(1,8)));
  it('%0 = dividend', () => expect(opMod(n(7,4), n(0,4), 4)).toEqual(n(7,4)));
});

describe('Power', () => {
  it('2^8=256 (16-bit)', () => expect(opPow(n(2,16), n(8,16), 16)).toEqual(n(256,16)));
  it('3^0=1',            () => expect(opPow(n(3,4), n(0,4), 4)).toEqual(n(1,4)));
});

describe('Negation', () => {
  it('-5 in 8-bit = 251 unsigned', () => {
    // fromBigInt(-5, 8): -5 mod 256 = 251
    expect(opNegation(n(5,8), 8)).toEqual(fromBigInt(-5n, 8));
  });
  it('-0 = 0', () => expect(opNegation(n(0,8), 8)).toEqual(n(0,8)));
});

describe('Equality', () => {
  it('5==5 → 1',  () => expect(opEq(n(5,4), n(5,4))).toEqual([1]));
  it('5==6 → 0',  () => expect(opEq(n(5,4), n(6,4))).toEqual([0]));
  it('x==5 → x',  () => expect(opEq(sigX(4), n(5,4))).toEqual(['x']));
  it('5!=6 → 1',  () => expect(opNe(n(5,4), n(6,4))).toEqual([1]));
  it('5!=5 → 0',  () => expect(opNe(n(5,4), n(5,4))).toEqual([0]));
});

describe('Comparison', () => {
  it('3 < 5 → 1',  () => expect(opLt(n(3,4), n(5,4))).toEqual([1]));
  it('5 < 3 → 0',  () => expect(opLt(n(5,4), n(3,4))).toEqual([0]));
  it('5 < 5 → 0',  () => expect(opLt(n(5,4), n(5,4))).toEqual([0]));
  it('3 ≤ 5 → 1',  () => expect(opLe(n(3,4), n(5,4))).toEqual([1]));
  it('5 ≤ 5 → 1',  () => expect(opLe(n(5,4), n(5,4))).toEqual([1]));
  it('6 > 5 → 1',  () => expect(opGt(n(6,4), n(5,4))).toEqual([1]));
  it('5 ≥ 5 → 1',  () => expect(opGe(n(5,4), n(5,4))).toEqual([1]));
  it('x < 5 → x',  () => expect(opLt(sigX(4), n(5,4))).toEqual(['x']));
});

describe('Shift left', () => {
  it('1 << 2 = 4', () => {
    const bits = { in: 8, amount: 4, out: 8 };
    expect(opShiftLeft(n(1,8), n(2,4), bits)).toEqual(n(4,8));
  });
  it('3 << 3 = 24', () => {
    const bits = { in: 8, amount: 4, out: 8 };
    expect(opShiftLeft(n(3,8), n(3,4), bits)).toEqual(n(24,8));
  });
});

describe('Shift right', () => {
  it('8 >> 2 = 2', () => {
    const bits = { in: 8, amount: 4, out: 8 };
    expect(opShiftRight(n(8,8), n(2,4), bits)).toEqual(n(2,8));
  });
  it('7 >> 1 = 3 (floor)', () => {
    const bits = { in: 8, amount: 4, out: 8 };
    expect(opShiftRight(n(7,8), n(1,4), bits)).toEqual(n(3,8));
  });
  it('x >> 2 = x (undefined amount)', () => {
    // amount is x → result is x
    const bits = { in: 4, amount: 4, out: 4 };
    expect(opShiftRight(n(8,4), sigX(4), bits)).toEqual(sigX(4));
  });
});

describe('74HC283 — 4-bit binary adder', () => {
  it('0+0+0 = sum=0, cout=0', () => {
    const r = op4BitAdder(n(0,4), n(0,4), [0]);
    expect(r.sum).toEqual(n(0,4));
    expect(r.cout).toEqual([0]);
  });
  it('5+3+0 = sum=8, cout=0', () => {
    const r = op4BitAdder(n(5,4), n(3,4), [0]);
    expect(r.sum).toEqual(n(8,4));
    expect(r.cout).toEqual([0]);
  });
  it('9+7+0 = sum=0, cout=1 (overflow)', () => {
    const r = op4BitAdder(n(9,4), n(7,4), [0]);
    expect(r.sum).toEqual(n(0,4));
    expect(r.cout).toEqual([1]);
  });
  it('7+7+1 = sum=15, cout=0', () => {
    const r = op4BitAdder(n(7,4), n(7,4), [1]);
    expect(r.sum).toEqual(n(15,4));
    expect(r.cout).toEqual([0]);
  });
  it('8+8+0 = sum=0, cout=1', () => {
    const r = op4BitAdder(n(8,4), n(8,4), [0]);
    expect(r.sum).toEqual(n(0,4));
    expect(r.cout).toEqual([1]);
  });
  it('x+3 = x (undefined input)', () => {
    const r = op4BitAdder(sigX(4), n(3,4), [0]);
    expect(r.sum).toEqual(sigX(4));
    expect(r.cout).toEqual(sigX(1));
  });
});
