import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the 74HC153 IC",
  body: "Insert the 74HC153 across the centre gap of the breadboard (row e) with the notch facing left. Pin 16 is VCC and pin 8 is GND.",
  show: ["bb", "psu", "mux1", "w_vcc", "w_gnd"],
  highlight: "mux1",
};
