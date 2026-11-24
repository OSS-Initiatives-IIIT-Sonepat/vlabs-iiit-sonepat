import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32PwmDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "100 % duty",
  body: "Set ledcWrite(5, 255). The output is now fully on, and the LED is at full brightness. Set it to 0 and the LED goes dark. Adding a loop with a small step fades the LED smoothly.",
  show: ["bb", "esp", "r1", "led1", "w_gpio5", "w_gnd_esp", "w_led_gnd", "usb"],
  highlight: "led1",
  ledBrightness: { led1: 1 },
  readings: { GPIO5: "duty 255/255 (100 %)" },
  schematic: esp32PwmDiagrams[3],
};
