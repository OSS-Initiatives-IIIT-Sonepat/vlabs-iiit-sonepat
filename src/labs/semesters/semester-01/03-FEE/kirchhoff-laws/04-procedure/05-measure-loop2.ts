import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Measure voltages around Loop 2 (KVL check).",
  body:
    "Loop 2: $V_2 \\to R_2 \\to \\text{Node A} \\to R_3 \\to \\text{GND} \\to V_2$. " +
    "Measure $V_{R2}$ and $V_{R3}$. Apply KVL: $V_2 - V_{R2} - V_{R3} = 0$. " +
    "Confirm the algebraic sum is zero and compare the nodal voltage at A from both loops.",
  show: [
    "bb",
    "r1",
    "r2",
    "r3",
    "led1",
    "w_vcc_r1",
    "w_vcc_r2",
    "w_r2_nodeA",
    "w_nodeA_link",
    "w_nodeA_r3",
    "w_r3_led",
    "w_led_gnd",
    "w_vm_r2_pos",
    "w_vm_r2_neg",
  ],
  schematic,
};
