import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pwmChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "50 % and then near 100 %",
  body: "Change CCPR1L to 128 and program again: the duty is 50 % and the LED is half bright. Then use 255: the duty is about 100 % and the LED is at full brightness. A loop that steps CCPR1L from 0 to 255 fades the LED smoothly.",
  show: ["bb", "pic", "r1", "led1", "w_vdd", "w_rc2", "w_vss", "w_led_gnd"],
  highlight: "led1",
  ledBrightness: { led1: 1 },
  readings: { "Duty cycle": "50 % then about 100 %" },
  schematic: pwmChain()[3],
};
