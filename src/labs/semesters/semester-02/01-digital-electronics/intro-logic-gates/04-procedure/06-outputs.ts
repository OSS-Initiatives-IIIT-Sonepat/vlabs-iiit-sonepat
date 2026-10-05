import { type SceneProcedureStep } from "@/labs/experiments/types";

import { everyId } from "../gates";

export const step: SceneProcedureStep = {
  label: "Connect the outputs and ground.",
  body: "Connect each gate output **Y** to its series resistor, the resistor to the LED anode, and the LED cathode to the **GND** rail with a black wire. The circuit is now complete and ready for testing.",
  show: everyId,
  highlight: "w_y_and",
  activeInputs: { A: 0, B: 0 },
};
