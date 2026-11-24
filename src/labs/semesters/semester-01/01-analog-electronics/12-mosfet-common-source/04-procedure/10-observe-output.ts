import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Observe the amplified output on the CRO.",
  body: "Connect the output coupling capacitor $C_{out}$ ($1\\,\\mu\\text{F}$) from the drain (column 12, + lead) to column 13, and the load resistor $R_L$ ($10\\,\\text{k}\\Omega$) from column 13 to column 16, which is wired to ground. Connect CRO channel 1 to column 13 (across $R_L$). The output is an amplified sine wave **inverted** (180° out of phase) relative to the input. Measure $v_{out}$ (peak-to-peak) and calculate $A_v = -v_{out}/v_{in}$. Compare with the theoretical value $A_v = -g_m (R_D \\parallel R_L) \\approx -8$.",
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
    "fg1",
    "c_in",
    "w_cin_gate",
    "c_out",
    "r_l",
    "w_rl_gnd",
    "cro",
  ],
  highlight: "cro",
  supplyVoltage: 10,
  readings: {
    fg1: "1 kHz, 100 mVpp",
    cro: "Vout ≈ 0.82 Vpp, 180° phase shift (Av ≈ −8.2)",
  },
};
