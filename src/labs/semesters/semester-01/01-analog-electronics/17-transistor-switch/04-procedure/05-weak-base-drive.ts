import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Replace Rb with 1 MΩ: the active region.",
  body: "Switch off the supply, replace the 10 kΩ base resistor with 1 MΩ in the same holes and switch on again with the input HIGH. Now $I_B \\approx \\frac{5 - 0.62}{1\\,\\text{M}\\Omega} \\approx 4.4$ µA and $h_{FE} I_B \\approx 0.9$ mA, which is far less than the 9.1 mA the load could take. The transistor is not saturated: it stays in the active region, the LED is only dim and VCE is about 3 V. Record the readings.",
  show: [
    "bb", "q1", "w_e_gnd", "psu", "rc", "led", "w_vcc_rc", "w_rc_led",
    "rb_1m", "w_vin_high", "vm_ce", "vm_be",
  ],
  highlight: "rb_1m",
  readings: { psu: "5.00 V", vm_ce: "3.02 V", vm_be: "0.62 V" },
  ledBrightness: { led: 0.15 },
};
