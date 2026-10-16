import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Wire R₁ to diode anode, cathode to GND.",
  body:
    "**Red wire**: R₁ right lead (col 8) → diode anode (col 10).\n" +
    "**Black wire**: diode cathode (col 11) → GND rail.\n" +
    "The forward-bias circuit loop is now complete:\n" +
    "$V_s^+ \\to \\text{ammeter} \\to R \\to D_1 \\to \\text{GND}$\n" +
    "**Double-check polarity** before powering on.",
  show: ["bb", "psu", "am1", "r1", "d1", "w_diode_r", "w_r_gnd"],
  schematic,
};
