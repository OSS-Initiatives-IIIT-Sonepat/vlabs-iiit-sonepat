import { type SceneProcedureStep } from "@/labs/experiments/types";

import { ADDRESS, BASE, ENABLES, OUTPUTS, address, selectLed } from "./parts";

export const step: SceneProcedureStep = {
  label: "Test address 111: Y7 selected.",
  body: "Set all three address inputs to 1. Y7 (pin 7) goes LOW and its LED lights. Confirm that exactly one LED is lit for every address: the decoder converts a 3-bit binary number into a one-of-eight (one-cold) output.",
  show: [...BASE, "w_en1_vcc", ...ENABLES, ...ADDRESS, ...OUTPUTS],
  highlight: "led_y7",
  activeInputs: address(7),
  ledBrightness: selectLed(7),
  readings: { psu: "5.00 V" },
};
