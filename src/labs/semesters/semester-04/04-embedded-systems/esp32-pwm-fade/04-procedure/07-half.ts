import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32PwmDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "50 % duty",
  body: "Change the value in loop() to ledcWrite(5, 128) and upload again. The duty cycle is now 128 of 255, about 50 %, and the LED is half as bright.",
  show: ["bb", "esp", "r1", "led1", "w_gpio5", "w_gnd_esp", "w_led_gnd", "usb"],
  highlight: "led1",
  ledBrightness: { led1: 0.5 },
  readings: { GPIO5: "duty 128/255 (50 %)" },
  schematic: esp32PwmDiagrams[3],
};
