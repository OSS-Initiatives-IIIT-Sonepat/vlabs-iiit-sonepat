import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Place the step-down transformer on the bench and connect the ground lead.",
  body:
    "Place the step-down transformer (transformer) separately on the work bench beside the breadboard. " +
    "Connect its secondary return lead (CT) directly to the breadboard top ground rail (gnd_top) with a black jumper wire (w_ac_gnd). " +
    "This establishes our 0 V common ground reference.",
  show: ["bb", "transformer", "w_ac_gnd"],
  highlight: "transformer",
  supplyVoltage: 12.0,
};
