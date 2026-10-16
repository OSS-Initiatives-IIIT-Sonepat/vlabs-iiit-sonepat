import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, ENABLES } from "./parts";

export const step: SceneProcedureStep = {
  label: "Tie the three enable inputs.",
  body: "The 74HC138 has three enable inputs, and all three must be active for any output to go LOW. Connect E1 (pin 6, active HIGH) to the +5 V rail. Connect E2' (pin 4) and E3' (pin 5), which are active LOW, to the ground rail. Unused CMOS inputs must never be left floating.",
  show: [...BASE, "w_en1_vcc", ...ENABLES],
  highlight: "w_en1_vcc",
  readings: { psu: "5.00 V" },
};
