import { type TheorySection } from "@/labs/lab-content.types";
import { jkTFlipFlopTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/16-jk-t-flip-flop";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The JK flip-flop is the most versatile sequential element. It extends the SR latch by replacing the forbidden state with a **toggle** action. When both J=K=1, Q toggles on each active clock edge. The 74HC76 is a dual falling-edge-triggered JK flip-flop with active-low asynchronous SET ($\\overline{SET}$) and CLR ($\\overline{CLR}$) inputs.",
    "JK characteristic equation: $$Q_{n+1} = J\\bar{Q}_n + \\bar{K}Q_n$$ The four operating modes are: J=0 K=0 → Hold (Q unchanged). J=0 K=1 → Reset (Q=0). J=1 K=0 → Set (Q=1). J=1 K=1 → Toggle (Q flips). All transitions occur on the **falling** clock edge.",
    "The **T flip-flop** is a special case of the JK flip-flop with J and K inputs tied together as the single T input. When T=1 the output toggles on every active clock edge; when T=0 the output holds. The T flip-flop is widely used as a binary frequency divider: each stage divides the clock frequency by 2. $$Q_{n+1} = T\\bar{Q}_n + \\bar{T}Q_n = T \\oplus Q_n$$",
    "Applications: JK flip-flops form the basis of synchronous counters, sequence detectors, and state machines. T flip-flops implement ripple and synchronous counters and are used wherever clean frequency division is needed.",
  ],
  circuitDiagram: jkTFlipFlopTheoryDiagram,
};
