import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire inputs to the NOR and XOR gates",
  body: "Bring input **A1** (red, col 1) and **A0** (blue, col 2) to the NOR gate and to the XOR gate. The NOR gate gives $Y_0 = \\overline{A_1 + A_0}$; the XOR gate gives the helper signal $X = A_1 \\oplus A_0$, which is high only when exactly one input is high.",
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
    "w_a1_nor",
    "w_a0_nor",
    "w_a1_xor",
    "w_a0_xor",
  ],
  highlight: "nor_y0",
};
