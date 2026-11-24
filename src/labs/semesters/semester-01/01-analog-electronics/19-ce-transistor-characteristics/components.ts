import { type ComponentInstance } from "@/labs/types";

/**
 * Common-emitter input and output characteristics, BC547.
 * Base at column 14, collector at 13, emitter at 15.
 * RB = 100 kΩ sets IB from VBB. VCC sets VCE.
 * w_c_short replaces the collector supply when VCE is held at 0.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  {
    id: "q1",
    type: "npn-bjt",
    mountedAt: { board: "bb", col: 14, row: "c" },
  },
  {
    id: "w_e_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 15, row: "a" },
    to: { board: "bb", rail: "gnd_top", col: 15 },
  },
  {
    id: "rb",
    type: "resistor",
    ohms: 100000,
    mountedAt: { board: "bb", col: 18, row: "c" },
  },
  {
    id: "w_b_rb",
    type: "wire",
    color: "white",
    from: { board: "bb", col: 14, row: "a" },
    to: { board: "bb", col: 18, row: "a" },
  },
  {
    id: "psu_b",
    type: "dc-jack",
    label: "VBB",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", col: 24, row: "a" },
      { board: "bb", rail: "gnd_top", col: 4 },
    ],
  },
  {
    id: "am_ib",
    type: "ammeter",
    label: "IB",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 24, row: "c" },
      { board: "bb", col: 21, row: "a" },
    ],
  },
  {
    id: "vm_be",
    type: "voltmeter",
    label: "VBE",
    mountedAt: { board: "bb", col: 1, row: "c" },
    probes: [
      { board: "bb", col: 14, row: "e" },
      { board: "bb", col: 15, row: "e" },
    ],
  },
  {
    id: "psu_c",
    type: "dc-jack",
    label: "VCC",
    mountedAt: { board: "bb", col: 1, row: "d" },
    terminals: [
      { board: "bb", col: 8, row: "a" },
      { board: "bb", rail: "gnd_top", col: 8 },
    ],
  },
  {
    id: "am_ic",
    type: "ammeter",
    label: "IC",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { board: "bb", col: 8, row: "c" },
      { board: "bb", col: 13, row: "a" },
    ],
  },
  {
    id: "vm_ce",
    type: "voltmeter",
    label: "VCE",
    mountedAt: { board: "bb", col: 1, row: "f" },
    probes: [
      { board: "bb", col: 13, row: "b" },
      { board: "bb", col: 15, row: "b" },
    ],
  },
  {
    id: "w_c_short",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 13, row: "d" },
    to: { board: "bb", rail: "gnd_top", col: 13 },
  },
];
