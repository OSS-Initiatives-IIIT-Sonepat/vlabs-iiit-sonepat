import { type TheorySection } from "@/labs/lab-content.types";
import { cbAmplifierTheoryDiagram } from "@/labs/schematics/cb-amplifier-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "In the **common-base (CB) configuration** the base terminal is shared between the input and output circuits. The signal is applied between the emitter and base (input), and the output is taken between the collector and base. Unlike the common-emitter (CE) amplifier, CB provides no current gain — its key strength is very low input impedance ($r_e \\approx 26\\,\\text{mV}/I_E$) and a very high output impedance, making it ideal for impedance-matching applications and RF/VHF amplifiers.",
    "The current transfer ratio **alpha** is defined as:$$\\alpha = \\frac{I_C}{I_E} \\approx 0.98\\text{–}0.999$$Since nearly all emitter current appears at the collector ($I_B$ is only 1–2 % of $I_E$), $\\alpha$ is close to unity. It relates to the more familiar $\\beta$ (CE current gain) by $\\alpha = \\beta/(1+\\beta)$. The small-signal voltage gain is $A_v = g_m R_C$ where $g_m = I_C / V_T$ (no minus sign — CB is non-inverting).",
    "**Input characteristics** ($I_E$ vs $V_{EB}$ at fixed $V_{CB}$): The emitter-base junction is forward biased, so $I_E$ rises exponentially above $V_{EB} \\approx 0.6\\,\\text{V}$ following the diode equation. Input resistance $r_{ib} = \\Delta V_{EB}/\\Delta I_E \\approx 1/g_m \\approx 26/I_C\\,\\Omega$ — very low, typically $10\\text{–}50\\,\\Omega$.",
    "**Output characteristics** ($I_C$ vs $V_{CB}$ at fixed $I_E$): Once $V_{CB}$ exceeds a small positive value (collector-base junction reverse biased), $I_C \\approx \\alpha I_E$ stays essentially constant — the output characteristic is extremely flat compared with CE. The Early effect causes a very slight slope, indicating a very high output resistance $r_o > 1\\,\\text{M}\\Omega$. This flat characteristic and high $r_o$ make CB preferred for cascode stages and current-source loads.",
  ],
  circuitDiagram: cbAmplifierTheoryDiagram,
};
