import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { binaryIncrementerStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/binary-incrementer";
import { boardShow } from "../components";

const headers = ["A", "Added", "C4 S"];
const rows = [
  ["1101", "1", "1110"],
  ["1101", "one half adder per bit", "—"],
  ["1 1 0 1", "x of each stage", "—"],
  ["1101", "1 into bit 0", "carry 1 then 0, 0"],
  ["1101", "1", "0 1110"],
  ["1101", "C0 = 1, B = 0000", "0 1110"],
];

const copy = [
  ["Add one", "The increment microoperation adds one to a number in a register. R1 holds 1101. The pencil sum is 1110, and the carry out of the word is 0.", "psu"],
  ["Four half adders", "Each box adds its x bit to a y bit. y is the carry from the bit on the right, except at bit 0, where y is the constant 1. The chip on the board is a full adder with B held at 0000, which is the same addition.", "fa"],
  ["Connect A", "A3 A2 A1 A0 = 1 1 0 1. These are the x inputs. B is tied to 0000, so each stage really does add a single bit.", "w_a4"],
  ["Chain the carry", "C0 is still 0, so the lamps copy A: C4 is dark and the sum is 1 1 0 1. Bit 0 is the stage that will see the +1. It computes 1 + 1, writes 0, and sends a carry to bit 1.", "w_cin_fa"],
  ["Read 1110", "Raise C0. C4 stays dark. The sum lamps read 1 1 1 0. Bit 0 has turned off and bit 1 has turned on. Upper lamps are C4, S3, and S2. Lower lamps are S1 and S0.", "led_s1"],
  ["Same circuit, wider word", "An n-bit incrementer is n half adders, or one n-bit adder with the added word tied to 0 and the carry input tied to 1. Here that carry input is C0.", "led_s0"],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, highlight], i) => ({
  label,
  body,
  show: boardShow[i],
  highlight,
  activeInputs: { cin: i >= 4 ? 1 : 0 },
  schematic: fig[i],
  table: revealedTable(headers, rows, i + 1),
}));
