import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Ground the LED cathodes",
  body: "Connect each LED cathode to the ground rail with a black wire. The circuit is now complete – switch ON the 5 V supply.",
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
    "w_gnd1",
    "w_gnd0",
  ],
  highlight: "led_y1",
  supplyVoltage: 5.0,
};
