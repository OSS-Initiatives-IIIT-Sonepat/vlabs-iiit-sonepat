import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";
export const step: SceneProcedureStep = {
  schematic,
  label: "Apply superposition and compare.",
  body: "Compute $I_{super} = I_{R3,V1} + I_{R3,V2}$ (with signs). Compare with $I_{total}$ from Step 1. Percentage error should be $< 2\\%$. If larger, verify the short-circuit jumper replacement was performed correctly.",
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
