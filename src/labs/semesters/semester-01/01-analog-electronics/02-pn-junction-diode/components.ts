import { type ComponentInstance } from "@/labs/types";

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
      { board: "bb", col: 5, row: "c" },
      { board: "bb", col: 8, row: "c" },
    ],
  },

  {
    id: "d1",
    type: "diode",
    mountedAt: { board: "bb", col: 8, row: "c" },
  },

  {
    id: "r1",
    type: "resistor",
    ohms: 1000,
    mountedAt: { board: "bb", col: 15, row: "c" },
  },

  {
    id: "vm1",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 1, row: "e" },
    probes: [
      { component: "d1", end: "anode" } as any,
      { component: "d1", end: "cathode" } as any,
    ],
  },

  {
    id: "w_diode_r",
    type: "wire",
    color: "red",
    from: { component: "d1", end: "cathode" } as any,
    to: { component: "r1", end: "p1" } as any,
  },

  {
    id: "w_r_gnd",
    type: "wire",
    color: "black",
    from: { component: "r1", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 12 },
  },
];
