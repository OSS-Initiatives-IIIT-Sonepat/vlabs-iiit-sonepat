import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_PIC,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "6. MCLR: hold it HIGH",
  body: "MCLR (pin 1) is the reset pin, active LOW: while it is LOW the chip is held in reset. Pull it up to +5 V through a 10 kΩ resistor: run a jumper from MCLR to column 27, place the resistor from 27 to 30 and take column 30 to the + rail. The resistor (rather than a plain wire) lets the PICkit drive MCLR to the programming voltage, and a button from MCLR to ground can be added as a reset switch.",
  show: [...SUPPLY, ...SYSTEM_PIC],
  highlight: "r_mclr",
  markers: [markPin("pic18f4550", "MCLR")],
  supplyVoltage: 5,
  schematic: introPicDiagrams[2],
};
