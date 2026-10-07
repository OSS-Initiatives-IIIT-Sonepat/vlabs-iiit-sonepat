import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: 'Connect T flip-flop outputs',
  body: 'Connect Q and Q̅ to output nodes and LED indicators through 330 Ω resistors.',
  show: ["bb", "psu", "jk1", "j_in", "k_in", "clk_jk", "q_jk", "qb_jk", "r_jk_q", "led_jk_q", "r_jk_qb", "led_jk_qb", "w_j", "w_k", "w_clk_jk", "w_jk_q", "w_jk_qb", "w_jk_led", "w_jk_rled", "w_jk_ledb", "w_jk_rledb", "w_jk_gnd1", "w_jk_gnd2", "jk2", "t_in", "clk_t", "q_t", "qb_t", "r_t_q", "led_t_q", "r_t_qb", "led_t_qb", "w_t_j", "w_t_k", "w_t_tie", "w_clk_t", "w_t_q", "w_t_qb", "w_t_led", "w_t_rled", "w_t_ledb", "w_t_rledb"],
  highlight: 'jk2',
};
