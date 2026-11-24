import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the 5 V supply.",
  body: "Connect the $+5\\\\,V$ (red) terminal of the DC supply to the top VCC rail and the $0\\\\,V$ (black) terminal to the top GND rail. Keep the supply switched OFF until all wiring is complete.",
  show: ["bb", "psu", "w_rail_link"],
  highlight: "psu",
  supplyVoltage: 5.0,
};
