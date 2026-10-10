import { type SceneProcedureStep } from "@/labs/experiments/types";

import {
  BB,
  powerIds,
  powerWireIds,
  allIcIds,
  indicatorIds,
  inputWireIds,
} from "../gates";

export const step: SceneProcedureStep = {
  label: "Fit the output indicators.",
  body: "Below each IC, fit a **330 Ω** series resistor and an **LED**. The resistor limits the LED current to roughly $I = (5 - 2)/330 \\approx 9\\,\\text{mA}$. An LED that is **ON** shows logic 1 at the gate output; **OFF** shows logic 0.",
  show: [
    BB,
    ...powerIds,
    ...allIcIds,
    ...inputWireIds,
    ...indicatorIds,
    ...powerWireIds,
  ],
  highlight: "r_and",
  activeInputs: { A: 0, B: 0 },
};
