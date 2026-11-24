import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/transformer-oc-sc";

export const step: SceneProcedureStep = {
  label: "Bring in the transformer.",
  body: "Stand the transformer beside the board. Do not plug its pins into one breadboard strip: pins in the same strip would short the winding. Each lead will land in its own column.",
  show: ["bb", "t1"],
  highlight: "t1",
  schematic,
};
