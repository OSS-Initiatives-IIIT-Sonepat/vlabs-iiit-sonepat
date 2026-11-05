import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Two primes are essential because a minterm sits in no other row. One more implicant finishes the cover. The other three primes are redundant for this function.",
  ],
  table: {
    headers: ["Prime", "Binary", "Minterms", "In the cover?"],
    rows: [
      ["B' C'", "-00-", "0, 1, 8, 9", "Essential"],
      ["C D'", "--10", "2, 6, 10, 14", "Essential"],
      ["A' B D", "01-1", "5, 7", "Yes — covers the rest"],
      ["A' C' D", "0-01", "1, 5", "No"],
      ["A' B C", "011-", "6, 7", "No"],
      ["B' D'", "-0-0", "0, 2, 8, 10", "No"],
    ],
  },
};
