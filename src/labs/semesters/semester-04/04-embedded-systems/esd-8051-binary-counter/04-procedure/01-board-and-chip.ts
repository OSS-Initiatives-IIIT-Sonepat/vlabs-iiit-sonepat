import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { leds8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Set up the board and seat the 8051",
  body: "Place the long breadboard with the 5 V bench supply behind it: its red lead goes to the top + rail and its black lead to the top − rail. Two jumpers at the right end carry both rails to the bottom of the board. Seat the AT89S52 across the centre gap with its notch to the left. Pin 1 (P1.0) is then in column 3, row g, and the 40 legs fill columns 3 to 22 in rows d and g. The sticker on the chip names every pin.",
  show: [...SUPPLY, ...CHIP],
  highlight: "u1",
  schematic: leds8051Diagrams[0],
};
