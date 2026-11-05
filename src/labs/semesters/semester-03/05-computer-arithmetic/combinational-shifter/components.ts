import { type ComponentInstance } from "@/labs/types";
import { chip, input, lamp, link, power, powers, rail } from "../../_coa/breadboard";

// The word is written left to right, so index 0 is the left bit.
// A0 A1 A2 A3 = 1 1 0 1. S = 0 shifts right (down the drawing), S = 1 shifts left.
// H0 gets IR or A1. H1 gets A0 or A2. H2 gets A1 or A3. H3 gets A2 or IL.
// Each 74HC153 holds two of the four muxes. Its S1 pin stays at 0, so S0 is the shift select.
const aLevel: ("vcc" | "gnd")[] = ["vcc", "vcc", "gnd", "vcc"];

export const components: ComponentInstance[] = [
  ...power(),
  chip("mh", "mux-4to1", 24),
  chip("ml", "mux-4to1", 40),
  ...powers("mh", 24),
  ...powers("ml", 40),
  rail("w_en1_mh", "mh", "en1_bar", "gnd", 2),
  rail("w_en2_mh", "mh", "en2_bar", "gnd", 2),
  rail("w_en1_ml", "ml", "en1_bar", "gnd", 2),
  rail("w_en2_ml", "ml", "en2_bar", "gnd", 2),
  rail("w_s1_mh", "mh", "s1", "gnd", 2),
  rail("w_s1_ml", "ml", "s1", "gnd", 2),
  input("s", "mh", "s0", 5, "blue"),
  link("w_s_link", "mh", "s0", "ml", "s0", "blue"),
  input("ir", "mh", "i0_1", 6, "orange"),
  input("il", "ml", "i1_2", 11, "yellow"),
  rail("w_a1_h0", "mh", "i1_1", aLevel[1], 3),
  rail("w_a0_h1", "mh", "i0_2", aLevel[0], 3),
  rail("w_a2_h1", "mh", "i1_2", aLevel[2], 3),
  rail("w_a1_h2", "ml", "i0_1", aLevel[1], 3),
  rail("w_a3_h2", "ml", "i1_1", aLevel[3], 3),
  rail("w_a2_h3", "ml", "i0_2", aLevel[2], 3),
  ...lamp("h0", "mh", "y1", 4, "c", "red"),
  ...lamp("h1", "mh", "y2", 10, "c", "red"),
  ...lamp("h2", "ml", "y1", 4, "h", "green"),
  ...lamp("h3", "ml", "y2", 10, "h", "green"),
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
const muxes = [
  "mh",
  "ml",
  "w_vcc_mh",
  "w_gnd_mh",
  "w_vcc_ml",
  "w_gnd_ml",
  "w_en1_mh",
  "w_en2_mh",
  "w_en1_ml",
  "w_en2_ml",
  "w_s1_mh",
  "w_s1_ml",
];
const data = [
  "w_s_mh",
  "w_s_link",
  "w_ir_mh",
  "w_il_ml",
  "w_a1_h0",
  "w_a0_h1",
  "w_a2_h1",
  "w_a1_h2",
  "w_a3_h2",
  "w_a2_h3",
];
const lamps = ["h0", "h1", "h2", "h3"].flatMap(lampIds);
const wired = ids(supply, muxes, data);
const built = ids(wired, lamps);

export const boardShow: string[][] = [
  supply,
  supply,
  ids(supply, muxes),
  wired,
  wired,
  built,
  built,
  built,
  built,
  built,
  built,
];
