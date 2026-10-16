import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, INPUTS, OUTPUTS, inputs, outputLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Wire the output LEDs as current sinks.",
  body: "Wire each output to an LED as a current sink: +5 V → 330 Ω → LED anode, LED cathode → output. Red LEDs go on A2, A1 and A0, yellow on GS' and green on EO'. Because the code outputs are active LOW, a lit LED means a 1 in the encoded number. With no input active, A2 A1 A0 are all HIGH (LEDs off), GS' is HIGH and EO' is LOW, so only the green EO' LED lights: the encoder is enabled but has nothing to encode.",
  show: [...BASE, "w_ei_gnd", ...INPUTS, ...OUTPUTS],
  highlight: "led_eo",
  activeInputs: inputs([]),
  ledBrightness: outputLeds([]),
  readings: { psu: "5.00 V" },
};
