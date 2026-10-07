import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 4:1 multiplexer was verified experimentally. For each select combination $S_1S_0$ the output $Y$ followed the selected data input ($00 \\to I_0$, $01 \\to I_1$, $10 \\to I_2$, $11 \\to I_3$), matching the Boolean expression $Y = \\overline{S_1}\\,\\overline{S_0}\\,I_0 + \\overline{S_1}\\,S_0\\,I_1 + S_1\\,\\overline{S_0}\\,I_2 + S_1\\,S_0\\,I_3$.",
  ],
};
