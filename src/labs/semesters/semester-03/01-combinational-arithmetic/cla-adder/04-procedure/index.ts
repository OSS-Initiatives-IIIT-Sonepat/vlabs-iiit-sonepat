import { type SceneProcedureStep } from "@/labs/experiments/types";
import { claAdderStepSchematics as fig } from "@/labs/schematics/semester-03/01-combinational-arithmetic/cla-adder";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];

const add = { A4: 1, A3: 0, A2: 1, A1: 0, B4: 0, B3: 0, B2: 1, B1: 1 } as const;
const overflow = {
  A4: 1,
  A3: 1,
  A2: 1,
  A1: 1,
  B4: 0,
  B3: 0,
  B2: 0,
  B1: 1,
} as const;

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Why the carry does not ripple",
    body: "A ripple adder waits: bit 2 cannot start until bit 1 has produced a carry. A carry-lookahead adder instead builds every carry from generate and propagate. Generate is $G_i = A_i B_i$ (this bit creates a carry). Propagate is $P_i = A_i \\oplus B_i$ (this bit passes a carry on). $C_{i+1} = G_i + P_i C_i$, and unrolling that formula gives C1, C2, C3, and C4 together.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Place the 74HC283",
    body: "Seat the 74HC283 across the centre gap and give it +5 V and ground. This chip is a 4-bit adder with lookahead carry: the G and P logic is inside the package, so you will not wire a carry from S1 over to the next bit. Tie Cin (C0) to ground. The addition starts with no incoming carry.",
    show: placed,
    highlight: "add",
    schematic: fig[1],
  },
  {
    label: "Wire the two operands",
    body: "A1 is the least significant bit and A4 is the most significant, same for B. Bring each bit in on its own jumper. Leave Cin on ground. The numbers for the first trial are $A = 1010$ and $B = 0011$, which is 10 + 3.",
    show: wired,
    highlight: "w_a4_add",
    schematic: fig[2],
  },
  {
    label: "Add the sum and carry LEDs",
    body: "Each sum pin and C4 drives a 330 Ω resistor and then an LED to ground. S1 sits at the least significant lamp. Turn the inputs to 1010 and 0011 before you read them: 10 + 3 = 13 = 1101, so S4, S3, and S1 should light and S2 and C4 should stay dark.",
    show: all,
    highlight: "led_s1",
    activeInputs: add,
    schematic: fig[3],
  },
  {
    label: "Read 1010 + 0011",
    body: "Check the lamps against 1101. S4 is the 8, S3 is the 4, S1 is the 1, and S2 is the 2 that should be off. C4 off means the total still fits in four bits. Nothing in this result waited on a carry walking from A1 up to A4 — the chip formed C4 from the generate and propagate terms.",
    show: all,
    highlight: "led_s4",
    activeInputs: add,
    schematic: fig[4],
  },
  {
    label: "Force a carry out",
    body: "Change the inputs to $A = 1111$ and $B = 0001$. That is 15 + 1 = 16. Every sum LED goes out and only C4 lights. On a ripple board you would watch the carry hop through four stages to reach that lamp. Here C4 is computed with the sums, which is the whole point of lookahead.",
    show: all,
    highlight: "led_c4",
    activeInputs: overflow,
    schematic: fig[5],
  },
];
