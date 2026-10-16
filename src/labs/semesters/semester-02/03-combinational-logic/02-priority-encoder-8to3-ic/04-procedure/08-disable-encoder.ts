import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, INPUTS, OUTPUTS, inputs, outputLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Disable the encoder: EI' HIGH.",
  body: "Move the EI' wire from ground to +5 V. The encoder is disabled: A2, A1, A0, GS' and EO' are all HIGH and every LED is off, even though four inputs are still active. In a cascade of two 74HC148s, EO' of the higher-priority chip drives EI' of the lower one, so the lower chip is enabled only when the higher chip has no active input. Switch off the supply.",
  show: [...BASE, "w_ei_vcc", ...INPUTS, ...OUTPUTS],
  highlight: "w_ei_vcc",
  activeInputs: inputs([0, 3, 5, 7]),
  ledBrightness: outputLeds([0, 3, 5, 7], true),
  readings: { psu: "5.00 V" },
};
