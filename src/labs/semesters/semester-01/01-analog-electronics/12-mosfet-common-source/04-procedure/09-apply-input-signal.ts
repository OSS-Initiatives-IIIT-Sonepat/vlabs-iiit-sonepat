import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Apply the AC input signal.",
  body: "Mount the input coupling capacitor $C_{in}$ ($1\\,\\mu\\text{F}$) at column 6 and connect it to the gate with a blue wire. Connect the function generator output to $C_{in}$ and its ground to the ground rail. Set a $1\\,\\text{kHz}$ sine wave of $100\\,\\text{mV}$ peak-to-peak. The capacitor blocks the generator's DC level so the bias set by $V_{GG}$ is unchanged.",
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
    "fg1",
    "c_in",
    "w_cin_gate",
  ],
  highlight: "c_in",
  supplyVoltage: 10,
  readings: {
    fg1: "1 kHz, 100 mVpp",
    vm_gs: "3.00 V",
    am_d: "4.05 mA",
    vm_ds: "5.95 V",
  },
};
