import { type ComponentInstance } from "@/labs/types";

// Arduino Uno on the right of the breadboard. The LED sits in column 6 with
// its anode on the same strip as the resistor's far end, and its cathode in
// column 7 going to the ground rail.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "uno", type: "arduino-uno", side: "right" },
  { id: "r1", type: "resistor", ohms: 220, mountedAt: { board: "bb", col: 3, row: "c" } },
  { id: "led1", type: "led", color: "red", mountedAt: { board: "bb", col: 6, row: "c" } },
  { id: "w_d13", type: "wire", color: "orange", from: { dev: "uno", pin: "D13" }, to: { board: "bb", col: 3, row: "a" } },
  { id: "w_gnd_uno", type: "wire", color: "black", from: { dev: "uno", pin: "GND" }, to: { board: "bb", rail: "gnd_top", col: 1 } },
  { id: "w_led_gnd", type: "wire", color: "black", from: { led: "led1", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 7 } },
];
