import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Tie EN_bar to GND.",
  body: "Connect a black wire from pin 1 (1G', the active-LOW enable, column 8) to the GND rail. This enables the decoder permanently; the output addressed by B A goes LOW.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "demux14",
    "w_vcc_demux14",
    "w_gnd_demux14",
    "w_en_gnd",
  ],
};
