import { type SchematicElement } from "@/labs/CircuitSchematic";
import { block, frames, label } from "../diagram";

const add1 = (on = false) => block("add1", 150, 120, 150, 70, "74HC283", on);
const and1 = (on = false): SchematicElement => ({
  type: "and-gate",
  id: "and1",
  x: 330,
  y: 80,
  label: "Z8·Z4",
  highlight: on,
});
const and2 = (on = false): SchematicElement => ({
  type: "and-gate",
  id: "and2",
  x: 330,
  y: 170,
  label: "Z8·Z2",
  highlight: on,
});
const or1 = (on = false): SchematicElement => ({
  type: "or-gate",
  id: "or1",
  x: 470,
  y: 120,
  label: "C",
  highlight: on,
});
const add2 = (on = false) => block("add2", 200, 250, 170, 56, "+ 0110", on);

export const bcdAdderStepSchematics = frames([
  {
    title: "Add the two BCD digits",
    elements: [add1(true), label("lz", 250, 120, "Z")],
    notes: ["Z8 Z4 Z2 Z1 is the binary sum. K is its carry."],
  },
  {
    title: "Detect an illegal BCD digit",
    elements: [add1(), and1(true), and2(true)],
    notes: ["A nibble above 9 has Z8 with Z4, or Z8 with Z2."],
  },
  {
    title: "C = K + Z8·Z4 + Z8·Z2",
    elements: [add1(), and1(), and2(), or1(true)],
    notes: ["C is 1 when the sum is greater than 9."],
  },
  {
    title: "Add 6 when C is 1",
    elements: [add1(), and1(), and2(), or1(), add2(true)],
    notes: ["The second adder adds 0110, which is 6, when C = 1."],
  },
  {
    title: "9 + 5 = 14, BCD 0001 0100",
    elements: [
      add1(),
      and1(),
      and2(),
      or1(true),
      add2(true),
      label("ans", 420, 250, "0001 0100"),
    ],
    notes: ["1110 + 0110 = 1 0100. The 1 is the tens digit."],
  },
]);

export const bcdAdderTheoryDiagram = bcdAdderStepSchematics[4];
