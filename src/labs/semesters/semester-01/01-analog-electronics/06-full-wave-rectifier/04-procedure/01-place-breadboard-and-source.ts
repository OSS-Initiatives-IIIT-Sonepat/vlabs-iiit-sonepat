import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/full-wave-rectifier-schematics";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and connect the AC source",
  body: "Place the 830-point breadboard. The AC source is rendered as a generic supply stand-in in this scene — connect its two terminals to tie points a1 and a2, which feed the diode bridge.",
  show: ["bb", "ac_src"],
  supplyVoltage: 12,
  schematic,
};
