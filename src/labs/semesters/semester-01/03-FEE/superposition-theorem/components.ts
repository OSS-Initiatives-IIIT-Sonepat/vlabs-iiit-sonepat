import { type ComponentInstance } from "@/labs/types";

/**
 * Same two-source network as Kirchhoff.
 * V1 on the top rail, V2 on the bottom rail. R3 is the load.
 * am3 is in series with R3. vm3 reads the voltage at node N (column 11).
 * w_kill_v1 / w_kill_v2 replace a supply with a short when that source is killed.
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
    id: "w_kill_v1",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "vcc_top", col: 4 },
    to: { board: "bb", rail: "gnd_top", col: 4 },
  },
  {
    id: "w_kill_v2",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "vcc_bot", col: 4 },
    to: { board: "bb", rail: "gnd_bot", col: 4 },
  },

  {
    id: "am3",
    type: "ammeter",
    label: "IR3",
    mountedAt: { board: "bb", col: 14, row: "a" },
    probes: [
      { board: "bb", col: 11, row: "d" },
      { component: "r3", end: "p1" },
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
