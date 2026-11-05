import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { vectorProcessingStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/vector-processing";

const headers = ["Row", "Work", "Running total"];
const rows = [
  ["1", "inner product of 3 pairs", "9 operations"],
  ["2 and 3", "two more inner products", "27 operations"],
  ["Done", "three rows finished", "stop"],
];

const copy = [
  [
    "The test",
    "A 3×3 matrix product has three rows. Each row is an inner product.",
    1,
  ],
  [
    "The products",
    "One row multiplies three pairs and adds them. Three rows make 9 × 3 = 27 multiply-adds.",
    2,
  ],
  [
    "Stop",
    "After the third row the instruction is finished. Four memory modules can be interleaved so the vector stream does not stall on one bank.",
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
