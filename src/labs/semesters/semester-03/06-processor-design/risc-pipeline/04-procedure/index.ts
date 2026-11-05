import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { riscPipelineStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/risc-pipeline";

const headers = ["Case", "Instructions", "What the pipe does"];
const rows = [
  ["Segments", "I, A, E", "fetch, ALU, execute"],
  ["No conflict", "instruction ignores R1 and R2", "A stays busy"],
  ["Delayed load", "Load R1, Load R2, NOP, Add", "NOP fills the delay"],
];

const copy = [
  [
    "Three segments",
    "The three segments are I (instruction fetch), A (ALU), and E (execute). Load R1 is followed by Load R2.",
    1,
  ],
  [
    "No conflict",
    "An instruction that does not use R1 or R2 can follow the loads. The ALU segment stays busy.",
    2,
  ],
  [
    "Delayed load",
    "Add R1+R2 needs both loads. A no-operation is inserted between Load R2 and the add. A delayed branch uses the same idea: useful instructions, or NOPs, fill the delay slot.",
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
