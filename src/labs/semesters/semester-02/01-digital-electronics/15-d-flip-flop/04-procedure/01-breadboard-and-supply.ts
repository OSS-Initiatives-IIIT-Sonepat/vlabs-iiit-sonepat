import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and power supply",
  body: "Place the breadboard and connect the +5 V DC supply: positive terminal to the top VCC rail and negative terminal to the top GND rail. Keep the supply switched off while wiring.",
  show: ["bb", "psu"],
  highlight: "psu",
  supplyVoltage: 5.0,
};
