import { type ComponentInstance } from "@/labs/types";

/*
 * Layout (30-col breadboard)
 *   cols 2–3  : input tie-points  D (red, col 2)  CLK (blue, col 3)
 *   cols 5–11 : 74HC74 (dff) at row e, section 1 used
 *               pin1 1CLR  pin2 1D  pin3 1CLK  pin4 1PRE  pin5 1Q  pin6 1QN  pin7 GND
 *   1CLR and 1PRE are active LOW and are tied to VCC (inactive)
 *   cols 15–18: R(Q) + green LED (Q)        cols 20–23: R(Qbar) + yellow LED (Qbar)
 *
 * NOTE: pin names (1CLR, 1D, 1CLK, 1PRE, 1Q, 1QN) follow the 74HC74 datasheet.
 */
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "a" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 5 },
      { board: "bb", rail: "gnd_top", col: 5 },
    ],
  },
  { id: "dff1", type: "dff", bits: 1, initial: "0", mountedAt: { board: "bb", col: 5, row: "e" } },
  { id: "r_q", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 15, row: "c" } },
  { id: "led_q", type: "led", color: "green", mountedAt: { board: "bb", col: 17, row: "c" } },
  { id: "r_qn", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 20, row: "c" } },
  { id: "led_qn", type: "led", color: "yellow", mountedAt: { board: "bb", col: 22, row: "c" } },
  { id: "w_clr", type: "wire", color: "white", from: { ic: "dff1", pin: "1CLR" }, to: { board: "bb", rail: "vcc_top", col: 5 } },
  { id: "w_pre", type: "wire", color: "white", from: { ic: "dff1", pin: "1PRE" }, to: { board: "bb", rail: "vcc_top", col: 8 } },
  { id: "w_d", type: "wire", color: "red", from: { board: "bb", col: 2, row: "a" }, to: { ic: "dff1", pin: "1D" } },
  { id: "w_clk", type: "wire", color: "blue", from: { board: "bb", col: 3, row: "a" }, to: { ic: "dff1", pin: "1CLK" } },
  { id: "w_q_r", type: "wire", color: "green", from: { ic: "dff1", pin: "1Q" }, to: { component: "r_q", end: "p1" } },
  { id: "w_r_led_q", type: "wire", color: "green", from: { component: "r_q", end: "p2" }, to: { led: "led_q", end: "anode" } },
  { id: "w_qn_r", type: "wire", color: "yellow", from: { ic: "dff1", pin: "1QN" }, to: { component: "r_qn", end: "p1" } },
  { id: "w_r_led_qn", type: "wire", color: "yellow", from: { component: "r_qn", end: "p2" }, to: { led: "led_qn", end: "anode" } },
  { id: "w_gnd_q", type: "wire", color: "black", from: { led: "led_q", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 1 } },
  { id: "w_gnd_qn", type: "wire", color: "black", from: { led: "led_qn", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 2 } },
];
