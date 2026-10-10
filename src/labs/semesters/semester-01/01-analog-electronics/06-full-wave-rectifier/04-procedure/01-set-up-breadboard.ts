import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label:
    "Set up the solderless breadboard and establish the common ground rail.",
  body:
    "Place the 830-point solderless breadboard on the workbench. " +
    "Identify the upper and lower horizontal power distribution buses, " +
    "and designate the top blue ground rail (gnd_top) as the circuit common ground reference (0 V).",
  show: ["bb"],
};
