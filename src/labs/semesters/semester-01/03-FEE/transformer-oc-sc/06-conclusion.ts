import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The open-circuit test gives the shunt branch: $R_0 = 1.32\\,\\mathrm{k}\\Omega$ and $X_0 = 639\\,\\Omega$, with a core loss of $10.0\\,\\mathrm{W}$.",
    "The short-circuit test gives the series branch referred to the primary: $R_{01} = 8\\,\\Omega$ and $X_{01} = 6\\,\\Omega$, with a full-load copper loss of $8.0\\,\\mathrm{W}$.",
    "At full load and unity power factor the efficiency is $92.7\\%$ and the voltage regulation is $3.48\\%$.",
  ],
};
