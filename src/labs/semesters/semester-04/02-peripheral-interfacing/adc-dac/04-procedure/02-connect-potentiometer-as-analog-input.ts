import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the ladder resistors",
  body: "Place the ladder resistors. The 2 kΩ parts are 2R and the 1 kΩ parts are R. An R-2R ladder needs only those two values. For a 4-bit code and a 5 V reference, each step of the code changes the output by 5 / 16 = 0.3125 V. Code 0 is 0 V. Code 15 is 4.6875 V.",
  show: ["bb", "r1", "r2", "r3", "r4"],
  highlight: "r1",
};
