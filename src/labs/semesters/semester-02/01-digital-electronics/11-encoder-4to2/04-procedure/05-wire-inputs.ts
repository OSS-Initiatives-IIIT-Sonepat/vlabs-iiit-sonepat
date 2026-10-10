import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the inputs to the OR gates",
  body: "Use jumper wires from the input tie-points: **D1** (red, col 1) to input A of the $Y_0$ gate, **D2** (blue, col 2) to input A of the $Y_1$ gate, and **D3** (orange, col 3) to input B of **both** gates. Each wire ends in **row d** of the pin's column – the IC leg itself already occupies row e, and row d is in the same connected strip. **D0** needs no connection – when all of D1, D2, D3 are 0 the outputs are already $00$, which is the code for $D_0$.",
  show: [
    "bb",
    "psu",
    "or_y1",
    "or_y0",
    "r_y1",
    "led_y1",
    "r_y0",
    "led_y0",
    "w_d1_or0",
    "w_d2_or1",
    "w_d3_or1",
    "w_d3_or0",
  ],
  highlight: "or_y1",
};
