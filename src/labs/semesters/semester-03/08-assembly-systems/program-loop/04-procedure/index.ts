import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { programLoopStepSchematics as fig } from "@/labs/schematics/semester-03/08-assembly-systems/program-loop";

const headers = ["Pass", "AC", "CNT", "Next"];
const rows = [
  ["start", "—", "2", "LDA CNT"],
  ["1", "1", "1", "not zero, BUN LOP"],
  ["1 stored", "1", "1", "STA wrote the count"],
  ["2", "0", "0", "SZA skips BUN"],
  ["end", "0", "0", "HLT"],
];

const copy = [
  [
    "Load the count",
    "CNT starts at 2. LDA CNT puts 2 in AC. The body of the loop is this load, an add of −1, and a store.",
    1,
  ],
  [
    "Subtract one",
    "NEG1 is a word of all ones, the value −1. ADD NEG1 turns 2 into 1.",
    2,
  ],
  [
    "Store it",
    "STA CNT writes 1 back. The memory count, not only AC, has changed.",
    3,
  ],
  [
    "Branch while it is not zero",
    "SZA skips the next instruction only when AC is 0. AC is 1, so BUN LOP goes back to LDA CNT.",
    4,
  ],
  [
    "The second pass falls out",
    "The same three instructions now take CNT from 1 to 0. SZA sees 0 and skips BUN. HLT stops the program.",
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
