import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the LED circuit.",
  body: "Connect VCC to R1, R1 to the LED anode, and the LED cathode to GND. Switch ON the supply. The LED glows because it is forward biased; R1 limits the current to a safe value.",
  show: [
    "bb",
    "psu",
    "r1",
    "r2",
    "c1",
    "led1",
    "d1",
    "q1",
    "w_vcc",
    "w_r_led",
    "w_gnd1",
  ],
  highlight: "led1",
  supplyVoltage: 5.0,
  ledBrightness: { led1: 0.6 },
};
