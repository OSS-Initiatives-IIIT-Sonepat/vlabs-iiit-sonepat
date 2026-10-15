import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/zener-diode-schematics";

export const step: SceneProcedureStep = {
  label: "Reverse the Zener diode for reverse-bias measurement.",
  body:
    "Power off and reduce supply to 0 V. **Remove** the forward-bias Zener and its wires.\n" +
    "Place the Zener **reversed** at cols 15–16, row c: **cathode** (banded end, col 16) now faces the supply side, **anode** (col 15) faces GND.\n" +
    "The red LED on the breadboard marks this reversed orientation — current will enter through the cathode.",
  show: ["bb", "psu", "dmm", "w_amm_in", "w_amm_out", "r1", "zener_rev"],
  highlight: "zener_rev",
  schematic,
};
