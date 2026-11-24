import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { picCcp1Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Add the LED on RC2/CCP1",
  body: "Place a 330 Ω resistor in row c of the top bank, from column 34 to 37, and the red LED with its anode in column 37 and its cathode in column 38. Run a jumper from RC2/CCP1 (pin 17, column 19) to column 34, row a, and a black jumper from the cathode to the top ground rail.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  schematic: picCcp1Diagrams[3],
};
