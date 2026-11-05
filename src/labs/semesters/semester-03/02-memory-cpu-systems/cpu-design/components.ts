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
  chip("pc", "counter-4bit-sync", 8),
  chip("dec", "decoder-3to8", 20),
  chip("n0", "not-gate", 30),
  chip("n1", "not-gate", 38),
  ...powers("pc", 8),
  ...powers("dec", 20),
  ...powers("n0", 30),
  ...powers("n1", 38),
  rail("w_clr_vcc", "pc", "clr_bar", "vcc", 16),
  rail("w_ld_vcc", "pc", "ld_bar", "vcc", 17),
  rail("w_enp_vcc", "pc", "enp", "vcc", 18),
  rail("w_ent_vcc", "pc", "ent", "vcc", 19),
  rail("w_d0_gnd", "pc", "d0", "gnd", 46),
  rail("w_d1_gnd", "pc", "d1", "gnd", 47),
  rail("w_d2_gnd", "pc", "d2", "gnd", 48),
  rail("w_d3_gnd", "pc", "d3", "gnd", 49),
  rail("w_e1_vcc", "dec", "e1", "vcc", 28),
  rail("w_e2_gnd", "dec", "e2", "gnd", 29),
  rail("w_e3_gnd", "dec", "e3", "gnd", 46),
];
const wireParts: ComponentInstance[] = [
  input("clk", "pc", "clk", 4, "yellow"),
  link("w_q0_a0", "pc", "q0", "dec", "a0", "blue"),
  link("w_q1_a1", "pc", "q1", "dec", "a1", "blue"),
  link("w_q2_a2", "pc", "q2", "dec", "a2", "blue"),
  link("w_y0_n0", "dec", "y0", "n0", "A", "green"),
  link("w_y1_n1", "dec", "y1", "n1", "A", "green"),
];
const lampParts: ComponentInstance[] = [
  ...lamp("i0", "n0", "Y", 48, "c", "green"),
  ...lamp("i1", "n1", "Y", 48, "h", "yellow"),
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
