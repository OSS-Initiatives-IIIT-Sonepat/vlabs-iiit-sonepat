import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the diode and series resistor.",
  body: "Place the 1N4148 diode and the 1 kΩ series resistor on the breadboard as shown. Identify the diode anode and cathode before making the connections.",
  show: ["bb", "d1", "r1"],
  highlight: "d1",
};
