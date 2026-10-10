import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the drain resistor and the ammeter.",
  body: "Mount the $1\\,\\text{k}\\Omega$ drain resistor $R_D$ at column 15. Connect the ammeter in series between the $V_{DD}$ rail and $R_D$, then connect the far end of $R_D$ to the drain of the MOSFET with a green wire. The ammeter now reads the drain current $I_D$.",
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
  ],
  highlight: "r_d",
};
