// ── Breadboard Netlist ─────────────────────────────────────────────────────
//
// A "net" is a set of holes (and component pins) that are electrically shorted
// together. On a real breadboard the rules are:
//
//   1. COLUMN NETS: Every hole in the same column, same bank (a–e or f–j),
//      is connected. Col 5 rows a/b/c/d/e = one net. Col 5 rows f/g/h/i/j =
//      a different net. These are the "tie-point" nets.
//
//   2. RAIL NETS: All holes in a power rail (rail_top_red, rail_top_blue,
//      rail_bot_red, rail_bot_blue) form one net each.
//
//   3. WIRE UNION: A wire component bridging hole X → hole Y merges both
//      holes' nets into one. We use a union-find (disjoint set) structure.
//
//   4. COMPONENT LEADS: Each lead of a component (IC pin, resistor lead,
//      LED anode/cathode) sits in a specific hole — that pin becomes part of
//      that hole's net. Components don't merge nets; they just *observe* them.
//
// After building the netlist you can ask:
//   • netOf(col, row)              → net id for a tie-point hole
//   • netOfRail(rail)              → net id for a power rail
//   • componentPinNet(id, pin)     → net id for a named component pin
//   • nets: Map<netId, NetInfo>    → all net information

import { COLS, Z } from './coords';
import { type ComponentInstance, type Row } from './types';

// ── Net identity ──────────────────────────────────────────────────────────
// A net id is a stable string key. Human-readable form preferred.
export type NetId = string;

export const NET_VCC = '__vcc';  // VCC rail net (driven HIGH = 1)
export const NET_GND = '__gnd';  // GND rail net (driven LOW  = 0)

// Signal values on a net: 1 = HIGH, 0 = LOW, undefined = floating/unknown
export type Signal = 1 | 0 | undefined;

export interface NetInfo {
  id:    NetId;
  holes: string[];   // "col:row" or "rail:name" descriptors for debugging
}

// ── Union-Find ────────────────────────────────────────────────────────────
// Merges sets efficiently. Path-compressed for performance.
class UnionFind {
  private parent = new Map<string, string>();
  private rank   = new Map<string, number>();

  // Ensure a key exists
  ensure(key: string): string {
    if (!this.parent.has(key)) {
      this.parent.set(key, key);
      this.rank.set(key, 0);
    }
    return key;
  }

  find(key: string): string {
    this.ensure(key);
    let root = key;
    while (this.parent.get(root) !== root) {
      root = this.parent.get(root)!;
    }
    // Path compression
    let cur = key;
    while (cur !== root) {
      const next = this.parent.get(cur)!;
      this.parent.set(cur, root);
      cur = next;
    }
    return root;
  }

  union(a: string, b: string): void {
    const ra = this.find(a), rb = this.find(b);
    if (ra === rb) return;
    const rankA = this.rank.get(ra) ?? 0;
    const rankB = this.rank.get(rb) ?? 0;
    if (rankA < rankB) { this.parent.set(ra, rb); }
    else if (rankA > rankB) { this.parent.set(rb, ra); }
    else { this.parent.set(rb, ra); this.rank.set(ra, rankA + 1); }
  }

  // Get all unique roots
  roots(): Set<string> {
    const r = new Set<string>();
    for (const k of this.parent.keys()) r.add(this.find(k));
    return r;
  }
}

// ── Row-bank helper ────────────────────────────────────────────────────────
// Rows a–e are the TOP bank; rows f–j are the BOTTOM bank.
// Holes in the same column AND same bank share a net.
const TOP_BANK = new Set(['a','b','c','d','e']);
const BOT_BANK = new Set(['f','g','h','i','j']);

function bankOf(row: Row): 'top' | 'bot' {
  return TOP_BANK.has(row) ? 'top' : 'bot';
}

// Key for a tie-point hole: "col:bank"
function tieKey(col: number, row: Row): string {
  return `tie:${col}:${bankOf(row)}`;
}

// Key for a power rail
function railKey(rail: 'vcc_top' | 'gnd_top' | 'vcc_bot' | 'gnd_bot'): string {
  return `rail:${rail}`;
}

// ── The main Netlist class ─────────────────────────────────────────────────
export class Netlist {
  private uf    = new UnionFind();
  // component pin → net root at build time (resolved after all unions)
  private pinNets = new Map<string, string>();  // "compId:pin" → uf key

  constructor(components: ComponentInstance[]) {
    this.seed(components);
  }

  // ── Seed: initialise all known keys ───────────────────────────────────
  private seed(components: ComponentInstance[]) {
    // 1. All tie-point column–bank keys
    for (let col = 1; col <= COLS; col++) {
      for (const bank of ['top','bot'] as const) {
        this.uf.ensure(`tie:${col}:${bank}`);
      }
    }

    // 2. Rail keys — fixed semantics
    for (const r of ['vcc_top','gnd_top','vcc_bot','gnd_bot'] as const) {
      this.uf.ensure(railKey(r));
    }
    // VCC rails are all HIGH — keep them separate nets (don't merge top/bot unless a wire does)
    // GND rails similarly. But we name the canonical vcc_top as NET_VCC proxy etc.
    // Actually: keep them as independent rails unless the circuit wires them together.

    // 3. Process all components
    for (const inst of components) {
      switch (inst.type) {
        case 'breadboard': break;  // already seeded above

        case 'wire': {
          const fromKey = this.resolveEndpointKey(inst.from, components);
          const toKey   = this.resolveEndpointKey(inst.to,   components);
          if (fromKey && toKey) this.uf.union(fromKey, toKey);
          break;
        }

        case 'resistor':
        case 'capacitor':
        case 'inductor': {
          // Register p1 and p2 as SEPARATE nets — do NOT union them.
          // Signals propagate through passives explicitly in simulate.ts,
          // which avoids creating unintended shorts between components that
          // happen to share the same column.
          const { col, row } = inst.mountedAt;
          this.registerPin(inst.id, 'p1', tieKey(col,     row as Row));
          this.registerPin(inst.id, 'p2', tieKey(col + 3, row as Row));
          break;
        }

        case 'led': {
          const { col, row } = inst.mountedAt;
          this.registerPin(inst.id, 'anode',   tieKey(col,     row as Row));
          this.registerPin(inst.id, 'cathode',  tieKey(col + 1, row as Row));
          break;
        }

        // ICs: use the real 74HC DIP-14 pinout
        // For a gate IC placed at mountedAt.col, the physical holes are:
        //   Top bank (row e): cols mountedAt.col … mountedAt.col+6  (pins 1–7 left side)
        //   Bot bank (row f): cols mountedAt.col … mountedAt.col+6  (pins 8–14 right side, mirrored)
        // Pin numbering for a DIP-14 looking from top (notch at left):
        //   Pin 1 → (col,   e)   Pin 14 → (col,   f)
        //   Pin 2 → (col+1, e)   Pin 13 → (col+1, f)
        //   ...
        //   Pin 7 → (col+6, e)   Pin 8  → (col+6, f)

        case 'xor-gate': {
          this.registerDip14Logic(inst.id, inst.mountedAt.col, inst.mountedAt.row as Row);
          break;
        }
        case 'and-gate':
        case 'or-gate':
        case 'nand-gate':
        case 'nor-gate':
        case 'xnor-gate':
        case 'buffer-gate': {
          this.registerDip14Logic(inst.id, inst.mountedAt.col, inst.mountedAt.row as Row);
          break;
        }
        case 'not-gate': {
          this.registerDip14Not(inst.id, inst.mountedAt.col, inst.mountedAt.row as Row);
          break;
        }

        // ── Passives ───────────────────────────────────────────────────
        case 'inductor': {
          const { col, row } = inst.mountedAt;
          this.registerPin(inst.id, 'p1', tieKey(col,     row as Row));
          this.registerPin(inst.id, 'p2', tieKey(col + 3, row as Row));
          break;
        }
        case 'diode': {
          const { col, row } = inst.mountedAt;
          this.registerPin(inst.id, 'anode',   tieKey(col,     row as Row));
          this.registerPin(inst.id, 'cathode', tieKey(col + 1, row as Row));
          break;
        }
        case 'zener': {
          const { col, row } = inst.mountedAt;
          this.registerPin(inst.id, 'anode',   tieKey(col,     row as Row));
          this.registerPin(inst.id, 'cathode', tieKey(col + 1, row as Row));
          break;
        }

        // ── BJT transistors (TO-92: E-B-C left to right) ──────────────
        case 'npn-bjt':
        case 'pnp-bjt': {
          const { col, row } = inst.mountedAt;
          this.registerPin(inst.id, 'E', tieKey(col,     row as Row));
          this.registerPin(inst.id, 'B', tieKey(col + 1, row as Row));
          this.registerPin(inst.id, 'C', tieKey(col + 2, row as Row));
          break;
        }

        // ── MOSFETs (TO-92: S-G-D left to right) ──────────────────────
        case 'n-mosfet':
        case 'p-mosfet': {
          const { col, row } = inst.mountedAt;
          this.registerPin(inst.id, 'S', tieKey(col,     row as Row));
          this.registerPin(inst.id, 'G', tieKey(col + 1, row as Row));
          this.registerPin(inst.id, 'D', tieKey(col + 2, row as Row));
          break;
        }

        // ── D flip-flop 74HC74 — DIP-14 ───────────────────────────────
        // Pin layout:
        //  e-bank: CLR1_bar=p1, D1=p2, CLK1=p3, SET1_bar=p4, Q1=p5, Q1_bar=p6, GND=p7
        //  f-bank: VCC=p14, CLR2_bar=p13, D2=p12, CLK2=p11, SET2_bar=p10, Q2=p9, Q2_bar=p8
        case 'dff': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'clr_bar',  tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'in',        tieKey(c + 1, 'e')); // D
          this.registerPin(inst.id, 'clk',       tieKey(c + 2, 'e'));
          this.registerPin(inst.id, 'set_bar',   tieKey(c + 3, 'e'));
          this.registerPin(inst.id, 'out',       tieKey(c + 4, 'e')); // Q
          this.registerPin(inst.id, 'q_bar',     tieKey(c + 5, 'e'));
          this.registerPin(inst.id, 'GND',       tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'VCC',       tieKey(c + 0, 'f'));
          // Gate 2 (second FF in same package)
          this.registerPin(inst.id, 'clr_bar2', tieKey(c + 1, 'f'));
          this.registerPin(inst.id, 'in2',       tieKey(c + 2, 'f'));
          this.registerPin(inst.id, 'clk2',      tieKey(c + 3, 'f'));
          this.registerPin(inst.id, 'set_bar2',  tieKey(c + 4, 'f'));
          this.registerPin(inst.id, 'out2',      tieKey(c + 5, 'f'));
          this.registerPin(inst.id, 'q_bar2',    tieKey(c + 6, 'f'));
          break;
        }

        // ── JK flip-flop 74HC76 — DIP-16 ──────────────────────────────
        // Pin layout:
        //  e-bank: CLK1=p1, SET1_bar=p2, K1=p3, VCC=p4(offset), J1=p5, Q1_bar=p6, Q1=p7, GND=p8
        //  f-bank: J2=p9, Q2=p10, Q2_bar=p11, CLK2=p12, SET2_bar=p13, K2=p14, CLR2_bar=p15, CLR1_bar=p16(skipped for DIP-14 span)
        case 'jk-ff': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'clk',      tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'set',      tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'k',        tieKey(c + 2, 'e'));
          this.registerPin(inst.id, 'j',        tieKey(c + 3, 'e'));
          this.registerPin(inst.id, 'q_bar',    tieKey(c + 4, 'e'));
          this.registerPin(inst.id, 'out',      tieKey(c + 5, 'e')); // Q
          this.registerPin(inst.id, 'GND',      tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'VCC',      tieKey(c + 0, 'f'));
          this.registerPin(inst.id, 'clr',      tieKey(c + 1, 'f'));
          break;
        }

        // ── SR latch 74HC279 — DIP-16 ─────────────────────────────────
        // 4 SR latches, active-low S and R inputs
        case 'sr-latch': {
          const c = inst.mountedAt.col;
          // Latch 1
          this.registerPin(inst.id, 's',   tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'r',   tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'q',   tieKey(c + 2, 'e'));
          // Latch 2
          this.registerPin(inst.id, 's2',  tieKey(c + 3, 'e'));
          this.registerPin(inst.id, 'r2',  tieKey(c + 4, 'e'));
          this.registerPin(inst.id, 'q2',  tieKey(c + 5, 'e'));
          this.registerPin(inst.id, 'GND', tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'VCC', tieKey(c + 0, 'f'));
          break;
        }

        // ── 4-bit adder 74HC283 — DIP-16 ──────────────────────────────
        // e-bank: S2=p1, B2=p2, A2=p3, S1=p4, A1=p5, B1=p6, C0=p7, GND=p8
        // f-bank: VCC=p16, C4=p15, S4=p14, A4=p13, B4=p12, S3=p11, A3=p10, B3=p9
        case 'adder-4bit': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 's2', tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'b2', tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'a2', tieKey(c + 2, 'e'));
          this.registerPin(inst.id, 's1', tieKey(c + 3, 'e'));
          this.registerPin(inst.id, 'a1', tieKey(c + 4, 'e'));
          this.registerPin(inst.id, 'b1', tieKey(c + 5, 'e'));
          this.registerPin(inst.id, 'c0', tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'GND',tieKey(c + 7, 'e'));
          this.registerPin(inst.id, 'VCC',tieKey(c + 0, 'f'));
          this.registerPin(inst.id, 'c4', tieKey(c + 1, 'f'));
          this.registerPin(inst.id, 's4', tieKey(c + 2, 'f'));
          this.registerPin(inst.id, 'a4', tieKey(c + 3, 'f'));
          this.registerPin(inst.id, 'b4', tieKey(c + 4, 'f'));
          this.registerPin(inst.id, 's3', tieKey(c + 5, 'f'));
          this.registerPin(inst.id, 'a3', tieKey(c + 6, 'f'));
          this.registerPin(inst.id, 'b3', tieKey(c + 7, 'f'));
          break;
        }

        // ── 74HC153: Dual 4:1 MUX — DIP-16 ──────────────────────────
        // e-bank: EN1_bar=p1, S1=p2, I3_1=p3, I2_1=p4, I1_1=p5, I0_1=p6, Y1=p7, GND=p8
        // f-bank: VCC=p16, S0=p15, Y2=p14, I0_2=p13, I1_2=p12, I2_2=p11, I3_2=p10, EN2_bar=p9
        case 'mux-4to1': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'en1_bar', tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 's1',      tieKey(c + 1, 'e'));  // MSB of select
          this.registerPin(inst.id, 'i3_1',    tieKey(c + 2, 'e'));
          this.registerPin(inst.id, 'i2_1',    tieKey(c + 3, 'e'));
          this.registerPin(inst.id, 'i1_1',    tieKey(c + 4, 'e'));
          this.registerPin(inst.id, 'i0_1',    tieKey(c + 5, 'e'));
          this.registerPin(inst.id, 'y1',      tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'GND',     tieKey(c + 7, 'e'));
          this.registerPin(inst.id, 'VCC',     tieKey(c + 0, 'f'));
          this.registerPin(inst.id, 's0',      tieKey(c + 1, 'f'));  // LSB of select
          this.registerPin(inst.id, 'y2',      tieKey(c + 2, 'f'));
          this.registerPin(inst.id, 'i0_2',    tieKey(c + 3, 'f'));
          this.registerPin(inst.id, 'i1_2',    tieKey(c + 4, 'f'));
          this.registerPin(inst.id, 'i2_2',    tieKey(c + 5, 'f'));
          this.registerPin(inst.id, 'i3_2',    tieKey(c + 6, 'f'));
          this.registerPin(inst.id, 'en2_bar', tieKey(c + 7, 'f'));
          break;
        }

        // ── 74HC139: Dual 2:4 DEMUX — DIP-16 ────────────────────────
        // e-bank: EN1_bar=p1, A1=p2, B1=p3, Y0_1=p4, Y1_1=p5, Y2_1=p6, Y3_1=p7, GND=p8
        // f-bank: VCC=p16, EN2_bar=p15, A2=p14, B2=p13, Y0_2=p12, Y1_2=p11, Y2_2=p10, Y3_2=p9
        case 'demux-1to4': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'en_bar', tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'a',      tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'b',      tieKey(c + 2, 'e'));
          this.registerPin(inst.id, 'y0',     tieKey(c + 3, 'e'));
          this.registerPin(inst.id, 'y1',     tieKey(c + 4, 'e'));
          this.registerPin(inst.id, 'y2',     tieKey(c + 5, 'e'));
          this.registerPin(inst.id, 'y3',     tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'GND',    tieKey(c + 7, 'e'));
          this.registerPin(inst.id, 'VCC',    tieKey(c + 0, 'f'));
          break;
        }

        // ── 74HC138: 3:8 Decoder/DEMUX — DIP-16 ─────────────────────
        // e-bank: A=p1, B=p2, C=p3, E2_bar=p4, E3_bar=p5, E1=p6, Y7=p7, GND=p8
        // f-bank: VCC=p16, Y0=p15, Y1=p14, Y2=p13, Y3=p12, Y4=p11, Y5=p10, Y6=p9
        case 'demux-1to8':
        case 'decoder-3to8': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'a0',  tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'a1',  tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'a2',  tieKey(c + 2, 'e'));
          this.registerPin(inst.id, 'e2',  tieKey(c + 3, 'e'));  // active-low
          this.registerPin(inst.id, 'e3',  tieKey(c + 4, 'e'));  // active-low
          this.registerPin(inst.id, 'e1',  tieKey(c + 5, 'e'));  // active-high
          this.registerPin(inst.id, 'y7',  tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'GND', tieKey(c + 7, 'e'));
          this.registerPin(inst.id, 'VCC', tieKey(c + 0, 'f'));
          this.registerPin(inst.id, 'y0',  tieKey(c + 1, 'f'));
          this.registerPin(inst.id, 'y1',  tieKey(c + 2, 'f'));
          this.registerPin(inst.id, 'y2',  tieKey(c + 3, 'f'));
          this.registerPin(inst.id, 'y3',  tieKey(c + 4, 'f'));
          this.registerPin(inst.id, 'y4',  tieKey(c + 5, 'f'));
          this.registerPin(inst.id, 'y5',  tieKey(c + 6, 'f'));
          this.registerPin(inst.id, 'y6',  tieKey(c + 7, 'f'));
          break;
        }

        // ── 74HC148: Priority Encoder 8:3 — DIP-16 ───────────────────
        case 'encoder-8to3': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'i4',  tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'i5',  tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'i6',  tieKey(c + 2, 'e'));
          this.registerPin(inst.id, 'i7',  tieKey(c + 3, 'e'));
          this.registerPin(inst.id, 'ei',  tieKey(c + 4, 'e'));
          this.registerPin(inst.id, 'a2',  tieKey(c + 5, 'e'));
          this.registerPin(inst.id, 'a1',  tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'GND', tieKey(c + 7, 'e'));
          this.registerPin(inst.id, 'VCC', tieKey(c + 0, 'f'));
          this.registerPin(inst.id, 'a0',  tieKey(c + 1, 'f'));
          this.registerPin(inst.id, 'gs',  tieKey(c + 2, 'f'));
          this.registerPin(inst.id, 'eo',  tieKey(c + 3, 'f'));
          this.registerPin(inst.id, 'i3',  tieKey(c + 4, 'f'));
          this.registerPin(inst.id, 'i2',  tieKey(c + 5, 'f'));
          this.registerPin(inst.id, 'i1',  tieKey(c + 6, 'f'));
          this.registerPin(inst.id, 'i0',  tieKey(c + 7, 'f'));
          break;
        }

        // ── 4-bit async counter 74HC93 — DIP-14 ──────────────────────
        case 'counter-4bit-async': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'clk_b', tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'r01',   tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'r02',   tieKey(c + 2, 'e'));
          this.registerPin(inst.id, 'GND',   tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'qd',    tieKey(c + 2, 'f'));
          this.registerPin(inst.id, 'qc',    tieKey(c + 3, 'f'));
          this.registerPin(inst.id, 'qb',    tieKey(c + 4, 'f'));
          this.registerPin(inst.id, 'VCC',   tieKey(c + 5, 'f'));
          this.registerPin(inst.id, 'qa',    tieKey(c + 6, 'f'));
          this.registerPin(inst.id, 'clk_a', tieKey(c + 0, 'f'));
          break;
        }

        // ── 4-bit sync counter 74HC161 — DIP-16 ──────────────────────
        case 'counter-4bit-sync': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'clr_bar', tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'clk',     tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'd0',      tieKey(c + 2, 'e'));  // parallel load data
          this.registerPin(inst.id, 'd1',      tieKey(c + 3, 'e'));
          this.registerPin(inst.id, 'd2',      tieKey(c + 4, 'e'));
          this.registerPin(inst.id, 'd3',      tieKey(c + 5, 'e'));
          this.registerPin(inst.id, 'enp',     tieKey(c + 6, 'e'));
          this.registerPin(inst.id, 'GND',     tieKey(c + 7, 'e'));
          this.registerPin(inst.id, 'VCC',     tieKey(c + 0, 'f'));
          this.registerPin(inst.id, 'q0',      tieKey(c + 1, 'f'));
          this.registerPin(inst.id, 'q1',      tieKey(c + 2, 'f'));
          this.registerPin(inst.id, 'q2',      tieKey(c + 3, 'f'));
          this.registerPin(inst.id, 'q3',      tieKey(c + 4, 'f'));
          this.registerPin(inst.id, 'rco',     tieKey(c + 5, 'f'));
          this.registerPin(inst.id, 'ent',     tieKey(c + 6, 'f'));
          this.registerPin(inst.id, 'ld_bar',  tieKey(c + 7, 'f'));
          break;
        }

        // ── 8-bit register 74HC273 — DIP-20 ──────────────────────────
        case 'register-8bit':
        case 'register-8bit-tri': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'mr_bar', tieKey(c + 0, 'e'));
          for (let i = 0; i < 8; i++) {
            this.registerPin(inst.id, `d${i}`, tieKey(c + 1 + i, 'e'));
          }
          this.registerPin(inst.id, 'GND', tieKey(c + 9, 'e'));
          this.registerPin(inst.id, 'VCC', tieKey(c + 0, 'f'));
          this.registerPin(inst.id, 'clk', tieKey(c + 1, 'f'));
          for (let i = 0; i < 8; i++) {
            this.registerPin(inst.id, `q${i}`, tieKey(c + 2 + i, 'f'));
          }
          break;
        }

        // ── Virtual / generic components ──────────────────────────────
        case 'adder':
        case 'subtractor':
        case 'multiplier':
        case 'negator':
        case 'compare-eq': case 'compare-ne':
        case 'compare-lt': case 'compare-le':
        case 'compare-gt': case 'compare-ge':
        case 'shift-left': case 'shift-right': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'in1', tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'in2', tieKey(c + 1, 'e'));
          this.registerPin(inst.id, 'in',  tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'out', tieKey(c + 2, 'f'));
          break;
        }
        case 'zero-extend':
        case 'sign-extend':
        case 'bus-slice': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'in',  tieKey(c + 0, 'e'));
          this.registerPin(inst.id, 'out', tieKey(c + 1, 'f'));
          break;
        }
        case 'mux': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'sel', tieKey(c + 0, 'e'));
          for (let i = 0; i < 8; i++) {
            this.registerPin(inst.id, `in${i}`, tieKey(c + 1 + i, 'e'));
          }
          this.registerPin(inst.id, 'out', tieKey(c + 0, 'f'));
          break;
        }
        case 'constant': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'out', tieKey(c, 'e'));
          break;
        }
        case 'input-node': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'out', tieKey(c, 'e'));
          break;
        }
        case 'output-node': {
          const c = inst.mountedAt.col;
          this.registerPin(inst.id, 'in', tieKey(c, 'e'));
          break;
        }

        // ── Unmodelled physically (render only) ───────────────────────
        case 'potentiometer':
        case 'push-button':
        case 'switch':
        case 'dip-switch':
        case 'battery':
        case 'dc-jack':
        case 'op-amp':
        case 'cpu-8085':
        case 'ppi-8255':
        case 'bus-transceiver':
        case 'address-latch':
        case '7seg-display':
        case 'rgb-led':
        case 'clock':
        case 'bus-group':
        case 'bus-ungroup':
        case 'mux-2to1-ic':
        case 'and-reduce': case 'or-reduce': case 'nand-reduce':
        case 'nor-reduce': case 'xor-reduce': case 'xnor-reduce':
        case 'register-4bit': break;
      }   // end switch
    }     // end for
  }       // end seed()

  // ── DIP-14 Quad 2-input gate pinout (XOR/AND/OR/NAND/NOR) ────────────
  //
  //  Pin layout (top view, notch at LEFT = pin 1 side):
  //
  //  Col offset:  0    1    2    3    4    5    6
  //  Row e (top): p1   p2   p3   p4   p5   p6   p7(GND)
  //  Row f (bot): p14  p13  p12  p11  p10  p9   p8
  //
  //  Gate 1: 1A=p1(col+0,e), 1B=p2(col+1,e), 1Y=p3(col+2,e)
  //  Gate 2: 2A=p4(col+3,e), 2B=p5(col+4,e), 2Y=p6(col+5,e)
  //  GND:    p7(col+6,e)
  //  VCC:    p14(col+0,f)
  //  Gate 4: 4Y=p13(col+1,sideB), 4B=p12(col+2,sideB), 4A=p11(col+3,sideB)
  //  Gate 3: 3Y=p10(col+4,sideB), 3B=p9(col+5,sideB),  3A=p8(col+6,sideB)
  //
  //  We only register GATE 1 and POWER pins here. Gate2/3/4 are not registered
  //  because no current circuit file uses them, and their physical hole coords
  //  would accidentally overlap with resistors/LEDs and corrupt the simulation.
  private registerDip14Logic(id: string, col: number, mountRow: Row = 'e') {
    const sideA = mountRow;
    const sideB: Row = sideA === 'e' ? 'f' :
                       sideA === 'h' ? 'i' :
                       sideA === 'd' ? 'g' :
                       sideA === 'c' ? 'h' : 'f';

    // Gate 1 — the only gate used in our circuit files
    this.registerPin(id, '1A', tieKey(col + 0, sideA));
    this.registerPin(id, '1B', tieKey(col + 1, sideA));
    this.registerPin(id, '1Y', tieKey(col + 2, sideA));

    // Power pins
    this.registerPin(id, 'GND', tieKey(col + 6, sideA));
    this.registerPin(id, 'VCC', tieKey(col + 0, sideB));

    // Aliases for legacy circuit files ('A','B','Y' = gate1)
    this.registerPin(id, 'A', tieKey(col + 0, sideA));
    this.registerPin(id, 'B', tieKey(col + 1, sideA));
    this.registerPin(id, 'Y', tieKey(col + 2, sideA));
  }

  // 74HC04: Hex inverter DIP-14
  private registerDip14Not(id: string, col: number, mountRow: Row = 'e') {
    const sideA = mountRow;
    const sideB: Row = sideA === 'e' ? 'f' :
                       sideA === 'h' ? 'i' :
                       sideA === 'd' ? 'g' :
                       sideA === 'c' ? 'h' : 'f';

    // Gate 1 only
    this.registerPin(id, '1A', tieKey(col + 0, sideA));
    this.registerPin(id, '1Y', tieKey(col + 1, sideA));

    // Power
    this.registerPin(id, 'GND', tieKey(col + 6, sideA));
    this.registerPin(id, 'VCC', tieKey(col + 0, sideB));

    // Aliases
    this.registerPin(id, 'A', tieKey(col + 0, sideA));
    this.registerPin(id, 'Y', tieKey(col + 1, sideA));
  }

  private registerPin(compId: string, pin: string, ufKey: string) {
    this.uf.ensure(ufKey);
    this.pinNets.set(`${compId}:${pin}`, ufKey);
  }

  // ── Endpoint key resolver (for wires) ────────────────────────────────
  private resolveEndpointKey(
    endpoint: unknown,
    _all: ComponentInstance[],
  ): string | null {
    const ep = endpoint as Record<string, unknown>;

    // TiePin: { board, col, row }
    if ('col' in ep && 'row' in ep) {
      return tieKey(ep.col as number, ep.row as Row);
    }

    // RailPin: { board, rail, col }
    if ('rail' in ep) {
      return railKey(ep.rail as 'vcc_top' | 'gnd_top' | 'vcc_bot' | 'gnd_bot');
    }

    // IcPin: { ic, pin }
    if ('ic' in ep) {
      const icId = ep.ic as string;
      const pin  = ep.pin as string;
      const key  = this.pinNets.get(`${icId}:${pin}`);
      return key ?? null;
    }

    // PassivePin: { component, end }
    if ('component' in ep) {
      const cId = ep.component as string;
      const end = ep.end as 'p1' | 'p2';
      return this.pinNets.get(`${cId}:${end}`) ?? null;
    }

    // LedPin: { led, end }
    if ('led' in ep) {
      const lId = ep.led as string;
      const end = ep.end as 'anode' | 'cathode';
      return this.pinNets.get(`${lId}:${end}`) ?? null;
    }

    return null;
  }

  // ── Public query API ──────────────────────────────────────────────────

  /** Net id (root) for a tie-point hole */
  netOf(col: number, row: Row): NetId {
    return this.uf.find(tieKey(col, row));
  }

  /** Net id for a power rail */
  netOfRail(rail: 'vcc_top' | 'gnd_top' | 'vcc_bot' | 'gnd_bot'): NetId {
    return this.uf.find(railKey(rail));
  }

  /** Net id for a named component pin */
  componentPinNet(compId: string, pin: string): NetId | null {
    const key = this.pinNets.get(`${compId}:${pin}`);
    if (!key) return null;
    return this.uf.find(key);
  }

  /** All unique net roots */
  allNets(): NetId[] {
    return [...this.uf.roots()];
  }
}
