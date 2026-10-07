import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A multiplexer (MUX) is a combinational circuit that selects one of several data inputs and forwards it to a single output. The choice is made by the select lines. A $2^n$:1 multiplexer has $2^n$ data inputs and $n$ select lines.",
    "A 4:1 multiplexer has four data inputs $I_0$–$I_3$, two select lines $S_1, S_0$ and one output $Y$. The output equals the data input whose index matches the binary value on the select lines.",
    "Boolean expression: $Y = \\overline{S_1}\\,\\overline{S_0}\\,I_0 + \\overline{S_1}\\,S_0\\,I_1 + S_1\\,\\overline{S_0}\\,I_2 + S_1\\,S_0\\,I_3$",
    "Each product term is a 3-input AND gate, so the gate-level circuit is 2 NOT gates, 4 three-input AND gates and one 4-input OR gate. In this experiment the 74HC153 dual 4:1 multiplexer is used, with only section 1 (pins 1C0–1C3, 1Y) connected. The enable input $\\overline{1G}$ is active LOW and is tied to ground so the output stays enabled.",
    "Applications: data routing, parallel-to-serial conversion, implementing Boolean functions, and bus selection in CPUs.",
  ],
};
