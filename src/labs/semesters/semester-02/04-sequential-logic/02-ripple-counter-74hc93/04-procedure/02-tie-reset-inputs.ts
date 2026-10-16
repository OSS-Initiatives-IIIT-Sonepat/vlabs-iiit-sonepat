import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, RESETS_GND } from "./parts";

export const step: SceneProcedureStep = {
  label: "Tie the reset inputs R0(1) and R0(2) to ground.",
  body: "The counter is cleared to 0000 whenever both reset inputs R0(1) (pin 2) and R0(2) (pin 3) are HIGH; they feed an internal 2-input NAND gate. Connect both to ground so the counter is free to count. Never leave them open: a floating CMOS input can read as HIGH and hold the counter in reset.",
  show: [...BASE, ...RESETS_GND],
  highlight: "w_r01_gnd",
  readings: { psu: "5.00 V" },
};
