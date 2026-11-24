import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the voltmeters for $V_{GS}$ and $V_{DS}$.",
  body: "Connect the first voltmeter between the gate and ground to measure $V_{GS}$. Connect the second voltmeter between the drain and ground to measure $V_{DS}$ (the source is grounded, so these are the same as the node voltages).",
  show: [
    "bb",
    "psu",
    "vgg",
    "m1",
    "w_src_gnd",
    "r_d",
    "am_d",
    "r_g",
    "vm_gs",
    "vm_ds",
  ],
  highlight: "vm_gs",
};
