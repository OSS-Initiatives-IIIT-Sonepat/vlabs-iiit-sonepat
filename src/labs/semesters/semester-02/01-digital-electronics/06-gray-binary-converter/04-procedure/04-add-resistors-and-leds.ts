import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount 330 Ω current-limiting resistors and output LEDs on row h.",
  body:
    "Mount four 330 Ω resistors and color-coded LEDs on row h below the ICs: " +
    "r_g3 and led_g3 (Red, G₃ output / MSB) at cols 12/16; " +
    "r_g2 and led_g2 (Yellow, G₂ output) at cols 24/28; " +
    "r_g1 and led_g1 (Green, G₁ output) at cols 38/42; and " +
    "r_g0 and led_g0 (Blue, G₀ output / LSB) at cols 50/54.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor1",
    "xor2",
    "xor3",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_xor2",
    "w_gnd_xor2",
    "w_vcc_xor3",
    "w_gnd_xor3",
    "w_b3_xor1",
    "w_b3_g3",
    "w_b3_to_r",
    "w_b2_xor1",
    "w_b2_xor2",
    "w_b1_xor2",
    "w_b1_xor3",
    "w_b0_xor3",
    "r_g3",
    "led_g3",
    "r_g2",
    "led_g2",
    "r_g1",
    "led_g1",
    "r_g0",
    "led_g0",
  ],
  highlight: "led_g3",
  activeInputs: {
    B3: 0,
    B2: 0,
    B1: 0,
    B0: 0,
  },
};
