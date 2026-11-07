import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place a resistor on every segment",
  body: "Place a 330 Ω resistor in front of every segment. Each one limits that segment to about (5 − 2) / 330 ≈ 9 mA. The 74HC4511 in the figure drives these resistors. For normal use its lamp-test and blanking pins (both active low) are held high, and its latch-enable pin is held low so the outputs follow the BCD inputs.",
  show: [
    "bb",
    "led_a",
    "led_b",
    "led_c",
    "led_d",
    "led_e",
    "led_f",
    "led_g",
    "r_a",
    "r_b",
    "r_c",
    "r_d",
    "r_e",
    "r_f",
    "r_g",
  ],
  highlight: "r_a",
};
