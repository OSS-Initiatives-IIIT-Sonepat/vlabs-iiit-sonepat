import { type TheorySection } from "@/labs/lab-content.types";
import { boothAlgorithmTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/booth-algorithm";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Booth looks at Q0 and the extra bit Q−1. 10 means subtract the multiplicand, 01 means add it, and 00 or 11 means do nothing. Every cycle ends with an arithmetic right shift.",
    "The slide multiplies (−9) by (−13). BR is 10111 and Q starts at 10011. Five cycles leave AC and Q holding 00011 10101, which is 117.",
  ],
  circuitDiagram: boothAlgorithmTheoryDiagram,
};
