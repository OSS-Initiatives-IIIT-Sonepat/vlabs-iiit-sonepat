import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
  POWER_8051,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "4. Power: VCC, GND and EA",
  body: "VCC is pin 40 and GND is pin 20, at opposite corners. Wire pin 40 to the top + rail and pin 20 to the bottom − rail. EA (pin 31) chooses where the program comes from: tied HIGH, the chip runs the program stored in its own flash memory, so wire it to +5 V too. With EA left LOW, the 8051 would look for the program in an external memory chip and never run yours.",
  show: [...SUPPLY, ...CHIP, ...POWER_8051],
  highlight: "w_ea",
  markers: [
    markPin("at89s52", "VCC"),
    markPin("at89s52", "EA"),
    markPin("at89s52", "GND"),
  ],
  supplyVoltage: 5,
  schematic: intro8051Diagrams[1],
};
