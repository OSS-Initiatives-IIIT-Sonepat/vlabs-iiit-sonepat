import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/half-wave-rectifier-schematics";

export const step: SceneProcedureStep = {
  label: "Place the load resistor R_L",
  body: "Insert the $1\\,k\\Omega$ load resistor $R_L$ a few columns to the right of D1. The rectified output will be developed across this resistor.",
  show: ["bb", "ac_src", "d1", "w_src_d1", "r1"],
  highlight: "r1",
  schematic,
};
