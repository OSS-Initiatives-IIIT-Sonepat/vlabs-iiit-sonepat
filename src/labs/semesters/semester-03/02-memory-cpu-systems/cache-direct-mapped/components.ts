import { type ComponentInstance } from "@/labs/types";
import {
  chip,
  ids,
  input,
  lamp,
  link,
  power,
  powers,
  rail,
} from "@/labs/semesters/semester-03/_coa/breadboard";

const powerParts = power();
const placeParts: ComponentInstance[] = [
  chip("dec", "decoder-3to8", 8),
  chip("nline", "not-gate", 18),
  chip("xor1", "xor-gate", 26),
  chip("nmatch", "not-gate", 34),
  chip("hit", "and-gate", 42),
  ...powers("dec", 8),
  ...powers("nline", 18),
  ...powers("xor1", 26),
  ...powers("nmatch", 34),
  ...powers("hit", 42),
  rail("w_a1_gnd", "dec", "a1", "gnd", 16),
  rail("w_a2_gnd", "dec", "a2", "gnd", 17),
  rail("w_e1_vcc", "dec", "e1", "vcc", 18),
  rail("w_e2_gnd", "dec", "e2", "gnd", 19),
  rail("w_e3_gnd", "dec", "e3", "gnd", 20),
  rail("w_tag_vcc", "xor1", "B", "vcc", 27),
];
const wireParts: ComponentInstance[] = [
  input("idx", "dec", "a0", 4, "blue"),
  input("tag", "xor1", "A", 5, "orange"),
  link("w_y0_not", "dec", "y0", "nline", "A", "green"),
  link("w_xor_not", "xor1", "Y", "nmatch", "A", "yellow"),
  link("w_line_and", "nline", "Y", "hit", "A", "yellow"),
  link("w_match_and", "nmatch", "Y", "hit", "B", "yellow"),
];
const lampParts: ComponentInstance[] = [
  ...lamp("line", "nline", "Y", 52, "c", "yellow"),
  ...lamp("hit", "hit", "Y", 52, "h", "green"),
];

export const stages = {
  power: ids(powerParts),
  place: ids(placeParts),
  wire: ids(wireParts),
  lamps: ids(lampParts),
};

export const components: ComponentInstance[] = [
  ...powerParts,
  ...placeParts,
  ...wireParts,
  ...lampParts,
];
