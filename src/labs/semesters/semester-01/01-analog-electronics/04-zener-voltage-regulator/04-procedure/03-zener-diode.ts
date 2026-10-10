import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the Zener diode in reverse bias.",
  body: "Mount the 5.1 V Zener diode DZ (the red component with the dark band, columns 9 to 12, row c). Its cathode — the banded end, column 12 — must be joined to the free end of Rs (column 7) with the green wire, and its anode (column 9) must be joined to the ground rail with the black wire. This reverse-biased connection is required for breakdown regulation. If the diode is fitted the other way round it behaves as an ordinary forward-biased diode, drops only about 0.7 V and no regulation takes place.",
  show: ["bb", "psu", "rs", "w_vcc_rs", "dz", "w_rs_dz", "w_dz_gnd"],
  highlight: "dz",
  supplyVoltage: 0,
};
