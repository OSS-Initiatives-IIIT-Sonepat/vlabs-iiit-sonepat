import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Make the common ground connections.",
  body: "Connect the source of the MOSFET (column 10) to the ground rail with a black wire. Both supplies already return to this rail, so they share a common ground. The source is now common to both the input and the output, which is the **common source** configuration.",
  show: ["bb", "psu", "vgg", "m1", "w_src_gnd"],
  highlight: "w_src_gnd",
};
