import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the gate bias network.",
  body: "Mount the $100\\,\\text{k}\\Omega$ resistor $R_G$ at column 2. Connect one end to the positive terminal rail of the $V_{GG}$ supply and the other end to the gate of the MOSFET with orange wires. The gate draws almost no DC current, so the full $V_{GG}$ appears as $V_{GS}$.",
  show: [
    "bb",
    "psu",
    "vgg",
    "m1",
    "w_gnd_link",
    "w_src_gnd",
    "r_d",
    "am_d",
    "w_rd_drain",
    "r_g",
    "w_vgg_rg",
    "w_rg_gate",
  ],
  highlight: "r_g",
};
