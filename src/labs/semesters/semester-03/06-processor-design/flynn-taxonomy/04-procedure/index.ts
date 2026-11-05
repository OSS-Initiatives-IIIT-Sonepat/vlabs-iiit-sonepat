import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { flynnTaxonomyStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/flynn-taxonomy";

const headers = ["Instruction streams","Data streams","Class"];
const rows = [
  [
    "1",
    "1",
    "SISD"
  ],
  [
    "1",
    "many",
    "SIMD"
  ],
  [
    "many",
    "1",
    "MISD"
  ],
  [
    "many",
    "many",
    "MIMD"
  ]
];

const copy = [
  [
    "One or many instructions",
    "A single CPU fetches one instruction stream. An MIMD machine fetches several.",
    1
  ],
  [
    "Many streams",
    "Several instruction streams are MIMD when each has its own data, or MISD when they share one data stream.",
    2
  ],
  [
    "One instruction, many data",
    "An array applies one add to many pairs at once. That is SIMD.",
    3
  ],
  [
    "One of each",
    "One instruction stream and one data stream is SISD.",
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
