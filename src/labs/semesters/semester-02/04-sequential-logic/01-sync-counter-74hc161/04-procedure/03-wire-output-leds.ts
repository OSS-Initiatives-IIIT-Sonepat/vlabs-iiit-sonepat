import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CONTROLS, OUTPUTS, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Wire the output LEDs Q0–Q3 and RCO.",
  body: "Connect each output to a red LED through a 330 Ω resistor, with the LED cathode to ground: Q0 (pin 14), Q1 (pin 13), Q2 (pin 12) and Q3 (pin 11). Connect the ripple-carry output RCO (pin 15) to a yellow LED in the same way. Read the count as Q3 Q2 Q1 Q0, with Q0 the least significant bit. Before any clock edge the LEDs may show a random value; press CLR' briefly to ground to start from 0000.",
  show: [...BASE, "w_clr_vcc", "w_ld_vcc", ...CONTROLS, ...OUTPUTS],
  highlight: "led_q0",
  ledBrightness: countLeds(0),
  readings: { psu: "5.00 V" },
};
