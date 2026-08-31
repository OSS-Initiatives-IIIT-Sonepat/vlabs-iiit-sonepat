import { describe, it, expect } from 'vitest';
import { evaluateGate, GATE_TYPES } from '@/labs/logic/gates';
import { HIGH, LOW, X, sigX } from '@/labs/logic/3vl';

// ── All 7 standard gates — single-bit truth tables ────────────────────────

describe('NOT gate', () => {
  it('NOT 0 = 1', () => expect(evaluateGate('not-gate', { in: LOW })?.out).toEqual(HIGH));
  it('NOT 1 = 0', () => expect(evaluateGate('not-gate', { in: HIGH })?.out).toEqual(LOW));
  it('NOT x = x', () => expect(evaluateGate('not-gate', { in: X })?.out).toEqual(X));
});

describe('Buffer gate', () => {
  it('BUF 0 = 0', () => expect(evaluateGate('buffer-gate', { in: LOW })?.out).toEqual(LOW));
  it('BUF 1 = 1', () => expect(evaluateGate('buffer-gate', { in: HIGH })?.out).toEqual(HIGH));
  it('BUF x = x', () => expect(evaluateGate('buffer-gate', { in: X })?.out).toEqual(X));
});

describe('AND gate — full truth table', () => {
  it('0 AND 0 = 0', () => expect(evaluateGate('and-gate', { in1: LOW,  in2: LOW  })?.out).toEqual(LOW));
  it('0 AND 1 = 0', () => expect(evaluateGate('and-gate', { in1: LOW,  in2: HIGH })?.out).toEqual(LOW));
  it('1 AND 0 = 0', () => expect(evaluateGate('and-gate', { in1: HIGH, in2: LOW  })?.out).toEqual(LOW));
  it('1 AND 1 = 1', () => expect(evaluateGate('and-gate', { in1: HIGH, in2: HIGH })?.out).toEqual(HIGH));
  it('0 AND x = 0 (short-circuit)', () => expect(evaluateGate('and-gate', { in1: LOW,  in2: X    })?.out).toEqual(LOW));
  it('1 AND x = x',                  () => expect(evaluateGate('and-gate', { in1: HIGH, in2: X    })?.out).toEqual(X));
});

describe('OR gate — full truth table', () => {
  it('0 OR 0 = 0', () => expect(evaluateGate('or-gate', { in1: LOW,  in2: LOW  })?.out).toEqual(LOW));
  it('0 OR 1 = 1', () => expect(evaluateGate('or-gate', { in1: LOW,  in2: HIGH })?.out).toEqual(HIGH));
  it('1 OR 0 = 1', () => expect(evaluateGate('or-gate', { in1: HIGH, in2: LOW  })?.out).toEqual(HIGH));
  it('1 OR 1 = 1', () => expect(evaluateGate('or-gate', { in1: HIGH, in2: HIGH })?.out).toEqual(HIGH));
  it('1 OR x = 1 (short-circuit)', () => expect(evaluateGate('or-gate', { in1: HIGH, in2: X    })?.out).toEqual(HIGH));
  it('0 OR x = x',                  () => expect(evaluateGate('or-gate', { in1: LOW,  in2: X    })?.out).toEqual(X));
});

describe('NAND gate', () => {
  it('1 NAND 1 = 0', () => expect(evaluateGate('nand-gate', { in1: HIGH, in2: HIGH })?.out).toEqual(LOW));
  it('0 NAND 1 = 1', () => expect(evaluateGate('nand-gate', { in1: LOW,  in2: HIGH })?.out).toEqual(HIGH));
  it('0 NAND x = 1 (short-circuit)', () => expect(evaluateGate('nand-gate', { in1: LOW,  in2: X })?.out).toEqual(HIGH));
  it('1 NAND x = x',                  () => expect(evaluateGate('nand-gate', { in1: HIGH, in2: X })?.out).toEqual(X));
});

describe('NOR gate', () => {
  it('0 NOR 0 = 1', () => expect(evaluateGate('nor-gate', { in1: LOW,  in2: LOW  })?.out).toEqual(HIGH));
  it('0 NOR 1 = 0', () => expect(evaluateGate('nor-gate', { in1: LOW,  in2: HIGH })?.out).toEqual(LOW));
  it('1 NOR x = 0 (short-circuit)', () => expect(evaluateGate('nor-gate', { in1: HIGH, in2: X })?.out).toEqual(LOW));
  it('0 NOR x = x',                  () => expect(evaluateGate('nor-gate', { in1: LOW,  in2: X })?.out).toEqual(X));
});

describe('XOR gate — full truth table', () => {
  it('0 XOR 0 = 0', () => expect(evaluateGate('xor-gate', { in1: LOW,  in2: LOW  })?.out).toEqual(LOW));
  it('0 XOR 1 = 1', () => expect(evaluateGate('xor-gate', { in1: LOW,  in2: HIGH })?.out).toEqual(HIGH));
  it('1 XOR 0 = 1', () => expect(evaluateGate('xor-gate', { in1: HIGH, in2: LOW  })?.out).toEqual(HIGH));
  it('1 XOR 1 = 0', () => expect(evaluateGate('xor-gate', { in1: HIGH, in2: HIGH })?.out).toEqual(LOW));
  it('x XOR 0 = x', () => expect(evaluateGate('xor-gate', { in1: X,    in2: LOW  })?.out).toEqual(X));
  it('x XOR 1 = x', () => expect(evaluateGate('xor-gate', { in1: X,    in2: HIGH })?.out).toEqual(X));
});

describe('XNOR gate', () => {
  it('0 XNOR 0 = 1', () => expect(evaluateGate('xnor-gate', { in1: LOW,  in2: LOW  })?.out).toEqual(HIGH));
  it('0 XNOR 1 = 0', () => expect(evaluateGate('xnor-gate', { in1: LOW,  in2: HIGH })?.out).toEqual(LOW));
  it('1 XNOR 1 = 1', () => expect(evaluateGate('xnor-gate', { in1: HIGH, in2: HIGH })?.out).toEqual(HIGH));
});

describe('Reduce gates', () => {
  const ALL_1 = [1,1,1,1] as any;
  const MIX   = [1,0,1,0] as any;

  it('AND-reduce [1,1,1,1] = 1', () => expect(evaluateGate('and-reduce', { in: ALL_1 })?.out).toEqual(HIGH));
  it('AND-reduce [1,0,1,0] = 0', () => expect(evaluateGate('and-reduce', { in: MIX   })?.out).toEqual(LOW));
  it('OR-reduce  [1,0,1,0] = 1', () => expect(evaluateGate('or-reduce',  { in: MIX   })?.out).toEqual(HIGH));
  it('OR-reduce  [0,0,0,0] = 0', () => expect(evaluateGate('or-reduce',  { in: [0,0,0,0] as any })?.out).toEqual(LOW));
  it('XOR-reduce [1,1,0,0] = 0 (even)', () => expect(evaluateGate('xor-reduce', { in: [1,1,0,0] as any })?.out).toEqual(LOW));
  it('XOR-reduce [1,0,0,0] = 1 (odd)',  () => expect(evaluateGate('xor-reduce', { in: [1,0,0,0] as any })?.out).toEqual(HIGH));
  it('NAND-reduce [1,1,1] = 0', () => expect(evaluateGate('nand-reduce', { in: [1,1,1] as any })?.out).toEqual(LOW));
  it('NOR-reduce  [0,0,0] = 1', () => expect(evaluateGate('nor-reduce',  { in: [0,0,0] as any })?.out).toEqual(HIGH));
  it('XNOR-reduce [1,1]   = 1', () => expect(evaluateGate('xnor-reduce', { in: [1,1]   as any })?.out).toEqual(HIGH));
});

describe('Unknown gate type', () => {
  it('returns null for unknown type', () => {
    expect(evaluateGate('unknown-gate', { in1: HIGH, in2: LOW })).toBeNull();
  });
});

describe('GATE_TYPES set', () => {
  it('contains xor-gate', () => expect(GATE_TYPES.has('xor-gate')).toBe(true));
  it('contains not-gate', () => expect(GATE_TYPES.has('not-gate')).toBe(true));
  it('does not contain breadboard', () => expect(GATE_TYPES.has('breadboard')).toBe(false));
});
