import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { introPicDiagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "3. The ports: RA to RE",
  body: "The pins are grouped in five ports. PORTA (RA0 to RA5) holds most of the analog inputs AN0 to AN4. PORTB (RB0 to RB7, the top-left of the chip) has interrupt inputs and the programming pins RB6 and RB7. PORTC carries the PWM output CCP1 (RC2), the serial port and the USB data lines. PORTD (RD0 to RD7) is plain I/O, used here for LEDs. PORTE has three more analog inputs. Each pin's direction is set by a TRIS bit: 0 for output, 1 for input.",
  show: [...SUPPLY, ...CHIP],
  highlight: "u1",
  markers: [
    markPin("pic18f4550", "RA0"),
    markPin("pic18f4550", "RB0"),
    markPin("pic18f4550", "RC2"),
    markPin("pic18f4550", "RD0"),
  ],
  schematic: introPicDiagrams[0],
};
