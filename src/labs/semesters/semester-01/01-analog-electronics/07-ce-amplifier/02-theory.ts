import { type TheorySection } from "@/labs/lab-content.types";
import { ceAmplifierTheoryDiagram } from "@/labs/schematics/semester-01/01-analog-electronics/07-ce-amplifier";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The common-emitter (CE) amplifier is the most widely used BJT amplifier configuration because it provides both voltage and current gain with 180° phase inversion. The transistor is biased in the active region using a voltage-divider bias network (R1, R2) for stability. The collector resistor R_C converts collector current changes into output voltage variations.",
    "The DC operating point (Q-point) is set by V_B = V_CC × R2/(R1 + R2), V_E = V_B − 0.7, I_E ≈ I_C = V_E/R_E. The AC voltage gain (with bypass capacitor C_E across R_E) is A_v = −g_m × R_C || R_L, where g_m = I_C / V_T (V_T = 26 mV at room temperature). The negative sign indicates phase inversion.",
    "Three coupling/bypass capacitors are used: C_1 (input coupling, blocks DC from the signal source), C_2 (output coupling, blocks DC from the load), and C_E (emitter bypass, short-circuits R_E at AC frequencies to maximise gain). Their values are chosen so that their reactance is negligible at the operating frequency.",
    "The frequency response of the CE amplifier has a mid-band region where gain is maximum and flat, a low-frequency roll-off (due to coupling and bypass capacitors), and a high-frequency roll-off (due to transistor junction capacitances). The bandwidth is defined as the frequency range between the upper and lower −3 dB points.",
  ],
  circuitDiagram: ceAmplifierTheoryDiagram,
};
