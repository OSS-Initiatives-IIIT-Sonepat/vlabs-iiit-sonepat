import { type ComponentInstance } from "@/labs/types";

// The CCP1 output on RC2 drives the LED through 330 ohm. The LED brightness
// follows the duty cycle set in CCPR1L.
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
    id: "w_rc2",
    type: "wire",
    color: "purple",
    from: { dev: "pic", pin: "RC2" },
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
