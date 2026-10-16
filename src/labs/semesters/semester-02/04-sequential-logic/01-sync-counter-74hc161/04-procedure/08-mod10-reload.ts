import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, CONTROLS, MOD10, OUTPUTS, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Verify the MOD-10 sequence 0 to 9.",
  body: "Because the 74HC161 load is synchronous, LD' going LOW at 1001 does not change the outputs at once. On the next rising edge the counter loads D3–D0 = 0000 instead of counting to 1010, so the sequence is 0, 1, …, 9, 0: ten states. Unlike a reset-based counter, state 1010 never appears, even briefly, so there is no glitch. Record the sequence, then switch off the supply.",
  show: [...BASE, "w_clr_vcc", ...CONTROLS, ...OUTPUTS, "fg", ...MOD10],
  highlight: "led_q0",
  ledBrightness: countLeds(0),
  readings: CLOCK_READING,
};
