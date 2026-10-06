import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "UP counter: add the output LEDs.",
  body: "Connect a **330 Ω** resistor in series with an LED from each of $Q_A$, $Q_B$ and $Q_C$ to GND. A lit LED means logic 1. Read the LEDs as $Q_C Q_B Q_A$, with $Q_C$ as the MSB.",
  show: [],
};
