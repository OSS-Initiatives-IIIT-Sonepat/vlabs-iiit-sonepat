import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LED } from "../components";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "7. First output: an LED on P1.0",
  body: "An 8051 pin is strong when it pulls LOW (about 10 mA) but weak when it is HIGH: a 1 is only an internal pull-up. So wire the LED the 8051 way: from +5 V through a 470 Ω resistor and the LED, into P1.0. Place the resistor in row c from column 34 to 37, the LED's anode in column 37 and its cathode in column 38, a red jumper from column 34 to the + rail and a jumper from column 38 to P1.0. Writing 0 to P1.0 lights the LED.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LED],
  highlight: "led1",
  supplyVoltage: 5,
  schematic: intro8051Diagrams[4],
};
