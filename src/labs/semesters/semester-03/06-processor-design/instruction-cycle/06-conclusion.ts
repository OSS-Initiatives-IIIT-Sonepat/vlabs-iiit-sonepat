import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Every instruction of the basic computer is fetched and decoded the same way. T0 copies PC into AR, T1 loads IR and increments PC, and T2 fills D0 through D7, AR, and I from the instruction word.",
    "D7 and I then choose the execute path. Register-reference and input-output instructions finish at T3. A direct memory reference does nothing at T3 and executes at T4. An indirect memory reference reads the effective address at T3 and executes at T4. SC ← 0 returns the machine to T0, unless the instruction was HLT.",
  ],
};
