import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, LINK, OUTPUTS, RESETS_DECADE, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Convert to a decade counter: R0(1) = QB, R0(2) = QD.",
  body: "Switch off the supply. Remove the two reset wires to ground and instead connect R0(1) (pin 2) to QB (pin 9) and R0(2) (pin 3) to QD (pin 11). Count 10 = 1010 is the first count with both QB and QD HIGH, so the internal NAND resets the counter as soon as it reaches 10. Switch on, clear the counter and watch it count up to 1001 = 9.",
  show: [...BASE, ...RESETS_DECADE, ...OUTPUTS, "fg", ...LINK],
  highlight: "w_r01_qb",
  ledBrightness: countLeds(9),
  readings: CLOCK_READING,
};
