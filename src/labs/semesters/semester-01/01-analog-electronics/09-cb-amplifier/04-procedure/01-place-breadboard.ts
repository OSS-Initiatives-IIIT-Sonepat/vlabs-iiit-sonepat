import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard on the workbench.",
  body: "Lay the 830-point breadboard flat. The top red rail will carry +V_CC and the top blue rail is the common ground. Each column of five holes (a–e) is one connected strip; the centre gap separates it from f–j.",
  show: ["bb"],
};
