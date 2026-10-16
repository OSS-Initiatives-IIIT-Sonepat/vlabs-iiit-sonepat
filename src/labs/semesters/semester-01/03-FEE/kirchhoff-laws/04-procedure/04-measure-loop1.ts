import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Measure voltages around Loop 1 (KVL check).",
  body:
    "Loop 1: $V_1 \\to R_1 \\to \\text{Node A} \\to R_3 \\to \\text{GND} \\to V_1$. " +
    "Measure $V_{R1}$ (across R1) and $V_{R3}$ (across R3) with the voltmeter. " +
    "Apply KVL: $V_1 - V_{R1} - V_{R3} = 0$. " +
    "The result should be within $\\pm 0.1\\,\\text{V}$ of zero.",
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
    "w_vm_r1_pos",
    "w_vm_r1_neg",
  ],
  schematic,
};
