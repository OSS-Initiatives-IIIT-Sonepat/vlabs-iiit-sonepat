import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { ADC } from "../components";
import { adc8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Set up the board and seat both chips",
  body: "Place the long breadboard with the 5 V bench supply behind it, and the two jumpers that carry the rails to the bottom of the board. Seat the AT89S52 across the centre gap with pin 1 (P1.0) in column 3. Seat the ADC0804 the same way, notch to the left, with pin 1 (CS) in column 36: it is a narrow chip, so its legs sit in rows e and f.",
  show: [...SUPPLY, ...CHIP, ...ADC],
  highlight: "u2",
  schematic: adc8051Diagrams[0],
};
