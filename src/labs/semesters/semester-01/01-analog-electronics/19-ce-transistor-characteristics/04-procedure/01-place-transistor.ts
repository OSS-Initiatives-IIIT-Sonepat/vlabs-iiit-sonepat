import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Insert the transistor.",
  body: "Place the breadboard and insert the BC547 at column 14. The base is the middle lead in column 14, the collector is in column 13 and the emitter is in column 15.",
  show: ["bb", "q1"],
  highlight: "q1",
  schematic,
};
