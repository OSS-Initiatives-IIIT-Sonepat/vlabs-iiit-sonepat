import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, LINK, OUTPUTS, RESETS_GND, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Record the full count sequence and roll-over.",
  body: "Let the counter run and record QD QC QB QA after each clock pulse. It counts 0000, 0001, …, 1111 = 15 (all LEDs on), and the 16th pulse returns it to 0000, so it is a MOD-16 counter. QD has a frequency of 1/16 of the clock. At each roll-over the outputs change one after another, not together: for a few nanoseconds the counter passes through false states (1110, 1100, 1000) before reaching 0000.",
  show: [...BASE, ...RESETS_GND, ...OUTPUTS, "fg", ...LINK],
  highlight: "led_qd",
  ledBrightness: countLeds(15),
  readings: CLOCK_READING,
};
