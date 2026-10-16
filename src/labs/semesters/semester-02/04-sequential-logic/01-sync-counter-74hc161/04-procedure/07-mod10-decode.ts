import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BASE, CLOCK_READING, CONTROLS, MOD10, OUTPUTS, countLeds } from "./parts";

export const step: SceneProcedureStep = {
  label: "Convert to MOD-10 with a synchronous load.",
  body: "Switch off the supply. Remove the LD' wire to +5 V and insert a 74HC00 at column 5, powered from the rails. Connect Q3 and Q0 to the two inputs of one NAND gate and its output to LD'. Count 9 (1001) is the first count with both Q3 and Q0 HIGH, so at 9 the NAND output goes LOW: $\\overline{LD} = \\overline{Q_3 Q_0}$. Switch on again with CLR' HIGH and watch the count reach 1001.",
  show: [...BASE, "w_clr_vcc", ...CONTROLS, ...OUTPUTS, "fg", ...MOD10],
  highlight: "nand",
  ledBrightness: countLeds(9),
  readings: CLOCK_READING,
};
