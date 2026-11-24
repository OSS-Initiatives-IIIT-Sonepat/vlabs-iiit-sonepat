import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { ioPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the minimal system",
  body: "Wire the parts every PIC18F4550 needs (the PIC18 introduction explains each one). VDD (pins 11 and 32) go to +5 V and VSS (pins 12 and 31) to ground, with a 100 nF capacitor across each pair, right at the pins. MCLR (pin 1) is pulled up to +5 V through 10 kΩ, so the chip is not held in reset. The internal oscillator is the clock, so no crystal is needed. Switch the supply on.",
  show: [...SUPPLY, ...SYSTEM_PIC],
  highlight: "c_dec1",
  supplyVoltage: 5,
  schematic: ioPicDiagrams[2],
};
