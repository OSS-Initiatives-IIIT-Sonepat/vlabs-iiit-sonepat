import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the output resistors and LEDs",
  body: "Mount a 330 Ω resistor and an LED for each output, the LED's anode in the column of the resistor's right lead: green LED for Sum (resistor at columns 38–41) and yellow LED for Cout (43–46). Each resistor limits the LED current to a safe value.",
  show: [
    "bb",
    "xor1",
    "and1",
    "or1",
    "r_sum",
    "led_sum",
    "r_cout",
    "led_cout",
    "psu",
    "w_rail_link",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_and1",
    "w_gnd_and1",
    "w_vcc_or1",
    "w_gnd_or1",
  ],
  highlight: "led_cout",
};
