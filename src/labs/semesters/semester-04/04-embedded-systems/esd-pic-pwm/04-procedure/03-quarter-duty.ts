import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pwmChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "25 % duty",
  body: "Set CCPR1L = 64 in the same program. The duty is 64 / 256, about 25 %, and the LED is dim. The average voltage is about a quarter of 5 V.",
  show: ["bb", "pic", "r1", "led1", "w_vdd", "w_rc2", "w_vss", "w_led_gnd"],
  highlight: "led1",
  ledBrightness: { led1: 0.25 },
  readings: { "Duty cycle": "25 % (CCPR1L = 64)" },
  schematic: pwmChain()[2],
};
