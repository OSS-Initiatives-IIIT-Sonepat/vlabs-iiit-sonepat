import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: 'Complete JK LED connections',
  body: 'Connect the cathodes of both JK output LEDs to the ground rail. Apply the four J-K combinations and observe Q after each active clock edge.',
  show: ["bb", "psu", "jk1", "j_in", "k_in", "clk_jk", "q_jk", "qb_jk", "r_jk_q", "led_jk_q", "r_jk_qb", "led_jk_qb", "w_j", "w_k", "w_clk_jk", "w_jk_q", "w_jk_qb", "w_jk_led", "w_jk_rled", "w_jk_ledb", "w_jk_rledb", "w_jk_gnd1", "w_jk_gnd2"],
  highlight: 'jk1',
};
