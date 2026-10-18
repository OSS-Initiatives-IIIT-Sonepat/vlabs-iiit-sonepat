import { type ComponentInstance } from "@/labs/types";

export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },

  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 5 },
      { board: "bb", rail: "gnd_top", col: 5 },
    ],
  },
  {
    id: "dmm",
    type: "potentiometer",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 3, row: "d" },
      { board: "bb", col: 3, row: "c" },
    ],
  },

  {
    id: "w_amm_in",
    type: "wire",
    color: "orange",
    from: { board: "bb", rail: "vcc_top", col: 5 },
    to: { board: "bb", col: 3, row: "d" },
  },
  {
    id: "w_amm_out",
    type: "wire",
    color: "orange",
    from: { board: "bb", col: 3, row: "c" },
    to: { component: "r1", end: "p1" },
  },

  {
    id: "r1",
    type: "resistor",
    ohms: 470,
    mountedAt: { board: "bb", col: 5, row: "c" },
  },

  // Forward-biased Zener: anode col 10, cathode col 13.
  {
    id: "zener_fwd",
    type: "zener",
    vz: 5.1,
    mountedAt: { board: "bb", col: 10, row: "c" },
  },
  {
    id: "w_r1_zfwd",
    type: "wire",
    color: "green",
    from: { component: "r1", end: "p2" },
    to: { component: "zener_fwd", end: "p1" },
  },
  {
    id: "w_zfwd_gnd",
    type: "wire",
    color: "black",
    from: { component: "zener_fwd", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 13 },
  },
  {
    id: "w_vm_fwd_pos",
    type: "wire",
    color: "blue",
    from: { component: "zener_fwd", end: "p1" },
    to: { board: "bb", col: 10, row: "a" },
  },
  {
    id: "w_vm_fwd_neg",
    type: "wire",
    color: "blue",
    from: { component: "zener_fwd", end: "p2" },
    to: { board: "bb", col: 13, row: "a" },
  },

  // Reverse-biased Zener: anode col 15 (to ground), cathode col 18 (to R1).
  {
    id: "zener_rev",
    type: "zener",
    vz: 5.1,
    mountedAt: { board: "bb", col: 15, row: "c" },
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
    to: { board: "bb", rail: "gnd_top", col: 15 },
  },
  {
    id: "w_vm_rev_pos",
    type: "wire",
    color: "blue",
    from: { component: "zener_rev", end: "p2" },
    to: { board: "bb", col: 18, row: "a" },
  },
  {
    id: "w_vm_rev_neg",
    type: "wire",
    color: "blue",
    from: { component: "zener_rev", end: "p1" },
    to: { board: "bb", col: 15, row: "a" },
  },
];
