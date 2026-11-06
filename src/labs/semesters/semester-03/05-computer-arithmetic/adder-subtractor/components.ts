import { type ComponentInstance } from "@/labs/types";
import {
  chip,
  lamp,
  link,
  power,
  powers,
  rail,
  input,
} from "../../_coa/breadboard";

// A = 1010, B = 0011. M = 0 adds (0 1101). M = 1 subtracts (1 0111).
// Each XOR passes B when M is 0 and inverts B when M is 1. M is also C0.
const bTie: ["vcc" | "gnd", number][] = [
  ["vcc", 2],
  ["vcc", 3],
  ["gnd", 48],
  ["gnd", 49],
];
const aTie: ["vcc" | "gnd", number][] = [
  ["gnd", 51],
  ["vcc", 53],
  ["gnd", 57],
  ["vcc", 59],
];

const xors = [0, 1, 2, 3].map((bit) =>
  chip(`x${bit}`, "xor-gate", 4 + bit * 8),
);

export const components: ComponentInstance[] = [
  ...power(),
  chip("fa", "adder-4bit", 36),
  ...powers("fa", 36),
  ...xors,
  ...[0, 1, 2, 3].flatMap((bit) => powers(`x${bit}`, 4 + bit * 8)),
  ...[0, 1, 2, 3].map((bit, i) =>
    rail(`w_b${bit}`, `x${bit}`, "A", bTie[i][0], bTie[i][1]),
  ),
  ...[0, 1, 2, 3].map((bit, i) =>
    rail(`w_a${bit + 1}`, "fa", `a${bit + 1}`, aTie[i][0], aTie[i][1]),
  ),
  input("m", "x3", "B", 29, "yellow"),
  link("w_m_32", "x3", "B", "x2", "B", "yellow"),
  link("w_m_21", "x2", "B", "x1", "B", "yellow"),
  link("w_m_10", "x1", "B", "x0", "B", "yellow"),
  link("w_m_c0", "x0", "B", "fa", "c0", "yellow"),
  ...[0, 1, 2, 3].map((bit) =>
    link(`w_y${bit}`, `x${bit}`, "Y", "fa", `b${bit + 1}`, "green"),
  ),
  ...lamp("c4", "fa", "c4", 44, "c", "red"),
  ...lamp("s3", "fa", "s4", 50, "c", "red"),
  ...lamp("s2", "fa", "s3", 56, "c", "green"),
  ...lamp("s1", "fa", "s2", 44, "h", "green"),
  ...lamp("s0", "fa", "s1", 50, "h", "green"),
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
const xorIds = [0, 1, 2, 3].flatMap((bit) => [
  `x${bit}`,
  `w_vcc_x${bit}`,
  `w_gnd_x${bit}`,
]);
const bBits = [0, 1, 2, 3].map((bit) => `w_b${bit}`);
const mode = ["w_m_x3", "w_m_32", "w_m_21", "w_m_10", "w_m_c0"];
const aBits = ["w_a1", "w_a2", "w_a3", "w_a4"];
const sums = [0, 1, 2, 3].map((bit) => `w_y${bit}`);
const lamps = ["c4", "s3", "s2", "s1", "s0"].flatMap(lampIds);
const wired = ids(supply, adder, xorIds, bBits, mode, aBits, sums);
const built = ids(wired, lamps);

export const boardShow: string[][] = [
  supply,
  ids(supply, adder),
  ids(supply, adder, xorIds, bBits),
  ids(supply, adder, xorIds, bBits, mode),
  wired,
  built,
  built,
];
