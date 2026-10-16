import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, OUTPUTS, RESETS_GND, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Wire the output LEDs QA–QD.",
  body: "Connect each output to a red LED through a 330 Ω resistor, with the LED cathode to ground: QA (pin 12), QB (pin 9), QC (pin 8) and QD (pin 11). Read the count as QD QC QB QA, with QA the least significant bit. Switch on the supply; if the LEDs show a random value, briefly connect both reset inputs to +5 V to clear the count to 0000.",
  show: [...BASE, ...RESETS_GND, ...OUTPUTS],
  highlight: "led_qa",
  ledBrightness: countLeds(0),
  readings: { psu: "5.00 V" },
};
