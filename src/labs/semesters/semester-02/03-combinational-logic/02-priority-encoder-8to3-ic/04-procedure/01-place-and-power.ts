import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE } from "./parts";

export const step: SceneProcedureStep = {
  label: "Place the 74HC148 and connect power.",
  body: "Connect the +5 V supply to the top rails and link them to the bottom rails. Insert the 74HC148 across the centre channel at column 20 with the notch on the left. Connect VCC (pin 16) to +5 V and GND (pin 8) to ground. The 74HC148 is an 8-to-3 priority encoder: all of its inputs and outputs are active LOW.",
  show: BASE,
  highlight: "enc",
  readings: { psu: "5.00 V" },
};
