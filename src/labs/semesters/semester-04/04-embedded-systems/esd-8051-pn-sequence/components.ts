import { type ComponentInstance } from "@/labs/types";

// Same four LED channels as the binary counter. P1.0 to P1.3 show the low
// nibble of the 8-bit sequence register.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "mcu", type: "mcu-8051", side: "right" },
  { id: "r0", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 2, row: "c" } },
  { id: "led0", type: "led", color: "red", mountedAt: { board: "bb", col: 5, row: "c" } },
  { id: "r1", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 7, row: "c" } },
  { id: "led1", type: "led", color: "yellow", mountedAt: { board: "bb", col: 10, row: "c" } },
  { id: "r2", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 12, row: "c" } },
  { id: "led2", type: "led", color: "green", mountedAt: { board: "bb", col: 15, row: "c" } },
  { id: "r3", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 17, row: "c" } },
  { id: "led3", type: "led", color: "blue", mountedAt: { board: "bb", col: 20, row: "c" } },
  { id: "w_vcc", type: "wire", color: "red", from: { dev: "mcu", pin: "VCC" }, to: { board: "bb", rail: "vcc_top", col: 1 } },
  { id: "w_gnd", type: "wire", color: "black", from: { dev: "mcu", pin: "GND" }, to: { board: "bb", rail: "gnd_top", col: 1 } },
  { id: "w_rst", type: "wire", color: "black", from: { dev: "mcu", pin: "RST" }, to: { board: "bb", rail: "gnd_top", col: 2 } },
  { id: "w_p10", type: "wire", color: "orange", from: { dev: "mcu", pin: "P1.0" }, to: { board: "bb", col: 2, row: "a" } },
  { id: "w_p11", type: "wire", color: "yellow", from: { dev: "mcu", pin: "P1.1" }, to: { board: "bb", col: 7, row: "a" } },
  { id: "w_p12", type: "wire", color: "green", from: { dev: "mcu", pin: "P1.2" }, to: { board: "bb", col: 12, row: "a" } },
  { id: "w_p13", type: "wire", color: "blue", from: { dev: "mcu", pin: "P1.3" }, to: { board: "bb", col: 17, row: "a" } },
  { id: "w_k0", type: "wire", color: "black", from: { led: "led0", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 6 } },
  { id: "w_k1", type: "wire", color: "black", from: { led: "led1", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 11 } },
  { id: "w_k2", type: "wire", color: "black", from: { led: "led2", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 16 } },
  { id: "w_k3", type: "wire", color: "black", from: { led: "led3", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 21 } },
];
