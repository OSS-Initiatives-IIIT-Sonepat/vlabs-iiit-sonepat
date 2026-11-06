import { type ComponentInstance } from "@/labs/types";
import {
  chip,
  input,
  lamp,
  link,
  power,
  powers,
  rail,
} from "../../_coa/breadboard";

// Bit 0 of a common bus. A0=1, B0=0, C0=1, D0=0.
// The 74HC139 outputs are active-low, and each 74HC125 turns on when its
// enable pin is low, so the selected buffer is the one that drives the lamp.
const buffers = [
  { id: "ba", col: 4, level: "vcc" as const },
  { id: "bb", col: 12, level: "gnd" as const },
  { id: "bc", col: 20, level: "vcc" as const },
  { id: "bd", col: 28, level: "gnd" as const },
];

export const components: ComponentInstance[] = [
  ...power(),
  ...buffers.flatMap(({ id, col }) => [
    chip(id, "buffer-gate", col),
    ...powers(id, col),
  ]),
  rail("w_d_ba", "ba", "A", "vcc", 6),
  rail("w_d_bb", "bb", "A", "gnd", 7),
  rail("w_d_bc", "bc", "A", "vcc", 9),
  rail("w_d_bd", "bd", "A", "gnd", 11),
  link("w_bus_ab", "ba", "Y", "bb", "Y", "yellow"),
  link("w_bus_bc", "bb", "Y", "bc", "Y", "yellow"),
  link("w_bus_cd", "bc", "Y", "bd", "Y", "yellow"),
  ...lamp("bus", "bd", "Y", 50, "c", "green"),
  chip("dec", "demux-1to4", 38),
  ...powers("dec", 38),
  input("s1", "dec", "b", 2, "blue"),
  input("s0", "dec", "a", 36, "orange"),
  input("e", "dec", "en_bar", 48, "yellow"),
  link("w_y0", "dec", "y0", "ba", "B", "orange"),
  link("w_y1", "dec", "y1", "bb", "B", "orange"),
  link("w_y2", "dec", "y2", "bc", "B", "orange"),
  link("w_y3", "dec", "y3", "bd", "B", "orange"),
];

const ids = (...groups: string[][]) => groups.flat();
const supply = ["bb", "psu", "w_vcc_link", "w_gnd_link"];
const bufs = buffers.flatMap(({ id }) => [id, `w_vcc_${id}`, `w_gnd_${id}`]);
const data = ["w_d_ba", "w_d_bb", "w_d_bc", "w_d_bd"];
const bus = [
  "w_bus_ab",
  "w_bus_bc",
  "w_bus_cd",
  "r_bus",
  "led_bus",
  "w_bus_r",
  "w_bus_led",
  "w_bus_gnd",
];
const decoder = [
  "dec",
  "w_vcc_dec",
  "w_gnd_dec",
  "w_s1_dec",
  "w_s0_dec",
  "w_e_dec",
  "w_y0",
  "w_y1",
  "w_y2",
  "w_y3",
];

const withBus = ids(supply, bufs, data, bus);
const built = ids(withBus, decoder);

export const boardShow: string[][] = [
  supply,
  ids(supply, bufs, data),
  withBus,
  built,
  built,
  built,
  built,
  built,
];
