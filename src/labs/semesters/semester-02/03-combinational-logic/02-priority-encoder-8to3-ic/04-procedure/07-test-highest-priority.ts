import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, INPUTS, OUTPUTS, inputs, outputLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "I7 overrides every other input.",
  body: "Pull I0 and I7 LOW as well, so that I0, I3, I5 and I7 are all active. I7 has the highest priority, so all three code LEDs light (111 = 7). While I7 is LOW, the state of the other inputs makes no difference. This is how a priority encoder chooses which of several simultaneous interrupt requests to serve first.",
  show: [...BASE, "w_ei_gnd", ...INPUTS, ...OUTPUTS],
  highlight: "w_i7_enc",
  activeInputs: inputs([0, 3, 5, 7]),
  ledBrightness: outputLeds([0, 3, 5, 7]),
  readings: { psu: "5.00 V" },
};
