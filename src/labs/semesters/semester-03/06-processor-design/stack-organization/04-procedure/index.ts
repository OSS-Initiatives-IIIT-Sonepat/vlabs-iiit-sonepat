import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { stackOrganizationStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/stack-organization";

const headers = ["Stack", "Micro-operation", "Pointer"];
const rows = [
  ["Register", "64 words, SP is 6 bits", "0 to 63"],
  ["Register PUSH", "SP ← SP + 1, M[SP] ← DR", "moves up"],
  ["Memory PUSH", "SP ← SP − 1, M[SP] ← DR", "moves down"],
  ["Register POP", "DR ← M[SP], SP ← SP − 1", "moves down"],
];

const copy = [
  [
    "The register stack",
    "A 64-word register stack needs a 6-bit SP, because 2^6 = 64. FULL is 1 when the stack is full. EMTY is 1 when it is empty. DR holds the word being pushed or popped.",
    1,
  ],
  [
    "Push on the register stack",
    "SP ← SP + 1, then M[SP] ← DR, then EMTY ← 0. If that increment makes SP = 0, the stack has wrapped and FULL ← 1.",
    2,
  ],
  [
    "Push on the memory stack",
    "The memory stack grows downward. PUSH is SP ← SP − 1, then M[SP] ← DR. In the figure, program starts at 1000, data at 2000, and the stack occupies the high addresses down from 4000.",
    3,
  ],
  [
    "Pop the register stack",
    "POP is DR ← M[SP], then SP ← SP − 1, then FULL ← 0. If SP becomes 0, EMTY ← 1.",
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
