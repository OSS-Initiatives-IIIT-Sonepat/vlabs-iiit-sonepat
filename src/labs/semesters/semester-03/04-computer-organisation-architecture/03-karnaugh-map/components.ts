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
  chip("inv", "not-hex", 8),
  chip("prod", "and-quad", 18),
  chip("sum", "or-quad", 28),
  ...powers("inv", 8),
  ...powers("prod", 18),
  ...powers("sum", 28),
];
const wireParts: ComponentInstance[] = [
  input("a", "inv", "4A", 2, "blue"),
  input("b", "inv", "1A", 3, "blue"),
  input("b", "prod", "3B", 3, "blue"),
  input("c", "inv", "2A", 4, "orange"),
  input("c", "prod", "2A", 4, "orange"),
  input("d", "inv", "3A", 5, "orange"),
  input("d", "prod", "4B", 5, "orange"),
  link("w_bp_t1", "inv", "1Y", "prod", "1A", "yellow"),
  link("w_cp_t1", "inv", "2Y", "prod", "1B", "yellow"),
  link("w_dp_t2", "inv", "3Y", "prod", "2B", "yellow"),
  link("w_ap_t3", "inv", "4Y", "prod", "3A", "yellow"),
  link("w_ab_t3", "prod", "3Y", "prod", "4A", "green"),
  link("w_t1_or", "prod", "1Y", "sum", "1A", "green"),
  link("w_t2_or", "prod", "2Y", "sum", "1B", "green"),
  link("w_or_f", "sum", "1Y", "sum", "2A", "white"),
  link("w_t3_or", "prod", "4Y", "sum", "2B", "white"),
];
const lampParts = lamp("f", "sum", "2Y", 40, "c", "green");

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
