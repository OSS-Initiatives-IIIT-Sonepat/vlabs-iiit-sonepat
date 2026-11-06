import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { ciscOrganizationStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/cisc-organization";

const headers = ["Micro-op", "Action", "Value"];
const rows = [
  ["1", "read M[X]", "4"],
  ["2", "read M[Y]", "5"],
  ["3", "add", "9"],
  ["4", "write M[X]", "9"],
];

const copy = [
  [
    "One opcode",
    "ADD X, Y is a single instruction. X and Y are both memory addresses.",
    1,
  ],
  ["Read X", "M[X] contributes 4.", 2],
  ["Read Y", "M[Y] contributes 5. Both operands are now in the processor.", 3],
  [
    "Add and write",
    "The sum is 9. It is written back to M[X]. That took four micro-operations.",
    4,
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
