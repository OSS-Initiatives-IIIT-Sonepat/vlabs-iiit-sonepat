import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S5 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Wire the toggle feedback and tie presets high.",
  body: "Connect each flip-flop's $\\bar{Q}$ output back to its own D input so every stage toggles on a rising clock edge. Tie the three active-low PRESET inputs to VCC so they stay inactive.",
  show: S5,
  highlight: "dff_a",
  supplyVoltage: 5.0,
};
