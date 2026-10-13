import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire the D and CLK inputs",
  body: "Connect the data input D (red wire) to pin 2 and the clock input CLK (blue wire) to pin 3. Keep both at 0 for now.",
  show: ["bb", "psu", "dff1", "w_clr", "w_pre", "w_d", "w_clk"],
  highlight: "w_d",
  activeInputs: { D: 0, CLK: 0 },
};
