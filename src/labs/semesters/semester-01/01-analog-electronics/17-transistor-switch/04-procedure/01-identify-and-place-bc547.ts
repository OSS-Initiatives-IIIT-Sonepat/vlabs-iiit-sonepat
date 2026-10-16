import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Identify the BC547 pins and place the transistor.",
  body: "Hold the BC547 with its flat face towards you and the leads pointing down: the pins are collector (C), base (B) and emitter (E) from left to right. Insert it in row c so that the collector is in column 14, the base in column 15 and the emitter in column 16. Connect the emitter column to the ground rail with a black wire.",
  show: ["bb", "q1", "w_e_gnd"],
  highlight: "q1",
};
