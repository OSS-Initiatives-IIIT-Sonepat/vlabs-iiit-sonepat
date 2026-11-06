import { type ComponentInstance } from "@/labs/types";
import {
  chip,
  ids,
  input,
  lamp,
  power,
  powers,
  rail,
} from "@/labs/semesters/semester-03/_coa/breadboard";

const powerParts = power();
const placeParts: ComponentInstance[] = [
  chip("add", "adder-4bit", 14),
  ...powers("add", 14),
  rail("w_cin_gnd", "add", "c0", "gnd", 22),
];
const wireParts: ComponentInstance[] = [
  input("a1", "add", "a1", 4, "blue"),
  input("a2", "add", "a2", 5, "blue"),
  input("a3", "add", "a3", 6, "blue"),
  input("a4", "add", "a4", 7, "blue"),
  input("b1", "add", "b1", 8, "orange"),
  input("b2", "add", "b2", 9, "orange"),
  input("b3", "add", "b3", 10, "orange"),
  input("b4", "add", "b4", 11, "orange"),
];
const lampParts: ComponentInstance[] = [
  ...lamp("s1", "add", "s1", 26, "c", "green"),
  ...lamp("s2", "add", "s2", 26, "h", "green"),
  ...lamp("s3", "add", "s3", 34, "c", "green"),
  ...lamp("s4", "add", "s4", 34, "h", "green"),
  ...lamp("c4", "add", "c4", 42, "c", "yellow"),
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
