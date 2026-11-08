import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A hub repeats bits, a switch forwards frames by MAC address, and a router forwards packets by IP address. Each one looks one layer deeper into the data than the last.",
    "Replacing hubs with switches removes collisions, because each port gets its own collision domain. A router is needed to split a network into separate broadcast domains and to join different IP networks.",
  ],
};
