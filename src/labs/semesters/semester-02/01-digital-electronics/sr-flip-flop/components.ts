import { type ComponentInstance } from "@/labs/types";

/*
 * Layout (30-col breadboard)
 *   cols 3–4  : input tie-points  S (red, col 3)  R (blue, col 4)
 *   cols 7–13 : NOR gate 1 (nor1)  Q    = NOR(R, Qbar)
 *   cols 16–22: NOR gate 2 (nor2)  Qbar = NOR(S, Q)
 *   cross-coupling: nor1.Y -> nor2.B   and   nor2.Y -> nor1.B
 *   cols 22–25: R(Q) + LED green (Q)      cols 26–29: R(Qbar) + LED yellow (Qbar)
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
  {
    id: "nor1",
    type: "nor-gate",
    mountedAt: { board: "bb", col: 7, row: "e" },
  },
  {
    id: "nor2",
    type: "nor-gate",
    mountedAt: { board: "bb", col: 16, row: "e" },
  },
  {
    id: "r_q",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 22, row: "c" },
  },
  {
    id: "r_qb",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 26, row: "c" },
  },
  {
    id: "led_q",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 24, row: "c" },
  },
  {
    id: "led_qb",
    type: "led",
    color: "yellow",
    mountedAt: { board: "bb", col: 28, row: "c" },
  },
  {
    id: "w_fb1",
    type: "wire",
    color: "white",
    from: { ic: "nor1", pin: "Y" },
    to: { ic: "nor2", pin: "B" },
  },
  {
    id: "w_fb2",
    type: "wire",
    color: "white",
    from: { ic: "nor2", pin: "Y" },
    to: { ic: "nor1", pin: "B" },
  },
  {
    id: "w_s",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 3, row: "a" },
    to: { ic: "nor2", pin: "A" },
  },
  {
    id: "w_r",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 4, row: "a" },
    to: { ic: "nor1", pin: "A" },
  },
  {
    id: "w_q_r",
    type: "wire",
    color: "green",
    from: { ic: "nor1", pin: "Y" },
    to: { component: "r_q", end: "p1" },
  },
  {
    id: "w_r_led_q",
    type: "wire",
    color: "green",
    from: { component: "r_q", end: "p2" },
    to: { led: "led_q", end: "anode" },
  },
  {
    id: "w_qb_r",
    type: "wire",
    color: "yellow",
    from: { ic: "nor2", pin: "Y" },
    to: { component: "r_qb", end: "p1" },
  },
  {
    id: "w_r_led_qb",
    type: "wire",
    color: "yellow",
    from: { component: "r_qb", end: "p2" },
    to: { led: "led_qb", end: "anode" },
  },
  {
    id: "w_gnd_q",
    type: "wire",
    color: "black",
    from: { led: "led_q", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 1 },
  },
  {
    id: "w_gnd_qb",
    type: "wire",
    color: "black",
    from: { led: "led_qb", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 2 },
  },
];
