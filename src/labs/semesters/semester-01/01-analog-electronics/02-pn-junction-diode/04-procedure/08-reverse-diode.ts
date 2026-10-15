import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Reverse the diode for reverse-bias measurement.",
  body:
    "Power off and reduce supply to 0 V. **Remove** the forward-bias wiring.\n" +
    "Reverse the diode: **cathode** (banded end) now faces the supply side, **anode** faces GND.\n" +
    "In reverse bias, the depletion region widens and only a tiny reverse saturation current $I_0$ flows — typically $\\approx 25\\,\\text{nA}$ for the 1N4148.",
  show: ["bb", "psu", "am1", "r1", "d1"],
  highlight: "d1",
};
