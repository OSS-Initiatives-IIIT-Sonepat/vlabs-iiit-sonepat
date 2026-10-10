import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Build the output indicator",
  body: "Place the 330 Ω resistor and the green LED. Connect output 1Y to the resistor, the resistor to the LED anode, and the LED cathode to GND. The resistor limits the LED current.",
  show: [
    "bb",
    "psu",
    "mux1",
    "w_vcc",
    "w_gnd",
    "w_en",
    "w_i0",
    "w_i1",
    "w_i2",
    "w_i3",
    "w_s0",
    "w_s1",
    "r_y",
    "led_y",
    "w_y_r",
    "w_r_led",
    "w_gnd_led",
  ],
  highlight: "led_y",
  activeInputs: { S1: 0, S0: 0 },
  supplyVoltage: 5.0,
  ledBrightness: { led_y: 0 },
};
