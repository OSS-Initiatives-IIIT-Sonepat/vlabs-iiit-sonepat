import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the 74HC74 D flip-flop IC.",
  body: "Insert 74HC74 DIP-14 straddling the centre gap. Pin 1 ($\\overline{CLR}_1$) at top-left. Seat all 14 pins and power the IC: pin 14 to +5 V, pin 7 to GND. Flip-flop 1 uses pins 1–6: $\\overline{CLR}$, D, CLK, $\\overline{PRE}$, Q, $\\overline{Q}$.",
  show: ["bb", "psu", "w_rail_link", "dff1", "w_vcc_dff1", "w_gnd_dff1"],
  highlight: "psu",
};
