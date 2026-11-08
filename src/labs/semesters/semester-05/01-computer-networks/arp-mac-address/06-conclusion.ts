import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "ARP turns an IP address on the local network into a MAC address with one broadcast question and one unicast answer, and caches the result so the question is not asked for every packet.",
    "For remote destinations the host only ever needs the gateway's MAC. The IP address in the packet is the final destination; the MAC address in the frame is only the next hop.",
  ],
};
