import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { transferModesStepSchematics as fig } from "@/labs/schematics/semester-03/07-memory-and-io/transfer-modes";

const headers = ["Who copies", "How the CPU hears", "Mode"];
const rows = [
  ["Controller", "bus grant", "DMA"],
  ["CPU", "device calls", "interrupt"],
  ["CPU", "CPU polls", "programmed I/O"],
];

const copy = [
  [
    "DMA",
    "The controller copies the byte. The CPU is not the mover, so the mode is DMA.",
    1,
  ],
  [
    "Interrupt",
    "The CPU copies the byte, but it does not poll. The device interrupts, and the CPU then copies.",
    2,
  ],
  [
    "Programmed I/O",
    "The CPU polls the status flag and, when it is set, copies the byte itself.",
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
