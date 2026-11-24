import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Check the gate circuit",
  body: "The gate supply already connects to the gate (col 14) and to GND. Both supplies share the ground the Source is tied to, so $V_{GS}$ is the supply setting. The gate draws no DC current.",
  show: ["bb", "psu_vds", "r_d", "q1", "psu_vgs", "w_vdd_rd", "w_source_gnd"],
};
