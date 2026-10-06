import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Test the UP counter.",
  body: "Switch on the supply and apply clock pulses one at a time (or at 1 Hz). Record $Q_C Q_B Q_A$ after each pulse in the observation table. Expected sequence: **000, 001, 010, 011, 100, 000, …**. The counter must never show 101, 110 or 111. If it starts in an unused state it should recover within two pulses.",
  show: [],
};
