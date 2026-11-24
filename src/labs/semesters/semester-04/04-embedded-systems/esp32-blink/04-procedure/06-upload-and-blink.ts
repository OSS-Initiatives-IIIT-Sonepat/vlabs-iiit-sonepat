import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32BlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Upload and watch",
  body: "Plug in the micro-USB cable: it powers the board (the red power LED lights) and carries the sketch. In the IDE choose ESP32 Dev Module and its port, then upload this sketch:\nvoid setup() {\n  pinMode(2, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(2, HIGH);\n  delay(500);\n  digitalWrite(2, LOW);\n  delay(500);\n}\nWhile GPIO2 is HIGH, the green LED is on.",
  show: ["bb", "esp", "r1", "led1", "w_gpio2", "w_gnd_esp", "w_led_gnd", "usb"],
  highlight: "led1",
  ledBrightness: { led1: 1 },
  readings: { GPIO2: "HIGH (3.3 V)" },
  schematic: esp32BlinkDiagrams[3],
};
