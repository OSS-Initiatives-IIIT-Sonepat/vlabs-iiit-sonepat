import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the 5 V supply",
  body: "Connect the +5 V terminal of the DC supply to the top VCC rail and the 0 V terminal to the top GND rail. Keep the supply OFF until wiring is complete.",
  show: ["bb", "psu"],
  highlight: "psu",
  supplyVoltage: 5.0,
};
