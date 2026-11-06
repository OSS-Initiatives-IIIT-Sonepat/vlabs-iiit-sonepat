import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "ORG and END change the pass and store nothing. LDA, ADD, BSA, and BUN each store one memory-reference word.",
    "INP stores F800. The loop is the BUN back to 100.",
  ],
  table: {
    headers: ["LC", "Line", "Stored"],
    rows: [
      ["100", "LDA X", "206A"],
      ["101", "ADD Y", "106B"],
      ["102", "BSA SUB", "506C"],
      ["103", "BUN 100", "4064"],
      ["104", "INP", "F800"],
    ],
  },
};
