import { type ComponentInstance } from "@/labs/types";

// Vs+ → ammeter (DMM in mA) → R1 (cols 5–8) → Zener → GND. Voltmeter across the Zener.
// Forward: zener_fwd anode shares R1's col 8 strip, cathode col 11 → GND.
// Reverse: zener_rev anode col 12 → GND, cathode col 15 ← jumper from R1 (col 8).

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

  // DMM on DC mA, in series: (+) on the supply rail, (−) on R1's input strip.
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", rail: "vcc_top", col: 4 },
      { board: "bb", col: 5, row: "a" },
    ],
  },

  {
    id: "r1",
    type: "resistor",
    ohms: 470,
    mountedAt: { board: "bb", col: 5, row: "c" },
  },

  // ── Forward bias ──────────────────────────────────────────────
  {
    id: "zener_fwd",
    type: "zener",
    vz: 5.1,
    mountedAt: { board: "bb", col: 8, row: "d" },
  },
  {
    id: "w_zfwd_gnd",
    type: "wire",
    color: "black",
    from: { component: "zener_fwd", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 11 },
  },
  {
    id: "vm_fwd",
    type: "voltmeter",
    label: "V_Z",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 8, row: "a" },
      { board: "bb", col: 11, row: "a" },
    ],
  },

  // ── Reverse bias ──────────────────────────────────────────────
  {
    id: "zener_rev",
    type: "zener",
    vz: 5.1,
    mountedAt: { board: "bb", col: 12, row: "c" },
  },
  {
    id: "w_r1_zrev",
    type: "wire",
    color: "purple",
    from: { component: "r1", end: "p2" },
    to: { component: "zener_rev", end: "p2" },
  },
  {
    id: "w_zrev_gnd",
    type: "wire",
    color: "black",
    from: { component: "zener_rev", end: "p1" },
    to: { board: "bb", rail: "gnd_top", col: 12 },
  },
  // Same polarity as the forward reading (+ on anode), so V_Z reads negative.
  {
    id: "vm_rev",
    type: "voltmeter",
    label: "V_Z",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 12, row: "a" },
      { board: "bb", col: 15, row: "a" },
    ],
  },
];
