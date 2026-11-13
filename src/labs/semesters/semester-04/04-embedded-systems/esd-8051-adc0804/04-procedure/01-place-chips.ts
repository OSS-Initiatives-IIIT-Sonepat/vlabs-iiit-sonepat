import { type SceneProcedureStep } from "@/labs/experiments/types";
import { adcChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Place the ADC0804 and the trainer",
  body: "Place the breadboard in the middle, the 8051 trainer on the right and the ADC0804 on the left. The ADC's data pins DB0 to DB7 run to P1, and its control pins to P3.",
  show: ["bb", "mcu", "adc"],
  highlight: "adc",
  schematic: adcChain()[0],
};
