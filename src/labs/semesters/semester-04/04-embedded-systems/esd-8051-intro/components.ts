import { type ComponentInstance } from "@/labs/types";
import {
  SUPPLY_PARTS,
  SYS_8051_PARTS,
  ledChannel,
  pin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";

// The 8051 introduction: an AT89S52 on the breadboard with its minimal
// system, and one LED on P1.0 wired the 8051 way (+5 V, resistor, LED, pin).

const LED_PARTS = ledChannel(
  0,
  pin("u1", "P1.0"),
  { wire: "w_led", r: "r1", led: "led1", k: "w_led_v" },
  "sink",
);
export const LED = ["w_led", "r1", "led1", "w_led_v"];

export const components: ComponentInstance[] = [
  ...SUPPLY_PARTS,
  ...SYS_8051_PARTS,
  ...LED_PARTS,
];
