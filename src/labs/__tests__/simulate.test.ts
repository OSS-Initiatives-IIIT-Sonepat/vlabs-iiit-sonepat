import { describe, it, expect } from 'vitest';
import { simulate, resetSequentialState } from '@/labs/simulate';
import { Netlist } from '@/labs/netlist';
import { HalfAdder } from '@/labs/circuits/half-adder';
import { FullAdder } from '@/labs/circuits/full-adder';
import { HalfSubtractor } from '@/labs/circuits/half-subtractor';
import { FullSubtractor } from '@/labs/circuits/full-subtractor';
import { Mux2to1 } from '@/labs/circuits/mux';
import { Demux1to2 } from '@/labs/circuits/demux';
import { Encoder4to2 } from '@/labs/circuits/encoder';
import { Decoder2to4 } from '@/labs/circuits/decoder';
import { FullAdderRippleCircuit } from '@/labs/circuits/full-adder-ripple';

// ── helpers ───────────────────────────────────────────────────────────────

/** Assert a specific LED is ON and all others are OFF */
function expectLed(
  ledOn: Map<string, boolean>,
  onIds:  string[],
  offIds: string[],
) {
  for (const id of onIds)  expect(ledOn.get(id), `${id} should be ON`).toBe(true);
  for (const id of offIds) expect(ledOn.get(id), `${id} should be OFF`).toBe(false);
}

// ── Half Adder ────────────────────────────────────────────────────────────

describe('Half Adder — full truth table', () => {
  // A + B → Sum (XOR), Carry (AND)
  // led_sum = green, led_carry = yellow

  it('A=0, B=0 → Sum=0, Carry=0', () => {
    const { ledOn } = simulate(HalfAdder, { A: 0, B: 0 });
    expectLed(ledOn, [], ['led_sum', 'led_carry']);
  });

  it('A=0, B=1 → Sum=1, Carry=0', () => {
    const { ledOn } = simulate(HalfAdder, { A: 0, B: 1 });
    expectLed(ledOn, ['led_sum'], ['led_carry']);
  });

  it('A=1, B=0 → Sum=1, Carry=0', () => {
    const { ledOn } = simulate(HalfAdder, { A: 1, B: 0 });
    expectLed(ledOn, ['led_sum'], ['led_carry']);
  });

  it('A=1, B=1 → Sum=0, Carry=1', () => {
    const { ledOn } = simulate(HalfAdder, { A: 1, B: 1 });
    expectLed(ledOn, ['led_carry'], ['led_sum']);
  });
});

// ── Full Adder ────────────────────────────────────────────────────────────

describe('Full Adder — full truth table (A + B + Cin)', () => {
  // led_sum = green, led_cout = yellow
  const run = (A: 0|1, B: 0|1, Cin: 0|1) => simulate(FullAdder, { A, B, Cin }).ledOn;

  it('0+0+0 → Sum=0, Cout=0', () => expectLed(run(0,0,0), [], ['led_sum','led_cout']));
  it('0+0+1 → Sum=1, Cout=0', () => expectLed(run(0,0,1), ['led_sum'], ['led_cout']));
  it('0+1+0 → Sum=1, Cout=0', () => expectLed(run(0,1,0), ['led_sum'], ['led_cout']));
  it('0+1+1 → Sum=0, Cout=1', () => expectLed(run(0,1,1), ['led_cout'], ['led_sum']));
  it('1+0+0 → Sum=1, Cout=0', () => expectLed(run(1,0,0), ['led_sum'], ['led_cout']));
  it('1+0+1 → Sum=0, Cout=1', () => expectLed(run(1,0,1), ['led_cout'], ['led_sum']));
  it('1+1+0 → Sum=0, Cout=1', () => expectLed(run(1,1,0), ['led_cout'], ['led_sum']));
  it('1+1+1 → Sum=1, Cout=1', () => expectLed(run(1,1,1), ['led_sum','led_cout'], []));
});

// ── Half Subtractor ───────────────────────────────────────────────────────

describe('Half Subtractor — full truth table (A - B)', () => {
  // led_diff = green, led_borrow = red
  const run = (A: 0|1, B: 0|1) => simulate(HalfSubtractor, { A, B }).ledOn;

  it('0-0 → Diff=0, Borrow=0', () => expectLed(run(0,0), [], ['led_diff','led_borrow']));
  it('0-1 → Diff=1, Borrow=1', () => expectLed(run(0,1), ['led_diff','led_borrow'], []));
  it('1-0 → Diff=1, Borrow=0', () => expectLed(run(1,0), ['led_diff'], ['led_borrow']));
  it('1-1 → Diff=0, Borrow=0', () => expectLed(run(1,1), [], ['led_diff','led_borrow']));
});

// ── Full Subtractor ───────────────────────────────────────────────────────

describe('Full Subtractor — full truth table (A - B - Bin)', () => {
  // led_diff = green, led_bout = red
  const run = (A: 0|1, B: 0|1, Bin: 0|1) => simulate(FullSubtractor, { A, B, Bin }).ledOn;

  it('0-0-0 → Diff=0, Bout=0', () => expectLed(run(0,0,0), [], ['led_diff','led_bout']));
  it('0-0-1 → Diff=1, Bout=1', () => expectLed(run(0,0,1), ['led_diff','led_bout'], []));
  it('0-1-0 → Diff=1, Bout=1', () => expectLed(run(0,1,0), ['led_diff','led_bout'], []));
  it('0-1-1 → Diff=0, Bout=1', () => expectLed(run(0,1,1), ['led_bout'], ['led_diff']));
  it('1-0-0 → Diff=1, Bout=0', () => expectLed(run(1,0,0), ['led_diff'], ['led_bout']));
  it('1-0-1 → Diff=0, Bout=0', () => expectLed(run(1,0,1), [], ['led_diff','led_bout']));
  it('1-1-0 → Diff=0, Bout=0', () => expectLed(run(1,1,0), [], ['led_diff','led_bout']));
  it('1-1-1 → Diff=1, Bout=1', () => expectLed(run(1,1,1), ['led_diff','led_bout'], []));
});

// ── 2:1 Multiplexer ───────────────────────────────────────────────────────

describe('2:1 Multiplexer — all input combos', () => {
  // S=0 → Y=A, S=1 → Y=B
  // led_out = green
  const run = (S: 0|1, A: 0|1, B: 0|1) => simulate(Mux2to1, { S, A, B }).ledOn;

  it('S=0, A=0, B=0 → Y=0', () => expectLed(run(0,0,0), [], ['led_out']));
  it('S=0, A=1, B=0 → Y=1', () => expectLed(run(0,1,0), ['led_out'], []));
  it('S=0, A=0, B=1 → Y=0 (B ignored)', () => expectLed(run(0,0,1), [], ['led_out']));
  it('S=0, A=1, B=1 → Y=1', () => expectLed(run(0,1,1), ['led_out'], []));
  it('S=1, A=0, B=0 → Y=0', () => expectLed(run(1,0,0), [], ['led_out']));
  it('S=1, A=1, B=0 → Y=0 (A ignored)', () => expectLed(run(1,1,0), [], ['led_out']));
  it('S=1, A=0, B=1 → Y=1', () => expectLed(run(1,0,1), ['led_out'], []));
  it('S=1, A=1, B=1 → Y=1', () => expectLed(run(1,1,1), ['led_out'], []));
});

// ── 1:2 Demultiplexer ─────────────────────────────────────────────────────

describe('1:2 Demultiplexer', () => {
  // S=0 → Y0=I, Y1=0;  S=1 → Y0=0, Y1=I
  // led_y0 = green, led_y1 = yellow
  const run = (S: 0|1, I: 0|1) => simulate(Demux1to2, { S, I }).ledOn;

  it('S=0, I=0 → Y0=0, Y1=0', () => expectLed(run(0,0), [], ['led_y0','led_y1']));
  it('S=0, I=1 → Y0=1, Y1=0', () => expectLed(run(0,1), ['led_y0'], ['led_y1']));
  it('S=1, I=0 → Y0=0, Y1=0', () => expectLed(run(1,0), [], ['led_y0','led_y1']));
  it('S=1, I=1 → Y0=0, Y1=1', () => expectLed(run(1,1), ['led_y1'], ['led_y0']));
});

// ── 4:2 Priority Encoder ─────────────────────────────────────────────────

describe('4:2 Priority Encoder', () => {
  // I0→code00, I1→code01, I2→code10, I3→code11
  // led_a = green (MSB), led_b = yellow (LSB)
  const run = (I0:0|1, I1:0|1, I2:0|1, I3:0|1) =>
    simulate(Encoder4to2, { I0, I1, I2, I3 }).ledOn;

  it('I0 active → A=0, B=0', () => expectLed(run(1,0,0,0), [], ['led_a','led_b']));
  it('I1 active → A=0, B=1', () => expectLed(run(0,1,0,0), ['led_b'], ['led_a']));
  it('I2 active → A=1, B=0', () => expectLed(run(0,0,1,0), ['led_a'], ['led_b']));
  it('I3 active → A=1, B=1', () => expectLed(run(0,0,0,1), ['led_a','led_b'], []));
});

// ── 2:4 Binary Decoder ────────────────────────────────────────────────────

describe('2:4 Binary Decoder', () => {
  // A=0,B=0 → Y0; A=1,B=0 → Y2; A=0,B=1 → Y1; A=1,B=1 → Y3
  // led0=red, led1=yellow, led2=green, led3=blue
  const run = (A: 0|1, B: 0|1) => simulate(Decoder2to4, { A, B }).ledOn;
  const allLeds = ['led0','led1','led2','led3'];

  it('A=0,B=0 → only Y0 (led0) ON', () => {
    const l = run(0,0);
    expect(l.get('led0')).toBe(true);
    expect(l.get('led1')).toBe(false);
    expect(l.get('led2')).toBe(false);
    expect(l.get('led3')).toBe(false);
  });
  it('A=1,B=0 → only Y2 (led2) ON', () => {
    const l = run(1,0);
    expect(l.get('led0')).toBe(false);
    expect(l.get('led2')).toBe(true);
  });
  it('A=0,B=1 → only Y1 (led1) ON', () => {
    const l = run(0,1);
    expect(l.get('led1')).toBe(true);
    expect(l.get('led0')).toBe(false);
    expect(l.get('led3')).toBe(false);
  });
  it('A=1,B=1 → only Y3 (led3) ON', () => {
    const l = run(1,1);
    expect(l.get('led3')).toBe(true);
    expect(l.get('led0')).toBe(false);
    expect(l.get('led2')).toBe(false);
  });
  it('exactly one LED is ON for each input combo', () => {
    for (const A of [0,1] as const) {
      for (const B of [0,1] as const) {
        const l = run(A, B);
        const onCount = allLeds.filter(id => l.get(id)).length;
        expect(onCount, `A=${A},B=${B}: exactly 1 LED should be ON`).toBe(1);
      }
    }
  });
});

// ── netValues sanity checks ───────────────────────────────────────────────

describe('simulate() — netValues sanity', () => {
  it('GND rail is driven LOW', () => {
    const { netValues } = simulate(HalfAdder, {});
    const nl = new Netlist(HalfAdder.components);
    const gndNet = nl.netOfRail('gnd_top');
    expect(netValues.get(gndNet)).toEqual([0]);
  });

  it('VCC rail is driven HIGH', () => {
    const { netValues } = simulate(HalfAdder, {});
    const nl = new Netlist(HalfAdder.components);
    const vccNet = nl.netOfRail('vcc_top');
    expect(netValues.get(vccNet)).toEqual([1]);
  });

  it('no inputs → all LEDs OFF (floating gates → x → LED stays off)', () => {
    const { ledOn } = simulate(HalfAdder, {});
    expect(ledOn.get('led_sum')).toBe(false);
    expect(ledOn.get('led_carry')).toBe(false);
  });
});

// ── 4-bit Ripple Carry Adder ─────────────────────────────────────────────

describe('4-bit Ripple Carry Adder — representative test vectors', () => {
  // A[3:0] + B[3:0] + Cin(=0) → {Cout, S3, S2, S1, S0}
  // LEDs: led_s0..led_s3 (green), led_cout (yellow)
  const run = (A3:0|1, A2:0|1, A1:0|1, A0:0|1, B3:0|1, B2:0|1, B1:0|1, B0:0|1) =>
    simulate(FullAdderRippleCircuit, { A0, B0, A1, B1, A2, B2, A3, B3 }).ledOn;

  it('0000+0000 = 00000', () => {
    const l = run(0,0,0,0, 0,0,0,0);
    expectLed(l, [], ['led_s0','led_s1','led_s2','led_s3','led_cout']);
  });

  it('0001+0010 = 00011', () => {
    const l = run(0,0,0,1, 0,0,1,0);
    expectLed(l, ['led_s0','led_s1'], ['led_s2','led_s3','led_cout']);
  });

  it('0011+0101 = 01000 (carry propagation)', () => {
    const l = run(0,0,1,1, 0,1,0,1);
    expectLed(l, ['led_s3'], ['led_s0','led_s1','led_s2','led_cout']);
  });

  it('0111+0001 = 01000 (carry ripple through 3 stages)', () => {
    const l = run(0,1,1,1, 0,0,0,1);
    expectLed(l, ['led_s3'], ['led_s0','led_s1','led_s2','led_cout']);
  });

  it('1111+0001 = 10000 (full overflow, Cout=1)', () => {
    const l = run(1,1,1,1, 0,0,0,1);
    expectLed(l, ['led_cout'], ['led_s0','led_s1','led_s2','led_s3']);
  });

  it('1010+0101 = 01111 (complementary inputs)', () => {
    const l = run(1,0,1,0, 0,1,0,1);
    expectLed(l, ['led_s0','led_s1','led_s2','led_s3'], ['led_cout']);
  });

  it('1110+0001 = 01111 (single bit addition, no ripple)', () => {
    const l = run(1,1,1,0, 0,0,0,1);
    expectLed(l, ['led_s0','led_s1','led_s2','led_s3'], ['led_cout']);
  });

  it('1111+1111 = 11110 (max + max)', () => {
    const l = run(1,1,1,1, 1,1,1,1);
    expectLed(l, ['led_s1','led_s2','led_s3','led_cout'], ['led_s0']);
  });
});
