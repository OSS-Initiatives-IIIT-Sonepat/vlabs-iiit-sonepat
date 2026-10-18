import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

import { DOWN, M } from "../constants";

export const step: SceneProcedureStep = {
  label: "Insert the 1N4733A Zener diode (forward bias) at cols 10–13.",
  body:
    "Pick up the 1N4733A. The **cathode** is the end with the black band.\n" +
    "Insert with **anode at col 10** and **cathode at col 13**, row c. Polarity is critical.\n" +
    "In forward bias, current flows anode → cathode above $V_f \\approx 0.65\\,\\text{V}$.",
  show: ["bb", "psu", "dmm", "w_amm_in", "w_amm_out", "r1", "zener_fwd"],
  highlight: "zener_fwd",
  markers: [
    { pos: M.zd_anode, dir: DOWN, label: "Anode (A)" },
    { pos: M.zd_cathode, dir: DOWN, label: "Cathode (K)" },
  ],
  schematic,
};
