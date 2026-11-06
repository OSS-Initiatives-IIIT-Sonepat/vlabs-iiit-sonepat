import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { dataManipulationStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/data-manipulation";

const headers = ["Class", "Instruction", "Result"];
const rows = [
  ["Transfer", "MOV R1, R2", "R1 = 0101"],
  ["Arithmetic", "ADD", "1000"],
  ["Logic", "XOR", "0110"],
  ["Shift", "SHR", "0010"],
];

const copy = [
  ["A copy", "MOV R1, R2 writes 0101 into R1. Nothing is added or shifted.", 1],
  ["An add", "0101 + 0011 = 1000. This is an arithmetic manipulation.", 2],
  [
    "A logic operation",
    "0101 ⊕ 0011 = 0110. Bits are combined without a carry.",
    3,
  ],
  ["A shift", "SHR moves 0101 one place right. The result is 0010.", 4],
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
