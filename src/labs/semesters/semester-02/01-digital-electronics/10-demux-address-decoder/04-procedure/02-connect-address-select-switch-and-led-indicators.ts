import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect address select switch and LED indicators",
  body: "Connect the single address select switch to the S input. Provide S to the NOT gate input (pin 1 of 74HC04) and directly to AND gate 2 pin 5. Connect S' (NOT output, pin 2) to AND gate 1 pin 2. Connect the green LED (Device 0) with a 330 Ω resistor to Y0 (AND gate 1 pin 3). Connect the red LED (Device 1) with a 330 Ω resistor to Y1 (AND gate 2 pin 6). Both LED cathodes go to GND.",
  show: ["bb", "psu", "w_rail_link", "not1", "w_vcc_not1", "w_gnd_not1"],
  highlight: "psu",
};
