import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "2. Seat the chip: notch and pin 1",
  body: "The AT89S52 is a 40-pin 8051 in a DIP package. Hold it with the half-moon notch to the left: pin 1 is the bottom-left leg, next to the dot. The numbers run anticlockwise: 1 to 20 along the bottom from left to right, then 21 to 40 along the top from right to left, so pin 40 sits right above pin 1. Press it across the centre gap with pin 1 in column 3. Its legs land in rows d and g, which leaves three free holes in every column for wires.",
  show: [...SUPPLY, ...CHIP],
  highlight: "u1",
  markers: [markPin("at89s52", "P1.0")],
  schematic: intro8051Diagrams[0],
};
