import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place segments a to g",
  body: "Place the seven segment LEDs, a through g. On a real display these are the seven bars of the figure-8. A decoder lights a subset of them. Digit 0 uses a, b, c, d, e, f. Digit 1 uses only b and c. Digit 8 uses all seven.",
  show: ["bb", "led_a", "led_b", "led_c", "led_d", "led_e", "led_f", "led_g"],
  highlight: "led_a",
};
