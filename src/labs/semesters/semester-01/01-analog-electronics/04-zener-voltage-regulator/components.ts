import { type ComponentInstance } from "@/labs/types";

// Zener-diode shunt voltage regulator — component layout on the breadboard.
//
//                     ┌── Rs (330 Ω) ──┬──── Vout ────┬── RL1 (1 kΩ) ──┐
//      Vin ───────────┘                │              │                │
//                                      DZ             RL2 (1 kΩ)       │
//                                  (cathode up)       (optional)       │
//      GND ────────────────────────────┴──────────────┴────────────────┘
//
// The Zener diode DZ is a real `zener` component (red body, dark banded
// cathode) spanning columns 9 -> 12, row c: anode = col 9, cathode = col 12.
// It is mounted REVERSE biased — cathode towards the Rs / output node, anode
// to ground — which is the only way it can regulate.
//
// The bench DC supply (dc-jack) uses `terminals` and the bench DMM
// (potentiometer) uses `probes`; everything on the board is joined with
// ordinary wires.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 2 }, // [0] = + terminal
      { board: "bb", rail: "gnd_top", col: 2 }, // [1] = − terminal
    ],
  },

  // Series resistor Rs: p1 = col 4, p2 = col 7
  {
    id: "rs",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 4, row: "c" },
  },

  // Zener diode DZ (1N4733A, Vz = 5.1 V): anode = col 9, cathode = col 12
  {
    id: "dz",
    type: "zener",
    vz: 5.1,
    mountedAt: { board: "bb", col: 9, row: "c" },
  },

  // Load resistor RL1: p1 = col 13, p2 = col 16
  {
    id: "rl1",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 13, row: "c" },
  },

  // Second load resistor RL2 (parallelled with RL1): p1 = col 19, p2 = col 22
  {
    id: "rl2",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 19, row: "c" },
  },

  // Bench DMM across the output: red probe on the output node (+), black probe
  // on the ground rail (−). Row a keeps the probe leads clear of the parts in row c.
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 7, row: "a" },
      { board: "bb", col: 14, row: "a" },
    ],
  },

  // +Vin rail -> Rs
  {
    id: "w_vcc_rs",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 4 },
    to: { component: "rs", end: "p1" },
  },
  // Rs -> Zener cathode (the output node)
  {
    id: "w_rs_dz",
    type: "wire",
    color: "green",
    from: { component: "rs", end: "p2" },
    to: { board: "bb", col: 12, row: "c" },
  },
  // Zener anode -> ground
  {
    id: "w_dz_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 9, row: "c" },
    to: { board: "bb", rail: "gnd_top", col: 9 },
  },
  // Output node -> RL1
  {
    id: "w_dz_rl1",
    type: "wire",
    color: "green",
    from: { board: "bb", col: 12, row: "c" },
    to: { component: "rl1", end: "p1" },
  },
  // RL1 -> ground
  {
    id: "w_rl1_gnd",
    type: "wire",
    color: "black",
    from: { component: "rl1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 16 },
  },
  // Output node -> RL2 (parallel load)
  {
    id: "w_dz_rl2",
    type: "wire",
    color: "green",
    from: { board: "bb", col: 12, row: "c" },
    to: { board: "bb", col: 19, row: "c" },
  },
  // RL2 -> ground
  {
    id: "w_rl2_gnd",
    type: "wire",
    color: "black",
    from: { component: "rl2", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 22 },
  },
];
