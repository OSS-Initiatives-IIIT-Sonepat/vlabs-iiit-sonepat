import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Insert the 1N4148 diode in forward bias.",
  body:
    "Pick up the 1N4148 silicon diode. The **cathode** is the end with the black band.\n" +
    "Insert with **anode at col 10** and **cathode at col 13**, row c. Polarity is critical.\n" +
    "In forward bias, conventional current flows anode → cathode once $V_D$ exceeds the knee voltage $\\approx 0.7\\,\\text{V}$ for silicon.",
  show: ["bb", "psu", "am1", "r1", "d1"],
  highlight: "d1",
  schematic,
};
