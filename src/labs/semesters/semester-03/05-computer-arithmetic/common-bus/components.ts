import { type ComponentInstance } from "@/labs/types";
import { chip, input, lamp, link, power, powers, rail } from "../../_coa/breadboard";

// Four 4×1 muxes, one per bit. Input 0 is A, 1 is B, 2 is C, 3 is D.
// A = 1001, B = 0110, C = 1100, D = 0011. Bit 3 is the MSB.
const col = { m3: 4, m2: 14, m1: 24, m0: 34 };

const bits: Record<"m3" | "m2" | "m1" | "m0", [number, number, number, number]> = {
  m3: [1, 0, 1, 0],
  m2: [0, 1, 1, 0],
  m1: [0, 1, 0, 1],
  m0: [1, 0, 0, 1],
};

const data: ComponentInstance[] = [];
let railCol = 20;
for (const id of ["m3", "m2", "m1", "m0"] as const) {
  const pins = ["i0_1", "i1_1", "i2_1", "i3_1"] as const;
  bits[id].forEach((level, i) => {
    data.push(rail(`w_${pins[i]}_${id}`, id, pins[i], level ? "vcc" : "gnd", railCol));
    railCol += 1;
  });
}

export const components: ComponentInstance[] = [
  ...power(),
  chip("m3", "mux-4to1", col.m3),
  chip("m2", "mux-4to1", col.m2),
  chip("m1", "mux-4to1", col.m1),
  chip("m0", "mux-4to1", col.m0),
  ...powers("m3", col.m3),
  ...powers("m2", col.m2),
  ...powers("m1", col.m1),
  ...powers("m0", col.m0),
  rail("w_en_m3", "m3", "en1_bar", "gnd", 5),
  rail("w_en_m2", "m2", "en1_bar", "gnd", 6),
  rail("w_en_m1", "m1", "en1_bar", "gnd", 7),
  rail("w_en_m0", "m0", "en1_bar", "gnd", 8),
  ...data,
  input("s1", "m3", "s1", 2, "blue"),
  input("s0", "m3", "s0", 12, "orange"),
  link("w_s1_m2", "m3", "s1", "m2", "s1", "blue"),
  link("w_s1_m1", "m2", "s1", "m1", "s1", "blue"),
  link("w_s1_m0", "m1", "s1", "m0", "s1", "blue"),
  link("w_s0_m2", "m3", "s0", "m2", "s0", "orange"),
  link("w_s0_m1", "m2", "s0", "m1", "s0", "orange"),
  link("w_s0_m0", "m1", "s0", "m0", "s0", "orange"),
  // Upper lamps are bits 3 and 2. Lower lamps are bits 1 and 0.
  ...lamp("b3", "m3", "y1", 44, "c", "red"),
  ...lamp("b2", "m2", "y1", 50, "c", "red"),
  ...lamp("b1", "m1", "y1", 44, "h", "green"),
  ...lamp("b0", "m0", "y1", 50, "h", "green"),
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
const muxes = ["m3", "m2", "m1", "m0"].flatMap((id) => [id, `w_vcc_${id}`, `w_gnd_${id}`, `w_en_${id}`]);
const wires = data.map((part) => part.id);
const selects = ["w_s1_m3", "w_s0_m3", "w_s1_m2", "w_s1_m1", "w_s1_m0", "w_s0_m2", "w_s0_m1", "w_s0_m0"];
const lamps = ["b3", "b2", "b1", "b0"].flatMap(lampIds);

const built = ids(supply, muxes, wires, selects, lamps);

export const boardShow: string[][] = [
  supply,
  ids(supply, muxes),
  ids(supply, muxes),
  ids(supply, muxes, wires),
  built,
  built,
  built,
  built,
];
