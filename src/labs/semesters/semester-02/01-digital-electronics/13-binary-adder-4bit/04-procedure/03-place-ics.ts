import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the five logic ICs.",
  body: "Insert the ICs across the centre gap of the breadboard, left to right at columns 11, 19, 27, 35 and 43, and power each one (pin 14 to +5 V, pin 7 to GND): two **74HC86** quad XOR ICs (`xor_p`, `xor_s`), two **74HC08** quad AND ICs (`and_g`, `and_p`) and one **74HC32** quad OR IC (`or_c`). Each full-adder stage uses one gate from each IC, so bit $i$ uses gate $i+1$ of every chip.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor_p",
    "w_vcc_xor_p",
    "w_gnd_xor_p",
    "xor_s",
    "w_vcc_xor_s",
    "w_gnd_xor_s",
    "and_g",
    "w_vcc_and_g",
    "w_gnd_and_g",
    "and_p",
    "w_vcc_and_p",
    "w_gnd_and_p",
    "or_c",
    "w_vcc_or_c",
    "w_gnd_or_c",
  ],
  highlight: "xor_p",
};
