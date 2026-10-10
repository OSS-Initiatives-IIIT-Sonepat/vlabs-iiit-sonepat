import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 4-to-2 encoder was realised with two OR gates using $Y_1 = D_2 + D_3$ and $Y_0 = D_1 + D_3$. The observed outputs matched the truth table for every one-hot input, which verifies the design.",
  ],
};
