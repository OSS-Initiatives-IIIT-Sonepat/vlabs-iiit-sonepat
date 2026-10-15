import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/zener-voltage-regulator-schematics";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and connect the DC power supply.",
  body: "Place the breadboard on the bench. Connect the positive (+) terminal of the variable DC power supply to the positive top rail and the negative (-) terminal to the ground top rail. Keep the supply switched off and the output voltage at 0 V while you build the circuit.",
  show: ["bb", "psu"],
  highlight: "psu",
  supplyVoltage: 0,
  schematic,
};
