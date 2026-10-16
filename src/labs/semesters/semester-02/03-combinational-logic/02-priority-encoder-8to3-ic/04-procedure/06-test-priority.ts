import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, INPUTS, OUTPUTS, inputs, outputLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Test priority: I3 and I5 both active.",
  body: "Keep I3 LOW and also pull I5 LOW. An ordinary encoder would give a meaningless code, but the priority encoder outputs the code of the highest-numbered active input. The LEDs now read 101 = 5, and I3 is ignored. GS' stays LOW.",
  show: [...BASE, "w_ei_gnd", ...INPUTS, ...OUTPUTS],
  highlight: "w_i5_enc",
  activeInputs: inputs([3, 5]),
  ledBrightness: outputLeds([3, 5]),
  readings: { psu: "5.00 V" },
};
