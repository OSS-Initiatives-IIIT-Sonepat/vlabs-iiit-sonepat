import { type SceneProcedureStep } from "@/labs/experiments/types";

import { ADDRESS, BASE, ENABLES, OUTPUTS, address, selectLed } from "./parts";

export const step: SceneProcedureStep = {
  label: "Test address 011: Y3 selected.",
  body: "Set A2 = 0, A1 = 1, A0 = 1. The address is 011 = 3, so Y3 goes LOW and its LED lights; every other output stays HIGH. Step through all eight addresses from 000 to 111 and record the outputs in the observation table.",
  show: [...BASE, "w_en1_vcc", ...ENABLES, ...ADDRESS, ...OUTPUTS],
  highlight: "led_y3",
  activeInputs: address(3),
  ledBrightness: selectLed(3),
  readings: { psu: "5.00 V" },
};
