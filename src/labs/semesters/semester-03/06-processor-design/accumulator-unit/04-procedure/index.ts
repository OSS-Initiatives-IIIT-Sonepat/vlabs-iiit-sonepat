import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { accumulatorUnitStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/accumulator-unit";

const headers = ["Operation", "Starts from", "AC becomes"];
const rows = [
  ["—", "AC = 0101, DR = 0011", "the two inputs"],
  ["ADD", "0101 + 0011", "1000"],
  ["AND", "0101 ∧ 0011", "0001"],
  ["CMA", "complement of 0101", "1010"],
  ["SHR", "shift 0101 right", "0010"],
];

const copy = [
  [
    "The two inputs",
    "The accumulator unit sees AC and, for the arithmetic and logic operations, DR. Here AC is 0101 and DR is 0011. Each following row starts again from 0101.",
    1,
  ],
  ["Add", "ADD is AC ← AC + DR. 0101 + 0011 = 1000.", 2],
  [
    "Mask with AND",
    "AND is AC ← AC ∧ DR. 0101 ∧ 0011 = 0001. This is the logic operation inside the same unit.",
    3,
  ],
  [
    "Complement",
    "CMA ignores DR and flips every bit of AC. 0101 becomes 1010.",
    4,
  ],
  [
    "Shift",
    "A logical shift right brings in a 0. 0101 becomes 0010. CIR would rotate through the end-carry bit; this row is the plain shift.",
    5,
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
