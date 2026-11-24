import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoBlinkDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Upload the sketch",
  body: "Plug the USB cable into the Uno. It powers the board with 5 V (the green ON LED lights) and carries the sketch from the PC. In the IDE choose Arduino Uno and its port, then upload this sketch:\nvoid setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(500);\n  digitalWrite(13, LOW);\n  delay(500);\n}\nWhile pin 13 is HIGH, the LED is on.",
  show: ["bb", "uno", "r1", "led1", "w_d13", "w_gnd_uno", "w_led_gnd", "usb"],
  highlight: "led1",
  ledBrightness: { led1: 1 },
  readings: { D13: "HIGH (5 V)" },
  schematic: arduinoBlinkDiagrams[3],
};
