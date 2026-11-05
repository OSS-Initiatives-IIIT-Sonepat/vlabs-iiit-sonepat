import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { boothAlgorithmStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/booth-algorithm";

const headers = ["Cycle", "Q0 Q−1", "AC and Q"];
const rows = [
  ["Start", "—", "00000 10011, count 5"],
  ["1", "10 subtract", "AC = 01001"],
  ["1 shift", "ASR", "00100 11001, count 4"],
  ["2", "11 skip, ASR", "shift only"],
  ["3 and 4", "01 then 00", "11110 01011"],
  ["5", "10 subtract, ASR", "00011 10101 = 117"],
];

const copy = [
  ["Initial registers", "AC is 00000, Q is 10011, Q−1 is 0, the multiplicand BR is 10111 (−9), and the count is 5. The multiplier is −13.", 1],
  ["Inspect the pair", "Q0 is 1 and Q−1 is 0, so the pair is 10. The 01 arm would add BR. 00 and 11 would change nothing.", 2],
  ["Subtract BR", "The two's complement of 10111 is 01001. AC becomes 00000 + 01001 = 01001.", 3],
  ["Shift", "An arithmetic right shift gives AC = 00100, Q = 11001, Q−1 = 1, count = 4.", 4],
  ["The middle cycles", "Cycle 2 sees 11 and only shifts. Cycle 3 sees 01, adds BR, and shifts. Cycle 4 sees 00 and only shifts.", 5],
  ["The product", "Cycle 5 sees 10, subtracts BR, and shifts. Count is 0. AC and Q are 00011 10101, which is 117. (−9) × (−13) = 117.", 6],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
