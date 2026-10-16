import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

import { DOWN, M } from "../constants";

export const step: SceneProcedureStep = {
  label: "Insert the 470 Ω series resistor at cols 5–8, row c.",
  body:
    "Identify the $470\\,\\Omega$ resistor by its colour bands: **Yellow – Violet – Brown – Gold**.\n" +
    "Insert it bridging **col 5** (left lead, $p_1$) to **col 8** (right lead, $p_2$) in row c.\n" +
    "This limits current: $I_Z = (V_s - V_Z) / R_S$. At $V_s = 9\\,\\text{V}$, $I_Z \\approx 8.3\\,\\text{mA}$ — safely within the 1N4733A's 200 mA rating.",
  show: ["bb", "psu", "dmm", "w_amm_in", "w_amm_out", "r1"],
  highlight: "r1",
  markers: [
    { pos: M.r1_p1, dir: DOWN, label: "R₁ left (p1)" },
    { pos: M.r1_p2, dir: DOWN, label: "R₁ right (p2)" },
  ],
  schematic,
};
