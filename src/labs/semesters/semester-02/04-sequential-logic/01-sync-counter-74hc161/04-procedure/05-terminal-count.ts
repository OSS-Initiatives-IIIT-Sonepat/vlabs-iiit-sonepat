import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, CONTROLS, OUTPUTS, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Observe the terminal count and RCO.",
  body: "Let the counter run. At 1111 = 15 all four LEDs are on and RCO goes HIGH (yellow LED on), because $RCO = ENT \\cdot Q_3 Q_2 Q_1 Q_0$. On the next rising edge the counter rolls over to 0000 and RCO goes LOW. The full sequence has 16 states, so this is a MOD-16 counter. Record each state in the observation table.",
  show: [...BASE, "w_clr_vcc", "w_ld_vcc", ...CONTROLS, ...OUTPUTS, "fg"],
  highlight: "led_rco",
  ledBrightness: countLeds(15),
  readings: CLOCK_READING,
};
