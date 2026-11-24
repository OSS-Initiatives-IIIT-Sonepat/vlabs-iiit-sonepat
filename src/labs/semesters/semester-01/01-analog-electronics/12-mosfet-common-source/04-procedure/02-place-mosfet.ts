import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Insert the 2N7000 MOSFET.",
  body: "Insert the 2N7000 so that its pins fall in columns 10, 11 and 12 of row c. With the flat face towards you, the 2N7000 pins are Source (column 10), Gate (column 11) and Drain (column 12).",
  show: ["bb", "psu", "vgg", "m1"],
  highlight: "m1",
};
