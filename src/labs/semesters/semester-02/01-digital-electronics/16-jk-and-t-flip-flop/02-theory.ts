import { type LabSection } from "@/labs/lab-content.types";

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A flip-flop is a bistable sequential circuit capable of storing one bit of information. Its output changes in response to the input condition and the active clock transition.",
    "The JK flip-flop is an improved form of the SR flip-flop. It has two inputs, J and K. For J=0, K=0 the previous state is retained; for J=0, K=1 the flip-flop is reset; for J=1, K=0 it is set; and for J=1, K=1 it toggles its state.",
    "The characteristic equation of a JK flip-flop is Q(next) = JQ̅ + K̅Q.",
    "A T flip-flop has a single input T. When T=0, the previous state is retained. When T=1, the output toggles on the active clock edge.",
    "A T flip-flop can be constructed from a JK flip-flop by connecting J and K together and using the common connection as the T input. Thus, J=K=T.",
    "For the T flip-flop, Q(next) = T ⊕ Q."
  ],
};
