import { type SceneProcedureStep } from "@/labs/experiments/types";

import { SHOW } from "../components";

export const step: SceneProcedureStep = {
  label: "Document all three function implementations",
  body: "Compile the observation table showing, for each function (AND, OR, XOR), the D0 and D1 connections used and the measured outputs for all four (A,B) input combinations. Verify that the MUX correctly realises each Boolean function purely by changing the D0 and D1 wiring — without modifying the MUX structure itself. This demonstrates the programmability of MUX-based logic.",
  show: SHOW.xor,
  activeInputs: {
    A: 0,
    B: 0,
  },
};
