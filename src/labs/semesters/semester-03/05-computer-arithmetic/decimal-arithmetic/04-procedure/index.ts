import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { decimalArithmeticStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/decimal-arithmetic";

const headers = ["Step", "Bits", "Meaning"];
const rows = [
  ["Add", "1001 + 0111", "1 0000, K = 1"],
  ["Test", "K + Z8(Z4+Z2)", "correction"],
  ["Skip arm", "K = 0 and digit ≤ 9", "not this sum"],
  ["Correct", "0000 + 0110", "1 0110"],
  ["Done", "BCD 0001 0110", "decimal 16"],
];

const copy = [
  [
    "Add the digits",
    "9 and 7 as BCD are 1001 and 0111. The binary sum is 1 0000, so the carry K is 1.",
    1,
  ],
  [
    "Test the sum",
    "The four-bit sum is 0000, which is a legal digit, but K = 1. Correction is required when K = 1 or when Z8(Z4 + Z2) = 1.",
    2,
  ],
  [
    "The legal arm",
    "A sum from 0000 to 1001 with K = 0 would skip the correction. This sum has K = 1.",
    3,
  ],
  [
    "Add six",
    "0000 + 0110 = 0110. The carry K stays 1, so the BCD digits are 1 and 6.",
    4,
  ],
  ["The BCD result", "The digits are 0001 and 0110, which is decimal 16.", 5],
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
