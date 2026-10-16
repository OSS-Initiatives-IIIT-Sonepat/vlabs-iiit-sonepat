import { type SceneProcedureStep } from "@/labs/experiments/types";

import { ADDRESS, BASE, ENABLES, OUTPUTS, address, selectLed } from "./parts";

export const step: SceneProcedureStep = {
  label: "Disable the decoder with E1 = 0.",
  body: "Move the E1 wire from the +5 V rail to the ground rail. The decoder is now disabled: all eight outputs are HIGH and every LED is off, whatever the address. The same happens if E2' or E3' is taken HIGH. The enables let two 74HC138s be combined into a 4-to-16 decoder, using A3 to enable one chip or the other. Switch off the supply.",
  show: [...BASE, "w_en1_gnd", ...ENABLES, ...ADDRESS, ...OUTPUTS],
  highlight: "w_en1_gnd",
  activeInputs: address(7),
  ledBrightness: selectLed(null),
  readings: { psu: "5.00 V" },
};
