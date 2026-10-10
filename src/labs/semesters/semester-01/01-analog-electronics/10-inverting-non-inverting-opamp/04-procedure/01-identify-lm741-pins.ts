import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Identify the LM741 pins.",
  body: "Hold the LM741 with the notch or dot at the top. Pin 1 is at the top left and the pins are numbered anticlockwise: pins 1 to 4 run down the left side and pins 5 to 8 run up the right side. Pin 2 is the inverting input, pin 3 is the non-inverting input, pin 4 is V−, pin 6 is the output, pin 7 is V+, pins 1 and 5 are the offset null terminals and pin 8 is not connected.",
  show: [
    "bb",
    "opamp1",
  ],
};
