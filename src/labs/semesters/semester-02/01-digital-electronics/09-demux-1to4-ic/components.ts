import { type ComponentInstance } from "@/labs/types";

/*
 * Layout (30-col breadboard)
 *   cols 2–4  : input tie-points  S0 (red, col 2)  S1 (blue, col 3)  D (purple, col 4)
 *   cols 5–11 : 74HC139 (demux-1to4) at row e, section 1 used
 *               1A = S0, 1B = S1, 1G = D (data), 1Y0..1Y3 = outputs (active LOW)
 *   cols 13–28: four resistor (col N) + LED (col N+2) pairs at N = 13, 17, 21, 25
 * LEDs are sink-wired: VCC -> 330R -> LED anode, LED cathode -> output pin.
 * LED is ON when its output pin is LOW.
 *
 * NOTE: pin names (1A, 1B, 1G, 1Y0..1Y3) follow the 74HC139 datasheet.
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
    id: "dmx1",
    type: "demux-1to4",
    mountedAt: { board: "bb", col: 5, row: "e" },
  },
  {
    id: "r_y0",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 13, row: "c" },
  },
  {
    id: "led_y0",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 15, row: "c" },
  },
  {
    id: "r_y1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 17, row: "c" },
  },
  {
    id: "led_y1",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 19, row: "c" },
  },
  {
    id: "r_y2",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 21, row: "c" },
  },
  {
    id: "led_y2",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 23, row: "c" },
  },
  {
    id: "r_y3",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 25, row: "c" },
  },
  {
    id: "led_y3",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 27, row: "c" },
  },
  {
    id: "w_s0",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 2, row: "a" },
    to: { ic: "dmx1", pin: "1A" },
  },
  {
    id: "w_s1",
    type: "wire",
    color: "blue",
    from: { board: "bb", col: 3, row: "a" },
    to: { ic: "dmx1", pin: "1B" },
  },
  {
    id: "w_d",
    type: "wire",
    color: "purple",
    from: { board: "bb", col: 4, row: "a" },
    to: { ic: "dmx1", pin: "1G" },
  },
  {
    id: "w_vcc_r0",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 13 },
    to: { component: "r_y0", end: "p1" },
  },
  {
    id: "w_r0_led",
    type: "wire",
    color: "orange",
    from: { component: "r_y0", end: "p2" },
    to: { led: "led_y0", end: "anode" },
  },
  {
    id: "w_led0_y",
    type: "wire",
    color: "green",
    from: { led: "led_y0", end: "cathode" },
    to: { ic: "dmx1", pin: "1Y0" },
  },
  {
    id: "w_vcc_r1",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 17 },
    to: { component: "r_y1", end: "p1" },
  },
  {
    id: "w_r1_led",
    type: "wire",
    color: "orange",
    from: { component: "r_y1", end: "p2" },
    to: { led: "led_y1", end: "anode" },
  },
  {
    id: "w_led1_y",
    type: "wire",
    color: "yellow",
    from: { led: "led_y1", end: "cathode" },
    to: { ic: "dmx1", pin: "1Y1" },
  },
  {
    id: "w_vcc_r2",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 21 },
    to: { component: "r_y2", end: "p1" },
  },
  {
    id: "w_r2_led",
    type: "wire",
    color: "orange",
    from: { component: "r_y2", end: "p2" },
    to: { led: "led_y2", end: "anode" },
  },
  {
    id: "w_led2_y",
    type: "wire",
    color: "white",
    from: { led: "led_y2", end: "cathode" },
    to: { ic: "dmx1", pin: "1Y2" },
  },
  {
    id: "w_vcc_r3",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 25 },
    to: { component: "r_y3", end: "p1" },
  },
  {
    id: "w_r3_led",
    type: "wire",
    color: "orange",
    from: { component: "r_y3", end: "p2" },
    to: { led: "led_y3", end: "anode" },
  },
  {
    id: "w_led3_y",
    type: "wire",
    color: "orange",
    from: { led: "led_y3", end: "cathode" },
    to: { ic: "dmx1", pin: "1Y3" },
  },
];
