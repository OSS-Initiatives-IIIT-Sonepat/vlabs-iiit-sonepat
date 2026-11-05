import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { programControlStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/program-control";

const headers = ["Z", "Decision", "PC"];
const rows = [
  ["1", "condition true", "200"],
  ["0 arm", "condition false", "102"],
  ["Taken", "branch", "200"],
];

const copy = [
  [
    "The test",
    "The branch instruction is at 101 and Z is 1. The target in the instruction is 200.",
    1,
  ],
  [
    "Not taken",
    "If Z were 0 the next instruction would be at 102. That arm is not used.",
    2,
  ],
  [
    "Taken",
    "Z is 1, so PC is replaced by 200. The word at 102 is not fetched.",
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
