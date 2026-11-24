import { type ComponentInstance } from "@/labs/types";
import {
  SUPPLY_PARTS,
  SYS_PIC_PARTS,
  ledChannel,
  pin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";

// The PIC18F4550 introduction: the chip on the breadboard with its minimal
// system, and one LED on RD0.

const LED_PARTS = ledChannel(0, pin("u1", "RD0"), {
  wire: "w_led",
  r: "r1",
  led: "led1",
  k: "w_led_gnd",
});
export const LED = ["w_led", "r1", "led1", "w_led_gnd"];

export const components: ComponentInstance[] = [
  ...SUPPLY_PARTS,
  ...SYS_PIC_PARTS,
  ...LED_PARTS,
];
