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

// PIC18F4550 on the breadboard. A push-button from RB0 to +5 V with a
// 10 kΩ pull-down (pressed reads HIGH); RD0 drives an LED that follows it.

const INPUT_PARTS: ComponentInstance[] = [
  {
    id: "btn1",
    type: "push-button",
    mountedAt: { board: "bb", col: 47, row: "c" },
  },
  wire("w_rb0", "blue", pin("u1", "RB0"), tie(46, "a")),
  wire("w_btn_vdd", "red", tie(48, "a"), rail("vcc_top", 48)),
  resistor("r_pd", 10000, 43, "c"),
  wire("w_pd_gnd", "black", tie(43, "a"), rail("gnd_top", 43)),
];
const LED_PARTS = ledChannel(0, pin("u1", "RD0"), {
  wire: "w_led",
  r: "r1",
  led: "led1",
  k: "w_led_gnd",
});
/** Button and pull-down on RB0. */
export const INPUT = INPUT_PARTS.map((p) => p.id);
export const LED = ["w_led", "r1", "led1", "w_led_gnd"];

export const components: ComponentInstance[] = [
  ...SUPPLY_PARTS,
  ...SYS_PIC_PARTS,
  ...INPUT_PARTS,
  ...LED_PARTS,
];
