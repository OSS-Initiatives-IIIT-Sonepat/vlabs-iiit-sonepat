import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the output paths.",
  body: "Wire Q (pin 5) to the green LED's resistor and $\\overline{Q}$ (pin 6) to the red LED's resistor; each LED anode shares the column of its resistor's right lead. Wire both LED cathodes to GND. Power on.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "dff1",
    "w_vcc_dff1",
    "w_gnd_dff1",
    "w_clr_vcc",
    "w_set_vcc",
    "w_d_dff1",
    "w_clk_dff1",
    "r_q",
    "led_q",
    "r_qbar",
    "led_qbar",
    "w_q_out",
    "w_q_gnd",
    "w_qbar_out",
    "w_qbar_gnd",
  ],
  activeInputs: {
    D: 0,
    CLK: 0,
  },
};
