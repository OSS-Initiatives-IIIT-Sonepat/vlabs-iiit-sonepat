import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The DC operating points (Q-points) of both Fixed Bias and Voltage Divider Bias configurations were successfully determined, measured, and compared on the breadboard.",

    "In the **Fixed Bias configuration**, the operating point depends entirely on the transistor current gain $\\beta$ ($I_C = \\beta I_B$). Because of high $\\beta$ sensitivity and a large stability factor ($S = 1 + \\beta \\approx 201$), slight variations in temperature or transistor batch pushed the transistor towards saturation ($V_{CE} \\approx 0.72\\text{ V}$), causing severe distortion for any AC input signal.",

    "In the **Voltage Divider Bias configuration**, the base voltage $V_B$ is firmly clamped by the low-impedance resistive divider ($R_1, R_2$), making the collector current $I_C \\approx (V_B - V_{BE})/R_E$ practically independent of $\\beta$. The emitter resistor $R_E$ provides robust negative feedback, reducing the stability factor to $S \\approx 1.98$.",

    "This verifies why Voltage Divider Bias is universally employed in discrete transistor linear amplifier designs, as it guarantees a stable quiescent Q-point firmly centered in the active region across wide temperature ranges and device tolerances.",
  ],
};
