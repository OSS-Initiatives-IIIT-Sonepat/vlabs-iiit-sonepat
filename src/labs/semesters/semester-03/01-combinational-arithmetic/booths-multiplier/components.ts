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
  chip("xor1", "xor-gate", 8),
  chip("add", "adder-4bit", 18),
  ...powers("xor1", 8),
  ...powers("add", 18),
  rail("w_a2_gnd", "add", "a2", "gnd", 26),
  rail("w_a3_gnd", "add", "a3", "gnd", 27),
  rail("w_a4_gnd", "add", "a4", "gnd", 28),
  rail("w_b2_gnd", "add", "b2", "gnd", 29),
  rail("w_b3_gnd", "add", "b3", "gnd", 30),
  rail("w_b4_gnd", "add", "b4", "gnd", 31),
];
const wireParts: ComponentInstance[] = [
  input("m", "xor1", "A", 4, "blue"),
  input("sub", "xor1", "B", 5, "orange"),
  input("sub", "add", "c0", 5, "orange"),
  input("acc", "add", "b1", 6, "purple"),
  link("w_xor_a1", "xor1", "Y", "add", "a1", "yellow"),
];
const lampParts: ComponentInstance[] = [
  ...lamp("s1", "add", "s1", 32, "c", "green"),
  ...lamp("s2", "add", "s2", 32, "h", "yellow"),
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
