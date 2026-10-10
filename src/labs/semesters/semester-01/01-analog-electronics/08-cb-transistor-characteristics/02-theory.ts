import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "In the common-base (CB) configuration the base is the terminal common to both the input (emitter-base) and the output (collector-base) circuits. The input current is the emitter current $I_E$, the output current is the collector current $I_C$, the input voltage is $V_{EB}$ and the output voltage is $V_{CB}$.",
    "For normal (active region) operation the emitter-base junction is forward biased and the collector-base junction is reverse biased. For an NPN transistor the emitter is therefore made negative with respect to the base by $V_{EE}$, and the collector is made positive with respect to the base by $V_{CC}$. A series resistor $R_E$ limits the emitter current.",
    "Input characteristics: the curve of $I_E$ against $V_{EB}$ at constant $V_{CB}$. It resembles the forward characteristic of a p-n diode: $I_E$ is negligible until $V_{EB}$ reaches the cut-in voltage (about 0.5 V for silicon) and then rises steeply. A larger $V_{CB}$ shifts the curve slightly to the left because of base-width modulation (Early effect). The dynamic input resistance is $r_i = \\Delta V_{EB} / \\Delta I_E$ at constant $V_{CB}$ and is low, typically a few ohms to a few tens of ohms.",
    "Output characteristics: the curve of $I_C$ against $V_{CB}$ at constant $I_E$. In the active region ($V_{CB} > 0$) $I_C = \\alpha I_E + I_{CBO}$ and is almost independent of $V_{CB}$, so the curves are nearly flat. If $V_{CB}$ is made slightly negative the collector junction becomes forward biased (saturation region) and $I_C$ falls sharply. For $I_E = 0$ only the leakage current $I_{CBO}$ flows (cut-off region). The dynamic output resistance is $r_o = \\Delta V_{CB} / \\Delta I_C$ at constant $I_E$ and is very high, of the order of hundreds of kilo-ohms to mega-ohms.",
    "Current gain: $\\alpha_{dc} = I_C / I_E$ and $\\alpha_{ac} = \\Delta I_C / \\Delta I_E$ at constant $V_{CB}$. It is always slightly less than 1 (typically 0.95 to 0.99) and is related to the common-emitter gain by $\\alpha = \\beta / (1 + \\beta)$.",
    "This virtual experiment uses a single collector supply, so $V_{CB}$ is varied from 0 V upwards (active region only).",
  ],
};
