import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAt } from "../markers";

export const step: SceneProcedureStep = {
  label: "11. Capacitors and the ICSP header",
  body: "The two large silver cans are electrolytic capacitors. They smooth the 5 V supply so the chip does not reset when a load switches on. The small black 2 x 3 header is ICSP, which programs the chip directly without the bootloader. Ordinary sketches never need it.",
  show: ["bb", "uno", "usb", "bat"],
  highlight: "uno",
  markers: [pointAt("capA"), pointAt("icsp")],
};
