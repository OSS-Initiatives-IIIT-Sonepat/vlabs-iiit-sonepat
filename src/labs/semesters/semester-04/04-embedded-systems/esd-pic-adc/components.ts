import { type ComponentInstance } from "@/labs/types";
import {
  SUPPLY_PARTS,
  SYS_PIC_PARTS,
  ledChannel,
  pin,
  tie,
  rail,
  wire,
  resistor,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";

// PIC18F4550 on the breadboard. A 10 kΩ / 10 kΩ divider feeds AN0 (RA0);
// RD0 lights an LED when the reading is above half scale.

const DIVIDER_PARTS: ComponentInstance[] = [
  resistor("r_top", 10000, 42, "h"),
  wire("w_div_v", "red", tie(42, "g"), rail("vcc_bot", 42)),
  resistor("r_bot", 10000, 45, "i"),
  wire("w_div_g", "black", tie(48, "g"), rail("gnd_bot", 48)),
  wire("w_an0", "yellow", tie(45, "g"), pin("u1", "RA0")),
];
const LED_PARTS = ledChannel(0, pin("u1", "RD0"), {
  wire: "w_led",
  r: "r1",
  led: "led1",
  k: "w_led_gnd",
});
export const DIVIDER = DIVIDER_PARTS.map((p) => p.id);
export const LED = ["w_led", "r1", "led1", "w_led_gnd"];

export const components: ComponentInstance[] = [
  ...SUPPLY_PARTS,
  ...SYS_PIC_PARTS,
  ...DIVIDER_PARTS,
  ...LED_PARTS,
];
