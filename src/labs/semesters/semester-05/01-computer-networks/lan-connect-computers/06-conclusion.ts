import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A star LAN needs one switch, one cable per computer, and one address per computer from the same network. A written plan of names, addresses and ports makes faults quick to find.",
    "ping, a broadcast and a shared folder test the LAN at three levels: reachability, the shared broadcast domain, and the services people actually use.",
  ],
};
