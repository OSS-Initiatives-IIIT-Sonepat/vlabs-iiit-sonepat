import { type ComponentInstance } from "@/labs/types";
import { lamp, link, power, powers, rail, input } from "../../_coa/breadboard";

// Long board. R1, the AND that is P, and R2 sit on the left.
// The lamps sit on the free columns to the right, one row per register.
const r1Col = 4;
const gateCol = 14;
const r2Col = 24;

export const components: ComponentInstance[] = [
  ...power(),
  { id: "r1", type: "io-port", name: "R1", mountedAt: { board: "bb", col: r1Col, row: "e" } },
  ...powers("r1", r1Col),
  // 1101, bit 0 on d0.
  rail("w_d0", "r1", "d0", "vcc", 1),
  rail("w_d1", "r1", "d1", "gnd", 2),
  rail("w_d2", "r1", "d2", "vcc", 3),
  rail("w_d3", "r1", "d3", "vcc", 4),
  input("ld1", "r1", "stb", 2, "yellow"),
  ...lamp("r1b3", "r1", "q3", 32, "c", "red"),
  ...lamp("r1b2", "r1", "q2", 38, "c", "red"),
  ...lamp("r1b1", "r1", "q1", 44, "c", "red"),
  ...lamp("r1b0", "r1", "q0", 50, "c", "red"),

  { id: "r2", type: "io-port", name: "R2", mountedAt: { board: "bb", col: r2Col, row: "e" } },
  ...powers("r2", r2Col),
  link("w_b0", "r1", "q0", "r2", "d0", "yellow"),
  link("w_b1", "r1", "q1", "r2", "d1", "yellow"),
  link("w_b2", "r1", "q2", "r2", "d2", "yellow"),
  link("w_b3", "r1", "q3", "r2", "d3", "yellow"),
  ...lamp("r2b3", "r2", "q3", 32, "h", "green"),
  ...lamp("r2b2", "r2", "q2", 38, "h", "green"),
  ...lamp("r2b1", "r2", "q1", 44, "h", "green"),
  ...lamp("r2b0", "r2", "q0", 50, "h", "green"),

  // P AND clock. The output is the load strobe of R2, and it also lights Load.
  { id: "gate", type: "and-gate", mountedAt: { board: "bb", col: gateCol, row: "e" } },
  ...powers("gate", gateCol),
  input("p", "gate", "A", 12, "blue"),
  input("clk", "gate", "B", 13, "orange"),
  link("w_load", "gate", "Y", "r2", "stb", "orange"),
  ...lamp("loadled", "gate", "Y", 56, "c", "yellow"),
  {
    id: "clkgen",
    type: "function-generator",
    mountedAt: { board: "bb", col: 1, row: "b" },
    probes: [
      { board: "bb", col: 13, row: "a" },
      { board: "bb", rail: "gnd_top", col: 6 },
    ],
  },
];

const ids = (...groups: string[][]) => groups.flat();

const lampIds = (name: string) => [
  `r_${name}`,
  `led_${name}`,
  `w_${name}_r`,
  `w_${name}_led`,
  `w_${name}_gnd`,
];

const supply = ["bb", "psu", "w_vcc_link", "w_gnd_link"];
const r1 = ["r1", "w_vcc_r1", "w_gnd_r1"];
const data = ["w_d0", "w_d1", "w_d2", "w_d3"];
const r1Lamps = [3, 2, 1, 0].flatMap((bit) => lampIds(`r1b${bit}`));
const r2 = ["r2", "w_vcc_r2", "w_gnd_r2"];
const bus = ["w_b0", "w_b1", "w_b2", "w_b3"];
const r2Lamps = [3, 2, 1, 0].flatMap((bit) => lampIds(`r2b${bit}`));
const control = [
  "gate",
  "w_vcc_gate",
  "w_gnd_gate",
  "w_p_gate",
  "w_clk_gate",
  "w_load",
  ...lampIds("loadled"),
  "clkgen",
];

/** What the board shows at each procedure step. */
export const boardShow: string[][] = [
  ids(supply, r1),
  ids(supply, r1, data),
  ids(supply, r1, data, r1Lamps),
  ids(supply, r1, data, r1Lamps, r2),
  ids(supply, r1, data, r1Lamps, r2, bus, r2Lamps),
  ids(supply, r1, data, r1Lamps, r2, bus, r2Lamps, ["w_ld1_r1"]),
  ids(supply, r1, data, r1Lamps, r2, bus, r2Lamps, ["w_ld1_r1"], control),
  ids(supply, r1, data, r1Lamps, r2, bus, r2Lamps, ["w_ld1_r1"], control),
  ids(supply, r1, data, r1Lamps, r2, bus, r2Lamps, ["w_ld1_r1"], control),
];
