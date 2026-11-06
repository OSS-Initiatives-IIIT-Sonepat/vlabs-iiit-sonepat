import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The Karnaugh map for $F = \\sum m(0,1,2,5,6,7,8,9,10,14)$ reduces to $F = \\bar{B}\\bar{C} + C\\bar{D} + \\bar{A}BD$. Each group is a power of two, neighbours differ by one bit, and the dropped literals are exactly the bits that change inside the group.",
    "The map is visual and stops being reliable past about six variables. The Quine–McCluskey lab repeats this function in a table, which is the method a program uses when the map no longer fits on a page.",
  ],
};
