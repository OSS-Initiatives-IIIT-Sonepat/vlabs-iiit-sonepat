import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { instructionPipeStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/instruction-pipe";

const headers = ["Event", "Segments", "Action"];
const rows = [
  ["Fill", "FI, DA, FO, EX", "one result per clock"],
  ["No branch", "FO then EX", "pipe stays full"],
  ["Branch or interrupt", "pipe emptied", "PC updated, or interrupt handling"],
];

const copy = [
  [
    "The segments",
    "The four segments are FI, DA, FO, and EX: fetch the instruction, decode and form the effective address, fetch the operand, then execute.",
    1,
  ],
  [
    "No branch",
    "If this is not a branch, FO hands the operand to EX and the pipe stays full.",
    2,
  ],
  [
    "Taken branch",
    "A taken branch empties the pipe and updates the PC. An interrupt leaves the pipe for interrupt handling.",
    3,
  ],
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
