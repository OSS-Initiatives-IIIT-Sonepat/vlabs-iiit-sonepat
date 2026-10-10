import { type ComponentInstance } from "@/labs/types";

/**
 * To Study BJT Fixed Bias and Voltage Divider Bias Configuration
 * ---------------------------------------------------------------
 * Circuit Architecture (exact match to apparatus):
 * - Regulated DC Power Supply (psu):
 *     Bench supply behind the board feeding top distribution rails: VCC (+12 V) and GND (0 V)
 * - Digital Multimeter (dmm):
 *     Bench DMM measuring Q-point voltages (V_CE, V_B, V_E) and branch currents
 * - Fixed Bias Configuration:
 *     - Resistor R_B (470 kΩ, mounted at col 3, row c): Base bias resistor from VCC to Q1 base
 *     - Resistor R_C1 (4.7 kΩ, mounted at col 7, row c): Collector load resistor from VCC to Q1 collector
 *     - Transistor Q1 (BC547 NPN BJT, mounted at col 10, row e):
 *         Collector (col 9), Base (col 10), Emitter (col 11 tied to GND)
 * - Voltage Divider Bias Configuration:
 *     - Resistor R1 (100 kΩ, mounted at col 15, row c): Upper divider resistor from VCC to base
 *     - Resistor R2 (10 kΩ, mounted at col 18, row h): Lower divider resistor from base to GND
 *     - Transistor Q2 (BC547 NPN BJT, mounted at col 20, row e):
 *         Collector (col 19), Base (col 20), Emitter (col 21 tied to R_E)
 *     - Resistor R_C2 (4.7 kΩ, mounted at col 19, row c): Collector load resistor from VCC to Q2 collector
 *     - Resistor R_E (1 kΩ, mounted at col 21, row h): Emitter stabilizing feedback resistor to GND
 */

export const components: ComponentInstance[] = [
  {
    id: "bb",
    type: "breadboard",
  },
  {
    id: "psu",
    type: "dc-jack",
    mountedAt: {
      board: "bb",
      col: 1,
      row: "a",
    },
    terminals: [
      {
        board: "bb",
        rail: "vcc_top",
        col: 3,
      },
      {
        board: "bb",
        rail: "gnd_top",
        col: 3,
      },
    ],
  },
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: {
      board: "bb",
      col: 1,
      row: "c",
    },
    probes: [
      {
        board: "bb",
        col: 9,
        row: "c",
      },
      {
        board: "bb",
        rail: "gnd_top",
        col: 11,
      },
    ],
  },

  // ── Fixed Bias Configuration ──────────────────────────────────────────────
  {
    id: "r_b",
    type: "resistor",
    ohms: 470000,
    mountedAt: {
      board: "bb",
      col: 3,
      row: "c",
    },
  },
  {
    id: "r_c1",
    type: "resistor",
    ohms: 4700,
    mountedAt: {
      board: "bb",
      col: 7,
      row: "c",
    },
  },
  {
    id: "q1",
    type: "npn-bjt",
    mountedAt: {
      board: "bb",
      col: 10,
      row: "e",
    },
  },
  {
    id: "w_vcc_rb",
    type: "wire",
    color: "red",
    from: {
      board: "bb",
      rail: "vcc_top",
      col: 3,
    },
    to: {
      component: "r_b",
      end: "p1",
    },
  },
  {
    id: "w_rb_base",
    type: "wire",
    color: "orange",
    from: {
      component: "r_b",
      end: "p2",
    },
    to: {
      board: "bb",
      col: 10,
      row: "e",
    },
  },
  {
    id: "w_vcc_rc1",
    type: "wire",
    color: "red",
    from: {
      board: "bb",
      rail: "vcc_top",
      col: 7,
    },
    to: {
      component: "r_c1",
      end: "p1",
    },
  },
  {
    id: "w_rc1_col",
    type: "wire",
    color: "green",
    from: {
      component: "r_c1",
      end: "p2",
    },
    to: {
      board: "bb",
      col: 9,
      row: "e",
    },
  },
  {
    id: "w_q1_gnd",
    type: "wire",
    color: "black",
    from: {
      board: "bb",
      col: 11,
      row: "e",
    },
    to: {
      board: "bb",
      rail: "gnd_top",
      col: 11,
    },
  },

  // ── Voltage Divider Bias Configuration ────────────────────────────────────
  {
    id: "r1",
    type: "resistor",
    ohms: 100000,
    mountedAt: {
      board: "bb",
      col: 15,
      row: "c",
    },
  },
  {
    id: "r2",
    type: "resistor",
    ohms: 10000,
    mountedAt: {
      board: "bb",
      col: 18,
      row: "h",
    },
  },
  {
    id: "q2",
    type: "npn-bjt",
    mountedAt: {
      board: "bb",
      col: 20,
      row: "e",
    },
  },
  {
    id: "r_c2",
    type: "resistor",
    ohms: 4700,
    mountedAt: {
      board: "bb",
      col: 19,
      row: "c",
    },
  },
  {
    id: "r_e",
    type: "resistor",
    ohms: 1000,
    mountedAt: {
      board: "bb",
      col: 21,
      row: "h",
    },
  },
  {
    id: "w_vcc_r1",
    type: "wire",
    color: "red",
    from: {
      board: "bb",
      rail: "vcc_top",
      col: 15,
    },
    to: {
      component: "r1",
      end: "p1",
    },
  },
  {
    id: "w_r1_r2",
    type: "wire",
    color: "orange",
    from: {
      component: "r1",
      end: "p2",
    },
    to: {
      component: "r2",
      end: "p1",
    },
  },
  {
    id: "w_r2_gnd",
    type: "wire",
    color: "black",
    from: {
      component: "r2",
      end: "p2",
    },
    to: {
      board: "bb",
      rail: "gnd_top",
      col: 21,
    },
  },
  {
    id: "w_div_base",
    type: "wire",
    color: "orange",
    from: {
      component: "r1",
      end: "p2",
    },
    to: {
      board: "bb",
      col: 20,
      row: "e",
    },
  },
  {
    id: "w_vcc_rc2",
    type: "wire",
    color: "red",
    from: {
      board: "bb",
      rail: "vcc_top",
      col: 19,
    },
    to: {
      component: "r_c2",
      end: "p1",
    },
  },
  {
    id: "w_rc2_col",
    type: "wire",
    color: "green",
    from: {
      component: "r_c2",
      end: "p2",
    },
    to: {
      board: "bb",
      col: 19,
      row: "e",
    },
  },
  {
    id: "w_em_re",
    type: "wire",
    color: "yellow",
    from: {
      board: "bb",
      col: 21,
      row: "e",
    },
    to: {
      component: "r_e",
      end: "p1",
    },
  },
  {
    id: "w_re_gnd",
    type: "wire",
    color: "black",
    from: {
      component: "r_e",
      end: "p2",
    },
    to: {
      board: "bb",
      rail: "gnd_top",
      col: 24,
    },
  },
];
