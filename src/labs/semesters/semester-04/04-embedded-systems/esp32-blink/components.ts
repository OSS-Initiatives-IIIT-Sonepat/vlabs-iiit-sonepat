import { type ComponentInstance } from "@/labs/types";

// ESP32 DevKit on the right. GPIO2 drives the LED through a 330 ohm resistor.
// GPIO2 is the pin marked S2 on the front row of the ESP32-DevKitC.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "esp", type: "esp32-devkit", side: "right" },
  {
    id: "r1",
    type: "resistor",
    ohms: 330,
    mountedAt: { board: "bb", col: 3, row: "c" },
  },
  {
    id: "led1",
    type: "led",
    color: "green",
    mountedAt: { board: "bb", col: 6, row: "c" },
  },
  {
    id: "w_gpio2",
    type: "wire",
    color: "orange",
    from: { dev: "esp", pin: "GPIO2" },
    to: { board: "bb", col: 3, row: "a" },
  },
  {
    id: "w_gnd_esp",
    type: "wire",
    color: "black",
    from: { dev: "esp", pin: "GND" },
    to: { board: "bb", rail: "gnd_top", col: 1 },
  },
  {
    id: "w_led_gnd",
    type: "wire",
    color: "black",
    from: { led: "led1", end: "cathode" },
    to: { board: "bb", rail: "gnd_top", col: 7 },
  },
  { id: "usb", type: "usb-power", dev: "esp" },
];
