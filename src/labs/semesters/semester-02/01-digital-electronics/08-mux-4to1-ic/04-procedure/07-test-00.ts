import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Test S1 S0 = 00",
  body: "Set S1 = 0 and S0 = 0. The multiplexer selects I0 = 0, so Y = 0 and the LED stays OFF. Record this in the observation table.",
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
