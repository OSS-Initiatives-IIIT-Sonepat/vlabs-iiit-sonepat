import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the resistors and LEDs",
  body: "Place four 330 Ω resistors and four green LEDs, one pair for each output Y0 to Y3. Each resistor limits the current of its LED.",
  show: [
    "bb",
    "psu",
    "dmx1",
    "w_s0",
    "w_s1",
    "w_d",
    "r_y0",
    "led_y0",
    "r_y1",
    "led_y1",
    "r_y2",
    "led_y2",
    "r_y3",
    "led_y3",
  ],
  highlight: "led_y0",
};
