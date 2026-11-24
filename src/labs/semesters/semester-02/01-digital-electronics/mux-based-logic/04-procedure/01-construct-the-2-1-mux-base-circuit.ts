import { type SceneProcedureStep } from "@/labs/experiments/types";

import { SHOW } from "../components";

export const step: SceneProcedureStep = {
  label: "Construct the 2:1 MUX base circuit",
  body: "Build the standard 2:1 MUX gate circuit from the previous experiment: NOT gate (74HC04) for S', AND gate 1 computing D0·S', AND gate 2 computing D1·S, OR gate for the final output Y. Use A as the select line S. Leave the D0 and D1 inputs accessible at the breadboard — these will be changed for each function being implemented.",
  show: SHOW.mux,
};
