import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the outputs",
  body: "Connect each gate output to its resistor, each resistor to its LED anode, and each LED cathode to the GND rail. Switch on the supply. The state at power-up is not defined, so apply a reset first.",
  show: [
    "bb",
    "psu",
    "nor1",
    "nor2",
    "w_fb1",
    "w_fb2",
    "w_s",
    "w_r",
    "r_q",
    "led_q",
    "r_qb",
    "led_qb",
    "w_q_r",
    "w_r_led_q",
    "w_qb_r",
    "w_r_led_qb",
    "w_gnd_q",
    "w_gnd_qb",
  ],
  highlight: "led_q",
  activeInputs: { S: 0, R: 0 },
  supplyVoltage: 5.0,
};
