import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the current-limiting resistors",
  body: "Place the three 330 Ω resistors. Each one sits between the supply and one LED. At 5 V, with about 2 V across a lit LED, the current is (5 − 2) / 330 ≈ 9 mA. That is inside the 20 mA a small LED wants and inside the 40 mA a typical GPIO pin can source.",
  show: ["bb", "r1", "r2", "r3"],
  highlight: "r1",
};
