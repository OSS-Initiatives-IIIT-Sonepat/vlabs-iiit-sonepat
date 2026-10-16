import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

import { DOWN, M } from "../constants";

export const step: SceneProcedureStep = {
  label: "Wire R₁ to Zener anode, Zener cathode to GND.",
  body:
    "**Green wire**: R₁ right lead (col 8) → Zener anode (col 10).\n" +
    "**Black wire**: Zener cathode (col 11) → GND rail.\n" +
    "The forward-bias circuit loop is now complete:\n" +
    "$V_s^+ \\to \\text{ammeter} \\to R_S \\to D_Z \\to \\text{GND}$\n" +
    "**Double-check polarity** before powering on.",
  show: [
    "bb",
    "psu",
    "dmm",
    "w_amm_in",
    "w_amm_out",
    "r1",
    "zener_fwd",
    "w_r1_zfwd",
    "w_zfwd_gnd",
  ],
  markers: [
    { pos: M.r1_p2, dir: DOWN, label: "R₁ p2 → green wire" },
    { pos: M.zd_cathode, dir: DOWN, label: "Cathode → GND" },
  ],
  schematic,
};
