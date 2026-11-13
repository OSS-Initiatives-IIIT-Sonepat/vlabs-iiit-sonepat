import { type ComponentInstance } from "@/labs/types";

// The Uno sits on the right of the breadboard for the whole tour, so every
// pointer lands on the same board the student sees in later experiments.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "uno", type: "arduino-uno", side: "right" },
  { id: "usb", type: "usb-power", dev: "uno" },
  { id: "bat", type: "battery-9v", dev: "uno" },
];
