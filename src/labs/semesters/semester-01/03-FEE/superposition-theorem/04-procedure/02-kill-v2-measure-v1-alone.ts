import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";
export const step: SceneProcedureStep = {
  schematic,
  label: "Kill V2 — measure due to V1 alone.",
  body: "Switch off V2. Replace V2 with a short-circuit jumper (positive terminal to GND). Re-energise V1. Measure $I_{R3,V1}$ through $R_3$. Record the reading including direction.",
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
