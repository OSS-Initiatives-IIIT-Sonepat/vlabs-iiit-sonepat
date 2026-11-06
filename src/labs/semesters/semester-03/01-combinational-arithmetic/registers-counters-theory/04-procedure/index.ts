import { type SceneProcedureStep } from "@/labs/experiments/types";
import { registersCountersStepSchematics as fig } from "@/labs/schematics/semester-03/01-combinational-arithmetic/registers-counters-theory";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const all = [...placed, ...stages.wire, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "A counter is a register plus an increment",
    body: "A register copies D onto Q when its load pin is active. A counter is that same row of flip-flops with an incrementer in front of D, and the load held inactive so every clock adds one. The 74HC161 can do either: LD' low loads D, LD' high with ENP and ENT high counts.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Arm the 74HC161 to count",
    body: "Place the chip. Tie CLR', LD', ENP, and ENT to +5 V. Tie D0 through D3 to ground — they would be the loaded value, and we are not loading. The next rising edge should add one, not copy D, and it should not clear.",
    show: placed,
    highlight: "cnt",
    schematic: fig[1],
  },
  {
    label: "Clock low, count is 0",
    body: "Wire the clock and the four LEDs. Q0 is the low bit. Leave the clock low. The count powers up at 0000, so every LED is dark. Click Next to send the rising edge. Do not skip this step: the counter only sees an edge if the clock was low first.",
    show: all,
    highlight: "led_q0",
    activeInputs: { CLK: 0 },
    schematic: fig[2],
  },
  {
    label: "First rising edge is 0001",
    body: "The clock is now high. ENP and ENT were already high and LD' was high, so the chip incremented. Only Q0 is on. That is binary 1. A shift register would have moved a bit sideways. This one added.",
    show: all,
    highlight: "led_q0",
    activeInputs: { CLK: 1 },
    schematic: fig[3],
  },
  {
    label: "Bring the clock back down",
    body: "Drop the clock. The count holds. The flip-flops inside the 74HC161 are edge-triggered, so a steady low or a steady high does not add another one. The next rise is the second count.",
    show: all,
    highlight: "cnt",
    activeInputs: { CLK: 0 },
    schematic: fig[4],
  },
  {
    label: "Second rising edge is 0010",
    body: "The clock rises again. Q0 turns off and Q1 turns on. The stored number is 2. One more rise would light Q0 as well, making 3. To use the same chip as a register you would present a value on D, pull LD' low, and give one clock. The LEDs would then show D instead of the old count.",
    show: all,
    highlight: "led_q1",
    activeInputs: { CLK: 1 },
    schematic: fig[5],
  },
];
