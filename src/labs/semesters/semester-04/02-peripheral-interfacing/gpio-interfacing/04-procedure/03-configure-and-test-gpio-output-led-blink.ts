import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the three LEDs",
  body: "Place the green, yellow, and red LEDs. The anode, the end the resistor feeds, faces the resistor. The cathode goes to ground on the last step. A GPIO output does this same job: high turns the lamp on, low turns it off.",
  show: ["bb", "r1", "r2", "r3", "led1", "led2", "led3"],
  highlight: "led1",
};
