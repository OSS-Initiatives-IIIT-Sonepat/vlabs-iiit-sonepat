import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/semester-01/03-FEE/superposition-theorem";
export const step: SceneProcedureStep = {
  schematic,
  label: "Kill V1 — measure due to V2 alone.",
  body: "Restore V2, then kill V1 with a short-circuit jumper. Re-energise V2. Measure $I_{R3,V2}$. Carefully note the current direction — it may oppose $I_{R3,V1}$. Assign signs: positive if same direction as $I_{total}$, negative if opposing.",
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
