import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB } from "../gates";

export const step: SceneProcedureStep = {
  label: "Place the long breadboard.",
  body: "Place the 60-column breadboard on the bench. Seven ICs and seven LED indicators will be mounted on it, so the long board is used. Keep the top rail pair free: the **top blue rail** is GND and the **top red rail** is +5 V.",
  show: [BB],
  highlight: BB,
};
