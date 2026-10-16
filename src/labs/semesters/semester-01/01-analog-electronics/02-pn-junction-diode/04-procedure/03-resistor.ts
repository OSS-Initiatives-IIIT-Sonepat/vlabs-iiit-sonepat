import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Insert the 1 kΩ series resistor.",
  body:
    "Identify the $1\\,\\text{k}\\Omega$ resistor by its colour bands: **Brown – Black – Red – Gold**.\n" +
    "Insert it bridging **col 5** (left lead, $p_1$) to **col 8** (right lead, $p_2$) in row c.\n" +
    "This limits current to protect the diode: $I_D = (V_s - V_D) / R$. At $V_s = 2\\,\\text{V}$ and $V_D = 0.7\\,\\text{V}$, $I_D \\approx 1.3\\,\\text{mA}$.",
  show: ["bb", "psu", "am1", "r1"],
  highlight: "r1",
  schematic,
};
