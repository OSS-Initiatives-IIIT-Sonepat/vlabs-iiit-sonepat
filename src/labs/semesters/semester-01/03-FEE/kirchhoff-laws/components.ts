import { type ComponentInstance } from "@/labs/types";

/**
 * Two-source KCL/KVL network.
 *
 * V1 feeds the top rail, V2 the bottom rail, negatives tied by w_gnd_link.
 * R1 (1 kΩ, row c, cols 8–11) and R2 (2.2 kΩ, row h, cols 8–11) meet at
 * column 11. w_node joins the two banks there — that column is node A.
 * R3 (3.3 kΩ) leaves node A for ground.
 *
 * Step 1 uses the direct branch wires. From step 2 those wires are hidden
 * and am1, am2, am3 sit in series instead.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "psu1",
    type: "dc-jack",
    label: "V1",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 2 },
      { board: "bb", rail: "gnd_top", col: 2 },
    ],
  },
  {
    id: "psu2",
    type: "dc-jack",
    label: "V2",
    mountedAt: { board: "bb", col: 1, row: "f" },
    terminals: [
      { board: "bb", rail: "vcc_bot", col: 2 },
      { board: "bb", rail: "gnd_bot", col: 2 },
    ],
  },

  {
    id: "r1",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 8, row: "c" },
  },
  {
    id: "r2",
    type: "resistor",
    ohms: 2200,
    mountedAt: { board: "bb", col: 8, row: "h" },
  },
  {
    id: "r3",
    type: "resistor",
    ohms: 3300,
    mountedAt: { board: "bb", col: 18, row: "c" },
  },

  {
    id: "w_gnd_link",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "gnd_top", col: 30 },
    to: { board: "bb", rail: "gnd_bot", col: 30 },
  },
  {
    id: "w_node",
    type: "wire",
    color: "white",
    from: { board: "bb", col: 11, row: "e" },
    to: { board: "bb", col: 11, row: "f" },
  },
  {
    id: "w_v1_r1",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 6 },
    to: { component: "r1", end: "p1" },
  },
  {
    id: "w_v2_r2",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_bot", col: 6 },
    to: { component: "r2", end: "p1" },
  },
  {
    id: "w_node_r3",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 11, row: "d" },
    to: { component: "r3", end: "p1" },
  },
  {
    id: "w_r3_gnd",
    type: "wire",
    color: "black",
    from: { component: "r3", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 22 },
  },

  {
    id: "am1",
    type: "ammeter",
    label: "I1",
    mountedAt: { board: "bb", col: 4, row: "a" },
    probes: [
      { board: "bb", rail: "vcc_top", col: 6 },
      { component: "r1", end: "p1" },
    ],
  },
  {
    id: "am2",
    type: "ammeter",
    label: "I2",
    mountedAt: { board: "bb", col: 4, row: "f" },
    probes: [
      { board: "bb", rail: "vcc_bot", col: 6 },
      { component: "r2", end: "p1" },
    ],
  },
  {
    id: "am3",
    type: "ammeter",
    label: "I3",
    mountedAt: { board: "bb", col: 14, row: "a" },
    probes: [
      { board: "bb", col: 11, row: "d" },
      { component: "r3", end: "p1" },
    ],
  },

  {
    id: "vm1",
    type: "voltmeter",
    label: "VR1",
    mountedAt: { board: "bb", col: 8, row: "a" },
    probes: [
      { component: "r1", end: "p1" },
      { component: "r1", end: "p2" },
    ],
  },
  {
    id: "vm2",
    type: "voltmeter",
    label: "VR2",
    mountedAt: { board: "bb", col: 8, row: "f" },
    probes: [
      { component: "r2", end: "p1" },
      { component: "r2", end: "p2" },
    ],
  },
  {
    id: "vm3",
    type: "voltmeter",
    label: "VR3",
    mountedAt: { board: "bb", col: 18, row: "a" },
    probes: [
      { board: "bb", col: 11, row: "b" },
      { board: "bb", rail: "gnd_top", col: 26 },
    ],
  },
];
