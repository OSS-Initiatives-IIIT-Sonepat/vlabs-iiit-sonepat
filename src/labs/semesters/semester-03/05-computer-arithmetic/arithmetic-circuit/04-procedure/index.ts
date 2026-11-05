import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { arithmeticCircuitStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/arithmetic-circuit";
import { boardShow } from "../components";

const headers = ["S1", "S0", "Cin", "Y", "D = A + Y + Cin", "Microoperation"];
const rows = [
  ["0", "0", "0", "B", "D = A + B", "Add"],
  ["0", "0", "1", "B", "D = A + B + 1", "Add with carry"],
  ["0", "1", "0", "B'", "D = A + B'", "Subtract with borrow"],
  ["0", "1", "1", "B'", "D = A + B' + 1", "Subtract"],
  ["1", "0", "0", "0", "D = A", "Transfer"],
  ["1", "0", "1", "0", "D = A + 1", "Increment A"],
  ["1", "1", "0", "1", "D = A − 1", "Decrement A"],
  ["1", "1", "1", "1", "D = A", "Transfer A"],
];

const ops: { s1: 0 | 1; s0: 0 | 1; cin: 0 | 1 }[] = [
  { s1: 0, s0: 0, cin: 0 },
  { s1: 0, s0: 0, cin: 1 },
  { s1: 0, s0: 1, cin: 0 },
  { s1: 0, s0: 1, cin: 1 },
  { s1: 1, s0: 0, cin: 0 },
  { s1: 1, s0: 0, cin: 1 },
  { s1: 1, s0: 1, cin: 0 },
  { s1: 1, s0: 1, cin: 1 },
];

const copy = [
  ["Decrement needs 1111", "A holds 1101. Subtracting one is the same as adding the 2's complement of 0001, which is 1111. 1101 + 1111 = 11100. Throw away the carry and the 4-bit result is 1100.", "psu"],
  ["The parallel adder", "Every operation is D = A + Y + Cin. The four full adders never change. Bit 0 is the left stage on the drawing, and Cout leaves bit 3.", "fa"],
  ["Choose Y", "A 4×1 mux on each bit picks Y. S1 S0 = 00 selects B, 01 selects B', 10 selects 0, and 11 selects 1. A = 1101 and B = 0011, so B' = 1100. The same S1 and S0 go to every mux.", "m0"],
  ["Add", "S1 S0 Cin = 0 0 0. Y is B, so the adder forms 1101 + 0011 = 10000. Cout lights. D3 D2 D1 D0 stay dark. Cout and D3 are the upper lamps on the left, D1 and D0 are below them, and D2 is the upper lamp at the right.", "led_cout"],
  ["Add with carry", "Keep Y = B and raise Cin. 1101 + 0011 + 1 = 10001. Cout stays on and D0 lights. This is the add used when a lower word produced a carry.", "w_cin_fa"],
  ["Subtract with borrow", "S1 S0 = 0 1 selects B' = 1100, and Cin is 0. 1101 + 1100 = 11001. The lamps read 1 1001. That is A − B − 1, because the +1 of the 2's complement is still missing. 13 − 3 − 1 = 9.", "w_s0_m3"],
  ["Subtract", "Raise Cin as well. 1101 + 1100 + 1 = 11010. The lamps read 1 1010, which is 10. This is A − B.", "led_d3"],
  ["Transfer A", "S1 S0 = 1 0 selects Y = 0000, and Cin is 0. The adder adds nothing. Cout is dark and the data lamps read 1 1 0 1, a copy of A.", "led_d0"],
  ["Increment A", "Keep Y = 0 and raise Cin. D = A + 1 = 1110. Cout stays dark. D0 turns off and D1 turns on.", "led_d1"],
  ["Decrement A", "S1 S0 = 1 1 selects Y = 1111, and Cin is 0. This is the marked figure. 1101 + 1111 = 11100. Cout lights, and D reads 1 1 0 0. Discarding Cout leaves 12, which is 13 − 1.", "led_d2"],
  ["Transfer A again", "Keep Y = 1111 and raise Cin. A + 1111 + 1 wraps around: the extra 1 cancels the decrement. D is 1101 again, and Cout stays on. The low four bits are A.", "led_cout"],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, highlight], i) => ({
  label,
  body,
  show: boardShow[i],
  highlight,
  activeInputs: i < 3 ? { s1: 0, s0: 0, cin: 0 } : ops[i - 3],
  schematic: fig[i],
  table: revealedTable(headers, rows, i < 3 ? 0 : i - 2),
}));
