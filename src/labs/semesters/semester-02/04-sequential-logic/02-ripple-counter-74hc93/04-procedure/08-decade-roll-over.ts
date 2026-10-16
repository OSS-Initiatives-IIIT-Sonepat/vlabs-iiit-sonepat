import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, LINK, OUTPUTS, RESETS_DECADE, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Verify the decade sequence 0 to 9.",
  body: "On the tenth clock pulse the counter goes to 1010, the reset fires and the outputs return to 0000 within a few tens of nanoseconds, too fast to see on the LEDs. The visible sequence is 0, 1, …, 9, 0: ten states, so the 74HC93 is now a MOD-10 (decade) counter. Because the reset is asynchronous, state 1010 does exist briefly as a glitch; a synchronous-load counter such as the 74HC161 avoids this. Record the sequence, then switch off the supply.",
  show: [...BASE, ...RESETS_DECADE, ...OUTPUTS, "fg", ...LINK],
  highlight: "led_qa",
  ledBrightness: countLeds(0),
  readings: CLOCK_READING,
};
