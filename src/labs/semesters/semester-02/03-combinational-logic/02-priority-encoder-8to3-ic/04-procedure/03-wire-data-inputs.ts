import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, INPUTS, inputs } from "./parts";

export const step: SceneProcedureStep = {
  label: "Wire the eight data inputs I0–I7.",
  body: "Connect eight switches to the data inputs I0–I7, each with a 10 kΩ pull-up to +5 V, so that an input is HIGH (idle) unless its switch pulls it to ground. Because the inputs are active LOW, a switch closed to ground makes that input active. Start with all eight inputs HIGH.",
  show: [...BASE, "w_ei_gnd", ...INPUTS],
  highlight: "w_i7_enc",
  activeInputs: inputs([]),
  readings: { psu: "5.00 V" },
};
