import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Tie the enable input LOW",
  body: "Connect the active-LOW enable pin 1G (pin 1) to the GND rail with a black wire. The multiplexer output is now enabled permanently.",
  show: ["bb", "psu", "mux1", "w_en"],
  highlight: "w_en",
};
