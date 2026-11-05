import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { computerDescriptionStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/computer-description";

const headers = ["Time", "Place", "Value"];
const rows = [
  ["—", "Instruction", "ADD, opcode 001"],
  ["—", "PC", "100"],
  ["—", "AC", "0"],
  ["—", "M[108]", "5"],
  ["T0", "AR", "100"],
  ["T1", "IR", "ADD 108"],
  ["T1", "PC", "101"],
  ["T2", "AR", "108"],
  ["T3", "DR", "5"],
  ["T3", "AC", "5"],
  ["—", "Interrupt", "same computer, one more box"],
];

const copy = [
  ["Read the instruction word", "An instruction is a bit I, a 3-bit opcode, and an address. ADD is opcode 001. The address will name memory location 108.", 1],
  ["Name the registers", "PC holds the next instruction, here 100. AR holds an address. IR holds the instruction. AC is the accumulator, starting at 0. DR holds a data word. Memory 108 holds 5.", 4],
  ["T0 copies PC into AR", "The fetch begins by AR ← PC. AR is now 100, so the memory read looks at the instruction itself.", 5],
  ["T1 reads IR and advances PC", "IR ← M[AR] brings in ADD 108. PC ← PC + 1 leaves PC at 101, ready for the next instruction.", 7],
  ["T2 is the memory-reference decode", "The opcode says this instruction refers to memory. AR ← the address field, so AR becomes 108.", 8],
  ["T3 adds into the accumulator", "DR ← M[108] reads 5. The accumulator does AC ← AC + DR. AC was 0, so AC is 5.", 10],
  ["Interrupt is another box", "Input, output, and interrupt sit on this same computer. They are not a second breadboard. The accumulator cycle above is unchanged.", 11],
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
