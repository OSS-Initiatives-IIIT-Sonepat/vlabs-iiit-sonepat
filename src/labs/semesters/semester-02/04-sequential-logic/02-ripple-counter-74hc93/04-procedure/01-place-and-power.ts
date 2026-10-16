import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE } from "./parts";

export const step: SceneProcedureStep = {
  label: "Place the 74HC93 and connect power.",
  body: "Insert the 74HC93 across the centre channel of the breadboard with pin 1 at the top left. Connect the +5 V supply to the red rails and ground to the blue rails, and link the top and bottom rails. Unlike most 14-pin logic ICs, the 7493 family has VCC on pin 5 and GND on pin 10: connect them carefully, because swapping them can damage the chip. Keep the supply off until the wiring is complete.",
  show: BASE,
  highlight: "cnt",
  readings: { psu: "5.00 V" },
};
