import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { triStateBusStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/tri-state-bus";
import { boardShow } from "../components";

const headers = ["E", "S1", "S0", "Driver", "Bus"];
const rows = [
  ["—", "—", "—", "none", "buffer is open or closed"],
  ["—", "—", "—", "A0 B0 C0 D0", "1, 0, 1, 0"],
  ["—", "—", "—", "tied outputs", "one line"],
  ["0", "1", "0", "none", "high impedance"],
  ["1", "0", "0", "A0", "1"],
  ["1", "0", "1", "B0", "0"],
  ["1", "1", "0", "C0", "1"],
  ["1", "1", "1", "D0", "0"],
];

const copy = [
  ["Three states", "A tri-state buffer copies its input when control C is 1. When C is 0 the output is an open circuit, called high impedance.", "psu"],
  ["Four inputs", "One buffer for each register bit. A0 is tied to 1, B0 to 0, C0 to 1, and D0 to 0.", "ba"],
  ["One bus line", "The four outputs are wired together. That junction is the bus line for bit 0. The lamp shows whatever is driving it.", "led_bus"],
  ["Decoder off", "The 74HC139 enable is active-low, so a 1 on that pin holds every output high and every buffer off. The lamp stays dark. The line is floating, not a logic 0.", "dec"],
  ["Select A", "Enable the decoder and set S1 S0 = 00. Output 0 turns the A0 buffer on. A0 is 1, so the bus lamp lights.", "led_bus"],
  ["Select B", "S1 S0 = 01 turns on B0 instead. B0 is 0, so the lamp goes dark. A0 is no longer on the line.", "w_y1"],
  ["Select C", "S1 S0 = 10 is the figure. Output 2 turns on the C0 buffer. C0 is 1 and the lamp lights. The marked path is that buffer.", "w_y2"],
  ["Select D", "S1 S0 = 11 turns on D0, which is 0, and the lamp goes dark. Exactly one buffer has the line.", "w_y3"],
] as const;

const inputs: Record<string, 0 | 1>[] = [
  { e: 1, s1: 0, s0: 0 },
  { e: 1, s1: 0, s0: 0 },
  { e: 1, s1: 0, s0: 0 },
  { e: 1, s1: 1, s0: 0 },
  { e: 0, s1: 0, s0: 0 },
  { e: 0, s1: 0, s0: 1 },
  { e: 0, s1: 1, s0: 0 },
  { e: 0, s1: 1, s0: 1 },
];

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, highlight], i) => ({
  label,
  body,
  show: boardShow[i],
  highlight,
  activeInputs: inputs[i],
  schematic: fig[i],
  table: revealedTable(headers, rows, i + 1),
}));
