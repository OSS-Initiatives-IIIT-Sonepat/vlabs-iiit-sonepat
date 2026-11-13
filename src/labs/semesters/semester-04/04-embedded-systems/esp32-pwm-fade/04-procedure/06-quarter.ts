import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32PwmDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "25 % duty",
  body: "Plug in the micro-USB cable to power the board, then upload this sketch:\nvoid setup() {\n  ledcAttach(5, 5000, 8);\n}\nvoid loop() {\n  ledcWrite(5, 64);\n}\nGPIO5 now outputs a 5 kHz square wave with a 25 % duty cycle. The LED is dim.",
  show: ["bb", "esp", "r1", "led1", "w_gpio5", "w_gnd_esp", "w_led_gnd", "usb"],
  highlight: "led1",
  ledBrightness: { led1: 0.25 },
  readings: { GPIO5: "duty 64/255 (25 %)" },
  schematic: esp32PwmDiagrams[3],
};
