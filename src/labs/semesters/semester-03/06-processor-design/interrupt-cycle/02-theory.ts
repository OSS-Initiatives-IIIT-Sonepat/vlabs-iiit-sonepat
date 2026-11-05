import { type TheorySection } from "@/labs/lab-content.types";
import { interruptCycleTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/interrupt-cycle";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "At the end of an instruction the computer tests IEN · (FGI + FGO). If that is 0, the next fetch runs. If it is 1, flip-flop R is set and the interrupt cycle replaces the fetch.",
    "RT0 does AR ← 0 and TR ← PC. RT1 does M[AR] ← TR and PC ← 0. RT2 does PC ← PC + 1, IEN ← 0, R ← 0, and SC ← 0.",
    "Here PC was 101, so memory 0 receives 101 and the service program begins at address 1. A later BUN indirect through 0 returns.",
  ],
  circuitDiagram: interruptCycleTheoryDiagram,
};
