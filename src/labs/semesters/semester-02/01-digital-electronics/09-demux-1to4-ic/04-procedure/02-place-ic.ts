import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the 74HC139 IC",
  body: "Insert the 74HC139 across the centre gap of the breadboard (row e) with the notch facing left. Pin 16 is VCC and pin 8 is GND. Only section 1 (pins 1 to 7) is used.",
  show: ["bb", "psu", "dmx1"],
  highlight: "dmx1",
};
