import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/half-wave-rectifier-schematics";

export const step: SceneProcedureStep = {
  label: "Wire the source to the diode anode",
  body: "Run a red wire from the VCC rail (AC source) to the anode of D1. During the positive half-cycle this forward-biases the diode.",
  show: ["bb", "ac_src", "d1", "w_src_d1"],
  highlight: "w_src_d1",
  schematic,
};
