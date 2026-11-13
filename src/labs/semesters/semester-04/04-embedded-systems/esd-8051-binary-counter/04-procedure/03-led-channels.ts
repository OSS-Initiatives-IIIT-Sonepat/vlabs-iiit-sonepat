import { type SceneProcedureStep } from "@/labs/experiments/types";
import {
  SUPPLY,
  SYSTEM_8051,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";
import { LEDS } from "../components";
import { leds8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the four LED channels",
  body: "Build four LED channels in the top bank, wired the 8051 way: +5 V, a 470 Ω resistor, the LED, then the port pin. Place each resistor in row c and the LED with its anode (long leg) at the resistor's right leg. A red jumper takes each resistor's free end to the top + rail, and jumpers bring the cathodes to P1.0 to P1.3 (pins 1 to 4, columns 3 to 6). An LED lights when its pin is LOW: an 8051 pin sinks about 10 mA, but its HIGH level is only a weak pull-up. P1.0 drives LED0, the least significant bit.",
  show: [...SUPPLY, ...SYSTEM_8051, ...LEDS],
  highlight: "led0",
  supplyVoltage: 5,
  schematic: leds8051Diagrams[4],
};
