import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Reverse the diode for reverse-bias measurement.",
  body:
    "Power off and reduce supply to 0 V. **Remove** the forward-bias wiring.\n" +
    "Re-insert the diode reversed across **cols 15–18**, row c: **anode at col 15** (GND side), **cathode** (banded end) **at col 18** facing the supply side.\n" +
    "In reverse bias, the depletion region widens and only a tiny reverse saturation current $I_0$ flows — typically $\\approx 25\\,\\text{nA}$ for the 1N4148.",
  show: ["bb", "psu", "am1", "r1", "d1_rev"],
  highlight: "d1_rev",
  schematic,
};
