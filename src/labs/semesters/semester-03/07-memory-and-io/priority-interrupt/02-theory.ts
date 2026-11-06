import { type TheorySection } from "@/labs/lab-content.types";
import { priorityInterruptTheoryDiagram } from "@/labs/schematics/semester-03/07-memory-and-io/priority-interrupt";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "D1 has priority 1 and D2 has priority 2, the higher of the two. Both raise a request.",
    "The grant goes to D2. D1 keeps its request and waits. When D2 drops, the grant can pass to D1.",
  ],
  circuitDiagram: priorityInterruptTheoryDiagram,
};
