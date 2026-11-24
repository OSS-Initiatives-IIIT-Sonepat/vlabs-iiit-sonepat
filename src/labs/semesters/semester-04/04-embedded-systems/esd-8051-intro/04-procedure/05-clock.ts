import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
  POWER_8051,
  CLOCK_8051,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "5. The clock: crystal and 22 pF capacitors",
  body: "The 8051 has an oscillator inside, but it needs a quartz crystal to set its frequency. Put the 11.0592 MHz crystal across XTAL2 and XTAL1 (pins 18 and 19, columns 20 and 21), and a 22 pF capacitor from each of those pins to ground: one sits between columns 21 and 22 (pin 20 is ground), the other reaches ground through a short jumper. One machine cycle is 12 clock periods, about 1.085 µs. 11.0592 MHz is chosen because it divides exactly into the standard serial speeds such as 9600 baud.",
  show: [...SUPPLY, ...CHIP, ...POWER_8051, ...CLOCK_8051],
  highlight: "x1",
  markers: [markPin("at89s52", "XTAL1"), markPin("at89s52", "XTAL2")],
  supplyVoltage: 5,
  schematic: intro8051Diagrams[2],
};
