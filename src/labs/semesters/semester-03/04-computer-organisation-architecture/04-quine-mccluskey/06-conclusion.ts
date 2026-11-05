import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Quine–McCluskey found the same minimum as the Karnaugh map: $F = \\bar{B}\\bar{C} + C\\bar{D} + \\bar{A}BD$. The essentials were forced by minterms 9 and 14; $01\\text{-}1$ was the single implicant that then covered both leftovers.",
    "The table does not care how many variables there are, which is why logic-minimisation programs use this method (or a heuristic built on it) rather than a map. For four variables the map is faster to see; the chart is the check that the groups were not wishful.",
  ],
};
