import { type ComponentInstance } from "@/labs/types";

// Push-button across columns 9 to 11 on row c. Pin D2 is the input, read with
// INPUT_PULLUP, so the pin sits HIGH until the button connects it to ground.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "uno", type: "arduino-uno", side: "right" },
  {
    id: "btn1",
    type: "push-button",
    mountedAt: { board: "bb", col: 10, row: "c" },
  },
  {
    id: "w_d2",
    type: "wire",
    color: "blue",
    from: { dev: "uno", pin: "D2" },
    to: { board: "bb", col: 9, row: "a" },
  },
  {
    id: "w_btn_gnd",
    type: "wire",
    color: "black",
    from: { board: "bb", col: 11, row: "a" },
    to: { board: "bb", rail: "gnd_top", col: 11 },
  },
  {
    id: "w_gnd_uno",
    type: "wire",
    color: "black",
    from: { dev: "uno", pin: "GND" },
    to: { board: "bb", rail: "gnd_top", col: 1 },
  },
  { id: "usb", type: "usb-power", dev: "uno" },
];
