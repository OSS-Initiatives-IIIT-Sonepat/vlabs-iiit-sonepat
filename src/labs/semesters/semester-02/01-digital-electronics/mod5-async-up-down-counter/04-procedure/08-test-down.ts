import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Test the DOWN counter.",
  body: "Switch on the supply and apply clock pulses one at a time. The counter is self-starting, so it reaches 100 within two pulses. Record $Q_C Q_B Q_A$ after each pulse. Expected sequence: **100, 011, 010, 001, 000, 100, …** (decimal 4, 3, 2, 1, 0, 4, …). The counter must never show 111 for a visible time.",
  show: [],
};
