import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { arithmeticPipelineStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/arithmetic-pipeline";

const headers = ["Stage", "Action", "Value"];
const rows = [
  ["Compare", "exponents 3 and 2", "differ by 1"],
  ["Align", "shift Y", "0.0820 × 10³"],
  ["Add", "0.9504 + 0.0820", "1.0324 × 10³"],
  ["Normalize", "shift right", "0.10324 × 10⁴"],
];

const copy = [
  [
    "Compare",
    "X = 0.9504 × 10³ and Y = 0.8200 × 10². The exponents differ by 1.",
    1,
  ],
  [
    "Align",
    "Y is shifted to 0.0820 × 10³ so both mantissas share exponent 3.",
    2,
  ],
  [
    "Add",
    "0.9504 + 0.0820 = 1.0324, with exponent 3. The integer digit means the fraction overflowed.",
    3,
  ],
  [
    "Normalize",
    "Shift the mantissa right and add 1 to the exponent: Z = 0.10324 × 10⁴.",
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
