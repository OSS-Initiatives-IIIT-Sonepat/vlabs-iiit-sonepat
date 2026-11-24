import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the two DC supplies.",
  body: "**V_CC** (collector supply): (+) to the red rail, (−) to the blue GND rail. **V_EE** (emitter supply): (+) to the GND rail and (−) to col 19, row a. With the base grounded, this negative V_EE forward-biases the emitter-base junction. Keep both supplies at 0 V for now.",
  show: ["bb", "psu", "psu_ee"],
};
