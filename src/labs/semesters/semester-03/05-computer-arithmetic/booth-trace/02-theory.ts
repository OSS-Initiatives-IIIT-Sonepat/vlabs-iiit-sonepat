import { type TheorySection } from "@/labs/lab-content.types";
import { boothTraceTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/booth-trace";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Booth looks at the current bit of the multiplier Q and the extra bit Q-1. The pair 10 subtracts the multiplicand. The pair 01 adds it. The pairs 00 and 11 only shift.",
    "After the add or subtract, the registers shift right one place. The shift is arithmetic, so the sign bit of AC is copied.",
    "This trace multiplies −9 by −13. The multiplicand BR is 10111 and the multiplier starts as 10011. Five cycles produce 117.",
  ],
  circuitDiagram: boothTraceTheoryDiagram,
};
