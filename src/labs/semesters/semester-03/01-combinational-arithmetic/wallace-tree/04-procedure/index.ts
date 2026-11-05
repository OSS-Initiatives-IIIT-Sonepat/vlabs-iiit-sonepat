import { type SceneProcedureStep } from "@/labs/experiments/types";
import { wallaceTreeStepSchematics as fig } from "@/labs/schematics/semester-03/01-combinational-arithmetic/wallace-tree";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];
const ones = { A1: 1, B0: 1, A0: 1, B1: 1 } as const;

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "A column of two bits is a half adder",
    body: "A Wallace tree does not add partial products one row at a time. It compresses every column as soon as two or three bits are present. Two bits in one column are a half adder: the XOR is the bit that stays in the column, and the AND is the carry that moves to the next column. This board is that one stage.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Build the two partial-product bits",
    body: "The two bits that share a column are $A_1 B_0$ and $A_0 B_1$. Place two 74HC08 packages and wire those pairs. They are not yet added. They are the two numbers the half adder is about to compress.",
    show: [...stages.power, "andA", "andB", "w_vcc_andA", "w_gnd_andA", "w_vcc_andB", "w_gnd_andB", "w_a1_andA", "w_b0_andA", "w_a0_andB", "w_b1_andB"],
    highlight: "andA",
    schematic: fig[1],
  },
  {
    label: "XOR the sum, AND the carry",
    body: "Feed both AND outputs into a 74HC86. That XOR is the sum bit of the column. Feed the same two outputs into a third AND. That AND is the carry into the next column. Two 1s must become sum 0 and carry 1. Two 0s become sum 0 and carry 0. One 1 becomes sum 1 and carry 0.",
    show: wired,
    highlight: "xor1",
    schematic: fig[2],
  },
  {
    label: "Hang LEDs on the sum and the carry",
    body: "The green LED is the XOR. The yellow LED is the carry AND. Both go through 330 Ω to ground. Set every input to 1 so both partial products are 1.",
    show: all,
    highlight: "led_sum",
    activeInputs: ones,
    schematic: fig[3],
  },
  {
    label: "Watch two 1s become a carry",
    body: "The sum LED is off and the carry LED is on. The column held two 1s and now holds a 0, with a 1 handed to the next column. A full Wallace tree repeats this reduction until one row of sum bits and one row of carries remain, then a normal adder finishes them. The depth is logarithmic in the number of partial-product rows, which is why the multiply is faster than an array of ripple rows.",
    show: all,
    highlight: "led_carry",
    activeInputs: ones,
    schematic: fig[4],
  },
];
