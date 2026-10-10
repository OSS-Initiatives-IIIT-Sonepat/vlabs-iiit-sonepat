import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the output resistors and LEDs",
  body: "Mount a 330 Ω current-limiting resistor and an LED for each output: green LED for $Y_1$ and yellow LED for $Y_0$. Each LED is placed two columns after its resistor.",
  show: ["bb", "psu", "or_y1", "or_y0", "r_y1", "led_y1", "r_y0", "led_y0"],
  highlight: "led_y1",
};
