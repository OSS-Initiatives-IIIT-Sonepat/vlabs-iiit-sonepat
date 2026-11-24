import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Assemble Phase B — Voltage-Divider Bias circuit.",
  body: "Insert the second BC547 (legs C-B-E) at cols 19, 20, 21. Insert $R_1 = 100\\,\\text{k}\\Omega$ from col 17 to the base (col 20) with a red jumper from VCC to col 17; insert $R_2 = 10\\,\\text{k}\\Omega$ from the base to col 23 and ground col 23. Insert $R_{C2} = 4.7\\,\\text{k}\\Omega$ from col 16 to the collector (col 19) and $R_E = 1\\,\\text{k}\\Omega$ from the emitter (col 21) to col 24, which is grounded. Each resistor shares a column with a transistor leg, so no other jumpers are needed.",
  show: [
    "bb",
    "psu",
    "q_a",
    "r_b",
    "r_c1",
    "w_vcc_rb",
    "w_ea_gnd",
    "q_b",
    "r1",
    "r2",
    "r_c2",
    "r_e",
    "w_vcc_r1",
    "w_r2_gnd",
    "w_re_gnd",
  ],
  highlight: "r1",
};
