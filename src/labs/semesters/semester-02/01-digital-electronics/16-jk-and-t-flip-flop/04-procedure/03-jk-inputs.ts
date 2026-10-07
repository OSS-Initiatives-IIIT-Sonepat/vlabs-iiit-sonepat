import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: 'Connect J, K and clock',
  body: 'Connect J to the J input, K to the K input and the clock source to CLK. Keep the signal wiring color-coded: J red, K blue and clock orange.',
  show: ["bb", "psu", "jk1", "j_in", "k_in", "clk_jk", "w_j", "w_k", "w_clk_jk"],
  highlight: 'jk1',
};
