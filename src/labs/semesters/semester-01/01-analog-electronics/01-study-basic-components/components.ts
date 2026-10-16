import { type ComponentInstance } from "@/labs/types";

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  // Regulated DC power supply feeding top power rails (Zone 1: cols 1-2)
  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 1 },
      { board: "bb", rail: "gnd_top", col: 2 },
    ],
  },

  // Passive components
  {
    id: "r1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 3, row: "c" }, // spans cols 3..6
  },
  {
    id: "r2",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 13, row: "c" }, // spans cols 13..16
  },
  {
    id: "c1",
    type: "capacitor",
    capacitance: 0.1,
    mountedAt: { board: "bb", col: 16, row: "d" }, // spans cols 16..17 (shares node col 16 with r2.p2)
  },

  // Active components
  {
    id: "led1",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 8, row: "c" }, // spans cols 8..9 (anode=8, cathode=9)
  },
  {
    id: "d1",
    type: "diode",
    mountedAt: { board: "bb", col: 21, row: "c" }, // spans cols 21..24
  },
  {
    id: "q1",
    type: "npn-bjt",
    mountedAt: { board: "bb", col: 27, row: "c" }, // spans cols 26..28
  },

  // LED series circuit wiring (Zone 1: cols 3..9)
  {
    id: "w_vcc",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 3 },
    to: { component: "r1", end: "p1" }, // resolves to (col 3, row a)
  },
  {
    id: "w_r_led",
    type: "wire",
    color: "orange",
    from: { component: "r1", end: "p2" }, // resolves to (col 6, row d)
    to: { led: "led1", end: "anode" }, // resolves to (col 8, row d)
  },
  {
    id: "w_gnd1",
    type: "wire",
    color: "black",
    from: { led: "led1", end: "cathode" }, // resolves to (col 9, row a)
    to: { board: "bb", rail: "gnd_top", col: 9 },
  },

  // Digital Multimeter across R1 (probing col 3 and col 6 in row e)
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 3, row: "e" },
    probes: [
      { board: "bb", col: 3, row: "e" },
      { board: "bb", col: 6, row: "e" },
    ],
  },

  // Function generator into RC network (Zone 2: R2 -> C1 -> GND)
  {
    id: "fg1",
    type: "function-generator",
    mountedAt: { board: "bb", col: 13, row: "g" },
    probes: [
      { board: "bb", col: 13, row: "a" },
      { board: "bb", rail: "gnd_top", col: 13 },
    ],
  },
  {
    id: "w_c_gnd",
    type: "wire",
    color: "black",
    from: { component: "c1", end: "p2" }, // resolves to (col 17, row a)
    to: { board: "bb", rail: "gnd_top", col: 17 },
  },

  // Dual-Trace CRO probing RC filter output node (col 16) and ground rail (col 18)
  {
    id: "cro",
    type: "oscilloscope",
    probes: [
      { board: "bb", col: 16, row: "a" },
      { board: "bb", rail: "gnd_top", col: 18 },
    ],
  },
];
