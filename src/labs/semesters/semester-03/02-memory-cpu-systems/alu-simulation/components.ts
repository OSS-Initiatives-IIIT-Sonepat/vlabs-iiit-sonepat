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
  chip("and1", "and-gate", 10),
  chip("or1", "or-gate", 18),
  chip("xor1", "xor-gate", 26),
  chip("mux", "mux-4to1", 34),
  ...powers("and1", 10),
  ...powers("or1", 18),
  ...powers("xor1", 26),
  ...powers("mux", 34),
  rail("w_i3_gnd", "mux", "i3_1", "gnd", 42),
  rail("w_en_gnd", "mux", "en1_bar", "gnd", 43),
];
const wireParts: ComponentInstance[] = [
  input("a", "and1", "A", 4, "blue"),
  input("a", "or1", "A", 4, "blue"),
  input("a", "xor1", "A", 4, "blue"),
  input("b", "and1", "B", 5, "orange"),
  input("b", "or1", "B", 5, "orange"),
  input("b", "xor1", "B", 5, "orange"),
  input("s0", "mux", "s0", 6, "purple"),
  input("s1", "mux", "s1", 7, "purple"),
  link("w_and_i0", "and1", "Y", "mux", "i0_1", "yellow"),
  link("w_or_i1", "or1", "Y", "mux", "i1_1", "yellow"),
  link("w_xor_i2", "xor1", "Y", "mux", "i2_1", "green"),
];
const lampParts = lamp("y", "mux", "y1", 46, "c", "green");

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
