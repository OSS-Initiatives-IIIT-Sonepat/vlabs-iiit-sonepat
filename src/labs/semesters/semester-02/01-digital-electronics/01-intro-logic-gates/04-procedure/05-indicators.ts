import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB, allIcIds, indicatorIds, inputWireIds } from "../gates";

export const step: SceneProcedureStep = {
  label: "Fit the output indicators.",
  body: "To the right of each IC, fit a **330 Ω** series resistor and an **LED** whose anode goes in the same column as the resistor's right lead (so no jumper is needed between them). Never place the LED in a column used by an IC pin. The resistor limits the LED current to roughly $I = (5 - 2)/330 \\approx 9\\,\\text{mA}$. An LED that is **ON** shows logic 1 at the gate output; **OFF** shows logic 0.",
  show: [BB, ...allIcIds, ...inputWireIds, ...indicatorIds],
  highlight: "r_and",
  activeInputs: { A: 0, B: 0 },
};
