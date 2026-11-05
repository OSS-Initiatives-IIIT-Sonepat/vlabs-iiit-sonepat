import { type SchematicData } from "@/labs/CircuitSchematic";
import { frames, label, memword } from "../diagram";

/** Registers after each Booth cycle of (−9) × (−13). */
const ROWS: [string, string, string][] = [
  ["1", "00100", "11001, 1"],
  ["2", "00010", "01100, 1"],
  ["3", "11100", "10110, 0"],
  ["4", "11110", "01011, 0"],
  ["5", "00011", "10101, 1"],
];

function table(n: number, highlightLast = false): SchematicData["elements"] {
  const head = [
    label("h0", 208, 48, "step"),
    label("h1", 280, 48, "AC"),
    label("h2", 360, 48, "Q, Q-1"),
  ];
  const rows = ROWS.slice(0, n).map((row, i) =>
    memword(
      `r${i}`,
      180,
      84 + i * 36,
      row[0],
      row[2],
      row[1],
      highlightLast && i === n - 1,
    ),
  );
  return [...head, ...rows];
}

const notes = ["BR = 10111 (−9). QR started as 10011 (−13)."];

export const boothTraceStepSchematics: SchematicData[] = frames([
  {
    title: "Cycle 1: Q0 Q-1 = 10, subtract BR, then shift",
    height: 300,
    elements: table(1, true),
    notes,
  },
  {
    title: "Cycle 2: Q0 Q-1 = 11, shift only",
    height: 330,
    elements: table(2, true),
    notes,
  },
  {
    title: "Cycle 3: Q0 Q-1 = 01, add BR, then shift",
    height: 370,
    elements: table(3, true),
    notes,
  },
  {
    title: "Cycle 4: Q0 Q-1 = 00, shift only",
    height: 400,
    elements: table(4, true),
    notes,
  },
  {
    title: "Cycle 5: product is 117",
    height: 440,
    elements: table(5, true),
    notes: ["AC Q = 00011 10101 = 117. (−9) × (−13) = 117."],
  },
]);

export const boothTraceTheoryDiagram = boothTraceStepSchematics[4];
