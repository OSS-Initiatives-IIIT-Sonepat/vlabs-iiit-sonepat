import { type SceneProcedureStep } from "@/labs/experiments/types";
import { arduinoAnalogDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/diagrams";

export const step: SceneProcedureStep = {
  label: "Read A0",
  body: "Upload this sketch and open the Serial Monitor at 9600 baud:\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  int raw = analogRead(A0);\n  float volts = raw * 5.0 / 1023.0;\n  Serial.println(volts);\n  delay(500);\n}\nThe printed value is about 2.5. Multiply by 1023 / 5 to get the raw count, about 512.",
  show: [
    "bb",
    "uno",
    "r1",
    "r2",
    "w_5v_uno",
    "w_5v_r1",
    "w_a0",
    "w_r2_gnd",
    "w_gnd_uno",
  ],
  highlight: "w_a0",
  readings: { A0: "512 (about 2.5 V)" },
  schematic: arduinoAnalogDiagrams[4],
};
