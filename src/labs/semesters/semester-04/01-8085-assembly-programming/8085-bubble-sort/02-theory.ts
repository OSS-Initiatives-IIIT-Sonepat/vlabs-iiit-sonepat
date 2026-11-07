import { type TheorySection } from "@/labs/lab-content.types";
import { bubbleSortTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    'Bubble sort is an O(n²) comparison-based sorting algorithm that repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. After each full pass, the largest unsorted element "bubbles up" to its correct position at the end.',
    "The 8085 implementation requires two nested loops. The outer loop runs N-1 passes. The inner loop compares adjacent pairs: element at (HL) with element at (HL+1). If the first is greater, they are swapped using three MOV operations via a temporary register.",
    "A swap flag (stored in memory or a register) tracks whether any swap occurred in a pass. If no swap happened, the array is already sorted and we can exit early. This is the optimised bubble sort. In 8085, a flag register like D is used: D=0 means no swap, D=1 means swap occurred.",
    "CMP M compares A with the memory byte at (HL). JC skips the swap when A < (HL), i.e., the pair is already in order. Otherwise, the bytes are exchanged: save A in B, load next element, store at current position, store B at next position.",
    "The outer loop count is kept in a memory location (since all registers are used in the inner loop). Alternatively, the count is decremented in a register saved and restored around inner loop iterations.",
  ],
  circuitDiagram: bubbleSortTheoryDiagram,
};
