import { type ComponentInstance } from "@/labs/types";

// The DevKitC sits on the right of the breadboard for the whole tour, where it
// sits in the ESP32 experiments, with its USB cable to a 5 V adapter.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "esp", type: "esp32-devkit", side: "right" },
  { id: "usb", type: "usb-power", dev: "esp" },
];
