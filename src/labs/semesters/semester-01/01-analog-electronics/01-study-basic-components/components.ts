import { type ComponentInstance } from "@/labs/types";

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // Regulated power supply (no wires — terminals connect straight to rails)
  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 5 },
      { board: "bb", rail: "gnd_top", col: 5 },
    ],
  },

  // Passive components
  {
    id: "r1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 3, row: "c" },
  },
  {
    id: "r2",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 9, row: "c" },
  },
  {
    id: "c1",
    type: "capacitor",
    capacitance: 0.1,
    mountedAt: { board: "bb", col: 12, row: "c" },
  },

  // Active components
  {
    id: "led1",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 5, row: "c" },
  },
  { id: "d1", type: "diode", mountedAt: { board: "bb", col: 17, row: "c" } },
  { id: "q1", type: "npn-bjt", mountedAt: { board: "bb", col: 23, row: "c" } },

  // LED circuit wiring
  {
    id: "w_vcc",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 3 },
    to: { component: "r1", end: "p1" },
  },
  {
    id: "w_r_led",
    type: "wire",
    color: "orange",
    from: { component: "r1", end: "p2" },
    to: { led: "led1", end: "anode" },
  },
  {
    id: "w_gnd1",
    type: "wire",
    color: "black",
    from: { led: "led1", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 6 },
  },

  // Multimeter across R1 (no wires — probes)
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 3, row: "b" },
      { board: "bb", col: 6, row: "b" },
    ],
  },

  // Function generator into RC network (R2 -> C1 -> GND)
  {
    id: "fg1",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "g" },
    probes: [
      { board: "bb", col: 9, row: "a" },
      { board: "bb", rail: "gnd_top", col: 9 },
    ],
  },
  {
    id: "w_c_gnd",
    type: "wire",
    color: "black",
    from: { component: "c1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 13 },
  },

  // CRO stands on the bench OUTSIDE the breadboard; only its probes touch the board
  {
    id: "cro",
    type: "oscilloscope",
    probes: [
      { board: "bb", col: 12, row: "a" },
      { board: "bb", rail: "gnd_top", col: 13 },
    ],
  },
];
