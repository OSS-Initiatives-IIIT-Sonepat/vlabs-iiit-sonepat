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

const filePower = power();
const fileParts: ComponentInstance[] = [
  chip("r0", "dff", 6),
  ...powers("r0", 6),
  chip("r1", "dff", 16),
  ...powers("r1", 16),
  rail("w_d0_vcc", "r0", "in", "vcc", 4),
  rail("w_d1_gnd", "r1", "in", "gnd", 14),
  rail("w_set0", "r0", "set_bar", "vcc", 24),
  rail("w_clr0", "r0", "clr_bar", "vcc", 25),
  rail("w_set1", "r1", "set_bar", "vcc", 26),
  rail("w_clr1", "r1", "clr_bar", "vcc", 27),
  input("clk", "r0", "clk", 28, "yellow"),
  link("w_clk_r1", "r0", "clk", "r1", "clk"),
  chip("mux", "mux-4to1", 32),
  ...powers("mux", 32),
  rail("w_en_gnd", "mux", "en1_bar", "gnd", 40),
  rail("w_s1_gnd", "mux", "s1", "gnd", 41),
  input("sel", "mux", "s0", 42, "orange"),
  link("w_r0_i0", "r0", "out", "mux", "i0_1"),
  link("w_r1_i1", "r1", "out", "mux", "i1_1"),
  ...lamp("bus", "mux", "y1", 46, "c", "green"),
];

export const stages = {
  power: ids(filePower),
  file: ids(fileParts),
};

export const components: ComponentInstance[] = [...filePower, ...fileParts];
