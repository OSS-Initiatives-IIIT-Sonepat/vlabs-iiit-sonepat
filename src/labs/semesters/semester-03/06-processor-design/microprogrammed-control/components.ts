import { type ComponentInstance } from "@/labs/types";
import {
  chip,
  ids,
  input,
  lamp,
  link,
  memory,
  power,
  powers,
  rail,
} from "@/labs/semesters/semester-03/_coa/breadboard";

const powerParts = power();
const counterParts: ComponentInstance[] = [
  chip("car", "counter-4bit-sync", 8),
  ...powers("car", 8),
  input("clk", "car", "clk", 4, "yellow"),
  rail("w_clr_vcc", "car", "clr_bar", "vcc", 16),
  rail("w_ld_vcc", "car", "ld_bar", "vcc", 17),
  rail("w_enp_vcc", "car", "enp", "vcc", 18),
  rail("w_ent_vcc", "car", "ent", "vcc", 19),
  rail("w_d0_gnd", "car", "d0", "gnd", 20),
  rail("w_d1_gnd", "car", "d1", "gnd", 21),
  rail("w_d2_gnd", "car", "d2", "gnd", 22),
  rail("w_d3_gnd", "car", "d3", "gnd", 23),
];
const romParts: ComponentInstance[] = [
  memory("rom", "rom", 28, [0b0001, 0b0010, 0b0100, 0b1000]),
  ...powers("rom", 28),
  rail("w_cs_gnd", "rom", "cs", "gnd", 36),
  rail("w_oe_gnd", "rom", "oe", "gnd", 37),
  link("w_a0", "car", "q0", "rom", "a0"),
  link("w_a1", "car", "q1", "rom", "a1"),
  link("w_a2", "car", "q2", "rom", "a2"),
  link("w_a3", "car", "q3", "rom", "a3"),
  ...lamp("d0", "rom", "d0", 42, "c", "green"),
  ...lamp("d1", "rom", "d1", 48, "c", "green"),
  ...lamp("d2", "rom", "d2", 42, "h", "yellow"),
  ...lamp("d3", "rom", "d3", 48, "h", "yellow"),
];

export const stages = {
  power: ids(powerParts),
  counter: ids(counterParts),
  rom: ids(romParts),
};

export const components: ComponentInstance[] = [
  ...powerParts,
  ...counterParts,
  ...romParts,
];
