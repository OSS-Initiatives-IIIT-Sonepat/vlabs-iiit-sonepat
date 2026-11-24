import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  CHIP,
  markPin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { intro8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "3. The four ports",
  body: "32 of the 40 pins are I/O, in four 8-bit ports. P1 (pins 1 to 8) is a plain I/O port: the experiments use it for LEDs and data. P3 (pins 10 to 17) is I/O too, but each pin has a second job: RXD and TXD for the serial port, INT0 and INT1 for interrupts, T0 and T1 for the counters, WR and RD for external memory. P2 (pins 21 to 28) and P0 (pins 39 down to 32) carry the address and data bus when the chip uses external memory. P0 has no internal pull-ups, so as plain outputs its pins need external ones.",
  show: [...SUPPLY, ...CHIP],
  highlight: "u1",
  markers: [
    markPin("at89s52", "P1.0"),
    markPin("at89s52", "P3.0"),
    markPin("at89s52", "P2.0"),
    markPin("at89s52", "P0.0"),
  ],
  schematic: intro8051Diagrams[0],
};
