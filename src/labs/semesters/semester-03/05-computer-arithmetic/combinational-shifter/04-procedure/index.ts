import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { combinationalShifterStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/combinational-shifter";
import { boardShow } from "../components";

const headers = ["S", "Serial input", "H0 H1 H2 H3", "Operation"];
const rows = [
  ["0", "IR = 0", "0 1 1 0", "Logical shift right"],
  ["1", "IL = 0", "1 0 1 0", "Logical shift left"],
  ["0", "IR = A3 = 1", "1 1 1 0", "Circular shift right"],
  ["1", "IL = A0 = 1", "1 0 1 1", "Circular shift left"],
  ["0", "IR = A0 = 1", "1 1 1 0", "Arithmetic shift right"],
  ["1", "IL = 0", "1 0 1 0", "Arithmetic shift left"],
];

const ops: { s: 0 | 1; ir: 0 | 1; il: 0 | 1 }[] = [
  { s: 0, ir: 0, il: 0 },
  { s: 1, ir: 0, il: 0 },
  { s: 0, ir: 1, il: 0 },
  { s: 1, ir: 0, il: 1 },
  { s: 0, ir: 1, il: 0 },
  { s: 1, ir: 0, il: 0 },
];

const copy = [
  ["Logical shift", "A logical shift pushes 0 into the open end. 1101 moved left is 1010. Moved right it is 0110.", "psu"],
  ["Circular shift", "The bit that falls off is fed back in. Circular left of 1101 is 1011. Circular right is 1110.", "psu"],
  ["Arithmetic shift", "Shift left multiplies a signed word by 2. Shift right divides by 2 and copies the sign into the vacated bit. The sign here is the left bit, 1.", "mh"],
  ["One select, four muxes", "Each 74HC153 holds two muxes. S1 of both chips is tied to 0, so the S wire is the only select. S = 0 moves the bits down the drawing. S = 1 moves them up.", "w_s_mh"],
  ["Wire 1101", "A0 and A1 are 1, A2 is 0, and A3 is 1. IR enters H0 when S = 0. IL enters H3 when S = 1. The other mux inputs are the neighbouring A bits from the table.", "w_ir_mh"],
  ["Logical shift right", "S = 0 and IR = 0. A 0 enters on the left and A3 falls off. H0 H1 H2 H3 = 0 1 1 0. H0 is the upper-left lamp, H1 the upper-right, H2 the lower-left, and H3 the lower-right.", "led_h1"],
  ["Logical shift left", "S = 1 and IL = 0. A 0 enters on the right and A0 falls off. The lamps read 1 0 1 0.", "led_h0"],
  ["Circular shift right", "Keep S = 0 and raise IR to 1, which is A3, the bit a right shift would lose. The lamps read 1 1 1 0.", "led_h0"],
  ["Circular shift left", "S = 1 and IL = 1, which is A0 coming back in on the right. The lamps read 1 0 1 1.", "led_h3"],
  ["Arithmetic shift right", "S = 0 again, and IR is the sign bit A0. A0 is 1, so the lamps again read 1 1 1 0. The wiring is the sign, not the bit that shifted out.", "led_h1"],
  ["Arithmetic shift left", "S = 1 and IL = 0. The lamps read 1 0 1 0. That is 1101 multiplied by 2, with the result kept to four bits.", "led_h2"],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([labelText, body, highlight], i) => ({
  label: labelText,
  body,
  show: boardShow[i],
  highlight,
  activeInputs: i < 5 ? { s: 0, ir: 0, il: 0 } : ops[i - 5],
  schematic: fig[i],
  table: revealedTable(headers, rows, i < 5 ? 0 : i - 4),
}));
