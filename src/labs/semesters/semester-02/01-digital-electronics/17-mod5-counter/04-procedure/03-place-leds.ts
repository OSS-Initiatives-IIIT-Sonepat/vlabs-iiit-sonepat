import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S3 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Place the output LEDs with series resistors.",
  body: "Fit three $330\\,\\Omega$ resistors, each followed by an LED: red for $Q_0$, yellow for $Q_1$ and green for $Q_2$. The LEDs show the binary count with $Q_2$ as the MSB.",
  show: S3,
  highlight: "led_q0",
  supplyVoltage: 5.0,
};
