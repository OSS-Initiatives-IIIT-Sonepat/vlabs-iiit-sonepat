import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, LINK, OUTPUTS, RESETS_GND, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Connect QA to CKB to make a MOD-16 counter.",
  body: "Connect QA (pin 12) to CKB (pin 1). Each flip-flop is now clocked by the output of the previous one: QB toggles when QA falls, QC when QB falls and QD when QC falls. The clock change ripples through the stages, hence the name ripple counter. Clear the counter and apply six clock pulses: the LEDs show QD QC QB QA = 0110 = 6.",
  show: [...BASE, ...RESETS_GND, ...OUTPUTS, "fg", ...LINK],
  highlight: "w_qa_clkb",
  ledBrightness: countLeds(6),
  readings: CLOCK_READING,
};
