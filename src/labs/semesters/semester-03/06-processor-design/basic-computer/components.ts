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
  chip("cpu", "cpu", 8),
  ...powers("cpu", 8),
  input("clk", "cpu", "clk", 4, "yellow"),
  rail("w_rd_gnd", "cpu", "rd", "gnd", 16),
  rail("w_wr_vcc", "cpu", "wr", "vcc", 17),
];
const ramParts: ComponentInstance[] = [
  memory("ram", "ram", 28, [0b0001, 0b0101, 0, 0]),
  ...powers("ram", 28),
  rail("w_cs_gnd", "ram", "cs", "gnd", 18),
  rail("w_oe_gnd", "ram", "oe", "gnd", 19),
  link("w_a0", "cpu", "a0", "ram", "a0"),
  link("w_a1", "cpu", "a1", "ram", "a1"),
  link("w_a2", "cpu", "a2", "ram", "a2"),
  link("w_a3", "cpu", "a3", "ram", "a3"),
  ...lamp("d0", "ram", "d0", 42, "c", "green"),
  ...lamp("d1", "ram", "d1", 48, "c", "green"),
  ...lamp("d2", "ram", "d2", 42, "h", "yellow"),
  ...lamp("d3", "ram", "d3", 48, "h", "yellow"),
];

export const stages = {
  power: ids(powerParts),
  cpu: ids(cpuParts),
  ram: ids(ramParts),
};

export const components: ComponentInstance[] = [
  ...powerParts,
  ...cpuParts,
  ...ramParts,
];
