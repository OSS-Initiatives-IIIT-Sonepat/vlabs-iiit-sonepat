import { type ComponentInstance } from "@/labs/types";
import {
  SUPPLY_PARTS,
  SYS_8051_PARTS,
  pin,
  tie,
  rail,
  wire,
  resistor,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";

// AT89S52 on the breadboard driving a 4-bit R-2R ladder (R = 10 kΩ,
// 2R = 20 kΩ). The spine nodes N0 to N3 are top-bank columns 40, 43, 46 and
// 49; a jumper takes each node to a bottom-bank column where its 2R resistor
// meets the bit line from P1.0 to P1.3. N3 is the output, read by a voltmeter.

const NODE = [40, 43, 46, 49];
const LOW = [35, 41, 47, 53];
const LADDER_PARTS: ComponentInstance[] = [
  resistor("r_t", 20000, 37, "c"),
  wire("w_t_g", "black", tie(37, "a"), rail("gnd_top", 37)),
  resistor("r_l0", 10000, 40, "e"),
  resistor("r_l1", 10000, 43, "d"),
  resistor("r_l2", 10000, 46, "e"),
  ...NODE.map((n, k) =>
    wire(`w_n${k}`, "white", tie(n, "a"), tie(LOW[k], "g")),
  ),
  ...LOW.map((m, k) => resistor(`r_b${k}`, 20000, m, "h")),
];
const BIT_COLORS = ["orange", "yellow", "green", "blue"] as const;
const BIT_PARTS = LOW.map((m, k) =>
  wire(`w_b${k}`, BIT_COLORS[k], pin("u1", `P1.${k}`), tie(m + 3, "i")),
);
const METER_PARTS: ComponentInstance[] = [
  {
    id: "vm",
    type: "voltmeter",
    label: "Vout",
    mountedAt: { board: "bb", col: 52, row: "c" },
    probes: [tie(49, "b"), rail("gnd_top", 50)],
  },
];
/** The ladder resistors and node jumpers. */
export const LADDER = [
  "r_t",
  "w_t_g",
  "r_l0",
  "r_l1",
  "r_l2",
  ...NODE.map((_, k) => `w_n${k}`),
  ...LOW.map((_, k) => `r_b${k}`),
];
export const BITS = LOW.map((_, k) => `w_b${k}`);
export const METER = ["vm"];

export const components: ComponentInstance[] = [
  ...SUPPLY_PARTS,
  ...SYS_8051_PARTS,
  ...LADDER_PARTS,
  ...BIT_PARTS,
  ...METER_PARTS,
];
