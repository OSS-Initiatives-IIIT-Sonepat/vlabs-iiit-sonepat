import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { ADC, DIVIDER, ADC_POWER, BUS } from "../components";
import { adc8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Wire the control lines and the data bus",
  body: "Connect RD (pin 2) to P3.7, WR (pin 3) to P3.6 and INTR (pin 5) to P3.2. Then connect the eight data pins DB0 to DB7 (pins 18 down to 11) to P1.0 to P1.7, one jumper each. Check each one against the stickers on both chips before you go on.",
  show: [...SUPPLY, ...ADC, ...SYSTEM_8051, ...DIVIDER, ...ADC_POWER, ...BUS],
  highlight: "w_intr",
  supplyVoltage: 5,
  schematic: adc8051Diagrams[4],
};
