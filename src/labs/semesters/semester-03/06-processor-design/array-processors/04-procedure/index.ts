import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { arrayProcessorsStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/array-processors";

const headers = ["Organization", "Memory", "Control"];
const rows = [
  ["Attached", "local memory, high-speed bus", "beside a GP computer"],
  ["SIMD", "M1 … Mn", "one instruction, PE1 … PEn"],
];

const copy = [
  [
    "Attached processor",
    "An attached array processor sits beside a general-purpose computer. It has its own local memory and a high-speed bus.",
    1,
  ],
  [
    "SIMD array",
    "A SIMD array has a master control unit and processing elements PE1 through PEn. Each element has its own local memory Mi, and one instruction drives them all.",
    2,
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
