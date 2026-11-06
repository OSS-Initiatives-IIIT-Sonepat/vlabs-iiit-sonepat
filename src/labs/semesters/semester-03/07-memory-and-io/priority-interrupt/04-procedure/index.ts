import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { priorityInterruptStepSchematics as fig } from "@/labs/schematics/semester-03/07-memory-and-io/priority-interrupt";

const headers = ["Device", "Priority", "Gets the grant"];
const rows = [
  ["D1", "1", "no, while D2 asks"],
  ["D2", "2", "yes"],
  ["After D2", "1", "D1 then yes"],
];

const copy = [
  [
    "Both devices",
    "D1 and D2 request in the same cycle. D2's priority number is higher.",
    1,
  ],
  [
    "If D2 were absent",
    "The grant would stop at D1. D2 is present, so that arm is not taken.",
    2,
  ],
  [
    "D2 wins",
    "D2 receives the grant and is serviced. D1 holds its request until D2 finishes.",
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
