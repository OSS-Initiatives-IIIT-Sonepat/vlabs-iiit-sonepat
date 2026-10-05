import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The logic behaviour of the NOT, AND, OR, NAND, NOR, EX-OR and EX-NOR gates was investigated and the observed outputs matched the theoretical truth tables for every input combination.",
    "AND and OR give 1 only for all-ones and any-one inputs respectively; NAND and NOR are their complements; EX-OR detects unequal inputs and EX-NOR detects equal inputs. NOT inverts its single input.",
  ],
};
