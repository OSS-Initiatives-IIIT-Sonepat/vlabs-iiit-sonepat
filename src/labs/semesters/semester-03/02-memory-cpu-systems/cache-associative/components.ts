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
  chip("xor0", "xor-gate", 8),
  chip("xor1", "xor-gate", 16),
  chip("nor1", "nor-gate", 24),
  ...powers("xor0", 8),
  ...powers("xor1", 16),
  ...powers("nor1", 24),
  rail("w_s0_gnd", "xor0", "B", "gnd", 9),
  rail("w_s1_vcc", "xor1", "B", "vcc", 17),
];
const wireParts: ComponentInstance[] = [
  input("t0", "xor0", "A", 4, "blue"),
  input("t1", "xor1", "A", 5, "orange"),
  link("w_x0_nor", "xor0", "Y", "nor1", "A", "yellow"),
  link("w_x1_nor", "xor1", "Y", "nor1", "B", "yellow"),
];
const lampParts = lamp("hit", "nor1", "Y", 36, "c", "green");

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
