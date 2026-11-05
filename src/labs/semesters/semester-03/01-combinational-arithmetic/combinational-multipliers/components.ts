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
  chip("and0", "and-gate", 8),
  chip("and1", "and-gate", 16),
  chip("and2", "and-gate", 24),
  chip("and3", "and-gate", 32),
  chip("add", "adder-4bit", 40),
  ...powers("and0", 8),
  ...powers("and1", 16),
  ...powers("and2", 24),
  ...powers("and3", 32),
  ...powers("add", 40),
  rail("w_c0_gnd", "add", "c0", "gnd", 48),
  rail("w_a2_gnd", "add", "a2", "gnd", 49),
  rail("w_a3_gnd", "add", "a3", "gnd", 50),
  rail("w_a4_gnd", "add", "a4", "gnd", 51),
  rail("w_b3_gnd", "add", "b3", "gnd", 52),
  rail("w_b4_gnd", "add", "b4", "gnd", 53),
];
const wireParts: ComponentInstance[] = [
  input("a0", "and0", "A", 2, "blue"),
  input("b0", "and0", "B", 4, "orange"),
  input("a1", "and1", "A", 3, "blue"),
  input("b0", "and1", "B", 4, "orange"),
  input("a0", "and2", "A", 2, "blue"),
  input("b1", "and2", "B", 5, "orange"),
  input("a1", "and3", "A", 3, "blue"),
  input("b1", "and3", "B", 5, "orange"),
  link("w_pp1_a", "and1", "Y", "add", "a1", "yellow"),
  link("w_pp2_b", "and2", "Y", "add", "b1", "yellow"),
  link("w_pp3_b", "and3", "Y", "add", "b2", "green"),
];
const lampParts: ComponentInstance[] = [
  ...lamp("p0", "and0", "Y", 48, "c", "green"),
  ...lamp("s1", "add", "s1", 48, "h", "green"),
  ...lamp("s2", "add", "s2", 54, "c", "green"),
  ...lamp("s3", "add", "s3", 54, "h", "yellow"),
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
