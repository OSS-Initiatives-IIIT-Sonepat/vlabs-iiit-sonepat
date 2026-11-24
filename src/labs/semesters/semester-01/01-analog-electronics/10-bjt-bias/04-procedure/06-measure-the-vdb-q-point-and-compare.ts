import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Measure the VDB Q-point and compare.",
  body: "Move the ammeter to Phase B: (+) on the VCC rail, (−) on col 16. Move the voltmeter across collector (col 19) and emitter (col 21). Power on and record $I_C$ and $V_{CE}$: about 0.39 mA and 9.8 V, the active region. To check stability, swap in BC547s with different $\\beta$: the VDB Q-point barely moves, while the fixed-bias circuit swings from near saturation ($\\beta = 100$) to hard saturation.",
  show: [
    "bb",
    "psu",
    "q_a",
    "r_b",
    "r_c1",
    "w_vcc_rb",
    "w_ea_gnd",
    "q_b",
    "r1",
    "r2",
    "r_c2",
    "r_e",
    "w_vcc_r1",
    "w_r2_gnd",
    "w_re_gnd",
    "dmm_b",
    "vm_b",
  ],
  readings: { psu: "12.00 V", dmm_b: "0.39 mA", vm_b: "9.78 V" },
};
