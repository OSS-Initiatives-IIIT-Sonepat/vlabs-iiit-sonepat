import { type ComponentInstance } from "@/labs/types";
import {
  SUPPLY_PARTS,
  SYS_8051_PARTS,
  ledChannel,
  ledIds,
  pin,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";

// AT89S52 on the breadboard. P1.0 to P1.3 show the low nibble of the
// 8-bit sequence register.

const LED_PARTS = [0, 1, 2, 3].flatMap((k) =>
  ledChannel(k, pin("u1", `P1.${k}`), undefined, "sink"),
);
/** The four LED channels on P1.0 to P1.3. */
export const LEDS = [0, 1, 2, 3].flatMap(ledIds);

export const components: ComponentInstance[] = [
  ...SUPPLY_PARTS,
  ...SYS_8051_PARTS,
  ...LED_PARTS,
];
