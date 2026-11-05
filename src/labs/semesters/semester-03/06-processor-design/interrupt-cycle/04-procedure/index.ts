import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { interruptCycleStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/interrupt-cycle";

const headers = ["Time", "Test or transfer", "Result"];
const rows = [
  ["End", "PC", "101, IEN = 1"],
  ["Check", "FGI = 0", "next fetch"],
  ["Request", "R ← 1", "interrupt cycle"],
  ["RT0", "TR ← PC, AR ← 0", "TR = 101"],
  ["RT1", "M[0] ← TR, PC ← 0", "return saved"],
  ["RT2", "PC ← 1, IEN ← 0, R ← 0", "service at 1"],
];

const copy = [
  [
    "The current instruction is done",
    "PC holds 101, the instruction that would run next. IEN, the interrupt enable, is 1.",
    1,
  ],
  [
    "The input flag is still down",
    "FGI is 0, so IEN · FGI is 0. R stays 0 and the computer fetches the instruction at 101.",
    2,
  ],
  [
    "A character arrives",
    "FGI becomes 1. The test passes and R is set to 1. The fetch is replaced by the interrupt cycle.",
    3,
  ],
  [
    "RT0 copies PC into TR",
    "AR is forced to 0 and TR receives 101. Address 0 is reserved for the return address.",
    4,
  ],
  [
    "RT1 writes that address",
    "M[0] ← 101 and PC ← 0. The place to come back to is now in memory.",
    5,
  ],
  [
    "RT2 starts the service program",
    "PC ← 1, IEN ← 0, and R ← 0. The next fetch is the routine at address 1, and a second interrupt cannot start until IEN is set again.",
    6,
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
