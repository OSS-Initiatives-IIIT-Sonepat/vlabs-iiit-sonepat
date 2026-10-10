import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the fixed bias base resistor R_B and wire to VCC.",
  body:
    "Mount base resistor $R_B = 470\\text{ k}\\Omega$ at column 3 (row c). " +
    "Connect a red jumper wire (w_vcc_rb) from the top VCC rail at column 3 to input terminal p1 of $R_B$. " +
    "This establishes the base bias current path from $V_{CC}$ to feed the transistor base.",
  show: ["bb", "psu", "r_b", "w_vcc_rb"],
  highlight: "r_b",
};
