import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Input HIGH: measure the saturation state.",
  body: "Move the input wire from the ground rail to the +5 V rail: the input is now HIGH. The base-emitter junction conducts with VBE ≈ 0.72 V, so $I_B = \\frac{5 - 0.72}{10\\,\\text{k}\\Omega} \\approx 0.43$ mA. This is about nine times the 45 µA needed for 9.1 mA with hFE ≈ 200, so the transistor saturates: VCE falls to about 0.1 V and the LED is fully on. Record VBE and VCE.",
  show: [
    "bb", "q1", "w_e_gnd", "psu", "rc", "led", "w_vcc_rc", "w_rc_led",
    "rb_10k", "w_vin_high", "vm_ce", "vm_be",
  ],
  highlight: "led",
  readings: { psu: "5.00 V", vm_ce: "0.10 V", vm_be: "0.72 V" },
  ledBrightness: { led: 1 },
};
