import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Disable preset and clear",
  body: "Connect the active-LOW clear (pin 1) and preset (pin 4) inputs to the VCC rail with white wires. They are now inactive and cannot override the clock.",
  show: ["bb", "psu", "dff1", "w_clr", "w_pre"],
  highlight: "w_clr",
};
