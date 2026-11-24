import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { DIVIDER, LED } from "../components";
import { adcPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Add the threshold LED on RD0",
  body: "Place a 330 Ω resistor in row c of the top bank, from column 34 to 37, and the red LED with its anode (long leg) in column 37 and its cathode in column 38. Run an orange jumper from RD0 (pin 19, column 21) to column 34, row a, and a black jumper from the cathode to the top ground rail.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...DIVIDER, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  schematic: adcPicDiagrams[4],
};
