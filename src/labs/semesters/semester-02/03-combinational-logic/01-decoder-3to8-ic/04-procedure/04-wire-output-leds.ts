import { type SceneProcedureStep } from "@/labs/experiments/types";

import { ADDRESS, BASE, ENABLES, OUTPUTS, address, selectLed } from "./parts";

export const step: SceneProcedureStep = {
  label: "Wire the eight output LEDs as current sinks.",
  body: "Because the outputs are active LOW, wire each LED so that it lights when its output is LOW: +5 V rail → 330 Ω resistor → LED anode, and LED cathode → output pin. Y0–Y3 (pins 15–12) drive the red LEDs on the top half; Y4–Y7 (pins 11, 10, 9 and 7) drive the green LEDs on the bottom half. With the address at 000, only Y0 is LOW, so only the Y0 LED lights.",
  show: [...BASE, "w_en1_vcc", ...ENABLES, ...ADDRESS, ...OUTPUTS],
  highlight: "led_y0",
  activeInputs: address(0),
  ledBrightness: selectLed(0),
  readings: { psu: "5.00 V" },
};
