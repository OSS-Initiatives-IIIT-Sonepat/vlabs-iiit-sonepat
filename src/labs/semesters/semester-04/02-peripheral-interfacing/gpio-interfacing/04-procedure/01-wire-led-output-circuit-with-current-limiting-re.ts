import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire LED output circuit with current-limiting resistors",
  body: "The board starts empty. This lab wires three lamp channels. Each one is +5 V, a 330 Ω resistor, an LED, and ground. On a microcontroller those supply wires would be GPIO pins instead. The figure in Theory adds the matching input: a switch to +5 V and a 10 kΩ pull-down, so an open switch reads low.",
  show: ["bb"],
};
