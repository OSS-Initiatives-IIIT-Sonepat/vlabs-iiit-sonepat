import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect BCD input lines A, B, C, and D to logic gate inputs.",
  body:
    "Wire BCD inputs from tie-point columns 1–4 to gate inputs: " +
    "Input A (red wire w_a_or_w) to or_w.A (col 21); " +
    "Input B (orange wires) to and_b_t.A (col 13) and xor_x.A (col 29); " +
    "Input C (blue wires) to or_cd.A (col 5) and xor_cd.A (col 37); " +
    "Input D (green wires) to or_cd.B (col 6), xor_cd.B (col 38), and not_z.A (col 53).",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "or_cd",
    "and_b_t",
    "or_w",
    "xor_x",
    "xor_cd",
    "not_y",
    "not_z",
    "w_vcc_or_cd",
    "w_gnd_or_cd",
    "w_vcc_and",
    "w_gnd_and",
    "w_vcc_or_w",
    "w_gnd_or_w",
    "w_vcc_xor_x",
    "w_gnd_xor_x",
    "w_vcc_xor_cd",
    "w_gnd_xor_cd",
    "w_vcc_not_y",
    "w_gnd_not_y",
    "w_vcc_not_z",
    "w_gnd_not_z",
    "w_a_or_w",
    "w_b_and",
    "w_b_xor",
    "w_c_or",
    "w_c_xor",
    "w_d_or",
    "w_d_xor",
    "w_d_not",
  ],
  highlight: "w_a_or_w",
  activeInputs: {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  },
};
