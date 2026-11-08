import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Static routes are simple and predictable but do not adapt. RIP adapts but measures distance in hops, so it can choose a slow path. OSPF measures cost from bandwidth, finds the fastest path, and recovers from failures quickly.",
    "The routing table is the place to see the difference: the same destination with a different code, metric and next hop for each method.",
  ],
};
