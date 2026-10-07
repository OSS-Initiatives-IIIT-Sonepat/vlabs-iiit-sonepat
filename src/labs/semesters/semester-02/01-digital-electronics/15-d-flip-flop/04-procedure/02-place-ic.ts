import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the 74HC74 IC",
  body: "Insert the 74HC74 across the centre gap (row e) with the notch facing left. Pin 14 is VCC and pin 7 is GND. Only flip-flop 1 (pins 1 to 6) is used.",
  show: ["bb", "psu", "dff1"],
  highlight: "dff1",
};
