import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the long breadboard.",
  body: "Place the 100-column breadboard on the workbench. A 4-bit adder needs nine input points, five logic ICs and five LED indicators, each in its own columns, so even the 60-column board is too small.",
  show: ["bb"],
  highlight: "bb",
};
