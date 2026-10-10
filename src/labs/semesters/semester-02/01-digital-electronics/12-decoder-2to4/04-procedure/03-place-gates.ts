import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the five gate ICs",
  body: "Insert the gate ICs straddling the centre gap, left to right: a NOR gate (**nor_y0**), an XOR gate (**xor_x**), and three AND gates (**and_y1**, **and_y2**, **and_y3**). Keep at least two free columns between neighbouring ICs.",
  show: ["bb", "psu", "nor_y0", "xor_x", "and_y1", "and_y2", "and_y3"],
  highlight: "xor_x",
};
