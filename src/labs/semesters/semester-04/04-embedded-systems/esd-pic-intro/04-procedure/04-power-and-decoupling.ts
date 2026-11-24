import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
  POWER_PIC,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "4. Power and decoupling",
  body: "The chip has two supply pairs: VDD and VSS on pins 11 and 12 (bottom), and on pins 32 and 31 (top). Wire both: VDD to +5 V, VSS to ground. Put a 100 nF capacitor right across each pair. The chip draws current in short spikes every clock edge; the capacitors supply those spikes locally so the 5 V line stays clean.",
  show: [...SUPPLY, ...CHIP, ...POWER_PIC],
  highlight: "c_dec1",
  markers: [
    markPin("pic18f4550", "VDD"),
    markPin("pic18f4550", "VSS"),
    markPin("pic18f4550", "VDD2"),
    markPin("pic18f4550", "VSS2"),
  ],
  supplyVoltage: 5,
  schematic: introPicDiagrams[1],
};
