import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/03-FEE/transformer-oc-sc";

export const step: SceneProcedureStep = {
  label: "Rewire for the short-circuit test.",
  body: "Switch the supply off and clear the open-circuit leads. Short S1 to S2. Feed the $230\\,\\mathrm{V}$ winding instead: the ammeter now runs from column 4 to P1, and P2 returns to ground. The voltmeter reads across P1 and P2.",
  show: ["bb", "t1", "fg", "am_sc", "w_p2_gnd", "w_short", "vm_sc"],
  highlight: "w_short",
  readings: { fg: "0 V", am_sc: "0.00 A", vm_sc: "0 V" },
  schematic,
};
