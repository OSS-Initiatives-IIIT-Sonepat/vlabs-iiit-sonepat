import { type ComponentInstance } from "@/labs/types";

export const components: ComponentInstance[] = [
  { id: "bb", type: "long-breadboard" },

  // JK flip-flop section
  { id: "jk1", type: "jk-ff", mountedAt: { board: "bb", col: 7, row: "e" } },
  { id: "j_in", type: "input-node", bits: 1, net: "J", mountedAt: { board: "bb", col: 2, row: "a" } },
  { id: "k_in", type: "input-node", bits: 1, net: "K", mountedAt: { board: "bb", col: 2, row: "b" } },
  { id: "clk_jk", type: "clock", period: 1000, mountedAt: { board: "bb", col: 2, row: "c" } },
  { id: "q_jk", type: "output-node", bits: 1, net: "Q_JK", mountedAt: { board: "bb", col: 18, row: "a" } },
  { id: "qb_jk", type: "output-node", bits: 1, net: "QB_JK", mountedAt: { board: "bb", col: 18, row: "b" } },
  { id: "r_jk_q", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 21, row: "c" } },
  { id: "led_jk_q", type: "led", color: "green", mountedAt: { board: "bb", col: 23, row: "c" } },
  { id: "r_jk_qb", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 26, row: "c" } },
  { id: "led_jk_qb", type: "led", color: "yellow", mountedAt: { board: "bb", col: 28, row: "c" } },

  // T flip-flop section: J and K of a second JK flip-flop are tied together as T.
  { id: "jk2", type: "jk-ff", mountedAt: { board: "bb", col: 37, row: "e" } },
  { id: "t_in", type: "input-node", bits: 1, net: "T", mountedAt: { board: "bb", col: 32, row: "a" } },
  { id: "clk_t", type: "clock", period: 1000, mountedAt: { board: "bb", col: 32, row: "c" } },
  { id: "q_t", type: "output-node", bits: 1, net: "Q_T", mountedAt: { board: "bb", col: 48, row: "a" } },
  { id: "qb_t", type: "output-node", bits: 1, net: "QB_T", mountedAt: { board: "bb", col: 48, row: "b" } },
  { id: "r_t_q", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 51, row: "c" } },
  { id: "led_t_q", type: "led", color: "green", mountedAt: { board: "bb", col: 53, row: "c" } },
  { id: "r_t_qb", type: "resistor", ohms: 330, mountedAt: { board: "bb", col: 56, row: "c" } },
  { id: "led_t_qb", type: "led", color: "yellow", mountedAt: { board: "bb", col: 58, row: "c" } },

  // Power rails
  {
    id: "psu",
    type: "dc-jack",
    mountedAt: { board: "bb", col: 1, row: "d" },
    terminals: [
      { board: "bb", rail: "vcc_top", col: 1 },
      { board: "bb", rail: "gnd_top", col: 1 },
    ],
  },

  // JK wiring
  { id: "w_j", type: "wire", color: "red", from: { board: "bb", col: 2, row: "a" }, to: { ic: "jk1", pin: "J" } },
  { id: "w_k", type: "wire", color: "blue", from: { board: "bb", col: 2, row: "b" }, to: { ic: "jk1", pin: "K" } },
  { id: "w_clk_jk", type: "wire", color: "orange", from: { board: "bb", col: 2, row: "c" }, to: { ic: "jk1", pin: "CLK" } },
  { id: "w_jk_q", type: "wire", color: "green", from: { ic: "jk1", pin: "Q" }, to: { board: "bb", col: 18, row: "a" } },
  { id: "w_jk_qb", type: "wire", color: "yellow", from: { ic: "jk1", pin: "QBAR" }, to: { board: "bb", col: 18, row: "b" } },
  { id: "w_jk_led", type: "wire", color: "green", from: { board: "bb", col: 18, row: "a" }, to: { component: "r_jk_q", end: "p1" } },
  { id: "w_jk_rled", type: "wire", color: "green", from: { component: "r_jk_q", end: "p2" }, to: { led: "led_jk_q", end: "anode" } },
  { id: "w_jk_ledb", type: "wire", color: "yellow", from: { board: "bb", col: 18, row: "b" }, to: { component: "r_jk_qb", end: "p1" } },
  { id: "w_jk_rledb", type: "wire", color: "yellow", from: { component: "r_jk_qb", end: "p2" }, to: { led: "led_jk_qb", end: "anode" } },
  { id: "w_jk_gnd1", type: "wire", color: "black", from: { led: "led_jk_q", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 22 } },
  { id: "w_jk_gnd2", type: "wire", color: "black", from: { led: "led_jk_qb", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 27 } },

  // T wiring: T drives both J and K.
  { id: "w_t_j", type: "wire", color: "red", from: { board: "bb", col: 32, row: "a" }, to: { ic: "jk2", pin: "J" } },
  { id: "w_t_k", type: "wire", color: "red", from: { board: "bb", col: 33, row: "a" }, to: { ic: "jk2", pin: "K" } },
  { id: "w_t_tie", type: "wire", color: "red", from: { board: "bb", col: 32, row: "a" }, to: { board: "bb", col: 33, row: "a" } },
  { id: "w_clk_t", type: "wire", color: "orange", from: { board: "bb", col: 32, row: "c" }, to: { ic: "jk2", pin: "CLK" } },
  { id: "w_t_q", type: "wire", color: "green", from: { ic: "jk2", pin: "Q" }, to: { board: "bb", col: 48, row: "a" } },
  { id: "w_t_qb", type: "wire", color: "yellow", from: { ic: "jk2", pin: "QBAR" }, to: { board: "bb", col: 48, row: "b" } },
  { id: "w_t_led", type: "wire", color: "green", from: { board: "bb", col: 48, row: "a" }, to: { component: "r_t_q", end: "p1" } },
  { id: "w_t_rled", type: "wire", color: "green", from: { component: "r_t_q", end: "p2" }, to: { led: "led_t_q", end: "anode" } },
  { id: "w_t_ledb", type: "wire", color: "yellow", from: { board: "bb", col: 48, row: "b" }, to: { component: "r_t_qb", end: "p1" } },
  { id: "w_t_rledb", type: "wire", color: "yellow", from: { component: "r_t_qb", end: "p2" }, to: { led: "led_t_qb", end: "anode" } },
  { id: "w_t_gnd1", type: "wire", color: "black", from: { led: "led_t_q", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 52 } },
  { id: "w_t_gnd2", type: "wire", color: "black", from: { led: "led_t_qb", end: "cathode" }, to: { board: "bb", rail: "gnd_top", col: 57 } },
];
