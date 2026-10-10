import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard",
  body: "Place the 30-column breadboard on the workbench. Columns 1–3 will be used as input tie-points, columns 7–22 for the two OR gates, and columns 22–29 for the output LEDs.",
  show: ["bb"],
  highlight: "bb",
};
