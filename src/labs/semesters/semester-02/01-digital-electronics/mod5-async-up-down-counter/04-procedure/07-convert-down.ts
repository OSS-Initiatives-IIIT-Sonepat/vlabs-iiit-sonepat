import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Convert to the DOWN counter.",
  body: "Switch off the supply, then rewire. (1) Remove the $Q_A \\rightarrow$ CLK$_B$ and $Q_B \\rightarrow$ CLK$_C$ links. Connect $\\overline{Q_A}$ to the CLK of $B$ and $\\overline{Q_B}$ to the CLK of $C$. (2) Remove the 74HC00 reset gate. Use one gate of the **74HC10**: connect $Q_A$, $Q_B$ and $Q_C$ to its three inputs, and connect its output to the **CLR of $A$ and $B$ only**. Tie CLR of $C$ and the PRE inputs to +5 V. This gives $\\overline{CLR_{A,B}} = \\overline{Q_A \\cdot Q_B \\cdot Q_C}$. Keep the LEDs and the clock as before.",
  show: [],
};
