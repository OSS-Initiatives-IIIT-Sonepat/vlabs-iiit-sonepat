import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the long breadboard",
  body: "Place the 60-column breadboard on the workbench. The decoder needs five gate ICs and four LED indicators, so the longer board is used. Columns 1–2 are the input tie-points.",
  show: ["bb"],
  highlight: "bb",
};
