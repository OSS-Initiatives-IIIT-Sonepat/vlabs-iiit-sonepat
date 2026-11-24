import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoButtonDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Read the released button",
  body: "Plug in the USB cable to power the board at 5 V. Upload this sketch, then open the Serial Monitor at 9600 baud. With the button released, the pin reads HIGH.\nvoid setup() {\n  pinMode(2, INPUT_PULLUP);\n  Serial.begin(9600);\n}\nvoid loop() {\n  Serial.println(digitalRead(2));\n  delay(200);\n}",
  show: ["bb", "uno", "btn1", "w_d2", "w_btn_gnd", "w_gnd_uno", "usb"],
  highlight: "btn1",
  readings: { D2: "1 (HIGH, released)" },
  schematic: arduinoButtonDiagrams[3],
};
