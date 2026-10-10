import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the data inputs",
  body: "Connect I0 and I3 to GND (black wires) and I1 and I2 to VCC (white wires). The data pattern is therefore I0=0, I1=1, I2=1, I3=0.",
  show: [
    "bb",
    "psu",
    "mux1",
    "w_vcc",
    "w_gnd",
    "w_en",
    "w_i0",
    "w_i1",
    "w_i2",
    "w_i3",
  ],
  highlight: "mux1",
};
