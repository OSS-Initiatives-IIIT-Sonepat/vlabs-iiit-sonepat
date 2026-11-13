import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { INPUT } from "../components";
import { ioPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Add the button and its pull-down",
  body: "Push the button across row c at columns 46 to 48. Place the 10 kΩ resistor in row c from column 43 to 46, so it shares column 46 with the button, and ground column 43. Run a blue jumper from RB0 (pin 33, column 10, top row) to column 46, and a red jumper from the button's other leg (column 48) to the top + rail. With the button open, the pull-down holds RB0 at 0 V; pressed, the button connects it to 5 V.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...INPUT],
  highlight: "btn1",
  supplyVoltage: 5,
  readings: { RB0: "LOW (pulled down)" },
  schematic: ioPicDiagrams[3],
};
