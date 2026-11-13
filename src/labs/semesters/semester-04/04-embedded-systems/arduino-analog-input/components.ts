import { type ComponentInstance } from "@/labs/types";

// Two 10 kohm resistors form a divider from the 5 V pin to ground. The middle
// point (column 5) is the voltage read on analog pin A0. With equal resistors
// the middle sits at 2.5 V, so analogRead() returns about 512.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "uno", type: "arduino-uno", side: "right" },
  { id: "r1", type: "resistor", ohms: 10000, mountedAt: { board: "bb", col: 2, row: "c" } },
  { id: "r2", type: "resistor", ohms: 10000, mountedAt: { board: "bb", col: 5, row: "c" } },
  { id: "w_5v_uno", type: "wire", color: "red", from: { dev: "uno", pin: "5V" }, to: { board: "bb", rail: "vcc_top", col: 2 } },
  { id: "w_5v_r1", type: "wire", color: "red", from: { board: "bb", rail: "vcc_top", col: 2 }, to: { component: "r1", end: "p1" } },
  { id: "w_a0", type: "wire", color: "yellow", from: { dev: "uno", pin: "A0" }, to: { board: "bb", col: 5, row: "a" } },
  { id: "w_r2_gnd", type: "wire", color: "black", from: { component: "r2", end: "p2" }, to: { board: "bb", rail: "gnd_top", col: 8 } },
  { id: "w_gnd_uno", type: "wire", color: "black", from: { dev: "uno", pin: "GND" }, to: { board: "bb", rail: "gnd_top", col: 1 } },
];
