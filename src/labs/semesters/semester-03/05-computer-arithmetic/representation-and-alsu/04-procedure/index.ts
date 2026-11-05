import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { representationAndAlsuStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/representation-and-alsu";

const headers = ["Form", "Writing", "Meaning"];
const rows = [
  ["Unsigned", "0110", "6"],
  ["Sign and magnitude", "0 0110", "+6"],
  ["1's complement", "1001", "bits of 0110 flipped"],
  ["2's complement", "1010", "−6"],
  ["Fixed point", "0110.10", "6.5"],
  ["Floating point", "0.1101 × 2³", "6.5, normalised"],
  ["Register transfer", "R2 ← R1", "R2 becomes 0110"],
  ["Three-state bus", "E = 1", "bus carries 0110"],
  ["Arithmetic", "0110 + 0011", "1001"],
  ["Logic", "0110 ⊕ 0011", "0101"],
  ["Shift", "shl 0110", "1100"],
  ["ALSU", "select lines", "one unit does all three"],
];

const copy = [
  ["Read the magnitude", "Start with the unsigned word 0110. That is the value 6, before any sign or point is attached.", 1],
  ["Take the complements", "A sign of 0 makes 0 0110 mean +6. The 1's complement flips every bit to 1001. Adding 1 produces the 2's complement 1010, which is −6.", 4],
  ["Place the binary point", "0110.10 is fixed-point 6.5. Move the point until the magnitude is a fraction: 0.1101 × 2³ is the same value, normalised.", 6],
  ["Write a register transfer", "R2 ← R1 is a copy. The word 0110 arrives in R2. No arithmetic happens.", 7],
  ["Enable the bus", "A three-state buffer, not a wire from every register, puts R1 on the common bus when E = 1. E = 0 disconnects it.", 8],
  ["Add", "The arithmetic micro-operation is R1 ← R1 + R2. With R2 holding 0011, 0110 + 0011 = 1001.", 9],
  ["Exclusive-or", "The logic micro-operation is R1 ← R1 ⊕ R2. 0110 ⊕ 0011 = 0101. Each bit is compared, not added.", 10],
  ["Shift left", "shl 0110 is 1100. The bit that shifts in is 0. This is the shift micro-operation.", 11],
  ["One unit, three operations", "The arithmetic logic shift unit is a single box. Select lines choose add, xor, or shift. The table is the record of those three results.", 12],
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
