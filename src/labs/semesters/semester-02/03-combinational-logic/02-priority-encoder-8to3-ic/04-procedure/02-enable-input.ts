import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE } from "./parts";

export const step: SceneProcedureStep = {
  label: "Enable the encoder: EI' to ground.",
  body: "Connect the enable input EI' (pin 5) to the ground rail. EI' is active LOW, so a 0 here enables the encoder. If EI' were HIGH, every output would be forced HIGH regardless of the data inputs.",
  show: [...BASE, "w_ei_gnd"],
  highlight: "w_ei_gnd",
  readings: { psu: "5.00 V" },
};
