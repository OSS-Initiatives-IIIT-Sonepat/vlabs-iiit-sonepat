import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the drain supply (VDD)",
  body: "Place the first variable DC supply. Connect its (+) to the top red rail and its (−) to the top blue GND rail; it feeds the drain circuit. Keep its output at 0 V.",
  show: ["bb", "psu_vds"],
  highlight: "psu_vds",
  supplyVoltage: 0,
};
