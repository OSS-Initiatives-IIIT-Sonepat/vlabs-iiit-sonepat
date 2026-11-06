import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { machineAndAssemblyStepSchematics as fig } from "@/labs/schematics/semester-03/08-assembly-systems/machine-and-assembly";

const headers = ["Address", "Machine", "Assembly", "AC or memory"];
const rows = [
  ["100", "206A", "LDA A", "AC ← 0100"],
  ["101", "106B", "ADD B", "AC ← 0111"],
  ["102", "7200", "CMA", "AC ← 1000"],
  ["103", "306C", "STA C", "M[108] ← 1000"],
];

const copy = [
  [
    "One line is one machine word",
    "LDA A is the assembly line. A is the symbol for address 106, which holds 0100. The stored word is 206A: opcode 010 and address 106. AC becomes 0100.",
    1,
  ],
  [
    "ADD is arithmetic in the program",
    "ADD B is 106B. B is at 107 and holds 0011. AC was 0100, so AC becomes 0111.",
    2,
  ],
  [
    "CMA is a logic operation with no address",
    "CMA assembles to 7200. It is a register-reference instruction. AC flips from 0111 to 1000.",
    3,
  ],
  [
    "STA writes the word back",
    "STA C is 306C. C is address 108. Memory 108 receives 1000, the complemented sum.",
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
