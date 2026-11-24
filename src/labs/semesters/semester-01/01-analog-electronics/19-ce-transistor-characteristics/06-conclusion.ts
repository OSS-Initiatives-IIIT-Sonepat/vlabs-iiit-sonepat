import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The input characteristic of the common-emitter stage is a forward diode curve. For this BC547, $r_i = 1.0\\,\\mathrm{k}\\Omega$ near $I_B = 40\\,\\mu\\mathrm{A}$.",
    "The output characteristics are nearly flat in the active region. At $V_{CE} = 5\\,\\mathrm{V}$, $\\beta = 102.5$. The Early slope gives $r_o = 50\\,\\mathrm{k}\\Omega$.",
  ],
};
