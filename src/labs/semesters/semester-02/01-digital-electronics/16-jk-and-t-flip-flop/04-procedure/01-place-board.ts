import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: 'Place the breadboard and power supply',
  body: 'Place the long breadboard and connect the 5 V DC supply using the built-in PSU terminals.',
  show: ["bb", "psu"],
  highlight: None,
};
