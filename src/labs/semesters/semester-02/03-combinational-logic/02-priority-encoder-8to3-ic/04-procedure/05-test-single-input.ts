import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, INPUTS, OUTPUTS, inputs, outputLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Activate a single input: I3 = 0.",
  body: "Pull only I3 LOW. The outputs become A2 A1 A0 = 1 0 0, the complement of 011. The A1 and A0 LEDs light, so the LEDs read 011 = 3. GS' goes LOW (yellow LED on) to show that a valid input is present, and EO' goes HIGH (green LED off). Activate each input on its own in turn and record the outputs.",
  show: [...BASE, "w_ei_gnd", ...INPUTS, ...OUTPUTS],
  highlight: "w_i3_enc",
  activeInputs: inputs([3]),
  ledBrightness: outputLeds([3]),
  readings: { psu: "5.00 V" },
};
