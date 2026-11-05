import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { arithmeticLogicShiftStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/arithmetic-logic-shift";
import { boardShow } from "../components";

const headers = ["S3", "S2", "S1", "S0", "Cin", "F", "Microoperation"];
const rows = [
  ["0", "0", "0", "0", "0", "1101", "Transfer A"],
  ["0", "0", "0", "0", "1", "1110", "Increment A"],
  ["0", "0", "0", "1", "0", "0000", "Addition"],
  ["0", "0", "0", "1", "1", "0001", "Add with carry"],
  ["0", "0", "1", "0", "0", "1001", "Subtract with borrow"],
  ["0", "0", "1", "0", "1", "1010", "Subtraction"],
  ["0", "0", "1", "1", "0", "1100", "Decrement"],
  ["0", "0", "1", "1", "1", "1101", "Transfer A"],
  ["0", "1", "0", "0", "x", "0001", "AND"],
  ["0", "1", "0", "1", "x", "1111", "OR"],
  ["0", "1", "1", "0", "x", "1110", "XOR"],
  ["0", "1", "1", "1", "x", "0010", "Complement A"],
  ["1", "0", "x", "x", "x", "0110", "Shift right"],
  ["1", "1", "x", "x", "x", "1010", "Shift left"],
];

type Op = { s3: 0 | 1; s2: 0 | 1; s1: 0 | 1; s0: 0 | 1; cin: 0 | 1 };
const ops: Op[] = [
  { s3: 0, s2: 0, s1: 0, s0: 0, cin: 0 },
  { s3: 0, s2: 0, s1: 0, s0: 0, cin: 1 },
  { s3: 0, s2: 0, s1: 0, s0: 1, cin: 0 },
  { s3: 0, s2: 0, s1: 0, s0: 1, cin: 1 },
  { s3: 0, s2: 0, s1: 1, s0: 0, cin: 0 },
  { s3: 0, s2: 0, s1: 1, s0: 0, cin: 1 },
  { s3: 0, s2: 0, s1: 1, s0: 1, cin: 0 },
  { s3: 0, s2: 0, s1: 1, s0: 1, cin: 1 },
  { s3: 0, s2: 1, s1: 0, s0: 0, cin: 0 },
  { s3: 0, s2: 1, s1: 0, s0: 1, cin: 0 },
  { s3: 0, s2: 1, s1: 1, s0: 0, cin: 0 },
  { s3: 0, s2: 1, s1: 1, s0: 1, cin: 0 },
  { s3: 1, s2: 0, s1: 0, s0: 0, cin: 0 },
  { s3: 1, s2: 1, s1: 0, s0: 0, cin: 0 },
];

const copy = [
  ["One shared unit", "The registers do not each contain an adder. They share this unit. S3 S2 choose arithmetic, logic, or a shift. S1 S0 and Cin choose the operation.", "psu"],
  ["Arithmetic stage", "The adder computes D = A + Y + Cin. S1 S0 = 00 selects Y = 0, 01 selects B, 10 selects B', and 11 selects 1. A = 1101 and B = 0011.", "fa"],
  ["Logic stage", "One AND, OR, XOR, and inverter per bit. The same S1 S0 selects E: 00 is AND, 01 is OR, 10 is XOR, and 11 is the complement of A.", "and"],
  ["Choose F", "The last multiplexer picks F. Input 0 is D, input 1 is E, input 2 is the shift-right bit, and input 3 is the shift-left bit. F0 and F1 are the upper lamps. F2 and F3 are the lower lamps.", "fmH"],
  ["Transfer A", "S3 S2 S1 S0 Cin = 0 0 0 0 0. Y is 0 and Cin is 0, so F copies A. The lamps read 1 1 0 1.", "led_f0"],
  ["Increment A", "Keep Y = 0 and raise Cin. F = A + 1 = 1110. F3 turns off and F2 turns on.", "led_f2"],
  ["Addition", "S1 S0 = 0 1 selects Y = B, and Cin is 0. 1101 + 0011 = 10000. The carry is the high 1. All four F lamps are dark.", "led_f0"],
  ["Add with carry", "Raise Cin. 1101 + 0011 + 1 = 10001. F3 lights. The other F lamps stay dark.", "led_f3"],
  ["Subtract with borrow", "S1 S0 = 1 0 selects B' = 1100, and Cin is 0. 1101 + 1100 = 11001. The lamps read 1 0 0 1, which is 13 − 3 − 1.", "led_f0"],
  ["Subtraction", "Raise Cin. 1101 + 1100 + 1 = 11010. The lamps read 1 0 1 0, which is 10.", "led_f2"],
  ["Decrement", "S1 S0 = 1 1 selects Y = 1111, and Cin is 0. 1101 + 1111 = 11100. The lamps read 1 1 0 0.", "led_f1"],
  ["Transfer A again", "Keep Y = 1111 and raise Cin. The extra 1 cancels the decrement. F is 1101 again.", "led_f3"],
  ["AND", "S3 S2 = 0 1 selects the logic stage, and S1 S0 = 0 0. 1101 ∧ 0011 = 0001. Only F3 is lit.", "led_f3"],
  ["OR", "S1 S0 = 0 1. 1101 ∨ 0011 = 1111. All four lamps are lit.", "led_f1"],
  ["XOR", "S1 S0 = 1 0. 1101 ⊕ 0011 = 1110. F3 turns off.", "led_f2"],
  ["Complement A", "S1 S0 = 1 1. F = A' = 0010. Only F2 is lit.", "led_f2"],
  ["Shift right", "S3 S2 = 1 0. A 0 enters on the left and the bits move right. F = 0 1 1 0.", "led_f1"],
  ["Shift left", "S3 S2 = 1 1. A 0 enters on the right and the bits move left. F = 1 0 1 0.", "led_f0"],
] as const;

const idle: Op = { s3: 0, s2: 0, s1: 0, s0: 0, cin: 0 };

export const procedureSteps: SceneProcedureStep[] = copy.map(([labelText, body, highlight], i) => ({
  label: labelText,
  body,
  show: boardShow[i],
  highlight,
  activeInputs: i < 4 ? idle : ops[i - 4],
  schematic: fig[i],
  table: revealedTable(headers, rows, i < 4 ? 0 : i - 3),
}));
