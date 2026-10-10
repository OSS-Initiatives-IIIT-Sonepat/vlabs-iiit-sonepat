import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and insert the BC547 transistor.",
  body: "Place the breadboard on the bench and insert the NPN transistor Q1 (BC547) at column 12. Its base (B) is the middle lead in column 12, with the collector (C) in column 11 and emitter (E) in column 13 — one breadboard hole per lead.",
  show: ["bb", "q1"],
  highlight: "q1",
};
