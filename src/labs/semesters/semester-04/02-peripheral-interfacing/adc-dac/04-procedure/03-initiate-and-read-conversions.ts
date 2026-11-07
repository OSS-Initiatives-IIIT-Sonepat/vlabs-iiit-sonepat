import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the output lamp",
  body: "Place the LED at the ladder output. It stands in for a voltmeter: a larger code pushes more of the reference through the ladder, and the lamp gets brighter. The ADC half does the reverse. A voltage on the potentiometer becomes a byte, one LED per bit.",
  show: ["bb", "r1", "r2", "r3", "r4", "led_out"],
  highlight: "led_out",
};
