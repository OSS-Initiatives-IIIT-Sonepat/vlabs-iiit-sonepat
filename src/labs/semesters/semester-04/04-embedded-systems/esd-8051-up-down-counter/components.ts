import { type ComponentInstance } from "@/labs/types";
import {
  SUPPLY_PARTS,
  SYS_8051_PARTS,
  ledChannel,
  ledIds,
  pin,
  tie,
  rail,
  wire,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";

// AT89S52 on the breadboard, four LEDs on P1.0 to P1.3 and a direction
// button from P3.2 to ground (pressed = count down).

const LED_PARTS = [0, 1, 2, 3].flatMap((k) =>
  ledChannel(k, pin("u1", `P1.${k}`), undefined, "sink"),
);
/** The four LED channels on P1.0 to P1.3. */
export const LEDS = [0, 1, 2, 3].flatMap(ledIds);

const BUTTON_PARTS: ComponentInstance[] = [
  {
    id: "btn1",
    type: "push-button",
    mountedAt: { board: "bb", col: 57, row: "c" },
  },
  wire("w_p32", "purple", pin("u1", "P3.2"), tie(56, "a")),
  wire("w_btn_gnd", "black", tie(58, "a"), rail("gnd_top", 58)),
];
/** The direction button on P3.2. */
export const BUTTON = ["btn1", "w_p32", "w_btn_gnd"];

export const components: ComponentInstance[] = [
  ...SUPPLY_PARTS,
  ...SYS_8051_PARTS,
  ...LED_PARTS,
  ...BUTTON_PARTS,
];
