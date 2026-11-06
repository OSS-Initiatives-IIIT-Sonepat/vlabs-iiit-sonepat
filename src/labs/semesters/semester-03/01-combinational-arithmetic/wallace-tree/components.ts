import { type ComponentInstance } from "@/labs/types";
import {
  chip,
  ids,
  input,
  lamp,
  link,
  power,
  powers,
} from "@/labs/semesters/semester-03/_coa/breadboard";

const powerParts = power();
const placeParts: ComponentInstance[] = [
  chip("andA", "and-gate", 8),
  chip("andB", "and-gate", 16),
  chip("xor1", "xor-gate", 24),
  chip("andC", "and-gate", 32),
  ...powers("andA", 8),
  ...powers("andB", 16),
  ...powers("xor1", 24),
  ...powers("andC", 32),
];
const wireParts: ComponentInstance[] = [
  input("a1", "andA", "A", 4, "blue"),
  input("b0", "andA", "B", 5, "orange"),
  input("a0", "andB", "A", 6, "blue"),
  input("b1", "andB", "B", 7, "orange"),
  link("w_anda_xor", "andA", "Y", "xor1", "A", "yellow"),
  link("w_andb_xor", "andB", "Y", "xor1", "B", "yellow"),
  link("w_anda_andc", "andA", "Y", "andC", "A", "green"),
  link("w_andb_andc", "andB", "Y", "andC", "B", "green"),
];
const lampParts: ComponentInstance[] = [
  ...lamp("sum", "xor1", "Y", 44, "c", "green"),
  ...lamp("carry", "andC", "Y", 44, "h", "yellow"),
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
