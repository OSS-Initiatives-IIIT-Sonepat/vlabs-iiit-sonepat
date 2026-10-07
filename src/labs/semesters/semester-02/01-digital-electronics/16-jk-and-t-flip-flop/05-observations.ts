import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The observed outputs should agree with the characteristic tables. For the JK flip-flop, J=K=0 holds the previous state, J=0 K=1 resets, J=1 K=0 sets, and J=K=1 toggles.",
    "For the T flip-flop, T=0 holds the previous state and T=1 toggles the output at each active clock edge."
  ],
  table: {
    headers: ["J", "K", "Present Q", "Next Q", "Operation"],
    rows: [
      ["0", "0", "Q", "Q", "No change"],
      ["0", "1", "Q", "0", "Reset"],
      ["1", "0", "Q", "1", "Set"],
      ["1", "1", "Q", "Q̅", "Toggle"]
    ],
  },
};
