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

const add1Parts: ComponentInstance[] = [
  chip("add1", "adder-4bit", 4),
  ...powers("add1", 4),
  rail("w_c0_add1", "add1", "c0", "gnd", 12),
  input("a1", "add1", "a1", 13, "blue"),
  input("a2", "add1", "a2", 21, "blue"),
  input("a3", "add1", "a3", 29, "blue"),
  input("a4", "add1", "a4", 30, "blue"),
  input("b1", "add1", "b1", 31, "orange"),
  input("b2", "add1", "b2", 40, "orange"),
  input("b3", "add1", "b3", 41, "orange"),
  input("b4", "add1", "b4", 54, "orange"),
];

const andParts: ComponentInstance[] = [
  chip("and1", "and-quad", 14),
  ...powers("and1", 14),
  link("w_z8_and_a", "add1", "s4", "and1", "1A"),
  link("w_z4_and_b", "add1", "s3", "and1", "1B"),
  link("w_z8_and_c", "add1", "s4", "and1", "2A"),
  link("w_z2_and_d", "add1", "s2", "and1", "2B"),
];

const orParts: ComponentInstance[] = [
  chip("or1", "or-quad", 22),
  ...powers("or1", 22),
  link("w_and_or_a", "and1", "1Y", "or1", "1A"),
  link("w_and_or_b", "and1", "2Y", "or1", "1B"),
  link("w_or_or", "or1", "1Y", "or1", "2A"),
  link("w_k_or", "add1", "c4", "or1", "2B"),
];

const add2Parts: ComponentInstance[] = [
  chip("add2", "adder-4bit", 32),
  ...powers("add2", 32),
  rail("w_c0_add2", "add2", "c0", "gnd", 55),
  rail("w_b1_gnd", "add2", "b1", "gnd", 56),
  rail("w_b4_gnd", "add2", "b4", "gnd", 57),
  link("w_z1_a", "add1", "s1", "add2", "a1"),
  link("w_z2_a", "add1", "s2", "add2", "a2"),
  link("w_z4_a", "add1", "s3", "add2", "a3"),
  link("w_z8_a", "add1", "s4", "add2", "a4"),
  link("w_c_b2", "or1", "2Y", "add2", "b2"),
  link("w_c_b3", "or1", "2Y", "add2", "b3"),
  ...lamp("u1", "add2", "s1", 42, "c", "green"),
  ...lamp("u2", "add2", "s2", 48, "c", "green"),
  ...lamp("u4", "add2", "s3", 42, "h", "green"),
  ...lamp("u8", "add2", "s4", 48, "h", "green"),
  ...lamp("tens", "add2", "c4", 54, "h", "yellow"),
];

export const stages = {
  power: ids(powerParts),
  add1: ids(add1Parts),
  and: ids(andParts),
  or: ids(orParts),
  add2: ids(add2Parts),
};

export const components: ComponentInstance[] = [
  ...powerParts,
  ...add1Parts,
  ...andParts,
  ...orParts,
  ...add2Parts,
];
