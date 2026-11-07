import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Start the segment board",
  body: "The board starts empty. Seven LEDs will stand in for segments a to g of a common-cathode display. The figure in Theory is the 74HC4511 that sits in front of them: four BCD switches in, seven segment drives out.",
  show: ["bb"],
};
