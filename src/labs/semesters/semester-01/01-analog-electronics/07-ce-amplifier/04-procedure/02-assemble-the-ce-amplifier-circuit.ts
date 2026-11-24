import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Assemble the CE amplifier circuit.",
  body: "Place the BC547 with its flat face towards you: the legs are C-B-E from left to right (cols 14, 15, 16). Plug each resistor straight into the strip it shares with the transistor: R1 (col 12 to the base) and R_C (col 11 to the collector), each with a red jumper from col 12 / col 11 to VCC; R2 from the base to col 18 and R_E from the emitter to col 19, each with a black jumper to GND. Put the bypass capacitor C_E from the emitter to col 17 (+ on the emitter) and ground col 17. C_1 couples the signal into the base (+ towards the base, jumper from col 7), and C_2 takes the output from the collector (+ towards the collector) to R_L at col 22. Connect the +12 V supply to the rails.",
  show: [
    "bb",
    "psu",
    "q1",
    "r1",
    "r2",
    "rc",
    "re",
    "ce",
    "c1",
    "c2",
    "rl",
    "w_vcc_r1",
    "w_vcc_rc",
    "w_r2_gnd",
    "w_re_gnd",
    "w_ce_gnd",
    "w_rl_gnd",
    "w_c1_base",
    "w_col_c2",
  ],
  highlight: "q1",
};
