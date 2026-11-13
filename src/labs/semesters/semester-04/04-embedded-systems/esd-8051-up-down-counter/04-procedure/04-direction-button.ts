import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LEDS, BUTTON } from "../components";
import { upDown8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Add the direction button",
  body: "Push the button across row c at columns 56 to 58. Run a purple jumper from P3.2 (pin 12, column 14) to column 56, row a, and a black jumper from the other leg (column 58) to the top ground rail. No resistor is needed: the 8051's port pins have internal pull-ups, so P3.2 reads HIGH until the button pulls it to ground.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LEDS, ...BUTTON],
  highlight: "btn1",
  supplyVoltage: 5,
  schematic: upDown8051Diagrams[5],
};
