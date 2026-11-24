import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Ground the emitter.",
  body: "Join the emitter, column 15, to the ground rail. The emitter is the common terminal of this configuration.",
  show: ["bb", "q1", "w_e_gnd"],
  highlight: "w_e_gnd",
  schematic,
};
