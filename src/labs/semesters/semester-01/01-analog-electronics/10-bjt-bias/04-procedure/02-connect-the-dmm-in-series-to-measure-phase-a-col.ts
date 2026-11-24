import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the DMM in series for the Phase A collector current.",
  body: "Set a DMM to **DC mA**. Connect its (+) lead to the VCC rail and its (−) lead to col 3, where R_C1 will start. Every milliamp that reaches the Phase A collector now passes through the meter.",
  show: ["bb", "psu", "dmm"],
};
