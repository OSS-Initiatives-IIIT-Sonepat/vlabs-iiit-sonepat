import { type TheorySection } from "@/labs/lab-content.types";
import { busAndMemoryTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/bus-and-memory";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A common bus is a set of wires that many registers share. A three-state buffer connects a register to that bus only when its enable is 1. If two buffers were enabled, they would fight.",
    "The same selection can be four 4×1 multiplexers. S1 S0 = 00 selects register A, 01 selects B, 10 selects C, and 11 selects D.",
    "Memory uses the address in AR. A read does DR ← M[AR]: the memory buffer drives the bus and DR loads it. A write does M[AR] ← DR: DR drives the bus and memory stores the word.",
  ],
  circuitDiagram: busAndMemoryTheoryDiagram,
};
