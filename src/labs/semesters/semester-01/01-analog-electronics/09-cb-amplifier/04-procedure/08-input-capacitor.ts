import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the input coupling capacitor C_in (10 µF).",
  body: "Insert C_in at cols 21–22, row c, with the **+ lead (col 21) towards the signal source** — the emitter sits at about −0.65 V, below the generator's 0 V. Run a **blue jumper** from col 22 to the emitter strip (col 13). C_in passes the AC signal and blocks DC from the generator.",
  show: [
    "bb",
    "psu",
    "psu_ee",
    "q1",
    "w_base_gnd",
    "r_e",
    "am_e",
    "r_c",
    "am_c",
    "vm_eb",
    "vm_cb",
    "c_in",
    "w_cin_e",
  ],
  highlight: "c_in",
};
