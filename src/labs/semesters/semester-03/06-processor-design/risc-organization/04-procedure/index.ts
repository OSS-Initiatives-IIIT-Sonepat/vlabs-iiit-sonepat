import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { riscOrganizationStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/risc-organization";

const headers = ["Instruction","Kind","Result"];
const rows = [
  [
    "LD R1, 100",
    "load",
    "R1 = 4"
  ],
  [
    "ADD R2, R1, R3",
    "ALU",
    "R2 = 9"
  ],
  [
    "ST 200, R2",
    "store",
    "M[200] = 9"
  ]
];

const copy = [
  [
    "Load",
    "M[100] holds 4. LD writes 4 into R1. This instruction does not add.",
    1
  ],
  [
    "Add in registers",
    "ADD R2, R1, R3 computes 4 + 5 = 9 into R2. Both operands are registers.",
    2
  ],
  [
    "Store",
    "ST writes R2 into M[200]. Memory 200 now holds 9.",
    3
  ]
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
