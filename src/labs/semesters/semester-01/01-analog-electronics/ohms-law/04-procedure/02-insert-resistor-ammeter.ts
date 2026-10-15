import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/ohms-law-schematics";

export const step: SceneProcedureStep = {
  label: "Insert the resistor and connect the ammeter in series.",
  body:
    "Insert the 1 k$\\Omega$ resistor across rows in the breadboard so each lead occupies a different row. " +
    "Connect the ammeter (**DC milliamps** range) in series: " +
    "ammeter (+) → positive rail, ammeter (−) → resistor p1, resistor p2 → negative rail. " +
    "Series connection is essential — the ammeter must carry the full current through the resistor.",
  show: ["bb", "r1"],
  highlight: "r1",
  schematic,
};
