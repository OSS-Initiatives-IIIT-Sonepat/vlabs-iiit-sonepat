import { describe, it, expect } from 'vitest';
import { opMux, op74HC153_MUX, op74HC139_DEMUX, op74HC138_DEMUX, op74HC148_ENC } from '@/labs/logic/mux';
import { HIGH, LOW, X, fromNumber } from '@/labs/logic/3vl';

const n = (v: number, b: number) => fromNumber(v, b);

describe('Binary MUX — opMux', () => {
  const inputs = [LOW, HIGH, [0,1] as any, [1,0] as any];

  it('sel=0 → inputs[0]', () => expect(opMux([0], inputs, 1)).toEqual(LOW));
  it('sel=1 → inputs[1]', () => expect(opMux([1], inputs, 1)).toEqual(HIGH));
  it('sel=x → x',         () => expect(opMux(['x'], inputs, 1)).toEqual(X));
  it('2-bit sel=2 → inputs[2]', () => {
    expect(opMux(n(2,2), inputs, 2)).toEqual([0,1]);
  });
  it('2-bit sel=3 → inputs[3]', () => {
    expect(opMux(n(3,2), inputs, 2)).toEqual([1,0]);
  });
  it('out-of-range sel → x', () => {
    expect(opMux(n(5,4), [LOW,HIGH], 1)).toEqual(X);
  });
});

describe('74HC153 — Dual 4:1 MUX', () => {
  const [i0, i1, i2, i3] = [LOW, HIGH, LOW, HIGH];
  const sel = n(1, 2);  // S1=0, S0=1

  it('enabled, sel=1 → I1=HIGH', () => {
    expect(op74HC153_MUX(sel, LOW, i0, i1, i2, i3)).toEqual(HIGH);
  });
  it('disabled (en=HIGH) → LOW',  () => {
    expect(op74HC153_MUX(sel, HIGH, i0, i1, i2, i3)).toEqual(LOW);
  });
  it('sel=0 → I0=LOW', () => {
    expect(op74HC153_MUX(n(0,2), LOW, i0, i1, i2, i3)).toEqual(LOW);
  });
  it('sel=2 → I2=LOW', () => {
    expect(op74HC153_MUX(n(2,2), LOW, i0, i1, i2, i3)).toEqual(LOW);
  });
  it('sel=3 → I3=HIGH', () => {
    expect(op74HC153_MUX(n(3,2), LOW, i0, i1, i2, i3)).toEqual(HIGH);
  });
  it('en=x → x', () => {
    expect(op74HC153_MUX(sel, X, i0, i1, i2, i3)).toEqual(X);
  });
});

describe('74HC139 — Dual 2:4 DEMUX', () => {
  it('disabled (en=HIGH) → all Y=HIGH', () => {
    const r = op74HC139_DEMUX(LOW, LOW, HIGH);
    expect(r.y0).toEqual(HIGH);
    expect(r.y1).toEqual(HIGH);
    expect(r.y2).toEqual(HIGH);
    expect(r.y3).toEqual(HIGH);
  });
  it('A=0,B=0 → Y0=LOW, Y1-3=HIGH', () => {
    const r = op74HC139_DEMUX(LOW, LOW, LOW);
    expect(r.y0).toEqual(LOW);
    expect(r.y1).toEqual(HIGH);
    expect(r.y2).toEqual(HIGH);
    expect(r.y3).toEqual(HIGH);
  });
  it('A=1,B=0 → Y1=LOW', () => {
    const r = op74HC139_DEMUX(HIGH, LOW, LOW);
    expect(r.y1).toEqual(LOW);
    expect(r.y0).toEqual(HIGH);
  });
  it('A=0,B=1 → Y2=LOW', () => {
    const r = op74HC139_DEMUX(LOW, HIGH, LOW);
    expect(r.y2).toEqual(LOW);
    expect(r.y0).toEqual(HIGH);
    expect(r.y1).toEqual(HIGH);
  });
  it('A=1,B=1 → Y3=LOW', () => {
    const r = op74HC139_DEMUX(HIGH, HIGH, LOW);
    expect(r.y3).toEqual(LOW);
    expect(r.y0).toEqual(HIGH);
  });
  it('A=x → all x', () => {
    const r = op74HC139_DEMUX(X, LOW, LOW);
    expect(r.y0).toEqual(X);
    expect(r.y1).toEqual(X);
  });
});

describe('74HC138 — 3:8 Decoder/DEMUX', () => {
  const ena = (e1=HIGH,e2=LOW,e3=LOW) => ({e1,e2,e3});

  it('disabled (E1=0) → all HIGH', () => {
    const r = op74HC138_DEMUX(LOW,LOW,LOW, LOW,LOW,LOW);
    expect(r.y0).toEqual(HIGH);
    expect(r.y7).toEqual(HIGH);
  });
  it('disabled (E2=1) → all HIGH', () => {
    const r = op74HC138_DEMUX(LOW,LOW,LOW, HIGH,HIGH,LOW);
    expect(r.y0).toEqual(HIGH);
  });
  it('A=0,B=0,C=0 → Y0=LOW', () => {
    const r = op74HC138_DEMUX(LOW,LOW,LOW, HIGH,LOW,LOW);
    expect(r.y0).toEqual(LOW);
    expect(r.y1).toEqual(HIGH);
    expect(r.y7).toEqual(HIGH);
  });
  it('A=1,B=1,C=1 → Y7=LOW', () => {
    const r = op74HC138_DEMUX(HIGH,HIGH,HIGH, HIGH,LOW,LOW);
    expect(r.y7).toEqual(LOW);
    expect(r.y0).toEqual(HIGH);
  });
  it('A=1,B=0,C=1 → Y5=LOW', () => {
    // addr = 1 + 0 + 4 = 5
    const r = op74HC138_DEMUX(HIGH,LOW,HIGH, HIGH,LOW,LOW);
    expect(r.y5).toEqual(LOW);
    expect(r.y0).toEqual(HIGH);
  });
  it('A=x → all x', () => {
    const r = op74HC138_DEMUX(X,LOW,LOW, HIGH,LOW,LOW);
    expect(r.y0).toEqual(X);
    expect(r.y7).toEqual(X);
  });
});

describe('74HC148 — 8:3 Priority Encoder', () => {
  it('disabled (EI=HIGH) → all HIGH', () => {
    const r = op74HC148_ENC(HIGH, LOW,LOW,LOW,LOW,LOW,LOW,LOW,LOW);
    expect(r.a0).toEqual(HIGH);
    expect(r.a1).toEqual(HIGH);
    expect(r.a2).toEqual(HIGH);
    expect(r.eo).toEqual(HIGH);
    expect(r.gs).toEqual(HIGH);
  });
  it('no active input → EO=LOW, GS=HIGH', () => {
    const r = op74HC148_ENC(LOW, HIGH,HIGH,HIGH,HIGH,HIGH,HIGH,HIGH,HIGH);
    expect(r.eo).toEqual(LOW);
    expect(r.gs).toEqual(HIGH);
  });
  it('I7 active → code=7 (active-low: A2=0,A1=0,A0=0)', () => {
    // I7 active (0=active-low), highest priority
    const r = op74HC148_ENC(LOW, HIGH,HIGH,HIGH,HIGH,HIGH,HIGH,HIGH,LOW);
    // code=7 active-low: bits inverted → 0,0,0
    expect(r.a2).toEqual(LOW);
    expect(r.a1).toEqual(LOW);
    expect(r.a0).toEqual(LOW);
    expect(r.gs).toEqual(LOW);
  });
  it('I0 active → code=0 (active-low: A2=1,A1=1,A0=1)', () => {
    const r = op74HC148_ENC(LOW, LOW,HIGH,HIGH,HIGH,HIGH,HIGH,HIGH,HIGH);
    // code=0 active-low: 7-0=7 → bits: 1,1,1
    expect(r.a2).toEqual(HIGH);
    expect(r.a1).toEqual(HIGH);
    expect(r.a0).toEqual(HIGH);
  });
  it('I3 and I5 both active → I5 wins (higher priority)', () => {
    // I3=LOW(active), I5=LOW(active), all others HIGH(inactive). I5 has higher priority.
    // Correct arg order: op74HC148_ENC(ei, i0,i1,i2,i3,i4,i5,i6,i7)
    const r = op74HC148_ENC(LOW, HIGH,HIGH,HIGH,LOW,HIGH,LOW,HIGH,HIGH);
    // I5 active → priority=5 (binary 101) → active-low outputs: a2=LOW, a1=HIGH, a0=LOW
    expect(r.a2).toEqual(LOW);
    expect(r.a1).toEqual(HIGH);
    expect(r.a0).toEqual(LOW);
  });
});
