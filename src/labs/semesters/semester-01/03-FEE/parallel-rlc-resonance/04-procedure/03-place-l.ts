import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/03-FEE/parallel-rlc-resonance";

export const step: SceneProcedureStep = {
  label: "Place the inductor in parallel.",
  body: "Insert the $10\\,\\mathrm{mH}$ inductor in row a on the same columns, 10 to 13, and return column 13 to the ground rail. R and L now share both ends.",
  show: ["bb", "r1", "l1", "w_tank_gnd"],
  highlight: "l1",
  schematic,
};
