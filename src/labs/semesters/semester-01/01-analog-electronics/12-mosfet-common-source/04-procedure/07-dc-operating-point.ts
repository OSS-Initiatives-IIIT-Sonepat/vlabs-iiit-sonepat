import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Set the DC operating point.",
  body: "Switch on both supplies. Set $V_{DD} = 10\\,\\text{V}$ and adjust $V_{GG}$ until $V_{GS} = 3.0\\,\\text{V}$. Note $I_D$ and $V_{DS}$. Typical readings are $I_D \\approx 4\\,\\text{mA}$ and $V_{DS} \\approx 6\\,\\text{V}$. Since $V_{DS} > V_{GS} - V_{th}$, the MOSFET is in **saturation**, which is the correct region for amplification.",
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
  highlight: "vm_ds",
  supplyVoltage: 10,
  readings: { vm_gs: "3.00 V", am_d: "4.05 mA", vm_ds: "5.95 V" },
};
