import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE } from "./parts";

export const step: SceneProcedureStep = {
  label: "Place the 74HC161 and connect power.",
  body: "Connect the +5 V supply to the top rails and link them to the bottom rails. Insert the 74HC161 across the centre channel at column 16, notch on the left. Connect VCC (pin 16) to +5 V and GND (pin 8) to ground. The 74HC161 is a 4-bit synchronous binary counter: all four flip-flops are clocked together by the same CLK edge.",
  show: BASE,
  highlight: "cnt",
  readings: { psu: "5.00 V" },
};
