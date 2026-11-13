import { type ComponentInstance } from "@/labs/types";

// Voltage divider from VDD to VSS, tapped on RA0 (AN0). The LED on RD0 is on
// when the reading is above half scale.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "pic", type: "pic18f4550", side: "right" },
  {
    id: "r_top",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 2, row: "c" },
  },
  {
    id: "r_bot",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 5, row: "c" },
  },
  {
    id: "r1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 12, row: "c" },
  },
  {
    id: "led1",
    type: "led",
    color: "red",
    mountedAt: { board: "bb", col: 15, row: "c" },
  },
  {
    id: "w_vdd",
    type: "wire",
    color: "red",
    from: { dev: "pic", pin: "VDD" },
    to: { board: "bb", rail: "vcc_top", col: 1 },
  },
  {
    id: "w_top",
    type: "wire",
    color: "red",
    from: { board: "bb", rail: "vcc_top", col: 2 },
    to: { component: "r_top", end: "p1" },
  },
  {
    id: "w_ra0",
    type: "wire",
    color: "yellow",
    from: { dev: "pic", pin: "RA0" },
    to: { board: "bb", col: 5, row: "a" },
  },
  {
    id: "w_bot",
    type: "wire",
    color: "black",
    from: { component: "r_bot", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 8 },
  },
  {
    id: "w_vss",
    type: "wire",
    color: "black",
    from: { dev: "pic", pin: "VSS" },
    to: { board: "bb", rail: "gnd_top", col: 1 },
  },
  {
    id: "w_rd0",
    type: "wire",
    color: "orange",
    from: { dev: "pic", pin: "RD0" },
    to: { board: "bb", col: 12, row: "a" },
  },
  {
    id: "w_led_gnd",
    type: "wire",
    color: "black",
    from: { led: "led1", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 16 },
  },
];
