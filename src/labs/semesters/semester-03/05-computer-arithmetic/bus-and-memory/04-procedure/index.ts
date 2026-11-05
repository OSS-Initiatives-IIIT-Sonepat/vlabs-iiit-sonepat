import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { busAndMemoryStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/bus-and-memory";

const headers = ["Step", "Who drives", "Result"];
const rows = [
  ["Address", "AR", "5"],
  ["Bus", "R1, E = 1", "bus = 1010"],
  ["Read", "M[5]", "DR = 1100"],
  ["Write", "DR", "M[5] = 0011"],
  ["Release", "nobody", "bus free, M[5] stays 0011"],
];

const copy = [
  [
    "Point at a memory word",
    "AR holds 5. That is the only address the memory will use in this transfer.",
    1,
  ],
  [
    "Let one register drive the bus",
    "R1 holds 1010. Its three-state buffer is enabled, E = 1, so the common bus carries 1010. Every other buffer stays off.",
    2,
  ],
  [
    "Read memory into DR",
    "Turn R1 off and enable the memory's buffer. M[5] holds 1100, so the read DR ← M[AR] leaves 1100 in DR.",
    3,
  ],
  [
    "Write DR back to memory",
    "DR is changed to 0011 and becomes the driver. The write M[AR] ← DR stores 0011 at address 5.",
    4,
  ],
  [
    "Disable every buffer",
    "E = 0 on every three-state buffer. The bus floats. Memory keeps the word that was written.",
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
