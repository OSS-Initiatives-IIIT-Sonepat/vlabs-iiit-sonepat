import { type ComponentInstance } from "@/labs/types";
import { chip, input, lamp, power, powers, rail } from "../../_coa/breadboard";

// A = 1101, B = 0000. C0 = 0 copies A. C0 = 1 increments it to 1110.
const ties: [string, string, "vcc" | "gnd", number][] = [
  ["w_a1", "a1", "vcc", 2],
  ["w_a2", "a2", "gnd", 3],
  ["w_a3", "a3", "vcc", 4],
  ["w_a4", "a4", "vcc", 5],
  ["w_b1", "b1", "gnd", 6],
  ["w_b2", "b2", "gnd", 7],
  ["w_b3", "b3", "gnd", 8],
  ["w_b4", "b4", "gnd", 9],
];

export const components: ComponentInstance[] = [
  ...power(),
  chip("fa", "adder-4bit", 12),
  ...powers("fa", 12),
  ...ties.map(([id, pin, level, col]) => rail(id, "fa", pin, level, col)),
  input("cin", "fa", "c0", 22, "yellow"),
  ...lamp("c4", "fa", "c4", 24, "c", "red"),
  ...lamp("s3", "fa", "s4", 32, "c", "red"),
  ...lamp("s2", "fa", "s3", 40, "c", "green"),
  ...lamp("s1", "fa", "s2", 24, "h", "green"),
  ...lamp("s0", "fa", "s1", 32, "h", "green"),
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
const data = ties.map(([id]) => id);
const carry = ["w_cin_fa"];
const lamps = ["c4", "s3", "s2", "s1", "s0"].flatMap(lampIds);
const built = ids(supply, adder, data, carry, lamps);

export const boardShow: string[][] = [
  supply,
  ids(supply, adder),
  ids(supply, adder, data),
  built,
  built,
  built,
];
