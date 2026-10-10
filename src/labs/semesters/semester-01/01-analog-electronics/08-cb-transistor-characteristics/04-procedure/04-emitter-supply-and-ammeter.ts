import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the emitter supply V_EE and the emitter milliammeter.",
  body: "Connect the emitter supply $V_{EE}$ (0-5 V) with its positive terminal on the ground rail (the base) and its negative terminal on column 24. Place the milliammeter between column 20 (+, resistor side) and column 24 (-) to read the emitter current $I_E$. The emitter is now negative with respect to the base, so the emitter-base junction is forward biased. Keep $V_{EE}$ at 0 V for now.",
  show: ["bb", "q1", "w_base_gnd", "r_e", "w_e_re", "psu_ee", "am_ie"],
  highlight: "psu_ee",
};
