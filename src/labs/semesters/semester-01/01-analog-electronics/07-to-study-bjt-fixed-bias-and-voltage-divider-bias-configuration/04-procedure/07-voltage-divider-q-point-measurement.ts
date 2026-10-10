import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Measure Voltage Divider Bias Q-point and compare stability.",
  body:
    "Measure all DC branch voltages with the DMM across the Voltage Divider Bias circuit. " +
    "Measured values: base voltage $V_B \\approx 1.09\\text{ V}$, emitter voltage $V_E \\approx 0.39\\text{ V}$, " +
    "collector current $I_C \\approx \\frac{V_E}{R_E} \\approx 0.39\\text{ mA}$, and collector-emitter voltage " +
    "$V_{CE} = V_{CC} - I_C(R_C + R_E) \\approx 9.78\\text{ V}$. " +
    "The Q-point is stably centered in the active region. Substituting different transistors with varying beta yields " +
    "less than 4% change in $I_C$, proving the superior stability ($S \\approx 1$) of voltage divider bias.",
  show: [
    "bb",
    "psu",
    "dmm",
    "r_b",
    "r_c1",
    "q1",
    "w_vcc_rb",
    "w_rb_base",
    "w_vcc_rc1",
    "w_rc1_col",
    "w_q1_gnd",
    "r1",
    "r2",
    "q2",
    "r_c2",
    "r_e",
    "w_vcc_r1",
    "w_r2_gnd",
    "w_r1_r2",
    "w_div_base",
    "w_vcc_rc2",
    "w_rc2_col",
    "w_em_re",
    "w_re_gnd",
  ],
  readings: { dmm: "0.39 mA, 9.78 V" },
  highlight: "dmm",
};
