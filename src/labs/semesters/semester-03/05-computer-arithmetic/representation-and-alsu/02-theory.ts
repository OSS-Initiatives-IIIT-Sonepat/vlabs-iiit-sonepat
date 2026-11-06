import { type TheorySection } from "@/labs/lab-content.types";
import { representationAndAlsuTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/representation-and-alsu";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A computer word starts as bits. 0110 is the unsigned number 6. A leading sign bit makes 0 0110 mean +6. The 1's complement flips the bits. The 2's complement adds one, so 1010 is −6.",
    "A fixed-point word keeps the binary point in one place: 0110.10 is 6.5. A floating-point word stores a fraction and a power of two: 0.1101 × 2³ is the same 6.5.",
    "Register transfer language names the copy. R2 ← R1 writes R1 into R2. A three-state buffer puts that word on a shared bus only while its enable is 1.",
    "Arithmetic, logic, and shift are micro-operations on the same registers. One arithmetic logic shift unit performs all three. The select lines decide which.",
  ],
  circuitDiagram: representationAndAlsuTheoryDiagram,
};
