import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "7. First output: an LED on RD0",
  body: "A PIC pin can source or sink up to 25 mA, so an LED can hang from the pin to ground. Place a 330 Ω resistor in row c from column 34 to 37 and the LED with its anode in column 37 and its cathode in column 38. Run an orange jumper from RD0 (pin 19, column 21) to column 34 and a black jumper from the cathode to the ground rail. Writing 1 to RD0 lights the LED.",
  show: [...SUPPLY, ...SYSTEM_PIC, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  schematic: introPicDiagrams[3],
};
