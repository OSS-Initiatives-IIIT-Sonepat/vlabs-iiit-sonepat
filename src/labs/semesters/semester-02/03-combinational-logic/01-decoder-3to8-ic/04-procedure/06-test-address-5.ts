import { type SceneProcedureStep } from "@/labs/experiments/types";

import { ADDRESS, BASE, ENABLES, OUTPUTS, address, selectLed } from "./parts";

export const step: SceneProcedureStep = {
  label: "Test address 101: Y5 selected.",
  body: "Set A2 = 1, A1 = 0, A0 = 1. The address is 101 = 5, so only Y5 goes LOW and its green LED lights. Each output is one minterm of the address inputs: $\\overline{Y_5} = A_2 \\overline{A_1} A_0$.",
  show: [...BASE, "w_en1_vcc", ...ENABLES, ...ADDRESS, ...OUTPUTS],
  highlight: "led_y5",
  activeInputs: address(5),
  ledBrightness: selectLed(5),
  readings: { psu: "5.00 V" },
};
