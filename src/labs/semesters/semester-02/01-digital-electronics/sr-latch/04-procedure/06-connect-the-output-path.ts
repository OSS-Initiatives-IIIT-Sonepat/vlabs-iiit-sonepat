import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the output path.",
  body: "Wire the Q pin (pin 4) to the resistor; the LED anode shares the column of the resistor's right lead. Wire the LED cathode to the GND rail. Power on.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "sr1",
    "w_vcc_sr1",
    "w_gnd_sr1",
    "w_s2_vcc",
    "w_sbar_sr1",
    "w_rbar_sr1",
    "r_q",
    "led_q",
    "w_q_out",
    "w_q_gnd",
  ],
  activeInputs: {
    Sbar: 1,
    Rbar: 1,
  },
};
