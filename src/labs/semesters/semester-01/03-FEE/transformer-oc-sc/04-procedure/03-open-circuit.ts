import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/03-FEE/transformer-oc-sc";

export const step: SceneProcedureStep = {
  label: "Wire the open-circuit test.",
  body: "Leave P1 and P2 open. Feed the $115\\,\\mathrm{V}$ winding: the supply output is on column 4, the ammeter runs from column 4 to S1, and S2 returns to the ground rail. The voltmeter reads across S1 and S2.",
  show: ["bb", "t1", "fg", "am_oc", "w_s2_gnd", "vm_oc"],
  highlight: "am_oc",
  readings: { fg: "0 V", am_oc: "0.00 A", vm_oc: "0 V" },
  schematic,
};
