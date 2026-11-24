import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Recall the subtraction rule",
  body: "Subtraction is done by addition: $A - B = A + \\overline{B} + 1$. So you need (a) four inverters to complement $B$ — the four XOR gates of one 74HC86, each with one input tied HIGH ($B \\oplus 1 = \\overline{B}$) — and (b) a 4-bit adder (74HC283) with carry-in $C_0$ held at logic 1. Layout: inputs A1–A4 at columns 2–5 and B1–B4 at columns 6–9, the 74HC86 at columns 12–18, the 74HC283 at columns 22–29 and the output LEDs at columns 32–56.",
  show: ["bb"],
  highlight: "bb",
};
