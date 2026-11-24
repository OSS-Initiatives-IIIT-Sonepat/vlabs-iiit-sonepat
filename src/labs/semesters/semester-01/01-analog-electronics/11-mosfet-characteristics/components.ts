import { type ComponentInstance } from "@/labs/types";

/**
 * 2N7000 drain and transfer characteristics.
 *
 * 2N7000 flat face front, legs S-G-D at cols 13-14-15 (row c).
 *   R_D (100 Ω) cols 12-15: drain end shares the drain column; col 12 ← V_DD jumper
 *   source col 13 → GND jumper
 *   V_GS supply: (+) straight into the gate column, (−) on the GND rail
 * Three DMMs on DC volts: across R_D (I_D = V_RD / 100 Ω), D-S and G-S.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "psu_vds",
    type: "dc-jack",
    label: "V_DD",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 1 },
      { board: "bb", rail: "gnd_top", col: 1 },
    ],
  },
  {
    id: "psu_vgs",
    type: "dc-jack",
    label: "V_GS",
    mountedAt: { board: "bb", col: 1, row: "b" },
    terminals: [
      { board: "bb", col: 14, row: "b" },
      { board: "bb", rail: "gnd_top", col: 16 },
    ],
  },

  { id: "q1", type: "n-mosfet", mountedAt: { board: "bb", col: 14, row: "c" } },
  {
    id: "r_d",
    type: "resistor",
    ohms: 100,
    mountedAt: { board: "bb", col: 12, row: "a" },
  },

  {
    id: "w_vdd_rd",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 12 },
    to: { component: "r_d", end: "p1" },
  },
  {
    id: "w_source_gnd",
    type: "wire",
    color: "black",
    from: { ic: "q1", pin: "S" },
    to: { board: "bb", rail: "gnd_top", col: 13 },
  },

  {
    id: "dmm_id",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 2, row: "a" },
    probes: [
      { board: "bb", col: 12, row: "c" },
      { board: "bb", col: 15, row: "b" },
    ],
  },
  {
    id: "dmm_vds",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 2, row: "b" },
    probes: [
      { board: "bb", col: 15, row: "d" },
      { board: "bb", col: 13, row: "d" },
    ],
  },
  {
    id: "dmm_vgs",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 2, row: "c" },
    probes: [
      { board: "bb", col: 14, row: "d" },
      { board: "bb", col: 13, row: "e" },
    ],
  },
];
