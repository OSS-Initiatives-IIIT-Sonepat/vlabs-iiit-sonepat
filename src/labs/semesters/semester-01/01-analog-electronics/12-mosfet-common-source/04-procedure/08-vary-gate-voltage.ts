import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Vary $V_{GS}$ and record the DC characteristics.",
  body: "Increase $V_{GG}$ in steps (2.0, 2.5, 2.8, 3.0, 3.2, 3.4 V) and record $V_{GS}$, $I_D$ and $V_{DS}$ in the observation table. Below about 2.1 V the drain current is almost zero (cut-off). As $V_{GS}$ rises, $I_D$ rises and $V_{DS}$ falls. At $V_{GS} = 3.4\\,\\text{V}$ the readings are close to $I_D \\approx 8.5\\,\\text{mA}$ and $V_{DS} \\approx 1.5\\,\\text{V}$, near the edge of the triode region. Return $V_{GG}$ to give $V_{GS} = 3.0\\,\\text{V}$ before the AC measurement.",
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
    "vm_gs",
    "vm_ds",
  ],
  highlight: "am_d",
  supplyVoltage: 10,
  readings: { vm_gs: "3.40 V", am_d: "8.45 mA", vm_ds: "1.55 V" },
};
