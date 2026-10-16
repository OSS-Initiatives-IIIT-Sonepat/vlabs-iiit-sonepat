import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Input LOW: measure the cut-off state.",
  body: "Insert the 10 kΩ base resistor Rb in row a from column 12 to column 15, so that its right lead is on the base. Connect column 12 to the ground rail: the input is LOW (0 V). Connect one multimeter between the collector and ground (VCE) and another between the base and ground (VBE). No base current flows, so the transistor is in cut-off: VBE ≈ 0 V, VCE ≈ 5 V and the LED is off.",
  show: [
    "bb", "q1", "w_e_gnd", "psu", "rc", "led", "w_vcc_rc", "w_rc_led",
    "rb_10k", "w_vin_low", "vm_ce", "vm_be",
  ],
  highlight: "vm_ce",
  readings: { psu: "5.00 V", vm_ce: "4.99 V", vm_be: "0.00 V" },
  ledBrightness: { led: 0 },
};
