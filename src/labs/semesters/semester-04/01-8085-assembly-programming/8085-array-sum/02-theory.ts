import { type TheorySection } from "@/labs/lab-content.types";
import { arraySumTheoryDiagram } from "@/labs/schematics/semester-04/01-8085-assembly-programming/assembly-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Summing an array in 8085 assembly demonstrates both indirect addressing (using HL as a memory pointer) and loop control. The array is stored in consecutive memory locations, with the count of elements stored in the first byte.",
    "The LXI H instruction loads a 16-bit address into the HL register pair. The MOV A,M instruction then reads the byte at the address pointed to by HL (indirect addressing). INX H increments HL to point to the next element.",
    "The result is a 16-bit sum stored in DE (or H:L after the loop) to avoid overflow when summing many large values. The ADD M instruction adds the memory byte at (HL) directly to A without needing a register intermediary.",
    "The DCR B / JNZ LOOP construct decrements B and loops back as long as B ≠ 0. B is initialised with the array count. This is the standard 8085 counting loop pattern.",
    "Algorithm: (1) Load count N from first memory byte into B. (2) Set HL to first data element. (3) Initialise A=0, C=0 (carry). (4) Loop: ADD M, collect carry in C with ADC 00H, INX H, DCR B, JNZ. (5) Store 16-bit result (C:A).",
  ],
  circuitDiagram: arraySumTheoryDiagram,
};
