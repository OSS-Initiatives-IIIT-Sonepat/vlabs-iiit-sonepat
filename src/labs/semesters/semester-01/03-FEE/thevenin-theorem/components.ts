import { type ComponentInstance } from "@/labs/types";

/**
 * One supply, one circuit on the board.
 *
 * Original divider, top bank: Vs → R1 (1 kΩ, cols 6–9) → node A (col 9)
 * → R2 (2.2 kΩ, cols 12–15) → ground.
 * The load sits at cols 20–23 and is wired from node A only on the load steps.
 *
 * The equivalent reuses the same supply, set to Vth, with Rth in R1's place
 * and the divider taken off the board.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "psu",
    type: "dc-jack",
    label: "Vs",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 3 },
      { board: "bb", rail: "gnd_top", col: 3 },
    ],
  },

  {
    id: "r1",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 6, row: "c" },
  },
  {
    id: "r2",
    type: "resistor",
    ohms: 2200,
    mountedAt: { board: "bb", col: 12, row: "c" },
  },
  {
    id: "r_th",
    type: "resistor",
    ohms: 688,
    mountedAt: { board: "bb", col: 6, row: "c" },
  },
  {
    id: "r_load",
    type: "resistor",
    ohms: 3300,
    mountedAt: { board: "bb", col: 20, row: "c" },
  },
  {
    id: "r4",
    type: "resistor",
    ohms: 4700,
    mountedAt: { board: "bb", col: 20, row: "c" },
  },

  {
    id: "w_v_r1",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 5 },
    to: { component: "r1", end: "p1" },
  },
  {
    id: "w_r1_r2",
    type: "wire",
    color: "orange",
    from: { component: "r1", end: "p2" },
    to: { component: "r2", end: "p1" },
  },
  {
    id: "w_r2_gnd",
    type: "wire",
    color: "black",
    from: { component: "r2", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 16 },
  },
  {
    id: "w_short",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "vcc_top", col: 4 },
    to: { board: "bb", rail: "gnd_top", col: 4 },
  },
  {
    id: "w_v_rth",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 5 },
    to: { component: "r_th", end: "p1" },
  },
  {
    id: "w_load_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_load", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 24 },
  },
  {
    id: "w_r4_gnd",
    type: "wire",
    color: "black",
    from: { component: "r4", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 24 },
  },

  {
    id: "vm",
    type: "voltmeter",
    label: "Vab",
    mountedAt: { board: "bb", col: 10, row: "a" },
    probes: [
      { component: "r1", end: "p2" },
      { board: "bb", rail: "gnd_top", col: 18 },
    ],
  },
  {
    id: "am_l",
    type: "ammeter",
    label: "IL",
    mountedAt: { board: "bb", col: 16, row: "a" },
    probes: [
      { component: "r1", end: "p2" },
      { component: "r_load", end: "p1" },
    ],
  },
  {
    id: "am_l4",
    type: "ammeter",
    label: "IL",
    mountedAt: { board: "bb", col: 16, row: "a" },
    probes: [
      { component: "r1", end: "p2" },
      { component: "r4", end: "p1" },
    ],
  },
  {
    id: "vm_eq",
    type: "voltmeter",
    label: "VL",
    mountedAt: { board: "bb", col: 14, row: "a" },
    probes: [
      { component: "r_load", end: "p1" },
      { component: "r_load", end: "p2" },
    ],
  },
  {
    id: "am_eq",
    type: "ammeter",
    label: "IL",
    mountedAt: { board: "bb", col: 12, row: "a" },
    probes: [
      { component: "r_th", end: "p2" },
      { component: "r_load", end: "p1" },
    ],
  },
  {
    id: "vm_eq4",
    type: "voltmeter",
    label: "VL",
    mountedAt: { board: "bb", col: 14, row: "a" },
    probes: [
      { component: "r4", end: "p1" },
      { component: "r4", end: "p2" },
    ],
  },
  {
    id: "am_eq4",
    type: "ammeter",
    label: "IL",
    mountedAt: { board: "bb", col: 12, row: "a" },
    probes: [
      { component: "r_th", end: "p2" },
      { component: "r4", end: "p1" },
    ],
  },
];
