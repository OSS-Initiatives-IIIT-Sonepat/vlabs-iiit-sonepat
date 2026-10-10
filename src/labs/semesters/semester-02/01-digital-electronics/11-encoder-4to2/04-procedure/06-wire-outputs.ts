import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the gate outputs to the LEDs",
  body: "Connect the output Y of each OR gate to its series resistor (plug the wire into row d of the output pin's column, not into the IC leg hole), and the other end of the resistor to the LED anode.",
  show: [
    "bb",
    "psu",
    "or_y1",
    "or_y0",
    "r_y1",
    "led_y1",
    "r_y0",
    "led_y0",
    "w_d1_or0",
    "w_d2_or1",
    "w_d3_or1",
    "w_d3_or0",
    "w_or1_r",
    "w_r_led1",
    "w_or0_r",
    "w_r_led0",
  ],
  highlight: "led_y0",
};
