import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { upDown8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the minimal system",
  body: "Wire the parts every 8051 needs before it can run (the 8051 introduction explains each one). VCC (pin 40) and EA (pin 31) go to +5 V and GND (pin 20) to ground. The 11.0592 MHz crystal sits across XTAL2 and XTAL1 (pins 18 and 19, columns 20 and 21), with a 22 pF capacitor from each to ground. RST (pin 9) gets the power-on reset: 10 µF to +5 V and 10 kΩ to ground. Switch the supply on.",
  show: [...SUPPLY, ...SYSTEM_8051],
  highlight: "x1",
  supplyVoltage: 5,
  schematic: upDown8051Diagrams[3],
};
