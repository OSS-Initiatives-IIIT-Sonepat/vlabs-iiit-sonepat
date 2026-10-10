import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Place the center-tapped transformer on the bench and connect the center tap.",
  body:
    "Place the step-down center-tapped transformer (transformer) separately on the work bench beside the breadboard. " +
    "Its secondary terminals face the breadboard: terminal S1 (AC1), center tap (CT), and terminal S2 (AC2). " +
    "Connect a black wire (w_ct_gnd) from the center tap terminal (CT) directly to the breadboard top ground rail (gnd_top). " +
    "The grounded center tap establishes our common 0 V reference node for symmetric bi-phase rectification.",
  show: ["bb", "transformer", "w_ct_gnd"],
  highlight: "transformer",
  supplyVoltage: 12.0,
};
