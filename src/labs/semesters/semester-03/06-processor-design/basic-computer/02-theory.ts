import { type TheorySection } from "@/labs/lab-content.types";
import { basicComputerTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/basic-computer";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
  "A stored-program computer keeps the instruction in memory. The program counter is the address the CPU places on the address pins. A rising clock advances that address by one.",
  "This board has a 4-bit address, so it cannot hold the textbook addresses 22, 457, 300, or 1350. Address 0 on the board stands for the instruction word and shows 0001. Address 1 shows 0101.",
  "In the diagram, mode 0 at address 22 means ADD the operand stored at 457. Mode 1 at address 35 means ADD the value stored at the address stored in 300. Location 300 holds 1350, and 1350 holds the operand."
],
  circuitDiagram: basicComputerTheoryDiagram,
};
