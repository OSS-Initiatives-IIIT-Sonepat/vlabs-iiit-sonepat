import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The input characteristics of the CB configuration resemble those of a forward-biased p-n junction: the emitter current is negligible below a cut-in voltage of about 0.5 V and rises steeply beyond it. Changing $V_{CB}$ from 0 V to 5 V shifts the curve only slightly, and the dynamic input resistance is low (about 10 Ω for $I_E$ between 2 mA and 4 mA).",
    "The output characteristics are almost flat in the active region: $I_C$ is nearly equal to $I_E$ and almost independent of $V_{CB}$, which gives a very high dynamic output resistance.",
    "The current gain $\\alpha$ is slightly less than unity (about 0.99 for BC547). Your measured values may differ slightly from these.",
  ],
};
