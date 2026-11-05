import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { commonBusStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/common-bus";
import { boardShow } from "../components";

const headers = ["S1", "S0", "Register", "Bus"];
const rows = [
  ["—", "—", "private wires", "too many lines"],
  ["—", "—", "D C B A", "four registers, bits 3 to 0"],
  ["—", "—", "four muxes", "one 4×1 mux per bit"],
  ["—", "—", "same bit", "A on input 0 of every mux"],
  ["0", "0", "A", "1 0 0 1"],
  ["0", "1", "B", "0 1 1 0"],
  ["1", "0", "C", "1 1 0 0"],
  ["1", "1", "D", "0 0 1 1"],
];

const copy = [
  ["Separate paths", "A private line from every register to every other register is more wire than a machine can spare. The registers that will share one bus are D, C, B, and A, each numbered 3 on the left and 0 on the right.", "psu"],
  ["Name four registers", "Four 4×1 multiplexers sit above the registers. MUX 3 carries bit 3, MUX 2 bit 2, MUX 1 bit 1, and MUX 0 bit 0.", "m3"],
  ["One mux per bit", "Each multiplexer has inputs 3, 2, 1, and 0. Input 3 is register D, input 2 is C, input 1 is B, and input 0 is A.", "m0"],
  ["Connect the same bit", "Most arrows stop where they are labeled. The marked line is input 0: it leaves MUX 3 and runs across to register A. Black lines join D to MUX 3, and C and B to the input that carries their name.", "w_i0_1_m3"],
  ["Select A", "S1 S0 = 00. Every multiplexer reads input 0, so the bus lamps show A. Upper lamps are bits 3 and 2, lower lamps are bits 1 and 0: 1 0 on top, 0 1 below.", "led_b3"],
  ["Select B", "S1 S0 = 01. The bus reads input 1, which is B, 0 1 1 0. Bit 3 goes dark and bits 2 and 1 light.", "led_b2"],
  ["Select C", "S1 S0 = 10. The bus reads input 2, which is C, 1 1 0 0. Bits 3 and 2 are on.", "led_b1"],
  ["Select D", "S1 S0 = 11. The bus reads input 3, which is D, 0 0 1 1. The same count for a wider machine: eight registers of 16 bits need 16 multiplexers of 8×1, and 3 select lines.", "led_b0"],
] as const;

const inputs: Record<string, 0 | 1>[] = [
  { s1: 0, s0: 0 },
  { s1: 0, s0: 0 },
  { s1: 0, s0: 0 },
  { s1: 0, s0: 0 },
  { s1: 0, s0: 0 },
  { s1: 0, s0: 1 },
  { s1: 1, s0: 0 },
  { s1: 1, s0: 1 },
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
