import { type TheorySection } from "@/labs/lab-content.types";
import { completeComputerTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/complete-computer";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Memory is 4096 words of 16 bits. The program and the data share it.",
    "AR, PC, DR, AC, IR, INPR, OUTR, and memory connect to one common bus. A three-state enable lets only one of them drive it.",
    "AR holds the address sent to memory. PC holds the next instruction address. DR holds a data word. AC is the accumulator. IR holds the instruction.",
    "INPR and OUTR are the input and output registers. The control unit, built from the sequence counter, decides which enable and which read or write is on.",
  ],
  circuitDiagram: completeComputerTheoryDiagram,
};
