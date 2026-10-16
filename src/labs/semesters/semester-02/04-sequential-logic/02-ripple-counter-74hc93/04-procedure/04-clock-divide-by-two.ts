import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, OUTPUTS, RESETS_GND, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Clock CKA and observe the divide-by-2 stage.",
  body: "Set the function generator to a 0–5 V square wave at 1 Hz and connect it to CKA (pin 14), with its ground on the ground rail. Flip-flop A toggles on every falling edge (HIGH to LOW) of the clock, so QA blinks at 0.5 Hz: it divides the clock frequency by 2. QB, QC and QD stay at 0, because the internal 3-bit section (CKB) is not yet clocked.",
  show: [...BASE, ...RESETS_GND, ...OUTPUTS, "fg"],
  highlight: "fg",
  ledBrightness: countLeds(1),
  readings: CLOCK_READING,
};
