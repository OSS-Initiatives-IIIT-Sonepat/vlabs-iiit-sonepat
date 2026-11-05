import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { controlMemoryStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/control-memory";

const headers = ["Register", "Value", "Selects"];
const rows = [
  ["CAR", "15", "control memory"],
  ["Word", "at 15", "micro-operations"],
  ["Next", "CAR updated", "the following word"],
];

const copy = [
  [
    "The address",
    "CAR holds 15. That is an address in control memory, not in main memory.",
    1,
  ],
  ["The read", "Control memory outputs the microinstruction stored at 15.", 2],
  [
    "The control word",
    "Its fields become the micro-operations for this clock. CAR is then updated for the next word.",
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
