import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, CONTROLS, OUTPUTS, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Test the asynchronous clear.",
  body: "While the counter is running (say at 1001), move the CLR' wire from +5 V to ground. All outputs go to 0000 immediately, without waiting for a clock edge, and stay there while CLR' is LOW. This is an asynchronous clear. Move CLR' back to +5 V and the counter starts again from 0000 on the next rising edge.",
  show: [...BASE, "w_clr_gnd", "w_ld_vcc", ...CONTROLS, ...OUTPUTS, "fg"],
  highlight: "w_clr_gnd",
  ledBrightness: countLeds(0),
  readings: CLOCK_READING,
};
