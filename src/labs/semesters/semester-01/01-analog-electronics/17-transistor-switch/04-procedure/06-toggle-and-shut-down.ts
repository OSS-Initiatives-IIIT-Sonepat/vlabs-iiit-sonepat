import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Restore Rb = 10 kΩ, toggle the input and switch off.",
  body: "Put the 10 kΩ resistor back and move the input wire between ground and +5 V a few times. The LED switches cleanly between fully off (VCE ≈ 5 V) and fully on (VCE ≈ 0.1 V). Calculate the power in the transistor in each state, $P = V_{CE} \\times I_C$: zero in cut-off and about 0.9 mW in saturation, compared with about 2.6 mW in the active region. Switch off the supply.",
  show: [
    "bb", "q1", "w_e_gnd", "psu", "rc", "led", "w_vcc_rc", "w_rc_led",
    "rb_10k", "w_vin_high", "vm_ce", "vm_be",
  ],
  highlight: "q1",
  readings: { psu: "5.00 V", vm_ce: "0.10 V", vm_be: "0.72 V" },
  ledBrightness: { led: 1 },
};
