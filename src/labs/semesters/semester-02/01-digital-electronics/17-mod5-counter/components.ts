import { type ComponentInstance } from "@/labs/types";

/**
 * MOD-5 asynchronous (ripple) UP/DOWN counter
 *
 * Flip-flops : 2 x 74HC74 (3 D-FFs used), each wired as a toggle (D = Q-bar)
 * Clock chain: 74HC86 XOR   -> CLK(n+1) = Q(n) XOR U/D   (U/D=1 up, U/D=0 down)
 * Reset logic: 74HC08 AND, 74HC32 OR, 74HC00 NAND
 *   up   : state 101 detected  -> clear all FFs        -> 000
 *   down : state 111 detected  -> clear Q0, Q1 only    -> 100
 *   CLR01 = NAND( Q0.Q2 , (U/D + Q1) )
 *   CLR2  = NAND( U/D , Q0.Q2 )
 *
 * Layout (long breadboard, 60 cols):
 *   col  1        : CLK tie (row a), U/D tie (rows f-j)
 *   cols 2-8      : dff_a  (FF0 = Q0, FF1 = Q1)
 *   cols 10-16    : dff_b  (FF2 = Q2)
 *   cols 18-24    : xor1   (74HC86)
 *   cols 26-32    : and1   (74HC08)
 *   cols 34-40    : or1    (74HC32)
 *   cols 42-48    : nand1  (74HC00)
 *   cols 49-60    : three resistor + LED pairs (Q0, Q1, Q2)
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "long-breadboard" },

  // ── Instruments (use terminals / probes — never wires) ──────────────
  {
    id: "dc_psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 1 },
      { board: "bb", rail: "gnd_top", col: 3 },
    ],
  },
  {
    id: "fg1",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "g" },
    probes: [
      { board: "bb", col: 1, row: "a" }, // OUTPUT -> CLK tie
      { board: "bb", rail: "gnd_top", col: 1 }, // GND
    ],
  },

  // ── ICs ─────────────────────────────────────────────────────────────
  {
    id: "dff_a",
    type: "dff",
    bits: 1,
    initial: "0",
    mountedAt: { board: "bb", col: 2, row: "e" },
  },
  {
    id: "dff_b",
    type: "dff",
    bits: 1,
    initial: "0",
    mountedAt: { board: "bb", col: 10, row: "e" },
  },
  {
    id: "xor1",
    type: "xor-gate",
    mountedAt: { board: "bb", col: 18, row: "e" },
  },
  {
    id: "and1",
    type: "and-gate",
    mountedAt: { board: "bb", col: 26, row: "e" },
  },
  { id: "or1", type: "or-gate", mountedAt: { board: "bb", col: 34, row: "e" } },
  {
    id: "nand1",
    type: "nand-gate",
    mountedAt: { board: "bb", col: 42, row: "e" },
  },

  // ── Output indicators: resistor at col N, LED at col N+2 ────────────
  {
    id: "r_q0",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 49, row: "c" },
  },
  {
    id: "led_q0",
    type: "led",
    color: "red",
    mountedAt: { board: "bb", col: 51, row: "c" },
  },
  {
    id: "r_q1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 53, row: "c" },
  },
  {
    id: "led_q1",
    type: "led",
    color: "yellow",
    mountedAt: { board: "bb", col: 55, row: "c" },
  },
  {
    id: "r_q2",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 57, row: "c" },
  },
  {
    id: "led_q2",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 59, row: "c" },
  },

  // ── Clock input ─────────────────────────────────────────────────────
  {
    id: "w_clk",
    type: "wire",
    color: "white",
    from: { board: "bb", col: 1, row: "a" },
    to: { ic: "dff_a", pin: "1CLK" },
  },

  // ── Toggle feedback: D = Q-bar ──────────────────────────────────────
  {
    id: "w_d0",
    type: "wire",
    color: "purple",
    from: { ic: "dff_a", pin: "1QN" },
    to: { ic: "dff_a", pin: "1D" },
  },
  {
    id: "w_d1",
    type: "wire",
    color: "purple",
    from: { ic: "dff_a", pin: "2QN" },
    to: { ic: "dff_a", pin: "2D" },
  },
  {
    id: "w_d2",
    type: "wire",
    color: "purple",
    from: { ic: "dff_b", pin: "1QN" },
    to: { ic: "dff_b", pin: "1D" },
  },

  // ── Up/Down control: U/D tie (rows f–i) fed from VCC (up) ───────────
  {
    id: "w_ud_src",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 8 },
    to: { board: "bb", col: 1, row: "j" },
  },
  {
    id: "w_ud_x1",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 1, row: "f" },
    to: { ic: "xor1", pin: "1B" },
  },
  {
    id: "w_ud_x2",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 1, row: "g" },
    to: { ic: "xor1", pin: "2B" },
  },
  {
    id: "w_ud_or",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 1, row: "h" },
    to: { ic: "or1", pin: "1A" },
  },
  {
    id: "w_ud_nd",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 1, row: "i" },
    to: { ic: "nand1", pin: "2A" },
  },

  // ── Ripple clock chain through XOR ──────────────────────────────────
  {
    id: "w_q0_x1",
    type: "wire",
    color: "red",
    from: { ic: "dff_a", pin: "1Q" },
    to: { ic: "xor1", pin: "1A" },
  },
  {
    id: "w_x1_clk1",
    type: "wire",
    color: "white",
    from: { ic: "xor1", pin: "1Y" },
    to: { ic: "dff_a", pin: "2CLK" },
  },
  {
    id: "w_q1_x2",
    type: "wire",
    color: "blue",
    from: { ic: "dff_a", pin: "2Q" },
    to: { ic: "xor1", pin: "2A" },
  },
  {
    id: "w_x2_clk2",
    type: "wire",
    color: "white",
    from: { ic: "xor1", pin: "2Y" },
    to: { ic: "dff_b", pin: "1CLK" },
  },

  // ── Reset decoding ──────────────────────────────────────────────────
  {
    id: "w_q0_and",
    type: "wire",
    color: "red",
    from: { ic: "dff_a", pin: "1Q" },
    to: { ic: "and1", pin: "1A" },
  },
  {
    id: "w_q2_and",
    type: "wire",
    color: "green",
    from: { ic: "dff_b", pin: "1Q" },
    to: { ic: "and1", pin: "1B" },
  },
  {
    id: "w_q1_or",
    type: "wire",
    color: "blue",
    from: { ic: "dff_a", pin: "2Q" },
    to: { ic: "or1", pin: "1B" },
  },
  {
    id: "w_and_n1",
    type: "wire",
    color: "white",
    from: { ic: "and1", pin: "1Y" },
    to: { ic: "nand1", pin: "1A" },
  },
  {
    id: "w_and_n2",
    type: "wire",
    color: "white",
    from: { ic: "and1", pin: "1Y" },
    to: { ic: "nand1", pin: "2B" },
  },
  {
    id: "w_or_n1",
    type: "wire",
    color: "white",
    from: { ic: "or1", pin: "1Y" },
    to: { ic: "nand1", pin: "1B" },
  },
  {
    id: "w_clr0",
    type: "wire",
    color: "yellow",
    from: { ic: "nand1", pin: "1Y" },
    to: { ic: "dff_a", pin: "1CLR" },
  },
  {
    id: "w_clr1",
    type: "wire",
    color: "yellow",
    from: { ic: "nand1", pin: "1Y" },
    to: { ic: "dff_a", pin: "2CLR" },
  },
  {
    id: "w_clr2",
    type: "wire",
    color: "yellow",
    from: { ic: "nand1", pin: "2Y" },
    to: { ic: "dff_b", pin: "1CLR" },
  },

  // ── Presets held inactive (active-low, tied to VCC) ─────────────────
  {
    id: "w_pre0",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 10 },
    to: { ic: "dff_a", pin: "1PRE" },
  },
  {
    id: "w_pre1",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 12 },
    to: { ic: "dff_a", pin: "2PRE" },
  },
  {
    id: "w_pre2",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 14 },
    to: { ic: "dff_b", pin: "1PRE" },
  },

  // ── Output indicators ───────────────────────────────────────────────
  {
    id: "w_q0_r",
    type: "wire",
    color: "red",
    from: { ic: "dff_a", pin: "1Q" },
    to: { component: "r_q0", end: "p1" },
  },
  {
    id: "w_r0_led",
    type: "wire",
    color: "red",
    from: { component: "r_q0", end: "p2" },
    to: { led: "led_q0", end: "anode" },
  },
  {
    id: "w_q1_r",
    type: "wire",
    color: "yellow",
    from: { ic: "dff_a", pin: "2Q" },
    to: { component: "r_q1", end: "p1" },
  },
  {
    id: "w_r1_led",
    type: "wire",
    color: "yellow",
    from: { component: "r_q1", end: "p2" },
    to: { led: "led_q1", end: "anode" },
  },
  {
    id: "w_q2_r",
    type: "wire",
    color: "green",
    from: { ic: "dff_b", pin: "1Q" },
    to: { component: "r_q2", end: "p1" },
  },
  {
    id: "w_r2_led",
    type: "wire",
    color: "green",
    from: { component: "r_q2", end: "p2" },
    to: { led: "led_q2", end: "anode" },
  },
  {
    id: "w_gnd0",
    type: "wire",
    color: "black",
    from: { led: "led_q0", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 49 },
  },
  {
    id: "w_gnd1",
    type: "wire",
    color: "black",
    from: { led: "led_q1", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 53 },
  },
  {
    id: "w_gnd2",
    type: "wire",
    color: "black",
    from: { led: "led_q2", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 57 },
  },
];
