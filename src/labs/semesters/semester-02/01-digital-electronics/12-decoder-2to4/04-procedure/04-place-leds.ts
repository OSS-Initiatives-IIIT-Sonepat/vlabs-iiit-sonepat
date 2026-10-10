import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the output resistors and LEDs",
  body: "Mount four 330 Ω resistors, each followed two columns later by its LED. $Y_0$ (green) and $Y_1$ (yellow) go on the upper half, $Y_2$ (red) and $Y_3$ (blue) on the lower half of the board.",
  show: [
    "bb",
    "psu",
    "nor_y0",
    "xor_x",
    "and_y1",
    "and_y2",
    "and_y3",
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
