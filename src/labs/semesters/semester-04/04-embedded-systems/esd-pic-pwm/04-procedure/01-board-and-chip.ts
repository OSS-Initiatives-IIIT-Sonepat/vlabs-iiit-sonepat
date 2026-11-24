import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { picCcp1Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Set up the board and seat the PIC18F4550",
  body: "Place the long breadboard with the 5 V bench supply behind it: red lead to the top + rail, black lead to the top − rail. Two jumpers at the right end carry both rails to the bottom of the board. Seat the PIC18F4550 across the centre gap with its notch to the left. Pin 1 (MCLR) is then in column 3, row g, and the 40 legs fill columns 3 to 22 in rows d and g. The sticker on the chip names every pin.",
  show: [...SUPPLY, ...CHIP],
  highlight: "u1",
  schematic: picCcp1Diagrams[0],
};
