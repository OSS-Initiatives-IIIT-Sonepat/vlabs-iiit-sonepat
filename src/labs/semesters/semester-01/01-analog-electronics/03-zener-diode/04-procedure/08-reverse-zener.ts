import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

export const step: SceneProcedureStep = {
  label: "Reverse the Zener diode for reverse-bias measurement.",
  body:
    "Power off and reduce supply to 0 V. **Remove** the forward-bias Zener and its wires.\n" +
    "Place the Zener **reversed** at cols 12–15, row c: **anode** (col 12) goes to GND and **cathode** (banded end, col 15) faces the supply side.\n" +
    "Current now enters through the cathode, so the diode is reverse-biased.",
  show: ["bb", "psu", "dmm", "r1", "zener_rev"],
  highlight: "zener_rev",
  schematic,
};
