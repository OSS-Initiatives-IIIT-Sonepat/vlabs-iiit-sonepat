import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "1. The whole board",
  body: "This is an ESP32-DevKitC. The silver can on the right is the ESP-WROOM-32 module: the ESP32 chip, its flash memory and its antenna, under one metal shield. The rest of the board powers the module, connects it to your PC and brings its pins out to two rows of 19 header pins, which plug into a breadboard. We will go around it: power, the USB link, the module, the buttons, then the pins.",
  show: ["bb", "esp"],
  highlight: "esp",
};
