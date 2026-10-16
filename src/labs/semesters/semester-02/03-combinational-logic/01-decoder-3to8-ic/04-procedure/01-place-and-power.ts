import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE } from "./parts";

export const step: SceneProcedureStep = {
  label: "Place the 74HC138 and connect power.",
  body: "Connect the +5 V supply to the top red rail and its ground to the top blue rail, and link the top rails to the bottom rails at columns 4 and 5. Insert the 74HC138 across the centre channel at column 20 with the notch on the left. Connect VCC (pin 16) to the +5 V rail and GND (pin 8) to the ground rail. The 74HC138 decodes a 3-bit address into eight active-LOW outputs Y0–Y7.",
  show: BASE,
  highlight: "dec",
  readings: { psu: "5.00 V" },
};
