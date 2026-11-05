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
const cpuParts: ComponentInstance[] = [
  chip("cpu", "cpu", 6),
  ...powers("cpu", 6),
  rail("w_clk_gnd", "cpu", "clk", "gnd", 4),
  rail("w_rd_gnd", "cpu", "rd", "gnd", 14),
  rail("w_wr_vcc", "cpu", "wr", "vcc", 15),
  memory("ram", "ram", 18, [0b0001]),
  ...powers("ram", 18),
  rail("w_cs_gnd", "ram", "cs", "gnd", 26),
  rail("w_oe_gnd", "ram", "oe", "gnd", 27),
  link("w_a0", "cpu", "a0", "ram", "a0"),
  link("w_a1", "cpu", "a1", "ram", "a1"),
  link("w_a2", "cpu", "a2", "ram", "a2"),
  link("w_a3", "cpu", "a3", "ram", "a3"),
];
const portParts: ComponentInstance[] = [
  chip("port", "io-port", 32),
  ...powers("port", 32),
  input("stb", "port", "stb", 28, "yellow"),
  input("d0", "port", "d0", 29, "blue"),
  input("d1", "port", "d1", 30, "blue"),
  input("d2", "port", "d2", 31, "blue"),
  input("d3", "port", "d3", 41, "blue"),
  link("w_flag_int", "port", "flag", "cpu", "int"),
  ...lamp("q0", "port", "q0", 42, "c", "green"),
  ...lamp("q1", "port", "q1", 42, "h", "green"),
  ...lamp("q2", "port", "q2", 48, "c", "green"),
  ...lamp("q3", "port", "q3", 48, "h", "green"),
  ...lamp("flag", "port", "flag", 54, "c", "red"),
];

export const stages = {
  power: ids(powerParts),
  cpu: ids(cpuParts),
  port: ids(portParts),
};

export const components: ComponentInstance[] = [
  ...powerParts,
  ...cpuParts,
  ...portParts,
];
