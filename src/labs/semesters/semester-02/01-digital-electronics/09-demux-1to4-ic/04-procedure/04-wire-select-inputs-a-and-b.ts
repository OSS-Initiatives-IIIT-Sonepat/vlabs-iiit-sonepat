import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire select inputs A and B.",
  body: "Red wire: column 2 → pin 2 (1A0, input A, the LSB). Orange wire: column 4 → pin 3 (1A1, input B, the MSB). The selected output is $Y_{2B + A}$: B A = 00 selects Y0, 01 (A = 1) selects Y1, 10 (B = 1) selects Y2 and 11 selects Y3.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "demux14",
    "w_vcc_demux14",
    "w_gnd_demux14",
    "w_en_gnd",
    "w_a_demux14",
    "w_b_demux14",
  ],
  activeInputs: {
    A: 0,
    B: 0,
  },
};
