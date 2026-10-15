import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/superposition-theorem-schematics";
export const step: SceneProcedureStep = {
  schematic,
  label: "Verify voltage across R3 by superposition.",
  body: "Repeat the entire procedure measuring voltages across $R_3$ ($V_{R3}$) instead of current. Compute $V_{super} = V_{R3,V1} + V_{R3,V2}$ and compare with $V_{R3,total}$. This dual verification strengthens confidence in the theorem.",
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
