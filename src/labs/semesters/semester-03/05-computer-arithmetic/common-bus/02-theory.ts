import { type TheorySection } from "@/labs/lab-content.types";
import { commonBusTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/common-bus";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A computer has many registers, and each one must be able to send its contents to the others. A private wire from every bit to every other register would be a tangle. A common bus is one set of lines, one line per bit, shared by all of the registers.",
    "Four 4×1 multiplexers make a 4-bit bus. MUX 3 carries bit 3, MUX 0 carries bit 0. Input 0 of every multiplexer is register A, input 1 is B, input 2 is C, and input 3 is D. S1 and S0 are tied to every multiplexer, so one pair of selects chooses the whole register.",
    "S1 S0 = 00 puts A on the bus, 01 puts B, 10 puts C, and 11 puts D. In general, k registers of n bits need n multiplexers of size k×1. Eight registers of 16 bits need 16 multiplexers of 8×1, and 3 select lines.",
  ],
  circuitDiagram: commonBusTheoryDiagram,
};
