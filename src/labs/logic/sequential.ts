// ── Sequential Logic ──────────────────────────────────────────────────────
//
// Stateful components — they hold state between evaluations.
// Matches DigitalJS dff.mjs exactly.
//
// Usage: create one instance per component at circuit init,
// then call .evaluate(inputs) each simulation tick.
//
// All state is encapsulated — the simulator stores one instance per
// sequential component ID in a Map<string, SequentialState>.

import {
  type Signal,
  fromBin, sigX, HIGH, LOW, sigAnd, sigOr, sigNot,
  isFullyDefined, getBit,
} from './3vl';

// ── Base interface ────────────────────────────────────────────────────────

export interface SequentialState {
  /** Called once per propagation tick. Returns new output signals. */
  evaluate(inputs: Record<string, Signal>): Record<string, Signal>;
  /** Read current outputs without triggering evaluation */
  getOutputs(): Record<string, Signal>;
  /** Reset to initial state */
  reset(): void;
}

// ── D Flip-Flop (74HC74) ──────────────────────────────────────────────────
// Dual D flip-flop. We model one gate here (gate 1 of the IC).
//
// Pins:
//   D     — data input
//   CLK   — clock (rising-edge triggered by default)
//   SET   — async set (active-high → Q=1)
//   CLR   — async clear/reset (active-high → Q=0)
//   Q     — output
//   Q_bar — inverted output
//
// DigitalJS polarity config: { clock: true } = rising edge, { clock: false } = falling edge
// Async set/clear override clock.

export type DffConfig = {
  bits?:    number;
  initial?: string;      // binary string e.g. "0" or "x"
  polarity?: {
    clock?: boolean;     // true=rising, false=falling, undefined=level-sensitive
    set?:   boolean;     // true=active-high, false=active-low
    clr?:   boolean;     // true=active-high, false=active-low
    enable?: boolean;    // true=active-high enable
    arst?:  boolean;     // async reset polarity
  };
};

export class DffState implements SequentialState {
  private q:       Signal;
  private lastClk: 0 | 1 | 'x' = 'x';
  private bits:    number;
  private config:  DffConfig;

  constructor(config: DffConfig = {}) {
    this.bits   = config.bits ?? 1;
    this.config = config;
    const init  = config.initial ?? 'x';
    this.q      = init === 'x' ? sigX(this.bits) : fromBin(init.padStart(this.bits, '0'));
  }

  evaluate(inputs: Record<string, Signal>): Record<string, Signal> {
    const pol     = this.config.polarity ?? {};
    const clkPol  = pol.clock  !== false ? 1 : 0;   // default rising edge
    const setPol  = pol.set    !== false ? 1 : 0;
    const clrPol  = pol.clr    !== false ? 1 : 0;
    const enPol   = pol.enable !== false ? 1 : 0;
    const arstPol = pol.arst   !== false ? 1 : 0;

    const d   = inputs.in  ?? sigX(this.bits);
    const clk = inputs.clk ?? sigX(1);
    const set = inputs.set ?? (setPol === 1 ? LOW : HIGH);  // default inactive
    const clr = inputs.clr ?? (clrPol === 1 ? LOW : HIGH);
    const en  = inputs.en  ?? (enPol  === 1 ? HIGH : LOW);
    const arst = inputs.arst ?? (arstPol === 1 ? LOW : HIGH);

    // Async reset has highest priority
    if (pol.arst !== undefined && getBit(arst, 0) === arstPol) {
      this.q = sigX(this.bits).map(() => 0) as Signal;  // reset to 0
      this.lastClk = 'x';
      return this._outputs();
    }

    // Async set
    if (pol.set !== undefined && getBit(set, 0) === setPol) {
      this.q = this.q.map(() => 1) as Signal;
    }
    // Async clear
    if (pol.clr !== undefined && getBit(clr, 0) === clrPol) {
      this.q = this.q.map(() => 0) as Signal;
    }
    // If both set and clear active simultaneously: undefined
    if (pol.set !== undefined && pol.clr !== undefined &&
        getBit(set, 0) === setPol && getBit(clr, 0) === clrPol) {
      this.q = sigX(this.bits);
    }

    // Clock edge detection
    if (pol.clock !== undefined) {
      const curClk = getBit(clk, 0);
      const edge   = curClk === clkPol && this.lastClk === (clkPol === 1 ? 0 : 1);
      this.lastClk = curClk as 0 | 1 | 'x';

      if (edge) {
        // Check enable
        if (pol.enable === undefined || getBit(en, 0) === enPol) {
          this.q = d;
        }
      }
    } else {
      // Level-sensitive latch (no clock specified) — transparent when enable active
      if (pol.enable === undefined || getBit(en, 0) === enPol) {
        this.q = d;
      }
    }

    return this._outputs();
  }

  private _outputs(): Record<string, Signal> {
    return { out: this.q, q_bar: sigNot(this.q) };
  }

  getOutputs(): Record<string, Signal> { return this._outputs(); }
  reset() {
    const init = this.config.initial ?? 'x';
    this.q = init === 'x' ? sigX(this.bits) : fromBin(init.padStart(this.bits, '0'));
    this.lastClk = 'x';
  }
}

// ── JK Flip-Flop (74HC76) ────────────────────────────────────────────────
// Negative edge-triggered JK flip-flop.
// Pins: J, K, CLK, SET (active-low), CLR (active-low), Q, Q_bar
//
// Truth table on falling clock edge:
//   J=0, K=0 → Q unchanged (hold)
//   J=0, K=1 → Q=0 (reset)
//   J=1, K=0 → Q=1 (set)
//   J=1, K=1 → Q = NOT Q (toggle)

export class JKFlipFlopState implements SequentialState {
  private q:       Signal = LOW;
  private lastClk: 0 | 1 | 'x' = 'x';

  evaluate(inputs: Record<string, Signal>): Record<string, Signal> {
    const j   = inputs.j   ?? ['x'];
    const k   = inputs.k   ?? ['x'];
    const clk = inputs.clk ?? ['x'];
    const set = inputs.set ?? HIGH;   // active-low async set
    const clr = inputs.clr ?? HIGH;  // active-low async clear

    // Async override (active-low)
    if (getBit(set, 0) === 0 && getBit(clr, 0) === 1) { this.q = HIGH; return this._out(); }
    if (getBit(set, 0) === 1 && getBit(clr, 0) === 0) { this.q = LOW;  return this._out(); }
    if (getBit(set, 0) === 0 && getBit(clr, 0) === 0) { this.q = ['x']; return this._out(); }

    // Falling edge detection
    const curClk = getBit(clk, 0);
    const edge   = curClk === 0 && this.lastClk === 1;
    this.lastClk = curClk as 0 | 1 | 'x';

    if (edge) {
      const jb = getBit(j, 0), kb = getBit(k, 0);
      if (jb === 'x' || kb === 'x') { this.q = ['x']; }
      else if (jb === 0 && kb === 0) { /* hold */ }
      else if (jb === 0 && kb === 1) { this.q = LOW; }
      else if (jb === 1 && kb === 0) { this.q = HIGH; }
      else                           { this.q = sigNot(this.q); }  // toggle
    }

    return this._out();
  }

  private _out() { return { out: this.q, q_bar: sigNot(this.q) }; }
  getOutputs()   { return this._out(); }
  reset()        { this.q = LOW; this.lastClk = 'x'; }
}

// ── SR Latch (74HC279) ────────────────────────────────────────────────────
// Active-low SR latch.
// S_bar=0, R_bar=1 → Q=1 (set)
// S_bar=1, R_bar=0 → Q=0 (reset)
// S_bar=1, R_bar=1 → Q unchanged (hold)
// S_bar=0, R_bar=0 → Q=x (forbidden/undefined)

export class SRLatchState implements SequentialState {
  private q: Signal = ['x'];

  evaluate(inputs: Record<string, Signal>): Record<string, Signal> {
    const s_bar = inputs.s ?? HIGH;  // active-low set
    const r_bar = inputs.r ?? HIGH;  // active-low reset

    const sb = getBit(s_bar, 0), rb = getBit(r_bar, 0);

    if (sb === 0 && rb === 1)       { this.q = HIGH; }
    else if (sb === 1 && rb === 0)  { this.q = LOW; }
    else if (sb === 0 && rb === 0)  { this.q = ['x']; }
    // sb=1, rb=1 → hold

    return this._out();
  }

  private _out() { return { q: this.q, q_bar: sigNot(this.q) }; }
  getOutputs()   { return this._out(); }
  reset()        { this.q = ['x']; }
}

// ── 4-bit Asynchronous Counter (74HC93) ──────────────────────────────────
// CLK A: clocks QA (first flip-flop, divide-by-2)
// CLK B: clocks QB–QD (divide-by-8, uses QA as input)
// R01, R02: master reset (both HIGH → Q=0000)
// For a 4-bit mod-16 counter: connect QA to CLK B externally.

export class Counter4BitAsyncState implements SequentialState {
  private count = 0;
  private lastClkA: 0 | 1 | 'x' = 'x';
  private lastClkB: 0 | 1 | 'x' = 'x';
  private qa = 0;   // QA driven by CLK A

  evaluate(inputs: Record<string, Signal>): Record<string, Signal> {
    const clkA = inputs.clk_a ?? ['x'];
    const clkB = inputs.clk_b ?? ['x'];
    const r01  = inputs.r01   ?? LOW;
    const r02  = inputs.r02   ?? LOW;

    // Master reset: both reset inputs HIGH
    if (getBit(r01, 0) === 1 && getBit(r02, 0) === 1) {
      this.count = 0; this.qa = 0;
      this.lastClkA = 'x'; this.lastClkB = 'x';
      return this._out();
    }

    // QA: toggle on falling edge of CLK A
    const curA = getBit(clkA, 0);
    if (curA === 0 && this.lastClkA === 1) {
      this.qa = this.qa ^ 1;
    }
    this.lastClkA = curA as 0 | 1 | 'x';

    // QB–QD: toggle on falling edge of CLK B (externally usually QA)
    const curB = getBit(clkB, 0);
    if (curB === 0 && this.lastClkB === 1) {
      this.count = (this.count + 1) & 0x7;  // 3-bit counter for QB,QC,QD
    }
    this.lastClkB = curB as 0 | 1 | 'x';

    return this._out();
  }

  private _out() {
    const qa: Signal = [this.qa as 0|1];
    const qb: Signal = [((this.count >> 0) & 1) as 0|1];
    const qc: Signal = [((this.count >> 1) & 1) as 0|1];
    const qd: Signal = [((this.count >> 2) & 1) as 0|1];
    return { qa, qb, qc, qd };
  }

  getOutputs() { return this._out(); }
  reset() { this.count = 0; this.qa = 0; this.lastClkA = 'x'; this.lastClkB = 'x'; }
}

// ── 4-bit Synchronous Counter (74HC161) ──────────────────────────────────
// Rising-edge clocked. Parallel load on LD_bar=0. Count when ENP=ENT=1.
// CLR_bar=0: async clear.
// RCO: ripple carry out = 1 when count=15 and ENT=1.

export class Counter4BitSyncState implements SequentialState {
  private count   = 0;
  private lastClk: 0 | 1 | 'x' = 'x';
  private lastEnt: 0 | 1 | 'x' = 0;  // store last ENT for RCO in getOutputs()

  evaluate(inputs: Record<string, Signal>): Record<string, Signal> {
    const clk    = inputs.clk     ?? ['x'];
    const clr_b  = inputs.clr_bar ?? HIGH;
    const ld_b   = inputs.ld_bar  ?? HIGH;
    const enp    = inputs.enp     ?? LOW;
    const ent    = inputs.ent     ?? LOW;
    const d      = inputs.d       ?? sigX(4);   // parallel load data

    // Store ENT for RCO calculation
    this.lastEnt = getBit(ent, 0) as 0 | 1 | 'x';

    // Async clear
    if (getBit(clr_b, 0) === 0) {
      this.count = 0; this.lastClk = 'x';
      return this._out();
    }

    const curClk = getBit(clk, 0);
    const edge   = curClk === 1 && this.lastClk === 0;  // rising edge
    this.lastClk = curClk as 0 | 1 | 'x';

    if (edge) {
      if (getBit(ld_b, 0) === 0) {
        // Parallel load
        if (isFullyDefined(d)) {
          this.count = 0;
          for (let i = 0; i < 4; i++) this.count |= (d[i] as number) << i;
        }
      } else if (getBit(enp, 0) === 1 && getBit(ent, 0) === 1) {
        // Count
        this.count = (this.count + 1) & 0xF;
      }
    }

    return this._out();
  }

  private _out() {
    const q: Signal = [
      ((this.count >> 0) & 1) as 0|1,
      ((this.count >> 1) & 1) as 0|1,
      ((this.count >> 2) & 1) as 0|1,
      ((this.count >> 3) & 1) as 0|1,
    ];
    // RCO = HIGH when count=15 AND ENT=1
    const rco: Signal = [this.count === 15 && this.lastEnt === 1 ? 1 : 0];
    return { q, rco };
  }

  getOutputs() { return this._out(); }
  reset() { this.count = 0; this.lastClk = 'x'; this.lastEnt = 0; }
}

// ── 8-bit Register (74HC273) ─────────────────────────────────────────────
// 8 D flip-flops, common CLK (rising edge) and MR_bar (active-low master reset).

export class Register8BitState implements SequentialState {
  private q:       Signal = sigX(8);
  private lastClk: 0 | 1 | 'x' = 'x';

  evaluate(inputs: Record<string, Signal>): Record<string, Signal> {
    const d    = inputs.d    ?? sigX(8);
    const clk  = inputs.clk  ?? ['x'];
    const mr_b = inputs.mr_bar ?? HIGH;

    // Async master reset
    if (getBit(mr_b, 0) === 0) {
      this.q = sigX(8).map(() => 0) as Signal;
      this.lastClk = 'x';
      return { q: this.q };
    }

    const curClk = getBit(clk, 0);
    if (curClk === 1 && this.lastClk === 0) {
      this.q = d.slice(0, 8) as Signal;
    }
    this.lastClk = curClk as 0 | 1 | 'x';
    return { q: this.q };
  }

  getOutputs() { return { q: this.q }; }
  reset() { this.q = sigX(8); this.lastClk = 'x'; }
}

// ── Factory ───────────────────────────────────────────────────────────────

export function createSequentialState(type: string, config?: Record<string, unknown>): SequentialState | null {
  switch (type) {
    case 'dff':                   return new DffState(config as DffConfig ?? {});
    case 'jk-ff':                 return new JKFlipFlopState();
    case 'sr-latch':              return new SRLatchState();
    case 'counter-4bit-async':    return new Counter4BitAsyncState();
    case 'counter-4bit-sync':     return new Counter4BitSyncState();
    case 'register-8bit':
    case 'register-8bit-tri':     return new Register8BitState();
    default:                      return null;
  }
}

export const SEQUENTIAL_TYPES = new Set([
  'dff', 'jk-ff', 'sr-latch',
  'counter-4bit-async', 'counter-4bit-sync',
  'register-4bit', 'register-8bit', 'register-8bit-tri',
]);
