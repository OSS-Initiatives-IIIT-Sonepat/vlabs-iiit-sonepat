import { type TheorySection } from "@/labs/lab-content.types";

export const aim: TheorySection = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To construct and study the DC operating point (Q-point) of an NPN Bipolar Junction Transistor (BC547) in Fixed Bias and Voltage Divider Bias configurations on a breadboard.",
    "To measure the DC voltages ($V_B$, $V_C$, $V_E$, $V_{BE}$, $V_{CE}$) and branch currents ($I_B$, $I_C$, $I_E$) for both biasing circuits.",
    "To plot and compare the DC load lines, determine the quiescent operating points ($I_C, V_{CE}$), and evaluate the stability factor ($S$) against transistor parameter variations and temperature fluctuations.",
  ],
};
