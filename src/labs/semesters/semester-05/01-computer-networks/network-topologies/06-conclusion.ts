import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Each topology trades cable against resilience. A bus is cheapest and most fragile; a full mesh is most resilient and most expensive; a star and a tree sit between, with a single centre to protect.",
    "Real networks combine them: stars of hosts at the edge, a tree of switches across the campus, and a mesh of routers at the core.",
  ],
};
