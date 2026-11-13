import { type ComponentInstance } from "@/labs/types";

// PIC18F4550 trainer on the right. RD0 drives the LED through 330 ohm.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "pic", type: "pic18f4550", side: "right" },
  {
    id: "r1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 3, row: "c" },
  },
  {
    id: "led1",
    type: "led",
    color: "red",
    mountedAt: { board: "bb", col: 6, row: "c" },
  },
  {
    id: "w_vdd",
    type: "wire",
    color: "red",
    from: { dev: "pic", pin: "VDD" },
    to: { board: "bb", rail: "vcc_top", col: 1 },
  },
  {
    id: "w_rd0",
    type: "wire",
    color: "orange",
    from: { dev: "pic", pin: "RD0" },
    to: { board: "bb", col: 3, row: "a" },
  },
  {
    id: "w_vss",
    type: "wire",
    color: "black",
    from: { dev: "pic", pin: "VSS" },
    to: { board: "bb", rail: "gnd_top", col: 2 },
  },
  {
    id: "w_led_gnd",
    type: "wire",
    color: "black",
    from: { led: "led1", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 7 },
  },
];
