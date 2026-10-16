import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";
export const step: SceneProcedureStep = {
  schematic,
  label: "Calculate theoretical values and compare.",
  body: "Calculate theoretical $I_{R3,V1}$ and $I_{R3,V2}$ using series-parallel analysis or voltage divider rule for each single-source sub-circuit. Compare with measured values and record percentage error in the observation table.",
  show: [
    "bb",
    "r1",
    "r2",
    "r_load",
    "led1",
    "w_vcc_r1",
    "w_vcc_r2",
    "w_r1_junc",
    "w_r2_junc",
    "w_junc_link",
    "w_junc_rload",
    "w_rload_led",
    "w_led_gnd",
  ],
};
