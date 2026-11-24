import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "2. Seat the chip: notch and pin 1",
  body: "The PIC18F4550 is a 40-pin DIP. With the notch to the left, pin 1 (MCLR) is the bottom-left leg, and the numbers run anticlockwise: 1 to 20 along the bottom, 21 to 40 back along the top. Press it across the centre gap with pin 1 in column 3. Its legs land in rows d and g, leaving three free holes in every column for wires.",
  show: [...SUPPLY, ...CHIP],
  highlight: "u1",
  markers: [markPin("pic18f4550", "MCLR")],
  schematic: introPicDiagrams[0],
};
