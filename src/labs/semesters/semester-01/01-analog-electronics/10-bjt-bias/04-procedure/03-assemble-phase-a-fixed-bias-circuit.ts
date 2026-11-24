import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Assemble Phase A — Fixed Bias circuit.",
  body: "Insert the BC547 with its flat face towards you (legs C-B-E) at cols 6, 7, 8 in row e. Insert $R_B = 470\\,\\text{k}\\Omega$ from col 4 to the base (col 7) and run a red jumper from the VCC rail to col 4. Insert $R_{C1} = 4.7\\,\\text{k}\\Omega$ from col 3 (ammeter) to the collector (col 6). Ground the emitter (col 8) with a black jumper. Connect a second DMM on DC volts across collector (col 6) and emitter (col 8) for $V_{CE}$.",
  show: [
    "bb",
    "psu",
    "dmm",
    "q_a",
    "r_b",
    "r_c1",
    "w_vcc_rb",
    "w_ea_gnd",
    "vm_a",
  ],
  highlight: "r_b",
};
