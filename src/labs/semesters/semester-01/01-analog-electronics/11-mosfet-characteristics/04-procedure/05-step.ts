import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the drain circuit",
  body: "Run a red jumper from the VDD rail to $R_D$'s free end (col 12) and a black jumper from the Source (col 13) to the GND rail. $R_D$ already sits in the drain column, so it needs no wire.",
  show: ["bb", "psu_vds", "r_d", "q1", "psu_vgs", "w_vdd_rd", "w_source_gnd"],
};
