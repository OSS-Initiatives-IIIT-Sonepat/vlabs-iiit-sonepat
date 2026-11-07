import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Start the converter board",
  body: "The board starts empty. This lab builds the 4-bit R-2R ladder on the right of the Theory figure. The left of that figure is the ADC0804: a potentiometer into pin 6, /WR starts a conversion, /INTR falls when the byte is ready, and /RD puts D0–D7 on the bus.",
  show: ["bb"],
};
