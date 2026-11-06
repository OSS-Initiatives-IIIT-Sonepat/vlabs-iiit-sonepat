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
  chip("inv", "not-hex", 6),
  chip("n1", "nand-quad", 16),
  chip("inv2", "not-hex", 26),
  chip("n2", "nand-quad", 36),
  ...powers("inv", 6),
  ...powers("n1", 16),
  ...powers("inv2", 26),
  ...powers("n2", 36),
];
const wireParts: ComponentInstance[] = [
  input("a", "inv", "4A", 2, "blue"),
  input("b", "inv", "1A", 3, "blue"),
  input("b", "n1", "3B", 3, "blue"),
  input("c", "inv", "2A", 4, "orange"),
  input("c", "n1", "2A", 4, "orange"),
  input("d", "inv", "3A", 5, "orange"),
  input("d", "n2", "1B", 5, "orange"),
  link("w_bp_n1", "inv", "1Y", "n1", "1A", "yellow"),
  link("w_cp_n1", "inv", "2Y", "n1", "1B", "yellow"),
  link("w_dp_n1", "inv", "3Y", "n1", "2B", "yellow"),
  link("w_ap_n1", "inv", "4Y", "n1", "3A", "yellow"),
  link("w_ab_inv", "n1", "3Y", "inv2", "1A", "green"),
  link("w_ab_n2", "inv2", "1Y", "n2", "1A", "green"),
  link("w_t1_u", "n1", "1Y", "n2", "2A", "white"),
  link("w_t2_u", "n1", "2Y", "n2", "2B", "white"),
  link("w_u_inv", "n2", "2Y", "inv2", "2A", "purple"),
  link("w_up_f", "inv2", "2Y", "n2", "3A", "purple"),
  link("w_t3_f", "n2", "1Y", "n2", "3B", "purple"),
];
const lampParts = lamp("f", "n2", "3Y", 48, "c", "green");

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
