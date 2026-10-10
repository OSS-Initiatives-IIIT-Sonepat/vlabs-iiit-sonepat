import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the 5 V supply",
  body: "Connect the +5 V terminal of the DC supply to the top red (VCC) rail and the 0 V terminal to the top blue (GND) rail. Keep the supply switched OFF until the circuit is complete.",
  show: ["bb", "psu"],
  highlight: "psu",
  supplyVoltage: 5.0,
};
