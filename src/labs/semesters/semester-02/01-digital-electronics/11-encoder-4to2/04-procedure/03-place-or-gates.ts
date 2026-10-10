import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the two OR gates",
  body: "Insert two OR-gate ICs (74HC32) straddling the centre gap. The first gate (**or_y1**) produces $Y_1 = D_2 + D_3$ and the second (**or_y0**) produces $Y_0 = D_1 + D_3$. Leave at least two free columns between the ICs.",
  show: ["bb", "psu", "or_y1", "or_y0"],
  highlight: "or_y1",
};
