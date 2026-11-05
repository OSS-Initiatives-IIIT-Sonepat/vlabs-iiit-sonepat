import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "T0 puts 100 into AR. T1 loads ADD 108 into IR and leaves PC at 101.",
    "T2 points AR at 108. T3 reads 5 into DR and leaves AC at 5.",
  ],
  table: {
    headers: ["Time", "Place", "Value"],
    rows: [
      ["T0", "AR", "100"],
      ["T1", "IR / PC", "ADD 108 / 101"],
      ["T3", "AC", "5"],
    ],
  },
};
