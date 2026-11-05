import { type SceneProcedureStep } from "@/labs/experiments/types";
import { boothMultiplierStepSchematics as fig } from "@/labs/schematics/semester-03/01-combinational-arithmetic/booths-multiplier";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Booth recodes the multiplier",
    body: "Booth looks at a bit and the bit below it. The pair 10 means subtract the multiplicand. The pair 01 means add it. Subtracting in two's complement is invert, then add 1. This board is one bit of that step: M is the multiplicand bit, ACC is the accumulator bit, and SUB is 1 when the Booth digit is −1.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "XOR inverts M only while subtracting",
    body: "Place a 74HC86 and the 74HC283. M and SUB go into the XOR. The XOR output is A1 of the adder. SUB also goes to Cin. When SUB is 0 the XOR copies M and Cin is 0, so the adder adds M. When SUB is 1 the XOR flips M and Cin is 1, which is exactly invert-and-add-1.",
    show: placed,
    highlight: "xor1",
    schematic: fig[1],
  },
  {
    label: "Bring in the accumulator bit",
    body: "ACC is B1. Tie A2, A3, A4, B2, B3, and B4 to ground so this slice is only one bit wide. S1 will be the new accumulator bit. S2 will be the carry into the next Booth slice, because the higher inputs are 0 and S2 collects the carry out of bit 1.",
    show: wired,
    highlight: "add",
    schematic: fig[2],
  },
  {
    label: "LEDs on S1 and S2",
    body: "Green is S1. Yellow is S2. You are about to add first, then subtract, and the two lamps swap.",
    show: all,
    highlight: "led_s1",
    schematic: fig[3],
  },
  {
    label: "Add 1 and 1",
    body: "Set M = 1, ACC = 1, SUB = 0. The XOR leaves M as 1, Cin is 0, and 1 + 1 = 0 with a carry. S1 is off. S2 is on. That carry would enter the next bit of a full Booth adder.",
    show: all,
    highlight: "led_s2",
    activeInputs: { M: 1, ACC: 1, SUB: 0 },
    schematic: fig[4],
  },
  {
    label: "Subtract the same multiplicand bit",
    body: "Set M = 1, ACC = 0, SUB = 1. The XOR flips M to 0 and Cin adds the 1, so the bit added is the two's-complement of 1. 0 + 0 + 1 = 1, with no carry. S1 lights and S2 goes out. The control bit SUB decided add versus subtract without a separate subtractor.",
    show: all,
    highlight: "led_s1",
    activeInputs: { M: 1, ACC: 0, SUB: 1 },
    schematic: fig[5],
  },
];
