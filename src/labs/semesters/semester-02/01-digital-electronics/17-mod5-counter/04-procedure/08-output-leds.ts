import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S8 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Connect the output indicators.",
  body: "Connect $Q_0$, $Q_1$ and $Q_2$ through their series resistors to the LEDs, and join each LED cathode to the GND rail. Check every connection, then switch on the supply.",
  show: S8,
  highlight: "led_q2",
  supplyVoltage: 5.0,
  ledBrightness: { led_q0: 0, led_q1: 0, led_q2: 0 },
};
