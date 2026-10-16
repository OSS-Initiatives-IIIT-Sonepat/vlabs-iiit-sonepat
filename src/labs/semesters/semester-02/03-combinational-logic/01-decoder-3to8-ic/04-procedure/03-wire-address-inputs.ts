import { type SceneProcedureStep } from "@/labs/experiments/types";

import { ADDRESS, BASE, ENABLES, address } from "./parts";

export const step: SceneProcedureStep = {
  label: "Wire the address inputs A0, A1 and A2.",
  body: "Connect the three address switches to A0 (pin 1), A1 (pin 2) and A2 (pin 3). A0 is the least significant bit, so the selected output number is $n = 4A_2 + 2A_1 + A_0$. Start with all three switches at 0.",
  show: [...BASE, "w_en1_vcc", ...ENABLES, ...ADDRESS],
  highlight: "w_a0_dec",
  activeInputs: address(0),
  readings: { psu: "5.00 V" },
};
