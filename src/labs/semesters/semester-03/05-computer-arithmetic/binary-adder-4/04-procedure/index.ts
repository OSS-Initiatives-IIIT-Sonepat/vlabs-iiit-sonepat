import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { binaryAdder4StepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/binary-adder-4";
import { boardShow } from "../components";

const headers = ["A", "B", "C0", "C4 S"];
const rows = [
  ["1101", "0111", "0", "10100"],
  ["—", "—", "—", "four full adders"],
  ["1101", "0111", "—", "bits enter each stage"],
  ["1101", "0111", "0", "carries 1 1 1 into the higher bits"],
  ["1101", "0111", "0", "1 0 1 0 0"],
  ["R1", "R2", "0", "n adders for n bits"],
];

const copy = [
  [
    "Write the sum",
    "R3 ← R1 + R2 adds the contents of two registers. Here R1 holds 1101 and R2 holds 0111. The pencil sum is 10100, which is 13 + 7.",
    "psu",
  ],
  [
    "Four stages",
    "One full adder for each bit. The left stage is bit 3 and the right stage is bit 0. The 74HC283 on the board is those four adders in one package.",
    "fa",
  ],
  [
    "Connect A and B",
    "A3 A2 A1 A0 = 1 1 0 1. B3 B2 B1 B0 = 0 1 1 1. Each pair enters the stage with the same subscript.",
    "w_a4",
  ],
  [
    "Chain the carries",
    "C0, the carry into bit 0, is tied to 0. The carry out of each stage is the carry into the next higher stage: C1, C2, and C3 are all 1.",
    "w_c0",
  ],
  [
    "Read 10100",
    "C4 lights. The sum lamps, bit 3 down to bit 0, read 0 1 0 0. Upper lamps are C4, S3, and S2. Lower lamps are S1 and S0.",
    "led_c4",
  ],
  [
    "n bits, n adders",
    "A wider word uses one more full adder per bit. A can be taken from R1 and B from R2, and the sum written to R3 or back over one of the sources.",
    "led_s2",
  ],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(
  ([label, body, highlight], i) => ({
    label,
    body,
    show: boardShow[i],
    highlight,
    activeInputs: {},
    schematic: fig[i],
    table: revealedTable(headers, rows, i + 1),
  }),
);
