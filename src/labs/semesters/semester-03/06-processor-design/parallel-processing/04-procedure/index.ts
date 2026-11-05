import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { parallelProcessingStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/parallel-processing";

const headers = ["Processor","Work","Sums"];
const rows = [
  [
    "Series",
    "one add at a time",
    "4 steps"
  ],
  [
    "P1",
    "1+4 and 4+7",
    "5 and 11"
  ],
  [
    "P2",
    "2+5 and 3+6",
    "7 and 9"
  ],
  [
    "Join",
    "both done",
    "2 steps"
  ]
];

const copy = [
  [
    "The work",
    "The adds are 1+4, 2+5, 3+6, and 4+7. None of them reads another's result.",
    1
  ],
  [
    "Only one processor",
    "The four adds would take four steps, one after another.",
    2
  ],
  [
    "Split",
    "P1 takes 1+4 and 4+7. P2 takes 2+5 and 3+6.",
    3
  ],
  [
    "Join",
    "The sums are 5, 7, 9, and 11. Two steps were enough.",
    4
  ]
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
