import { type ComponentInstance } from "@/labs/types";

/*
 * Layout (30-col breadboard)
 *   cols 2–3  : select tie-points  S0 (red, col 2)  S1 (blue, col 3)
 *   cols 8–14 : 74HC153 (mux-4to1) at row e
 *   cols 18–21: resistor (col 18) + LED (col 20)
 * Data inputs are hard-wired from the rails: I0=0, I1=1, I2=1, I3=0  (Y = S1 XOR S0)
 *
 * NOTE: pin names for mux-4to1 (1C0..1C3, S0, S1, 1G, 1Y) follow the 74HC153 datasheet.
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
    id: "mux1",
    type: "mux-4to1",
    mountedAt: { board: "bb", col: 8, row: "e" },
  },

  // output stage
  {
    id: "r_y",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 18, row: "c" },
  },
  {
    id: "led_y",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 20, row: "c" },
  },

  // IC power
  {
    id: "w_vcc",
    type: "wire",
    color: "red",
    from: { ic: "mux1", pin: "VCC" },
    to: { board: "bb", rail: "vcc_top", col: 8 },
  },
  {
    id: "w_gnd",
    type: "wire",
    color: "black",
    from: { ic: "mux1", pin: "GND" },
    to: { board: "bb", rail: "gnd_top", col: 15 },
  },

  // enable tied LOW
  {
    id: "w_en",
    type: "wire",
    color: "black",
    from: { ic: "mux1", pin: "1G" },
    to: { board: "bb", rail: "gnd_top", col: 8 },
  },

  // data inputs
  {
    id: "w_i0",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "gnd_top", col: 10 },
    to: { ic: "mux1", pin: "1C0" },
  },
  {
    id: "w_i1",
    type: "wire",
    color: "white",
    from: { board: "bb", rail: "vcc_top", col: 11 },
    to: { ic: "mux1", pin: "1C1" },
  },
  {
    id: "w_i2",
    type: "wire",
    color: "white",
    from: { board: "bb", rail: "vcc_top", col: 12 },
    to: { ic: "mux1", pin: "1C2" },
  },
  {
    id: "w_i3",
    type: "wire",
    color: "black",
    from: { board: "bb", rail: "gnd_top", col: 13 },
    to: { ic: "mux1", pin: "1C3" },
  },

  // select lines
  {
    id: "w_s0",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 2, row: "a" },
    to: { ic: "mux1", pin: "S0" },
  },
  {
    id: "w_s1",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 3, row: "a" },
    to: { ic: "mux1", pin: "S1" },
  },

  // output
  {
    id: "w_y_r",
    type: "wire",
    color: "green",
    from: { ic: "mux1", pin: "1Y" },
    to: { component: "r_y", end: "p1" },
  },
  {
    id: "w_r_led",
    type: "wire",
    color: "green",
    from: { component: "r_y", end: "p2" },
    to: { led: "led_y", end: "anode" },
  },
  {
    id: "w_gnd_led",
    type: "wire",
    color: "black",
    from: { led: "led_y", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 1 },
  },
];
