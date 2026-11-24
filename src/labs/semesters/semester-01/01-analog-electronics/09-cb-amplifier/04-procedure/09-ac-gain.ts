import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Apply the AC signal and measure the voltage gain.",
  body: "Connect the function generator output to col 21 and its ground to the GND rail. Set 1 kHz, 20 mV peak-to-peak. Connect the CRO (AC coupling) to the collector (col 11). The output is **in phase** with the input and much larger: $A_v = V_{out}/V_{in} \\approx g_m R_C = (I_C/V_T) R_C \\approx (0.99\\text{ mA}/26\\text{ mV}) \\times 4.7\\text{ k}\\Omega \\approx 180$ (lower in practice because of the source resistance).",
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
    "fg1",
    "cro",
  ],
  readings: { psu: "9.00 V", psu_ee: "1.70 V", fg1: "1.000 kHz sine" },
};
