import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { microinstructionFormatStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/microinstruction-format";

const headers = ["Field", "Contents", "Effect"];
const rows = [
  ["F1", "add", "ALU adds"],
  ["CD", "0", "no status test"],
  ["BR, AD", "AD = 41", "CAR ← 41"],
];

const copy = [
  [
    "The operation field",
    "F1 names the add micro-operation. F2 and F3 name nothing this cycle.",
    1,
  ],
  [
    "The condition",
    "CD is 0, so no status bit is tested. The branch is unconditional.",
    2,
  ],
  [
    "The next address",
    "BR selects the AD field and AD is 41, so the next CAR is 41.",
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
