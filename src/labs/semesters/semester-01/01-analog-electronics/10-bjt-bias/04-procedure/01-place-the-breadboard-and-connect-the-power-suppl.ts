import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and connect the power supply.",
  body: "Lay the breadboard flat. Connect the PSU (+12 V) to the top red rail and PSU (−) to the top blue GND rail. Keep the PSU switched off. Phase A (fixed bias) is built on the left (cols 3–8) and Phase B (voltage-divider bias) on the right (cols 16–24).",
  show: ["bb", "psu"],
};
