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
  chip("inv", "not-gate", 20),
  chip("bit", "dff", 30),
  ...powers("dec", 8),
  ...powers("inv", 20),
  ...powers("bit", 30),
  rail("w_e1_vcc", "dec", "e1", "vcc", 16),
  rail("w_e2_gnd", "dec", "e2", "gnd", 17),
  rail("w_e3_gnd", "dec", "e3", "gnd", 18),
  rail("w_set_vcc", "bit", "set_bar", "vcc", 31),
  rail("w_clr_vcc", "bit", "clr_bar", "vcc", 32),
];
const wireParts: ComponentInstance[] = [
  input("a0", "dec", "a0", 4, "blue"),
  input("a1", "dec", "a1", 5, "blue"),
  input("a2", "dec", "a2", 6, "blue"),
  input("d", "bit", "in", 2, "orange"),
  input("clk", "bit", "clk", 3, "yellow"),
  link("w_y0_inv", "dec", "y0", "inv", "A", "green"),
];
const lampParts: ComponentInstance[] = [
  ...lamp("word", "inv", "Y", 42, "c", "yellow"),
  ...lamp("q", "bit", "out", 42, "h", "green"),
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
