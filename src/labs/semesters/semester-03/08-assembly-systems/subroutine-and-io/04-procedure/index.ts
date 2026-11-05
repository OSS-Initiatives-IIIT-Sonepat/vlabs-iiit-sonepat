import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { subroutineAndIoStepSchematics as fig } from "@/labs/schematics/semester-03/08-assembly-systems/subroutine-and-io";

const headers = ["PC", "Instruction", "What changes"];
const rows = [
  ["100", "BSA SUB", "call, SUB is 108"],
  ["108", "—", "M[108] ← 101, PC ← 109"],
  ["109", "CMA", "AC is complemented"],
  ["10A", "BUN I 108", "PC ← 101"],
  ["101", "SKI / BUN SKI", "FGI = 0, so wait"],
  ["103", "INP", "AC ← 0101"],
  ["104", "STA X", "M[X] ← 0101"],
];

const copy = [
  ["Call", "The main program at 100 executes BSA SUB. SUB is address 108.", 1],
  ["Save the return address", "BSA writes the address of the next instruction, 101, into M[108], then sets PC to 109.", 2],
  ["Do the subroutine's work", "The word at 109 is CMA. That is the whole body: flip AC.", 3],
  ["Return through the saved address", "BUN indirect at 10A reads M[108] and puts 101 into PC. Control is back in the main program.", 4],
  ["Wait for the input flag", "SKI at 101 skips the following BUN only when FGI is 1. FGI is 0, so BUN SKI repeats the test.", 5],
  ["Read the character and store it", "FGI becomes 1. SKI skips the branch. INP copies INPR into AC, here 0101, and STA writes that word to X.", 7],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
