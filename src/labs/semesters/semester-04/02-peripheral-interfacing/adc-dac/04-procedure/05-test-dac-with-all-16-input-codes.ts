import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Drive the ladder and light the output",
  body: "Connect the four bit wires, the two ground returns, and the lead from the ladder into the LED and on to ground. The lamp now glows from the ladder. A full test of all sixteen codes is the table in Observations: Vout = 5 × code / 16. The ADC0804 beside it in the figure is the other direction, voltage in and a byte out.",
  show: [
    "bb",
    "r1",
    "r2",
    "r3",
    "r4",
    "led_out",
    "w_bit0_r1",
    "w_r1_junc1",
    "w_junc1_r2",
    "w_bit1_junc2",
    "w_r2_junc2",
    "w_junc2_r3",
    "w_bit2_junc3",
    "w_r3_junc3",
    "w_junc3_r4",
    "w_bit3_junc4",
    "w_r4_out",
    "w_out_led",
    "w_led_gnd",
    "w_r1_gnd",
    "w_r3_gnd",
  ],
};
