import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The MOSFET conducts only when V_GS exceeds the threshold voltage, and in saturation the drain current follows the square-law relation with V_GS. Biased in saturation, the common source stage amplifies the input signal with a voltage gain of about −8 (calculated as −g_m (R_D ∥ R_L)), and the output is 180° out of phase with the input.",
  ],
};
