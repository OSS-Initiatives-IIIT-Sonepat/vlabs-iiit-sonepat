import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { ioProcessorStepSchematics as fig } from "@/labs/schematics/semester-03/07-memory-and-io/io-processor";

const headers = ["Who","Action","CPU is"];
const rows = [
  [
    "CPU",
    "sends write command",
    "free afterward"
  ],
  [
    "IOP",
    "fetches the channel program",
    "not in the transfer"
  ],
  [
    "IOP",
    "moves the block",
    "free"
  ],
  [
    "IOP",
    "interrupts, status ready",
    "reads status"
  ]
];

const copy = [
  [
    "The command",
    "The CPU tells the IOP to write a block, then leaves the transfer.",
    1
  ],
  [
    "The channel program",
    "The IOP reads its program from memory. That program names the address and the count.",
    2
  ],
  [
    "The move",
    "The IOP transfers the block. The CPU is not in this loop.",
    3
  ],
  [
    "Completion",
    "The IOP writes the status and interrupts the CPU. The CPU reads the status.",
    4
  ]
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
