import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Make the common ground connections.",
  body: "Connect the source of the MOSFET to the ground rail with a black wire. Then join the top ground rail to the bottom ground rail so that both supplies share a common ground. The source is now common to both the input and the output, which is the **common source** configuration.",
  show: ["bb", "psu", "vgg", "m1", "w_gnd_link", "w_src_gnd"],
  highlight: "w_src_gnd",
};
