import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, CONTROLS, OUTPUTS, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Apply a 1 Hz clock and watch the count.",
  body: "Set the function generator to a 0–5 V square wave at 1 Hz and connect it to CLK (pin 2), with its ground on the ground rail. The counter advances by one on every rising edge of the clock. After five clock pulses the LEDs show Q3 Q2 Q1 Q0 = 0101 = 5. Because all flip-flops change on the same edge, the outputs change together, with no ripple between bits.",
  show: [...BASE, "w_clr_vcc", "w_ld_vcc", ...CONTROLS, ...OUTPUTS, "fg"],
  highlight: "fg",
  ledBrightness: countLeds(5),
  readings: CLOCK_READING,
};
