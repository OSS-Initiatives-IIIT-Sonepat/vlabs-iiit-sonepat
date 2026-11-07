import { type TheorySection } from "@/labs/lab-content.types";
import { minMaxTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Finding the minimum and maximum values in an array requires comparing each element to the current best candidate and updating when a more extreme value is found. The 8085 CMP instruction is the workhorse for this task.",
    "CMP r subtracts r from A without storing the result. If A < r, the Carry flag (CY) is set. If A = r, the Zero flag (Z) is set. If A > r, both CY and Z are clear. JC (Jump if Carry) thus branches when A is less than the comparand.",
    "Algorithm for MIN: initialise MIN_VAL with the first element. For each subsequent element, CMP MIN_VAL: if the element < MIN_VAL (CY=1), update MIN_VAL. Algorithm for MAX: similar but jump when CY=0 and Z=0 (i.e., element > MAX_VAL), using JNC and JZ combination.",
    "The program traverses the array using the HL pointer (INX H to advance) and a B counter (DCR B / JNZ loop). The initial element is loaded as both the tentative MIN and MAX before the comparison loop begins.",
    "After the loop, MIN is stored at one address and MAX at another. This pattern appears in real-world firmware for sensor range checking, threshold detection, and normalisation.",
  ],
  circuitDiagram: minMaxTheoryDiagram,
};
