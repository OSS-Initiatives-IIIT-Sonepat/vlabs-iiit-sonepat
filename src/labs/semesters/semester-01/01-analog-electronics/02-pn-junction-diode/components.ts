import { type ComponentInstance } from "@/labs/types";

// Vs+ → ammeter → R1 (cols 5–8) → 1N4148 → GND.
// Forward: d1 anode col 10, cathode col 13.
// Reverse: d1_rev anode col 15 (to GND), cathode col 18 (to R1).

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 2 },
      { board: "bb", rail: "gnd_top", col: 2 },
    ],
  },

  {
    id: "am1",
    type: "ammeter",
    mountedAt: { board: "bb", col: 1, row: "d" },
    probes: [
      { board: "bb", rail: "vcc_top", col: 4 },
      { board: "bb", col: 5, row: "a" },
    ],
  },

  {
    id: "r1",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 5, row: "c" },
  },

  // ── Forward bias ──────────────────────────────────────────────
  {
    id: "d1",
    type: "diode",
    model: "1N4148",
    mountedAt: { board: "bb", col: 10, row: "c" },
  },
  {
    id: "w_r_d1",
    type: "wire",
    color: "red",
    from: { component: "r1", end: "p2" },
    to: { component: "d1", end: "p1" },
  },
  {
    id: "w_d1_gnd",
    type: "wire",
    color: "black",
    from: { component: "d1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 13 },
  },
  {
    id: "vm1",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { component: "d1", end: "p1" },
      { component: "d1", end: "p2" },
    ],
  },

  // ── Reverse bias ──────────────────────────────────────────────
  {
    id: "d1_rev",
    type: "diode",
    model: "1N4148",
    mountedAt: { board: "bb", col: 15, row: "c" },
  },
  {
    id: "w_r_d1rev",
    type: "wire",
    color: "red",
    from: { component: "r1", end: "p2" },
    to: { component: "d1_rev", end: "p2" },
  },
  {
    id: "w_d1rev_gnd",
    type: "wire",
    color: "black",
    from: { component: "d1_rev", end: "p1" },
    to: { board: "bb", rail: "gnd_top", col: 15 },
  },
  {
    id: "vm1_rev",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { component: "d1_rev", end: "p2" },
      { component: "d1_rev", end: "p1" },
    ],
  },
];
