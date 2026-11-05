import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { assemblerSecondPassStepSchematics as fig } from "@/labs/schematics/semester-03/08-assembly-systems/assembler-second-pass";

const headers = ["LC", "Line", "Kind", "Stored"];
const rows = [
  ["0", "—", "start", "LC ← 0"],
  ["0", "—", "scan", "next source line"],
  ["100", "ORG 100", "pseudo", "LC ← 100, no word stored"],
  ["100", "LDA X", "MRI", "206A"],
  ["101", "ADD Y", "arithmetic", "106B"],
  ["102", "BSA SUB", "subroutine", "506C"],
  ["103", "BUN 100", "loop", "4064"],
  ["104", "INP", "I/O", "F800"],
  ["—", "END", "pseudo", "pass stops, nothing stored"],
];

const copy = [
  ["Set LC to 0", "The second pass begins with the location counter at 0. Nothing has been stored.", 1],
  ["Scan the next line", "The pass reads one source line and decides what kind of line it is.", 2],
  ["ORG is a pseudo-instruction", "ORG 100 does not write memory. It sets LC to 100. END, later, is the other pseudo-instruction: it stops the pass.", 3],
  ["LDA is a memory-reference instruction", "LDA is opcode 010. X is at address 106, so the stored word is 206A. Bit 1 stays 0 because the address is direct.", 4],
  ["ADD is the arithmetic operation", "ADD is opcode 001. Y is at 107, so the word is 106B. The accumulator will add that memory word when the instruction runs.", 5],
  ["BSA calls a subroutine", "BSA is opcode 101. SUB is at 108, so the word is 506C. That is the subroutine call.", 6],
  ["BUN closes the loop", "BUN is opcode 100. The address is 100, the LDA, so the word is 4064. Execution will return there.", 7],
  ["INP is an I/O instruction", "INP is not a memory reference. The non-MRI path recognises it and stores F800.", 8],
  ["END stops the pass", "END is a pseudo-instruction. No word is stored and LC does not move. The second pass is done.", 9],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(
  ([label, body, count], i) => ({
    label,
    body,
    show: [],
    schematic: fig[i],
    table: revealedTable(headers, rows, count),
  }),
);
