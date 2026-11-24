import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/maximum-power-transfer";

export const step: SceneProcedureStep = {
  label: "Connect the 9 V supply.",
  body: "Connect the DC supply across the top rails. Set it to 9.00 V. The red rail is $V_s$ and the blue rail is the return.",
  show: ["bb", "psu"],
  highlight: "psu",
  readings: { psu: "9.00 V" },
  schematic,
};
