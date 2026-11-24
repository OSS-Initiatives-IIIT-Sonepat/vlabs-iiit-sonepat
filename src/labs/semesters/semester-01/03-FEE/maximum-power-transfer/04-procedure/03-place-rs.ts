import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const step: SceneProcedureStep = {
  label: "Place the source resistor.",
  body: "Insert $R_s = 100\\,\\Omega$ in row c from column 6 to column 9, and join column 6 to the red rail. This resistor stands for the internal resistance of the source.",
  show: ["bb", "psu", "rs", "w_v_rs"],
  highlight: "rs",
  readings: { psu: "9.00 V" },
  schematic,
};
