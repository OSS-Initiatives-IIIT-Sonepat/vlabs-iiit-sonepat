import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
  POWER_PIC,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "5. The clock: internal oscillator",
  body: "Unlike the 8051, the PIC18F4550 has a usable oscillator inside. Its configuration selects the internal oscillator, and the OSCCON register picks its speed: 0x70 gives 8 MHz. So OSC1 and OSC2 (pins 13 and 14) stay unconnected and no crystal is needed. One instruction takes 4 clock periods, 0.5 µs at 8 MHz. A crystal is only needed for accurate timing, for example for USB.",
  show: [...SUPPLY, ...CHIP, ...POWER_PIC],
  highlight: "u1",
  markers: [markPin("pic18f4550", "OSC1"), markPin("pic18f4550", "OSC2")],
  supplyVoltage: 5,
  schematic: introPicDiagrams[1],
};
