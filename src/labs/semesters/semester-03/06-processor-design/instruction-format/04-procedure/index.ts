import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { instructionFormatStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/instruction-format";

const headers = [
  "Addresses",
  "Program for X = (A+B)*(C+D)",
  "Where the result lives",
];
const rows = [
  ["3", "ADD R1,A,B · ADD R2,C,D · MUL X,R1,R2", "X"],
  ["2", "MOV R1,A · ADD R1,B · … · MOV X,R1", "R1, then X"],
  ["1", "LOAD A · ADD B · STORE T · … · STORE X", "accumulator"],
  ["0", "PUSH A · PUSH B · ADD · … · POP X", "stack"],
];

const copy = [
  [
    "Three-address",
    "ADD R1, A, B writes A+B into R1. ADD R2, C, D writes C+D into R2. MUL X, R1, R2 writes the product into X.",
    1,
  ],
  [
    "Two-address",
    "One address is both a source and the destination. MOV R1, A then ADD R1, B leaves A+B in R1. The same pattern makes C+D in R2, MUL R1, R2 leaves the product in R1, and MOV X, R1 stores it.",
    2,
  ],
  [
    "One-address",
    "LOAD A puts A in the accumulator. ADD B adds B. STORE T saves A+B. LOAD C, ADD D, MUL T, STORE X finishes the expression.",
    3,
  ],
  [
    "Zero-address",
    "PUSH A, PUSH B, ADD leaves A+B on the stack. PUSH C, PUSH D, ADD, MUL, POP X leaves the product in X.",
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
