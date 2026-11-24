import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the BC547 and ground the base.",
  body: "Hold the BC547 with its flat face towards you: the legs are C, B, E from left to right. Insert them in row e at cols 11 (C), 12 (B) and 13 (E). Run a **black jumper** from the base (col 12) to the GND rail: the base is the terminal common to input and output.",
  show: ["bb", "psu", "psu_ee", "q1", "w_base_gnd"],
  highlight: "q1",
};
