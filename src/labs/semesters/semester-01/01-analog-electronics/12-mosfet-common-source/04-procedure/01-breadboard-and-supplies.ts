import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and the two DC supplies.",
  body: "Place the breadboard on the bench. Keep both DC power supplies **switched off**. The first supply will provide the drain supply $V_{DD}$ on the top rails and the second will provide the gate bias $V_{GG}$ on the bottom rails.",
  show: ["bb", "psu", "vgg"],
  highlight: "bb",
};
