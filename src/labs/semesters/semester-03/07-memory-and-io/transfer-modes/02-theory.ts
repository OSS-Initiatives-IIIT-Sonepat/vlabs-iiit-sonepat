import { type TheorySection } from "@/labs/lab-content.types";
import { transferModesTheoryDiagram } from "@/labs/schematics/semester-03/07-memory-and-io/transfer-modes";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Programmed I/O: the CPU polls the flag and copies the byte. Interrupt-initiated I/O: the device calls the CPU, which then copies the byte. DMA: the controller copies the byte while the CPU releases the bus.",
    "The questions are ordered. If the CPU does not move the byte, the mode is DMA. If it does, and it polls, the mode is programmed I/O. Otherwise it is an interrupt.",
  ],
  circuitDiagram: transferModesTheoryDiagram,
};
