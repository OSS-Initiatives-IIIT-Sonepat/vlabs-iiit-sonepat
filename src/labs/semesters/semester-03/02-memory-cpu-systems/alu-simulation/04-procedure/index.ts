import { type SceneProcedureStep } from "@/labs/experiments/types";
import { aluSliceStepSchematics as fig } from "@/labs/schematics/semester-03/02-memory-cpu-systems/alu-simulation";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const wired = [...placed, ...stages.wire];
const all = [...wired, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Three results, one opcode",
    body: "A 1-bit ALU computes the useful operations in parallel and a multiplexer keeps one of them. AND, OR, and XOR of the same A and B are the three operations on this board. The 74HC153 select lines are the opcode: 00 keeps AND, 01 keeps OR, 10 keeps XOR.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Place the gates and the mux",
    body: "Seat the three gates and the 74HC153. Tie I3 to ground and tie the active-low enable to ground so the mux is enabled and the unused input is 0. S0 is the low select bit. S1 is the high one.",
    show: placed,
    highlight: "mux",
    schematic: fig[1],
  },
  {
    label: "Fan A and B out, then into the mux",
    body: "A goes to the A pin of every gate. B goes to every B pin. AND's output is I0, OR's output is I1, XOR's output is I2. The arithmetic in a wider ALU is the same idea with the adder from the carry-lookahead lab in place of one of these gates, and flags taken from the result.",
    show: wired,
    highlight: "and1",
    schematic: fig[2],
  },
  {
    label: "LED on Y",
    body: "Y1 of the mux drives the LED through 330 Ω. Set A = 1 and B = 1, and leave both select bits at 0. You want the AND.",
    show: all,
    highlight: "led_y",
    activeInputs: { A: 1, B: 1, S0: 0, S1: 0 },
    schematic: fig[3],
  },
  {
    label: "Opcode 00 keeps the AND",
    body: "1 AND 1 is 1, so the LED is on. OR of the same bits is also 1, and XOR is 0, but those results are sitting on I1 and I2 and the mux is not looking at them. The opcode, not the data, chose the lamp.",
    show: all,
    highlight: "and1",
    activeInputs: { A: 1, B: 1, S0: 0, S1: 0 },
    schematic: fig[4],
  },
  {
    label: "Opcode 10 keeps the XOR",
    body: "Raise S1 and leave S0 low. That is select 10, which is I2. 1 XOR 1 is 0, so the LED goes out even though A and B did not change. A real ALU does this for every bit, then the flags (zero, sign, carry, overflow) are read off the result bus.",
    show: all,
    highlight: "xor1",
    activeInputs: { A: 1, B: 1, S0: 0, S1: 1 },
    schematic: fig[5],
  },
];
