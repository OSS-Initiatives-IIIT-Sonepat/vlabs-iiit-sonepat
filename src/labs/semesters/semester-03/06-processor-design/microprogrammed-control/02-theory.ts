import { type TheorySection } from "@/labs/lab-content.types";
import { microprogramTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/microprogrammed-control";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Microprogrammed control stores the control signals in a memory. The control address register, CAR, holds the address of the current microinstruction. A sequencer decides the next address.",
    "On this board the 74HC161 is the CAR and the ROM is the control memory. Address 0 holds 0001, address 1 holds 0010, address 2 holds 0100, and address 3 holds 1000.",
    "Hardwired control has no ROM. A sequence counter and a block of gates produce the same signals. The last frame of this lab is that arrangement.",
  ],
  circuitDiagram: microprogramTheoryDiagram,
};
