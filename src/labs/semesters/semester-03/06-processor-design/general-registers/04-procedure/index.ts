import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { generalRegistersStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/general-registers";

const headers = ["Field", "Code", "Effect"];
const rows = [
  ["Operation", "R1 ← R2 + R3", "R2 = 4, R3 = 5"],
  ["SELA, SELB", "010, 011", "A bus = 4, B bus = 5"],
  ["OPR", "00010", "ADD"],
  ["SELD", "001", "R1 = 9"],
];

const copy = [
  [
    "The operation",
    "The control example is R1 ← R2 + R3. R2 holds 4 and R3 holds 5.",
    1,
  ],
  [
    "Select the sources",
    "MUX A selector SELA = 010 puts R2 on the A bus. SELB = 011 puts R3 on the B bus.",
    2,
  ],
  [
    "Select the ALU operation",
    "OPR = 00010 means A + B. A different code would transfer, AND, OR, XOR, complement, or shift.",
    3,
  ],
  [
    "Select the destination",
    "The ALU produces 9. Decoder SELD = 001 loads the output bus into R1.",
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
