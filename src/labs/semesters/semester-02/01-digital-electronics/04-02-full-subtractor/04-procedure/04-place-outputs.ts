import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the output resistors and LEDs",
  body: "Mount a 330 Ω resistor and an LED for each output, the LED's anode in the column of the resistor's right lead: green LED for Difference (resistor at columns 28–31) and red LED for Borrow (33–36). Each resistor limits the LED current to a safe value.",
  show: [
    "bb",
    "xor1",
    "and1",
    "r_diff",
    "led_diff",
    "r_bout",
    "led_bout",
    "psu",
    "w_rail_link",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_and1",
    "w_gnd_and1",
  ],
  highlight: "led_bout",
};
