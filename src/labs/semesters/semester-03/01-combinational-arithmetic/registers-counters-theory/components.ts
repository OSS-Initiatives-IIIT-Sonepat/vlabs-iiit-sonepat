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
  chip("cnt", "counter-4bit-sync", 12),
  ...powers("cnt", 12),
  rail("w_clr_vcc", "cnt", "clr_bar", "vcc", 20),
  rail("w_ld_vcc", "cnt", "ld_bar", "vcc", 21),
  rail("w_enp_vcc", "cnt", "enp", "vcc", 22),
  rail("w_ent_vcc", "cnt", "ent", "vcc", 23),
  rail("w_d0_gnd", "cnt", "d0", "gnd", 24),
  rail("w_d1_gnd", "cnt", "d1", "gnd", 25),
  rail("w_d2_gnd", "cnt", "d2", "gnd", 26),
  rail("w_d3_gnd", "cnt", "d3", "gnd", 27),
];
const wireParts: ComponentInstance[] = [
  input("clk", "cnt", "clk", 4, "yellow"),
];
const lampParts: ComponentInstance[] = [
  ...lamp("q0", "cnt", "q0", 28, "c", "green"),
  ...lamp("q1", "cnt", "q1", 28, "h", "green"),
  ...lamp("q2", "cnt", "q2", 36, "c", "green"),
  ...lamp("q3", "cnt", "q3", 36, "h", "yellow"),
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
