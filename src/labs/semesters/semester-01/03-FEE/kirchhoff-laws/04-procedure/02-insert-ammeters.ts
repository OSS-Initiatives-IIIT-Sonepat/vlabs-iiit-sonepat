import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/kirchhoff-laws-schematics";

export const step: SceneProcedureStep = {
  label: "Insert ammeters in each branch.",
  body:
    "Break each branch and insert an ammeter in series to measure the branch current. " +
    "Label them $I_1$ (through R1), $I_2$ (through R2), $I_3$ (through R3). " +
    "Set each ammeter to the DC milliamp range. " +
    "Positive current is defined as flowing **into** node A.",
  show: ["bb", "r1", "r2", "r3", "led1", "w_vcc_r1", "w_vcc_r2"],
  schematic,
};
