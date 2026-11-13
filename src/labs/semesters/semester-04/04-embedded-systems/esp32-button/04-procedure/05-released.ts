import { type SceneProcedureStep } from "@/labs/experiments/types";
import { esp32ButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Read the released button",
  body: "Plug in the micro-USB cable to power the board. Upload this sketch and open the Serial Monitor at 115200 baud. With the button released the pin reads HIGH.\nvoid setup() {\n  pinMode(4, INPUT_PULLUP);\n  Serial.begin(115200);\n}\nvoid loop() {\n  Serial.println(digitalRead(4));\n  delay(200);\n}",
  show: ["bb", "esp", "btn1", "w_gpio4", "w_btn_gnd", "w_gnd_esp", "usb"],
  highlight: "btn1",
  readings: { GPIO4: "1 (HIGH, released)" },
  schematic: esp32ButtonDiagrams[3],
};
