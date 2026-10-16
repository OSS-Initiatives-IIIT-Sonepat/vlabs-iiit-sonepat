import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CONTROLS } from "./parts";

export const step: SceneProcedureStep = {
  label: "Tie the control and data inputs.",
  body: "Connect CLR' (pin 1) and LD' (pin 9) to +5 V so that clear and load are inactive. Connect both count enables, ENP (pin 7) and ENT (pin 10), to +5 V so that the counter counts. Connect the parallel data inputs D0–D3 (pins 3–6) to ground; they are only used when LD' is LOW.",
  show: [...BASE, "w_clr_vcc", "w_ld_vcc", ...CONTROLS],
  highlight: "w_ld_vcc",
  readings: { psu: "5.00 V" },
};
