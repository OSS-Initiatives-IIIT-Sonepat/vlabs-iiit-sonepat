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
  chip("jk1", "jk-ff", 10),
  chip("inv", "not-gate", 22),
  ...powers("jk1", 10),
  ...powers("inv", 22),
  rail("w_set_vcc", "jk1", "set", "vcc", 11),
  rail("w_clr_vcc", "jk1", "clr", "vcc", 12),
];
const wireParts: ComponentInstance[] = [
  input("d", "jk1", "j", 4, "blue"),
  input("d", "inv", "A", 4, "blue"),
  input("clk", "jk1", "clk", 6, "yellow"),
  link("w_not_k", "inv", "Y", "jk1", "k", "orange"),
];
const lampParts = lamp("q", "jk1", "out", 36, "c", "green");

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
