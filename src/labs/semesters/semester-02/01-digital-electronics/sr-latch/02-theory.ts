import { type TheorySection } from "@/labs/lab-content.types";
import { srLatchTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/sr-latch";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An SR latch is a fundamental bistable memory element. The 74HC279 provides four independent SR latches on a single DIP-16 package with active-low $\\bar{S}$ (Set) and $\\bar{R}$ (Reset) inputs.",
    "Operating states: $\\bar{S}=0, \\bar{R}=1$ → Q=1 (Set). $\\bar{S}=1, \\bar{R}=0$ → Q=0 (Reset). $\\bar{S}=1, \\bar{R}=1$ → Q unchanged (Hold). $\\bar{S}=0, \\bar{R}=0$ → Forbidden — both outputs try to go HIGH simultaneously, violating Q=Q_bar complementarity.",
    "Unlike edge-triggered flip-flops, the SR latch responds immediately (asynchronously) to input changes — there is no clock. The state equation is $$Q_{n+1} = S + \\bar{R}\\,Q_n \\quad (\\text{with constraint } S \\cdot R = 0)$$ Once set or reset, the latch holds its state indefinitely — this is the bistable memory property.",
    "Applications: switch debouncing (transitions on mechanical bounce do not cause spurious state changes), latching alarm circuits, and as the cross-coupled core inside D and JK flip-flops. The forbidden state is the key limitation of the SR latch compared to more advanced sequential elements.",
  ],
  circuitDiagram: srLatchTheoryDiagram,
};
