import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The load power is greatest when $R_L = R_s = 100\\,\\Omega$. The measured power there is $202.5\\,\\mathrm{mW}$, equal to $V_s^2 / (4 R_s)$.",
    "Both the smaller load ($176.3\\,\\mathrm{mW}$) and the larger load ($174.0\\,\\mathrm{mW}$) deliver less power. The maximum power transfer theorem is verified for this DC source.",
  ],
};
