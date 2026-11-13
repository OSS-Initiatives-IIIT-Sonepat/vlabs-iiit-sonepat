import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "4. The brain: ATmega328P",
  body: "The long black chip is the ATmega328P, a microcontroller. It is an 8-bit processor that runs your sketch. It has 32 KB of flash memory to store the program, 2 KB of RAM for variables, and 1 KB of EEPROM. It runs setup() once and then loop() forever.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("chip")],
};
