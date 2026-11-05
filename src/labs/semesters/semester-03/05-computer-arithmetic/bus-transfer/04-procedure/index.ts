import { type SceneProcedureStep } from "@/labs/experiments/types";
import { busTransferStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/bus-transfer";

import { stages } from "../components";

const all = [...stages.power, ...stages.file];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Power the board",
    body: "Join the supply to both rails. The two flip-flops and the multiplexer all take power from those rails.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Place the two registers",
    body: "R0's D input is tied high and R1's D input is tied low. Set and clear on both packages are tied inactive. The clock jumper drives both clocks. Leave the clock low for this step so nothing is captured yet.",
    show: all,
    highlight: "r0",
    activeInputs: { clk: 0, sel: 0 },
    schematic: fig[0],
  },
  {
    label: "Clock both registers",
    body: "Raise the clock. R0 captures 1 and R1 captures 0. Do not skip the low clock: a D flip-flop stores its D input on the rising edge, and the edge only exists if the clock was low first.",
    show: all,
    highlight: "r1",
    activeInputs: { clk: 1, sel: 0 },
    schematic: fig[1],
  },
  {
    label: "Select R0",
    body: "The mux select is 0, so Y follows R0. The bus lamp lights because R0 holds 1.",
    show: all,
    highlight: "led_bus",
    activeInputs: { clk: 1, sel: 0 },
    schematic: fig[1],
  },
  {
    label: "Select R1",
    body: "Change the select to 1. Y now follows R1, which holds 0, so the lamp goes out. The same wires carried R0 a moment ago. That is a bus: the select chooses the source.",
    show: all,
    highlight: "mux",
    activeInputs: { clk: 1, sel: 1 },
    schematic: fig[2],
  },
  {
    label: "Logical shift",
    body: "1011 shifted left logically is 0110. The bit that falls off is discarded and the vacant bit is filled with 0.",
    show: all,
    activeInputs: { clk: 1, sel: 1 },
    schematic: fig[3],
  },
  {
    label: "Circular shift",
    body: "1011 shifted left circularly is 0111. The 1 that left the top end comes back in at the bottom.",
    show: all,
    activeInputs: { clk: 1, sel: 1 },
    schematic: fig[4],
  },
  {
    label: "Arithmetic shift",
    body: "1101 shifted right arithmetically is 1110. The sign bit is copied into the vacant place, so a negative value stays negative.",
    show: all,
    activeInputs: { clk: 1, sel: 1 },
    schematic: fig[5],
  },
  {
    label: "Normalise a mantissa",
    body: "0.001011 shifted until the first digit is 1 becomes 0.101100. A normalised mantissa has a non-zero leading digit. The exponent is adjusted by the number of places you shifted.",
    show: all,
    activeInputs: { clk: 1, sel: 1 },
    schematic: fig[6],
  },
];
