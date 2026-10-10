import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Set up the regulated power supply.",
  body: "Keep the supply OFF. Set the output to 5 V using the voltage knob and the current limit to about 50 mA. Connect the red (+) terminal to the VCC rail and the black (-) terminal to the GND rail of the bread board.",
  show: ["bb", "psu"],
  highlight: "psu",
  supplyVoltage: 5.0,
};
