import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arrayMultiplierStepSchematics as fig } from "@/labs/schematics/semester-03/01-combinational-arithmetic/combinational-multipliers";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];
const three = { A0: 1, A1: 1, B0: 1, B1: 1 } as const;

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Multiply by making partial products",
    body: "An array multiplier ANDs every bit of A with every bit of B, then adds those products with a shift. For two 2-bit numbers the products are $A_0 B_0$, $A_1 B_0$, $A_0 B_1$, and $A_1 B_1$. $A_0 B_0$ is already bit 0 of the answer. The other three have to be added in columns.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Place the four AND gates",
    body: "One 74HC08 per product, so you can see each bit. Wire $A_0$ with $B_0$, $A_1$ with $B_0$, $A_0$ with $B_1$, and $A_1$ with $B_1$. The trial multiply is $11 \\times 11$, so every product will be 1.",
    show: [
      ...stages.power,
      "and0",
      "and1",
      "and2",
      "and3",
      "w_vcc_and0",
      "w_gnd_and0",
      "w_vcc_and1",
      "w_gnd_and1",
      "w_vcc_and2",
      "w_gnd_and2",
      "w_vcc_and3",
      "w_gnd_and3",
      "w_a0_and0",
      "w_b0_and0",
      "w_a1_and1",
      "w_b0_and1",
      "w_a0_and2",
      "w_b1_and2",
      "w_a1_and3",
      "w_b1_and3",
    ],
    highlight: "and0",
    schematic: fig[1],
  },
  {
    label: "Shift them into the adder row",
    body: "Place the 74HC283. $A_1 B_0$ goes to A1, $A_0 B_1$ goes to B1, and $A_1 B_1$ goes to B2 — one column further left, which is the shift. Tie A2, A3, A4, B3, B4, and Cin to ground. $A_0 B_0$ does not enter the adder. It is P0 by itself.",
    show: wired,
    highlight: "add",
    schematic: fig[2],
  },
  {
    label: "LEDs for P0 and the sum",
    body: "P0 is the first AND. S1, S2, and S3 come off the adder. S3 is the high bit of a 2-bit multiply. Set both operands to 11.",
    show: all,
    highlight: "led_p0",
    activeInputs: three,
    schematic: fig[3],
  },
  {
    label: "Read 3 × 3 = 9",
    body: "9 is 1001. P0 is on, S1 is off, S2 is off, S3 is on. Column 1 received two 1s, so it summed to 0 and sent a carry. Column 2 received $A_1 B_1 = 1$ plus that carry, summed to 0, and sent the 1 that lights S3.",
    show: all,
    highlight: "led_s3",
    activeInputs: three,
    schematic: fig[4],
  },
  {
    label: "This row is not a tree",
    body: "The Wallace board compressed one column with a half adder and stopped. This board keeps a whole row of partial products and lets one adder sum them, which is the array-multiplier organisation. More bits means more AND gates and more adder rows. The carry still ripples along a row, so the array is regular and the tree is faster.",
    show: all,
    highlight: "add",
    activeInputs: three,
    schematic: fig[5],
  },
];
