import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { registerTransferStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/register-transfer";
import { boardShow } from "../components";

const headers = ["Step", "Drawing", "Meaning"];
const rows = [
  ["1", "R1", "Capital-letter name"],
  ["2", "15 … 0", "Bits numbered from the right"],
  ["3", "7 6 5 4 3 2 1 0", "One cell per bit"],
  ["4", "PC(H) | PC(L)", "Bits 15–8 and 7–0"],
  ["5", "R2 ← R1", "Copy R1 into R2"],
  ["6", "1 1 0 1", "The same bits arrive in R2"],
  ["7", "P : R2 ← R1", "Copy only when P = 1"],
  ["8", "Load, n", "P loads R2 from R1"],
  ["9", "Clock edge", "The copy happens here"],
];

const copy = [
  [
    "A register",
    "A register is a box with a capital-letter name. MAR is the memory address register, PC the program counter, IR the instruction register, and R1 a processor register. On the board, the chip marked R1 is that register.",
    "r1",
  ],
  [
    "Number the bits",
    "R2 is drawn with bit 15 at the left end and bit 0 at the right end. R1's data pins are tied so the four bits read 1 1 0 1, bit 0 on the right.",
    "w_d0",
  ],
  [
    "Show each bit",
    "The same idea, one cell at a time: 7, 6, 5, 4, 3, 2, 1, 0. The four red lamps are R1's outputs. They stay dark until R1 is loaded.",
    "led_r1b3",
  ],
  [
    "Split the register",
    "PC(H) holds the high byte, bits 15 to 8. PC(L) holds the low byte, bits 7 to 0. The second chip is R2, the destination, still empty.",
    "r2",
  ],
  [
    "Write the transfer",
    "R2 ← R1 is the statement that replaces the contents of R2 with the contents of R1. The yellow wires are those lines, one per bit.",
    "w_b3",
  ],
  [
    "Copy the bits",
    "Load R1. Its lamps now read 1 1 0 1. R2's green lamps stay dark, because nothing has told R2 to load.",
    "led_r1b1",
  ],
  [
    "Add the control function",
    "If (P = 1) then (R2 ← R1). The short form is P : R2 ← R1. The AND gate is that condition: P and the clock both have to be 1. Both are 0, so Load is dark.",
    "gate",
  ],
  [
    "Draw the hardware",
    "The control circuit sends P to the load input of R2. P is now 1, and the clock from the signal generator is still low, so Load stays off.",
    "w_p_gate",
  ],
  [
    "Mark the clock edge",
    "Load stays 1 across one rising clock. The generator steps to that edge, Load lights, and R2's lamps copy 1 1 0 1.",
    "led_loadled",
  ],
] as const;

const inputs: Record<string, 0 | 1>[] = [
  { ld1: 0, p: 0, clk: 0 },
  { ld1: 0, p: 0, clk: 0 },
  { ld1: 0, p: 0, clk: 0 },
  { ld1: 0, p: 0, clk: 0 },
  { ld1: 0, p: 0, clk: 0 },
  { ld1: 1, p: 0, clk: 0 },
  { ld1: 1, p: 0, clk: 0 },
  { ld1: 1, p: 1, clk: 0 },
  { ld1: 1, p: 1, clk: 1 },
];

const clockReading = [
  "0 Hz square, clock low",
  "0 Hz square, clock low",
  "0 Hz square, clock low",
  "0 Hz square, clock low",
  "0 Hz square, clock low",
  "0 Hz square, clock low",
  "0 Hz square, P = 0",
  "0 Hz square, P = 1",
  "1 kHz square, rising edge",
];

export const procedureSteps: SceneProcedureStep[] = copy.map(
  ([label, body, highlight], i) => ({
    label,
    body,
    show: boardShow[i],
    highlight,
    activeInputs: inputs[i],
    readings: { clkgen: clockReading[i] },
    schematic: fig[i],
    table: revealedTable(headers, rows, i + 1),
  }),
);
