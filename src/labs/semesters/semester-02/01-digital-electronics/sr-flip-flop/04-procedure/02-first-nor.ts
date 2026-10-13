import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the first NOR gate",
  body: "Insert the first 74HC02 NOR gate across the centre gap (row e). This gate will produce the output Q. Connect pin 14 to VCC and pin 7 to GND.",
  show: ["bb", "psu", "nor1"],
  highlight: "nor1",
};
