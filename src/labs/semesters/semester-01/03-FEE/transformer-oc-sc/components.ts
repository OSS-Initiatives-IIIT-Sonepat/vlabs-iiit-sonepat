import { type ComponentInstance } from "@/labs/types";

/**
 * Open-circuit test on the 115 V winding, then short-circuit test on the
 * 230 V winding. Only one of those hookups is on the board at a time.
 * The transformer stands beside the board; its leads are the jumper wires.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  {
    id: "t1",
    type: "transformer",
    label: "230 / 115 V",
    secondary: "115 V",
    rating: "230 VA",
    mountedAt: { board: "bb", col: 2, row: "a" },
  },
  {
    id: "fg",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "a" },
    probes: [
      { board: "bb", col: 4, row: "a" },
      { board: "bb", rail: "gnd_top", col: 6 },
    ],
  },
  {
    id: "am_oc",
    type: "ammeter",
    label: "I0",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 4, row: "c" },
      { transformer: "t1", pin: "S1" },
    ],
  },
  {
    id: "vm_oc",
    type: "voltmeter",
    label: "V0",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { transformer: "t1", pin: "S1" },
      { transformer: "t1", pin: "S2" },
    ],
  },
  {
    id: "w_s2_gnd",
    type: "wire",
    color: "black",
    from: { transformer: "t1", pin: "S2" },
    to: { board: "bb", rail: "gnd_top", col: 12 },
  },
  {
    id: "am_sc",
    type: "ammeter",
    label: "Isc",
    mountedAt: { board: "bb", col: 1, row: "d" },
    probes: [
      { board: "bb", col: 4, row: "e" },
      { transformer: "t1", pin: "P1" },
    ],
  },
  {
    id: "vm_sc",
    type: "voltmeter",
    label: "Vsc",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { transformer: "t1", pin: "P1" },
      { transformer: "t1", pin: "P2" },
    ],
  },
  {
    id: "w_p2_gnd",
    type: "wire",
    color: "black",
    from: { transformer: "t1", pin: "P2" },
    to: { board: "bb", rail: "gnd_top", col: 14 },
  },
  {
    id: "w_short",
    type: "wire",
    color: "orange",
    from: { transformer: "t1", pin: "S1" },
    to: { transformer: "t1", pin: "S2" },
  },
];
