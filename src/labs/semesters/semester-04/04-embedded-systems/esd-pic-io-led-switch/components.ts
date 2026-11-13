import { type ComponentInstance } from "@/labs/types";

// Push-button on RB0 with a 10 kohm pull-down: pressed reads HIGH. RD0 drives
// an LED, so the LED follows the button.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "pic", type: "pic18f4550", side: "right" },
  {
    id: "btn1",
    type: "push-button",
    mountedAt: { board: "bb", col: 10, row: "c" },
  },
  {
    id: "r_pd",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 9, row: "e" },
  },
  {
    id: "r1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 15, row: "c" },
  },
  {
    id: "led1",
    type: "led",
    color: "red",
    mountedAt: { board: "bb", col: 18, row: "c" },
  },
  {
    id: "w_vdd",
    type: "wire",
    color: "red",
    from: { dev: "pic", pin: "VDD" },
    to: { board: "bb", rail: "vcc_top", col: 1 },
  },
  {
    id: "w_vss",
    type: "wire",
    color: "black",
    from: { dev: "pic", pin: "VSS" },
    to: { board: "bb", rail: "gnd_top", col: 2 },
  },
  {
    id: "w_rb0",
    type: "wire",
    color: "blue",
    from: { dev: "pic", pin: "RB0" },
    to: { board: "bb", col: 9, row: "a" },
  },
  {
    id: "w_btn_vdd",
    type: "wire",
    color: "red",
    from: { board: "bb", col: 11, row: "a" },
    to: { board: "bb", rail: "vcc_top", col: 11 },
  },
  {
    id: "w_pd_gnd",
    type: "wire",
    color: "black",
    from: { component: "r_pd", end: "p2" },
    to: { board: "bb", rail: "gnd_top", col: 12 },
  },
  {
    id: "w_rd0",
    type: "wire",
    color: "orange",
    from: { dev: "pic", pin: "RD0" },
    to: { board: "bb", col: 15, row: "a" },
  },
  {
    id: "w_led_gnd",
    type: "wire",
    color: "black",
    from: { led: "led1", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 19 },
  },
];
