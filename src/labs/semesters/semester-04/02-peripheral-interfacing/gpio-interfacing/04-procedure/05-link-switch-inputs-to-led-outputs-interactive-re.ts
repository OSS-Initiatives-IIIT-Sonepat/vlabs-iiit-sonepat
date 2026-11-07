import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Close each LED path to ground",
  body: "Connect each LED cathode to the ground rail. All three lamps come on, because this board ties them straight to the supply. On a microcontroller, software would drive those three wires high and low. The input half of the same program reads a switch: pressed is +5 V, released is the pull-down, so the pin reads 0 instead of floating.",
  show: [
    "bb",
    "r1",
    "r2",
    "r3",
    "led1",
    "led2",
    "led3",
    "w_vcc_r1",
    "w_r1_led1",
    "w_led1_gnd",
    "w_vcc_r2",
    "w_r2_led2",
    "w_led2_gnd",
    "w_vcc_r3",
    "w_r3_led3",
    "w_led3_gnd",
  ],
};
