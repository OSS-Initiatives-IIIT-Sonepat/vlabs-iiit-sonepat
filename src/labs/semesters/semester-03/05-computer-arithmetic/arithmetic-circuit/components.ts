import { type ComponentInstance } from "@/labs/types";
import {
  chip,
  input,
  lamp,
  link,
  power,
  powers,
  rail,
} from "../../_coa/breadboard";

// A = 1101, B = 0011, so B' = 1100. One 74HC153 per bit picks Y.
// S1 S0: 00 B, 01 B', 10 0, 11 1. Cin is the adder's C0.
// Lamps sit on the left. Upper: Cout, D3, D2. Lower: D1, D0.
const muxCol = [24, 32, 40, 48];
const aLevel: ("vcc" | "gnd")[] = ["vcc", "gnd", "vcc", "vcc"];
const bLevel: ("vcc" | "gnd")[] = ["vcc", "vcc", "gnd", "gnd"];
const bpLevel: ("vcc" | "gnd")[] = ["gnd", "gnd", "vcc", "vcc"];

export const components: ComponentInstance[] = [
  ...power(),
  chip("fa", "adder-4bit", 16),
  ...powers("fa", 16),
  ...[0, 1, 2, 3].map((bit) => chip(`m${bit}`, "mux-4to1", muxCol[bit])),
  ...[0, 1, 2, 3].flatMap((bit) => powers(`m${bit}`, muxCol[bit])),
  ...[0, 1, 2, 3].map((bit) =>
    rail(`w_en_${bit}`, `m${bit}`, "en1_bar", "gnd", 2),
  ),
  ...[0, 1, 2, 3].map((bit) =>
    rail(`w_a${bit + 1}`, "fa", `a${bit + 1}`, aLevel[bit], 3),
  ),
  ...[0, 1, 2, 3].map((bit) =>
    rail(`w_b${bit}`, `m${bit}`, "i0_1", bLevel[bit], 15),
  ),
  ...[0, 1, 2, 3].map((bit) =>
    rail(`w_bp${bit}`, `m${bit}`, "i1_1", bpLevel[bit], 16),
  ),
  ...[0, 1, 2, 3].map((bit) => rail(`w_z${bit}`, `m${bit}`, "i2_1", "gnd", 17)),
  ...[0, 1, 2, 3].map((bit) => rail(`w_o${bit}`, `m${bit}`, "i3_1", "vcc", 19)),
  ...[0, 1, 2, 3].map((bit) =>
    link(`w_y${bit}`, `m${bit}`, "y1", "fa", `b${bit + 1}`, "green"),
  ),
  input("s1", "m3", "s1", 5, "blue"),
  input("s0", "m3", "s0", 6, "orange"),
  link("w_s1_32", "m3", "s1", "m2", "s1", "blue"),
  link("w_s1_21", "m2", "s1", "m1", "s1", "blue"),
  link("w_s1_10", "m1", "s1", "m0", "s1", "blue"),
  link("w_s0_32", "m3", "s0", "m2", "s0", "orange"),
  link("w_s0_21", "m2", "s0", "m1", "s0", "orange"),
  link("w_s0_10", "m1", "s0", "m0", "s0", "orange"),
  input("cin", "fa", "c0", 11, "yellow"),
  ...lamp("cout", "fa", "c4", 4, "c", "red"),
  ...lamp("d3", "fa", "s4", 10, "c", "red"),
  ...lamp("d2", "fa", "s3", 56, "c", "green"),
  ...lamp("d1", "fa", "s2", 4, "h", "green"),
  ...lamp("d0", "fa", "s1", 10, "h", "green"),
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
const adder = ["fa", "w_vcc_fa", "w_gnd_fa"];
const muxes = [0, 1, 2, 3].flatMap((bit) => [
  `m${bit}`,
  `w_vcc_m${bit}`,
  `w_gnd_m${bit}`,
  `w_en_${bit}`,
]);
const data = [0, 1, 2, 3].flatMap((bit) => [
  `w_a${bit + 1}`,
  `w_b${bit}`,
  `w_bp${bit}`,
  `w_z${bit}`,
  `w_o${bit}`,
  `w_y${bit}`,
]);
const select = [
  "w_s1_m3",
  "w_s0_m3",
  "w_s1_32",
  "w_s1_21",
  "w_s1_10",
  "w_s0_32",
  "w_s0_21",
  "w_s0_10",
  "w_cin_fa",
];
const lamps = ["cout", "d3", "d2", "d1", "d0"].flatMap(lampIds);
const wired = ids(supply, adder, muxes, data, select);
const built = ids(wired, lamps);

export const boardShow: string[][] = [
  supply,
  ids(supply, adder),
  wired,
  built,
  built,
  built,
  built,
  built,
  built,
  built,
  built,
];
