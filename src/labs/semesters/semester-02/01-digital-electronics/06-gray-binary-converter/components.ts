import { type ComponentInstance } from "@/labs/types";

/**
 * 4-Bit Binary to Gray Code Converter — 60-Column Long Breadboard Layout
 * -----------------------------------------------------------------------------
 * Conversion Equations:
 *   G₃ = B₃             (MSB pass-through)
 *   G₂ = B₃ ⊕ B₂        (produced by xor1)
 *   G₁ = B₂ ⊕ B₁        (produced by xor2)
 *   G₀ = B₁ ⊕ B₀        (produced by xor3)
 *
 * Components:
 *   - Long Breadboard (60 columns)
 *   - +5 V Regulated DC Power Supply (col 1, row a)
 *   - 3x 74HC86 XOR Gate IC packages (row e, spaced at cols 8, 22, 36)
 *   - 4x 330 Ω Current-limiting Resistors (row h, cols 12, 24, 38, 50)
 *   - 4x Output LEDs (row h, cols 16, 28, 42, 54):
 *       G₃: Red (col 16)
 *       G₂: Yellow (col 28)
 *       G₁: Green (col 42)
 *       G₀: Blue (col 54)
 */

export const components: ComponentInstance[] = [
  // ── Solderless Breadboard ──────────────────────────────────────────────────
  { id: "bb", type: "long-breadboard" },

  // ── Regulated DC Power Supply (+5 V trainer jack) ──────────────────────────
  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 1 },
      { board: "bb", rail: "gnd_top", col: 1 },
    ],
  },
  {
    id: "w_rail_link",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_top", col: 59 },
    to: { board: "bb", rail: "vcc_bot", col: 59 },
  },

  // ── Logic Gate IC Packages (Row e, straddling centre groove) ───────────────
  {
    id: "xor1",
    type: "xor-gate",
    mountedAt: { board: "bb", col: 8, row: "e" },
  },
  {
    id: "xor2",
    type: "xor-gate",
    mountedAt: { board: "bb", col: 22, row: "e" },
  },
  {
    id: "xor3",
    type: "xor-gate",
    mountedAt: { board: "bb", col: 36, row: "e" },
  },

  // ── Gate IC Power Connections (VCC → bottom rail, GND → top rail) ──────────
  // xor1
  {
    id: "w_vcc_xor1",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_bot", col: 8 },
    to: { board: "bb", col: 8, row: "f" },
  },
  {
    id: "w_gnd_xor1",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 14, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 14 },
  },

  // xor2
  {
    id: "w_vcc_xor2",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_bot", col: 22 },
    to: { board: "bb", col: 22, row: "f" },
  },
  {
    id: "w_gnd_xor2",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 28, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 28 },
  },

  // xor3
  {
    id: "w_vcc_xor3",
    type: "wire",
    color: "purple",
    from: { board: "bb", rail: "vcc_bot", col: 36 },
    to: { board: "bb", col: 36, row: "f" },
  },
  {
    id: "w_gnd_xor3",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 42, row: "e" },
    to: { board: "bb", rail: "gnd_top", col: 42 },
  },

  // ── Output Indicators (330 Ω Resistors + LEDs on Row h) ───────────────────
  // Bit G₃ (MSB) — Red LED
  {
    id: "r_g3",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 12, row: "h" },
  },
  {
    id: "led_g3",
    type: "led",
    color: "red",
    mountedAt: { board: "bb", col: 16, row: "h" },
  },

  // Bit G₂ — Yellow LED
  {
    id: "r_g2",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 24, row: "h" },
  },
  {
    id: "led_g2",
    type: "led",
    color: "yellow",
    mountedAt: { board: "bb", col: 28, row: "h" },
  },

  // Bit G₁ — Green LED
  {
    id: "r_g1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 38, row: "h" },
  },
  {
    id: "led_g1",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 42, row: "h" },
  },

  // Bit G₀ (LSB) — Blue LED
  {
    id: "r_g0",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 50, row: "h" },
  },
  {
    id: "led_g0",
    type: "led",
    color: "blue",
    mountedAt: { board: "bb", col: 54, row: "h" },
  },

  // ── Input Distribution Wires (B₃, B₂, B₁, B₀) ──────────────────────────────
  // Input B₃ (Red) → xor1.A and G₃ pass-through branch
  {
    id: "w_b3_xor1",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 1, row: "a" },
    to: { ic: "xor1", pin: "A" },
  },
  {
    id: "w_b3_g3",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 1, row: "b" },
    to: { board: "bb", col: 12, row: "g" },
  },
  {
    id: "w_b3_to_r",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 12, row: "g" },
    to: { component: "r_g3", end: "p1" },
  },

  // Input B₂ (Orange) → xor1.B and xor2.A
  {
    id: "w_b2_xor1",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 2, row: "a" },
    to: { ic: "xor1", pin: "B" },
  },
  {
    id: "w_b2_xor2",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 2, row: "b" },
    to: { ic: "xor2", pin: "A" },
  },

  // Input B₁ (Blue) → xor2.B and xor3.A
  {
    id: "w_b1_xor2",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 3, row: "a" },
    to: { ic: "xor2", pin: "B" },
  },
  {
    id: "w_b1_xor3",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 3, row: "b" },
    to: { ic: "xor3", pin: "A" },
  },

  // Input B₀ (Green) → xor3.B
  {
    id: "w_b0_xor3",
    type: "wire",
    color: "green",
    from: { board: "bb", col: 4, row: "a" },
    to: { ic: "xor3", pin: "B" },
  },

  // ── Output Drive Wires (Gate/Input → Resistor → LED → GND rail) ───────────
  // G₃ Output Chain (Pass-through)
  {
    id: "w_r_to_led_g3",
    type: "wire",
    color: "red",
    from: { component: "r_g3", end: "p2" },
    to: { led: "led_g3", end: "anode" },
  },
  {
    id: "w_gnd_g3",
    type: "wire",
    color: "black",
    from: { led: "led_g3", end: "cathode" },
    to: { board: "bb", rail: "gnd_bot", col: 17 },
  },

  // G₂ Output Chain (xor1 output)
  {
    id: "w_xor1_to_r",
    type: "wire",
    color: "yellow",
    from: { ic: "xor1", pin: "Y" },
    to: { component: "r_g2", end: "p1" },
  },
  {
    id: "w_r_to_led_g2",
    type: "wire",
    color: "yellow",
    from: { component: "r_g2", end: "p2" },
    to: { led: "led_g2", end: "anode" },
  },
  {
    id: "w_gnd_g2",
    type: "wire",
    color: "black",
    from: { led: "led_g2", end: "cathode" },
    to: { board: "bb", rail: "gnd_bot", col: 29 },
  },

  // G₁ Output Chain (xor2 output)
  {
    id: "w_xor2_to_r",
    type: "wire",
    color: "green",
    from: { ic: "xor2", pin: "Y" },
    to: { component: "r_g1", end: "p1" },
  },
  {
    id: "w_r_to_led_g1",
    type: "wire",
    color: "green",
    from: { component: "r_g1", end: "p2" },
    to: { led: "led_g1", end: "anode" },
  },
  {
    id: "w_gnd_g1",
    type: "wire",
    color: "black",
    from: { led: "led_g1", end: "cathode" },
    to: { board: "bb", rail: "gnd_bot", col: 43 },
  },

  // G₀ Output Chain (xor3 output)
  {
    id: "w_xor3_to_r",
    type: "wire",
    color: "blue",
    from: { ic: "xor3", pin: "Y" },
    to: { component: "r_g0", end: "p1" },
  },
  {
    id: "w_r_to_led_g0",
    type: "wire",
    color: "blue",
    from: { component: "r_g0", end: "p2" },
    to: { led: "led_g0", end: "anode" },
  },
  {
    id: "w_gnd_g0",
    type: "wire",
    color: "black",
    from: { led: "led_g0", end: "cathode" },
    to: { board: "bb", rail: "gnd_bot", col: 55 },
  },
];
