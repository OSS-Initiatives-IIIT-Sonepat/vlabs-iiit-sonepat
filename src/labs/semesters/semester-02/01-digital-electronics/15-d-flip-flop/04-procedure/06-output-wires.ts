import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the outputs",
  body: "Connect output Q (pin 5) and output Q̄ (pin 6) to their resistors, each resistor to its LED anode and each LED cathode to the GND rail. Switch on the supply. The flip-flop starts with Q = 0.",
  show: [
    "bb",
    "psu",
    "dff1",
    "w_clr",
    "w_pre",
    "w_d",
    "w_clk",
    "r_q",
    "led_q",
    "r_qn",
    "led_qn",
    "w_q_r",
    "w_r_led_q",
    "w_qn_r",
    "w_r_led_qn",
    "w_gnd_q",
    "w_gnd_qn",
  ],
  highlight: "led_q",
  activeInputs: { D: 0, CLK: 0 },
  supplyVoltage: 5.0,
  ledBrightness: { led_q: 0, led_qn: 1 },
};
