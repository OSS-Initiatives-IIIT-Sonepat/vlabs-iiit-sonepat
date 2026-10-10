import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the base to the common ground rail.",
  body: "Use a black wire to join the base column (12) to the ground rail. The base is now the terminal common to the input (emitter-base) and output (collector-base) circuits, which is what makes this a common-base configuration.",
  show: ["bb", "q1", "w_base_gnd"],
  highlight: "w_base_gnd",
};
