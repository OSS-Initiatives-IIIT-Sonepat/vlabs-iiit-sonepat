import { describe, it, expect } from 'vitest';
import { DffState, JKFlipFlopState, SRLatchState, Counter4BitAsyncState, Counter4BitSyncState } from '@/labs/logic/sequential';
import { HIGH, LOW, X, fromNumber } from '@/labs/logic/3vl';

const n = (v: number, b: number) => fromNumber(v, b);

// ── D Flip-Flop ───────────────────────────────────────────────────────────

describe('DffState — rising-edge triggered', () => {
  const dff = () => new DffState({ polarity: { clock: true } });

  it('captures D=1 on rising CLK edge', () => {
    const ff = dff();
    ff.evaluate({ in: HIGH, clk: LOW });   // setup
    const out = ff.evaluate({ in: HIGH, clk: HIGH }); // rising edge
    expect(out.out).toEqual(HIGH);
  });

  it('captures D=0 on rising CLK edge', () => {
    const ff = dff();
    ff.evaluate({ in: HIGH, clk: LOW });
    ff.evaluate({ in: HIGH, clk: HIGH });  // capture HIGH
    ff.evaluate({ in: LOW,  clk: LOW });   // change D to 0
    const out = ff.evaluate({ in: LOW, clk: HIGH }); // capture LOW
    expect(out.out).toEqual(LOW);
  });

  it('holds value when CLK stays HIGH (no edge)', () => {
    const ff = dff();
    ff.evaluate({ in: HIGH, clk: LOW });
    ff.evaluate({ in: HIGH, clk: HIGH });  // capture HIGH
    ff.evaluate({ in: LOW,  clk: HIGH });  // no edge — should hold
    expect(ff.getOutputs().out).toEqual(HIGH);
  });

  it('does not capture on falling edge', () => {
    const ff = dff();
    ff.evaluate({ in: HIGH, clk: LOW });
    ff.evaluate({ in: HIGH, clk: HIGH });  // capture HIGH
    ff.evaluate({ in: LOW,  clk: LOW });   // falling — should hold
    expect(ff.getOutputs().out).toEqual(HIGH);
  });

  it('Q_bar is always inverse of Q', () => {
    const ff = dff();
    ff.evaluate({ in: HIGH, clk: LOW });
    const out = ff.evaluate({ in: HIGH, clk: HIGH });
    expect(out.out).toEqual(HIGH);
    expect(out.q_bar).toEqual(LOW);
  });

  it('reset() returns to initial state (x)', () => {
    const ff = dff();
    ff.evaluate({ in: HIGH, clk: LOW });
    ff.evaluate({ in: HIGH, clk: HIGH });
    ff.reset();
    expect(ff.getOutputs().out).toEqual(X);
  });
});

describe('DffState — async set/clear', () => {
  it('async set overrides clock (set active-high)', () => {
    const ff = new DffState({ polarity: { clock: true, set: true, clr: true } });
    ff.evaluate({ in: LOW, clk: LOW, set: HIGH, clr: LOW }); // async set
    expect(ff.getOutputs().out).toEqual(HIGH);
  });

  it('async clear overrides clock', () => {
    const ff = new DffState({ polarity: { clock: true, set: true, clr: true } });
    ff.evaluate({ in: HIGH, clk: LOW });
    ff.evaluate({ in: HIGH, clk: HIGH });   // capture HIGH
    ff.evaluate({ in: HIGH, clk: LOW, set: LOW, clr: HIGH }); // async clear
    expect(ff.getOutputs().out).toEqual(LOW);
  });
});

// ── JK Flip-Flop ──────────────────────────────────────────────────────────

describe('JKFlipFlopState — falling-edge triggered', () => {
  const jk = () => new JKFlipFlopState();

  it('J=0,K=0 → hold on falling edge', () => {
    const ff = jk();
    // First get Q=HIGH by setting J=1,K=0
    ff.evaluate({ j: HIGH, k: LOW,  clk: HIGH });
    ff.evaluate({ j: HIGH, k: LOW,  clk: LOW  }); // falling → set
    const q1 = ff.getOutputs().out;
    expect(q1).toEqual(HIGH);

    // Now J=0,K=0 — should hold
    ff.evaluate({ j: LOW, k: LOW, clk: HIGH });
    ff.evaluate({ j: LOW, k: LOW, clk: LOW  }); // falling
    expect(ff.getOutputs().out).toEqual(HIGH);   // still HIGH
  });

  it('J=1,K=0 → set Q=1', () => {
    const ff = jk();
    ff.evaluate({ j: HIGH, k: LOW, clk: HIGH });
    ff.evaluate({ j: HIGH, k: LOW, clk: LOW  });
    expect(ff.getOutputs().out).toEqual(HIGH);
  });

  it('J=0,K=1 → reset Q=0', () => {
    const ff = jk();
    ff.evaluate({ j: HIGH, k: LOW,  clk: HIGH });
    ff.evaluate({ j: HIGH, k: LOW,  clk: LOW  }); // set first
    ff.evaluate({ j: LOW,  k: HIGH, clk: HIGH });
    ff.evaluate({ j: LOW,  k: HIGH, clk: LOW  }); // reset
    expect(ff.getOutputs().out).toEqual(LOW);
  });

  it('J=1,K=1 → toggle', () => {
    const ff = jk();
    // Start at 0, toggle → 1
    ff.evaluate({ j: HIGH, k: HIGH, clk: HIGH });
    ff.evaluate({ j: HIGH, k: HIGH, clk: LOW  });
    const q1 = ff.getOutputs().out;
    // Toggle again → 0
    ff.evaluate({ j: HIGH, k: HIGH, clk: HIGH });
    ff.evaluate({ j: HIGH, k: HIGH, clk: LOW  });
    const q2 = ff.getOutputs().out;
    expect(q2).not.toEqual(q1); // different each time
  });

  it('async set (active-low set=0) → Q=1', () => {
    const ff = jk();
    ff.evaluate({ j: LOW, k: LOW, clk: LOW, set: LOW, clr: HIGH });
    expect(ff.getOutputs().out).toEqual(HIGH);
  });

  it('async clr (active-low clr=0) → Q=0', () => {
    const ff = jk();
    ff.evaluate({ j: HIGH, k: LOW, clk: HIGH });
    ff.evaluate({ j: HIGH, k: LOW, clk: LOW  }); // set Q=1
    ff.evaluate({ j: LOW, k: LOW, clk: LOW, set: HIGH, clr: LOW });
    expect(ff.getOutputs().out).toEqual(LOW);
  });
});

// ── SR Latch ──────────────────────────────────────────────────────────────

describe('SRLatchState — active-low inputs', () => {
  const sr = () => new SRLatchState();

  it('S=0,R=1 → Q=1 (set)', () => {
    const latch = sr();
    latch.evaluate({ s: LOW, r: HIGH });
    expect(latch.getOutputs().q).toEqual(HIGH);
    expect(latch.getOutputs().q_bar).toEqual(LOW);
  });

  it('S=1,R=0 → Q=0 (reset)', () => {
    const latch = sr();
    latch.evaluate({ s: LOW, r: HIGH });   // set first
    latch.evaluate({ s: HIGH, r: LOW });   // then reset
    expect(latch.getOutputs().q).toEqual(LOW);
  });

  it('S=1,R=1 → hold', () => {
    const latch = sr();
    latch.evaluate({ s: LOW, r: HIGH });   // set Q=1
    latch.evaluate({ s: HIGH, r: HIGH });  // hold
    expect(latch.getOutputs().q).toEqual(HIGH);
  });

  it('S=0,R=0 → forbidden → Q=x', () => {
    const latch = sr();
    latch.evaluate({ s: LOW, r: LOW });    // both active → undefined
    expect(latch.getOutputs().q).toEqual(X);
  });
});

// ── 4-bit Async Counter (74HC93) ─────────────────────────────────────────

describe('Counter4BitAsyncState', () => {
  it('resets to 0 when R01=R02=1', () => {
    const ctr = new Counter4BitAsyncState();
    // Count a few times
    ctr.evaluate({ clk_b: HIGH });
    ctr.evaluate({ clk_b: LOW });
    // Reset
    ctr.evaluate({ r01: HIGH, r02: HIGH });
    const out = ctr.getOutputs();
    expect(out.qa).toEqual(LOW);
    expect(out.qb).toEqual(LOW);
    expect(out.qc).toEqual(LOW);
    expect(out.qd).toEqual(LOW);
  });

  it('QA toggles on each falling edge of CLK A', () => {
    const ctr = new Counter4BitAsyncState();
    expect(ctr.getOutputs().qa).toEqual(LOW);
    ctr.evaluate({ clk_a: HIGH });
    ctr.evaluate({ clk_a: LOW  }); // falling → QA toggles
    expect(ctr.getOutputs().qa).toEqual(HIGH);
    ctr.evaluate({ clk_a: HIGH });
    ctr.evaluate({ clk_a: LOW  }); // second falling → toggles back
    expect(ctr.getOutputs().qa).toEqual(LOW);
  });

  it('counts up via CLK B (3-bit counter QB-QD)', () => {
    const ctr = new Counter4BitAsyncState();
    for (let i = 0; i < 3; i++) {
      ctr.evaluate({ clk_b: HIGH });
      ctr.evaluate({ clk_b: LOW  });
    }
    // 3 counts: QB=1, QC=1, QD=0 (3 = 011)
    expect(ctr.getOutputs().qb).toEqual(HIGH);
    expect(ctr.getOutputs().qc).toEqual(HIGH);
    expect(ctr.getOutputs().qd).toEqual(LOW);
  });
});

// ── 4-bit Sync Counter (74HC161) ─────────────────────────────────────────

describe('Counter4BitSyncState', () => {
  it('async clear to 0', () => {
    const ctr = new Counter4BitSyncState();
    ctr.evaluate({ clk: LOW,  clr_bar: LOW  });  // async clear
    ctr.evaluate({ clk: HIGH, clr_bar: LOW  });
    const out = ctr.getOutputs();
    expect(out.q).toEqual(n(0, 4));
  });

  it('counts on rising edge when ENP=ENT=1', () => {
    const ctr = new Counter4BitSyncState();
    // Clear first
    ctr.evaluate({ clk: LOW, clr_bar: LOW });
    ctr.evaluate({ clk: LOW, clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH });
    // 3 rising edges
    for (let i = 0; i < 3; i++) {
      ctr.evaluate({ clk: HIGH, clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH });
      ctr.evaluate({ clk: LOW,  clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH });
    }
    expect(ctr.getOutputs().q).toEqual(n(3, 4));
  });

  it('holds when ENP=0', () => {
    const ctr = new Counter4BitSyncState();
    ctr.evaluate({ clk: LOW, clr_bar: LOW }); // clear
    ctr.evaluate({ clk: LOW, clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH });
    ctr.evaluate({ clk: HIGH, clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH }); // count to 1
    ctr.evaluate({ clk: LOW,  clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH });
    // Now disable
    ctr.evaluate({ clk: HIGH, clr_bar: HIGH, enp: LOW, ent: HIGH, ld_bar: HIGH }); // no count
    ctr.evaluate({ clk: LOW,  clr_bar: HIGH, enp: LOW, ent: HIGH, ld_bar: HIGH });
    expect(ctr.getOutputs().q).toEqual(n(1, 4));  // still 1
  });

  it('RCO=1 when count=15 and ENT=1', () => {
    const ctr = new Counter4BitSyncState();
    ctr.evaluate({ clk: LOW, clr_bar: LOW }); // clear
    // Count to 15
    ctr.evaluate({ clk: LOW, clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH });
    for (let i = 0; i < 15; i++) {
      ctr.evaluate({ clk: HIGH, clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH });
      ctr.evaluate({ clk: LOW,  clr_bar: HIGH, enp: HIGH, ent: HIGH, ld_bar: HIGH });
    }
    expect(ctr.getOutputs().q).toEqual(n(15, 4));
    expect(ctr.getOutputs().rco).toEqual(HIGH);
  });
});
