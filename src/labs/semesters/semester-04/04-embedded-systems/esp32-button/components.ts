import { type ComponentInstance } from "@/labs/types";

// Push-button across columns 9 to 11. GPIO4 is the input. INPUT_PULLUP holds
// it HIGH until the button joins it to ground. Every input is read at 3.3 V.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "esp", type: "esp32-devkit", side: "right" },
  { id: "btn1", type: "push-button", mountedAt: { board: "bb", col: 10, row: "c" } },
  { id: "w_gpio4", type: "wire", color: "blue", from: { dev: "esp", pin: "GPIO4" }, to: { board: "bb", col: 9, row: "a" } },
  { id: "w_btn_gnd", type: "wire", color: "black", from: { board: "bb", col: 11, row: "a" }, to: { board: "bb", rail: "gnd_top", col: 11 } },
  { id: "w_gnd_esp", type: "wire", color: "black", from: { dev: "esp", pin: "GND" }, to: { board: "bb", rail: "gnd_top", col: 1 } },
];
