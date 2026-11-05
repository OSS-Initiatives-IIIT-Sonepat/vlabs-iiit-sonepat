import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { timingAndControlStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/timing-and-control";

const headers = ["Time", "Control signal", "Transfer"];
const rows = [
  ["—", "SC = 0", "T0 will be the active time"],
  ["T0", "only T0", "AR ← PC"],
  ["T1", "only T1", "IR ← M[AR], PC ← PC + 1"],
  ["T2", "only T2", "decode opcode, AR ← address, I ← bit 15"],
  ["T3", "I = 0", "no second memory read"],
  ["T4", "D1 · T4", "DR ← M[AR]"],
  ["T5", "D1 · T5", "AC ← AC + DR, SC ← 0"],
];

const copy = [
  [
    "Start the sequence counter",
    "SC is decoded so that exactly one of T0, T1, T2, … is 1. The fetch begins with SC at 0.",
    1,
  ],
  [
    "T0",
    "The control signal for T0 does AR ← PC. The instruction's own address is now in AR.",
    2,
  ],
  [
    "T1",
    "T1 does two transfers together: IR ← M[AR] and PC ← PC + 1. T0 is already off.",
    3,
  ],
  [
    "T2",
    "The opcode in IR is decoded to one wire among D0–D7. The address field is copied into AR, and bit 15 into I.",
    4,
  ],
  [
    "T3 only matters when I is 1",
    "This ADD is direct, so I = 0. T3 does not replace AR. An indirect instruction would do AR ← M[AR] here.",
    5,
  ],
  [
    "T4 reads the operand",
    "D1 means ADD. D1 and T4 together do DR ← M[AR].",
    6,
  ],
  [
    "T5 adds and resets the counter",
    "D1 and T5 do AC ← AC + DR, then SC ← 0. The next instruction begins at T0.",
    7,
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
