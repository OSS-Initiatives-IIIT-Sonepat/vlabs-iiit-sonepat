import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { dmaTransferStepSchematics as fig } from "@/labs/schematics/semester-03/07-memory-and-io/dma-transfer";

const headers = ["Count","Address","Bus"];
const rows = [
  [
    "3",
    "200",
    "CPU grants"
  ],
  [
    "2",
    "201",
    "controller"
  ],
  [
    "1",
    "202",
    "controller"
  ],
  [
    "0",
    "203",
    "returned to CPU"
  ]
];

const copy = [
  [
    "The request",
    "Count is 3 and the address is 200. The CPU grants the bus. Without the grant, nothing moves.",
    1
  ],
  [
    "One word",
    "The controller writes address 200, then the address is 201 and the count is 2.",
    2
  ],
  [
    "Until zero",
    "The same step writes 201 and 202. The count passes 2 and 1. While it is not zero, the transfer repeats.",
    3
  ],
  [
    "Return",
    "Count is 0. The controller drops the request and the CPU takes the bus back.",
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
