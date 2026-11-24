import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount the 74HC139 IC.",
  body: "Place the 74HC139 at columns 8–15, straddling the centre gap, notch to the left. Connect pin 16 (VCC, column 8 bottom) to the +5 V rail with a purple jumper and pin 8 (GND, column 15 top) to the GND rail with a black jumper.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "demux14",
    "w_vcc_demux14",
    "w_gnd_demux14",
  ],
  highlight: "psu",
};
