import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Draw the timing diagrams (optional, with CRO).",
  body: "Raise the clock to about 1 kHz. Display CLK with $Q_A$, then $Q_B$, then $Q_C$ on the CRO. Sketch the waveforms for both counters on a common time axis. Check that $Q_A$ divides the clock by 2, and that $Q_C$ has a period of 5 clock periods in the UP counter. Look for the very short glitch at the reset state: 101 for UP and 111 for DOWN.",
  show: [],
};
