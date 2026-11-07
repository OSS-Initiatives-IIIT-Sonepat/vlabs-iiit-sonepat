import { type TheorySection } from "@/labs/lab-content.types";
import { sqrtTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The integer square root of N is the largest integer k such that k² ≤ N. A clever mathematical property states that N = 1 + 3 + 5 + … + (2k−1) — that is, N is the sum of the first k odd numbers. Therefore, to find √N, we can repeatedly subtract successive odd numbers (1, 3, 5, …) from N until the result goes negative; the count of subtractions equals the integer square root.",
    "The algorithm: initialise ODD = 1, COUNT = 0. Loop: subtract ODD from N. If result < 0, stop — COUNT is the integer square root. Otherwise increment COUNT, add 2 to ODD (get next odd number), and repeat.",
    "In 8085 assembly: keep N in A, ODD in B (starting at 1), COUNT in C. SUB B subtracts ODD from A. If CY is set (result < 0), we have gone too far and exit. Otherwise INR C (count++) and INR B / INR B (ODD += 2).",
    "The Carry flag after SUB indicates a borrow (A < B before subtraction). This is the termination condition: when A - ODD is negative, we have subtracted one too many odd numbers, so the final COUNT is the integer square root.",
    "For N=0, 1, 4, 9, 16, 25, 36, 49 the exact integer square roots are 0, 1, 2, 3, 4, 5, 6, 7. For non-perfect-square N, the floor of the square root is returned.",
  ],
  circuitDiagram: sqrtTheoryDiagram,
};
